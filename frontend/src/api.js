import axios from 'axios';

// Создаем экземпляр Axios с базовыми настройками
const api = axios.create({
  baseURL: 'http://localhost:8000/', // Адрес вашего Django бэкенда
  withCredentials: true, // КРИТИЧЕСКИ ВАЖНО: разрешает браузеру отправлять и принимать куки (наш refresh_token)
});

// 1. Перехватчик ЗАПРОСОВ (Request Interceptor)
// Автоматически добавляет Access-токен в заголовок Authorization перед отправкой любого запроса
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 2. Перехватчик ОТВЕТОВ (Response Interceptor)
// Если бэкенд вернул 401 (Access-токен протух), этот код сам обновит его через куку и повторит запрос
api.interceptors.response.use(
  (response) => response, // Если всё хорошо, просто отдаем ответ дальше
  async (error) => {
    const originalRequest = error.config;

    // Проверяем, что ошибка 401 и мы еще не пытались обновить токен для этого запроса
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Ставим флаг, чтобы не уйти в бесконечный цикл

      try {
        // Делаем POST-запрос на обновление токена.
        // Передаем пустой объект {}, так как сам refresh_token браузер автоматически вытащит из httpOnly куки
        const response = await axios.post('http://localhost:8000/auth/refresh/', {}, { withCredentials: true });

        if (response.status === 200) {
          const newAccessToken = response.data.access;

          // Сохраняем новый access_token в localStorage
          localStorage.setItem('access_token', newAccessToken);

          // Обновляем заголовок в упавшем запросе и отправляем его заново
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Если выполнение зашло сюда, значит refresh_token тоже протух (или его нет)
        // Полностью разлогиниваем пользователя
        localStorage.removeItem('access_token');
        window.location.href = '/login'; // Перенаправляем на страницу входа
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
