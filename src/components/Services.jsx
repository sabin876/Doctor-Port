import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    ChevronDown,
    ChevronUp,
    Activity,
    Scan,
    Bone,
    Layers,
    Cpu,
    HeartPulse,
    Bandage,
    Stethoscope,
    ArrowRight
} from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';
import kneeArthroscopyImg from '../assets/knee-arthroscopy.png';
import jointReplacementImg from '../assets/joint-replacement-bg.png';
import sportsMedicineImg from '../assets/sports-medicine-bg.png';
import spineSurgeryImg from '../assets/spine-surgery-bg.png';
import handWristImg from '../assets/hand-wrist-bg.png';
import footAnkleImg from '../assets/foot-ankle-bg.png';

const Services = () => {
    const { t } = useLanguage();
    const [showAll, setShowAll] = useState(false);

    const services = [
        {
            title: t('services.items.0.title'),
            desc: t('services.items.0.desc'),
            icon: Bone,
            image: jointReplacementImg,
            gradient: "from-blue-600/10 to-transparent",
            accent: "blue"
        },
        {
            title: t('services.items.1.title'),
            desc: t('services.items.1.desc'),
            icon: Activity,
            image: sportsMedicineImg,
            gradient: "from-cyan-600/10 to-transparent",
            accent: "cyan"
        },
        {
            title: t('services.items.2.title'),
            desc: t('services.items.2.desc'),
            icon: Cpu,
            image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=60", // Robotic Surgery Look
            gradient: "from-indigo-600/10 to-transparent",
            accent: "indigo"
        },
        {
            title: t('services.items.3.title'),
            desc: t('services.items.3.desc'),
            icon: Scan,
            image: kneeArthroscopyImg,
            gradient: "from-teal-600/10 to-transparent",
            accent: "teal"
        },
        {
            title: t('services.items.4.title'),
            desc: t('services.items.4.desc'),
            icon: Layers,
            image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&auto=format&fit=crop&q=60", // Deformity Care X-ray
            gradient: "from-blue-700/10 to-transparent",
            accent: "blue"
        },
        {
            title: t('services.items.5.title'),
            desc: t('services.items.5.desc'),
            icon: Stethoscope,
            image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&auto=format&fit=crop&q=60", // Consultation
            gradient: "from-sky-600/10 to-transparent",
            accent: "sky"
        },
        {
            title: t('services.items.6.title'),
            desc: t('services.items.6.desc'),
            icon: Bandage,
            image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=60", // Orthopedic Trauma
            gradient: "from-emerald-600/10 to-transparent",
            accent: "emerald"
        },
        {
            title: t('services.items.7.title'),
            desc: t('services.items.7.desc'),
            icon: HeartPulse,
            image: "https://images.unsplash.com/photo-1576091160550-217359f49f4c?w=800&auto=format&fit=crop&q=60", // Physiotherapy
            gradient: "from-purple-600/10 to-transparent",
            accent: "purple"
        }
    ];

    const displayedServices = showAll ? services : services.slice(0, 4);

    return (
        <section id="services" className="py-24 bg-white relative overflow-hidden">
            {/* Subtle background decorations for light theme */}
            <div className="absolute top-0 start-0 w-full h-full overflow-hidden z-0 opacity-5 pointer-events-none">
                <div className="absolute top-[-5%] left-[-5%] w-[30%] h-[30%] bg-primary-600/10 blur-[80px] rounded-full"></div>
                <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-primary-600/10 blur-[80px] rounded-full"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-1.5 mb-4 rounded-full bg-primary-50 text-primary-700 text-[11px] font-bold uppercase tracking-[0.2em]"
                    >
                        {t('services.badge')}
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-montserrat font-extrabold text-gray-900 mb-6 tracking-tight">
                        {t('services.title')} <span className="text-primary-600">{t('services.titleHighlight')}</span> {t('services.titleEnd')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="mt-4 max-w-2xl text-lg font-normal text-gray-600 mx-auto"
                    >
                        {t('services.description')}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    <AnimatePresence>
                        {displayedServices.map((service, index) => (
                            <motion.div
                                key={index}
                                className="group relative h-[280px] rounded-[2rem] p-1 flex flex-col items-center text-center transition-all duration-500 overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{
                                    y: -8,
                                    scale: 1.01,
                                }}
                            >
                                {/* Full Card Background Image */}
                                {service.image && (
                                    <div className="absolute inset-0 z-0">
                                        <div className="absolute inset-0 bg-black/50 z-10 group-hover:bg-black/30 transition-colors duration-500" />
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                                        />
                                    </div>
                                )}

                                {/* Card Border Glow */}
                                <div className="absolute inset-0 rounded-[2.5rem] border border-white/20 group-hover:border-primary-300 transition-colors duration-500 pointer-events-none z-20" />

                                {/* Content Container */}
                                <div className="relative z-30 flex flex-col h-full items-center p-6 w-full justify-between transition-transform duration-500">
                                    <div className="flex-grow flex items-center justify-center">
                                        <h3 className="text-[17px] font-montserrat font-black text-white shadow-sm uppercase tracking-widest leading-snug drop-shadow-md px-2">
                                            {service.title}
                                        </h3>
                                    </div>

                                    <div className="w-full mt-auto">
                                        <Link
                                            to={`/services/${index}`}
                                            className="w-full py-3.5 bg-primary-600 text-white text-[12px] font-black uppercase tracking-[0.2em] rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-lg hover:bg-primary-700 hover:scale-[1.02] active:scale-[0.98] shadow-primary-200"
                                        >
                                            {t('services.viewDetails')}
                                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>

                                {/* Shine Pass-through */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none">
                                    <div className="absolute w-[200%] h-full top-0 left-[-150%] bg-gradient-to-r from-transparent via-white/40 to-transparent -rotate-45 group-hover:left-[100%] transition-all duration-1000 ease-in-out"></div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Show More / Show Less Button */}
                <motion.div
                    className="flex justify-center mt-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <motion.button
                        onClick={() => setShowAll(!showAll)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group flex items-center gap-3 px-10 py-5 bg-white border-2 border-primary-600 text-primary-600 rounded-[2rem] font-bold text-sm uppercase tracking-[0.2em] hover:bg-primary-600 hover:text-white transition-all duration-300 shadow-xl"
                    >
                        {showAll ? (
                            <>
                                {t('services.showLess')}
                                <ChevronUp className="w-5 h-5 transition-transform group-hover:translate-y-[-2px]" />
                            </>
                        ) : (
                            <>
                                {t('services.showMore')}
                                <ChevronDown className="w-5 h-5 transition-transform group-hover:translate-y-[2px]" />
                            </>
                        )}
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default Services;
