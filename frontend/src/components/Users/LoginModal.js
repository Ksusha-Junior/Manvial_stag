import React, { useState } from 'react';
import api from '../../api'; // Путь к вашему api.js
import './users.css';

function LoginModal({ isOpen, onClose, switchToRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await api.post('auth/login/', { username, password });

      if (response.status === 200) {
        // Сохраняем access токен
        localStorage.setItem('access_token', response.data.access);
        onClose(); // Закрываем модалку
        window.location.reload(); // Перезагружаем страницу, чтобы обновить состояние интерфейса
      }
    } catch (err) {
      setError('Неверное имя пользователя или пароль');
    }
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose}>&times;</button>

        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Вход в аккаунт</h2>
          {error && <p className="auth-error">{error}</p>}

          <div className="auth-input-group">
            <label>Имя пользователя</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="auth-input-group">
            <label>Пароль</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <button type="submit" className="auth-submit-btn">Войти</button>
          <p className="auth-switch-text">
            Нет аккаунта? <span onClick={switchToRegister}>Создать аккаунт</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
