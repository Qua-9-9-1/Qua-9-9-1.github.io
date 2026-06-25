import { useLanguage } from '../context/LanguageContext';
import { Card, CardContent, CardTitle } from '../components/ui/card';
import '../styles/components/404-text.css';

export default function NoContent() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] p-4">
      <Card className="w-full max-w-xl shadow-lg">
        <CardContent className="py-8 px-6 flex flex-col items-center gap-6">
          <div className="_404-text" data-text="404">
            404
          </div>
          <CardTitle className="text-3xl font-bold mb-1 text-center">
            {t.no_content.title}
          </CardTitle>
          <div className="flex flex-col gap-4 w-full">
            <p className="text-lg text-muted-foreground text-center">
              {t.no_content.description}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
