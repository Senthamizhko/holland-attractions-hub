import React from 'react';
import './style.scss';

const NotFound = ({ message }) => {
    console.log(message);
    return (
        <p className="not-found">
            {message}
        </p>
    );
}
export default NotFound;
