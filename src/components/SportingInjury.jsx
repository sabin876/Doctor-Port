import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Activity, Target, ShieldAlert, ArrowRight, Zap, Star } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import { CardContainer, CardBody, CardItem } from './ui/3d-card';

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

const SportingInjury = () => {
    const { t } = useLanguage();
    useEffect(() => {
        // TikTok Embed Script
        const script = document.createElement('script');
        script.src = "https://www.tiktok.com/embed.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    const medicalDashboardLabel = t('sportingInjury.dashboard');

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
                        {t('sportingInjury.badge')}
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-montserrat font-normal text-slate-900 leading-[1.1] md:leading-[0.95] tracking-tight md:tracking-tighter mb-6 md:mb-8"
                    >
                        {t('sportingInjury.title')} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">{t('sportingInjury.titleHighlight')}</span>{t('sportingInjury.titleEnd')}
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium mx-auto max-w-2xl"
                    >
                        {t('sportingInjury.description')}
                    </motion.p>
                </div>

                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-16 lg:gap-24">

                    {/* LEFT: TikTok Dashboard */}
                    <div className="w-full lg:w-[45%] flex justify-center order-2 lg:order-1">
                        <CardContainer containerClassName="py-0">
                            <CardBody className="relative bg-white/40 border border-white/60 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] rounded-[2.5rem] p-6 backdrop-blur-3xl w-[320px] md:w-[420px]">
                                <CardItem translateZ={40} className="w-full flex justify-between items-center mb-6">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                                    </div>
                                    <div className="text-[10px] font-black tracking-widest text-[#3a7e7a]">{medicalDashboardLabel}</div>
                                </CardItem>

                                <CardItem translateZ={80} className="w-full relative overflow-hidden rounded-2xl bg-white aspect-[9/13.5] border border-white/20">
                                    <blockquote 
                                        className="tiktok-embed w-full h-full" 
                                        cite="https://www.tiktok.com/@dr.ulhas.orthoped/video/7630138762676178194" 
                                        data-video-id="7630138762676178194" 
                                        style={{ maxWidth: '605px', minWidth: '325px' }}
                                    > 
                                        <section> </section> 
                                    </blockquote>
                                </CardItem>
                            </CardBody>
                        </CardContainer>
                    </div>

            {/* RIGHT: List & CTA */}
            <div className="w-full lg:w-[55%] order-1 lg:order-2">
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="pt-4"
                >
                    <h3 className="text-xl font-black text-slate-800 mb-8 uppercase tracking-tight italic text-left">
                        {t('sportingInjury.learnMore')}
                    </h3>

                    <div className="space-y-4 mb-12 text-left">
                        {t('sportingInjury.items').map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-start gap-4 group bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="flex-shrink-0 mt-1">
                                    <svg className="w-6 h-6 text-blue-600 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800 text-lg tracking-tight mb-1 group-hover:text-blue-600 transition-colors">{item.title}</h4>
                                    <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>


                </motion.div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default SportingInjury;
