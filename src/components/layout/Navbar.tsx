import { Link } from "react-router-dom";
import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import ThemeModal from "../theme/ThemeModal";
import "../../styles/components/layout/navbar.css";

export default function Navbar() {
  const { t, language, setLanguage } = useLanguage();
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === "fr" ? "en" : "fr");
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/" className="navbar-link">
            Qua-9-9-1
          </Link>
        </div>

        <div className="navbar-links">
          <Link to="/projects" className="navbar-link">
            {t.nav.projects}
          </Link>
          <Link to="/contact" className="navbar-link">
            {t.nav.contact}
          </Link>

          <div className="navbar-switchers">
            <button
              onClick={() => setIsThemeModalOpen(true)}
              aria-label="Changer le thème"
              className="theme-button"
            >
              Color theme
            </button>

            <button
              onClick={toggleLanguage}
              className="language-button"
            >
              {language === "fr" ? "🇫🇷 FR" : "🇺🇸 EN"}
            </button>
          </div>
        </div>
      </nav>
      <ThemeModal
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
      />
    </>
  );
}