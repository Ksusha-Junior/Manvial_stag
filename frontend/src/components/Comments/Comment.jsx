import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Comments.css';


const Comment = (props) => {
  const { comment } = props;

  const [modalMedia, setModalMedia] = useState(null); // выбранное для просмотра изображение или видео

  const openModal = (media) => {
    setModalMedia(media);
  };

  const closeModal = () => {
    setModalMedia(null);
  };

  return (
    <div className='comment'>
      <div className='comment-info'>
        <div className='comment-name'>{comment.name}</div>
        <div className='comment-date'>{comment.date}</div>
      </div>

      <div className='comment-text'>{comment.text}</div>

      <div className='comment-media'>

        {/* Миниатюры изображений */}
        {comment.photos && comment.photos.length > 0 && (
          <div className='images-container'>
              {comment.photos.map((img, index) => (
                <img
                  key={index}
                  src={img.file}
                  alt="ремонт и регулировка окон отзывы"
                  className='thumb-img'
                  onClick={() => openModal({ type: 'image', src: img.file })}
                />
              ))}
          </div>
        )}

        {/* Видео */}
        {comment.videos && comment.videos.length > 0 && (
          <div className='video-container'>
              {comment.videos.map((video, index) => (
                <video
                  key={index}
                  src={video.file}
                  className='thumb-video'

                  onClick={() => openModal({ type: 'video', src: video.file })}
                />
              ))}
          </div>
        )}
      </div>
      {/* Модальное окно для увеличенной картинки / видео */}
      {modalMedia && (
        <div className='modal' onClick={closeModal}>
          {modalMedia.type === 'image' ? (
            <img src={modalMedia.src} alt="Full size" className='modal-content' />
          ) : modalMedia.type === 'video' ? (
            <video src={modalMedia.src} controls autoPlay className='modal-content' />
          ): null}
        </div>
      )}
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    date: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    photos: PropTypes.arrayOf(
      PropTypes.shape({
        file: PropTypes.string.isRequired,
      })
    ),
    videos: PropTypes.arrayOf(
      PropTypes.shape({
        file: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
};
export default Comment;