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
            iconBg: "bg-blue-50",
            iconColor: "text-blue-600"
        },
        {
            icon: GraduationCap,
            title: t('about.qualifications.training.title'),
            desc: t('about.qualifications.training.desc'),
            iconBg: "bg-indigo-50",
            iconColor: "text-indigo-600"
        },
        {
            icon: Award,
            title: t('about.qualifications.fellowships.title'),
            desc: t('about.qualifications.fellowships.desc'),
            iconBg: "bg-purple-50",
            iconColor: "text-purple-600"
        },
        {
            icon: CheckCircle,
            title: t('about.qualifications.specialisation.title'),
            desc: t('about.qualifications.specialisation.desc'),
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
        <section id="about" className="py-20 md:py-28 bg-white overflow-hidden relative">
            {/* Soft background blobs */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-50/60 rounded-full blur-[100px] pointer-events-none -z-0" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-50/60 rounded-full blur-[100px] pointer-events-none -z-0" />


            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${isRtl ? 'direction-rtl' : ''}`}>

                    {/* ── Image Column ── */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="relative"
                    >
                        {/* Decorative plate behind image */}
                        <div className="absolute -inset-4 bg-blue-50 rounded-3xl rotate-2 -z-10" />
                        <div className="absolute -inset-4 border-2 border-indigo-100/70 rounded-3xl -rotate-1 -z-10" />

                        {/* Portrait */}
                        <div className="relative rounded-2xl overflow-hidden shadow-xl group bg-slate-100">
                            <img
                                src={doctorProfileImg}
                                alt={t('common.doctorName')}
                                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-[1.03]"
                            />
                            {/* Subtle gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />
                        </div>

                        {/* Experience floating badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="absolute -bottom-6 -right-4 md:-right-8 bg-white/90 backdrop-blur-md border border-slate-100 shadow-lg rounded-2xl px-5 py-4 text-center min-w-[140px]"
                        >
                            <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-indigo-700 leading-tight">
                                15+
                            </p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 leading-tight">
                                {t('about.experienceBadge')}
                            </p>
                            <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
                        </motion.div>
                    </motion.div>

                    {/* ── Content Column ── */}
                    <div className={isRtl ? 'text-right' : 'text-left'}>

                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 mb-4"
                        >
                            <span className="w-6 h-[2px] bg-blue-600 rounded-full" />
                            <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">
                                {t('about.badge')}
                            </span>
                        </motion.div>

                        {/* Heading */}
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1, duration: 0.7 }}
                            className="text-4xl md:text-5xl font-montserrat font-black text-slate-900 leading-tight tracking-tight mb-3"
                        >
                            {t('about.title')}{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                                {t('about.titleHighlight')}
                            </span>{' '}
                            {t('about.titleEnd')}
                        </motion.h2>

                        {/* Credentials */}
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="text-xs md:text-sm text-slate-400 font-semibold tracking-wide mb-6 leading-relaxed"
                        >
                            {t('about.credentials')}
                        </motion.p>

                        {/* Description */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="space-y-4 mb-10"
                        >
                            <p className="text-slate-600 text-lg leading-relaxed border-l-4 border-blue-200 pl-4">
                                {t('about.description1')}
                            </p>
                            <p className="text-slate-500 text-base leading-relaxed">
                                {t('about.description2')}
                            </p>
                        </motion.div>

                        {/* Qualifications Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {qualifications.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.3 + index * 0.08 }}
                                    className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-white hover:shadow-md transition-all duration-300 group"
                                >
                                    <div className={`flex-shrink-0 w-10 h-10 rounded-lg ${item.iconBg} ${item.iconColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-800 leading-tight">{item.title}</h4>
                                        <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Stats Cards ── */}
                <div className="mt-16 md:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                    {[
                        { ...stats[0], gradient: "from-blue-500 to-cyan-400",    gradientText: "from-blue-600 to-cyan-500" },
                        { ...stats[1], gradient: "from-indigo-500 to-blue-500",  gradientText: "from-indigo-600 to-blue-500" },
                        { ...stats[2], gradient: "from-purple-500 to-indigo-500",gradientText: "from-purple-600 to-indigo-500" },
                        { ...stats[3], gradient: "from-emerald-500 to-teal-400", gradientText: "from-emerald-600 to-teal-500" },
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.15 * index }}
                            className="relative group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden p-6 md:p-8 text-center"
                        >
                            {/* Colored top accent bar */}
                            <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${stat.gradient} rounded-t-2xl`} />

                            {/* Icon */}
                            <div className={`mx-auto mb-4 w-11 h-11 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                <stat.icon className="w-5 h-5" />
                            </div>

                            {/* Value */}
                            <h3 className={`text-4xl md:text-5xl font-black tracking-tight mb-1 text-transparent bg-clip-text bg-gradient-to-br ${stat.gradientText}`}>
                                {stat.value}
                            </h3>

                            {/* Label */}
                            <p className="text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
