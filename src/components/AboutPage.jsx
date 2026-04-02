import React from 'react';
import About from './About';
import Publications from './Publications';
import SportingInjury from './SportingInjury';
import Breadcrumbs from './ui/Breadcrumbs';

const AboutPage = () => {
    return (
        <main className="pt-20 bg-gray-50 min-h-screen">
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
