import React from 'react';
import './style.scss';

const LoadingState = () => {
    return (
        <div className="loading-state__ellipsis">
            <div className="lds-ellipsis">
                <div> </div>
                <div> </div>
                <div> </div>
            </div>
        </div>
    );
}
export default LoadingState;
