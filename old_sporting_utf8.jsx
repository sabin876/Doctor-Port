import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Play } from 'lucide-react';

// Import About page hero background images
import slide1 from '../assets/hero-bg-1.jpg';
import slide2 from '../assets/hero-bg-2.jpg';
import slide3 from '../assets/hero-bg-3.jpg';

const SportingInjury = () => {
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
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="w-full lg:w-3/5"
                    >
                        <div className="relative group cursor-pointer overflow-hidden rounded-xl shadow-2xl aspect-video bg-[#043275]">
                            {/* Slideshow Background to match Hero section */}
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={currentSlide}
                                    src={slides[currentSlide]}
                                    alt="Sporting Injury Background"
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 0.6, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1.5 }}
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            </AnimatePresence>

                            {/* Subtle pattern overlay to match hero feel */}
                            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>

                            {/* Video Title Overlay (KNEE INJURIES) */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    className="text-white text-center z-10"
                                >
                                    <h3 className="text-4xl md:text-6xl font-montserrat font-black tracking-tighter uppercase leading-none">
                                        KNEE<br />
                                        <span className="text-2xl md:text-4xl tracking-[0.2em] font-medium">INJURIES</span>
                                    </h3>
                                    <div className="mt-4 w-24 h-1 bg-blue-600 mx-auto"></div>
                                </motion.div>

                                {/* Play Button */}
                                <div className="mt-8 w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/50 group-hover:bg-white group-hover:border-white transition-all duration-300">
                                    <Play className="w-8 h-8 text-white fill-white group-hover:text-blue-600 group-hover:fill-blue-600 transition-colors" />
                                </div>
                            </div>

                            {/* Fake Video Player Controls */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                <div className="flex items-center gap-4 text-white text-[10px] font-mono">
                                    <Play className="w-3 h-3" />
                                    <span>00:00</span>
                                    <div className="h-1 flex-grow bg-white/30 rounded-full overflow-hidden">
                                        <div className="w-1/3 h-full bg-white"></div>
                                    </div>
                                    <span>03:36</span>
                                    <div className="w-4 h-4 rounded-sm border border-white/50 flex items-center justify-center">
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                    </div>
                                    <div className="w-4 h-4 border border-white/50"></div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Content Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
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
                                    initial={{ opacity: 0, x: 20 }}
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
