import React from 'react';
import Services from './Services';
import FAQ from './FAQ';
import { useLanguage } from '../context/LanguageContext';

const ServicesPage = () => {
    const { t } = useLanguage();
    
    // Get service-specific FAQs from translations
    const serviceFaqs = [0, 1, 2].map(i => ({
        question: t(`faq_services.items.${i}.question`),
        answer: t(`faq_services.items.${i}.answer`)
    }));

    return (
        <main className="pt-20">
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
