import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Target, ShieldAlert, ArrowRight, Zap } from 'lucide-react';

const SportingInjury = () => {
    useEffect(() => {
        // Load Instagram embed script
        const script = document.createElement('script');
        script.src = "//www.instagram.com/embed.js";
        script.async = true;
        document.body.appendChild(script);

        // Process embed if script is already loaded
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
        { title: "ACL Injury", icon: <ShieldAlert className="w-5 h-5" />, color: "bg-blue-50 text-blue-600" },
        { title: "Meniscus Injury", icon: <Target className="w-5 h-5" />, color: "bg-emerald-50 text-emerald-600" },
        { title: "Cartilage Injury", icon: <Activity className="w-5 h-5" />, color: "bg-orange-50 text-orange-600" },
        { title: "Knee Instability", icon: <Zap className="w-5 h-5" />, color: "bg-purple-50 text-purple-600" },
        { title: "Ligament Injuries", icon: <ShieldAlert className="w-5 h-5" />, color: "bg-pink-50 text-pink-600" },
        { title: "Sports Injuries/Rehab & Recovery", icon: <Activity className="w-5 h-5" />, color: "bg-amber-50 text-amber-600" },
        { title: "Shoulder Impingement", icon: <Target className="w-5 h-5" />, color: "bg-indigo-50 text-indigo-600" },
        { title: "Rotator Cuff Tear", icon: <Zap className="w-5 h-5" />, color: "bg-rose-50 text-rose-600" }
    ];

    return (
        <section className="relative py-28 overflow-hidden bg-white">
            {/* Liquid Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#3a7e7a]/5 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-orange-50/50 rounded-full blur-[100px]"></div>
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-1 bg-gradient-to-r from-transparent via-gray-100 to-transparent rotate-12"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-16 xl:gap-28">

                    {/* Left Side: Custom Video Card Layout */}
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                        className="w-full lg:w-[540px] xl:w-[600px]"
                    >
                        <div className="relative group overflow-hidden rounded-[2rem] shadow-2xl border border-white/20 bg-black aspect-[16/9]">
                            {/* Background Image */}
                            <img
                                src="/assets/video-placeholder.png"
                                alt="Knee Injury Treatment"
                                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                            />

                            {/* Center Overlay Text & Play Button */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                                {/* Large Text Overlay */}
                                <div className="mb-4">
                                    <h3 className="text-white text-4xl md:text-5xl font-black tracking-tighter uppercase drop-shadow-2xl">
                                        KNEE<br />
                                        <span className="text-5xl md:text-6xl">INJURIES</span>
                                    </h3>
                                    {/* Blue Horizontal Bar */}
                                    <div className="w-full h-1.5 bg-[#3a7e7a] mt-4 rounded-full shadow-lg"></div>
                                </div>

                                {/* Center Play Button */}
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center cursor-pointer group-hover:bg-white/30 transition-all duration-300 shadow-2xl mt-4"
                                >
                                    <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center pl-1 shadow-inner">
                                        <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-[#3a7e7a] border-b-[12px] border-b-transparent ml-1"></div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Bottom Control Bar (Simulated) */}
                            <div className="absolute bottom-0 left-0 right-0 h-16 bg-black/90 backdrop-blur-lg flex items-center px-6 gap-6 text-white/90">
                                {/* Play Icon */}
                                <div className="p-1 cursor-pointer hover:text-white transition-colors">
                                    <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent"></div>
                                </div>

                                {/* Time Display */}
                                <div className="text-[13px] font-mono tracking-tighter flex items-center gap-1.5">
                                    <span>00:00</span>
                                    <span className="text-white/40">/</span>
                                    <span>03:36</span>
                                </div>

                                {/* Progress Bar */}
                                <div className="flex-1 relative h-1.5 bg-white/20 rounded-full group/progress cursor-pointer">
                                    <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-[#3a7e7a] rounded-full"></div>
                                    {/* Progress Handle */}
                                    <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg scale-0 group-hover/progress:scale-100 transition-transform"></div>
                                </div>

                                {/* Volume Icon */}
                                <div className="cursor-pointer hover:text-white transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>
                                </div>

                                {/* Fullscreen Icon */}
                                <div className="cursor-pointer hover:text-white transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"></path><path d="M9 21H3v-6"></path><path d="M21 3l-7 7"></path><path d="M3 21l7-7"></path></svg>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side: High-Impact Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
                        className="flex-1 lg:pt-10"
                    >
                        <div className="relative mb-12">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: '4rem' }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="h-1.5 bg-[#3a7e7a] rounded-full mb-8"
                            ></motion.div>

                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-montserrat text-[#222] font-black leading-[1.1] mb-8">
                                Suffering A <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3a7e7a] via-[#4d9793] to-[#204a47]">Sporting Injury</span>?
                            </h2>
                            <p className="text-gray-500 text-lg md:text-xl font-medium max-w-xl leading-relaxed">
                                Experience world-class orthopaedic care tailored for high-performance recovery. We bridge the gap between injury and peak performance.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
                            {solutions.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                                    className="group flex items-center gap-4 p-4 rounded-2xl bg-gray-50/50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-xl transition-all duration-500"
                                >
                                    <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-sm`}>
                                        {item.icon}
                                    </div>
                                    <span className="text-[#333] font-bold text-sm tracking-tight">{item.title}</span>
                                </motion.div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-8">
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: '0 25px 50px -12px rgba(255, 123, 66, 0.4)' }}
                                whileTap={{ scale: 0.95 }}
                                className="group relative w-full sm:w-auto px-12 py-5 bg-gradient-to-br from-[#ff7b42] to-[#f97316] text-white font-black text-sm uppercase tracking-[0.2em] rounded-2xl shadow-2xl overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-3">
                                    Get Appointment Now
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default SportingInjury;
