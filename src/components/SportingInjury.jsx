import React, { useEffect } from 'react';
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
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "//www.instagram.com/embed.js";
        script.async = true;
        document.body.appendChild(script);

        if (window.instgrm) {
            window.instgrm.Embeds.process();
        }

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    const solutions = [
        "Hip labral tear",
        "Hip Impingement",
        "Anterior Cruciate Ligament Injury",
        "Meniscal Tears",
        "Patellofemoral Instability"
    ];

    return (
        <section className="relative py-20 md:py-32 overflow-hidden bg-white">
            <MedicalRadar />

            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[140px]"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-cyan-50/30 rounded-full blur-[120px]"></div>
            </div>

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
                        Elite Athlete Recovery
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] md:leading-[0.95] tracking-tight md:tracking-tighter mb-6 md:mb-8"
                    >
                        Suffering From A <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Sporting Injury</span>?
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium mx-auto max-w-2xl"
                    >
                        Experience world-class orthopedic care tailored for professional recovery. We bridge the gap between initial trauma and peak performance.
                    </motion.p>
                </div>

                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-16 lg:gap-24">

                    {/* LEFT: Instagram Dashboard */}
                    <div className="w-full lg:w-[45%] flex justify-center order-2 lg:order-1">
                        <CardContainer containerClassName="py-0">
                            <CardBody className="relative bg-white/40 border border-white/60 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] rounded-[2.5rem] p-6 backdrop-blur-3xl w-[320px] md:w-[420px]">
                                <CardItem translateZ={40} className="w-full flex justify-between items-center mb-6">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                                    </div>
                                    <div className="text-[10px] font-black tracking-widest text-[#3a7e7a]">HIGH-PERFORMANCE ANALYSIS</div>
                                </CardItem>

                                <CardItem translateZ={80} className="w-full relative overflow-hidden rounded-2xl bg-slate-900 aspect-[9/13.5] border border-white/20">
                                    <iframe
                                        src="https://www.instagram.com/reel/DTijxQ3krcw/embed/"
                                        className="w-full h-full border-0 rounded-2xl"
                                        scrolling="no"
                                        allowtransparency="true"
                                        frameBorder="0"
                                    ></iframe>
                                    <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-black/20 to-transparent pointer-events-none"></div>
                                </CardItem>

                                <CardItem translateZ={60} className="mt-8 grid grid-cols-2 gap-4">
                                    <div className="bg-white/60 p-3 rounded-xl border border-white/40">
                                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Success Rate</p>
                                        <p className="text-lg font-black text-emerald-600">98.4%</p>
                                    </div>
                                    <div className="bg-white/60 p-3 rounded-xl border border-white/40">
                                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Patient State</p>
                                        <p className="text-lg font-black text-blue-600">Stable</p>
                                    </div>
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
                            className="bg-slate-50/50 p-8 md:p-12 rounded-[2.5rem] border border-slate-100 backdrop-blur-sm shadow-xl"
                        >
                            <h3 className="text-xl font-black text-slate-800 mb-8 uppercase tracking-tight italic text-left">Learn about possible solutions:</h3>

                            <div className="space-y-6 mb-12 text-left">
                                {solutions.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-center gap-4 group"
                                    >
                                        <div className="flex-shrink-0 w-6 h-6 rounded-md bg-[#3a7e7a]/10 flex items-center justify-center border border-[#3a7e7a]/20 group-hover:bg-[#3a7e7a] group-hover:text-white transition-all">
                                            <svg className="w-4 h-4 text-[#3a7e7a] group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="font-bold text-slate-700 text-lg md:text-xl tracking-tight leading-none">{item}</span>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="flex justify-start">
                                <RouterLink
                                    to="/contact"
                                    className="group relative inline-flex px-12 py-5 bg-[#ff6b35] text-white font-black text-lg uppercase tracking-widest rounded-2xl shadow-[0_20px_40px_-10px_rgba(255,107,53,0.4)] overflow-hidden items-center justify-center gap-3 active:scale-95 hover:scale-[1.02] transition-all"
                                >
                                    <span className="relative z-10">BOOK A CONSULTATION</span>
                                    <ArrowRight className="relative z-10 w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                </RouterLink>
                            </div>

                            <div className="mt-12 pt-8 border-t border-slate-200/60 flex items-center gap-4">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200" />
                                    ))}
                                </div>
                                <div className="text-left">
                                    <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />)}
                                    </div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mt-1">Highly Rated Ortho Surgeon</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SportingInjury;
