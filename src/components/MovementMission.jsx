import React from 'react';
import { motion } from 'framer-motion';
import { Target, Heart, Shield, Activity, ArrowRight, Sparkles } from 'lucide-react';
import missionImg from '../assets/doctor-surgery.webp';

const MovementMission = () => {
    const highlights = [
        {
            icon: Target,
            title: "Patient-Centered Care",
            desc: "Every treatment plan is tailored to your unique lifestyle, goals, and mobility needs."
        },
        {
            icon: Shield,
            title: "Evidence-Based Surgery",
            desc: "Utilizing proven UK & European clinical standards to deliver predictable, high-quality outcomes."
        },
        {
            icon: Heart,
            title: "Complete Recovery Support",
            desc: "Guiding you from initial diagnosis through rehabilitation until full active recovery."
        }
    ];

    return (
        <section id="movement-mission" className="py-20 md:py-28 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden">
            {/* Background Accent Gradients */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-1/2 left-[-10%] w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[140px]" />
                <div className="absolute bottom-0 right-[-10%] w-[450px] h-[450px] bg-sky-400/10 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    
                    {/* Left Column: Heading & Content */}
                    <div className="lg:col-span-7 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-[11px] font-black uppercase tracking-[0.2em] shadow-sm mb-6">
                                <Sparkles className="w-3.5 h-3.5 text-primary-600 animate-pulse" />
                                Our Core Philosophy
                            </div>

                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-6">
                                Your Movement. <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-sky-600 to-primary-700">
                                    Our Mission.
                                </span>
                            </h2>

                            <p className="text-base sm:text-lg md:text-xl text-gray-600 font-normal leading-relaxed text-justify sm:text-left">
                                We believe that pain-free movement is fundamental to a fulfilling life. Our commitment is to restore your freedom of movement through advanced orthopedic techniques, patient-first care, and dedicated long-term recovery support.
                            </p>
                        </motion.div>

                        {/* Feature Highlights Grid */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4"
                        >
                            {highlights.map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                    <div 
                                        key={idx}
                                        className="bg-white border border-gray-100/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-4">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <h3 className="font-bold text-gray-900 text-base mb-2">{item.title}</h3>
                                        <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                                    </div>
                                );
                            })}
                        </motion.div>
                    </div>

                    {/* Right Column: Visual Card */}
                    <div className="lg:col-span-5">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="relative"
                        >
                            {/* Decorative Frame */}
                            <div className="absolute -top-4 -left-4 w-full h-full rounded-[2.5rem] bg-gradient-to-tr from-primary-500/20 to-sky-500/20 blur-xl pointer-events-none" />
                            
                            <div className="relative rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-2xl bg-white group">
                                <img 
                                    src={missionImg} 
                                    alt="Your Movement Our Mission - Dr. Ulhas Sonar"
                                    className="w-full h-[400px] md:h-[480px] object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/20 to-transparent flex flex-col justify-end p-8 text-white">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 rounded-full bg-primary-500/80 backdrop-blur-md flex items-center justify-center">
                                            <Activity className="w-4 h-4 text-white animate-pulse" />
                                        </div>
                                        <span className="text-xs font-bold uppercase tracking-widest text-primary-200">Restoring Mobility</span>
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold mb-2">Empower Your Active Lifestyle</h3>
                                    <p className="text-xs md:text-sm text-gray-300 font-light">Customized care pathways designed to help you live, play, and move without limits.</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default MovementMission;
