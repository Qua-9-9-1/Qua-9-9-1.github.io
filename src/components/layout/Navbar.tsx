import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import ThemeModal from '../theme/ThemeModal';
import '../../styles/components/layout/navbar.css';
import {
  Avatar,
  AvatarFallback,
  AvatarImage, } from '../ui/avatar';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "../ui/menubar"
import { Switch } from "../ui/switch"

export default function Navbar() {
  const { t, language, setLanguage } = useLanguage();
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/" className="navbar-link">
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
            <MenubarTrigger>{t.nav.menu.pages}</MenubarTrigger>
            <MenubarContent>
              <Link to="/">
                <MenubarItem>
                    {t.nav.menu.home}
                </MenubarItem>
              </Link>
              <Link to="/projects">
                <MenubarItem>
                    {t.nav.menu.projects}
                </MenubarItem>
              </Link>
              <Link to="/contact">
                <MenubarItem>
                    {t.nav.menu.contact}
                </MenubarItem>
              </Link>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>{t.nav.menu.options}</MenubarTrigger>
              <MenubarContent>
                <MenubarItem onClick={() => setIsThemeModalOpen(true)}>
                  Theme
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem onClick={toggleLanguage}>
                  <Switch checked={language === 'en'} onCheckedChange={toggleLanguage} />
                    {language === 'fr' ? '🇫🇷 FR' : '🇺🇸 EN'}
                </MenubarItem>
              </MenubarContent>
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
