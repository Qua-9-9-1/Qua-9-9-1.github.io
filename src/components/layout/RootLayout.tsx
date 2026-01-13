import { Outlet, Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

export default function RootLayout() {
  const { t } = useLanguage();

  return (
    <div>
      <nav style={{ padding: '1rem', borderBottom: '1px solid #ddd', display: 'flex', gap: '20px' }}>
        <Link to="/">{"Accueil"}</Link> 
        <Link to="/projects">{t.projects.title}</Link>
      </nav>

      <main style={{ padding: '2rem' }}>
        <Outlet />
      </main>
      
      <footer>
      </footer>
    </div>
  );
}