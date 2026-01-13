import { useLanguage } from "./context/LanguageContext";

function App() {
  const { t } = useLanguage();

  return (
    <main style={{ padding: "2rem", textAlign: "center" }}>
      <h1>{t.home.title}</h1>
      <p>{t.home.subtitle}</p>
    </main>
  );
}

export default App;
