import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, animate } from 'framer-motion';
import { Calendar, ChevronRight, Activity, Star, Award, GraduationCap, CheckCircle2 } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import { CardContainer, CardBody, CardItem } from './ui/3d-card';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

import doctorSurgery from '../assets/doctor-surgery.png';
import doctorPortrait from '../assets/doctor-profile-2.png';

/* ── Animated number counter ── */
const AnimatedCounter = ({ value, suffix, trigger }) => {
    const [count, setCount] = useState(0);
    const target = parseFloat(value);
    const isDecimal = value.toString().includes('.');

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
            {suffix}
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

/* ── New Stats row implementation to match mockup ── */
const StatsRow = ({ trigger, stats }) => (
    <div className="grid grid-cols-3 gap-x-6 gap-y-4 pt-8 md:pt-10">
        {stats.map((stat, i) => (
            <div key={i} className="flex flex-col">
                <div className="flex items-center gap-1.5">
                    {stat.isGoogle ? (
                        <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                            <span className="text-lg font-black text-blue-600 tracking-tight">5.0</span>
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

const SLIDE_DURATION = 8000;

const HomeHero = () => {
    const { t, language } = useLanguage();

    const allStats = [
        { value: '15', suffix: '+', label: t('hero.stats.exp') },
        { value: '6', suffix: '', label: t('hero.stats.qualifications') },
        { value: '10', suffix: '+', label: t('hero.stats.research') },
        { value: '6', suffix: '+', label: t('hero.stats.audits') },
        { value: '10', suffix: '+', label: t('hero.stats.podium') },
        { isGoogle: true, isStar: true, label: t('hero.stats.outcomes') },
    ];

    const slides = [
        {
            id: 0,
            photo: doctorSurgery,
            photoStyle: 'h-[105%] w-auto object-cover object-center',
            badge: t('hero.slides.0.badge'),
            headline1: t('hero.slides.0.headline1'),
            headline2: t('hero.slides.0.headline2'),
            description: t('hero.slides.0.description'),
            badgeValue: '98%',
            nameplateSub: t('hero.slides.0.nameplateSub'),
            stats: allStats,
        },
        {
            id: 1,
            photo: doctorPortrait,
            photoStyle: 'h-[100%] w-auto object-contain object-bottom',
            badge: t('hero.slides.1.badge'),
            headline1: t('hero.slides.1.headline1'),
            headline2: t('hero.slides.1.headline2'),
            description: t('hero.slides.1.description'),
            badgeValue: '99.8%',
            nameplateSub: t('hero.slides.1.nameplateSub'),
            stats: allStats,
        },
    ];

    const highlights = t('hero.highlights') || [];

    const [activeSlide, setActiveSlide] = useState(0);
    const [direction, setDirection] = useState(1);

    useEffect(() => {
        const timer = setTimeout(() => {
            const next = (activeSlide + 1) % slides.length;
            setDirection(1);
            setActiveSlide(next);
        }, SLIDE_DURATION);
        return () => clearTimeout(timer);
    }, [activeSlide]);

    const slide = slides[activeSlide];

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

    return (
        <div
            id="home"
            className="relative min-h-[85vh] flex items-start pt-2 pb-16 overflow-hidden bg-gradient-to-b from-blue-50/80 via-white to-blue-50/50"
        >
            {/* ── Background Effects ── */}
            <div className="absolute inset-0 z-0 pointer-events-none">
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
                        {/* Mockup Badge */}
                        <motion.div
                            variants={itemVariants}
                            className="flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-blue-50 border border-blue-100 shadow-[0_4px_12px_rgba(59,130,246,0.08)] w-fit backdrop-blur-md"
                        >
                            <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-pulse" />
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={slide.badge}
                                    variants={contentVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    className="text-blue-700 text-xs md:text-[13px] font-black tracking-[0.15em] uppercase"
                                >
                                    {slide.badge}
                                </motion.span>
                            </AnimatePresence>
                        </motion.div>

                        <motion.div variants={itemVariants} className="mb-8">
                                <h1 className="text-[46px] md:text-[58px] font-montserrat font-black leading-[0.88] tracking-tighter">
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={`h1-${slide.id}`}
                                        variants={contentVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        className="text-slate-900 inline-block mr-3"
                                    >
                                        {slide.headline1}
                                    </motion.span>
                                </AnimatePresence>
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={`h2-${slide.id}`}
                                        variants={contentVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        className="text-transparent bg-clip-text inline-block pb-3"
                                        style={{
                                            backgroundImage: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)',
                                        }}
                                    >
                                        {slide.headline2}
                                    </motion.span>
                                </AnimatePresence>
                            </h1>
                        </motion.div>

                        <AnimatePresence mode="wait">
                            <motion.p
                                key={`desc-${slide.id}`}
                                variants={contentVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="text-lg text-slate-600 leading-relaxed mb-10 max-w-xl font-medium"
                            >
                                {slide.description}
                            </motion.p>
                        </AnimatePresence>

                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row gap-5"
                        >
                            <RouterLink
                                to="/contact"
                                className="group relative flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl font-montserrat font-black text-sm tracking-wide bg-blue-600 text-white shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] hover:shadow-[0_25px_50px_-12px_rgba(37,99,235,0.5)] hover:scale-[1.03] active:scale-[0.97] transition-all overflow-hidden"
                            >
                                <Calendar className="w-4 h-4 transition-transform group-hover:rotate-12" />
                                {t('hero.bookAppointment')}
                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            </RouterLink>

                            <RouterLink
                                to="/services"
                                className="group flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-black text-base text-slate-700 border-2 border-slate-100 bg-white hover:bg-slate-50 hover:border-blue-100 transition-all shadow-sm"
                            >
                                {t('hero.exploreServices')}
                                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </RouterLink>
                        </motion.div>

                        {/* Personalized Solution CTA */}
                        <motion.div
                            variants={itemVariants}
                            className="mt-6 ps-2"
                        >
                            <a
                                href="#personalized-solutions"
                                className="flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors group italic"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                                Looking for a personalized solution? <span className="underline decoration-1 underline-offset-2">Click here to learn more</span>
                            </a>
                        </motion.div>

                        {/* Updated Stats Row */}
                        <motion.div variants={itemVariants}>
                            <StatsRow trigger={slide.id} stats={slide.stats} />
                        </motion.div>
                    </div>

                    {/* ── RIGHT – 3D Card ── */}
                    <motion.div
                        variants={itemVariants}
                        className="flex items-center justify-center relative"
                    >
                        <CardContainer containerClassName="py-0">
                                <CardBody className="relative w-[360px] h-[430px] md:w-[440px] md:h-[520px]">
                                {/* Portrait Card Shell */}
                                <CardItem
                                    translateZ={-20}
                                    className="absolute inset-0 rounded-[2.5rem] bg-white border border-slate-100 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-cyan-500/10" />
                                </CardItem>

                                {/* Floating Success Badge */}
                                <CardItem translateZ={80} className="absolute top-6 right-6 md:top-8 md:right-8 z-30 scale-100 md:scale-110 origin-top-right">
                                    <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/50 shadow-2xl">
                                        <div className="w-9 h-9 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-400 font-black tracking-widest leading-none mb-1">SUCCESS RATE</p>
                                            <p className="text-slate-900 text-lg font-black leading-none">{slide.badgeValue}</p>
                                        </div>
                                    </div>
                                </CardItem>

                                {/* Doctor Image with Slide Transition */}
                                <CardItem
                                    translateZ={40}
                                    className="absolute inset-0 flex items-center justify-center pt-10 overflow-hidden rounded-[2.5rem]"
                                >
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={`img-${slide.id}`}
                                            src={slide.photo}
                                            alt="Dr. Ulhas Sonar"
                                            initial={{ opacity: 0, scale: 1.15 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 1.15 }}
                                            transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
                                            className={`${slide.photoStyle} filter contrast-[1.05] brightness-95 drop-shadow-2xl`}
                                        />
                                    </AnimatePresence>
                                </CardItem>

                                {/* Name & Info Overlay — Bottom of Card */}
                                <CardItem
                                    translateZ={60}
                                    className="absolute bottom-10 left-8 right-8"
                                >
                                    <div className="flex flex-col">
                                        <h3 className="text-2xl font-black text-slate-900 mb-1">Dr. Ulhas Sonar</h3>
                                        <div className="flex items-center gap-2">
                                            <span className="w-8 h-[2px] bg-blue-600 rounded-full" />
                                            <p className="text-blue-600 text-[13px] font-black tracking-widest uppercase opacity-90">{slide.nameplateSub}</p>
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
