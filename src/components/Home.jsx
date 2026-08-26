import SEO from './SEO';
import heroImg from '../assets/hero-bg-1.webp';
import HomeHero from './HomeHero';

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
    return (
        <main>
            <SEO title="Dr. Ulhas | Expert Orthopedic Surgeon" url="/" image={heroImg} />
            <HomeHero />

            <Affiliations />
            <PersonalizedSolutions />
            <CTABanner />
            <Services isHomePage={true} />
            <MovementMission />
            <SportingInjury />
            <WhyPatientsTrust />
            <Testimonials />
            <FAQ />
            <HomeArticles />
        </main>
    );
};

export default Home;
