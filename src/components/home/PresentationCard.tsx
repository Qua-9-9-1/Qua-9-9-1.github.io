import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useLanguage } from '../../context/LanguageContext';
import { Separator } from '../ui/separator';
import { useIsMobile } from '../../hooks/useMediaQuery';

export default function PresentationCard() {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <div className="max-w-7xl mx-auto px-4 pb-8">
      {isMobile ? (
        <Card className="w-full max-w-md mx-auto shadow-lg">
          <CardContent className="pt-6 pb-8 px-6 space-y-6">
            <div className="flex justify-center">
              <Avatar className="w-32 h-32 border-4 border-primary/20">
                <AvatarImage
                  src="https://github.com/Qua-9-9-1.png"
                  alt="@Qua-9-9-1"
                />
                <AvatarFallback className="text-4xl font-bold bg-gradient-to-br from-primary to-primary/60">
                  Q
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-primary">Quentin</h2>
              <p className="text-lg text-muted-foreground text-secondary">
                {t.home.pro_title}
              </p>
            </div>

            <div className="flex justify-center">
              <Badge className="px-4 py-2 text-sm bg-accent hover:bg-accent/90 text-accent-foreground bg-secondary">
                {t.home.working_status.looking_for_internship}
              </Badge>
            </div>

            <Separator />

            <div className="text-sm text-muted-foreground leading-relaxed">
              {t.home.about.description}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full shadow-xl">
          <CardContent className="p-0">
            <div className="grid grid-cols-[350px_1fr]">
              <div className="p-8 space-y-6 flex flex-col items-center justify-start bg-muted/30 border-r">
                <Avatar className="w-40 h-40 border-4 border-primary/30 shadow-xl">
                  <AvatarImage
                    src="https://github.com/Qua-9-9-1.png"
                    alt="@Qua-9-9-1"
                  />
                  <AvatarFallback className="text-5xl font-bold bg-gradient-to-br from-primary to-primary/60">
                    Q
                  </AvatarFallback>
                </Avatar>

                <div className="text-center space-y-3 w-full">
                  <h2 className="text-3xl font-bold text-primary">Quentin</h2>
                  <p className="text-xl text-muted-foreground font-medium text-secondary">
                    {t.home.pro_title}
                  </p>
                </div>

                <Separator className="w-full" />

                <div className="w-full space-y-3">
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide text-center">
                    {t.home.working_status.title}
                  </p>
                  <Badge className="w-full justify-center px-4 py-3 text-sm bg-accent hover:bg-accent/90 text-accent-foreground bg-secondary">
                    {t.home.working_status.looking_for_internship}
                  </Badge>
                </div>
              </div>

              <div className="p-8 flex items-center">
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {t.home.about.description}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
