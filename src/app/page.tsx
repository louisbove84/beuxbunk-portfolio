'use client';

import React, { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    // If this is being loaded in a Farcaster context, redirect to the frame
    if (typeof window !== 'undefined') {
      const userAgent = window.navigator.userAgent;
      const isFarcaster = userAgent.includes('Farcaster') || 
                         window.location.search.includes('farcaster') ||
                         document.referrer.includes('farcaster');
      
      if (isFarcaster) {
        window.location.href = '/frame';
        return;
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 font-mono">
          MEME GAMES HUB
        </h1>
        <p className="text-xl text-blue-300 mb-12 font-mono">
          Choose Your Chaos! 🎮
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <a
            href="/frame?game=spaceinvaders"
            className="inline-block bg-red-500 text-white px-8 py-6 rounded-lg font-mono font-bold text-xl hover:bg-red-600 hover:scale-105 transition-all duration-300 shadow-lg"
          >
            🚀 SPACE INVADERS
          </a>
          
          <a
            href="/frame?game=runner"
            className="inline-block bg-green-500 text-white px-8 py-6 rounded-lg font-mono font-bold text-xl hover:bg-green-600 hover:scale-105 transition-all duration-300 shadow-lg"
          >
            🔥 THIS IS FINE
          </a>
        </div>
        
        <p className="text-sm text-gray-400 mt-8 font-mono">
          Classic arcade action vs. endless runner survival
        </p>
      </div>
    </div>
  );
};

export default Home;