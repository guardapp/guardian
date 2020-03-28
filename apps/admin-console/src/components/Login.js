import React from 'react';
import {TextField} from '@material-ui/core';

export default function Login() {
    return (
        <form noValidate>
            <TextField 
            id="email" 
            name="email" 
            type="email" 
            label="Email"/>
        </form>
    );
}