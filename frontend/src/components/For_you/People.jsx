import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './People.css';

const API_URL = 'http://127.0.0.1:8000/people/';

function People() {
  const [people, setPeople] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function fetchPeople() {
      try {
        const response = await axios.get(API_URL);
        console.log('Received personal info:', response.data);
        setPeople(response.data[0]);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      }
    }
    fetchPeople();
  }, []);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div className='people-container'>
      {/* Кнопка для открытия/закрытия модального окна */}
      <button className='people-button' onClick={toggleModal}>
        Для физических лиц
      </button>

      {/* Модальное окно */}
      {modalOpen && (
        <div className='modal-overlay' onClick={toggleModal}>
          <div className='modal-content' onClick={(e) => e.stopPropagation()}>
            {people && people.image && (
              <img src={people.image}
               alt='Ремонт и регулировка окон ПВХ замена уплотнителя, стеклопакетов'
               className='people-modal-image' />
            )}
            {people && <p className='people-modal-text'>{people.text}</p>}
          </div>
        </div>
      )}

          </div>
  );
}

export default People;