import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { fr } from '../locales/fr';
import { en } from '../locales/en';
import type { Translations } from '../locales/fr';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const getDefaultLanguage = (): Language => {
    const navLang = navigator.language || navigator.languages[0] || 'en';
    return navLang.startsWith('en') ? 'en' : 'fr';
  };

  const [language, setLanguage] = useState<Language>(getDefaultLanguage());
  const t = language === 'fr' ? fr : en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
