import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { api, getAbsoluteImageUrl } from '../lib/api';
import { useInitialData } from '../context/InitialDataContext';

const SEOWrapper = ({ children }) => {
    const location = useLocation();
    const initialData = useInitialData();

    const isDetailRoute = location.pathname.startsWith('/blog/') || location.pathname.startsWith('/services/');

    const [seoData, setSeoData] = useState(() => {
        if (location.pathname.startsWith('/blog/')) {
            const slug = location.pathname.split('/')[2];
            return initialData?.getArticle?.(slug) || null;
        }
        if (location.pathname.startsWith('/services/')) {
            const slug = location.pathname.split('/')[2];
            return initialData?.getService?.(slug) || null;
        }
        return {
            meta_title: "Dr. Ulhas Sonar | Orthopedic Surgeon Dubai",
            meta_description: "Expert orthopedic care in Dubai. Specialist in robotic joint replacement and sports injuries.",
            canonical_url: typeof window !== 'undefined' ? window.location.href : 'https://drulhasorthopedic.com',
            index_page: true,
            follow_links: true
        };
    });

    const [siteSettings, setSiteSettings] = useState(() => {
        return initialData?.settings || (typeof window !== 'undefined' ? window.__INITIAL_SETTINGS__ : null);
    });

    useEffect(() => {
        const fetchSEO = async () => {
            try {
                // Fetch site-wide settings if not inlined
                let settings = siteSettings;
                if (!settings) {
                    settings = await api.getSiteSettings();
                    setSiteSettings(settings);
                }

                // Fetch page-specific SEO if not inlined
                const path = location.pathname;
                if (path.startsWith('/blog/')) {
                    const slug = path.split('/')[2];
                    if (slug) {
                        const inlined = window.__INITIAL_ARTICLES__?.find(a => a.slug?.toLowerCase() === slug?.toLowerCase());
                        if (inlined) {
                            setSeoData(inlined);
                        } else {
                            const data = await api.getArticle(slug);
                            setSeoData(data);
                        }
                    }
                } else if (path.startsWith('/services/')) {
                    const slug = path.split('/')[2];
                    if (slug) {
                        const inlined = window.__INITIAL_SERVICES__?.find(s => s.slug?.toLowerCase() === slug?.toLowerCase());
                        if (inlined) {
                            setSeoData(inlined);
                        } else {
                            const services = await api.getServices();
                            const data = services.find(s => s.slug?.toLowerCase() === slug?.toLowerCase());
                            setSeoData(data);
                        }
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
    }, [location.pathname, siteSettings]);

    // Function to parse raw HTML strings for Helmet
    const renderRawScripts = (htmlString) => {
        if (!htmlString) return null;
        // This is a simple way to inject raw HTML tags into the head via Helmet
        // Warning: This bypasses some React safety, but is standard for SEO scripts
        return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
    };

    // Function to render custom schema markup safely supporting both JSON objects/strings and HTML script tags
    const renderSchemaMarkup = (schema) => {
        if (!schema) return null;
        if (typeof schema === 'string') {
            const trimmed = schema.trim();
            if (trimmed.startsWith('<script') && trimmed.includes('</script>')) {
                return <div dangerouslySetInnerHTML={{ __html: trimmed }} />;
            }
            return (
                <script type="application/ld+json">
                    {trimmed}
                </script>
            );
        }
        return (
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
        );
    };

    const domain = 'https://drulhasorthopedic.com';
    const cleanPath = location.pathname.length > 1 && location.pathname.endsWith('/') 
        ? location.pathname.slice(0, -1) 
        : location.pathname;
    const currentUrl = `${domain}${cleanPath}`;
    const canonicalUrl = seoData?.canonical_url || currentUrl;

    const absoluteOgImage = getAbsoluteImageUrl(seoData?.image || seoData?.og_image);

    return (
        <>
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
