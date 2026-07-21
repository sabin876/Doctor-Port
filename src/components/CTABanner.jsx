import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../lib/api';

const CTABanner = ({ title, subtitle, buttonText, buttonLink }) => {
    const { t } = useLanguage();
    const [siteSettings, setSiteSettings] = useState(null);

    useEffect(() => {
        if (!title || !subtitle || !buttonText || !buttonLink) {
            api.getSiteSettings()
                .then(data => setSiteSettings(data))
                .catch(err => console.error("Error loading CTA site settings:", err));
        }
    }, [title, subtitle, buttonText, buttonLink]);

    const displayTitle = title || siteSettings?.cta_title || t('ctaBanner.title') || "Struggling with Joint or Back Pain?";
    const displaySubtitle = subtitle || siteSettings?.cta_subtitle || t('ctaBanner.subtitle') || "Get expert orthopedic care today.";
    const displayButtonText = buttonText || siteSettings?.cta_button_text || t('ctaBanner.button') || "Book Appointment Now";
    const displayButtonLink = buttonLink || siteSettings?.cta_button_link || "/contact";

    return (
        <section className="relative overflow-hidden py-0">
            <div className="w-full">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative rounded-none overflow-hidden bg-gradient-to-r from-primary-700 via-primary-500 to-emerald-500 py-8 px-6 md:py-10 md:px-14 shadow-[0_20px_50px_-15px_rgba(2,132,199,0.3)]"
                >
                    {/* Background decorative elements */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-40 -mt-40 blur-[100px] pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-400/10 rounded-full -ml-32 -mb-32 blur-[80px] pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left">
                        <div className="max-w-2xl">
                            <h2 className="text-xl md:text-2xl lg:text-3xl font-montserrat font-bold text-white mb-4 tracking-tight leading-tight">
                                {displayTitle}
                            </h2>
                            <p className="text-white/90 text-lg md:text-xl font-medium tracking-wide">
                                {displaySubtitle}
                            </p>
                        </div>
                        
                        <div className="flex-shrink-0">
                            <RouterLink
                                to={displayButtonLink}
                                className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#0369a1] rounded-2xl font-black text-sm md:text-base tracking-wide shadow-[0_15px_30px_-10px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)] hover:scale-[1.03] active:scale-[0.97] transition-all border border-white/50"
                            >
                                <Calendar className="w-6 h-6 transition-transform group-hover:rotate-12" />
                                <span>{displayButtonText}</span>
                                
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
