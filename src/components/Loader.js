import './loader.css';
import React from 'react';

export const Loader = ({text}) => (
    <div className="loader-container">
        <div className="loader"></div>
        <div>{text}</div>
    </div>
)

Loader.defaultProps = {
    text: 'Loading...'
};