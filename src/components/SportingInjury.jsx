import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Calendar, ArrowRight, ChevronDown } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import { CardContainer, CardBody, CardItem } from './ui/3d-card';
import { api } from '../lib/api';

const MedicalRadar = () => (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
        <svg viewBox="0 0 800 800" className="w-full h-full text-blue-500/10">
            <motion.circle
                cx="400" cy="400" r="300"
                fill="none" stroke="currentColor" strokeWidth="0.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "linear" }}
            />
            <motion.circle
                cx="400" cy="400" r="200"
                fill="none" stroke="currentColor" strokeWidth="0.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", ease: "linear", delay: 0.5 }}
            />
            <motion.line
                x1="400" y1="400" x2="400" y2="100"
                stroke="currentColor" strokeWidth="1"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                style={{ originX: "400px", originY: "400px" }}
            />
        </svg>
    </div>
);

const SportingInjury = ({ homeData }) => {
    const { t } = useLanguage();
    const [fetchedData, setFetchedData] = useState(null);
    const [openIndex, setOpenIndex] = useState(0);

    useEffect(() => {
        if (!homeData) {
            let isMounted = true;
            api.getHomePage()
                .then(data => {
                    if (isMounted && data) {
                        setFetchedData(data);
                    }
                })
                .catch(() => {
                    api.getSportsInjury()
                        .then(data => {
                            if (isMounted && data) {
                                setFetchedData(data);
                            }
                        })
                        .catch(err => {
                            console.error("Failed to load sports injury clinic section:", err);
                        });
                });
            return () => { isMounted = false; };
        }
    }, [homeData]);

    const activeData = homeData || fetchedData;

    useEffect(() => {
        const processInstagram = () => {
            if (window.instgrm && window.instgrm.Embeds) {
                window.instgrm.Embeds.process();
            }
        };

        if (window.instgrm) {
            processInstagram();
        } else {
            const script = document.createElement('script');
            script.src = "https://www.instagram.com/embed.js";
            script.async = true;
            script.onload = processInstagram;
            document.body.appendChild(script);
        }
    }, [activeData?.sports_video_embed_url, activeData?.video_embed_url]);

    if (activeData) {
        if (activeData.sports_is_active === false || activeData.is_active === false) {
            return null;
        }
    }

    const badge = activeData?.sports_badge || activeData?.badge || t('sportingInjury.badge');
    const title = activeData?.sports_title || activeData?.title || t('sportingInjury.title');
    const titleHighlight = activeData?.sports_title_highlight || activeData?.title_highlight || t('sportingInjury.titleHighlight');
    const titleEnd = activeData?.sports_title_end !== undefined ? activeData.sports_title_end : (activeData?.title_end !== undefined ? activeData.title_end : t('sportingInjury.titleEnd'));
    const description = activeData?.sports_description || activeData?.description || t('sportingInjury.description');
    const dashboardLabel = activeData?.sports_dashboard_label || activeData?.dashboard_label || t('sportingInjury.dashboard');
    const learnMoreHeading = activeData?.sports_learn_more_heading || activeData?.learn_more_heading || t('sportingInjury.learnMore');
    
    const fallbackItems = Array.isArray(t('sportingInjury.items')) ? t('sportingInjury.items') : [
        {
            title: "Comprehensive Clinical Assessment",
            desc: "Thorough joint, ligament, and kinetic chain evaluation to pinpoint exact pathology."
        },
        {
            title: "Precision Imaging Diagnostics",
            desc: "High-resolution MRI, dynamic ultrasound, and digital radiography for accurate diagnosis."
        },
        {
            title: "Customized Return-to-Play Plans",
            desc: "Tailored recovery trajectories aligned with your sport, goals, and training schedule."
        },
        {
            title: "High-Performance Rehabilitation",
            desc: "Integrated physiotherapy, biomechanical reconditioning, and future injury prevention."
        }
    ];

    const sportsItems = activeData?.sports_items || activeData?.items;
    const items = (sportsItems && Array.isArray(sportsItems) && sportsItems.length > 0)
        ? sportsItems
        : fallbackItems;

    const videoFile = activeData?.sports_video_file || activeData?.video_file;
    const videoEmbedUrl = activeData?.sports_video_embed_url || activeData?.video_embed_url || "https://www.instagram.com/reel/DTijxQ3krcw/embed/?autoplay=1";
    const ctaText = activeData?.sports_cta_text || activeData?.cta_text || "Book Sports Consultation";
    const ctaLink = activeData?.sports_cta_link || activeData?.cta_link || "/contact";

    return (
        <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-blue-50/80 via-white to-blue-50/50">
            {/* ── Background Effects (from Hero) ── */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[140px]"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-[120px]"></div>
                <div
                    className="absolute inset-0 opacity-[0.08]"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, #3b82f6 1.5px, transparent 0)',
                        backgroundSize: '40px 40px',
                    }}
                />
            </div>

            <MedicalRadar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* CENTERED HEADER */}
                <div className="text-center max-w-4xl mx-auto mb-12 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#3a7e7a] text-[10px] font-black tracking-widest uppercase mb-6"
                    >
                        <Zap className="w-3 h-3 animate-pulse" />
                        {badge}
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-montserrat font-normal text-slate-900 leading-[1.1] md:leading-[0.95] tracking-tight md:tracking-tighter mb-6 md:mb-8"
                    >
                        {title} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">{titleHighlight}</span>{titleEnd}
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium mx-auto max-w-2xl"
                    >
                        {description}
                    </motion.p>
                </div>

                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-16 lg:gap-24">

                    {/* LEFT: Video Card / Dashboard */}
                    <div className="w-full lg:w-[45%] flex justify-center order-2 lg:order-1">
                        <CardContainer containerClassName="py-0">
                            <CardBody className="relative bg-white/40 border border-white/60 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] rounded-[2.5rem] p-6 backdrop-blur-3xl w-[280px] sm:w-[320px] md:w-[420px]">
                                <CardItem translateZ={40} className="w-full flex justify-between items-center mb-6">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                                    </div>
                                    <div className="text-[10px] font-black tracking-widest text-[#3a7e7a]">{dashboardLabel}</div>
                                </CardItem>

                                <CardItem translateZ={80} className="w-full relative overflow-hidden rounded-2xl bg-white border border-white/20 flex justify-center">
                                    {videoFile ? (
                                        <video
                                            key={videoFile}
                                            controls
                                            playsInline
                                            className="w-full h-[460px] sm:h-[500px] md:h-[540px] rounded-2xl object-cover"
                                            src={videoFile}
                                        />
                                    ) : (
                                        <iframe 
                                            src={videoEmbedUrl} 
                                            className="w-full h-[460px] sm:h-[500px] md:h-[540px] rounded-2xl border-0" 
                                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                                            allowFullScreen
                                            title="Sporting Injury Video Reel"
                                        />
                                    )}
                                </CardItem>
                            </CardBody>
                        </CardContainer>
                    </div>

                    {/* RIGHT: Expandable / Minimizable Treatment Points List & CTA */}
                    <div className="w-full lg:w-[55%] order-1 lg:order-2">
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="pt-4"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight italic text-left m-0">
                                    {learnMoreHeading}
                                </h3>
                            </div>

                            <div className="space-y-4 mb-8 text-left">
                                {items.map((item, index) => {
                                    const isExpanded = openIndex === index;
                                    return (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.08 }}
                                            className={`rounded-2xl border transition-all duration-300 p-5 cursor-pointer select-none ${
                                                isExpanded 
                                                    ? 'bg-white border-blue-200 shadow-md shadow-blue-900/5 -translate-y-0.5' 
                                                    : 'bg-white/80 hover:bg-white border-slate-100 hover:border-blue-100 shadow-sm hover:shadow-md'
                                            }`}
                                            onClick={() => setOpenIndex(isExpanded ? null : index)}
                                        >
                                            {/* Card Header with Icon, Title, and Minimize/Expand Toggle */}
                                            <div className="flex items-center justify-between gap-4">
                                                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                                                    <div className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                                                        isExpanded ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600 group-hover:bg-blue-100'
                                                    }`}>
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                    </div>
                                                    <h4 className={`font-bold text-base md:text-lg tracking-tight transition-colors truncate ${
                                                        isExpanded ? 'text-blue-600' : 'text-slate-800'
                                                    }`}>
                                                        {item.title}
                                                    </h4>
                                                </div>

                                                {/* Minimize / Expand Chevron Button */}
                                                <div className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                                                    isExpanded 
                                                        ? 'bg-blue-50 border border-blue-200 text-blue-600 rotate-180' 
                                                        : 'bg-slate-100 text-slate-500 hover:bg-blue-50 hover:text-blue-600'
                                                }`}>
                                                    <ChevronDown size={14} className="transition-transform duration-300" />
                                                </div>
                                            </div>

                                            {/* Collapsible Animated Description */}
                                            <AnimatePresence initial={false}>
                                                {isExpanded && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.28, ease: "easeInOut" }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="pt-3 text-slate-600 text-sm leading-relaxed pr-2 md:pr-4 border-t border-slate-100 mt-3 pl-11">
                                                            {item.desc}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {ctaText && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="pt-2 text-left"
                                >
                                    <RouterLink
                                        to={ctaLink}
                                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-montserrat font-black text-xs tracking-wider uppercase bg-blue-600 hover:bg-blue-700 text-white shadow-[0_15px_30px_-8px_rgba(37,99,235,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all"
                                    >
                                        <Calendar className="w-4 h-4" />
                                        {ctaText}
                                        <ArrowRight className="w-4 h-4 ml-1" />
                                    </RouterLink>
                                </motion.div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SportingInjury;

