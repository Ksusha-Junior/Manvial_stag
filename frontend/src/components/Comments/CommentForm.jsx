import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const API_URL = 'https://api.remontokontut.by/comments/';

const CommentForm = ({ onClose, onCommentAdded }) => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [files, setFiles] = useState([]); // для загрузки фото/видео
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFilesChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const handleRemoveFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    // Добавляем текстовые поля
    formData.append('name', name || 'user');
    formData.append('text', text);
    formData.append('date', new Date().toISOString().split('T')[0]);



    // Загружаемые файлы
    files.forEach((file) => {
    if (file.type.startsWith('image/')) {
      formData.append('images', file); // изображения
    } else if (file.type.startsWith('video/')) {
      formData.append('videos_upload', file); // видео
    }
  });

    try {
      await axios.post(API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onCommentAdded();
      onClose();
    } catch (error) {
      console.error('Ошибка при отправке отзыва:', error);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="modal">
      <div className="modal-content">

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              Имя:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Отзыв:
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Фото/Видео:
              <input
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={handleFilesChange}
              />
            </label>
            <div>
              {files.map((file, index) => (
                <div key={index} style={{ margin: '5px 0' }}>
                  <button type="button" onClick={() => handleRemoveFile(index)}>
                    Удалить
                  </button>
                  {file.type.startsWith('image/') ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Preview"
                      style={{ maxWidth: '100px', display: 'inline-block', marginLeft: '10px' }}
                    />
                  ) : file.type.startsWith('video/') ? (
                    <video
                      controls
                      src={URL.createObjectURL(file)}
                      style={{ maxWidth: '150px', display: 'inline-block', marginLeft: '10px' }}
                    ></video>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginTop: '10px' }}>
            <button className='comment-submit' type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Отправка...' : 'Отправить'}
            </button>
            <button className='comment-cancel' type="button" onClick={onClose} style={{ marginLeft: '10px' }}>
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

CommentForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onCommentAdded: PropTypes.func.isRequired,
};

export default CommentForm;

