import React, { useState, useEffect } from 'react';
import SEO from './SEO';
import Services from './Services';
import CTABanner from './CTABanner';
import FAQ from './FAQ';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../lib/api';
import Breadcrumbs from './ui/Breadcrumbs';
import heroImg from '../assets/joint-replacement-bg.webp';

import { useInitialData } from '../context/InitialDataContext';

const ServicesPage = () => {
    const { t } = useLanguage();
    const initialData = useInitialData();
    const initialServices = initialData?.getServices?.()
        || (typeof window !== 'undefined' && window.__INITIAL_SERVICES__ ? window.__INITIAL_SERVICES__ : []);

    const [services, setServices] = useState(initialServices);
    const [pageData, setPageData] = useState(null);
    
    useEffect(() => {
        api.getServices()
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    setServices(data);
                }
            })
            .catch(err => {
                console.error("Failed to fetch services for schema:", err);
            });

        api.getServicesPage()
            .then(data => {
                if (data) {
                    setPageData(data);
                }
            })
            .catch(err => {
                console.error("Failed to fetch services page config from backend:", err);
            });
    }, []);
    
    // Get fallback service-specific FAQs from translations
    const defaultServiceFaqs = [0, 1, 2].map(i => ({
        question: t(`faq_services.items.${i}.question`),
        answer: t(`faq_services.items.${i}.answer`)
    }));

    const currentFaqs = (pageData?.faqs && Array.isArray(pageData.faqs) && pageData.faqs.length > 0)
        ? pageData.faqs
        : defaultServiceFaqs;

    const faqTitle = pageData?.faq_title || t('faq_services.title') || "Services FAQ";
    const faqDescription = pageData?.faq_description || t('faq_services.description') || "Common questions about our orthopedic procedures and specialized care plans in Pune, India.";

    // Dynamic Schema Generation for SEO
    const stripHtml = (html) => {
        if (!html) return '';
        return html.replace(/<[^>]*>/g, '').trim();
    };

    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://drulhasorthopedic.com';

    // 1. BreadcrumbList Schema
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": t('nav.home') || "Home",
                "item": `${origin}`
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": t('nav.services') || "Services",
                "item": `${origin}/services`
            }
        ]
    };

    // 2. ItemList Schema for orthopedic treatments
    const itemListSchema = services.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Orthopedic Services & Treatments",
        "description": "Explore our specialized orthopedic services including joint replacement, sports injury management, and arthroscopy.",
        "itemListElement": services.map((s, idx) => ({
            "@type": "ListItem",
            "position": idx + 1,
            "url": `${origin}/services/${s.slug}`,
            "name": s.title,
            "description": stripHtml(s.description)
        }))
    } : null;

    // 3. FAQPage Schema for the services page
    const hasValidFaqs = currentFaqs && currentFaqs.length > 0 && currentFaqs[0].question && !String(currentFaqs[0].question).startsWith('faq_services');
    const faqSchema = hasValidFaqs ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": currentFaqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": stripHtml(faq.answer)
            }
        }))
    } : null;

    const schemaList = [breadcrumbSchema];
    if (itemListSchema) {
        schemaList.push(itemListSchema);
    }
    if (faqSchema) {
        schemaList.push(faqSchema);
    }
    if (pageData?.schema_markup) {
        schemaList.push(pageData.schema_markup);
    }

    const seoTitle = pageData?.meta_title || "Orthopedic Services & Treatments | Dr. Ulhas";
    const seoDesc = pageData?.meta_description || "Explore our specialized orthopedic services including joint replacement, sports injury management, and arthroscopy.";
    const seoImage = pageData?.og_image || heroImg;
    const canonicalUrl = pageData?.canonical_url || "/services";

    return (
        <main className="pt-20 bg-gray-50 min-h-screen">
            <SEO 
                title={seoTitle}
                description={seoDesc}
                url={canonicalUrl}
                image={seoImage}
                schemaList={schemaList}
            />
            <div className="bg-white border-b border-gray-100">
                <Breadcrumbs items={[
                    { name: t('nav.home'), path: '/' },
                    { name: t('nav.services') }
                ]} />
            </div>
            <Services isPage={true} />
            <CTABanner />
            <FAQ 
                title={faqTitle} 
                description={faqDescription} 
                items={currentFaqs} 
            />
        </main>
    );
};

export default ServicesPage;
