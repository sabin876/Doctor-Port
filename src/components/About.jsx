import { motion } from 'framer-motion';
import { Award, Globe, GraduationCap, CheckCircle } from 'lucide-react';
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

    return (
        <section id="about" className="pt-24 pb-24 bg-gradient-to-b from-white to-gray-50/50 overflow-hidden relative">
            {/* Background Decoration */}
            <div className="absolute top-0 end-0 -me-20 -mt-20 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
            <div className="absolute bottom-0 start-0 -ms-20 -mb-20 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl opacity-60 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="lg:grid lg:grid-cols-2 lg:gap-20 items-center">
                    {/* Image Section */}
                    <motion.div
                        className="mb-16 lg:mb-0 relative"
                        initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white bg-gradient-to-br from-gray-100 to-gray-200">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent z-10"></div>
                            <img
                                src={doctorProfileImg}
                                alt="Dr. Ulhas Sonar"
                                className="w-full h-auto object-cover relative z-0 transform transition-transform duration-700 hover:scale-105"
                            />

                            {/* Experience Badge - Glassmorphism */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                                className="absolute bottom-8 start-8 z-20 bg-white/20 backdrop-blur-xl px-8 py-5 rounded-3xl shadow-2xl border border-white/30"
                            >
                                <p className="text-5xl font-extrabold text-white drop-shadow-lg">15+</p>
                                <p className="text-sm font-bold text-white/90 mt-1">{t('about.experienceBadge')}</p>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Content Section */}
                    <motion.div
                        initial={{ opacity: 0, x: isRtl ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="inline-block px-5 py-2 mb-6 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-primary-600 text-[11px] font-bold uppercase tracking-[0.2em]"
                        >
                            {t('about.badge')}
                        </motion.div>

                        <h2 className="text-4xl md:text-5xl font-montserrat font-extrabold text-[#333] mb-8 tracking-tight">
                            {t('about.title')} <span className="text-blue-600">{t('about.titleHighlight')}</span> {t('about.titleEnd')}
                        </h2>

                        <p className="text-lg text-gray-600 mb-5 leading-relaxed">
                            {t('about.description1')}
                        </p>

                        <p className="text-base text-gray-500 mb-10 leading-relaxed">
                            {t('about.description2')}
                        </p>

                        {/* Premium Cards Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {qualifications.map((item, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ y: -8, scale: 1.03 }}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="group relative h-32 p-6 rounded-2xl bg-white border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden"
                                >
                                    {/* Gradient Overlay on Hover */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                                    {/* Animated Border */}
                                    <div className={`absolute inset-0 border-2 border-transparent group-hover:border-gradient-to-r ${item.gradient} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>

                                    <div className="relative flex items-start space-x-4 h-full">
                                        {/* Icon Container */}
                                        <motion.div
                                            whileHover={{ rotate: 360, scale: 1.1 }}
                                            transition={{ duration: 0.6 }}
                                            className={`flex-shrink-0 p-3.5 rounded-xl ${item.iconBg} shadow-sm group-hover:shadow-lg transition-all duration-300`}
                                        >
                                            <item.icon className={`h-6 w-6 ${item.iconColor}`} />
                                        </motion.div>

                                        {/* Text Content */}
                                        <div className="flex-1">
                                            <h4 className="text-base font-extrabold text-gray-900 group-hover:text-primary-600 transition-colors mb-1.5">{item.title}</h4>
                                            <p className="text-xs font-medium text-gray-500 leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>

                                    {/* Shine Effect */}
                                    <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent ${isRtl ? 'translate-x-[200%] group-hover:translate-x-[-200%]' : 'translate-x-[-200%] group-hover:translate-x-[200%]'} transition-transform duration-1000 pointer-events-none`}></div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
