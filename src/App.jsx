import React, { useState, useEffect } from 'react';
import ReactGA from 'react-ga4';
import Navigation from './components/Navigation';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import SkillsSection from './components/sections/SkillsSection';
import PortfolioSection from './components/sections/PortfolioSection';
import EducationSection from './components/sections/EducationSection';
import LanguagesSection from './components/sections/LanguagesSection';
import PlatformsSection from './components/sections/PlatformsSection';
import ContactSection from './components/sections/ContactSection';
import CookieConsent from "react-cookie-consent";
import PrivacyModal from './components/PrivacyModal';
import Footer from './components/Footer';
//import Chatbot from './components/Chatbot';

const MEASUREMENT_ID = "G-SCJ3MHR1ME";

function App() {
  const [isPrivacyModalOpen, setPrivacyModalOpen] = useState(false);
  
  useEffect(() => {
    ReactGA.initialize(MEASUREMENT_ID);
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <PortfolioSection />
        <EducationSection />
        <LanguagesSection />
        <PlatformsSection />
        <ContactSection />
      </main>
      <Footer />

      <PrivacyModal 
        isOpen={isPrivacyModalOpen} 
        onClose={() => setPrivacyModalOpen(false)} 
      />
      <CookieConsent
        location="bottom"
        buttonText="Entendi!"
        cookieName="manuelPortelaCookieConsent"
        style={{ background: "#2B373B", fontSize: "14px" }}
        buttonStyle={{ color: "#ffffff", background: "#3b82f6", fontSize: "14px", borderRadius: "8px" }}
        expires={150}
      >
        Este site utiliza cookies para garantir uma melhor experiência e para análise de tráfego.{" "}
        <button 
          onClick={() => setPrivacyModalOpen(true)} 
          className="font-bold text-primary-400 underline ml-1 hover:text-primary-300"
        >
          Saiba mais.
        </button>
      </CookieConsent>
      {/*<Chatbot />*/}
    </div>
  )
}

export default App