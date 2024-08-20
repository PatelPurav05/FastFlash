import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { useState, useEffect } from 'react';
import { auth } from './service/firebase';
import HeroSection from './components/HeroSection';
import { Routes, Route } from 'react-router-dom';
import Flashcards from './pages/flashcards';
import FlashcardSets from './components/FlashCardSets/FlashcardSets';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  return (
    <div className="App bg-gradient-to-r from-emerald-200 to-emerald-400 h-full">
      <Navbar />
       
      <header className="App-header">
        <Routes>
          <Route path="/" element={<HeroSection/>} />
          <Route 
            path="/upload" 
            element={user ? <Flashcards /> : <></>} 
          />
          <Route 
            path="/flashcards" 
            element={user ? <FlashcardSets /> : <></>} 
          />
          {/* <Route path="/profile" element={<Profile user={user} />} /> */}
          {/* Add more routes as needed */}
        </Routes>
      </header>
      
    </div>
  );
}

export default App;
