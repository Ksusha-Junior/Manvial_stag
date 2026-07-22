import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Organizations.css';

const API_URL = 'http://127.0.0.1:8000/organizations/';

function Organizations() {
  const [organization, setOrganization] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [images, setImages] = useState([]); // ссылки на изображения
  const [expandedImage, setExpandedImage] = useState(null);

  useEffect(() => {
    async function fetchOrganization() {
      try {
        const response = await axios.get(API_URL);
        const dataArray = response.data; // это массив
        if (Array.isArray(dataArray) && dataArray.length > 0) {
          const firstOrg = dataArray[0]; // берем первый объект
          setOrganization(firstOrg);

          // Берем массив изображений
          if (firstOrg.photos) {
            const imgs = firstOrg.photos.map(photo => photo.image);
            setImages(imgs);
          }
        }
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      }
    }
    fetchOrganization();
  }, []);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
    if (modalOpen) {
      setExpandedImage(null);
    }
  };

  const handleImageClick = (img) => {
    setExpandedImage(expandedImage === img ? null : img);
  };

  return (
    <div className='organizations-container'>
      <button className='orgbutton' onClick={toggleModal}>Для юридических лиц</button>

      {modalOpen && (
        <div className='modal-overlay' onClick={toggleModal}>
          <div className='modal-content' onClick={(e) => e.stopPropagation()}>
            {/* Текст организации */}
            {organization && (
              <div >
                <p className='text-content'>{organization.text}</p>
              </div>
            )}

            {/* Фото в веере */}
            <div className='fan-container'>
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt='ремонт и регулировка окон ПВХ, замена уплотнителя, стеклопакетов юрлицам'
                  className='fan-image'
                  onClick={() => handleImageClick(img)}
                />
              ))}
            </div>

            {/* Увеличенное изображение */}
            {expandedImage && (
              <div
                className='expanded-image-container'
                onClick={() => setExpandedImage(null)}
              >
                <img src={expandedImage} alt='тут делали ремонт и регулировку окон ПВХ' className='expanded-image' />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Organizations;