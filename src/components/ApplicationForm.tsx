import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

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
  
  const handleCheckboxChange = (name: string, value: string, checked: boolean) => {
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
  
  const handleRadioChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const validateCurrentStep = () => {
    switch (currentStep) {
      case 0: // Personal Information
        return formData.fullName && formData.age && formData.discordId && formData.location;
      case 1: // Rank Information
        return formData.currentRank && formData.mainRole.length > 0 && formData.playTime;
      case 2: // Experience & Goals
        return formData.tournaments && formData.motivation.length > 0 && formData.commitment;
      case 3: // Additional Information
        return formData.contentCreation !== '';
      default:
        return true;
    }
  };
  
  const nextStep = () => {
    if (validateCurrentStep()) {
      if (currentStep < formSteps.length - 1) {
        setCurrentStep(prev => prev + 1);
      }
    } else {
      toast.error("Please fill all required fields in this section");
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all form fields before submission
    for (let i = 0; i < formSteps.length; i++) {
      setCurrentStep(i);
      if (!validateCurrentStep()) {
        toast.error(`Please complete all required fields in ${formSteps[i].name}`);
        return;
      }
    }
    
    // If all validations pass
    console.log('Form submitted:', formData);
    
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
        <div className="bg-valorant-red/90 p-6 md:p-8">
          <h2 className="text-3xl md:text-4xl font-valorant text-white text-center">
            JOIN TEAM TRAGIC
          </h2>
          <p className="text-white/80 text-center mt-2 max-w-2xl mx-auto">
            Fill out the application below to be considered for our competitive Valorant team.
          </p>
        </div>
        
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
        
        <form onSubmit={handleSubmit} className="p-6 md:p-10">
          <div className={`form-step ${currentStep === 0 ? 'active' : ''}`}>
            <h3 className="text-2xl font-valorant text-white mb-6">Personal Information</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block text-white/80 mb-2">Full Name</label>
                <Input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 text-white border-white/20"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="age" className="block text-white/80 mb-2">Age</label>
                <Input
                  type="number"
                  id="age"
                  name="age"
                  min="13"
                  max="99"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 text-white border-white/20"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="discordId" className="block text-white/80 mb-2">Discord ID</label>
                <Input
                  type="text"
                  id="discordId"
                  name="discordId"
                  placeholder="username#0000"
                  value={formData.discordId}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 text-white border-white/20"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="location" className="block text-white/80 mb-2">City & Country</label>
                <Input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 text-white border-white/20"
                  required
                />
              </div>
            </div>
          </div>
          
          <div className={`form-step ${currentStep === 1 ? 'active' : ''}`}>
            <h3 className="text-2xl font-valorant text-white mb-6">Rank Information</h3>
            
            <div className="mb-8">
              <p className="text-white/80 mb-3">What is your current rank in Valorant? (Select your highest rank)</p>
              <RadioGroup 
                name="currentRank" 
                value={formData.currentRank} 
                onValueChange={(value) => handleRadioChange('currentRank', value)}
                className="grid grid-cols-2 md:grid-cols-3 gap-4"
              >
                {['Gold', 'Platinum', 'Diamond', 'Ascendant', 'Immortal', 'Radiant'].map(rank => (
                  <div key={rank} className="flex items-center bg-white/5 hover:bg-white/10 transition-colors p-3 rounded-md space-x-2">
                    <RadioGroupItem value={rank} id={`rank-${rank}`} className="text-white" />
                    <Label htmlFor={`rank-${rank}`} className="text-white cursor-pointer w-full">{rank}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            <div className="mb-8">
              <p className="text-white/80 mb-3">What is your main role in Valorant? (Select one or more)</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Duelist', 'Controller', 'Initiator', 'Sentinel'].map(role => (
                  <div key={role} className="flex items-center bg-white/5 hover:bg-white/10 transition-colors p-3 rounded-md space-x-2">
                    <Checkbox 
                      id={`role-${role}`} 
                      checked={formData.mainRole.includes(role)}
                      onCheckedChange={(checked) => handleCheckboxChange('mainRole', role, checked as boolean)}
                      className="text-white data-[state=checked]:bg-valorant-red"
                    />
                    <Label htmlFor={`role-${role}`} className="text-white cursor-pointer w-full">{role}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <p className="text-white/80 mb-3">How many hours do you play per day?</p>
              <RadioGroup 
                name="playTime" 
                value={formData.playTime} 
                onValueChange={(value) => handleRadioChange('playTime', value)}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                {[
                  'Less than 2 hours', 
                  '2-4 hours', 
                  '4-6 hours', 
                  'More than 6 hours'
                ].map(time => (
                  <div key={time} className="flex items-center bg-white/5 hover:bg-white/10 transition-colors p-3 rounded-md space-x-2">
                    <RadioGroupItem value={time} id={`time-${time}`} className="text-white" />
                    <Label htmlFor={`time-${time}`} className="text-white cursor-pointer w-full">{time}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
          
          <div className={`form-step ${currentStep === 2 ? 'active' : ''}`}>
            <h3 className="text-2xl font-valorant text-white mb-6">Experience & Goals</h3>
            
            <div className="mb-8">
              <p className="text-white/80 mb-3">Have you participated in any tournaments before?</p>
              <RadioGroup 
                name="tournaments" 
                value={formData.tournaments} 
                onValueChange={(value) => handleRadioChange('tournaments', value)}
                className="grid grid-cols-2 gap-4 max-w-xs"
              >
                {['Yes', 'No'].map(option => (
                  <div key={option} className="flex items-center bg-white/5 hover:bg-white/10 transition-colors p-3 rounded-md space-x-2">
                    <RadioGroupItem value={option} id={`tournament-${option}`} className="text-white" />
                    <Label htmlFor={`tournament-${option}`} className="text-white cursor-pointer w-full">{option}</Label>
                  </div>
                ))}
              </RadioGroup>
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
                  <div key={reason} className="flex items-center bg-white/5 hover:bg-white/10 transition-colors p-3 rounded-md space-x-2">
                    <Checkbox 
                      id={`motivation-${reason}`} 
                      checked={formData.motivation.includes(reason)}
                      onCheckedChange={(checked) => handleCheckboxChange('motivation', reason, checked as boolean)}
                      className="text-white data-[state=checked]:bg-valorant-red"
                    />
                    <Label htmlFor={`motivation-${reason}`} className="text-white cursor-pointer w-full">{reason}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <p className="text-white/80 mb-3">Are you willing to commit to regular training sessions and team meetings?</p>
              <RadioGroup 
                name="commitment" 
                value={formData.commitment} 
                onValueChange={(value) => handleRadioChange('commitment', value)}
                className="grid md:grid-cols-3 gap-4"
              >
                {[
                  'Yes', 
                  'No', 
                  'Depends on schedule'
                ].map(option => (
                  <div key={option} className="flex items-center bg-white/5 hover:bg-white/10 transition-colors p-3 rounded-md space-x-2">
                    <RadioGroupItem value={option} id={`commitment-${option}`} className="text-white" />
                    <Label htmlFor={`commitment-${option}`} className="text-white cursor-pointer w-full">{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
          
          <div className={`form-step ${currentStep === 3 ? 'active' : ''}`}>
            <h3 className="text-2xl font-valorant text-white mb-6">Additional Information</h3>
            
            <div className="mb-8">
              <p className="text-white/80 mb-3">Do you have experience in streaming, content creation, or coaching?</p>
              <RadioGroup 
                name="contentCreation" 
                value={formData.contentCreation} 
                onValueChange={(value) => handleRadioChange('contentCreation', value)}
                className="grid grid-cols-2 gap-4 max-w-xs"
              >
                {['Yes', 'No'].map(option => (
                  <div key={option} className="flex items-center bg-white/5 hover:bg-white/10 transition-colors p-3 rounded-md space-x-2">
                    <RadioGroupItem value={option} id={`content-${option}`} className="text-white" />
                    <Label htmlFor={`content-${option}`} className="text-white cursor-pointer w-full">{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            <div>
              <label htmlFor="additionalInfo" className="block text-white/80 mb-2">
                Additional Comments or Questions
              </label>
              <Textarea
                id="additionalInfo"
                name="additionalInfo"
                rows={4}
                className="w-full bg-white/10 text-white border-white/20 resize-none"
                placeholder="Tell us anything else you'd like us to know..."
                value={formData.additionalInfo}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="mt-8 text-center text-white/70">
              <p>Submit your form, and we will review your application. If shortlisted, you will be contacted for tryouts.</p>
              <p className="mt-2 font-bold text-valorant-red">Good luck!</p>
            </div>
          </div>
          
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
