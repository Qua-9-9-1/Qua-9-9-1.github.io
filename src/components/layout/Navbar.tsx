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
import { useIsMobile } from '../../hooks/useMediaQuery';
import { Menu, Palette } from 'lucide-react';
import { useRemoteConfig } from '../../hooks/useRemoteConfig';
import SmartLink from '../ui/smartLink';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

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

  const links = [
    { to: '/', label: t.layout.navbar.home },
    { to: '/projects', label: t.layout.navbar.projects },
    { to: '/contact', label: t.layout.navbar.contact },
  ];

  return (
    <>
      <nav className="sticky top-0 z-10 bg-background/75 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <SmartLink
            to="/"
            className="flex items-center gap-2.5 rounded-lg select-none"
            aria-label={t.layout.navbar.home}
          >
            <Avatar className="rounded-lg ring-2 ring-primary/30">
              <AvatarImage
                src={`https://github.com/${config.github_user}.png?size=320`}
                alt=""
                fetchPriority="high"
                loading="eager"
              />
              <AvatarFallback className="rounded-lg">Q</AvatarFallback>
            </Avatar>
            <span
              className={cn(
                'text-lg font-bold tracking-tight text-gradient-brand',
                loading && 'animate-pulse'
              )}
            >
              {config.github_user}
            </span>
          </SmartLink>

          {!isMobile && (
            <div className="flex-1 flex justify-center select-none">
              <div className="flex items-center gap-1 rounded-full border bg-card/70 p-1 shadow-sm">
                {links.map((link) => (
                  <SmartLink
                    key={link.to}
                    to={link.to}
                    aria-current={isActive(link.to) ? 'page' : undefined}
                    className={cn(
                      'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                      isActive(link.to)
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                    )}
                  >
                    {link.label}
                  </SmartLink>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size={isMobile ? 'icon' : 'default'}
              className="rounded-full"
              onClick={() => setIsThemeModalOpen(true)}
              aria-label={t.layout.navbar.theme}
            >
              <Palette className="text-primary" />
              {!isMobile && t.layout.navbar.theme}
            </Button>
            <Button
              variant="outline"
              size={isMobile ? 'icon' : 'default'}
              className="rounded-full"
              onClick={toggleLanguage}
              aria-label={
                language === 'fr' ? 'Switch to English' : 'Passer en français'
              }
              title={language === 'fr' ? 'English' : 'Français'}
            >
              <img
                className="size-5 rounded-full"
                src={language === 'fr' ? '/lang/fr.webp' : '/lang/en.webp'}
                alt=""
                width={20}
                height={20}
              />
              {!isMobile && (
                <span className="font-semibold uppercase">{language}</span>
              )}
            </Button>

            {isMobile && (
              <Menubar className="h-9 rounded-full border bg-background p-0 shadow-sm">
                <MenubarMenu>
                  <MenubarTrigger
                    className="h-9 w-9 justify-center rounded-full p-0"
                    aria-label="Menu"
                  >
                    <Menu className="size-4" />
                  </MenubarTrigger>
                  <MenubarContent align="end" alignOffset={0}>
                    {links.map((link) => (
                      <SmartLink key={link.to} to={link.to}>
                        <MenubarItem
                          className={cn(
                            isActive(link.to) && 'font-semibold text-primary'
                          )}
                        >
                          {link.label}
                        </MenubarItem>
                      </SmartLink>
                    ))}
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            )}
          </div>
        </div>
        {/* Thin brand-coloured line under the bar */}
        <div
          aria-hidden="true"
          className="h-0.5 bg-gradient-to-r from-brand via-brand-2 to-brand opacity-70"
        />
      </nav>
      <ThemeModal
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
      />
    </>
  );
}
