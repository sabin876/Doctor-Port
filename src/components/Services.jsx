import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import {
    ArrowRight,
    ChevronDown,
    ChevronUp,
    Activity,
    Scan,
    Bone,
    Layers,
    Cpu,
    HeartPulse,
    Bandage,
    Stethoscope
} from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';

const Services = () => {
    const { t } = useLanguage();
    const [showAll, setShowAll] = useState(false);

    const services = [
        {
            title: t('services.items.0.title'),
            desc: t('services.items.0.desc'),
            icon: Bone,
            image: '/images/services/joint-replacement-bg.webp',
            slug: 'joint-pain-treatment',
            gradient: "from-blue-600/10 to-transparent",
            accent: "blue"
        },
        {
            title: t('services.items.1.title'),
            desc: t('services.items.1.desc'),
            icon: Activity,
            image: '/images/services/sports-medicine-bg.webp',
            slug: 'sports-medicine',
            gradient: "from-cyan-600/10 to-transparent",
            accent: "cyan"
        },
        {
            title: t('services.items.2.title'),
            desc: t('services.items.2.desc'),
            icon: Cpu,
            image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=60", // Robotic Surgery Look
            slug: 'robotic-surgery',
            gradient: "from-indigo-600/10 to-transparent",
            accent: "indigo"
        },
        {
            title: t('services.items.3.title'),
            desc: t('services.items.3.desc'),
            icon: Scan,
            image: '/images/services/knee-arthroscopy.webp',
            slug: 'arthroscopy',
            gradient: "from-teal-600/10 to-transparent",
            accent: "teal"
        },
        {
            title: t('services.items.4.title'),
            desc: t('services.items.4.desc'),
            icon: Layers,
            image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&auto=format&fit=crop&q=60", // Deformity Care X-ray
            slug: 'deformity-correction',
            gradient: "from-blue-700/10 to-transparent",
            accent: "blue"
        },
        {
            title: t('services.items.5.title'),
            desc: t('services.items.5.desc'),
            icon: Stethoscope,
            image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&auto=format&fit=crop&q=60", // Consultation
            slug: 'consultation',
            gradient: "from-sky-600/10 to-transparent",
            accent: "sky"
        },
        {
            title: t('services.items.6.title'),
            desc: t('services.items.6.desc'),
            icon: Bandage,
            image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=60", // Orthopedic Trauma
            slug: 'orthopedic-trauma',
            gradient: "from-emerald-600/10 to-transparent",
            accent: "emerald"
        },
        {
            title: t('services.items.7.title'),
            desc: t('services.items.7.desc'),
            icon: HeartPulse,
            image: "https://images.unsplash.com/photo-1576091160550-217359f49f4c?w=800&auto=format&fit=crop&q=60", // Physiotherapy
            slug: 'physiotherapy',
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
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-montserrat font-bold text-gray-900 mb-6 tracking-tight">
                        {t('services.title')} <span className="text-primary-600">{t('services.titleHighlight')}</span> {t('services.titleEnd')}
                    </motion.h1>
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
                                className="group relative h-[450px] rounded-[2.5rem] overflow-hidden flex flex-col justify-end bg-slate-950 border border-white/10 shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    loading="lazy"
                                    decoding="async"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-100"
                                />

                                {/* High-Contrast Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 transition-opacity duration-500 group-hover:via-black/50" />

                                {/* Card Border Glow */}
                                <div className="absolute inset-0 rounded-[2.5rem] border-2 border-white/5 group-hover:border-primary-500/30 transition-colors duration-500 pointer-events-none z-20" />

                                {/* Floating Icon */}
                                <div className="absolute top-6 right-6 w-14 h-14 rounded-full backdrop-blur-md bg-white/10 border border-white/20 flex items-center justify-center text-white z-30 group-hover:bg-primary-600 transition-colors duration-500 shadow-lg">
                                    <service.icon className="w-6 h-6" />
                                </div>

                                {/* Content Container */}
                                <div className="relative z-30 p-8 flex flex-col justify-end">
                                    <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                                        <h3 className="text-xl md:text-2xl font-montserrat font-semibold text-white mb-3 leading-tight drop-shadow-md">
                                            {service.title}
                                        </h3>

                                        {/* Description expands on hover using grid-rows */}
                                        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-in-out">
                                            <div className="overflow-hidden">
                                                <p className="text-gray-200 text-sm leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                                    {service.desc}
                                                </p>
                                            </div>
                                        </div>

                                        <RouterLink
                                            to={`/services/${service.slug}`}
                                            className="inline-flex items-center gap-3 text-white font-medium text-sm tracking-wider uppercase hover:text-primary-300 transition-colors"
                                        >
                                            {t('services.viewDetails')}
                                            <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center group-hover:bg-primary-500 transition-colors">
                                                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                                            </div>
                                        </RouterLink>
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
                        className="group flex items-center gap-3 px-10 py-5 bg-white border-2 border-primary-600 text-primary-600 rounded-[2rem] font-medium text-sm uppercase tracking-[0.2em] hover:bg-primary-600 hover:text-white transition-all duration-300 shadow-xl"
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

                {/* Personalized Solution CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 text-center"
                >
                    <RouterLink
                        to="/"
                        onClick={() => {
                            // Small delay to ensure navigation completes
                            setTimeout(() => {
                                const element = document.getElementById('personalized-solutions');
                                if (element) element.scrollIntoView({ behavior: 'smooth' });
                            }, 100);
                        }}
                        className="inline-flex items-center gap-2 text-primary-600 font-bold text-sm uppercase tracking-widest hover:text-primary-700 transition-colors group"
                    >
                        Need a more tailored approach? <span className="underline decoration-2 underline-offset-4">Get Your Personalized Solution</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </RouterLink>
                </motion.div>
            </div>
        </section>
    );
};

export default Services;
