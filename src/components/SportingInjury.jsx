import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Play } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Import About page hero background images
import slide1 from '../assets/hero-bg-1.jpg';
import slide2 from '../assets/hero-bg-2.jpg';
import slide3 from '../assets/hero-bg-3.jpg';

const SportingInjury = () => {
    const { language } = useLanguage();
    const isRtl = language === 'AR';
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [slide1, slide2, slide3];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const solutions = [
        "Hip labral tear",
        "Hip Impingement",
        "Anterior Cruciate Ligament Injury",
        "Meniscal Tears",
        "Patellofemoral Instablity"
    ];

    return (
        <section className="py-20 bg-gray-50/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-4xl font-montserrat text-[#555] tracking-tight">
                        Have You Suffered A <span className="text-[#3a7e7a] font-extrabold uppercase">Sporting Injury</span> To The Hip Or Knee?
                    </h2>
                </motion.div>

                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    {/* Video Section */}
                    <motion.div
                        initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="w-full lg:w-3/5"
                    >
                        <div className="relative group cursor-pointer overflow-hidden rounded-xl shadow-2xl aspect-video bg-[#043275]">
                            {/* Background slideshow only */}
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={currentSlide}
                                    src={slides[currentSlide]}
                                    alt="Sporting Injury Background"
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 0.8, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1.5 }}
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            </AnimatePresence>

                            {/* Subtle pattern overlay */}
                            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                        </div>
                    </motion.div>

                    {/* Content Section */}
                    <motion.div
                        initial={{ opacity: 0, x: isRtl ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="w-full lg:w-2/5"
                    >
                        <h4 className="text-[#333] font-bold text-lg mb-8">Learn about possible solutions:</h4>

                        <ul className="space-y-4 mb-10">
                            {solutions.map((item, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
                                    className="flex items-center gap-3 text-gray-600 font-medium"
                                >
                                    <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-[#3a7e7a]">
                                        <Check className="w-5 h-5 stroke-[3px]" />
                                    </div>
                                    <span>{item}</span>
                                </motion.li>
                            ))}
                        </ul>

                        <motion.button
                            whileHover={{ scale: 1.05, backgroundColor: '#f97316' }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full sm:w-auto px-10 py-4 bg-[#ff7b42] text-white font-black text-sm uppercase tracking-widest rounded-full shadow-lg transition-colors duration-300"
                        >
                            BOOK A CONSULTATION
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default SportingInjury;
