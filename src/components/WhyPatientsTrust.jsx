import React from 'react';
import { motion } from 'framer-motion';
import { Award, Cpu, Zap, HeartHandshake, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const trustPoints = [
    {
        id: '01',
        icon: Award,
        title: 'Expert Care',
        description: '14+ years of complex orthopaedic care experience and surgical precision.',
        badge: '14+ Yrs Experience',
        gradient: 'from-blue-600 to-indigo-600',
        bgLight: 'bg-blue-50/70',
        textColor: 'text-blue-600',
        borderColor: 'group-hover:border-blue-500/40',
        glowColor: 'group-hover:shadow-blue-500/10'
    },
    {
        id: '02',
        icon: Cpu,
        title: 'Advanced Technology',
        description: 'Using the latest medical technologies and techniques for optimal surgical outcomes.',
        badge: 'Robotic & Tech Led',
        gradient: 'from-cyan-500 to-blue-600',
        bgLight: 'bg-cyan-50/70',
        textColor: 'text-cyan-600',
        borderColor: 'group-hover:border-cyan-500/40',
        glowColor: 'group-hover:shadow-cyan-500/10'
    },
    {
        id: '03',
        icon: Zap,
        title: 'Quick Recovery',
        description: 'Specialized minimally invasive techniques for faster healing and reduced hospital stays.',
        badge: 'Minimally Invasive',
        gradient: 'from-emerald-500 to-teal-600',
        bgLight: 'bg-emerald-50/70',
        textColor: 'text-emerald-600',
        borderColor: 'group-hover:border-emerald-500/40',
        glowColor: 'group-hover:shadow-emerald-500/10'
    },
    {
        id: '04',
        icon: HeartHandshake,
        title: 'Personalized Care',
        description: 'Each treatment plan is carefully tailored to address your specific needs and conditions.',
        badge: 'Tailored Plans',
        gradient: 'from-indigo-500 to-purple-600',
        bgLight: 'bg-indigo-50/70',
        textColor: 'text-indigo-600',
        borderColor: 'group-hover:border-indigo-500/40',
        glowColor: 'group-hover:shadow-indigo-500/10'
    }
];

const WhyPatientsTrust = () => {
    const { language } = useLanguage();

    const isRTL = language === 'AR';

    return (
        <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-white via-blue-50/40 to-slate-50">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-400/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-400/10 rounded-full blur-[120px]" />
                <div 
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, #2563eb 1.5px, transparent 0)',
                        backgroundSize: '36px 36px',
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100/80 text-blue-700 text-xs font-black tracking-wider uppercase mb-4 shadow-sm"
                    >
                        <ShieldCheck className="w-4 h-4 text-blue-600" />
                        <span>PATIENT-FOCUSED EXCELLENCE</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-5 font-poppins"
                    >
                        Why Patients Trust{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 block sm:inline">
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
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.12 }}
                                whileHover={{ y: -8 }}
                                className={`group relative bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-7 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden ${item.borderColor} ${item.glowColor}`}
                            >
                                {/* Top Gradient Line Accent on Hover */}
                                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                                <div>
                                    {/* Card Header: Icon & Number Badge */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className={`p-4 rounded-2xl bg-gradient-to-br ${item.gradient} text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300`}>
                                            <IconComponent className="w-6 h-6" />
                                        </div>
                                        <span className="text-3xl font-black text-slate-200 group-hover:text-slate-300 transition-colors font-mono">
                                            {item.id}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors tracking-tight">
                                        {item.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-slate-600 text-sm leading-relaxed font-normal mb-6">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Bottom Badge Pill */}
                                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${item.bgLight} ${item.textColor}`}>
                                        <CheckCircle2 className="w-3.5 h-3.5" />
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
