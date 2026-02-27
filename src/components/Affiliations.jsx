import React from 'react';
import { motion } from 'framer-motion';
import { translations } from '../translations';

const Affiliations = ({ lang = 'EN' }) => {
    const t = translations[lang].nav;

    const logos = [
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
            src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/General_Medical_Council_logo.svg/502px-General_Medical_Council_logo.svg.png"
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
                        x: [0, -100 * logos.length],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 30,
                            ease: "linear",
                        },
                    }}
                >
                    {doubledLogos.map((logo, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center justify-center mx-10 md:mx-16 group cursor-pointer"
                        >
                            <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-3xl shadow-sm border border-gray-50 flex items-center justify-center p-6 mb-4 transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-2 group-hover:border-primary-100">
                                <img
                                    src={logo.src}
                                    alt={logo.name}
                                    className="max-w-full max-h-full object-contain transition-all duration-500 group-hover:scale-110"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                                <div className="hidden items-center justify-center w-full h-full text-center text-[10px] font-bold text-gray-400 bg-gray-50 rounded-xl px-2">
                                    {logo.name}
                                </div>
                            </div>
                            <span className="text-[10px] md:text-xs font-metabolic font-black text-gray-400 group-hover:text-primary-600 transition-colors duration-300 text-center max-w-[140px] whitespace-normal uppercase tracking-widest leading-tight">
                                {logo.name}
                            </span>
                        </div>
                    ))}
                </motion.div>

                {/* Gradient Masks for fade effect */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
            </div>
        </section>
    );
};

export default Affiliations;
