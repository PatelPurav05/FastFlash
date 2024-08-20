import logo from './logo.svg';
import './App.css';
import FileUploadComponent from './components/FileUpload/FileUploadComponent';
import { useState, useEffect } from 'react';
import { Auth } from './components/auth';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          TestChange
        </p>
        <Auth />
        <FileUploadComponent />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
