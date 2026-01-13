import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

export default function Navbar() {
  const { t, language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      padding: '1.5rem 2rem',
      background: 'rgba(255, 255, 255, 0.8)', // Un peu de transparence
      backdropFilter: 'blur(10px)', // Effet verre dépoli (moderne)
      position: 'sticky',
      top: 0,
      zIndex: 10
    }}>
      {/* Logo ou Nom */}
      <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          MonPortfolio
        </Link>
      </div>

      {/* Liens + Switch */}
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Link to="/projects">{t.nav.projects}</Link>
        <Link to="/contact">{t.nav.contact}</Link>
        
        {/* Le Switcher Stylé */}
        <button 
          onClick={toggleLanguage}
          style={{
            background: 'none',
            border: '1px solid #ccc',
            borderRadius: '20px',
            padding: '5px 12px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontSize: '0.9rem'
          }}
        >
          {language === 'fr' ? '🇫🇷 FR' : '🇺🇸 EN'}
        </button>
      </div>
    </nav>
  );
}