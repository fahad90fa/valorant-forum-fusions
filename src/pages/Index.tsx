
import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ApplicationForm from '../components/ApplicationForm';

const Index = () => {
  return (
    <div className="min-h-screen bg-valorant-black text-white">
      <Header />
      <HeroSection />
      <ApplicationForm />
      
      <footer className="bg-black/90 py-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-valorant text-2xl mb-4">TEAM TRAGIC</h2>
          <p className="text-white/70 mb-6">
            Join the elite. Rise with Tragic.
          </p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-white/70 hover:text-valorant-red transition-colors">Twitter</a>
            <a href="#" className="text-white/70 hover:text-valorant-red transition-colors">Discord</a>
            <a href="#" className="text-white/70 hover:text-valorant-red transition-colors">Twitch</a>
            <a href="#" className="text-white/70 hover:text-valorant-red transition-colors">YouTube</a>
          </div>
          <p className="mt-6 text-white/50 text-sm">
            © {new Date().getFullYear()} Team Tragic. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
