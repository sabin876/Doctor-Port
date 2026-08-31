import React, { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { LanguageProvider } from './context/LanguageContext.jsx'
import App from './App.jsx'

export function render(url, initialData = null) {
  const helmetContext = {};
  const html = renderToString(
    <StrictMode>
      <LanguageProvider>
        <StaticRouter location={url}>
          <App initialData={initialData} helmetContext={helmetContext} />
        </StaticRouter>
      </LanguageProvider>
    </StrictMode>
  );
  const { helmet } = helmetContext;
  return { html, helmet };
}
