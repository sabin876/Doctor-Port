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
      const renderResult = render(url, initialData);
      const appHtml = renderResult?.html || '';
      const helmet = renderResult?.helmet || null;

      // Helper to generate absolute image URLs for social previews
      function getAbsoluteImageUrl(imgUrl) {
        if (!imgUrl || typeof imgUrl !== 'string') return 'https://drulhasorthopedic.com/assets/images/doctor-hero.webp';
        let u = imgUrl.trim();
        if (!u) return 'https://drulhasorthopedic.com/assets/images/doctor-hero.webp';
        if (u.includes('localhost:8000') || u.includes('127.0.0.1:8000')) {
          u = u.replace(/http:\/\/(localhost|127\.0\.0\.1):8000/g, 'https://api.drulhasorthopedic.com');
        } else if (u.includes('localhost') || u.includes('127.0.0.1')) {
          u = u.replace(/http:\/\/(localhost|127\.0\.0\.1)(:\d+)?/g, 'https://drulhasorthopedic.com');
        }
        if (u.startsWith('http://') || u.startsWith('https://')) {
          return u.replace('http://', 'https://');
        }
        if (u.startsWith('/media/') || u.startsWith('media/')) {
          const cleanMedia = u.startsWith('/') ? u : `/${u}`;
          return `https://api.drulhasorthopedic.com${cleanMedia}`;
        }
        const cleanPath = u.startsWith('/') ? u : `/${u}`;
        return `https://drulhasorthopedic.com${cleanPath}`;
      }

      function escapeHtml(str) {
        if (!str) return '';
        return String(str)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#039;');
      }

      // 4. Build Authoritative Dynamic SEO Metadata for THIS route
      const cleanPath = req.path === '/' ? '' : req.path.replace(/\/+$/, '');
      const canonicalUrl = `https://drulhasorthopedic.com${cleanPath || '/'}`;
      const pageUrl = `https://drulhasorthopedic.com${cleanPath}`;

      let routeTitle = 'Dr. Ulhas Sonar | Orthopaedic Surgeon Dubai';
      let routeDescription = 'Expert orthopedic care specializing in joint replacement, sports injuries, and comprehensive rehabilitation with Dr. Ulhas Sonar in Dubai.';
      let routeOgImage = 'https://drulhasorthopedic.com/assets/images/doctor-hero.webp';
      let routeOgType = 'website';
      let ogTitle = routeTitle;
      let ogDesc = routeDescription;

      if (req.path.startsWith('/blog/') && initialData.routeData) {
        const art = initialData.routeData;
        routeTitle = art.meta_title || (art.title ? `${art.title} | Dr. Ulhas Sonar` : 'Orthopedic Blog Article | Dr. Ulhas Sonar');
        routeDescription = art.meta_description || art.excerpt || art.title || routeDescription;
        ogTitle = art.og_title || routeTitle;
        ogDesc = art.og_description || routeDescription;
        routeOgImage = getAbsoluteImageUrl(art.og_image || art.image || art.featured_image);
        routeOgType = 'article';
      } else if (req.path === '/blog') {
        routeTitle = 'Orthopedic Articles & Insights | Dr. Ulhas Sonar';
        routeDescription = 'Read the latest articles on orthopedic conditions, treatments, and recovery from Dr. Ulhas Sonar.';
        ogTitle = routeTitle;
        ogDesc = routeDescription;
        routeOgImage = 'https://drulhasorthopedic.com/assets/images/doctor-surgery.webp';
        routeOgType = 'website';
      } else if (req.path.startsWith('/services/') && initialData.routeData) {
        const srv = initialData.routeData?.subService || initialData.routeData;
        routeTitle = srv.meta_title || (srv.title ? `${srv.title} | Dr. Ulhas Sonar` : 'Orthopedic Service | Dr. Ulhas Sonar');
        routeDescription = srv.meta_description || srv.description || routeDescription;
        ogTitle = srv.og_title || routeTitle;
        ogDesc = srv.og_description || routeDescription;
        routeOgImage = getAbsoluteImageUrl(srv.og_image || srv.image);
        routeOgType = 'website';
      } else if (req.path === '/services') {
        routeTitle = 'Orthopedic Services & Procedures | Dr. Ulhas Sonar';
        routeDescription = 'Comprehensive orthopedic services including robotic knee replacement, hip surgery, and sports medicine by Dr. Ulhas Sonar.';
        ogTitle = routeTitle;
        ogDesc = routeDescription;
      } else if (req.path === '/about') {
        routeTitle = 'About Dr. Ulhas Sonar | Orthopedic Surgeon Dubai';
        routeDescription = 'Learn more about Dr. Ulhas Sonar, a leading orthopedic surgeon specializing in robotic joint replacement and sports injuries.';
        ogTitle = routeTitle;
        ogDesc = routeDescription;
      } else if (req.path === '/contact') {
        routeTitle = 'Contact Dr. Ulhas Sonar | Book Appointment in Dubai';
        routeDescription = 'Book an appointment with Dr. Ulhas Sonar at Canadian Specialist Hospital in Dubai.';
        ogTitle = routeTitle;
        ogDesc = routeDescription;
      }

      // 5. Clean template from any static SEO tags to prevent duplicate or conflicting tags
      let html = template
        .replace(/<title[^>]*>.*?<\/title>/gi, '')
        .replace(/<link[^>]*rel=["']canonical["'][^>]*>/gi, '')
        .replace(/<meta[^>]*name=["']description["'][^>]*>/gi, '')
        .replace(/<meta[^>]*name=["']keywords["'][^>]*>/gi, '')
        .replace(/<meta[^>]*property=["']og:[^"']*["'][^>]*>/gi, '')
        .replace(/<meta[^>]*name=["']twitter:[^"']*["'][^>]*>/gi, '');

      // 6. Primary Route Meta & Social OG Injection
      const primaryMetaTags = `
    <!-- Primary Page SEO Metadata -->
    <title>${escapeHtml(routeTitle)}</title>
    <meta name="description" content="${escapeHtml(routeDescription)}" />
    <link rel="canonical" href="${canonicalUrl}" />
    <meta name="robots" content="index, follow" />

    <!-- Open Graph / Social Media Tags -->
    <meta property="og:type" content="${routeOgType}" />
    <meta property="og:title" content="${escapeHtml(ogTitle)}" />
    <meta property="og:description" content="${escapeHtml(ogDesc)}" />
    <meta property="og:url" content="${pageUrl}" />
    <meta property="og:image" content="${routeOgImage}" />
    <meta property="og:image:secure_url" content="${routeOgImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:site_name" content="Dr. Ulhas Sonar | Orthopaedic Surgeon Dubai" />

    <!-- Twitter Card Tags -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(ogTitle)}" />
    <meta name="twitter:description" content="${escapeHtml(ogDesc)}" />
    <meta name="twitter:image" content="${routeOgImage}" />
`;

      // 7. Inject Helmet Scripts (Schemas, etc.) and Initial Data
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

      let helmetHead = '';
      if (helmet) {
        if (helmet.script) helmetHead += helmet.script.toString() + '\n';
      }

      const headInjections = `${inlineDataScript}\n${primaryMetaTags}\n${helmetHead}`;
      if (html.includes('</head>')) {
        html = html.replace('</head>', `${headInjections}\n</head>`);
      } else {
        html = headInjections + html;
      }
      html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

      // 8. Send exact pathname-aware HTML back to browser
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
