import React, { useState, useEffect } from 'react';
import InterestingItem from "./Interesting";
import Modal from './Modal';
import './Interesting.css';

const API_URL = 'https://127.0.0.1:8000/interesting/';

function fetchArticles() {
  return fetch(API_URL)
    .then(res => res.json());
}

function InterestingList() {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null); // выбранная статья
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchArticles().then(data => setArticles(data));
  }, []);

  const openModal = (article) => {
    setSelectedArticle(article);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedArticle(null);
    setModalOpen(false);
  };

  return (
    <div>
      <div className="grid-container">
        {articles.map(article => (
          <InterestingItem key={article.id} article={article} onClick={() => openModal(article)} />
        ))}
      </div>

      {/* Модальное окно с подробностями статьи */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedArticle && (
          <div>
            <h2>{selectedArticle.title}</h2>
            <img src={selectedArticle.image} alt={selectedArticle.title} style={{ width: '100%', marginBottom: '10px' }} />
            <p>{selectedArticle.text}</p>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default InterestingList;