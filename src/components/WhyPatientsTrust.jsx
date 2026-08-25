import React from 'react';
import { motion } from 'framer-motion';
import { Award, Cpu, Zap, HeartHandshake, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const trustPoints = [
    {
        id: '01',
        icon: Award,
        title: 'Expert Care',
        description: '14+ years of complex orthopaedic care experience and surgical precision.',
        badge: '14+ Yrs Experience'
    },
    {
        id: '02',
        icon: Cpu,
        title: 'Advanced Technology',
        description: 'Using the latest medical technologies and techniques for optimal surgical outcomes.',
        badge: 'Robotic & Tech Led'
    },
    {
        id: '03',
        icon: Zap,
        title: 'Quick Recovery',
        description: 'Specialized minimally invasive techniques for faster healing and reduced hospital stays.',
        badge: 'Minimally Invasive'
    },
    {
        id: '04',
        icon: HeartHandshake,
        title: 'Personalized Care',
        description: 'Each treatment plan is carefully tailored to address your specific needs and conditions.',
        badge: 'Tailored Plans'
    }
];

const WhyPatientsTrust = () => {
    const { language } = useLanguage();

    return (
        <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-blue-50/80 via-white to-blue-50/50">
            {/* Background Decorative Effects (Matches HomeHero & SportingInjury) */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[140px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-[120px]" />
                <div 
                    className="absolute inset-0 opacity-[0.08]"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, #3b82f6 1.5px, transparent 0)',
                        backgroundSize: '40px 40px',
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#3a7e7a] text-[10px] font-black tracking-widest uppercase mb-4"
                    >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>PATIENT-FOCUSED EXCELLENCE</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-bold text-slate-900 tracking-tight leading-tight mb-5"
                    >
                        Why Patients Trust{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 block sm:inline">
                            Dr. Ulhas Sonar
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-slate-600 text-base md:text-lg leading-relaxed font-medium"
                    >
                        Combining global surgical experience with cutting-edge technology and a compassionate, individualized recovery approach.
                    </motion.p>
                </div>

                {/* 4 Feature Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {trustPoints.map((item, index) => {
                        const IconComponent = item.icon;
                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ y: -6 }}
                                className="group relative bg-white border border-slate-100 rounded-3xl p-7 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                            >
                                {/* Top Blue Accent Line on Hover */}
                                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                <div>
                                    {/* Icon & Card Number */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="p-3.5 rounded-2xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                                            <IconComponent className="w-6 h-6" />
                                        </div>
                                        <span className="text-2xl font-black text-slate-300 group-hover:text-blue-600/40 transition-colors font-mono">
                                            {item.id}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors tracking-tight">
                                        {item.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-slate-600 text-sm leading-relaxed mb-6 font-normal">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Bottom Badge */}
                                <div className="pt-4 border-t border-slate-100 flex items-center">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 group-hover:bg-blue-100 transition-colors">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                                        {item.badge}
                                    </span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default WhyPatientsTrust;
