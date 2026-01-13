import { useLanguage } from "../context/LanguageContext";

export default function Projects() {
    const { t } = useLanguage();

  return <h1>{t.contact.title}</h1>;
}