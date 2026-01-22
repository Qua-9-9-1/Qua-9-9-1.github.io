import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { RemoteConfigProvider } from './context/RemoteConfigContext';
import { ProjectsProvider } from './context/ProjectsContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LanguageProvider>
      <ThemeProvider>
        <RemoteConfigProvider>
          <ProjectsProvider>
            <App />
          </ProjectsProvider>
        </RemoteConfigProvider>
      </ThemeProvider>
    </LanguageProvider>
  </React.StrictMode>
);
