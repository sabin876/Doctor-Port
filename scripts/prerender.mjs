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
const server = app.listen(PORT, async () => {
  console.log(`\n🚀 Static server started at http://localhost:${PORT}`);
  
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
    const browser = await puppeteer.launch({ 
      headless: 'new',
      channel: 'chrome' // Use system Chrome to avoid cache path issues on Windows
    });
    const page = await browser.newPage();
    
    // 3. Crawl each route
    for (const route of routes) {
      const url = `http://localhost:${PORT}${route}`;
      console.log(`Rendering: ${route}...`);
      
      // Wait until network is idle to ensure React has fully mounted and fetched data
      await page.goto(url, { waitUntil: 'networkidle0' });
      
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
    
    await browser.close();
    console.log('\n🎉 Pre-rendering complete!');
  } catch (error) {
    console.error('Error during pre-rendering:', error);
    process.exitCode = 1;
  } finally {
    // 4. Shutdown server
    server.close();
  }
});
