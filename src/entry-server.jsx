import React, { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { LanguageProvider } from './context/LanguageContext.jsx'
import App from './App.jsx'

export function render(url, initialData = null) {
  const html = renderToString(
    <StrictMode>
      <LanguageProvider>
        <StaticRouter location={url}>
          <App initialData={initialData} />
        </StaticRouter>
      </LanguageProvider>
    </StrictMode>
  );
  return { html };
}
