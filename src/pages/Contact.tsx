import { useLanguage } from '../context/LanguageContext';
import { Card, CardContent, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Mail, Linkedin, Github } from 'lucide-react';
import { useRemoteConfig } from '../hooks/useRemoteConfig';

export default function Contact() {
  const { t } = useLanguage();
  const { config } = useRemoteConfig();

  const contacts = [
    {
      label: 'Email',
      value: 'quentduva@gmail.com',
      href: 'mailto:quentduva@gmail.com',
      badge: <Mail />,
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/quentin-duval-1a16a0186',
      href: 'https://www.linkedin.com/in/quentin-duval-1a16a0186/',
      badge: <Linkedin />,
    },
    {
      label: 'GitHub',
      value: `github.com/${config.github_user}`,
      href: `https://github.com/${config.github_user}`,
      badge: <Github />,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
      <Card className="w-full max-w-xl shadow-lg">
        <CardContent className="py-8 px-6 flex flex-col items-center gap-6">
          <CardTitle className="text-3xl font-bold mb-2 text-center">
            {t.contact.title}
          </CardTitle>
          <div className="flex flex-col gap-4 w-full">
            {contacts.map((contact) => (
              <div
                key={contact.label}
                className="flex flex-row items-center justify-between bg-muted/40 rounded-lg px-4 py-3 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">{contact.badge}</Badge>
                  <span className="font-medium">{contact.label}</span>
                </div>
                <Button asChild variant="link" className="text-base">
                  <a
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {contact.value}
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
