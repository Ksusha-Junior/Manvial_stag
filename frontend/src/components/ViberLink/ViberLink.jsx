import { FaViber } from 'react-icons/fa';

function ViberLink() {
  return (
    <a
      href="viber://chat?number=+375293122994" // вставьте номер в международном формате
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
      <FaViber size={24} color="#665CAC" />
      <span>Пишите в Viber</span>
    </a>
  );
}

export default ViberLink;