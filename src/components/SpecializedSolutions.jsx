import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import kneeArthroscopyImg from '../assets/knee-arthroscopy.png';
import wristPainImg from '../assets/wrist-pain.png';
import backPainImg from '../assets/back-pain.png';
import footPainImg from '../assets/foot-pain.png';
import elbowPainImg from '../assets/elbow-pain.png';

const solutions = [
    {
        title: "Hand & Wrist",
        image: wristPainImg,
        color: "bg-blue-50"
    },
    {
        title: "Back & Neck",
        image: backPainImg,
        color: "bg-blue-50"
    },
    {
        title: "Foot & Ankle",
        image: footPainImg,
        color: "bg-blue-50"
    },
    {
        title: "Elbow",
        image: elbowPainImg,
        color: "bg-blue-50"
    },
    {
        title: "Knee & Leg",
        image: kneeArthroscopyImg,
        color: "bg-blue-50"
    },
    {
        title: "Hip & Thigh",
        image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=800&auto=format&fit=crop", // Placeholder
        color: "bg-blue-50"
    },
    {
        title: "Shoulder",
        image: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?q=80&w=800&auto=format&fit=crop", // Placeholder
        color: "bg-blue-50"
    }
];

const SpecializedSolutions = () => {
    return (
        <section className="py-20 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl lg:text-5xl font-montserrat text-[#333] mb-6 font-extrabold tracking-tight"
                    >
                        Personalized solutions for every orthopedic need
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-[#555] max-w-2xl mx-auto text-sm md:text-md"
                    >
                        FOI physicians provide a responsive, personalized care plan for any musculoskeletal injury or condition.
                    </motion.p>
                </div>

                {/* Solutions Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 justify-center">
                    {solutions.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group cursor-pointer flex flex-col items-center"
                        >
                            <div className="relative w-full aspect-square mb-6 rounded-[2rem] overflow-hidden bg-[#f0f7ff] group-hover:shadow-2xl group-hover:shadow-blue-200/50 transition-all duration-500">
                                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                {/* Blue curve overlay like in the image */}
                                <div className="absolute inset-0 pointer-events-none p-4 z-20">
                                    <svg viewBox="0 0 100 100" className="w-full h-full opacity-20 group-hover:opacity-60 transition-all duration-500">
                                        <path
                                            d="M10 90 Q 50 10 90 90"
                                            fill="none"
                                            stroke="#0088cc"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-center font-bold text-[#0088cc] text-[12px] md:text-[13px] uppercase tracking-wider group-hover:text-[#006699] transition-colors leading-tight max-w-[110px]">
                                {item.title}
                            </h3>
                        </motion.div>
                    ))}
                </div>

                {/* Footer Link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-16 text-center"
                >
                    <a
                        href="#services"
                        className="inline-flex items-center gap-2 text-[#0088cc] font-bold text-sm uppercase tracking-widest hover:text-[#006699] transition-colors group"
                    >
                        View All Services & Treatments
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </a>
                </motion.div>
            </div>

            {/* Background Decorative Curves */}
            <div className="absolute top-0 end-0 -z-10 w-1/3 h-full overflow-hidden opacity-10">
                <svg viewBox="0 0 200 600" className="w-full h-full text-[#0077b6]">
                    <path d="M200 0 Q 50 300 200 600" fill="none" stroke="currentColor" strokeWidth="2" />
                    <path d="M250 50 Q 100 350 250 650" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
            </div>
        </section>
    );
};

export default SpecializedSolutions;
