import { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Card, CardContent, CardTitle } from '../components/ui/card';

export default function NoContent() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Card className="w-full max-w-xl shadow-lg">
        <CardContent className="py-8 px-6 flex flex-col items-center gap-6">
          <CardTitle className="text-3xl font-bold mb-2 text-center">
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
