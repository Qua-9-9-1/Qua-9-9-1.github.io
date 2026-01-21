import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { Toaster } from '../ui/sonner';
import { toast } from 'sonner';
import { useRemoteConfig } from '../../hooks/useRemoteConfig';
import { useLanguage } from '../../context/LanguageContext';

export default function RootLayout() {
  const { config } = useRemoteConfig();
  const { t } = useLanguage();

  useEffect(() => {
    if (!config || !config.website_status) return;

    const shown = localStorage.getItem('maintenance-toast-shown');

    if (!shown) {
      switch (config.website_status) {
        case 'maintenance':
          toast.warning(t.layout.informationToast.maintenance, {
            position: 'bottom-right',
            duration: 16000,
          });
          break;
        default:
          return;
      }
      localStorage.setItem('maintenance-toast-shown', 'true');
    }
  }, [config.website_status]);

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
