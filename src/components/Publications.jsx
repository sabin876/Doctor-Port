
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { BookOpen, ArrowUpRight, FileText, ChevronRight, Sparkles, GraduationCap, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const primaryPublications = [
    {
        id: 'p1',
        year: '2021',
        title: 'An update to remedial avenues for complaints about poor care in the NHS',
        journal: 'British Journal of Healthcare Management',
        details: 'April 2021, Vol. 27, No. 4 Policy Review',
        link: 'https://doi.org/10.12968/bjhc.2020.0005',
        doi: '10.12968/bjhc.2020.0005'
    },
    {
        id: 'p2',
        year: '2016',
        title: 'Outcomes of conservative management of primary patellar dislocation',
        journal: 'JBJS',
        details: 'Jul 2016, 98-B (SUPP 14, Proceedings) 5. Wrightington Hospital, UK',
        link: 'https://boneandjoint.org.uk/Article/10.1302/1358-992X.98BSUPP_14.IOSUK2016-005'
    },
    {
        id: 'p3',
        year: '2014',
        title: 'Comparative study between uses of stainless-steel Enders nails And Titanium elastic nails for treatment of fractures of shaft femur in children',
        journal: 'International journal of current research and review (IJCRR)',
        details: 'June 2014, Vol-6, issue-12, P. 56-63',
        link: 'https://ijcrr.com/article_html.php?did=837'
    },
    {
        id: 'p4',
        year: '2014',
        title: 'Comparative study between Trochanteric fixation nail and cemented bipolar hemi arthroplasty for treatment of unstable osteoporotic fractures of intertrochanteric neck femur in elderly',
        journal: 'International Organization of Scientific Research- Journal of Dental and Medical Sciences (IOSR-JDMS)',
        details: 'Jun. 2014, Vol-13, Issue-6 Ver. III, P. 31',
        link: 'https://www.iosrjournals.org/iosr-jdms/papers/Vol13-issue6/Version-3/G013633140.pdf'
    }
];

const collaborativePublications = [
    {
        id: 'c1',
        year: '2019',
        title: 'Long-term follow-up of platelet-rich plasma injections (PRP) for refractory lateral epicondylitis',
        journal: 'Journal of Orthopedics',
        details: 'Volume 16, Issue 6, November–December 2019, Pages 496-499',
        link: 'https://doi.org/10.1016/j.jor.2019.08.023'
    },
    {
        id: 'c2',
        year: '2018',
        title: 'Heterotopic ossification following anterior shoulder dislocation',
        journal: 'BMJ case Reports',
        details: '2018: bcr-2018-226968.',
        link: 'https://doi.org/10.1136/bcr-2018-226968'
    },
    {
        id: 'c3',
        year: '2018',
        title: 'Fragility fractures in the upper limb: proximal and distal humerus',
        journal: 'British Journal of Hospital Medicine',
        details: 'April 2018, Vol 79 (4). Royal Lancaster Infirmary, Lancaster',
        link: 'https://doi.org/10.1136/bcr-2018-226968'
    },
    {
        id: 'c4',
        year: '2016',
        title: 'Outcomes of distal femoral replacement for complex knee revisions with bone loss',
        journal: 'JBJS',
        details: 'Jul 2016, 98-B (SUPP14)7. Wrightington Hospital, UK',
        link: 'https://boneandjoint.org.uk/Article/10.1302/1358-992X.98BSUPP_14.IOSUK2016-006'
    },
    {
        id: 'c5',
        year: '2014',
        title: 'Cemented bipolar hemi arthroplasty in unstable osteoporotic fractures of intertrochanteric neck femur in elderly patients: A prospective study',
        journal: 'Indian Journal of Basic and Applied Medical Research',
        details: 'June 2014, Vol.-3, Issue-3, P. 85-94',
        link: 'https://www.ijbamr.com/assets/images/issues/pdf/85-94.pdf'
    },
    {
        id: 'c6',
        year: '2014',
        title: 'Trochanteric fixation nailing for the treatment of unstable osteoporotic intertrochanteric neck femur fractures in elderly patients. A prospective study evaluating results in Indian population',
        journal: 'International Journal of Recent Trends in Science and Technology',
        details: 'Vol. 12, issue- 1, Aug 2014',
        link: 'https://www.statperson.com/Journal/ScienceAndTechnology/Article/Volume12Issue1/12_1_20.pdf'
    }
];

const listVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { 
            duration: 0.8, 
            staggerChildren: 0.1 
        } 
    }
};

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
        opacity: 1, 
        x: 0, 
        transition: { duration: 0.5 } 
    }
};

