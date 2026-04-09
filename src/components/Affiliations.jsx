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
        <section className="py-14 relative overflow-hidden bg-white">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-50 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
            </div>

            <div className="container mx-auto px-4 mb-10 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <span className="inline-block px-3 py-1 mb-4 text-[9px] font-bold tracking-[0.3em] text-primary-600 uppercase bg-primary-50/50 rounded-full border border-primary-100/50 backdrop-blur-sm">
                        Professional Excellence
                    </span>
                    <h2 className="text-2xl md:text-3xl font-metabolic font-black text-primary-950 uppercase tracking-tighter leading-none mb-4">
                        {t?.affiliations || "Memberships & Affiliations"}
                    </h2>
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-8 h-0.5 bg-primary-600/20 rounded-full"></div>
                        <div className="w-2 h-2 bg-primary-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.4)]"></div>
                        <div className="w-8 h-0.5 bg-primary-600/20 rounded-full"></div>
                    </div>
                </motion.div>
            </div>

            <div className="relative flex overflow-x-hidden py-4 group">
                <motion.div
                    className="flex whitespace-nowrap"
                    animate={{
                        x: [0, -120 * logos.length],
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
                            className="flex flex-col items-center justify-center mx-6 md:mx-10 group/card cursor-pointer"
                        >
                            <div className="w-28 h-28 md:w-36 md:h-36 bg-white/70 backdrop-blur-md rounded-[2rem] shadow-[0_8px_30px_-10px_rgba(30,58,138,0.08)] border border-white/80 flex items-center justify-center p-4 mb-4 transition-all duration-700 group-hover/card:shadow-[0_20px_50px_-10px_rgba(30,58,138,0.15)] group-hover/card:-translate-y-3 group-hover/card:border-primary-100/50 relative overflow-hidden group-hover/card:scale-105">
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
                                <span className="text-[9px] md:text-[10px] font-metabolic font-black text-gray-400 group-hover/card:text-primary-800 transition-colors duration-500 text-center max-w-[140px] whitespace-normal uppercase tracking-[0.15em] leading-tight">
                                    {logo.name}
                                </span>
                            )}
                        </div>
                    ))}
                </motion.div>

                {/* Glassy Gradient Masks */}
                <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
            </div>

            <div className="mt-8 text-center opacity-30 select-none pointer-events-none">
                <p className="text-[8px] font-metabolic uppercase tracking-[0.8em] text-primary-200">Trusted Global Standards</p>
            </div>
        </section>
    );
};

export default Affiliations;
