import React from "react";

import './Input.css';
import { capitalize } from "../utils/stringUtils";

export default function Input({type, required = false}) {
    const typeCap = capitalize(type);
    return (
        <div className="ga-input">
            <input id={type} name={type} type={type} required={required} placeholder={typeCap}/>
            <label htmlFor={type}>{typeCap}</label>
        </div>
    );
}