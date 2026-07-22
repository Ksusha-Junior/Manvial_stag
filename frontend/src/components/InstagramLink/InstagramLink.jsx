import { FaInstagram } from 'react-icons/fa';
import React from 'react';

function InstagramLink() {
  return (
    <a
      href="https://instagram.com/remontokontut"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        textDecoration: 'none',
        color: 'inherit',
        padding: '10px',
        border: '2px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 1)',
        backgroundColor: '#9f9fa1',
      }}
    >
      <FaInstagram size={40} color="#E1306C" />
      <span>На нашей странице в Instagram вы найдете еще больше полезной информации</span>
    </a>
  );
}

export default InstagramLink;

{/*flexDirection: 'column',*/}