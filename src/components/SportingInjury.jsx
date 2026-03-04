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
        { title: "Hip Labral Tear", icon: <Target className="w-5 h-5" />, color: "bg-blue-50 text-blue-600" },
        { title: "Hip Impingement", icon: <Activity className="w-5 h-5" />, color: "bg-emerald-50 text-emerald-600" },
        { title: "ACL Injury", icon: <ShieldAlert className="w-5 h-5" />, color: "bg-orange-50 text-orange-600" },
        { title: "Meniscal Tears", icon: <Target className="w-5 h-5" />, color: "bg-purple-50 text-purple-600" },
        { title: "Knee Instablity", icon: <Activity className="w-5 h-5" />, color: "bg-pink-50 text-pink-600" },
        { title: "Sports Rehab", icon: <Zap className="w-5 h-5" />, color: "bg-amber-50 text-amber-600" }
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

                    {/* Left Side: Premium Instagram Frame */}
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                        className="w-full lg:w-[480px] xl:w-[540px]"
                    >
                        <motion.div
                            animate={{
                                y: [0, -12, 0],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="group relative"
                        >
                            {/* High-Impact Decorative Glow */}
                            <div className="absolute -inset-2 bg-gradient-to-r from-[#3a7e7a]/40 to-orange-400/40 rounded-3xl blur-3xl opacity-20 group-hover:opacity-50 transition duration-1000 group-hover:duration-500"></div>

                            <div className="relative p-3 bg-white/90 backdrop-blur-2xl rounded-3xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.18)] border border-white/60 overflow-hidden">
                                {/* Top Bar decoration */}
                                <div className="flex items-center gap-2 mb-4 px-3">
                                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                                    <div className="ml-auto flex items-center gap-2">
                                        <span className="text-[10px] font-black text-gray-500 tracking-widest uppercase">RECOVERY STREAM</span>
                                        <div className="w-2 h-2 rounded-full bg-red-500 animate-ping"></div>
                                    </div>
                                </div>

                                <div className="rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 flex justify-center items-center py-4">
                                    <iframe
                                        src="https://www.instagram.com/reel/DTijxQ3krcw/embed/"
                                        className="w-full max-w-[400px] aspect-[9/14] border-0"
                                        scrolling="no"
                                        allowtransparency="true"
                                        frameBorder="0"
                                    ></iframe>
                                </div>
                            </div>
                        </motion.div>
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
