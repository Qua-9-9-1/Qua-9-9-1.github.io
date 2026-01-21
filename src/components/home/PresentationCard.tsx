import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useLanguage } from '../../context/LanguageContext';
import { Separator } from '../ui/separator';
import { useIsMobile } from '../../hooks/useMediaQuery';
import React from 'react';
import { useRemoteConfig } from '../../hooks/useRemoteConfig';
import { ColoredText } from '../ui/coloredText';

export default function PresentationCard() {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const { config, loading } = useRemoteConfig();

  const getWorkingStatusBadge = (workingStatus: string): React.ReactNode => {
    const defaultClasses: string = isMobile
      ? 'flex justify-center px-4 py-2 text-sm bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg '
      : 'w-full justify-center px-4 py-3 text-sm bg-accent hover:bg-accent/90 text-accent-foreground';

    if (loading) {
      return (
        <Badge className={defaultClasses + ' animate-pulse'} variant={'empty'}>
          {t.loading}
        </Badge>
      );
    }

    switch (workingStatus) {
      case 'available':
        return (
          <Badge className={defaultClasses} variant={'empty'}>
            {t.home.working_status.available}
          </Badge>
        );
      case 'looking_for_internship':
        return (
          <Badge className={defaultClasses + ' animate-bounce bg-primary'}>
            {t.home.working_status.looking_for_internship}
          </Badge>
        );
      case 'looking_for_job':
        return (
          <Badge className={defaultClasses + ' animate-bounce bg-primary'}>
            {t.home.working_status.looking_for_job}
          </Badge>
        );
      case 'employed':
        return (
          <Badge className={defaultClasses + ' bg-secondary'}>
            {t.home.working_status.employed}
          </Badge>
        );
      default:
        return null;
    }
  };

  const getAvailabilityDate = (): React.ReactNode => {
    if (
      loading ||
      config.working_status === 'available' ||
      config.working_status === 'employed' ||
      !config.availability_date.from ||
      !config.availability_date.to
    ) {
      return null;
    }
    return (
      <div
        className={
          'flex flex-row justify-center items-center gap-1 ' +
          (isMobile
            ? 'text-center text-sm text-muted-foreground'
            : 'text-center text-base text-muted-foreground')
        }
      >
        <span>{t.home.from}</span>
        <span className="font-bold text-secondary mx-1">
          {config.availability_date.from}
        </span>
        <span>{t.home.to}</span>
        <span className="font-bold text-secondary mx-1">
          {config.availability_date.to}
        </span>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pb-8">
      {isMobile ? (
        <Card className="w-full max-w-md mx-auto shadow-lg">
          <CardContent className="pt-6 pb-8 px-6 space-y-6">
            <div className="flex justify-center">
              <Avatar className="w-32 h-32 border-4 border-primary/20">
                <AvatarImage
                  src={`https://github.com/${config.github_user}.png`}
                  alt={`@${config.github_user}`}
                />
                <AvatarFallback className="text-4xl font-bold bg-gradient-to-br from-primary to-primary/60">
                  <img
                    src="/logo.svg"
                    alt="Logo"
                    className="w-16 h-16 mx-auto"
                  />
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold bg-gradient-to-b from-[var(--primary-main)] to-[var(--secondary-main)] text-transparent bg-clip-text">
                {config.username}
              </h2>
              <p
                className={`text-lg text-muted-foreground ${loading ? 'animate-pulse' : ''}`}
              >
                {config.pro_title[t.lang as 'en' | 'fr']}
              </p>
            </div>

            <div className="w-full bg-muted/50 p-4 rounded-md space-y-3">
              {getWorkingStatusBadge(config.working_status)}
              {getAvailabilityDate()}
            </div>
            <Separator />

            <div
              className={`text-sm text-muted-foreground leading-relaxed ${loading ? 'animate-pulse' : ''}`}
            >
              <ColoredText text={config.description[t.lang as 'en' | 'fr']} />
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
                    src={`https://github.com/${config.github_user}.png`}
                    alt={`@${config.github_user}`}
                  />
                  <AvatarFallback className="text-5xl font-bold bg-gradient-to-br from-primary to-primary/60">
                    Q
                  </AvatarFallback>
                </Avatar>

                <div className="text-center space-y-3 w-full">
                  <h2 className="text-2xl font-bold bg-gradient-to-b from-[var(--primary-main)] to-[var(--secondary-main)] text-transparent bg-clip-text">
                    {config.username}
                  </h2>
                  <p
                    className={`text-xl text-muted-foreground font-medium ${loading ? 'animate-pulse' : ''}`}
                  >
                    {config.pro_title[t.lang as 'en' | 'fr']}
                  </p>
                </div>

                <Separator className="w-full" />

                <div className="w-full space-y-3 bg-muted/50 p-4 rounded-md">
                  <p
                    className={`text-sm font-semibold uppercase tracking-wide text-center ${loading ? 'animate-pulse' : ''}`}
                  >
                    {t.home.working_status.title}
                  </p>
                  {getWorkingStatusBadge(config.working_status)}
                  {getAvailabilityDate()}
                </div>
              </div>

              <div className="p-8 flex items-center">
                <div className="space-y-4">
                  <p
                    className={`leading-relaxed text-lg ${loading ? 'animate-pulse' : ''}`}
                  >
                    <ColoredText
                      text={config.description[t.lang as 'en' | 'fr']}
                    />
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
