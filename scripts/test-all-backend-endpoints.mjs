const API_BASE = 'https://api.drulhasorthopedic.com/api';

async function testEndpoint(name, url, options = {}) {
    const start = Date.now();
    try {
        const res = await fetch(url, { ...options, signal: AbortSignal.timeout(15000) });
        const duration = Date.now() - start;
        if (!res.ok) {
            return {
                name,
                url,
                status: res.status,
                ok: false,
                duration,
                error: `HTTP ${res.status}: ${res.statusText}`
            };
        }
        const data = await res.json();
        return {
            name,
            url,
            status: res.status,
            ok: true,
            duration,
            data
        };
    } catch (err) {
        return {
            name,
            url,
            status: 'ERROR',
            ok: false,
            duration: Date.now() - start,
            error: err.message
        };
    }
}

async function runAudit() {
    console.log('='.repeat(60));
    console.log('🔍 Comprehensive Backend API & Frontend Data Fetch Audit');
    console.log(`Target API Base: ${API_BASE}`);
    console.log('='.repeat(60));

    const results = [];

    // 1. Services
    const servicesRes = await testEndpoint('Services List (/api/services/)', `${API_BASE}/services/`);
    results.push(servicesRes);

    let sampleServiceSlug = null;
    let sampleSubService = null;
    let totalServices = 0;
    let totalSubServices = 0;

    if (servicesRes.ok && Array.isArray(servicesRes.data)) {
        totalServices = servicesRes.data.length;
        if (servicesRes.data.length > 0) {
            sampleServiceSlug = servicesRes.data[0].slug;
            for (const s of servicesRes.data) {
                if (Array.isArray(s.sub_services) && s.sub_services.length > 0) {
                    totalSubServices += s.sub_services.length;
                    if (!sampleSubService) {
                        sampleSubService = { parentSlug: s.slug, sub: s.sub_services[0] };
                    }
                }
            }
        }
    }

    // 2. Individual Service Detail
    if (sampleServiceSlug) {
        const serviceDetailRes = await testEndpoint(
            `Service Detail (/api/services/${sampleServiceSlug}/)`,
            `${API_BASE}/services/${sampleServiceSlug}/`
        );
        results.push(serviceDetailRes);
    }

    // 3. Articles (Published)
    const articlesRes = await testEndpoint('Articles List (/api/articles/)', `${API_BASE}/articles/`);
    results.push(articlesRes);

    let sampleArticleSlug = null;
    let totalArticles = 0;
    if (articlesRes.ok && Array.isArray(articlesRes.data)) {
        totalArticles = articlesRes.data.length;
        if (articlesRes.data.length > 0) {
            sampleArticleSlug = articlesRes.data[0].slug;
        }
    }

    // 4. Articles (All / Admin)
    const articlesAllRes = await testEndpoint('Articles All (/api/articles/?all=true)', `${API_BASE}/articles/?all=true`);
    results.push(articlesAllRes);

    // 5. Individual Article Detail
    if (sampleArticleSlug) {
        const articleDetailRes = await testEndpoint(
            `Article Detail (/api/articles/${sampleArticleSlug}/)`,
            `${API_BASE}/articles/${sampleArticleSlug}/`
        );
        results.push(articleDetailRes);
    }

    // 6. Site Settings
    const settingsRes = await testEndpoint('Site Settings (/api/settings/)', `${API_BASE}/settings/`);
    results.push(settingsRes);

    // 7. Hero Video
    const heroRes = await testEndpoint('Hero Video (/api/hero-video/)', `${API_BASE}/hero-video/`);
    results.push(heroRes);

    // 8. Gallery
    const galleryRes = await testEndpoint('Gallery Items (/api/gallery/)', `${API_BASE}/gallery/`);
    results.push(galleryRes);

    // 9. Home FAQs
    const faqsRes = await testEndpoint('Home FAQs (/api/home-faqs/)', `${API_BASE}/home-faqs/`);
    results.push(faqsRes);

    // 10. Home Page
    const homePageRes = await testEndpoint('Home Page (/api/home-page/)', `${API_BASE}/home-page/`);
    results.push(homePageRes);

    // 11. Translations
    const transEnRes = await testEndpoint('Translations EN (/api/translations/?lang=EN)', `${API_BASE}/translations/?lang=EN`);
    results.push(transEnRes);

    const transMrRes = await testEndpoint('Translations MR (/api/translations/?lang=MR)', `${API_BASE}/translations/?lang=MR`);
    results.push(transMrRes);

    const transHiRes = await testEndpoint('Translations HI (/api/translations/?lang=HI)', `${API_BASE}/translations/?lang=HI`);
    results.push(transHiRes);

    // 12. Second Opinions (public endpoint if accessible)
    const secondOpinionsRes = await testEndpoint('Second Opinions (/api/second-opinions/)', `${API_BASE}/second-opinions/`);
    results.push(secondOpinionsRes);

    // Print summary table
    console.log('\n📡 Endpoint Fetch Results:');
    let passCount = 0;
    let failCount = 0;

    for (const r of results) {
        const statusIcon = r.ok ? '✅' : '❌';
        const info = r.ok 
            ? `${Array.isArray(r.data) ? `Array[${r.data.length}]` : typeof r.data === 'object' && r.data !== null ? `Object (${Object.keys(r.data).length} keys)` : typeof r.data} (${r.duration}ms)`
            : `Error: ${r.error} (${r.duration}ms)`;
        
        console.log(`  ${statusIcon} [${r.status}] ${r.name.padEnd(45)} -> ${info}`);
        if (r.ok) passCount++;
        else failCount++;
    }

    console.log('\n📊 Detailed Data Field Checks:');
    
    // Services check
    if (servicesRes.ok && Array.isArray(servicesRes.data)) {
        console.log(`\n🔹 Services: Total ${totalServices} services, ${totalSubServices} sub-services found.`);
        const s = servicesRes.data[0] || {};
        console.log(`   Sample Service: "${s.title}" (slug: ${s.slug})`);
        console.log(`   - has description: ${!!s.description}`);
        console.log(`   - has sub_services: ${Array.isArray(s.sub_services)} (${s.sub_services?.length || 0} subservices)`);
        console.log(`   - has checklist: ${Array.isArray(s.checklist)} (${s.checklist?.length || 0} items)`);
        console.log(`   - has faqs: ${Array.isArray(s.faqs)} (${s.faqs?.length || 0} items)`);
        console.log(`   - has meta tags: meta_title=${!!s.meta_title}, meta_description=${!!s.meta_description}`);

        if (sampleSubService) {
            const sub = sampleSubService.sub;
            console.log(`\n🔹 Sample SubService: "${sub.title}" (slug: ${sub.slug}) under "${sampleSubService.parentSlug}"`);
            console.log(`   - has description: ${!!sub.description} (${(sub.description || '').length} chars)`);
            console.log(`   - has image: ${!!sub.image}`);
            console.log(`   - has checklist: ${Array.isArray(sub.checklist)} (${sub.checklist?.length || 0} items)`);
            console.log(`   - has faqs: ${Array.isArray(sub.faqs)} (${sub.faqs?.length || 0} items)`);
            console.log(`   - has highlights: ${Array.isArray(sub.highlights)} (${sub.highlights?.length || 0} items)`);
            console.log(`   - has meta tags: meta_title=${!!sub.meta_title}, meta_description=${!!sub.meta_description}`);
        }
    }

    // Articles check
    if (articlesRes.ok && Array.isArray(articlesRes.data)) {
        console.log(`\n🔹 Articles: Total ${totalArticles} published articles found.`);
        if (articlesRes.data.length > 0) {
            const a = articlesRes.data[0];
            console.log(`   Sample Article: "${a.title}" (slug: ${a.slug})`);
            console.log(`   - has content: ${!!a.content} (${(a.content || '').length} chars)`);
            console.log(`   - has excerpt: ${!!a.excerpt}`);
            console.log(`   - has image: ${!!a.image}`);
            console.log(`   - has category: ${!!a.category}`);
            console.log(`   - has published_at / created_at: ${a.published_at || a.created_at || a.date}`);
            console.log(`   - has meta tags: meta_title=${!!a.meta_title}, meta_description=${!!a.meta_description}`);
        }
    }

    // Settings check
    if (settingsRes.ok) {
        console.log(`\n🔹 Site Settings:`);
        const st = settingsRes.data || {};
        console.log(`   - site_name: "${st.site_name || st.name}"`);
        console.log(`   - phone: "${st.phone}"`);
        console.log(`   - email: "${st.email}"`);
        console.log(`   - address: "${st.address}"`);
    }

    // Home FAQs check
    if (faqsRes.ok) {
        console.log(`\n🔹 Home FAQs: Total ${Array.isArray(faqsRes.data) ? faqsRes.data.length : 0} FAQs found.`);
    }

    // Gallery check
    if (galleryRes.ok) {
        console.log(`\n🔹 Gallery: Total ${Array.isArray(galleryRes.data) ? galleryRes.data.length : 0} items found.`);
    }

    console.log('\n' + '='.repeat(60));
    console.log(`Audit Finished: ${passCount} Passed, ${failCount} Failed.`);
    console.log('='.repeat(60));
}

runAudit();
