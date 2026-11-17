import { useLanguage } from '../context/LanguageContext';
import { Card, CardContent, CardTitle } from '../components/ui/card';
import { Mail, Linkedin, Github, ArrowUpRight } from 'lucide-react';
import { useRemoteConfig } from '../hooks/useRemoteConfig';

export default function Contact() {
  const { t } = useLanguage();
  const { config } = useRemoteConfig();

  const contacts = [
    {
      label: 'Email',
      value: 'quentduva@gmail.com',
      href: 'mailto:quentduva@gmail.com',
      icon: <Mail />,
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/quentin-duval-1a16a0186',
      href: 'https://www.linkedin.com/in/quentin-duval-1a16a0186/',
      icon: <Linkedin />,
    },
    {
      label: 'GitHub',
      value: `github.com/${config.github_user}`,
      href: `https://github.com/${config.github_user}`,
      icon: <Github />,
    },
  ];

  return (
    <div className="flex w-full flex-col items-center justify-center p-4 py-12">
      <Card className="w-full max-w-xl shadow-xl overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-brand to-brand-2" />
        <CardContent className="py-10 px-6 sm:px-8 flex flex-col items-center gap-8">
          <CardTitle className="text-3xl font-extrabold tracking-tight text-center text-gradient-brand py-1">
            {t.contact.title}
          </CardTitle>
          <ul className="flex flex-col gap-3 w-full">
            {contacts.map((contact) => (
              <li key={contact.label}>
                <a
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-xl border bg-muted/40 px-4 py-3 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:bg-accent hover:shadow-md"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary [&_svg]:size-5">
                    {contact.icon}
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="text-sm font-semibold">
                      {contact.label}
                    </span>
                    <span className="truncate text-sm text-muted-foreground group-hover:text-foreground">
                      {contact.value}
                    </span>
                  </span>
                  <ArrowUpRight className="ml-auto size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                </a>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
