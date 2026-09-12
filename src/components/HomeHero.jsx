import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, animate } from 'framer-motion';
import { Calendar, ChevronRight, Star, FileText } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import { CardContainer, CardBody, CardItem } from './ui/3d-card';
import { useLanguage } from '../context/LanguageContext';
import { useInitialData } from '../context/InitialDataContext';
import { api } from '../lib/api';

/* ── Animated number counter ── */
const AnimatedCounter = ({ value, suffix, trigger }) => {
    const [count, setCount] = useState(0);
    const target = parseFloat(value) || 0;
    const isDecimal = value ? value.toString().includes('.') : false;

    useEffect(() => {
        setCount(0);
        const controls = animate(0, target, {
            duration: 2,
            delay: 0.3,
            ease: 'easeOut',
            onUpdate: (latest) => setCount(latest),
        });
        return controls.stop;
    }, [target, trigger]);

    return (
        <span>
            {isDecimal ? count.toFixed(1) : Math.round(count)}
            {suffix || ''}
        </span>
    );
};

/* ── Floating decorative orb ── */
const Orb = ({ className, delay = 0 }) => (
    <motion.div
        className={`absolute rounded-full blur-[100px] pointer-events-none ${className}`}
        animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.45, 0.3],
            x: [0, 20, 0],
            y: [0, -20, 0],
        }}
        transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay,
        }}
    />
);

/* ── Stats row implementation ── */
const StatsRow = ({ trigger, stats }) => (
    <div className="grid grid-cols-3 gap-x-6 gap-y-4 pt-8 md:pt-10">
        {stats.map((stat, i) => (
            <div key={i} className="flex flex-col">
                <div className="flex items-center gap-1.5">
                    {stat.isGoogle || stat.isStar ? (
                        <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                            <span className="text-lg font-black text-blue-600 tracking-tight">
                                {stat.value || "5.0"}
                            </span>
                        </div>
                    ) : (
                        <span className="text-lg md:text-xl font-black text-blue-600 tracking-tight">
                            <AnimatedCounter value={stat.value} suffix={stat.suffix} trigger={trigger} />
                        </span>
                    )}
                </div>
                <span className="text-[9px] text-slate-400 font-black uppercase tracking-[0.15em] mt-0.5 leading-tight">
                    {stat.label}
                </span>
            </div>
        ))}
    </div>
);

