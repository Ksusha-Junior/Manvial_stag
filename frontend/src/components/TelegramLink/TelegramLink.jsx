import { FaTelegramPlane } from 'react-icons/fa';

function TelegramLink() {
  return (
    <a
      href="https://t.me/manvial"
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: 'flex',
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
      <FaTelegramPlane size={24} color="#0088cc" />
      <span>Пишите в Telegram</span>
    </a>
  );
}

export default TelegramLink;