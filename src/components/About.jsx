import React from 'react';
import { motion } from 'framer-motion';
import { Award, Globe, GraduationCap, CheckCircle, Users, Activity, UserCheck, Compass } from 'lucide-react';
import doctorProfileImg from '../assets/doctor-profile.png';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
    const { language, t } = useLanguage();
    const isRtl = language === 'AR';

    const qualifications = [
        {
            icon: Globe,
            title: t('about.qualifications.global.title'),
            desc: t('about.qualifications.global.desc'),
            gradient: "from-blue-500 to-cyan-500",
            iconBg: "bg-blue-50",
            iconColor: "text-blue-600"
        },
        {
            icon: GraduationCap,
            title: t('about.qualifications.training.title'),
            desc: t('about.qualifications.training.desc'),
            gradient: "from-indigo-500 to-purple-500",
            iconBg: "bg-indigo-50",
            iconColor: "text-indigo-600"
        },
        {
            icon: Award,
            title: t('about.qualifications.fellowships.title'),
            desc: t('about.qualifications.fellowships.desc'),
            gradient: "from-purple-500 to-pink-500",
            iconBg: "bg-purple-50",
            iconColor: "text-purple-600"
        },
        {
            icon: CheckCircle,
            title: t('about.qualifications.specialisation.title'),
            desc: t('about.qualifications.specialisation.desc'),
            gradient: "from-emerald-500 to-teal-500",
            iconBg: "bg-emerald-50",
            iconColor: "text-emerald-600"
        }
    ];

    const stats = [
        {
            icon: UserCheck,
            value: t('about.stats.experience.value'),
            label: t('about.stats.experience.label'),
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            icon: Activity,
            value: t('about.stats.surgeries.value'),
            label: t('about.stats.surgeries.label'),
            color: "text-indigo-600",
            bg: "bg-indigo-50"
        },
        {
            icon: Users,
            value: t('about.stats.patients.value'),
            label: t('about.stats.patients.label'),
            color: "text-purple-600",
            bg: "bg-purple-50"
        },
        {
            icon: Compass,
            value: t('about.stats.global.value'),
            label: t('about.stats.global.label'),
            color: "text-emerald-600",
            bg: "bg-emerald-50"
        }
    ];

    return (
        <section id="about" className="pt-16 pb-20 bg-white overflow-hidden relative">
            {/* Elegant Background Elements */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-blue-50/40 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-indigo-50/40 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
                    
                    {/* Image Section - Premium Canvas Style */}
                    <div className="lg:col-span-5 relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className="relative"
                        >
                            {/* Artistic Background Plates */}
                            <div className="absolute -inset-6 bg-blue-50 rounded-[4rem] transform rotate-3 -z-10"></div>
                            <div className="absolute -inset-6 border-2 border-indigo-100 rounded-[4rem] transform -rotate-2 -z-10"></div>
                            
                            {/* Main Portrait Container */}
                            <div className="relative rounded-[3.5rem] overflow-hidden shadow-premium group bg-slate-200">
                                <img
                                    src={doctorProfileImg}
                                    alt={t('common.doctorName')}
                                    className="w-full h-full object-cover transform transition-transform duration-[2s] group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700"></div>
                                
                                {/* Inner Border Overlay */}
                                <div className="absolute inset-4 border border-white/20 rounded-[2.5rem] pointer-events-none"></div>
                            </div>

                            {/* Floating Glass Experience Badge */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                                className="absolute -bottom-8 -right-4 md:-bottom-10 md:-right-10 z-20 bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-glass border border-white/50 text-center min-w-[180px]"
                            >
                                <div className="relative">
                                    <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-indigo-700 mb-1">15+</p>
                                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_15px_rgba(52,211,153,0.5)]"></div>
                                </div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-tight">
                                    {t('about.experienceBadge')}
                                </p>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Content Section */}
                    <div className={`lg:col-span-7 ${isRtl ? 'text-right' : 'text-left'}`}>
                        {/* Credentials Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-3 mb-8"
                        >
                            <span className="w-12 h-[1px] bg-blue-600/30"></span>
                            <span className="text-blue-600 text-[11px] font-black uppercase tracking-[0.3em] opacity-90">
                                {t('about.badge').split(',').slice(0, 3).join(',')}...
                            </span>
                        </motion.div>

                        {/* Title with Custom Highlight */}
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-5xl md:text-[5.5rem] font-montserrat font-black text-slate-900 mb-10 leading-[0.95] tracking-tight"
                        >
                            {t('about.title')} <br />
                            <span className="relative inline-block mt-2">
                                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700">
                                    {t('about.titleHighlight')}
                                </span>
                                <motion.span 
                                    initial={{ width: 0 }}
                                    whileInView={{ width: '100%' }}
                                    transition={{ delay: 0.8, duration: 1 }}
                                    className="absolute bottom-4 left-0 h-[30%] bg-blue-100/60 -z-10 rounded-sm"
                                ></motion.span>
                            </span>
                            <span className="text-slate-900"> {t('about.titleEnd')}</span>
                        </motion.h2>

                        {/* Description Blocks */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="space-y-8 mb-16 max-w-2xl"
                        >
                            <p className="text-2xl md:text-3xl text-slate-700 leading-tight font-light italic border-l-4 border-blue-600/20 pl-6">
                                "{t('about.description1').split('.')[0]}."
                            </p>
                            <p className="text-lg text-slate-500 leading-relaxed font-medium">
                                {t('about.description2')}
                            </p>
                        </motion.div>

                        {/* Qualifications Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {qualifications.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                                    className="group p-5 rounded-[2rem] bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-white hover:shadow-premium transition-all duration-500"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-xl ${item.iconBg} ${item.iconColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-sm`}>
                                            <item.icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="text-base font-bold text-slate-900 mb-0.5">{item.title}</h4>
                                            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider opacity-70">{item.desc}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Statistics Plate - Modern Integration */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="mt-12 p-8 md:p-12 rounded-[3rem] bg-gradient-to-tr from-slate-50 to-white border border-slate-100 shadow-premium relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center group">
                                <div className={`mx-auto w-14 h-14 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-6 group-hover:rotate-[10deg] transition-transform duration-500`}>
                                    <stat.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-2 tracking-tighter">
                                    {stat.value}
                                </h3>
                                <p className="text-[10px] md:text-xs text-slate-400 font-black uppercase tracking-[0.2em]">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );

};

export default About;
