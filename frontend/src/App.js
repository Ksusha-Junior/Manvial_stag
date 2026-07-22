import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import PriceList from './components/price/PriceList';
import Message from './components/Message/Message';
import PersonalInfo from './components/PersonalInfo/PersonalInfo';
import Organizations from './components/For_you/Organizations';
import People from './components/For_you/People';
import InstagramLink from './components/InstagramLink/InstagramLink';
import TelegramLink from './components/TelegramLink/TelegramLink';
import ViberLink from './components/ViberLink/ViberLink';
import CommentForm from './components/Comments/CommentForm';
import CommentsList from './components/Comments/CommentsList';
import CommentButton from './components/Comments/CommentButton';
import InterestingList from './components/Interesting/InterestingList';
import './App.css';
import Footer from './components/Footer/Footer';
import { FaTelegramPlane } from 'react-icons/fa';

function App() {
    const [isMobile, setIsMobile] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // функция для определения мобильной ширины
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        handleResize(); // при первой загрузке
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);
    return (
        <Router>
            <div className="app">
                <Header />
                <div className="marquee-container">
                    <div className="scrolling-text">
                        Внимание! При регулировке 2 и более створок, СКИДКА!
                    </div>
                </div>
                <main className='main-content'>
                    <div className="left-column">
                        {isMobile ? (
                            // если мобильное — показываем кнопку
                            <button className='PersonalInfobutton' onClick={openModal}>О нас</button>
                        ) : (
                            <PersonalInfo />
                            )}
                        <Organizations/>
                        <People/>
                        <p className= 'UNN'> УНН 790599443 </p>
                    </div>
                    <div className="center-column">
                        <Routes>
                            <Route  path="/" element={<HomePage />} />
                            <Route path="/prices" element={<PriceList />} />
                            <Route path="/message" element={<Message />} />
                            <Route path="/comments" element={<CommentsList />} />
                            <Route path="/interesting" element={<InterestingList />} />
                        </Routes>
                    </div>
                    <div className="right-column">
                        <InstagramLink />
                        <TelegramLink />
                        <ViberLink />
                        <CommentButton />
                        <p>
                    <a
                        href="https://t.me/Remontokontut_bot"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="telegram-button"
                    >
                      <FaTelegramPlane className="telegram-icon" />
                      <span>Наш Telegram-бот для самостоятельного расчета стоимости ремонта</span>
                    </a>
                    <p className="animated-text">
                      Своевременное обслуживание - залог спокойствия!
                    </p>
                </p>
                    </div>
                </main>
                {/* Модальное окно */}
                {showModal && (
                    <div className="modal" onClick={closeModal}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>

                            <PersonalInfo />
                        </div>
                    </div>
                )}
                <Footer />
            </div>
        </Router>
    );
}

export default App;
