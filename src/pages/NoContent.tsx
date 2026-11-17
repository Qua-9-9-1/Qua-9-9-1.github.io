import { useLanguage } from '../context/LanguageContext';
import { Card, CardContent, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import SmartLink from '../components/ui/smartLink';
import { Home } from 'lucide-react';
import '../styles/components/404-text.css';

export default function NoContent() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center p-4 py-12 w-full">
      <Card className="w-full max-w-xl shadow-lg overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-brand to-brand-2" />
        <CardContent className="py-10 px-6 flex flex-col items-center gap-6">
          <div className="_404-text select-none" data-text="404">
            404
          </div>
          <CardTitle className="text-3xl font-bold text-center">
            {t.no_content.title}
          </CardTitle>
          <p className="text-lg text-muted-foreground text-center text-pretty">
            {t.no_content.description}
          </p>
          <Button asChild variant="primary">
            <SmartLink to="/">
              <Home />
              {t.layout.navbar.home}
            </SmartLink>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
