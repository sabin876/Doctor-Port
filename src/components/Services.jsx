import React, { useState, useEffect } from 'react';
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
import { api } from '../lib/api';
import { useLanguage } from '../context/LanguageContext';

const iconMap = {
    'joint-pain-treatment': Bone,
    'sports-medicine': Activity,
    'robotic-surgery': Cpu,
    'arthroscopy': Scan,
    'deformity-correction': Layers,
    'consultation': Stethoscope,
    'orthopedic-trauma': Bandage,
    'physiotherapy-home-services': HeartPulse
};

const stripHtml = (html) => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '');
};

const Services = () => {
    const { t } = useLanguage();
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        api.getServices()
            .then(data => {
                setServices(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch services:", err);
                setLoading(false);
            });
    }, []);

    const displayedServices = showAll ? services : services.slice(0, 4);

    return (
        <section id="services" className="py-24 bg-white relative overflow-hidden">
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

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        <AnimatePresence>
                            {displayedServices.map((service, index) => {
                                const IconComp = iconMap[service.slug] || Activity;
                                return (
                                    <motion.div
                                        key={service.slug}
                                        className="group relative h-[450px] rounded-[2.5rem] overflow-hidden flex flex-col justify-end border border-gray-200 shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-gray-50"
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -30 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                    >
                                        <div 
                                            className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110 z-0"
                                            style={{ backgroundImage: `url(${service.image || 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=60'})` }}
                                            aria-hidden="true"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent z-10 transition-opacity duration-500 group-hover:via-black/35" />
                                        <div className="absolute inset-0 rounded-[2.5rem] border-2 border-white/5 group-hover:border-primary-500/30 transition-colors duration-500 pointer-events-none z-20" />
                                        <div className="absolute top-6 right-6 w-14 h-14 rounded-full backdrop-blur-md bg-white/10 border border-white/20 flex items-center justify-center text-white z-30 group-hover:bg-primary-600 transition-colors duration-500 shadow-lg">
                                            <IconComp className="w-6 h-6" />
                                        </div>
                                        <div className="relative z-30 p-8 flex flex-col justify-end">
                                            <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                                                <h3 className="text-xl md:text-2xl font-montserrat font-semibold text-white mb-3 leading-tight drop-shadow-md">
                                                    {service.title}
                                                </h3>
                                                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-in-out">
                                                    <div className="overflow-hidden">
                                                        <p className="text-gray-200 text-sm leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                                            {stripHtml(service.description)}
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
                                );
                            })}
                        </AnimatePresence>
                    </div>
                )}

                <div className="flex justify-center mt-20">
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
                </div>
            </div>
        </section>
    );
};

export default Services;
