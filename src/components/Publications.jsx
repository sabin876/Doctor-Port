
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { BookOpen, ArrowUpRight, FileText, ChevronRight, Sparkles } from 'lucide-react';

const publications = [
    {
        id: 1,
        category: 'Orthopedic Surgery',
        categoryColor: 'from-blue-500 to-cyan-500',
        categoryBg: 'bg-blue-50',
        categoryText: 'text-blue-700',
        title: 'Alignment Concept: Total Knee Replacement',
        subtitle: 'Personalized Alignment in Total Knee Replacement',
        description:
            'A Shift from One-Size-Fits-All — Total Knee Arthroplasty (TKA) has undergone a major evolution from focusing on generic mechanical alignment to modern, personalized alignment strategies. Dr. Ulhas Sonar shares insights into how understanding joint anatomy and using technology can lead to better surgical outcomes.',
        highlights: [
            'From Mechanical to Personalized Alignment',
            'Kinematic, Inverse Kinematic & Functional Alignment',
            'Role of Technology in Precision Surgery',
        ],
        link: 'https://drulhasorthopedic.com/alignment-concept-total-knee-replacement/',
        year: '2024',
        readTime: '5 min read',
    },
    {
        id: 2,
        category: 'Implant Technology',
        categoryColor: 'from-purple-500 to-indigo-500',
        categoryBg: 'bg-purple-50',
        categoryText: 'text-purple-700',
        title: 'The Evolution of TKR Implants',
        subtitle: 'Advancing Toward Precision and Performance',
        description:
            'Total Knee Replacement implants have come a long way from the early days of hinge prostheses to today\'s advanced, patient-specific systems. Dr. Ulhas Sonar, a UK-trained orthopedic surgeon, provides a concise overview of how TKR implant design has evolved to enhance outcomes.',
        highlights: [
            'From Hinges to Modularity',
            'Key Design Philosophies & Advancements',
            'Data-Driven Implant Choices',
        ],
        link: 'https://drulhasorthopedic.com/the-evolution-of-tkr-implants/',
        year: '2024',
        readTime: '6 min read',
    },
    {
        id: 3,
        category: 'Surgical Technique',
        categoryColor: 'from-emerald-500 to-teal-500',
        categoryBg: 'bg-emerald-50',
        categoryText: 'text-emerald-700',
        title: 'Steps in Total Knee Replacement',
        subtitle: 'A Surgical Overview by Dr. Ulhas Sonar',
        description:
            'Total Knee Replacement (TKR) is a complex yet highly rewarding procedure aimed at restoring mobility and relieving chronic pain. Dr. Ulhas Sonar, a British-Indian orthopedic surgeon with global training, outlines a step-by-step guide to modern TKR technique.',
        highlights: [
            'Pre-operative Evaluation & Positioning',
            'Key Surgical Goals & Technique',
            'Flexion & Extension Gap Management',
        ],
        link: 'https://drulhasorthopedic.com/steps-in-tkr/',
        year: '2024',
        readTime: '7 min read',
    },
];

const cardVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
    }),
};

