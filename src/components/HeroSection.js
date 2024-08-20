import React from 'react';
import './HeroSection.css';
import '../App.css'


function HeroSection() {
  return (
    <div className='hero-container z-40'>
      <video src='/video/green-bg.mp4' autoPlay loop muted />
      <h1 class="text-lg font-bold transition-transform duration-300 hover:scale-110 hover:text-teal-400">
        FASTFLASH
        </h1>
    <p>Sign in to create personalized flashcards and study sets!</p>
    </div>
  )
}

export default HeroSection