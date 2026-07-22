import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Price from './Price';
import { useNavigate } from 'react-router-dom';
import './Price.css';

const API_URL_PRICE = 'http://127.0.0.1:8000/price/';

function PriceList() {
  const [prices, setPrices] = useState([]);
  const [expandedIds, setExpandedIds] = useState([]); // список открытых строк

  useEffect(() => {
    async function fetchPrices() {
      try {
        const response = await axios.get(API_URL_PRICE);
        setPrices(response.data);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    }
    fetchPrices();
  }, []);
  const toggleExpand = (id) => {
    setExpandedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className='PriceList-main'>
      <h2 className='PriceList-title'>Услуги и цены</h2>
      <h3 className='PriceList-title-comment'>Цены ориентировочные и зависят от размера изделия ПВХ!</h3>

      <div className='PriceList-columns'>

        <div className='column services-column'>
          {prices.map((item) => (
            <div
              key={item.id}
              className={`service-item ${expandedIds.includes(item.id) ? 'expanded' : ''}`}
              onClick={() => toggleExpand(item.id)}
            >
              {item.service_name}
            </div>
          ))}
        </div>

        {/* Колонка с ценами */}
        <div className='column prices-column'>
          {prices.map((item) => (
            <div key={item.id} className='price-item'>
              {item.base_price} руб
            </div>
          ))}
        </div>
      </div>
      <h2 className='PriceList-end'>и многое другое!</h2>
    </div>
  );
}

export default PriceList;