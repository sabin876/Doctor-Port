import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import "@fontsource/metropolis/100.css";
import "@fontsource/metropolis/200.css";
import "@fontsource/metropolis/300.css";
import "@fontsource/metropolis/400.css";
import "@fontsource/metropolis/500.css";
import "@fontsource/metropolis/600.css";
import "@fontsource/metropolis/700.css";
import "@fontsource/metropolis/800.css";
import "@fontsource/metropolis/900.css";
import './index.css'
import { LanguageProvider } from './context/LanguageContext.jsx'
import App from './App.jsx'

const rootElement = document.getElementById('root');
const initialData = window.__INITIAL_DATA__ || null;

const app = (
  <StrictMode>
    <LanguageProvider>
      <App initialData={initialData} />
    </LanguageProvider>
  </StrictMode>
);

if (rootElement && rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app);
} else if (rootElement) {
  createRoot(rootElement).render(app);
}
