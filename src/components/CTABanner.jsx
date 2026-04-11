import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const CTABanner = () => {
    const { t } = useLanguage();

    return (
        <section className="relative overflow-hidden py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-gradient-to-r from-primary-700 via-primary-500 to-emerald-500 p-8 md:p-14 shadow-[0_20px_50px_-15px_rgba(2,132,199,0.3)]"
                >
                    {/* Background decorative elements */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-40 -mt-40 blur-[100px] pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-400/10 rounded-full -ml-32 -mb-32 blur-[80px] pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left">
                        <div className="max-w-2xl">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-bold text-white mb-4 tracking-tight leading-tight">
                                {t('ctaBanner.title')}
                            </h2>
                            <p className="text-white/90 text-lg md:text-xl font-medium tracking-wide">
                                {t('ctaBanner.subtitle')}
                            </p>
                        </div>
                        
                        <div className="flex-shrink-0">
                            <RouterLink
                                to="/contact"
                                className="group relative flex items-center justify-center gap-3 px-8 py-5 bg-white text-[#0369a1] rounded-2xl font-black text-base md:text-lg tracking-wide shadow-[0_15px_30px_-10px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)] hover:scale-[1.03] active:scale-[0.97] transition-all border border-white/50"
                            >
                                <Calendar className="w-6 h-6 transition-transform group-hover:rotate-12" />
                                <span>{t('ctaBanner.button')}</span>
                                
                                {/* Subtle white shine animation */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            </RouterLink>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CTABanner;
