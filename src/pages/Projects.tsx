import { useLanguage } from "../context/LanguageContext";

export default function Projects() {
    const { t } = useLanguage();

  return <h1>{t.projects.title}</h1>;
}