import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, ArrowRight, Sparkles, Quote, Calendar } from 'lucide-react';
import missionImg from '../assets/doctor-surgery.webp';

const MovementMission = () => {
    const whatsappLink = "https://wa.link/wriek2";

    const features = [
        {
            icon: Activity,
            title: "Holistic Joint Health Approach",
            desc: "Focused on restoring function, easing discomfort, and enhancing daily living through evidence-led interventions."
        },
        {
            icon: ShieldCheck,
            title: "Precision-led Procedures & Personalized Care",
            desc: "Leveraging advanced techniques for better outcomes with fewer disruptions to your routine."
        }
    ];

    return (
        <section id="movement-mission" className="py-20 md:py-28 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden">
            {/* Background Ambient Glows */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-1/3 left-[-10%] w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[140px]" />
                <div className="absolute bottom-0 right-[-10%] w-[450px] h-[450px] bg-sky-400/10 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    
                    {/* Left Column: Heading, Quote, Features & CTA */}
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
                        </motion.div>

                        {/* Doctor's Quote Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.15 }}
                            className="relative bg-gradient-to-br from-primary-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl overflow-hidden border border-primary-800/40"
                        >
                            <Quote className="absolute top-4 right-4 w-20 h-20 text-white/5 pointer-events-none" />
                            
                            <blockquote className="relative z-10 text-base sm:text-lg md:text-xl font-medium italic leading-relaxed text-primary-50 mb-4">
                                “Every joint tells a story. My role is to restore its rhythm, mobility, and confidence — with precision and care.”
                            </blockquote>

                            <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                                <div className="w-10 h-10 rounded-full bg-primary-500/30 border border-primary-400/40 flex items-center justify-center font-bold text-white text-sm">
                                    DS
                                </div>
                                <div>
                                    <div className="font-bold text-white text-sm md:text-base">Dr. Ulhas Sonar</div>
                                    <div className="text-xs text-primary-200">Consultant Orthopedic Surgeon</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* 2 Feature Cards */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.25 }}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2"
                        >
                            {features.map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                    <div 
                                        key={idx}
                                        className="bg-white border border-gray-100/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                                    >
                                        <div>
                                            <div className="w-11 h-11 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-4">
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-2 leading-snug">{item.title}</h3>
                                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </motion.div>

                        {/* CTA Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.35 }}
                            className="pt-4"
                        >
                            <a
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm md:text-base rounded-2xl shadow-lg shadow-primary-600/25 hover:shadow-xl hover:shadow-primary-600/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group"
                            >
                                <Calendar className="w-5 h-5 text-primary-100" />
                                <span>Schedule a Consultation</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </motion.div>

                    </div>

                    {/* Right Column: Doctor Feature Media */}
                    <div className="lg:col-span-5">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="relative"
                        >
                            {/* Ambient Frame Blur */}
                            <div className="absolute -top-4 -left-4 w-full h-full rounded-[2.5rem] bg-gradient-to-tr from-primary-500/20 to-sky-500/20 blur-xl pointer-events-none" />
                            
                            <div className="relative rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-2xl bg-white group">
                                <img 
                                    src={missionImg} 
                                    alt="Your Movement Our Mission - Dr. Ulhas Sonar"
                                    className="w-full h-[440px] md:h-[520px] object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/85 via-gray-950/25 to-transparent flex flex-col justify-end p-8 text-white">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 rounded-full bg-primary-500/80 backdrop-blur-md flex items-center justify-center">
                                            <Activity className="w-4 h-4 text-white animate-pulse" />
                                        </div>
                                        <span className="text-xs font-bold uppercase tracking-widest text-primary-200">Restoring Rhythm & Mobility</span>
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold mb-2">Precision & Personalized Care</h3>
                                    <p className="text-xs md:text-sm text-gray-300 font-light">Evidence-led orthopedic interventions tailored for long-term functional recovery.</p>
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