const HomeHero = ({ homeData: propHomeData }) => {
    const { t, language } = useLanguage();
    const initialData = useInitialData();
    
    const [fetchedData, setFetchedData] = useState(() => {
        return propHomeData || initialData?.homepage || (typeof window !== 'undefined' ? window.__INITIAL_DATA__?.homepage : null);
    });

    useEffect(() => {
        if (propHomeData) {
            setFetchedData(propHomeData);
        } else if (!fetchedData) {
            let isMounted = true;
            api.getHomePage()
                .then(data => {
                    if (isMounted && data) {
                        setFetchedData(data);
                    }
                })
                .catch(err => {
                    console.error("Failed to load hero section data:", err);
                });
            return () => { isMounted = false; };
        }
    }, [propHomeData]);

    const activeData = propHomeData || fetchedData;

    // Check if hero is deactivated explicitly
    if (activeData && activeData.hero_is_active === false) {
        return null;
    }

    const [videoUrl, setVideoUrl] = useState(() => {
        if (activeData?.hero_video_file) return activeData.hero_video_file;
        if (activeData?.hero_video_url) return activeData.hero_video_url;

        if (typeof window !== 'undefined' && window.__INITIAL_HERO_VIDEO__) {
            const data = window.__INITIAL_HERO_VIDEO__;
            if (data && data.video) {
                return data.video;
            } else if (data) {
                const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || "https://api.drulhasorthopedic.com/api").replace(/\/+$/, "");
                return `${apiBaseUrl.replace(/\/api\/?$/, '')}/media/hero-section.mp4`;
            }
        }
        return '';
    });

    useEffect(() => {
        if (activeData?.hero_video_file) {
            setVideoUrl(activeData.hero_video_file);
            return;
        }
        if (activeData?.hero_video_url) {
            setVideoUrl(activeData.hero_video_url);
            return;
        }
        if (videoUrl) return;

        const fetchVideo = async () => {
            try {
                const data = await api.getHeroVideo();
                if (data && data.video) {
                    setVideoUrl(data.video);
                } else {
                    const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || "https://api.drulhasorthopedic.com/api").replace(/\/+$/, "");
                    const fallbackUrl = `${apiBaseUrl.replace(/\/api\/?$/, '')}/media/hero-section.mp4`;
                    setVideoUrl(fallbackUrl);
                }
            } catch (error) {
                console.error("Failed to load hero video:", error);
                const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || "https://api.drulhasorthopedic.com/api").replace(/\/+$/, "");
                const fallbackUrl = `${apiBaseUrl.replace(/\/api\/?$/, '')}/media/hero-section.mp4`;
                setVideoUrl(fallbackUrl);
            }
        };
        fetchVideo();
    }, [activeData?.hero_video_file, activeData?.hero_video_url, videoUrl]);

    const defaultStats = [
        { value: '15', suffix: '+', label: t('hero.stats.exp') },
        { value: '6', suffix: '', label: t('hero.stats.qualifications') },
        { value: '10', suffix: '+', label: t('hero.stats.research') },
        { value: '6', suffix: '+', label: t('hero.stats.audits') },
        { value: '10', suffix: '+', label: t('hero.stats.podium') },
        { isGoogle: true, isStar: true, value: '5.0', label: t('hero.stats.outcomes') },
    ];

    const stats = (activeData?.hero_stats && Array.isArray(activeData.hero_stats) && activeData.hero_stats.length > 0)
        ? activeData.hero_stats
        : defaultStats;

    const badge = activeData?.hero_badge || t('hero.slides.1.badge');
    const headlineA = activeData?.hero_headline_1 || "Patient Centric, Evidence";
    const headlineB = activeData?.hero_headline_2 || "Based & Individualised";
    const headlineC = activeData?.hero_headline_3 || "Orthopedic Care";
    const description = activeData?.hero_description || t('hero.slides.1.description');

    const doctorName = activeData?.hero_doctor_name || "Dr. Ulhas Sonar";
    const doctorRole = activeData?.hero_doctor_role || (
        language === 'AR'
            ? "استشاري جراحة العظام"
            : language === 'HI'
            ? "सलाहकार आर्थोपेडिक सर्जन"
            : "Consultant Orthopedic Surgeon"
    );

    const bookBtnText = activeData?.hero_book_btn_text || t('hero.bookAppointment');
    const bookBtnLink = activeData?.hero_book_btn_link || "/contact";

    const reportBtnText = activeData?.hero_report_btn_text || (language === 'AR' ? "التقارير" : language === 'HI' ? "रिपोर्ट" : "Report");
    const reportBtnLink = activeData?.hero_report_btn_link || "/report-access";

    const servicesBtnText = activeData?.hero_services_btn_text || t('hero.exploreServices');
    const servicesBtnLink = activeData?.hero_services_btn_link || "/services";

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 24 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.65, ease: [0.25, 1, 0.5, 1] },
        },
    };

    const contentVariants = {
        enter: { opacity: 0, y: 20 },
        center: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 1, 0.5, 1] } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
    };

    const renderActionLink = (text, link, className, icon, extra) => {
        if (!text) return null;
        const isExternal = link.startsWith('http://') || link.startsWith('https://') || link.startsWith('tel:') || link.startsWith('mailto:');
        if (isExternal) {
            return (
                <a href={link} target="_blank" rel="noopener noreferrer" className={className}>
                    {icon}
                    <span>{text}</span>
                    {extra}
                </a>
            );
        }
        return (
            <RouterLink to={link} className={className}>
                {icon}
                <span>{text}</span>
                {extra}
            </RouterLink>
        );
    };

    return (
        <div
            id="home"
            className="relative min-h-[85vh] flex items-start pt-2 pb-16 overflow-hidden bg-gradient-to-b from-blue-50/80 via-white to-blue-50/50"
        >
            {/* ── Background Video & Effects ── */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-50/60 via-white/80 to-blue-50/60" />
                <Orb className="w-[800px] h-[800px] bg-blue-400/10 -top-40 -left-60" delay={0} />
                <Orb className="w-[600px] h-[600px] bg-cyan-400/10 bottom-0 -right-40" delay={4} />
                <div
                    className="absolute inset-0 opacity-[0.08]"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, #3b82f6 1.5px, transparent 0)',
                        backgroundSize: '40px 40px',
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* ── LEFT – Content ── */}
                    <div className="flex flex-col">
                        {/* Redesigned Single Qualifications Badge */}
                        {badge && (
                            <motion.div
                                variants={itemVariants}
                                className="flex items-start px-4 py-2.5 rounded-2xl mb-6 bg-gradient-to-r from-blue-50 to-indigo-50/40 border border-blue-100 shadow-[0_4px_16px_rgba(59,130,246,0.06)] max-w-[90%] md:max-w-md backdrop-blur-md text-justify"
                            >
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={badge}
                                        variants={contentVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        className="text-blue-750 text-[10px] md:text-[11px] font-semibold tracking-wide leading-relaxed text-justify w-full"
                                    >
                                        {badge}
                                    </motion.span>
                                </AnimatePresence>
                            </motion.div>
                        )}

                        <motion.div variants={itemVariants} className="mb-8">
                            <h1 className="text-[26px] sm:text-[32px] md:text-[38px] lg:text-[42px] font-semibold leading-[1.25] tracking-tight font-poppins">
                                {headlineA && <span className="text-slate-900 block">{headlineA}</span>}
                                {headlineB && <span className="text-slate-900 block">{headlineB}</span>}
                                {headlineC && (
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 block pb-1">
                                        {headlineC}
                                    </span>
                                )}
                            </h1>
                        </motion.div>

                        {description && (
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={description}
                                    variants={contentVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    className="text-[15px] md:text-base text-slate-600 leading-relaxed mb-10 max-w-xl font-medium text-justify"
                                >
                                    {description}
                                </motion.p>
                            </AnimatePresence>
                        )}

                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 w-full"
                        >
                            {renderActionLink(
                                bookBtnText,
                                bookBtnLink,
                                "group relative flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-montserrat font-black text-[12px] tracking-wide bg-blue-600 text-white shadow-[0_15px_30px_-8px_rgba(37,99,235,0.4)] hover:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.5)] hover:scale-[1.03] active:scale-[0.97] transition-all overflow-hidden w-full sm:w-fit",
                                <Calendar className="w-4 h-4 transition-transform group-hover:rotate-12" />,
                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            )}

                            {renderActionLink(
                                reportBtnText,
                                reportBtnLink,
                                "group flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-black text-[12px] text-blue-600 border-2 border-blue-100 bg-blue-50/50 hover:bg-blue-50 hover:border-blue-200 transition-all shadow-sm w-full sm:w-fit",
                                <FileText className="w-4 h-4 transition-transform group-hover:scale-110" />
                            )}

                            {renderActionLink(
                                servicesBtnText,
                                servicesBtnLink,
                                "group flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-black text-[13px] text-slate-700 border-2 border-slate-100 bg-white hover:bg-slate-50 hover:border-blue-100 transition-all shadow-sm w-full sm:w-fit",
                                null,
                                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            )}
                        </motion.div>

                        {/* Stats Row */}
                        {stats && stats.length > 0 && (
                            <motion.div variants={itemVariants}>
                                <StatsRow trigger={1} stats={stats} />
                            </motion.div>
                        )}
                    </div>

                    {/* ── RIGHT – 3D Card ── */}
                    <motion.div
                        variants={itemVariants}
                        className="flex items-center justify-center relative w-full"
                    >
                        <CardContainer containerClassName="py-0 w-full flex justify-center">
                            <CardBody className="relative w-[280px] h-[360px] sm:w-[360px] sm:h-[430px] md:w-[440px] md:h-[520px] max-w-full">
                                {/* Portrait Card Shell */}
                                <CardItem
                                    translateZ={-20}
                                    className="absolute inset-0 w-full h-full rounded-[2.5rem] bg-white border border-slate-100 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-cyan-500/10" />
                                </CardItem>

                                {/* Doctor Video */}
                                <CardItem
                                    translateZ={40}
                                    className="absolute inset-0 w-full h-full overflow-hidden rounded-[2.5rem] transform-gpu"
                                    style={{ backfaceVisibility: 'hidden' }}
                                >
                                    {videoUrl && (
                                        <video
                                            key={videoUrl}
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            preload="auto"
                                            className="w-full h-full object-cover transform-gpu"
                                            style={{ backfaceVisibility: 'hidden', willChange: 'transform' }}
                                        >
                                            <source src={videoUrl} type="video/mp4" />
                                        </video>
                                    )}
                                </CardItem>

                                {/* Name & Info Overlay — Bottom of Card */}
                                <CardItem
                                    translateZ={60}
                                    className="absolute bottom-6 left-6 z-30"
                                >
                                    <div className="flex flex-col bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-white/50 w-fit">
                                        <h3 className="text-xl font-black text-slate-900 mb-0.5">{doctorName}</h3>
                                        <div className="flex items-center gap-2">
                                            <span className="w-8 h-[2px] bg-blue-600 rounded-full" />
                                            <p className="text-blue-600 text-[13px] font-black tracking-widest uppercase opacity-90">{doctorRole}</p>
                                        </div>
                                    </div>
                                </CardItem>
                            </CardBody>
                        </CardContainer>

                        {/* Background Aura */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/5 blur-[120px] -z-10" />
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default HomeHero;
