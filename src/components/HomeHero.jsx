import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, animate } from 'framer-motion';
import { Calendar, ChevronRight, Activity, Star, Award, Stethoscope, GraduationCap } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import { CardContainer, CardBody, CardItem } from './ui/3d-card';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

import doctorSurgery from '../assets/doctor-surgery.png';
import doctorPortrait from '../assets/doctor-profile.png';

/* ── Animated number counter ── */
const AnimatedCounter = ({ value, suffix, trigger }) => {
    const [count, setCount] = useState(0);
    const target = parseFloat(value);
    const isDecimal = value.includes('.');

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

/* ── Slide data ── */
const slides = [
    {
        id: 0,
        photo: doctorSurgery,
        photoStyle: 'h-[95%] w-auto object-contain object-bottom',
        badge: 'Leading Orthopedic Specialist in Dubai',
        headline1: 'Restore Your',
        headline2: 'Active Life',
        description:
            'Dr. Ulhas Sonar specializes in advanced joint replacement and precision sports medicine. Experience care designed for your swift recovery and ultimate joint health.',
        badgeIcon: <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />,
        badgeLabel: 'Success',
        badgeValue: '99.8%',
        nameplateSub: 'Orthopedic Specialist Surgeon',
        stats: [
            { value: '15', suffix: '+', label: 'Years Exp.' },
            { value: '5', suffix: 'k+', label: 'Patients' },
            { value: '4.9', suffix: '', label: 'Rating', isStar: true },
            { value: '99', suffix: '%', label: 'Success' },
        ],
    },
    {
        id: 1,
        photo: doctorPortrait,
        photoStyle: 'h-[90%] w-auto object-contain object-bottom',
        badge: 'MBBS · MS Ortho · Fellowship Trained',
        headline1: 'Meet Your',
        headline2: 'Specialist',
        description:
            'With over 15 years of expertise in hip & knee arthroplasty, arthroscopy, and complex trauma, Dr. Sonar brings world-class orthopaedic care to Canadian Specialist Hospital, Dubai.',
        badgeIcon: <GraduationCap className="w-4 h-4 text-amber-400" />,
        badgeLabel: 'Surgeries',
        badgeValue: '5,000+',
        nameplateSub: 'MS Ortho · Canadian Specialist Hospital',
        stats: [
            { value: '15', suffix: '+', label: 'Experience' },
            { value: '3', suffix: '', label: 'Fellowships' },
            { value: '10', suffix: '+', label: 'Awards' },
            { value: '98', suffix: '%', label: 'Satisfaction' },
        ],
    },
];

const SLIDE_DURATION = 5000;

const HomeHero = () => {
    const { language } = useLanguage();
    const t = translations[language];
    const highlights = t.hero?.highlights || [];

    const [activeSlide, setActiveSlide] = useState(0);
    const [direction, setDirection] = useState(1);

    const goTo = useCallback((index) => {
        setDirection(index > activeSlide ? 1 : -1);
        setActiveSlide(index);
    }, [activeSlide]);

    /* Auto-advance */
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

    /* Photo transition variants */
    const photoVariants = {
        enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60, scale: 0.96 }),
        center: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } },
        exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60, scale: 0.96, transition: { duration: 0.4 } }),
    };

    /* Content transition variants */
    const contentVariants = {
        enter: { opacity: 0, y: 20 },
        center: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 1, 0.5, 1] } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
    };

    return (
        <div
            id="home"
            className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, #050a14 0%, #080f20 40%, #0a1628 70%, #0d1f3c 100%)',
            }}
        >
            {/* ── Decorative Background ── */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <Orb className="w-[800px] h-[800px] bg-blue-600/10 -top-40 -left-60" delay={0} />
                <Orb className="w-[600px] h-[600px] bg-cyan-500/10 bottom-0 -right-40" delay={4} />
                <Orb className="w-[400px] h-[400px] bg-indigo-500/5 top-1/2 left-1/3" delay={2} />
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
                        backgroundSize: '32px 32px',
                    }}
                />
            </div>

            {/* ═══════════ Main Content ═══════════ */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* ── LEFT – Text (animated per slide) ── */}
                    <div className="order-2 lg:order-1 flex flex-col justify-center">

                        {/* Live badge */}
                        <motion.div
                            variants={itemVariants}
                            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8 backdrop-blur-md w-fit"
                            style={{
                                background: 'rgba(255,255,255,0.06)',
                                border: '1px solid rgba(255,255,255,0.12)',
                            }}
                        >
                            <span
                                className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse relative"
                                style={{ boxShadow: '0 0 12px rgba(34,211,238,0.8)' }}
                            >
                                <span className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-50" />
                            </span>
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={slide.badge}
                                    variants={contentVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    className="text-white/90 text-sm font-bold tracking-wide uppercase"
                                >
                                    {slide.badge}
                                </motion.span>
                            </AnimatePresence>
                        </motion.div>

                        {/* Headline */}
                        <motion.div variants={itemVariants} className="mb-6">
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.98] tracking-tighter">
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={`h1-${slide.id}`}
                                        variants={contentVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        className="text-white block"
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
                                        className="text-transparent bg-clip-text relative pb-2 inline-block mt-2"
                                        style={{
                                            backgroundImage: 'linear-gradient(90deg, #38bdf8 0%, #60a5fa 50%, #818cf8 100%)',
                                        }}
                                    >
                                        {slide.headline2}
                                        <motion.span
                                            key={`ul-${slide.id}`}
                                            initial={{ width: 0 }}
                                            animate={{ width: '100%' }}
                                            transition={{ delay: 0.5, duration: 0.9, ease: 'easeOut' }}
                                            className="absolute bottom-0 left-0 h-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-transparent opacity-40"
                                        />
                                    </motion.span>
                                </AnimatePresence>
                            </h1>
                        </motion.div>

                        {/* Description */}
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={`desc-${slide.id}`}
                                variants={contentVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="text-lg md:text-xl text-white/50 leading-relaxed mb-10 max-w-lg font-medium"
                            >
                                {slide.description}
                            </motion.p>
                        </AnimatePresence>

                        {/* CTA Buttons */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row gap-5 mb-14"
                        >
                            <motion.a
                                href="https://csh.ae/find-a-doctor?name=ulhas"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="group relative flex items-center justify-center gap-3 px-10 py-4 rounded-2xl font-bold text-lg overflow-hidden transition-all shadow-[0_15px_35px_rgba(29,78,216,0.4)]"
                                style={{
                                    background: 'linear-gradient(135deg, #1d4ed8 0%, #0284c7 100%)',
                                    color: '#fff',
                                }}
                            >
                                <Calendar className="w-5 h-5 transition-transform group-hover:rotate-12" />
                                Book Appointment
                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            </motion.a>

                            <RouterLink
                                to="/services"
                                className="group flex items-center justify-center gap-3 px-10 py-4 rounded-2xl font-bold text-lg text-white backdrop-blur-xl transition-all border border-white/10 hover:border-white/25 bg-white/5 hover:bg-white/10"
                            >
                                Explore Services
                                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </RouterLink>
                        </motion.div>

                        {/* Stats Row */}
                        <motion.div
                            variants={itemVariants}
                            className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-white/10"
                        >
                            <AnimatePresence mode="wait">
                                {slide.stats.map((stat, i) => (
                                    <motion.div
                                        key={`stat-${slide.id}-${i}`}
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -12 }}
                                        transition={{ duration: 0.4, delay: i * 0.07 }}
                                        className="flex flex-col"
                                    >
                                        <div className="flex items-center gap-1">
                                            {stat.isStar && <Star className="w-5 h-5 text-amber-400 fill-amber-400 mr-1" />}
                                            <span className="text-3xl font-black text-white">
                                                <AnimatedCounter value={stat.value} suffix={stat.suffix} trigger={slide.id} />
                                            </span>
                                        </div>
                                        <span className="text-[10px] text-white/40 font-black uppercase tracking-[0.2em] mt-1.5">
                                            {stat.label}
                                        </span>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>

                        {/* ── Slide Dots ── */}
                        <motion.div variants={itemVariants} className="flex items-center gap-3 mt-10">
                            {slides.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => goTo(i)}
                                    className="relative h-2 rounded-full overflow-hidden transition-all duration-300 focus:outline-none"
                                    style={{ width: i === activeSlide ? '32px' : '8px', background: 'rgba(255,255,255,0.2)' }}
                                    aria-label={`Go to slide ${i + 1}`}
                                >
                                    {i === activeSlide && (
                                        <motion.span
                                            key={`progress-${activeSlide}`}
                                            className="absolute inset-y-0 left-0 bg-cyan-400 rounded-full"
                                            initial={{ width: '0%' }}
                                            animate={{ width: '100%' }}
                                            transition={{ duration: SLIDE_DURATION / 1000, ease: 'linear' }}
                                        />
                                    )}
                                </button>
                            ))}
                        </motion.div>
                    </div>

                    {/* ── RIGHT – 3D Doctor Card ── */}
                    <motion.div
                        variants={itemVariants}
                        className="order-1 lg:order-2 flex items-center justify-center relative perspective-2000"
                    >
                        <CardContainer containerClassName="py-10">
                            <CardBody className="relative w-[300px] h-[420px] md:w-[340px] md:h-[480px]">
                                {/* Card Shell */}
                                <CardItem
                                    translateZ={-20}
                                    className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-white/10 to-transparent backdrop-blur-2xl border border-white/20 shadow-[0_45px_100px_rgba(0,0,0,0.6)] overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-blue-500/10" />
                                    <motion.div
                                        animate={{ top: ['-100%', '200%'], left: ['-100%', '200%'] }}
                                        transition={{ duration: 6, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
                                        className="absolute w-full h-[50%] bg-white/10 blur-[60px] -rotate-45 pointer-events-none"
                                    />
                                </CardItem>

                                {/* Status Badge */}
                                <CardItem translateZ={100} className="absolute top-6 right-6 z-30">
                                    <div
                                        className="flex items-center gap-2.5 px-4 py-3 rounded-2xl backdrop-blur-2xl shadow-xl border border-white/20"
                                        style={{ background: 'rgba(5,15,35,0.8)' }}
                                    >
                                        <div className="w-8 h-8 rounded-full bg-cyan-400/20 flex items-center justify-center border border-cyan-400/30">
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={`badge-icon-${slide.id}`}
                                                    initial={{ opacity: 0, scale: 0.7 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.7 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    {slide.badgeIcon}
                                                </motion.div>
                                            </AnimatePresence>
                                        </div>
                                        <div>
                                            <p className="text-[9px] text-white/50 font-black uppercase tracking-widest leading-none">
                                                {slide.badgeLabel}
                                            </p>
                                            <AnimatePresence mode="wait">
                                                <motion.p
                                                    key={`badge-val-${slide.id}`}
                                                    initial={{ opacity: 0, y: 4 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -4 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="text-white text-base font-black leading-tight"
                                                >
                                                    {slide.badgeValue}
                                                </motion.p>
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </CardItem>

                                {/* Award Badge */}
                                <CardItem translateZ={80} className="absolute top-24 -left-6 z-30">
                                    <motion.div
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                        className="p-3.5 rounded-2xl backdrop-blur-xl border border-white/20 shadow-2xl"
                                        style={{ background: 'linear-gradient(135deg, rgba(30,58,138,0.9), rgba(5,15,35,0.9))' }}
                                    >
                                        <Award className="w-6 h-6 text-amber-400" />
                                    </motion.div>
                                </CardItem>

                                {/* Doctor Photo — animated on slide change */}
                                <CardItem
                                    translateZ={60}
                                    className="absolute inset-0 flex items-end justify-center pointer-events-none pt-12 overflow-hidden rounded-[2.5rem]"
                                >
                                    <AnimatePresence mode="wait" custom={direction}>
                                        <motion.img
                                            key={`photo-${slide.id}`}
                                            src={slide.photo}
                                            alt="Dr. Ulhas Sonar"
                                            custom={direction}
                                            variants={photoVariants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            className={`${slide.photoStyle} drop-shadow-[0_45px_65px_rgba(0,0,0,0.8)]`}
                                        />
                                    </AnimatePresence>
                                </CardItem>

                                {/* Name Plate */}
                                <CardItem translateZ={120} className="absolute bottom-6 left-6 right-6">
                                    <div
                                        className="px-6 py-5 rounded-[1.75rem] backdrop-blur-3xl border border-white/15 shadow-2xl relative overflow-hidden"
                                        style={{ background: 'rgba(5,15,35,0.75)' }}
                                    >
                                        <h3 className="text-xl font-bold text-white tracking-tight leading-none mb-1.5 flex items-center gap-2">
                                            Dr. Ulhas Sonar
                                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                                        </h3>
                                        <AnimatePresence mode="wait">
                                            <motion.p
                                                key={`np-${slide.id}`}
                                                initial={{ opacity: 0, y: 5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -5 }}
                                                transition={{ duration: 0.35 }}
                                                className="text-cyan-400/90 text-sm font-semibold tracking-wide"
                                            >
                                                {slide.nameplateSub}
                                            </motion.p>
                                        </AnimatePresence>
                                        <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-cyan-500/20 rounded-full blur-2xl" />
                                    </div>
                                </CardItem>
                            </CardBody>
                        </CardContainer>

                        {/* Bg glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/5 blur-[120px] -z-10 rounded-full" />
                    </motion.div>
                </motion.div>
            </div>

            {/* ═══════════ Highlights Marquee ═══════════ */}
            {highlights && highlights.length > 0 && (
                <div className="absolute bottom-0 left-0 w-full overflow-hidden bg-white/5 border-t border-white/10 py-3 backdrop-blur-sm shadow-[0_-10px_30px_rgba(0,0,0,0.2)] z-20">
                    <motion.div
                        className="flex whitespace-nowrap"
                        animate={{ x: direction === "rtl" ? ["0%", "100%"] : ["-100%", "0%"] }} // Adjusted for potential future RTL needs, but left-to-right is default here via setup
                        initial={{ x: "0%" }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 80,
                                ease: "linear",
                            },
                        }}
                    >
                        {/* Render the array twice for seamless looping */}
                        {[...highlights, ...highlights].map((highlight, idx) => (
                            <div key={idx} className="flex items-center text-white/80 mx-10 text-sm md:text-base font-medium tracking-wide">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-4 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                                {highlight}
                            </div>
                        ))}
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default HomeHero;
