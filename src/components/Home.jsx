import HomeHero from './HomeHero';
import Affiliations from './Affiliations';
import SpecializedSolutions from './SpecializedSolutions';
import SportingInjury from './SportingInjury';
import WhyChooseUs from './WhyChooseUs';
import Testimonials from './Testimonials';

const Home = () => {
    return (
        <main>
            <HomeHero />
            <Affiliations />
            <SpecializedSolutions />
            <SportingInjury />
            {/* <WhyChooseUs /> */}
            <Testimonials />
        </main>
    );
};

export default Home;
