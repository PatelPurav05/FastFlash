import logo from './logo.svg';
import './App.css';
import FileUploadComponent from './components/FileUpload/FileUploadComponent';
import { useState, useEffect } from 'react';
import { Auth } from './components/auth';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Auth />
        <FileUploadComponent />
      </header>
    </div>
  );
}

export default App;
