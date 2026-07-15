/**
 * prerender.mjs
 * ---------------------
 * Runs after `vite build` to crawl the generated sitemap and replace empty
 * index.html with fully rendered HTML for SEO using Puppeteer.
 */

import puppeteer from 'puppeteer';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, '../dist');
const PORT = 3000;

// Start a local static server
const app = express();
app.use(express.static(DIST_DIR));

// Fallback for SPA routing: send index.html for any virtual route request
app.use((req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});

const server = app.listen(PORT, async () => {
  console.log(`\n🚀 Static server started at http://localhost:${PORT}`);
  
  let browser;
  try {
    // 1. Read the sitemap to know which routes to crawl
    const sitemapPath = path.join(DIST_DIR, 'sitemap.xml');
    if (!fs.existsSync(sitemapPath)) {
      throw new Error('sitemap.xml not found in dist/. Please ensure generate-sitemap runs before prerender.');
    }
    
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    
    // Extract paths from <loc> tags
    const locRegex = /<loc>(.*?)<\/loc>/g;
    let match;
    const routes = [];
    
    while ((match = locRegex.exec(sitemapContent)) !== null) {
      const fullUrl = match[1];
      // Extract just the pathname (e.g., https://drulhasorthopedic.com/about -> /about)
      try {
        const urlObj = new URL(fullUrl);
        routes.push(urlObj.pathname);
      } catch (e) {
        // If it fails to parse as URL, just push the string directly if it starts with /
        if (fullUrl.startsWith('/')) routes.push(fullUrl);
      }
    }
    
    console.log(`Found ${routes.length} routes to pre-render.`);
    
    // 2. Launch headless browser
    browser = await puppeteer.launch({ 
      headless: 'new',
      channel: 'chrome' // Use system Chrome to avoid cache path issues on Windows
    });
    const page = await browser.newPage();
    
    // 3. Crawl each route
    for (const route of routes) {
      const url = `http://127.0.0.1:${PORT}${route}`;
      console.log(`Rendering: ${route}...`);
      
      // Wait for DOM content to load and then wait 3 seconds for React to mount and fetch data
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const html = await page.evaluate(() => document.documentElement.outerHTML);
      
      // Calculate file path (e.g., /about -> dist/about/index.html)
      let outPath = path.join(DIST_DIR, route);
      if (!fs.existsSync(outPath)) {
        fs.mkdirSync(outPath, { recursive: true });
      }
      
      const filePath = path.join(outPath, 'index.html');
      
      // Inject standard doctype
      fs.writeFileSync(filePath, '<!DOCTYPE html>\n' + html);
      console.log(`✅ Saved ${route} -> ${filePath}`);
    }
    
    console.log('\n🎉 Pre-rendering complete!');
  } catch (error) {
    console.error('Error during pre-rendering:', error);
    process.exitCode = 1;
  } finally {
    // 4. Shutdown browser and server
    if (browser) {
      try {
        await browser.close();
      } catch (e) {
        console.error('Error closing browser:', e);
      }
    }
    server.close();
  }
});
