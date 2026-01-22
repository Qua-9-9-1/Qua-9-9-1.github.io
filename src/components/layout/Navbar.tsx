import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import ThemeModal from './ThemeModal';
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
import { useRemoteConfig } from '../../hooks/useRemoteConfig';
import SmartLink from '../ui/smartLink';
import { Button } from '../ui/button';
import { ButtonGroup, ButtonGroupSeparator } from '../ui/button-group';
import { Separator } from '../ui/separator';

export default function Navbar() {
  const { t, language, setLanguage } = useLanguage();
  const { config, loading } = useRemoteConfig();
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  return (
    <>
      <nav className="z-10 flex items-center justify-between px-4 py-4 sticky top-0 border-b-2 border-secondary bg-gradient-to-b from-background/80 to-bg-secondary backdrop-blur-md">
        <div className="font-bold text-xl select-none bg-gradient-to-r from-[var(--primary-main)] to-[var(--secondary-main)] bg-clip-text text-transparent">
          <SmartLink to="/" className="flex items-center gap-2">
            <Avatar className="rounded-lg">
              <AvatarImage
                src={`https://github.com/${config.github_user}.png`}
                alt={`@${config.github_user}`}
              />
              <AvatarFallback>Q</AvatarFallback>
            </Avatar>
            <p
              className={`navbar-title select-none ${loading ? 'animate-pulse' : ''}`}
            >
              {config.github_user}
            </p>
          </SmartLink>
        </div>
        {!isMobile && (
          <div className="flex-1 flex justify-center select-none">
            <ButtonGroup>
              <Button asChild variant={isActive('/') ? 'secondary' : 'outline'}>
                <SmartLink to="/">{t.layout.navbar.home}</SmartLink>
              </Button>
              <ButtonGroupSeparator />
              <Button
                asChild
                variant={isActive('/projects') ? 'secondary' : 'outline'}
              >
                <SmartLink to="/projects">{t.layout.navbar.projects}</SmartLink>
              </Button>
              <ButtonGroupSeparator />
              <Button
                asChild
                variant={isActive('/contact') ? 'secondary' : 'outline'}
              >
                <SmartLink to="/contact">{t.layout.navbar.contact}</SmartLink>
              </Button>
            </ButtonGroup>
          </div>
        )}
        <Menubar>
          {isMobile && (
            <MenubarMenu>
              <MenubarTrigger>
                <Menu />
              </MenubarTrigger>
              <MenubarContent>
                <SmartLink to="/">
                  <MenubarItem>{t.layout.navbar.home}</MenubarItem>
                </SmartLink>
                <SmartLink to="/projects">
                  <MenubarItem>{t.layout.navbar.projects}</MenubarItem>
                </SmartLink>
                <SmartLink to="/contact">
                  <MenubarItem>{t.layout.navbar.contact}</MenubarItem>
                </SmartLink>
              </MenubarContent>
              <Separator orientation="vertical" className="mx-2 bg-secondary" />
            </MenubarMenu>
          )}
          <MenubarMenu>
            <MenubarTrigger onClick={() => setIsThemeModalOpen(true)}>
              {!isMobile ? <p>{t.layout.navbar.theme}</p> : <Palette />}
            </MenubarTrigger>
          <Separator orientation="vertical" className="mx-2 bg-secondary" />
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
