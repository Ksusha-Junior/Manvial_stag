import React, { useState } from 'react';
import CommentsList from './CommentsList'; // ваш компонент с комментариями
import CommentForm from './CommentForm'; // форма добавления комментария

const CommentButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCommentAdded = () => {
    // после добавления комментария обновим список, он уже есть внутри CommentsList,
    // или можно передать через пропсы, если нужно
  };

  return (
    <div>
      {/* Кнопка для открытия модального окна */}
      <button className='commentbutton' onClick={handleOpenModal}>Оставьте свой отзыв!</button>

      {/* Модальное окно с формой */}
      {isModalOpen && (
        <CommentForm
          onClose={handleCloseModal}
          onCommentAdded={() => {
            handleCloseModal(); // закрываем окно после отправки
            // можно также вызвать refresh комментариев, если нужно
          }}
        />
      )}
    </div>
  );
};

export default CommentButton;