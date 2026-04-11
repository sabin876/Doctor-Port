import SEO from './SEO';
import heroImg from '../assets/hero-bg-1.webp';
import HomeHero from './HomeHero';

import Affiliations from './Affiliations';
import PersonalizedSolutions from './PersonalizedSolutions';
import CTABanner from './CTABanner';
import SportingInjury from './SportingInjury';
import Testimonials from './Testimonials';

const Home = () => {
    return (
        <main>
            <SEO title="Dr. Ulhas | Expert Orthopedic Surgeon" url="/" image={heroImg} />
            <HomeHero />

            <Affiliations />
            <PersonalizedSolutions />
            <CTABanner />
            <SportingInjury />
            <Testimonials />
        </main>
    );
};

export default Home;
