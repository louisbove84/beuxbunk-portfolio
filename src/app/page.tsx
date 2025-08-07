'use client';

import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 font-mono">
          MEME GAMES HUB
        </h1>
        <p className="text-xl text-blue-300 mb-8 font-mono">
          Choose Your Chaos! 🎮
        </p>
        
        <a
          href="/frame"
          className="inline-block bg-gradient-to-r from-red-500 via-green-500 to-blue-500 text-white px-12 py-6 rounded-lg font-mono font-bold text-xl hover:scale-105 transition-all duration-300 shadow-lg"
        >
          🎮 PLAY MEME GAMES
        </a>
      </div>
    </div>
  );
};

export default Home;