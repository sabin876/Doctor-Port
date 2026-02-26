import React from 'react';
import HomeHero from './HomeHero';
import SpecializedSolutions from './SpecializedSolutions';
import SportingInjury from './SportingInjury';
import WhyChooseUs from './WhyChooseUs';
import Testimonials from './Testimonials';

const Home = () => {
    return (
        <main>
            <HomeHero />
            <SpecializedSolutions />
            <SportingInjury />
            {/* <WhyChooseUs /> */}
            <Testimonials />
        </main>
    );
};

export default Home;
