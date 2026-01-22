import { useLanguage } from '../context/LanguageContext';
import { Separator } from '../components/ui/separator';
import PresentationCard from '../components/home/PresentationCard';
import CompetenciesCarousel from '../components/home/CompetenciesCarousel';
import HobbiesCarousel from '../components/home/HobbiesCarousel';
import SmartLink from '../components/ui/smartLink';

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-background text-foreground">

      <div className="py-6 px-4 text-center relative">
        <h1 className="text-4xl md:text-6xl py-4 font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-2 relative z-2">
          {t.home.title}
        </h1>
        <Separator className="my-3 mx-auto w-96 bg-primary relative z-2" />
      </div>

      <h3 className="text-2xl font-bold text-center mb-4 relative z-2">{t.home.about}</h3>
      <PresentationCard />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Separator className="mb-8 bg-primary" />
        <h3 className="text-2xl font-bold text-center mt-8 mb-4">
          {t.home.skills.title}
        </h3>
        <p className="text-center text-muted-foreground mb-8">
          {t.home.skills.description}
          <SmartLink
            to="/projects"
            className="underline text-secondary hover:text-primary"
          >
            {t.home.skills.my_projects}
          </SmartLink>
        </p>
        <CompetenciesCarousel />
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