const Publications = () => {
    const [activeCard, setActiveCard] = useState(null);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    return (
        <section
            ref={sectionRef}
            className="relative py-28 overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, #0a0f1e 0%, #0d1b3e 40%, #0a1628 100%)',
            }}
        >
            {/* Animated Background Grid */}
            <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(99,179,237,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,179,237,0.3) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                }}
            />

            {/* Glowing Orbs */}
            <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-[160px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Section Header */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8 border border-blue-400/30"
                        style={{ background: 'rgba(59, 130, 246, 0.12)' }}
                    >
                        <Sparkles className="w-4 h-4 text-blue-400" />
                        <span className="text-blue-300 text-xs font-bold uppercase tracking-[0.2em]">
                            Research & Publications
                        </span>
                    </motion.div>

                    <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6 font-montserrat leading-tight tracking-tight">
                        Medical{' '}
                        <span
                            className="relative inline-block"
                            style={{
                                background: 'linear-gradient(90deg, #60a5fa, #a78bfa, #34d399)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            Publications
                        </span>
                    </h2>

                    <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        Peer-reviewed articles and surgical insights authored by Dr. Ulhas Sonar —
                        advancing orthopedic knowledge globally.
                    </p>

                    {/* Animated underline */}
                    <motion.div
                        className="mx-auto mt-8 h-px w-32 rounded-full"
                        style={{ background: 'linear-gradient(90deg, #60a5fa, #a78bfa)' }}
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    />
                </motion.div>

                {/* Publication Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {publications.map((pub, i) => (
                        <motion.div
                            key={pub.id}
                            custom={i}
                            variants={cardVariants}
                            initial="hidden"
                            animate={isInView ? 'visible' : 'hidden'}
                            onMouseEnter={() => setActiveCard(pub.id)}
                            onMouseLeave={() => setActiveCard(null)}
                            className="group relative flex flex-col rounded-3xl overflow-hidden cursor-pointer"
                            style={{
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                backdropFilter: 'blur(12px)',
                                transition: 'border-color 0.4s, box-shadow 0.4s',
                                borderColor:
                                    activeCard === pub.id
                                        ? 'rgba(99,179,237,0.35)'
                                        : 'rgba(255,255,255,0.08)',
                                boxShadow:
                                    activeCard === pub.id
                                        ? '0 0 60px -10px rgba(59,130,246,0.35)'
                                        : 'none',
                            }}
                        >
                            {/* Animated top gradient bar */}
                            <div
                                className={`h-1 w-full bg-gradient-to-r ${pub.categoryColor} rounded-t-3xl`}
                                style={{
                                    opacity: activeCard === pub.id ? 1 : 0.5,
                                    transition: 'opacity 0.4s',
                                }}
                            />

                            {/* Shine Effect */}
                            <div
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                    background:
                                        'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%)',
                                    opacity: activeCard === pub.id ? 1 : 0,
                                    transition: 'opacity 0.4s',
                                }}
                            />

                            {/* Card Content */}
                            <div className="flex flex-col flex-1 p-8">
                                {/* Top row: category pill + year */}
                                <div className="flex items-center justify-between mb-6">
                                    <span
                                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${pub.categoryBg} ${pub.categoryText}`}
                                    >
                                        <FileText className="w-3 h-3" />
                                        {pub.category}
                                    </span>
                                    <span className="text-gray-500 text-xs font-medium">
                                        {pub.year}
                                    </span>
                                </div>

                                {/* Icon */}
                                <div
                                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pub.categoryColor} flex items-center justify-center mb-6 shadow-lg`}
                                    style={{
                                        transform:
                                            activeCard === pub.id ? 'scale(1.1) rotate(5deg)' : 'scale(1)',
                                        transition: 'transform 0.4s',
                                    }}
                                >
                                    <BookOpen className="w-7 h-7 text-white" />
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-extrabold text-white mb-2 leading-snug group-hover:text-blue-200 transition-colors duration-300">
                                    {pub.title}
                                </h3>
                                <p className="text-sm font-semibold text-blue-300/70 mb-4 italic">
                                    {pub.subtitle}
                                </p>

                                {/* Description */}
                                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                                    {pub.description}
                                </p>

                                {/* Highlights */}
                                <ul className="space-y-2 mb-8">
                                    {pub.highlights.map((h, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                            <ChevronRight
                                                className={`w-4 h-4 flex-shrink-0 mt-0.5 bg-gradient-to-br ${pub.categoryColor} rounded-full p-0.5 text-white`}
                                            />
                                            <span className="text-gray-300 text-xs font-medium">{h}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Footer */}
                                <div className="flex items-center justify-between pt-6 border-t border-white/10 mt-auto">
                                    <span className="text-gray-500 text-xs">{pub.readTime}</span>
                                    <a
                                        href={pub.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r ${pub.categoryColor} shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300`}
                                    >
                                        Read Article
                                        <ArrowUpRight className="w-3.5 h-3.5" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.7 }}
                >
                    <a
                        href="https://drulhasorthopedic.com/doctor-articles/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-10 py-4 rounded-full text-sm font-bold text-white border border-white/20 hover:border-blue-400/50 hover:bg-white/5 transition-all duration-300 group"
                    >
                        <BookOpen className="w-5 h-5 text-blue-400" />
                        <span>View All Publications</span>
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                    </a>
                </motion.div>

            </div>
        </section>
    );
};

export default Publications;
