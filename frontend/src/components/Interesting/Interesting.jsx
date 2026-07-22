import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function InterestingItem({ article, onClick }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const shortText = article.text.slice(0, 50) + (article.text.length > 50 ? '...' : '');

  return (
    <div
      className="article-card"
      onClick={onClick} // вызываем переданный обработчик
    >
      <img
        src={article.image}
        alt={article.title}
        className="article-image"
      />
      <h3 className="article-title">{article.title}</h3>
      <p className="article-text">
        {expanded ? article.text : shortText}
      </p>
    </div>
  );
}
export default InterestingItem;