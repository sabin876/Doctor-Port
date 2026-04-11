import React from 'react';
import SEO from './SEO';
import doctorImg from '../assets/doctor-profile.webp';
import About from './About';
import Publications from './Publications';
import SportingInjury from './SportingInjury';
import Breadcrumbs from './ui/Breadcrumbs';

const AboutPage = () => {
    return (
        <main className="pt-20 bg-gray-50 min-h-screen">
            <SEO 
                title="About Dr. Ulhas | Leading Orthopedic Specialist"
                description="Learn more about Dr. Ulhas's qualifications, orthopedic experience, and dedication to personalized patient treatment."
                url="/about"
                image={doctorImg}
            />
            <div className="bg-white border-b border-gray-100">
                <Breadcrumbs items={[
                    { name: 'Home', path: '/' },
                    { name: 'About Dr. Ulhas' }
                ]} />
            </div>
            <About />
            <Publications />
            <SportingInjury />
        </main>
    );
};

export default AboutPage;
