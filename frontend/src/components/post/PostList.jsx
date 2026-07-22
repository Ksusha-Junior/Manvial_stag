import React, { useEffect, useState, useRef } from 'react';
import Post from "./Post";
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Post.css';



const API_URL = 'http://127.0.0.1:8000/post/';

function PostList() {
    const [posts, setPosts] = useState([]);
    const sliderRef = useRef(null); // реф на слайдер


     useEffect(() => {
        async function fetchPosts() {
            const response = await axios.get(API_URL);
            console.log('Received post:', response.data); // добавьте лог
            setPosts(response.data);
        }
        fetchPosts();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false  /*true-если используем встроенные стрелки, false - сли свои*/
    };

    return (
        <div className='app-container'>
            <div class="carousel-container">
                <button class="carousel-arrow prev" onClick={() => sliderRef.current.slickPrev()}>&lt;</button>
                <div class="postlist-container">
                    <Slider ref={sliderRef} {...settings}>
                        {posts.map(post => (
                            <li key={post.id}>
                                <Post post={post}/>
                            </li>
                         ))}
                    </Slider>
                </div>
                <button class="carousel-arrow next" onClick={() => sliderRef.current.slickNext()}>&gt;</button>
            </div>
      </div>
    );
};


export default PostList;