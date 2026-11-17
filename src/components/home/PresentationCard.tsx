import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useLanguage } from '../../context/LanguageContext';
import { useIsMobile } from '../../hooks/useMediaQuery';
import React from 'react';
import { useRemoteConfig } from '../../hooks/useRemoteConfig';
import { FormatedText } from '../ui/formatedText';
import { Button } from '../ui/button';
import SmartLink from '../ui/smartLink';
import { cn } from '../../lib/utils';
import { ArrowRight, Mail } from 'lucide-react';

export default function PresentationCard() {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const { config, loading } = useRemoteConfig();
  const lang = t.lang as 'en' | 'fr';
  const pulse = loading ? 'animate-pulse' : '';

  const getWorkingStatusBadge = (workingStatus: string): React.ReactNode => {
    const base =
      'w-full justify-center px-4 py-2 text-sm font-semibold select-none rounded-lg';

    if (loading) {
      return (
        <Badge className={cn(base, 'animate-pulse')} variant="empty">
          {t.loading}
        </Badge>
      );
    }

    switch (workingStatus) {
      case 'available':
        return (
          <Badge className={base} variant="empty">
            {t.home.working_status.available}
          </Badge>
        );
      case 'looking_for_internship':
      case 'looking_for_job':
        return (
          <Badge
            className={cn(
              base,
              'gap-2 shadow-md shadow-primary/25 hover:bg-primary'
            )}
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-foreground opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-primary-foreground" />
            </span>
            {workingStatus === 'looking_for_job'
              ? t.home.working_status.looking_for_job
              : t.home.working_status.looking_for_internship}
          </Badge>
        );
      case 'employed':
        return (
          <Badge variant="secondary" className={base}>
            {t.home.working_status.employed}
          </Badge>
        );
      default:
        return null;
    }
  };

  const availability =
    loading ||
    config.work.status === 'available' ||
    config.work.status === 'employed' ||
    !config.work.from ||
    !config.work.to ? null : (
      <div className="flex flex-wrap justify-center items-center gap-x-1 text-sm text-muted-foreground">
        <span>{t.home.from}</span>
        <span className="font-semibold text-foreground tabular-nums">
          {config.work.from}
        </span>
        <span>{t.home.to}</span>
        <span className="font-semibold text-foreground tabular-nums">
          {config.work.to}
        </span>
      </div>
    );

  const avatar = (
    <Avatar
      className={cn(
        'ring-4 ring-primary/25 ring-offset-4 ring-offset-card shadow-xl',
        isMobile ? 'w-32 h-32' : 'w-40 h-40'
      )}
    >
      <AvatarImage
        src={`https://github.com/${config.github_user}.png?size=320`}
        alt={`@${config.github_user}`}
      />
      <AvatarFallback className="bg-gradient-to-br from-brand to-brand-2">
        <img src="/logo.svg" alt="" className="w-1/2 h-1/2" />
      </AvatarFallback>
    </Avatar>
  );

  const identity = (
    <div className="text-center space-y-1">
      <p className="text-2xl font-bold tracking-tight text-gradient-brand">
        {config.username}
      </p>
      <p
        className={cn(
          'text-muted-foreground font-medium',
          isMobile ? 'text-base' : 'text-lg',
          pulse
        )}
      >
        {config.pro_title[lang]}
      </p>
    </div>
  );

  const status = (
    <div className="w-full space-y-3 rounded-lg border bg-muted/50 p-4">
      <p
        className={cn(
          'text-xs font-semibold uppercase tracking-widest text-center text-muted-foreground select-none',
          pulse
        )}
      >
        {t.home.working_status.title}
      </p>
      {getWorkingStatusBadge(config.work.status)}
      {config.work.details[lang] && (
        <p
          className={cn(
            'text-center text-sm font-medium text-foreground/80',
            pulse
          )}
        >
          {config.work.details[lang]}
        </p>
      )}
      {availability}
    </div>
  );

  const actions = (
    <div className="flex flex-wrap justify-center gap-3">
      <Button asChild variant="primary" aria-label={t.layout.navbar.projects}>
        <SmartLink to="/projects">
          {t.layout.navbar.projects}
          <ArrowRight />
        </SmartLink>
      </Button>
      <Button asChild variant="outline" aria-label={t.layout.navbar.contact}>
        <SmartLink to="/contact">
          <Mail />
          {t.layout.navbar.contact}
        </SmartLink>
      </Button>
    </div>
  );

  const description = (
    <div
      className={cn(
        'leading-relaxed text-foreground/90',
        isMobile ? 'text-[0.95rem]' : 'text-lg',
        pulse
      )}
    >
      <FormatedText text={config.description[lang]} />
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 pb-8">
      {isMobile ? (
        <Card className="w-full max-w-md mx-auto shadow-lg overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-brand to-brand-2" />
          <CardContent className="pt-8 pb-8 px-6 space-y-6">
            <div className="flex justify-center">{avatar}</div>
            {identity}
            {status}
            {description}
            {actions}
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full shadow-xl overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-brand to-brand-2" />
          <CardContent className="p-0">
            <div className="grid grid-cols-[340px_1fr]">
              <div className="p-8 space-y-6 flex flex-col items-center justify-center bg-muted/30 border-r">
                {avatar}
                {identity}
                {status}
              </div>
              <div className="p-10 flex flex-col justify-between gap-8">
                {description}
                <div className="border-t pt-6">{actions}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
