import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import telegramIcon from '../../images/telegram.png';
import viberIcon from '../../images/viber.png';
import instaIcon from '../../images/insta.jpg';

function Header() {
    /*const { user, logout } = useAuth();*/
    return (
        <header className="header">
            <div className="header-main">
                <h1 className="header-title">Манвиал</h1>
                <h2 className='header-text'>Ремонт и регулировка окон ПВХ! Качественно! Недорого!</h2>

                <nav className="header-nav">
                    <ul>
                        <li><Link to="/">Главная</Link></li>
                        <li><Link to="/prices">Услуги и цены</Link></li>
                        <li><Link to="/message">Это важно!</Link></li>
                        <li><Link to="/comments">Отзывы</Link></li>
                        <li><Link to="/interesting">Это интересно!</Link></li>

                    </ul>
                </nav>
            </div>
            <div className='social-networks'>
                <p>
                    <a className='telegram'
                        href="https://t.me/manvial"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="telegram-link"
                    >
                        <img
                            src={telegramIcon}
                            alt="Telegram"
                            style={{ width: 24, height: 24, marginRight: 8 }}
                        />
                    </a>
                    <a className='viber'
                      href="viber://chat?number=+375293122994" // вставьте номер в международном формате
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'inherit' }}
                    >
                      <img
                            src={viberIcon}
                            alt="Viber"
                            style={{ width: 24, height: 24, marginRight: 8 }}
                        />
                    </a>
                    <a className='insta'
                      href="https://instagram.com/remontokontut"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'flex',  alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'inherit' }}
                    >
                      <img
                            src={instaIcon}
                            alt="Insta"
                            style={{ width: 24, height: 24, marginRight: 8 }}
                        />
                    </a>
                </p>
            </div>
            <div className="work-time">
                <p>
                    <h2>Пн-Вс</h2>
                    <h2>9.00-20.00</h2>
                    <h1>+375 29 312 29 94</h1>
                    <h1>+375 29 742 15 65</h1>
                </p>
            </div>

        </header>
    );
}

export default Header;
