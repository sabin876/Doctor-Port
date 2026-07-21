import React, { useState, useEffect } from 'react';
import SEO from './SEO';
import Services from './Services';
import CTABanner from './CTABanner';
import FAQ from './FAQ';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../lib/api';
import Breadcrumbs from './ui/Breadcrumbs';
import heroImg from '../assets/joint-replacement-bg.webp';

const ServicesPage = () => {
    const { t } = useLanguage();
    const [services, setServices] = useState([]);
    
    useEffect(() => {
        api.getServices()
            .then(data => {
                setServices(data || []);
            })
            .catch(err => {
                console.error("Failed to fetch services for schema:", err);
            });
    }, []);
    
    // Get service-specific FAQs from translations
    const serviceFaqs = [0, 1, 2].map(i => ({
        question: t(`faq_services.items.${i}.question`),
        answer: t(`faq_services.items.${i}.answer`)
    }));

    // Dynamic Schema Generation for SEO
    const stripHtml = (html) => {
        if (!html) return '';
        return html.replace(/<[^>]*>/g, '').trim();
    };

    const origin = window.location.origin;

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
    const hasValidFaqs = serviceFaqs && serviceFaqs.length > 0 && serviceFaqs[0].question && !serviceFaqs[0].question.startsWith('faq_services');
    const faqSchema = hasValidFaqs ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": serviceFaqs.map(faq => ({
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

    return (
        <main className="pt-20 bg-gray-50 min-h-screen">
            <SEO 
                title="Orthopedic Services & Treatments | Dr. Ulhas"
                description="Explore our specialized orthopedic services including joint replacement, sports injury management, and arthroscopy."
                url="/services"
                image={heroImg}
                schemaList={schemaList}
            />
            <div className="bg-white border-b border-gray-100">
                <Breadcrumbs items={[
                    { name: t('nav.home'), path: '/' },
                    { name: t('nav.services') }
                ]} />
            </div>
            <Services />
            <CTABanner />
            <FAQ 
                title={t('faq_services.title')} 
                description={t('faq_services.description')} 
                items={serviceFaqs} 
            />
        </main>
    );
};

export default ServicesPage;
