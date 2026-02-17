import React from 'react';
import HomeHero from './HomeHero';
import SpecializedSolutions from './SpecializedSolutions';
import SportingInjury from './SportingInjury';
import About from './About';
import WhyChooseUs from './WhyChooseUs';
import Services from './Services';
import Testimonials from './Testimonials';
import Appointment from './Appointment';
import FAQ from './FAQ';

const Home = () => {
    return (
        <main>
            <HomeHero />
            <SpecializedSolutions />
            <SportingInjury />
            {/* <WhyChooseUs /> */}
            {/* <About /> */}
            <Services />
            {/* <Appointment /> */}
            {/* <Testimonials /> */}
            <FAQ />
        </main>
    );
};

export default Home;
