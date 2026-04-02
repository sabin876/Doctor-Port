import SEO from './SEO';
import HomeHero from './HomeHero';

import Affiliations from './Affiliations';
import PersonalizedSolutions from './PersonalizedSolutions';
import SportingInjury from './SportingInjury';
import Testimonials from './Testimonials';
import FAQ from './FAQ';

const Home = () => {
    return (
        <main>
            <SEO title="Dr. Ulhas | Expert Orthopedic Surgeon" url="/" />
            <HomeHero />

            <Affiliations />
            <PersonalizedSolutions />
            <SportingInjury />
            <Testimonials />
            <FAQ />
        </main>
    );
};

export default Home;
