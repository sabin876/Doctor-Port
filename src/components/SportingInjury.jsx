import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const SportingInjury = () => {
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
                        <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-white aspect-[9/16] max-w-[340px] mx-auto lg:mx-0">
                            <iframe
                                src="https://www.instagram.com/reel/DTijxQ3krcw/embed"
                                className="absolute inset-0 w-full h-full border-0"
                                allowTransparency="true"
                                allow="encrypted-media"
                                scrolling="no"
                                frameBorder="0"
                            ></iframe>
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
