import React from 'react';
import PropTypes from 'prop-types';
import './Post.css';

const Post = ({post}) => {
    return(
        <div className='post'>
            <h2 className='post-title'>{post.title}</h2>

            <img src={post.image}
            className="post-image"
            alt='ремонт, регулировка окон пвх. Замена уплотнителя истеклопакетов' />
            <p className='post-text'>{post.text}</p>

        </div>
    );
};

Post.propTypes = {
    post: PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.string,
        text: PropTypes.string.isRequired,
    }).isRequired,
};

export default Post;