import React from 'react';
import './style.scss';

const NotFound = ({ message }) => {
    return (
        <p
         className="not-found" 
         role="alert"
         aria-live="assertive"
         >
            {message}
        </p>
    );
}
export default NotFound;
