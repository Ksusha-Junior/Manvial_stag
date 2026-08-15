import React, { useState } from 'react';
import api from '../../api'; // Путь к вашему api.js (на 2 уровня выше)
import './users.css'; // Подключаем общие стили

function RegisterModal({ isOpen, onClose, switchToLogin }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await api.post('auth/register/', { username, email, password });
      if (response.status === 201) {
        setIsRegistered(true);
      }
    } catch (err) {
      const data = err.response?.data;
      if (data) {
        if (data.username) setError(`Имя пользователя: ${data.username}`);
        else if (data.email) setError(`Email: ${data.email}`);
        else if (data.password) setError(`Пароль: ${data.password}`);
      } else {
        setError('Что-то пошло не так.');
      }
    }
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose}>&times;</button>

        {!isRegistered ? (
          <form onSubmit={handleSubmit} className="auth-form">
            <h2>Регистрация</h2>
            {error && <p className="auth-error">{error}</p>}

            <div className="auth-input-group">
              <label>Имя пользователя</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="auth-input-group">
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="auth-input-group">
              <label>Пароль</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>

            <button type="submit" className="auth-submit-btn">Зарегистрироваться</button>
            <p className="auth-switch-text">
              Уже есть аккаунт? <span onClick={switchToLogin}>Войти</span>
            </p>
          </form>
        ) : (
          <div className="auth-welcome-screen">
            <h2>Добро пожаловать, {username}!</h2>
            <p>Вы успешно зарегистрировались на сайте.</p>
            <button className="auth-submit-btn" onClick={switchToLogin}>Перейти к входу</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default RegisterModal;
