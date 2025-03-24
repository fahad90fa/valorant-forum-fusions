
import React, { useEffect, useRef } from 'react';

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Video parallax effect
    const handleScroll = () => {
      if (!videoRef.current || !titleRef.current) return;
      
      const scrollY = window.scrollY;
      const translateY = scrollY * 0.5; // Adjust speed
      
      videoRef.current.style.transform = `translateY(${translateY}px)`;
      titleRef.current.style.transform = `translateY(${translateY * 0.7}px)`;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute w-full h-full object-cover scale-110"
        >
          <source src="https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt714eaee50b90fc27/62cc7dcc6a8fb133b0ff7e55/VALORANT_ANNO22_SHATTERED_16x9_27s.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Content Overlay */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-4">
        <span className="text-valorant-red font-valorant text-2xl md:text-3xl mb-2 opacity-0 animate-fade-in" style={{animationDelay: '0.3s'}}>
          JOIN THE ELITE
        </span>
        <h2 
          ref={titleRef}
          className="font-valorant text-5xl md:text-7xl lg:text-9xl text-white text-center leading-tight mb-8 opacity-0 animate-fade-in" 
          style={{animationDelay: '0.6s'}}
        >
          #RISEWITHTRAGIC
        </h2>
        <p className="text-white/80 max-w-md text-center mb-10 opacity-0 animate-fade-in" style={{animationDelay: '0.9s'}}>
          Team Tragic is recruiting talented players to join our competitive Valorant roster. Apply now and take your gaming career to the next level.
        </p>
        <div className="opacity-0 animate-fade-in" style={{animationDelay: '1.2s'}}>
          <button 
            className="valorant-button"
            onClick={() => {
              const formElement = document.getElementById('application-form');
              if (formElement) {
                formElement.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            APPLY NOW
          </button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center opacity-0 animate-fade-in" style={{animationDelay: '1.5s'}}>
        <span className="text-white/70 text-sm mb-2">Scroll Down</span>
        <div className="w-0.5 h-12 bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 w-full h-1/2 bg-valorant-red animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
