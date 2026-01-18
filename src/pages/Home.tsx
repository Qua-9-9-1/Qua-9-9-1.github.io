import { useLanguage } from '../context/LanguageContext';
import { Separator } from '../components/ui/separator';
import PresentationCard from '../components/home/PresentationCard';
import HobbiesCarousel from '../components/home/HobbiesCarousel';

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="py-12 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-2">
          {t.home.title}
        </h1>
        <Separator className="my-6 mx-auto w-96 bg-primary" />
      </div>

      <h3 className="text-2xl font-bold text-center mb-4">
        {t.home.about.title}
      </h3>
      <PresentationCard />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Separator className="mb-8 bg-primary" />
        <h3 className="text-2xl font-bold text-center mt-8 mb-4">
          {t.home.skills.title}
        </h3>
        <p className="text-center text-muted-foreground mb-8">
          {t.home.skills.description}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Separator className="mb-8 bg-primary" />
        <h3 className="text-2xl font-bold text-center mb-4">
          {t.home.hobbies.title}
        </h3>
        <p className="text-center text-muted-foreground mb-8">
          {t.home.hobbies.description}
        </p>
        <HobbiesCarousel />
      </div>
    </main>
  );
}
