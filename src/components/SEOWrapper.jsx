import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { api } from '../lib/api';

const SEOWrapper = ({ children }) => {
    const location = useLocation();
    const [seoData, setSeoData] = useState(null);
    const [siteSettings, setSiteSettings] = useState(null);

    useEffect(() => {
        const fetchSEO = async () => {
            try {
                // Fetch site-wide settings (scripts, robots)
                const settings = await api.getSiteSettings();
                setSiteSettings(settings);

                // Fetch page-specific SEO
                const path = location.pathname;
                if (path.startsWith('/blog/')) {
                    const slug = path.split('/')[2];
                    if (slug) {
                        const data = await api.getArticle(slug);
                        setSeoData(data);
                    }
                } else if (path.startsWith('/services/')) {
                    const slug = path.split('/')[2];
                    if (slug) {
                        const services = await api.getServices();
                        const data = services.find(s => s.slug === slug);
                        setSeoData(data);
                    }
                } else {
                    // Default/Home SEO
                    setSeoData({
                        meta_title: "Dr. Ulhas Sonar | Orthopedic Surgeon Dubai",
                        meta_description: "Expert orthopedic care in Dubai. Specialist in robotic joint replacement and sports injuries.",
                        canonical_url: window.location.href,
                        index_page: true,
                        follow_links: true
                    });
                }
            } catch (error) {
                console.error('Failed to fetch SEO data:', error);
            }
        };

        fetchSEO();
    }, [location.pathname]);

    // Function to parse raw HTML strings for Helmet
    const renderRawScripts = (htmlString) => {
        if (!htmlString) return null;
        // This is a simple way to inject raw HTML tags into the head via Helmet
        // Warning: This bypasses some React safety, but is standard for SEO scripts
        return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
    };

    const currentUrl = `${window.location.origin}${location.pathname}`;
    const canonicalUrl = seoData?.canonical_url || currentUrl;

    return (
        <>
            <Helmet>
                {seoData && (
                    <>
                        <title>{seoData.meta_title || seoData.title || "Dr. Ulhas Sonar"}</title>
                        <meta name="description" content={seoData.meta_description || seoData.description} />
                        <link rel="canonical" href={canonicalUrl} />
                        <meta name="robots" content={`${seoData.index_page !== false ? 'index' : 'noindex'}, ${seoData.follow_links !== false ? 'follow' : 'nofollow'}`} />
                        
                        {/* OG Tags */}
                        <meta property="og:title" content={seoData.og_title || seoData.meta_title || seoData.title} />
                        <meta property="og:description" content={seoData.og_description || seoData.meta_description || seoData.description} />
                        <meta property="og:url" content={currentUrl} />
                        <meta property="og:type" content={location.pathname.startsWith('/blog/') ? 'article' : 'website'} />
                        {seoData.og_image && <meta property="og:image" content={seoData.og_image} />}
                        
                        {/* Schema Markup */}
                        {seoData.schema_markup && (
                            <script type="application/ld+json">
                                {JSON.stringify(seoData.schema_markup)}
                            </script>
                        )}
                    </>
                )}
            </Helmet>
            
            {/* Inject Header Scripts directly if they contain <script> tags */}
            {siteSettings?.header_scripts && (
                <div style={{ display: 'none' }} dangerouslySetInnerHTML={{ __html: siteSettings.header_scripts }} />
            )}
            
            {children}
            
            {/* Footer Scripts */}
            {siteSettings?.footer_scripts && (
                <div style={{ display: 'none' }} dangerouslySetInnerHTML={{ __html: siteSettings.footer_scripts }} />
            )}
        </>
    );
};

export default SEOWrapper;
