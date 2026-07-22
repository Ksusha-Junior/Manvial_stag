import React, { useEffect, useState } from 'react';
import Comment from './Comment';
import axios from 'axios';
import './Comments.css';

const API_URL = 'http://127.0.0.1:8000/comments/';

function CommentsList() {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        const response = await axios.get(API_URL);
        setComments(response.data);
    };

    const handleCommentAdded = () => {
        fetchComments(); // Обновляем список комментариев после добавления нового
    };

    return (
        <div className='comments-container'>
            <h2>Отзывы</h2>
            <ul className='comments-list'>
                {comments.map(comment => (
                    <li key={comment.id}>
                        <Comment comment={comment} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CommentsList;

