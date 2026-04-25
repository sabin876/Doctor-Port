import React from 'react';
import SEO from './SEO';
import Services from './Services';
import FAQ from './FAQ';
import { useLanguage } from '../context/LanguageContext';
import Breadcrumbs from './ui/Breadcrumbs';
import heroImg from '../assets/joint-replacement-bg.webp';

const ServicesPage = () => {
    const { t } = useLanguage();
    
    // Get service-specific FAQs from translations
    const serviceFaqs = [0, 1, 2].map(i => ({
        question: t(`faq_services.items.${i}.question`),
        answer: t(`faq_services.items.${i}.answer`)
    }));

    return (
        <main className="pt-20 bg-gray-50 min-h-screen">
            <SEO 
                title="Orthopedic Services & Treatments | Dr. Ulhas"
                description="Explore our specialized orthopedic services including joint replacement, sports injury management, and arthroscopy."
                url="/services"
                image={heroImg}
            />
            <div className="bg-white border-b border-gray-100">
                <Breadcrumbs items={[
                    { name: t('nav.home'), path: '/' },
                    { name: t('nav.services') }
                ]} />
            </div>
            <Services />
            <FAQ />
        </main>
    );
};

export default ServicesPage;
