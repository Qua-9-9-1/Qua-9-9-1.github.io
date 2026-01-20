import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import ThemeModal from '../theme/ThemeModal';
import '../../styles/components/layout/navbar.css';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '../ui/menubar';
import { Switch } from '../ui/switch';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { Menu, Palette } from 'lucide-react';

export default function Navbar() {
  const { t, language, setLanguage } = useLanguage();
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/" className="flex items-center gap-2">
            <Avatar className="rounded-lg">
              <AvatarImage
                src="https://github.com/Qua-9-9-1.png"
                alt="@Qua-9-9-1"
              />
              <AvatarFallback>Q</AvatarFallback>
            </Avatar>
            <p className="navbar-title">Qua-9-9-1</p>
          </Link>
        </div>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>
              {!isMobile ? <p>{t.layout.navbar.pages}</p> : <Menu />}
            </MenubarTrigger>
            <MenubarContent>
              <Link to="/">
                <MenubarItem>{t.layout.navbar.home}</MenubarItem>
              </Link>
              <Link to="/projects">
                <MenubarItem>{t.layout.navbar.projects}</MenubarItem>
              </Link>
              <Link to="/contact">
                <MenubarItem>{t.layout.navbar.contact}</MenubarItem>
              </Link>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger onClick={() => setIsThemeModalOpen(true)}>
              {!isMobile ? <p>{t.layout.navbar.theme}</p> : <Palette />}
            </MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger onClick={toggleLanguage}>
              {!isMobile ? (
                <>
                  <Switch
                    checked={language === 'en'}
                    onCheckedChange={toggleLanguage}
                  />
                  <img
                    className="w-6 h-6 ml-2"
                    src={language === 'fr' ? '/lang/fr.png' : '/lang/en.png'}
                    alt={language === 'fr' ? 'FR' : 'EN'}
                  />
                </>
              ) : (
                <img
                  className="w-6 h-6"
                  src={language === 'fr' ? '/lang/fr.png' : '/lang/en.png'}
                  alt={language === 'fr' ? 'FR' : 'EN'}
                />
              )}
            </MenubarTrigger>
          </MenubarMenu>
        </Menubar>
      </nav>
      <ThemeModal
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
      />
    </>
  );
}
