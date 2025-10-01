import React, { useState } from 'react'
import Navigation from './components/Navigation'
import HeroSection from './components/sections/HeroSection'
import AboutSection from './components/sections/AboutSection'
import SkillsSection from './components/sections/SkillsSection'
import PortfolioSection from './components/sections/PortfolioSection'
import EducationSection from './components/sections/EducationSection'
import LanguagesSection from './components/sections/LanguagesSection'
import PlatformsSection from './components/sections/PlatformsSection'
import ContactSection from './components/sections/ContactSection'
import CookieConsent from "react-cookie-consent"
import PrivacyModal from './components/PrivacyModal';
import Footer from './components/Footer'

function App() {
  const [isPrivacyModalOpen, setPrivacyModalOpen] = useState(false);
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

      {/* === MODAL DE PRIVACIDADE (ele fica aqui, mas só aparece quando o estado é true) === */}
      <PrivacyModal 
        isOpen={isPrivacyModalOpen} 
        onClose={() => setPrivacyModalOpen(false)} 
      />

      {/* === BANNER DE COOKIES MODIFICADO === */}
      <CookieConsent
        location="bottom"
        buttonText="Entendi!"
        cookieName="manuelPortelaCookieConsent"
        style={{ background: "#2B373B", fontSize: "14px" }}
        buttonStyle={{ color: "#ffffff", background: "#3b82f6", fontSize: "14px", borderRadius: "8px" }}
        expires={150}
      >
        Este site utiliza cookies para garantir uma melhor experiência e para análise de tráfego.{" "}
        {/* Este link agora é um botão que abre o modal */}
        <button 
          onClick={() => setPrivacyModalOpen(true)} 
          className="font-bold text-primary-400 underline ml-1 hover:text-primary-300"
        >
          Saiba mais.
        </button>
      </CookieConsent>

    </div>
  )
}

export default App
