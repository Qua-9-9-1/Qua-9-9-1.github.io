import { lazy, Suspense, type ReactNode } from 'react';
import { useLanguage } from '../context/LanguageContext';
import PresentationCard from '../components/home/PresentationCard';
import CompetenciesCarousel from '../components/home/CompetenciesCarousel';
import SmartLink from '../components/ui/smartLink';
import { useInView } from '../hooks/useInView';

// Declared at module level: a lazy() created inside the component body is a
// new component type on every render, which remounted the whole 3D carousel
// (and its WebGL canvases) each time Home re-rendered.
const HobbiesCarousel = lazy(
  () => import('../components/home/HobbiesCarousel')
);

const hobbiesPlaceholder = (
  <div className="w-full min-h-[500px] bg-muted/40 animate-pulse rounded-xl" />
);

function SectionHeading({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-8 text-center">
      <div
        aria-hidden="true"
        className="mx-auto mb-10 h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent"
      />
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
      <div
        aria-hidden="true"
        className="mx-auto mt-3 h-1 w-12 rounded-full bg-gradient-to-r from-brand to-brand-2"
      />
      {children && (
        <p className="mx-auto mt-4 max-w-3xl text-muted-foreground text-pretty">
          {children}
        </p>
      )}
    </div>
  );
}

export default function Home() {
  const { t } = useLanguage();
  // three.js / react-three-fiber (~1 MB) are only downloaded when the hobbies
  // section approaches the viewport, not on first paint.
  const [hobbiesRef, hobbiesNear] = useInView<HTMLDivElement>({
    rootMargin: '600px 0px',
    once: true,
  });

  return (
    <div className="w-full text-foreground pb-12">
      <header className="pt-10 pb-6 px-4 text-center relative">
        <h1 className="text-4xl md:text-6xl py-2 font-extrabold tracking-tight text-gradient-brand relative z-2 text-balance">
          {t.home.title}
        </h1>
        <div
          aria-hidden="true"
          className="mt-4 mx-auto h-1 w-40 max-w-full rounded-full bg-gradient-to-r from-brand to-brand-2 relative z-2"
        />
        <h2 className="mt-8 text-xl md:text-2xl font-semibold text-muted-foreground">
          {t.home.about}
        </h2>
      </header>

      <PresentationCard />

      <section className="max-w-7xl mx-auto px-4 py-8">
        <SectionHeading title={t.home.skills.title}>
          {t.home.skills.description}
          <SmartLink
            to="/projects"
            className="font-medium text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary"
          >
            {t.home.skills.my_projects}
          </SmartLink>
        </SectionHeading>
        <CompetenciesCarousel />
      </section>

      <section ref={hobbiesRef} className="max-w-7xl mx-auto px-4 py-8">
        <SectionHeading title={t.home.hobbies.title}>
          {t.home.hobbies.description}
        </SectionHeading>
        {hobbiesNear ? (
          <Suspense fallback={hobbiesPlaceholder}>
            <HobbiesCarousel />
          </Suspense>
        ) : (
          hobbiesPlaceholder
        )}
      </section>
    </div>
  );
}
