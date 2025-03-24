
import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';

interface FormData {
  fullName: string;
  age: string;
  discordId: string;
  location: string;
  currentRank: string;
  mainRole: string[];
  playTime: string;
  tournaments: string;
  motivation: string[];
  commitment: string;
  contentCreation: string;
  additionalInfo: string;
}

const ApplicationForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    age: '',
    discordId: '',
    location: '',
    currentRank: '',
    mainRole: [],
    playTime: '',
    tournaments: '',
    motivation: [],
    commitment: '',
    contentCreation: '',
    additionalInfo: ''
  });
  
  const formSteps = [
    { name: 'Personal Information', icon: '👤' },
    { name: 'Rank Information', icon: '🏆' },
    { name: 'Experience & Goals', icon: '🎯' },
    { name: 'Additional Information', icon: '📋' }
  ];
  
  const formRef = useRef<HTMLDivElement>(null);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    
    if (checked) {
      setFormData(prev => ({
        ...prev,
        [name]: [...(prev[name as keyof FormData] as string[]), value]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: (prev[name as keyof FormData] as string[]).filter(item => item !== value)
      }));
    }
  };
  
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const nextStep = () => {
    if (currentStep < formSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send the data to a backend
    console.log('Form submitted:', formData);
    
    // Show success message
    toast.success('Application submitted!', {
      description: 'We will review your application and contact you soon.'
    });
    
    // Reset form
    setFormData({
      fullName: '',
      age: '',
      discordId: '',
      location: '',
      currentRank: '',
      mainRole: [],
      playTime: '',
      tournaments: '',
      motivation: [],
      commitment: '',
      contentCreation: '',
      additionalInfo: ''
    });
    
    // Reset to first step
    setCurrentStep(0);
  };

  // Animation for the form when it comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-scale-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => {
      if (formRef.current) {
        observer.unobserve(formRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="application-form" 
      className="py-20 px-4 md:px-10 min-h-screen flex items-center justify-center bg-gradient-to-b from-valorant-black to-valorant-darkGray"
    >
      <div 
        ref={formRef} 
        className="w-full max-w-4xl bg-white/5 backdrop-blur-md border border-white/10 rounded-lg shadow-2xl opacity-0 overflow-hidden"
      >
        {/* Form Header */}
        <div className="bg-valorant-red/90 p-6 md:p-8">
          <h2 className="text-3xl md:text-4xl font-valorant text-white text-center">
            JOIN TEAM TRAGIC
          </h2>
          <p className="text-white/80 text-center mt-2 max-w-2xl mx-auto">
            Fill out the application below to be considered for our competitive Valorant team.
          </p>
        </div>
        
        {/* Progress Steps */}
        <div className="flex justify-center p-4 bg-black/30">
          {formSteps.map((step, index) => (
            <div 
              key={index} 
              className={`flex flex-col items-center mx-2 md:mx-6 ${index <= currentStep ? 'text-white' : 'text-white/40'}`}
            >
              <div className={`flex items-center justify-center w-10 h-10 rounded-full text-lg mb-1
                ${index < currentStep ? 'bg-valorant-red text-white' : 
                  index === currentStep ? 'bg-valorant-red/80 ring-2 ring-valorant-red text-white pulse-glow' : 
                  'bg-white/10 text-white/40'}`}
              >
                {index < currentStep ? '✓' : step.icon}
              </div>
              <span className="text-xs hidden md:block">{step.name}</span>
            </div>
          ))}
        </div>
        
        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 md:p-10">
          {/* Step 1: Personal Information */}
          <div className={`form-step ${currentStep === 0 ? 'active' : ''}`}>
            <h3 className="text-2xl font-valorant text-white mb-6">Personal Information</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block text-white/80 mb-2">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  className="form-input w-full"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label htmlFor="age" className="block text-white/80 mb-2">Age</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  min="13"
                  max="99"
                  required
                  className="form-input w-full"
                  value={formData.age}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label htmlFor="discordId" className="block text-white/80 mb-2">Discord ID</label>
                <input
                  type="text"
                  id="discordId"
                  name="discordId"
                  required
                  placeholder="username#0000"
                  className="form-input w-full"
                  value={formData.discordId}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label htmlFor="location" className="block text-white/80 mb-2">City & Country</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  required
                  className="form-input w-full"
                  value={formData.location}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          
          {/* Step 2: Rank Information */}
          <div className={`form-step ${currentStep === 1 ? 'active' : ''}`}>
            <h3 className="text-2xl font-valorant text-white mb-6">Rank Information</h3>
            
            <div className="mb-8">
              <p className="text-white/80 mb-3">What is your current rank in Valorant? (Select your highest rank)</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {['Gold', 'Platinum', 'Diamond', 'Ascendant', 'Immortal', 'Radiant'].map(rank => (
                  <label key={rank} className="flex items-center bg-white/5 hover:bg-white/10 transition-colors p-3 rounded-md cursor-pointer">
                    <input
                      type="radio"
                      name="currentRank"
                      value={rank}
                      checked={formData.currentRank === rank}
                      onChange={handleRadioChange}
                      className="mr-2"
                    />
                    <span className="text-white">{rank}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="mb-8">
              <p className="text-white/80 mb-3">What is your main role in Valorant? (Select one or more)</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Duelist', 'Controller', 'Initiator', 'Sentinel'].map(role => (
                  <label key={role} className="flex items-center bg-white/5 hover:bg-white/10 transition-colors p-3 rounded-md cursor-pointer">
                    <input
                      type="checkbox"
                      name="mainRole"
                      value={role}
                      checked={formData.mainRole.includes(role)}
                      onChange={handleCheckboxChange}
                      className="mr-2"
                    />
                    <span className="text-white">{role}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <p className="text-white/80 mb-3">How many hours do you play per day?</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  'Less than 2 hours', 
                  '2-4 hours', 
                  '4-6 hours', 
                  'More than 6 hours'
                ].map(time => (
                  <label key={time} className="flex items-center bg-white/5 hover:bg-white/10 transition-colors p-3 rounded-md cursor-pointer">
                    <input
                      type="radio"
                      name="playTime"
                      value={time}
                      checked={formData.playTime === time}
                      onChange={handleRadioChange}
                      className="mr-2"
                    />
                    <span className="text-white">{time}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          {/* Step 3: Experience & Goals */}
          <div className={`form-step ${currentStep === 2 ? 'active' : ''}`}>
            <h3 className="text-2xl font-valorant text-white mb-6">Experience & Goals</h3>
            
            <div className="mb-8">
              <p className="text-white/80 mb-3">Have you participated in any tournaments before?</p>
              <div className="grid grid-cols-2 gap-4 max-w-xs">
                {['Yes', 'No'].map(option => (
                  <label key={option} className="flex items-center bg-white/5 hover:bg-white/10 transition-colors p-3 rounded-md cursor-pointer">
                    <input
                      type="radio"
                      name="tournaments"
                      value={option}
                      checked={formData.tournaments === option}
                      onChange={handleRadioChange}
                      className="mr-2"
                    />
                    <span className="text-white">{option}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="mb-8">
              <p className="text-white/80 mb-3">Why do you want to join Team Tragic? (Select all that apply)</p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'To compete professionally',
                  'To improve my skills in a structured environment',
                  'To be part of a dedicated e-sports community',
                  'For fun and competitive gaming'
                ].map(reason => (
                  <label key={reason} className="flex items-center bg-white/5 hover:bg-white/10 transition-colors p-3 rounded-md cursor-pointer">
                    <input
                      type="checkbox"
                      name="motivation"
                      value={reason}
                      checked={formData.motivation.includes(reason)}
                      onChange={handleCheckboxChange}
                      className="mr-2"
                    />
                    <span className="text-white">{reason}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <p className="text-white/80 mb-3">Are you willing to commit to regular training sessions and team meetings?</p>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  'Yes', 
                  'No', 
                  'Depends on schedule'
                ].map(option => (
                  <label key={option} className="flex items-center bg-white/5 hover:bg-white/10 transition-colors p-3 rounded-md cursor-pointer">
                    <input
                      type="radio"
                      name="commitment"
                      value={option}
                      checked={formData.commitment === option}
                      onChange={handleRadioChange}
                      className="mr-2"
                    />
                    <span className="text-white">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          {/* Step 4: Additional Information */}
          <div className={`form-step ${currentStep === 3 ? 'active' : ''}`}>
            <h3 className="text-2xl font-valorant text-white mb-6">Additional Information</h3>
            
            <div className="mb-8">
              <p className="text-white/80 mb-3">Do you have experience in streaming, content creation, or coaching?</p>
              <div className="grid grid-cols-2 gap-4 max-w-xs">
                {['Yes', 'No'].map(option => (
                  <label key={option} className="flex items-center bg-white/5 hover:bg-white/10 transition-colors p-3 rounded-md cursor-pointer">
                    <input
                      type="radio"
                      name="contentCreation"
                      value={option}
                      checked={formData.contentCreation === option}
                      onChange={handleRadioChange}
                      className="mr-2"
                    />
                    <span className="text-white">{option}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label htmlFor="additionalInfo" className="block text-white/80 mb-2">
                Additional Comments or Questions
              </label>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                rows={4}
                className="form-input w-full resize-none"
                placeholder="Tell us anything else you'd like us to know..."
                value={formData.additionalInfo}
                onChange={handleInputChange}
              ></textarea>
            </div>
            
            <div className="mt-8 text-center text-white/70">
              <p>Submit your form, and we will review your application. If shortlisted, you will be contacted for tryouts.</p>
              <p className="mt-2 font-bold text-valorant-red">Good luck!</p>
            </div>
          </div>
          
          {/* Form Navigation */}
          <div className="mt-10 flex justify-between">
            <button
              type="button"
              onClick={prevStep}
              className={`px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors
                ${currentStep === 0 ? 'invisible' : 'visible'}`}
            >
              Previous
            </button>
            
            {currentStep < formSteps.length - 1 ? (
              <button
                type="button"
                onClick={nextStep}
                className="valorant-button"
              >
                Next Step
              </button>
            ) : (
              <button
                type="submit"
                className="valorant-button"
              >
                Submit Application
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default ApplicationForm;
