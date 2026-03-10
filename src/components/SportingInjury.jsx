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
        { title: "ACL Injury", icon: <ShieldAlert className="w-5 h-5" />, color: "bg-blue-600 shadow-blue-200" },
        { title: "Meniscus Injury", icon: <Target className="w-5 h-5" />, color: "bg-emerald-600 shadow-emerald-200" },
        { title: "Cartilage Injury", icon: <Activity className="w-5 h-5" />, color: "bg-orange-600 shadow-orange-200" },
        { title: "Knee Instability", icon: <Zap className="w-5 h-5" />, color: "bg-purple-600 shadow-purple-200" },
        { title: "Ligament Injuries", icon: <ShieldAlert className="w-5 h-5" />, color: "bg-pink-600 shadow-pink-200" },
        { title: "Sports Rehab", icon: <Activity className="w-5 h-5" />, color: "bg-amber-600 shadow-amber-200" },
        { title: "Shoulder Impingement", icon: <Target className="w-5 h-5" />, color: "bg-indigo-600 shadow-indigo-200" },
        { title: "Rotator Cuff Tear", icon: <Zap className="w-5 h-5" />, color: "bg-rose-600 shadow-rose-200" }
    ];

    return (
        <section className="relative py-32 overflow-hidden bg-white">
            <MedicalRadar />

            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[140px]"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-cyan-50/30 rounded-full blur-[120px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    {/* LEFT: Instagram Dashboard */}
                    <div className="w-full lg:w-1/2 flex justify-center">
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

                    {/* RIGHT: Content & Grid */}
                    <div className="w-full lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#3a7e7a] text-[10px] font-black tracking-widest uppercase mb-6">
                                <Zap className="w-3 h-3 animate-pulse" />
                                Elite Athlete Recovery
                            </div>

                            <h2 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[0.95] tracking-tighter mb-8">
                                Suffering From A <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Sporting Injury</span>?
                            </h2>

                            <p className="text-lg text-slate-600 leading-relaxed mb-12 max-w-xl font-medium">
                                Experience world-class orthopedic care tailored for professional recovery. We bridge the gap between initial trauma and peak performance.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
                                {solutions.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        whileHover={{ y: -5, scale: 1.02 }}
                                        className="group flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 cursor-default"
                                    >
                                        <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center text-white shadow-lg transition-transform group-hover:rotate-12`}>
                                            {item.icon}
                                        </div>
                                        <span className="font-bold text-slate-800 text-sm tracking-tight">{item.title}</span>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-8">
                                <RouterLink
                                    to="/contact"
                                    className="group relative w-full sm:w-auto px-10 py-5 bg-blue-600 text-white font-black text-sm uppercase tracking-widest rounded-2xl shadow-2xl shadow-blue-500/30 overflow-hidden flex items-center justify-center gap-3 active:scale-95 transition-all"
                                >
                                    <span className="relative z-10 flex items-center gap-3">
                                        Book Consultation
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                </RouterLink>

                                <div className="flex items-center gap-4">
                                    <div className="flex -space-x-3">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200" />
                                        ))}
                                    </div>
                                    <div className="text-left">
                                        <div className="flex items-center gap-1">
                                            {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />)}
                                        </div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">DR. RATED 5/5 Stars</p>
                                    </div>
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
