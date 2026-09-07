const API_BASE = 'https://api.drulhasorthopedic.com/api';

function getAbsoluteImageUrl(imgUrl, defaultImage = null) {
    if (!imgUrl || typeof imgUrl !== 'string') {
        return defaultImage || 'https://drulhasorthopedic.com/assets/images/doctor-hero.webp';
    }
    let url = imgUrl.trim();
    if (!url) {
        return defaultImage || 'https://drulhasorthopedic.com/assets/images/doctor-hero.webp';
    }
    if (url.includes('localhost:8000') || url.includes('127.0.0.1:8000')) {
        url = url.replace(/http:\/\/(localhost|127\.0\.0\.1):8000/g, 'https://api.drulhasorthopedic.com');
    }
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }
    if (url.startsWith('/media/') || url.startsWith('media/')) {
        const cleanMedia = url.startsWith('/') ? url : `/${url}`;
        return `https://api.drulhasorthopedic.com${cleanMedia}`;
    }
    return `https://drulhasorthopedic.com/${url.replace(/^\/+/, '')}`;
}

async function verifyAllDataIntegrity() {
    console.log('='.repeat(70));
    console.log('🚀 Full Frontend-Backend Data Integrity & Fetching Test');
    console.log('='.repeat(70));

    let totalChecks = 0;
    let passedChecks = 0;
    const issues = [];

    // 1. SERVICES & SUBSERVICES
    totalChecks++;
    try {
        const res = await fetch(`${API_BASE}/services/`, { signal: AbortSignal.timeout(15000) });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const services = await res.json();
        
        if (!Array.isArray(services) || services.length === 0) {
            throw new Error('Services response is not a non-empty array');
        }
        passedChecks++;
        console.log(`✅ [1/6] Services Fetched Successfully (${services.length} services loaded)`);

        let subServiceCount = 0;
        let missingSlug = 0;
        let missingTitle = 0;

        for (const s of services) {
            if (!s.slug) missingSlug++;
            if (!s.title) missingTitle++;
            if (Array.isArray(s.sub_services)) {
                subServiceCount += s.sub_services.length;
                for (const sub of s.sub_services) {
                    if (!sub.slug) missingSlug++;
                    if (!sub.title) missingTitle++;
                }
            }
        }

        totalChecks++;
        if (missingSlug === 0 && missingTitle === 0) {
            passedChecks++;
            console.log(`✅ [2/6] All ${services.length} Services & ${subServiceCount} Sub-Services have valid titles & slugs`);
        } else {
            issues.push(`Missing slug (${missingSlug}) or title (${missingTitle}) in services`);
        }
    } catch (e) {
        issues.push(`Services Fetch Failed: ${e.message}`);
    }

    // 2. ARTICLES
    totalChecks++;
    try {
        const res = await fetch(`${API_BASE}/articles/`, { signal: AbortSignal.timeout(15000) });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const articles = await res.json();

        if (!Array.isArray(articles) || articles.length === 0) {
            throw new Error('Articles response is not a non-empty array');
        }
        passedChecks++;
        console.log(`✅ [3/6] Articles Fetched Successfully (${articles.length} articles loaded)`);

        let missingArticleSlug = 0;
        let missingArticleContent = 0;

        for (const a of articles) {
            if (!a.slug) missingArticleSlug++;
            if (!a.content && !a.excerpt) missingArticleContent++;
        }

        totalChecks++;
        if (missingArticleSlug === 0 && missingArticleContent === 0) {
            passedChecks++;
            console.log(`✅ [4/6] All ${articles.length} Articles have valid slugs and readable content`);
        } else {
            issues.push(`Missing slug (${missingArticleSlug}) or content (${missingArticleContent}) in articles`);
        }
    } catch (e) {
        issues.push(`Articles Fetch Failed: ${e.message}`);
    }

    // 3. HOME FAQS & SETTINGS
    totalChecks++;
    try {
        const [faqsRes, settingsRes, homePageRes, heroRes, galleryRes] = await Promise.all([
            fetch(`${API_BASE}/home-faqs/`, { signal: AbortSignal.timeout(15000) }),
            fetch(`${API_BASE}/settings/`, { signal: AbortSignal.timeout(15000) }),
            fetch(`${API_BASE}/home-page/`, { signal: AbortSignal.timeout(15000) }),
            fetch(`${API_BASE}/hero-video/`, { signal: AbortSignal.timeout(15000) }),
            fetch(`${API_BASE}/gallery/`, { signal: AbortSignal.timeout(15000) })
        ]);

        const faqs = await faqsRes.json();
        const settings = await settingsRes.json();
        const homePage = await homePageRes.json();
        const hero = await heroRes.json();
        const gallery = await galleryRes.json();

        const allValid = faqsRes.ok && settingsRes.ok && homePageRes.ok && heroRes.ok && galleryRes.ok;
        if (allValid) {
            passedChecks++;
            console.log(`✅ [5/6] Home FAQs (${Array.isArray(faqs) ? faqs.length : 0}), Settings, Home Page, Hero Video, and Gallery (${Array.isArray(gallery) ? gallery.length : 0} items) fetched successfully`);
        } else {
            throw new Error('One or more site configuration endpoints failed');
        }
    } catch (e) {
        issues.push(`Site Settings / FAQs Fetch Failed: ${e.message}`);
    }

    // 4. IMAGE URL RESOLUTION CHECK
    totalChecks++;
    try {
        const sampleUrl1 = getAbsoluteImageUrl('/media/articles/knee-image.jpg');
        const sampleUrl2 = getAbsoluteImageUrl('http://localhost:8000/media/articles/knee-image.jpg');
        const sampleUrl3 = getAbsoluteImageUrl('https://api.drulhasorthopedic.com/media/articles/knee-image.jpg');

        const allAbsolute = sampleUrl1.startsWith('https://') && sampleUrl2.startsWith('https://') && sampleUrl3.startsWith('https://');
        if (allAbsolute && !sampleUrl2.includes('localhost')) {
            passedChecks++;
            console.log(`✅ [6/6] Image URL resolution correctly replaces localhost and handles relative media paths`);
        } else {
            throw new Error('Image URL resolution failed');
        }
    } catch (e) {
        issues.push(`Image URL Resolution Failed: ${e.message}`);
    }

    console.log('='.repeat(70));
    console.log(`SUMMARY: ${passedChecks}/${totalChecks} Checks Passed.`);
    if (issues.length === 0) {
        console.log('🎉 ALL BACKEND DATA IS PROPERLY FETCHED AND FORMATTED FOR THE FRONTEND!');
    } else {
        console.log('⚠️ Issues encountered:', issues);
    }
    console.log('='.repeat(70));
}

verifyAllDataIntegrity();
