import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { Toaster } from '../ui/sonner';
import { toast } from 'sonner';
import { useRemoteConfig } from '../../hooks/useRemoteConfig';
import { useLanguage } from '../../context/LanguageContext';
import Background from './HexagonsAnimatedBackground';

export default function RootLayout() {
  const { config } = useRemoteConfig();
  const { t } = useLanguage();
  const websiteStatus = config?.website_status;
  const maintenanceMessage = t.layout.informationToast.maintenance;

  useEffect(() => {
    if (!websiteStatus) return;

    const shown = localStorage.getItem('maintenance-toast-shown');

    if (!shown) {
      switch (websiteStatus) {
        case 'maintenance':
          toast.warning(maintenanceMessage, {
            position: 'bottom-right',
            duration: 16000,
          });
          break;
        default:
          return;
      }
      localStorage.setItem('maintenance-toast-shown', 'true');
    }
  }, [websiteStatus, maintenanceMessage]);

  return (
    <div className="min-h-screen flex flex-col">
      <Background />
      <Toaster />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
