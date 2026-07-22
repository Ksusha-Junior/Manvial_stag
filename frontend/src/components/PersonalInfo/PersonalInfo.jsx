import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PersonalInfo.css';

const API_URL = 'http://127.0.0.1:8000/personalinfo/';

function PersonalInfo() {
    const [personalinfo, setPersonalInfo] = useState(null);

    useEffect(() => {
        async function fetchPersonalInfo() {
            const response = await axios.get(API_URL);
            setPersonalInfo(response.data[0]);
        }
        fetchPersonalInfo();
    }, []);

    return (
        <div>
            {personalinfo ? (
                <>
                  {personalinfo.image && (
                    <img src={personalinfo.image}
                    alt="ремонт и регулировка окон ПВХ, замена уплотнителя, стеклопакетов, москитные сетки"
                    className="personalinfo-image" />
                  )}
                  <p className='personalinfo-text'>{personalinfo.text}</p>
                </>
            ) : (
                <p>Нет данных</p>
            )}
        </div>
    );
}

export default PersonalInfo;