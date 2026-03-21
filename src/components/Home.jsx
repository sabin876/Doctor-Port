import HomeHero from './HomeHero';
import Affiliations from './Affiliations';
import SpecializedSolutions from './SpecializedSolutions';
import SportingInjury from './SportingInjury';
import Testimonials from './Testimonials';
import FAQ from './FAQ';

const Home = () => {
    return (
        <main>
            <HomeHero />
            <Affiliations />
            <SpecializedSolutions />
            <SportingInjury />
            <Testimonials />
            <FAQ />
        </main>
    );
};

export default Home;
