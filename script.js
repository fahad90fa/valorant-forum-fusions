
// DOM Elements
const form = document.getElementById('team-application');
const formSteps = document.querySelectorAll('.form-step');
const progressSteps = document.querySelectorAll('.progress-step');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const toast = document.getElementById('toast');
const toastMessage = document.querySelector('.toast-message');
const currentYearElement = document.getElementById('currentYear');

// Set current year for footer
currentYearElement.textContent = new Date().getFullYear();

// Form Data Object
let formData = {
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
};

// Current step tracker
let currentStep = 0;

// Initialize the form
function init() {
  // Show first step
  updateStepDisplay();
  
  // Add event listeners
  prevBtn.addEventListener('click', goToPrevStep);
  nextBtn.addEventListener('click', goToNextStep);
  form.addEventListener('submit', handleSubmit);
  
  // Add input listeners
  document.querySelectorAll('input, textarea').forEach(input => {
    const name = input.name;
    
    if (input.type === 'checkbox') {
      input.addEventListener('change', function() {
        if (this.checked) {
          if (!formData[name].includes(this.value)) {
            formData[name].push(this.value);
          }
        } else {
          formData[name] = formData[name].filter(item => item !== this.value);
        }
        console.log(`Field ${name} updated to:`, formData[name]);
      });
    } else if (input.type === 'radio') {
      input.addEventListener('change', function() {
        formData[name] = this.value;
        console.log(`Field ${name} updated to: ${formData[name]}`);
      });
    } else {
      input.addEventListener('input', function() {
        formData[name] = this.value;
        console.log(`Field ${name} updated to: ${formData[name]}`);
      });
    }
  });
}

// Update step display
function updateStepDisplay() {
  // Hide all steps
  formSteps.forEach(step => {
    step.classList.remove('active');
  });
  
  // Show current step
  formSteps[currentStep].classList.add('active');
  
  // Update progress indicators
  progressSteps.forEach((step, index) => {
    if (index <= currentStep) {
      step.classList.add('active');
    } else {
      step.classList.remove('active');
    }
  });
  
  // Update buttons
  if (currentStep === 0) {
    prevBtn.style.visibility = 'hidden';
  } else {
    prevBtn.style.visibility = 'visible';
  }
  
  if (currentStep === formSteps.length - 1) {
    nextBtn.style.display = 'none';
    submitBtn.style.display = 'block';
  } else {
    nextBtn.style.display = 'block';
    submitBtn.style.display = 'none';
  }
}

// Validate current step
function validateCurrentStep() {
  const currentFormStep = formSteps[currentStep];
  
  switch (currentStep) {
    case 0: // Personal Information
      const fullName = document.getElementById('fullName').value;
      const age = document.getElementById('age').value;
      const discordId = document.getElementById('discordId').value;
      const location = document.getElementById('location').value;
      
      return fullName && age && discordId && location;
      
    case 1: // Rank Information
      const currentRank = document.querySelector('input[name="currentRank"]:checked');
      const mainRoles = document.querySelectorAll('input[name="mainRole"]:checked');
      const playTime = document.querySelector('input[name="playTime"]:checked');
      
      return currentRank && mainRoles.length > 0 && playTime;
      
    case 2: // Experience & Goals
      const tournaments = document.querySelector('input[name="tournaments"]:checked');
      const motivations = document.querySelectorAll('input[name="motivation"]:checked');
      const commitment = document.querySelector('input[name="commitment"]:checked');
      
      return tournaments && motivations.length > 0 && commitment;
      
    case 3: // Additional Information
      const contentCreation = document.querySelector('input[name="contentCreation"]:checked');
      
      return contentCreation !== null;
      
    default:
      return true;
  }
}

// Go to previous step
function goToPrevStep() {
  if (currentStep > 0) {
    currentStep--;
    updateStepDisplay();
  }
}

// Go to next step
function goToNextStep() {
  if (!validateCurrentStep()) {
    showToast('Please fill all required fields in this section', 'error');
    return;
  }
  
  if (currentStep < formSteps.length - 1) {
    currentStep++;
    updateStepDisplay();
    
    // Scroll to top of form
    formSteps[currentStep].scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Handle form submission
function handleSubmit(e) {
  e.preventDefault();
  
  // Validate all steps
  for (let i = 0; i < formSteps.length; i++) {
    currentStep = i;
    if (!validateCurrentStep()) {
      updateStepDisplay();
      showToast(`Please complete all required fields in step ${i + 1}`, 'error');
      return;
    }
  }
  
  // Get final form data
  formData = {
    fullName: document.getElementById('fullName').value,
    age: document.getElementById('age').value,
    discordId: document.getElementById('discordId').value,
    location: document.getElementById('location').value,
    currentRank: document.querySelector('input[name="currentRank"]:checked')?.value || '',
    mainRole: Array.from(document.querySelectorAll('input[name="mainRole"]:checked')).map(el => el.value),
    playTime: document.querySelector('input[name="playTime"]:checked')?.value || '',
    tournaments: document.querySelector('input[name="tournaments"]:checked')?.value || '',
    motivation: Array.from(document.querySelectorAll('input[name="motivation"]:checked')).map(el => el.value),
    commitment: document.querySelector('input[name="commitment"]:checked')?.value || '',
    contentCreation: document.querySelector('input[name="contentCreation"]:checked')?.value || '',
    additionalInfo: document.getElementById('additionalInfo').value
  };
  
  // Log the form data
  console.log('Form submitted:', formData);
  
  // Show success message
  showToast('Application submitted successfully! We will contact you soon.', 'success');
  
  // Reset form
  form.reset();
  currentStep = 0;
  updateStepDisplay();
  
  // Reset formData object
  formData = {
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
  };
}

// Show toast message
function showToast(message, type = 'success') {
  toastMessage.textContent = message;
  toast.className = 'toast show ' + type;
  
  setTimeout(() => {
    toast.className = toast.className.replace('show', '');
  }, 5000);
}

// Initialize the form when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});
