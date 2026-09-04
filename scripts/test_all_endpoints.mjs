const BASE_URL = 'http://127.0.0.1:8000/api';

const endpoints = [
    { name: 'Home Page Configuration & SEO & FAQs', path: '/home-page/' },
    { name: 'Home FAQs Direct Endpoint', path: '/home-faqs/' },
    { name: 'Articles List', path: '/articles/' },
    { name: 'Services List', path: '/services/' },
    { name: 'Translations (EN)', path: '/translations/?lang=EN' },
    { name: 'Gallery Items', path: '/gallery/' },
    { name: 'Second Opinions (Specialized Care)', path: '/second-opinions/' },
    { name: 'Site Settings', path: '/settings/' },
    { name: 'Hero Video', path: '/hero-video/' },
    { name: 'HTML Sitemap', path: '/html-sitemap/' }
];

async function runTests() {
    console.log('=====================================================');
    console.log('🧪 TESTING ALL BACKEND ENDPOINTS FROM FRONTEND CLIENT');
    console.log('=====================================================\n');

    let allPassed = true;

    for (const ep of endpoints) {
        const url = `${BASE_URL}${ep.path}`;
        try {
            const start = Date.now();
            const res = await fetch(url);
            const duration = Date.now() - start;
            
            if (!res.ok) {
                console.error(`❌ [FAIL] ${ep.name} -> HTTP ${res.status} (${url})`);
                allPassed = false;
                continue;
            }

            const data = await res.json();
            const isArray = Array.isArray(data);
            const count = isArray ? data.length : (data ? Object.keys(data).length : 0);
            const sampleInfo = isArray 
                ? `Array with ${count} items` 
                : (data && data.meta_title ? `Title: "${data.meta_title}"` : `Object with ${count} keys`);

            console.log(`✅ [PASS] ${ep.name}`);
            console.log(`   URL: ${url}`);
            console.log(`   Status: HTTP ${res.status} OK (${duration}ms)`);
            console.log(`   Data Sample: ${sampleInfo}`);
            if (ep.path === '/home-page/') {
                console.log(`   - Meta Title: "${data.meta_title}"`);
                console.log(`   - Meta Description: "${data.meta_description?.substring(0, 50)}..."`);
                console.log(`   - Canonical URL: "${data.canonical_url}"`);
                console.log(`   - FAQs Count: ${data.faqs?.length || 0}`);
            }
            console.log('');
        } catch (err) {
            console.error(`❌ [ERROR] ${ep.name} (${url}):`, err.message);
            allPassed = false;
        }
    }

    console.log('=====================================================');
    if (allPassed) {
        console.log('🎉 ALL BACKEND ENDPOINTS ARE FULLY OPERATIONAL AND FETCHING CLEANLY!');
    } else {
        console.log('⚠️ SOME ENDPOINTS FAILED.');
    }
    console.log('=====================================================');
}

runTests();
