import React from 'react';
import { motion } from 'framer-motion';
import { translations } from '../translations';

const Affiliations = ({ lang = 'EN' }) => {
    const t = translations[lang].nav;

    const logos = [
        {
            name: "Indian Orthopaedic Association",
            src: "https://ioaindia.org/public/assets/images/IOAlogo.png"
        },
        {
            name: "British Orthopaedic Association",
            src: "https://www.boa.ac.uk/static/eeec4b84-35af-40f7-b3183c8ee2974b48/200x180_highestperformance__4a7c7e45a350/boa-final-identity-091018verticallockup-fullcolour042345281.png"
        },
        {
            name: "Bombay Orthopaedic Society",
            src: "https://bombayorth.in/images/logo.png"
        },
        {
            name: "Edge Hill University",
            src: "https://www.edgehill.ac.uk/wp-content/ehu-themes/ehu-wordpress-theme/resources/images/ehu_logo.webp"
        },
        {
            name: "Royal College of Surgeons",
            src: "https://www.rcseng.ac.uk/-/media/Images/RCS/System/royal-college-of-surgeons-of-england-logo-v2-transparent.png"
        },
        {
            name: "General Medical Council",
            src: "https://s24098.pcdn.co/wp-content/uploads/2017/09/1-GMC.png"
        },
        {
            name: "EBOT",
            src: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Ebot-logo.png"
        },
        {
            name: "Dubai Health Authority",
            src: "https://www.dha.gov.ae/img/assets/DHALOGO60.svg"
        },
        {
            name: "ISKSAA",
            src: "https://isksaa.com/images/logo.png"
        },
        {
            name: "Maharashtra Medical Council",
            src: "https://www.maharashtramedicalcouncil.in/assets/img/mmc_logo.png"
        },
        {
            name: "CAOS UK",
            src: "https://images.squarespace-cdn.com/content/v1/5d3f5a3b9412990001748a14/1568375829409-QKLOP7XRB54QL1IXSKQM/logo.jpg"
        }
    ];

    // Duplicate logos for infinite loop
    const doubledLogos = [...logos, ...logos];

    return (
        <section className="py-16 bg-white overflow-hidden border-y border-gray-100">
            <div className="container mx-auto px-4 mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-metabolic font-extrabold text-primary-950 uppercase tracking-tight">
                        {t?.affiliations || "Memberships & Affiliations"}
                    </h2>
                    <div className="w-20 h-1.5 bg-primary-600 mx-auto mt-6 rounded-full shadow-sm"></div>
                </motion.div>
            </div>

            <div className="relative flex overflow-x-hidden">
                <motion.div
                    className="flex whitespace-nowrap py-6"
                    animate={{
                        x: [0, -120 * logos.length],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 40,
                            ease: "linear",
                        },
                    }}
                >
                    {doubledLogos.map((logo, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center justify-center mx-8 md:mx-12 group cursor-pointer"
                        >
                            <div className="w-40 h-40 md:w-52 md:h-52 bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 flex items-center justify-center p-4 mb-6 transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(30,58,138,0.12)] group-hover:-translate-y-3 group-hover:border-primary-100 relative overflow-hidden">
                                {/* Subtle Background Pattern or Glow */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                
                                <img
                                    src={logo.src}
                                    alt={logo.name}
                                    className="max-w-[85%] max-h-[85%] object-contain transition-all duration-500 group-hover:scale-110 relative z-10"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                                <div className="hidden items-center justify-center w-full h-full text-center text-[10px] font-bold text-gray-400 bg-gray-50 rounded-xl px-2">
                                    {logo.name}
                                </div>
                            </div>
                            <span className="text-[10px] md:text-xs font-metabolic font-black text-gray-400 group-hover:text-primary-700 transition-colors duration-300 text-center max-w-[160px] whitespace-normal uppercase tracking-[0.15em] leading-tight">
                                {logo.name}
                            </span>
                        </div>
                    ))}
                </motion.div>

                {/* Gradient Masks for fade effect */}
                <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-white to-transparent z-10"></div>
                <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-white to-transparent z-10"></div>
            </div>
        </section>
    );
};

export default Affiliations;
