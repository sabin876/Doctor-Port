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

  async function fetchFromApi(endpoint) {
    const primaryUrl = (process.env.VITE_API_BASE_URL || 'http://localhost:8000/api').replace(/\/+$/, '');
    const fallbackUrl = 'https://api.drulhasorthopedic.com/api';
    try {
      const res = await fetch(`${primaryUrl}${endpoint}`, { signal: AbortSignal.timeout(3000) });
      if (res && res.ok) return await res.json();
    } catch (e) {
      // ignore
    }
    try {
      const fbRes = await fetch(`${fallbackUrl}${endpoint}`, { signal: AbortSignal.timeout(5000) });
      if (fbRes && fbRes.ok) return await fbRes.json();
    } catch (e) {
      // ignore
    }
    return null;
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
      const [sData, aData, setData, tEnData, tHiData, tArData, gData, hData, soData] = await Promise.all([
        fetchFromApi('/services/'),
        fetchFromApi('/articles/'),
        fetchFromApi('/settings/'),
        fetchFromApi('/translations/?lang=EN'),
        fetchFromApi('/translations/?lang=HI'),
        fetchFromApi('/translations/?lang=AR'),
        fetchFromApi('/gallery/'),
        fetchFromApi('/hero-video/'),
        fetchFromApi('/second-opinions/'),
      ]);

      if (Array.isArray(sData)) data.services = sData;
      if (Array.isArray(aData)) data.articles = aData;
      if (setData && typeof setData === 'object') data.settings = setData;
      if (tEnData) data.translations.EN = tEnData;
      if (tHiData) data.translations.HI = tHiData;
      if (tArData) data.translations.AR = tArData;

      if (Array.isArray(gData)) {
        const baseUrl = API_BASE_URL.replace(/\/api\/?$/, '');
        data.gallery = gData.map((item) => {
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
      if (hData) data.heroVideo = hData;
      if (soData) data.secondOpinions = soData;

      // Specific route matching for dedicated service / sub-service / article data
      if (pathname.startsWith('/services/')) {
        const remaining = pathname.replace(/^\/services\//, '').replace(/\/+$/, '');
        if (remaining) {
          const parts = remaining.split('/');
          if (parts.length === 1) {
            const slug = parts[0];
            const matchService = data.services.find(s => String(s.id) === slug || s.slug?.toLowerCase() === slug.toLowerCase());
            if (matchService) {
              data.routeData = matchService;
            } else {
              const detail = await fetchFromApi(`/services/${slug}/`);
              if (detail) {
                data.routeData = detail;
              }
            }
          } else if (parts.length >= 2) {
            const [parentSlug, subSlug] = parts;
            let parent = data.services.find(s => s.slug?.toLowerCase() === parentSlug.toLowerCase() || String(s.id) === parentSlug);
            if (!parent) {
              parent = await fetchFromApi(`/services/${parentSlug}/`);
            }
            if (parent) {
              const sub = parent.sub_services?.find(s => s.slug?.toLowerCase() === subSlug.toLowerCase() || String(s.id) === subSlug);
              data.routeData = { parentService: parent, subService: sub || null };
            }
          }
        }
      } else if (pathname.startsWith('/blog/')) {
        const slug = pathname.replace(/^\/blog\//, '').replace(/\/+$/, '');
        if (slug) {
          const matchArticle = data.articles.find(a => String(a.id) === slug || a.slug?.toLowerCase() === slug.toLowerCase());
          if (matchArticle) {
            data.routeData = matchArticle;
          } else {
            const detail = await fetchFromApi(`/articles/${slug}/`);
            if (detail) {
              data.routeData = detail;
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
        const jsDir = path.resolve(__dirname, 'dist/server/assets/js');
        if (fs.existsSync(jsDir)) {
          const serverJsFiles = fs.readdirSync(jsDir);
          const entryFile = serverJsFiles.find(f => f.startsWith('entry-server') && f.endsWith('.js'));
          if (entryFile) {
            const entryUrl = new URL(`./dist/server/assets/js/${entryFile}`, import.meta.url).href;
            render = (await import(entryUrl)).render;
          }
        }
        if (!render && fs.existsSync(path.resolve(__dirname, 'dist/server/entry-server.js'))) {
          render = (await import('./dist/server/entry-server.js')).render;
        }
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
