import HomeHero from './HomeHero';
import Affiliations from './Affiliations';
import About from './About';
import Publications from './Publications';
import SpecializedSolutions from './SpecializedSolutions';
import SportingInjury from './SportingInjury';
import WhyChooseUs from './WhyChooseUs';
import Testimonials from './Testimonials';
import FAQ from './FAQ';

const Home = () => {
    return (
        <main>
            <HomeHero />
            <Affiliations />
            <About />
            <Publications />
            <SpecializedSolutions />
            <SportingInjury />
            <Testimonials />
            <FAQ />
        </main>
    );
};

export default Home;
