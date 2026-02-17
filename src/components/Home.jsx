import React from 'react';
import HomeHero from './HomeHero';
import About from './About';
import WhyChooseUs from './WhyChooseUs';
import Services from './Services';
import Testimonials from './Testimonials';
import Appointment from './Appointment';
import FAQ from './FAQ';
import Contact from './Contact';

const Home = () => {
    return (
        <main>
            <HomeHero />
            {/* <WhyChooseUs /> */}
            <About />
            <Services />
            {/* <Appointment /> */}
            {/* <Testimonials /> */}
            <FAQ />
            <Contact />
        </main>
    );
};

export default Home;
