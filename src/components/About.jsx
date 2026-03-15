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
        <section id="about" className="pt-32 pb-32 bg-white overflow-hidden relative">
            {/* Abstract Background Orbs */}
            <div className="absolute top-0 end-0 -me-40 -mt-40 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 start-0 -ms-40 -mb-40 w-[600px] h-[600px] bg-purple-50/50 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="lg:grid lg:grid-cols-2 lg:gap-24 items-center">
                    {/* Image Section - Enhanced Container */}
                    <motion.div
                        className="mb-20 lg:mb-0 relative"
                        initial={{ opacity: 0, x: isRtl ? 60 : -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="relative group">
                            {/* Decorative Background Frame */}
                            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-100 to-purple-100 rounded-[3.5rem] transform -rotate-3 group-hover:rotate-0 transition-transform duration-700 pointer-events-none"></div>
                            
                            <div className="relative rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-8 border-white bg-gray-50 aspect-[4/5] md:aspect-auto">
                                <img
                                    src={doctorProfileImg}
                                    alt="Dr. Ulhas Sonar"
                                    className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>

                            {/* Floating Experience Badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                                className="absolute -bottom-6 -end-6 md:bottom-12 md:-end-12 z-20 bg-white p-6 md:p-8 rounded-[2.5rem] shadow-2xl border border-gray-100 text-center min-w-[160px]"
                            >
                                <p className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-indigo-600 mb-1">15+</p>
                                <p className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-widest">{t('about.experienceBadge')}</p>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Content Section */}
                    <div className={isRtl ? 'text-right' : 'text-left'}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center space-x-2 mb-8"
                        >
                            <span className="w-12 h-[2px] bg-blue-600 rounded-full"></span>
                            <span className="text-blue-600 text-xs font-black uppercase tracking-[0.3em]">{t('about.badge')}</span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-montserrat font-extrabold text-blue-900 mb-10 leading-[1.1] tracking-tight"
                        >
                            {t('about.title')} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">{t('about.titleHighlight')}</span> {t('about.titleEnd')}
                        </motion.h2>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="space-y-6 mb-12"
                        >
                            <p className="text-xl text-gray-600 leading-relaxed font-medium">
                                {t('about.description1')}
                            </p>
                            <p className="text-lg text-gray-500 leading-relaxed">
                                {t('about.description2')}
                            </p>
                        </motion.div>

                        {/* Qualifications Grid - Redesigned */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {qualifications.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                                    className="group p-6 rounded-3xl bg-gray-50 border border-transparent hover:border-blue-100 hover:bg-white hover:shadow-xl transition-all duration-500"
                                >
                                    <div className="flex items-center gap-5">
                                        <div className={`w-14 h-14 rounded-2xl ${item.iconBg} ${item.iconColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                                            <item.icon className="w-7 h-7" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h4>
                                            <p className="text-sm text-gray-500 font-medium">{item.desc}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Statistics Row - New Feature */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mt-32 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
                >
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center group">
                            <div className={`mx-auto w-16 h-16 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-6 group-hover:translate-y-[-5px] transition-transform duration-300`}>
                                <stat.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-3xl md:text-5xl font-black text-blue-950 mb-2 tracking-tight">
                                {stat.value}
                            </h3>
                            <p className="text-sm md:text-base text-gray-500 font-bold uppercase tracking-widest">{stat.label}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default About;

