import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '.env') });

const isProd = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 3000;
const API_BASE_URL = (process.env.VITE_API_BASE_URL || 'http://localhost:8000/api').replace(/\/+$/, '');

async function createServer() {
  const app = express();

  let vite;
  if (!isProd) {
    // Create Vite server in middleware mode and configure the app type as 'custom'
    const { createServer: createViteServer } = await import('vite');
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom'
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    const compression = (await import('vite-plugin-compression')).default;
    app.use((await import('compression')).default());
    app.use(express.static(path.resolve(__dirname, 'dist/client'), { index: false }));
  }

  // Pathname-Aware Data Fetching helper
  async function fetchInitialDataForRoute(pathname) {
    const data = {
      pathname,
      services: [],
      articles: [],
      settings: {},
      translations: {},
      gallery: [],
      heroVideo: {},
      secondOpinions: {},
      routeData: null
    };

    try {
      const [sRes, aRes, setRes, tEnRes, tHiRes, tArRes, gRes, hRes, soRes] = await Promise.all([
        fetch(`${API_BASE_URL}/services/`).catch(() => null),
        fetch(`${API_BASE_URL}/articles/`).catch(() => null),
        fetch(`${API_BASE_URL}/settings/`).catch(() => null),
        fetch(`${API_BASE_URL}/translations/?lang=EN`).catch(() => null),
        fetch(`${API_BASE_URL}/translations/?lang=HI`).catch(() => null),
        fetch(`${API_BASE_URL}/translations/?lang=AR`).catch(() => null),
        fetch(`${API_BASE_URL}/gallery/`).catch(() => null),
        fetch(`${API_BASE_URL}/hero-video/`).catch(() => null),
        fetch(`${API_BASE_URL}/second-opinions/`).catch(() => null),
      ]);

      if (sRes && sRes.ok) data.services = await sRes.json();
      if (aRes && aRes.ok) data.articles = await aRes.json();
      if (setRes && setRes.ok) data.settings = await setRes.json();
      if (tEnRes && tEnRes.ok) data.translations.EN = await tEnRes.json();
      if (tHiRes && tHiRes.ok) data.translations.HI = await tHiRes.json();
      if (tArRes && tArRes.ok) data.translations.AR = await tArRes.json();

      if (gRes && gRes.ok) {
        const rawG = await gRes.json();
        if (Array.isArray(rawG)) {
          const baseUrl = API_BASE_URL.replace(/\/api\/?$/, '');
          data.gallery = rawG.map((item) => {
            let img = item.image;
            if (img && !img.startsWith('http')) {
              img = `${baseUrl}${img.startsWith('/') ? '' : '/'}${img}`;
            }
            return {
              id: item.id,
              src: img,
              category: item.category,
              title: item.title,
              desc: item.description,
              span: item.span || 'col-span-1 row-span-1',
            };
          });
        }
      }
      if (hRes && hRes.ok) data.heroVideo = await hRes.json();
      if (soRes && soRes.ok) data.secondOpinions = await soRes.json();

      // Specific route matching for dedicated service / article data
      if (pathname.startsWith('/services/')) {
        const slug = pathname.replace('/services/', '').replace(/\/$/, '');
        if (slug) {
          const matchService = data.services.find(s => String(s.id) === slug || s.slug === slug);
          if (matchService) {
            data.routeData = matchService;
          } else {
            const detailRes = await fetch(`${API_BASE_URL}/services/${slug}/`).catch(() => null);
            if (detailRes && detailRes.ok) {
              data.routeData = await detailRes.json();
            }
          }
        }
      } else if (pathname.startsWith('/blog/')) {
        const slug = pathname.replace('/blog/', '').replace(/\/$/, '');
        if (slug) {
          const matchArticle = data.articles.find(a => String(a.id) === slug || a.slug === slug);
          if (matchArticle) {
            data.routeData = matchArticle;
          } else {
            const detailRes = await fetch(`${API_BASE_URL}/articles/${slug}/`).catch(() => null);
            if (detailRes && detailRes.ok) {
              data.routeData = await detailRes.json();
            }
          }
        }
      }
    } catch (err) {
      console.error('Error loading route initial data:', err);
    }

    return data;
  }

  // Handle all HTML requests dynamically
  app.use(async (req, res, next) => {
    const url = req.originalUrl;

    try {
      // 1. Read index.html template
      let template;
      let render;

      if (!isProd) {
        template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render;
      } else {
        template = fs.readFileSync(path.resolve(__dirname, 'dist/client/index.html'), 'utf-8');
        render = (await import('./dist/server/entry-server.js')).render;
      }

      // 2. Fetch Pathname-Aware Initial Data for THIS route
      const initialData = await fetchInitialDataForRoute(req.path);

      // 3. Render React app to HTML for THIS exact URL
      const { html: appHtml } = render(url, initialData);

      // 4. Inject Initial Data and Rendered HTML into response
      const inlineDataScript = `<script id="initial-data">
        window.__INITIAL_DATA__ = ${JSON.stringify(initialData)};
        window.__INITIAL_SERVICES__ = ${JSON.stringify(initialData.services || [])};
        window.__INITIAL_ARTICLES__ = ${JSON.stringify(initialData.articles || [])};
        window.__INITIAL_SETTINGS__ = ${JSON.stringify(initialData.settings || {})};
        window.__INITIAL_TRANSLATIONS__ = ${JSON.stringify(initialData.translations || {})};
        window.__INITIAL_GALLERY__ = ${JSON.stringify(initialData.gallery || [])};
        window.__INITIAL_HERO_VIDEO__ = ${JSON.stringify(initialData.heroVideo || {})};
        window.__INITIAL_SECOND_OPINIONS__ = ${JSON.stringify(initialData.secondOpinions || [])};
      </script>`;
      
      let html = template;
      if (html.includes('</head>')) {
        html = html.replace('</head>', `${inlineDataScript}\n</head>`);
      } else {
        html = inlineDataScript + html;
      }
      html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

      // 5. Send exact pathname-aware HTML back to browser
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      if (!isProd && vite) {
        vite.ssrFixStacktrace(e);
      }
      console.error('SSR Error:', e);
      next(e);
    }
  });

  app.listen(PORT, () => {
    console.log(`\n🚀 Pathname-Aware SSR Server running at http://localhost:${PORT}`);
  });
}

createServer();
