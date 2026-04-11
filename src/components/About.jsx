import React from 'react';
import { motion } from 'framer-motion';
import {
    GraduationCap, Briefcase, Award, BookOpen,
    HeartHandshake, FlaskConical, ShieldCheck, Star
} from 'lucide-react';
import doctorProfileImg from '../assets/doctor-profile.webp';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
    const { language, t } = useLanguage();
    const isRtl = language === 'AR';

    /* ── Qualification cards (like the reference: Education / Experience / Certifications / Publications) ── */
    const qualCards = [
        {
            icon: GraduationCap,
            title: 'Education',
            items: [
                'MBBS – B J Medical College, Pune',
                'MS (Ortho) – Postgraduate training, India',
                'MCh Upper Limb Surgery – Wrightington, UK',
            ],
            color: 'text-blue-700',
            bg: 'bg-blue-50',
            border: 'border-blue-100',
        },
        {
            icon: Briefcase,
            title: 'Experience',
            items: [
                '15+ years in Orthopaedic Surgery',
                'NHS Consultant – UK hospitals',
                'Surgeon – Dubai (current)',
            ],
            color: 'text-indigo-700',
            bg: 'bg-indigo-50',
            border: 'border-indigo-100',
        },
        {
            icon: Award,
            title: 'Certifications',
            items: [
                'FRCS (T&O) – Royal College of Surgeons, England',
                'FEBOT – European Board, Switzerland',
                'MRCS (England)',
                'PG Dip – Robotic-Assisted TKR, Glasgow',
            ],
            color: 'text-blue-700',
            bg: 'bg-blue-50',
            border: 'border-blue-100',
        },
        {
            icon: BookOpen,
            title: 'Publications',
            items: [
                '10+ peer-reviewed research papers',
                'Published in JBJS, BMJ, BJH Medicine',
                'Presenter at international conferences',
            ],
            color: 'text-indigo-700',
            bg: 'bg-indigo-50',
            border: 'border-indigo-100',
        },
    ];

    /* ── Core Values ── */
    const values = [
        {
            icon: HeartHandshake,
            title: 'Patient-Centred Care',
            desc: 'Every decision is guided by what is best for the patient — respecting their goals, concerns, and unique circumstances.',
        },
        {
            icon: FlaskConical,
            title: 'Evidence-Based Practice',
            desc: 'Treatment plans are grounded in the latest clinical research and surgical innovations for the best possible outcomes.',
        },
        {
            icon: ShieldCheck,
            title: 'Patient Safety & Rights',
            desc: 'A passionate advocate for patient safety, transparency, and the right to access the highest standard of orthopaedic care.',
        },
        {
            icon: Star,
            title: 'Surgical Excellence',
            desc: 'Combining robotic precision with years of global experience to deliver consistently superior surgical results.',
        },
    ];

    const fadeUp = (delay = 0) => ({
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
    });

    return (
        <section
            id="about"
            className="bg-gradient-to-b from-[#f0f6ff] via-white to-[#f0f6ff] overflow-hidden"
            dir={isRtl ? 'rtl' : 'ltr'}
        >
            {/* ════════════════════════════════════════
                BLOCK 1 — Centred Header
            ════════════════════════════════════════ */}
            <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto">
                <motion.p
                    {...fadeUp(0)}
                    className="text-blue-600 text-[11px] font-normal uppercase tracking-[0.3em] mb-4"
                >
                    {t('about.badge')}
                </motion.p>

                <motion.h1
                    {...fadeUp(0.08)}
                    className="font-montserrat font-normal text-[#0f2756] text-4xl md:text-5xl leading-tight mb-5"
                >
                    {t('about.title')}{' '}
                    <span className="text-blue-600">{t('about.titleHighlight')}</span>
                </motion.h1>

                <motion.p
                    {...fadeUp(0.16)}
                    className="text-slate-500 text-base md:text-lg leading-relaxed"
                >
                    {t('about.credentials')}
                </motion.p>
            </div>

            {/* ════════════════════════════════════════
                BLOCK 2 — Image + Bio (2-col)
            ════════════════════════════════════════ */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

                    {/* Image */}
                    <motion.div {...fadeUp(0)} className="relative">
                        <div className="rounded-2xl overflow-hidden shadow-lg bg-slate-100">
                            <img
                                src={doctorProfileImg}
                                alt={t('common.doctorName')}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-auto object-cover"
                            />
                        </div>
                        {/* 15+ badge */}
                        <div className="absolute bottom-4 right-4 bg-white border border-slate-100 shadow-md rounded-xl px-4 py-3 text-center">
                            <p className="text-2xl font-normal text-blue-700 leading-none">15+</p>
                            <p className="text-[9px] font-normal text-slate-400 uppercase tracking-widest mt-1">
                                {t('about.experienceBadge')}
                            </p>
                        </div>
                    </motion.div>

                    {/* Bio */}
                    <motion.div {...fadeUp(0.1)} className="pt-2">
                        <h2 className="font-montserrat font-normal text-[#0f2756] text-2xl md:text-3xl mb-5">
                            A Distinguished Orthopaedic Surgeon
                        </h2>
                        <div className="space-y-4 text-slate-600 text-[15px] leading-relaxed">
                            <p>{t('about.description1')}</p>
                            <p>{t('about.description2')}</p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* ════════════════════════════════════════
                BLOCK 3 — Qualification Cards (4-col)
            ════════════════════════════════════════ */}
            <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {qualCards.map((card, i) => (
                        <motion.div
                            key={i}
                            {...fadeUp(i * 0.1)}
                            className={`bg-white border ${card.border} rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300`}
                        >
                            {/* Icon */}
                            <div className={`w-11 h-11 rounded-xl ${card.bg} ${card.color} flex items-center justify-center mb-4`}>
                                <card.icon className="w-5 h-5" />
                            </div>
                            {/* Title */}
                            <h3 className={`font-montserrat font-normal text-base mb-3 ${card.color}`}>
                                {card.title}
                            </h3>
                            {/* Bullet list */}
                            <ul className="space-y-2">
                                {card.items.map((item, j) => (
                                    <li key={j} className="flex items-start gap-2 text-slate-500 text-[13px] leading-snug">
                                        <span className={`mt-[5px] w-1.5 h-1.5 rounded-full flex-shrink-0 ${card.color.replace('text-', 'bg-')}`} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* ════════════════════════════════════════
                BLOCK 4 — Core Values
            ════════════════════════════════════════ */}
            <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#f0f6ff] to-white">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <motion.div {...fadeUp(0)} className="text-center mb-10">
                        <h2 className="font-montserrat font-normal text-[#0f2756] text-3xl md:text-4xl mb-3">
                            My Core Values
                        </h2>
                        <p className="text-slate-500 text-base">
                            The principles that guide every patient interaction
                        </p>
                    </motion.div>

                    {/* Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {values.map((v, i) => (
                            <motion.div
                                key={i}
                                {...fadeUp(i * 0.1)}
                                className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex gap-4"
                            >
                                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                                    <v.icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-montserrat font-normal text-blue-700 text-[15px] mb-1">{v.title}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ════════════════════════════════════════
                BLOCK 5 — Stats Bar
            ════════════════════════════════════════ */}
            <div className="bg-white border-t border-slate-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                    {[
                        { value: '15+', label: t('about.stats.experience.label') },
                        { value: '5000+', label: t('about.stats.surgeries.label') },
                        { value: '10k+', label: t('about.stats.patients.label') },
                        { value: '4', label: t('about.stats.global.label') },
                    ].map((s, i) => (
                        <motion.div key={i} {...fadeUp(i * 0.1)}>
                            <p className="font-montserrat font-normal text-4xl md:text-5xl text-[#0f2756] mb-1">{s.value}</p>
                            <p className="text-[10px] font-normal text-slate-400 uppercase tracking-widest">{s.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
