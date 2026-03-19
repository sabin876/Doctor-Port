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
    ArrowRight,
    Hand,
    Footprints
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
            image: null,
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
            image: null,
            gradient: "from-blue-700/10 to-transparent",
            accent: "blue"
        },
        {
            title: t('services.items.5.title'),
            desc: t('services.items.5.desc'),
            icon: Stethoscope,
            image: null,
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
                                className="group relative h-full bg-white rounded-[2rem] p-8 shadow-sm hover:border-primary-100 border border-gray-100 hover:shadow-xl transition-all duration-500 flex flex-col items-center text-center"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                            >
                                {/* Media Section (Image or Icon) */}
                                {service.image ? (
                                    <div className="mb-8 h-48 w-full overflow-hidden rounded-2xl relative">
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-primary-900/5 group-hover:bg-transparent transition-colors duration-500" />
                                    </div>
                                ) : (
                                    <div className="mb-8 relative">
                                        <div className="p-6 rounded-3xl bg-primary-50 text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-all duration-500 shadow-sm">
                                            <service.icon size={40} strokeWidth={1.5} />
                                        </div>
                                        {/* Subtle decoration for icons */}
                                        <div className="absolute -inset-2 bg-primary-100/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </div>
                                )}

                                <div className="flex flex-col flex-grow items-center">
                                    <h3 className="text-xl font-montserrat font-extrabold text-gray-900 mb-4 tracking-tight leading-tight group-hover:text-primary-600 transition-colors">
                                        {service.title}
                                    </h3>

                                    <p className="text-gray-500 text-sm font-normal leading-relaxed mb-10 flex-grow line-clamp-3 group-hover:text-gray-600 transition-colors">
                                        {service.desc}
                                    </p>

                                    <div className="pt-6 border-t border-gray-50 w-full mt-auto">
                                        <Link
                                            to={`/services/${index}`}
                                            className="inline-flex items-center text-[13px] font-black uppercase tracking-wider text-primary-600 group/btn transition-all hover:gap-3"
                                        >
                                            {t('services.viewDetails')}
                                            <ArrowRight size={16} className="ms-2 transition-transform group-hover/btn:translate-x-1" />
                                        </Link>
                                    </div>
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
