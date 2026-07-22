import React from 'react';
import './HomePage.css';
import PostList from '../post/PostList';
import PersonalInfo from '../PersonalInfo/PersonalInfo';


function HomePage() {
    return (
        <div className="home-page">
            <PostList/>
        </div>
    );
}

export default HomePage;
