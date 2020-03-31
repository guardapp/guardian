import React from 'react';

import './Row.css';

export default function Center(props) {
    return (
        <div className={`row ${props.col ? 'col': ''}`}>
            {props.children}
        </div>
    );
}