const Publications = () => {
    const { t } = useLanguage();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
    const [activeTab, setActiveTab] = useState('primary');

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

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8 border border-blue-400/30"
                        style={{ background: 'rgba(59, 130, 246, 0.12)' }}
                    >
                        <GraduationCap className="w-4 h-4 text-blue-400" />
                        <span className="text-blue-300 text-xs font-bold uppercase tracking-[0.2em]">
                            {t('publications.badge')}
                        </span>
                    </motion.div>

                    <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6 font-montserrat leading-tight tracking-tight">
                        {t('publications.title')}{' '}
                        <span
                            className="relative inline-block"
                            style={{
                                background: 'linear-gradient(90deg, #60a5fa, #a78bfa, #34d399)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            {t('publications.titleHighlight')}
                        </span>
                    </h2>

                    <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        {t('publications.description')}
                    </p>
                </motion.div>

                {/* Category Switcher */}
                <div className="flex justify-center mb-16">
                    <div className="inline-flex p-1.5 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl">
                        <button
                            onClick={() => setActiveTab('primary')}
                            className={`flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                                activeTab === 'primary' 
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' 
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            <FileText className="w-4 h-4" />
                            {t('publications.tabs.primary')}
                        </button>
                        <button
                            onClick={() => setActiveTab('collaborative')}
                            className={`flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                                activeTab === 'collaborative' 
                                ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40' 
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            <Award className="w-4 h-4" />
                            {t('publications.tabs.collaborative')}
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <motion.div
                    key={activeTab}
                    variants={listVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6 max-w-5xl mx-auto"
                >
                    {(activeTab === 'primary' ? primaryPublications : collaborativePublications).map((pub) => (
                        <motion.div
                            key={pub.id}
                            variants={itemVariants}
                            className="group relative flex flex-col md:flex-row gap-6 p-6 md:p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 overflow-hidden"
                        >
                            {/* Year Marker */}
                            <div className="flex-shrink-0">
                                <span className={`text-4xl md:text-5xl font-black opacity-10 font-montserrat ${activeTab === 'primary' ? 'text-blue-500' : 'text-purple-500'}`}>
                                    {pub.year}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${activeTab === 'primary' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'}`}>
                                        {pub.journal}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300 leading-snug">
                                    {pub.title}
                                </h3>
                                <p className="text-gray-400 text-sm italic">
                                    {pub.details}
                                </p>
                            </div>

                            {/* Action */}
                            <div className="flex items-center md:items-start pt-4 md:pt-0">
                                <a
                                    href={pub.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`inline-flex items-center gap-3 px-6 py-3 rounded-full text-xs font-bold text-white transition-all duration-300 group ${
                                        activeTab === 'primary' 
                                        ? 'bg-blue-600/10 hover:bg-blue-600' 
                                        : 'bg-purple-600/10 hover:bg-purple-600'
                                    }`}
                                >
                                    <span>{t('publications.action')}</span>
                                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </a>
                            </div>

                            {/* Decorative Background Accent */}
                            <div className={`absolute top-0 right-0 w-24 h-24 blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none rounded-full ${activeTab === 'primary' ? 'bg-blue-500' : 'bg-purple-500'}`} />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Global Stats/Badge */}
                <motion.div
                    className="mt-24 pt-12 border-t border-white/5 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
                        <div className="text-center">
                            <p className="text-3xl font-extrabold text-white mb-1">10+</p>
                            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">{t('publications.stats.papers')}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-extrabold text-white mb-1">UK/India</p>
                            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">{t('publications.stats.impact')}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-extrabold text-white mb-1">JBJS</p>
                            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">{t('publications.stats.journals')}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-extrabold text-white mb-1">Peer</p>
                            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">{t('publications.stats.reviewed')}</p>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default Publications;
