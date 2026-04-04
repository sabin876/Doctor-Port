import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import logo1 from '../assets/Logo 1.webp';
import logo2 from '../assets/Logo2.webp';
import logo3 from '../assets/logo 3.webp';
import logo4 from '../assets/logo 4.webp';
import logo5 from '../assets/logo 5.webp';
import logo6 from '../assets/logo 6.webp';
import logo7 from '../assets/logo 7.webp';
import logo8 from '../assets/logo 8.webp';

const Affiliations = () => {
    const { language, t: translate } = useLanguage();
    const t = translate('nav');

    const logos = [
        { name: "", src: logo1 },
        { name: "", src: logo2 },
        { name: "", src: logo3 },
        { name: "", src: logo4 },
        { name: "", src: logo5 },
        { name: "", src: logo6 },
        { name: "", src: logo7 },
        { name: "", src: logo8 },
    ];

    // Duplicate logos for infinite loop
    const doubledLogos = [...logos, ...logos];

    return (
        <section className="py-24 relative overflow-hidden bg-white">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-50 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
            </div>

            <div className="container mx-auto px-4 mb-20 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-bold tracking-[0.3em] text-primary-600 uppercase bg-primary-50/50 rounded-full border border-primary-100/50 backdrop-blur-sm">
                        Professional Excellence
                    </span>
                    <h2 className="text-4xl md:text-5xl font-metabolic font-black text-primary-950 uppercase tracking-tighter leading-none mb-6">
                        {t?.affiliations || "Memberships & Affiliations"}
                    </h2>
                    <div className="flex items-center justify-center gap-3">
                        <div className="w-12 h-1 bg-primary-600/20 rounded-full"></div>
                        <div className="w-3 h-3 bg-primary-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)]"></div>
                        <div className="w-12 h-1 bg-primary-600/20 rounded-full"></div>
                    </div>
                </motion.div>
            </div>

            <div className="relative flex overflow-x-hidden py-10 group">
                <motion.div
                    className="flex whitespace-nowrap"
                    animate={{
                        x: [0, -160 * logos.length],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 50,
                            ease: "linear",
                        },
                    }}
                    whileHover={{ transition: { duration: 80 } }} // Slow down on hover for readability
                >
                    {doubledLogos.map((logo, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center justify-center mx-10 md:mx-16 group/card cursor-pointer"
                        >
                            <div className="w-44 h-44 md:w-56 md:h-56 bg-white/70 backdrop-blur-md rounded-[3rem] shadow-[0_10px_40px_-15px_rgba(30,58,138,0.08)] border border-white/80 flex items-center justify-center p-6 mb-8 transition-all duration-700 group-hover/card:shadow-[0_25px_60px_-15px_rgba(30,58,138,0.15)] group-hover/card:-translate-y-4 group-hover/card:border-primary-100/50 relative overflow-hidden group-hover/card:scale-105">
                                {/* Inner Glow & Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white via-white/40 to-primary-50/20 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700"></div>
                                
                                <img
                                    src={logo.src}
                                    alt={logo.name}
                                    className="max-w-full max-h-full object-contain transition-all duration-700 group-hover/card:scale-110 relative z-10 filter group-hover/card:drop-shadow-lg"
                                />
                                <div className="hidden items-center justify-center w-full h-full text-center text-[10px] font-bold text-gray-400 bg-gray-50/50 rounded-xl px-2">
                                    {logo.name}
                                </div>
                            </div>
                            {logo.name && (
                                <span className="text-[11px] md:text-[12px] font-metabolic font-black text-gray-400 group-hover/card:text-primary-800 transition-colors duration-500 text-center max-w-[180px] whitespace-normal uppercase tracking-[0.2em] leading-tight">
                                    {logo.name}
                                </span>
                            )}
                        </div>
                    ))}
                </motion.div>

                {/* Glassy Gradient Masks */}
                <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-64 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
            </div>

            <div className="mt-16 text-center opacity-30 select-none pointer-events-none">
                <p className="text-[10px] font-metabolic uppercase tracking-[1em] text-primary-200">Trusted Global Standards</p>
            </div>
        </section>
    );
};

export default Affiliations;
