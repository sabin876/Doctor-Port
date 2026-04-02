import React from 'react';
import Services from './Services';
import FAQ from './FAQ';
import { useLanguage } from '../context/LanguageContext';
import Breadcrumbs from './ui/Breadcrumbs';

const ServicesPage = () => {
    const { t } = useLanguage();
    
    // Get service-specific FAQs from translations
    const serviceFaqs = [0, 1, 2].map(i => ({
        question: t(`faq_services.items.${i}.question`),
        answer: t(`faq_services.items.${i}.answer`)
    }));

    return (
        <main className="pt-20 bg-gray-50 min-h-screen">
            <div className="bg-white border-b border-gray-100">
                <Breadcrumbs items={[
                    { name: t('nav.home'), path: '/' },
                    { name: t('nav.services') }
                ]} />
            </div>
            <Services />
            <FAQ 
                title={t('faq_services.title')} 
                description={t('faq_services.description')}
                items={serviceFaqs}
            />
        </main>
    );
};

export default ServicesPage;
