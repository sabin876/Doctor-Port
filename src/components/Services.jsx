import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link as RouterLink, useLocation } from 'react-router-dom';
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
import { getTranslatedService } from '../lib/serviceTranslations';


const iconMap = {
    'joint-pain-treatment': Bone,
    'sports-medicine': Activity,
    'robotic-surgery': Cpu,
    'arthroscopy': Scan,
    'deformity-correction': Layers,
    'consultation': Stethoscope,
    'orthopedic-trauma': Bandage,
    'physiotherapy': HeartPulse,
    'physiotherapy-home-services': HeartPulse
};

const stripHtml = (html) => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '');
};

const Services = ({ isHomePage = false }) => {
    const { t, language } = useLanguage();
    const location = useLocation();
    const isHome = isHomePage || location.pathname === '/';

    const [services, setServices] = useState(() => {
        if (typeof window !== 'undefined' && window.__INITIAL_SERVICES__) {
            return window.__INITIAL_SERVICES__;
        }
        return [];
    });
    const [loading, setLoading] = useState(() => {
        if (typeof window !== 'undefined' && window.__INITIAL_SERVICES__) {
            return false;
        }
        return true;
    });
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        if (services.length > 0) {
            return;
        }
        api.getServices()
            .then(data => {
                setServices(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch services:", err);
                setLoading(false);
            });
    }, [services]);

    const displayedServices = (showAll || !isHome ? services : services.slice(0, 4)).map(s => 
        getTranslatedService(s, t, language)
    );

    return (
        <section id="services" className="py-24 bg-white relative overflow-hidden">
            <div className="absolute top-0 start-0 w-full h-full overflow-hidden z-0 opacity-5 pointer-events-none">
                <div className="absolute top-[-5%] left-[-5%] w-[30%] h-[30%] bg-primary-600/10 blur-[80px] rounded-full"></div>
                <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-primary-600/10 blur-[80px] rounded-full"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-4xl font-montserrat font-bold text-gray-900 mb-6 tracking-tight">
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
                                        className="group relative h-[380px] sm:h-[420px] lg:h-[450px] rounded-[2.5rem] overflow-hidden flex flex-col justify-end border border-gray-200 shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-gray-50"
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
                                        <div className="absolute top-5 right-5 sm:top-6 sm:right-6 w-12 h-12 sm:w-14 sm:h-14 rounded-full backdrop-blur-md bg-white/10 border border-white/20 flex items-center justify-center text-white z-30 group-hover:bg-primary-600 transition-colors duration-500 shadow-lg">
                                            <IconComp className="w-5 h-5 sm:w-6 sm:h-6" />
                                        </div>
                                        <div className="relative z-30 p-6 sm:p-8 flex flex-col justify-end">
                                            <div>
                                                <h3 className="text-lg md:text-xl font-montserrat font-semibold text-white mb-4 leading-tight drop-shadow-md">
                                                    {service.title}
                                                </h3>
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

                <div className="flex justify-center mt-16 md:mt-20">
                    {isHome ? (
                        <RouterLink
                            to="/services"
                            className="group flex items-center gap-3 px-10 py-5 bg-white border-2 border-primary-600 text-primary-600 rounded-[2rem] font-semibold text-sm uppercase tracking-[0.2em] hover:bg-primary-600 hover:text-white transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
                        >
                            <span>{t('services.showMore') || "More Services"}</span>
                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </RouterLink>
                    ) : (
                        services.length > 4 && (
                            <motion.button
                                onClick={() => setShowAll(!showAll)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="group flex items-center gap-3 px-10 py-5 bg-white border-2 border-primary-600 text-primary-600 rounded-[2rem] font-semibold text-sm uppercase tracking-[0.2em] hover:bg-primary-600 hover:text-white transition-all duration-300 shadow-xl"
                            >
                                {showAll ? (
                                    <>
                                        {t('services.showLess') || "Show Less"}
                                        <ChevronUp className="w-5 h-5 transition-transform group-hover:translate-y-[-2px]" />
                                    </>
                                ) : (
                                    <>
                                        {t('services.showMore') || "More Services"}
                                        <ChevronDown className="w-5 h-5 transition-transform group-hover:translate-y-[2px]" />
                                    </>
                                )}
                            </motion.button>
                        )
                    )}
                </div>
            </div>
        </section>
    );
};

export default Services;
