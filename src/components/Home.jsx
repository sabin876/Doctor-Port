import React, { useState, useEffect } from 'react';
import SEO from './SEO';
import heroImg from '../assets/hero-bg-1.webp';
import HomeHero from './HomeHero';
import { api } from '../lib/api';

import Affiliations from './Affiliations';
import PersonalizedSolutions from './PersonalizedSolutions';
import CTABanner from './CTABanner';
import Services from './Services';
import MovementMission from './MovementMission';
import SportingInjury from './SportingInjury';
import WhyPatientsTrust from './WhyPatientsTrust';
import Testimonials from './Testimonials';
import FAQ from './FAQ';
import HomeArticles from './HomeArticles';

const Home = () => {
    const [homeData, setHomeData] = useState(null);

    useEffect(() => {
        let isMounted = true;
        api.getHomePage()
            .then(data => {
                if (isMounted && data) {
                    setHomeData(data);
                }
            })
            .catch(err => {
                console.error("Failed to load home page configuration:", err);
            });
        return () => { isMounted = false; };
    }, []);

    const seoTitle = homeData?.meta_title || "Dr. Ulhas | Expert Orthopedic Surgeon Dubai";
    const seoDesc = homeData?.meta_description || "Expert orthopedic care specializing in joint replacement, sports injuries, and comprehensive rehabilitation with Dr. Ulhas.";
    const seoImage = homeData?.og_image || heroImg;
    const canonicalUrl = homeData?.canonical_url || "/";

    let schemaList = [];
    if (homeData?.schema_markup) {
        schemaList.push(homeData.schema_markup);
    }

    return (
        <main>
            <SEO 
                title={seoTitle}
                description={seoDesc}
                url={canonicalUrl} 
                image={seoImage}
                schemaList={schemaList}
            />
            <HomeHero />

            <Affiliations />
            <PersonalizedSolutions />
            <CTABanner />
            <Services isHomePage={true} />
            <MovementMission />
            <SportingInjury />
            <WhyPatientsTrust />
            <Testimonials />
            <FAQ 
                title={homeData?.faq_title}
                description={homeData?.faq_description}
                items={homeData?.faqs && homeData.faqs.length > 0 ? homeData.faqs : null}
            />
            <HomeArticles />
        </main>
    );
};

export default Home;
