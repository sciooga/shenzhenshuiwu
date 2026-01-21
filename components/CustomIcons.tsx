import React from 'react';

// A collection of "Hand Drawn" style simple flat icons
export const WaterDropIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21C16.4183 21 20 17.4183 20 13C20 8.58172 12 2 12 2C12 2 4 8.58172 4 13C4 17.4183 7.58172 21 12 21Z" fill={color} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 13C9 13 10 15 12 15" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const BubbleIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" fill={color} stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="8" cy="10" r="2" fill="white"/>
    <circle cx="15" cy="14" r="1" fill="white"/>
    <circle cx="16" cy="8" r="1.5" fill="white"/>
  </svg>
);

export const BarrelIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="6" width="14" height="16" rx="2" fill={color} stroke="currentColor" strokeWidth="1.5"/>
    <path d="M9 6V3H15V6" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M5 10H19" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5"/>
    <path d="M5 16H19" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5"/>
  </svg>
);

export const TeaIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 8H19C20.1046 8 21 8.89543 21 10V11C21 12.1046 20.1046 13 19 13H17" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M5 19C5 20.1046 5.89543 21 7 21H15C16.1046 21 17 20.1046 17 19V8H5V19Z" fill={color} stroke="currentColor" strokeWidth="1.5"/>
    <path d="M7 4C7 4 8 2 10 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M14 4C14 4 15 2 17 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const JuiceIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 7H17L16 21H8L7 7Z" fill={color} stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 7V3" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 3H16" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M10 13L14 13" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const EnergyIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill={color} stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);

export const CoffeeIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 9V17C6 18.6569 7.34315 20 9 20H13C14.6569 20 16 18.6569 16 17V9" fill={color} stroke="currentColor" strokeWidth="1.5"/>
    <path d="M16 11H18C19.1046 11 20 11.8954 20 13V14C20 15.1046 19.1046 16 18 16H16" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M4 9H18" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 5L12 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const BundleIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="8" width="18" height="13" rx="2" fill={color} stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 8V5C8 3.34315 9.34315 2 11 2H13C14.6569 2 16 3.34315 16 5V8" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 12V16" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M10 14H14" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
