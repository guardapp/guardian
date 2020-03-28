import React from 'react';
// import './App.css';
import Navigation from "./components/Navigation";
import Login from './components/Login';
import {Container} from '@material-ui/core';

function App() {
  return (
    <div className="App">
      <Navigation/>
      <Container>
        <Login/>
      </Container>
    </div>
  );
}

export default App;
