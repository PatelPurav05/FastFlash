import logo from './logo.svg';
import './App.css';
import FileUploadComponent from './components/FileUpload/FileUploadComponent';
import Navbar, { StickyNavbar } from './components/Navbar/Navbar';
import { useState, useEffect } from 'react';
import { Auth } from './components/auth';

function App() {
  return (
    <div className="App bg-gradient-to-r from-emerald-200 to-emerald-400 h-full">
      <Navbar />
      <header className="App-header">
        <FileUploadComponent />
      </header>
    </div>
  );
}

export default App;
