
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link, GraduationCap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const primaryPublications = [
    {
        id: 'p1',
        title: 'An update to remedial avenues for complaints about poor care in the NHS',
        journal: 'British Journal of Healthcare Management',
        details: 'April 2021, Vol. 27, No. 4 Policy Review',
        link: 'https://doi.org/10.12968/bjhc.2020.0005'
    },
    {
        id: 'p2',
        title: 'Outcomes of conservative management of primary patellar dislocation',
        journal: 'JBJS',
        details: 'Jul 2016, 98-B (SUPP 14, Proceedings) 5. Wrightington Hospital, UK',
        link: 'https://boneandjoint.org.uk/Article/10.1302/1358-992X.98BSUPP_14.IOSUK2016-005'
    },
    {
        id: 'p3',
        title: 'Comparative study between uses of stainless-steel Enders nails And Titanium elastic nails for treatment of fractures of shaft femur in children',
        journal: 'International journal of current research and review (IJCRR)',
        details: 'June 2014, Vol-6, issue-12, P. 56-63',
        link: 'https://ijcrr.com/article_html.php?did=837'
    },
    {
        id: 'p4',
        title: 'Comparative study between Trochanteric fixation nail and cemented bipolar hemi arthroplasty for treatment of unstable osteoporotic fractures of intertrochanteric neck femur in elderly',
        journal: 'International Organization of Scientific Research- Journal of Dental and Medical Sciences (IOSR-JDMS)',
        details: 'Jun. 2014, Vol-13, Issue-6 Ver. III, P. 31',
        link: 'https://www.iosrjournals.org/iosr-jdms/papers/Vol13-issue6/Version-3/G013633140.pdf'
    }
];

const collaborativePublications = [
    {
        id: 'c1',
        title: 'Long-term follow-up of platelet-rich plasma injections (PRP) for refractory lateral epicondylitis',
        journal: 'Journal of Orthopedics',
        details: 'Volume 16, Issue 6, November–December 2019, Pages 496-499',
        link: 'https://doi.org/10.1016/j.jor.2019.08.023'
    },
    {
        id: 'c2',
        title: 'Heterotopic ossification following anterior shoulder dislocation',
        journal: 'BMJ case Reports',
        details: '2018: bcr-2018-226968.',
        link: 'https://doi.org/10.1136/bcr-2018-226968'
    },
    {
        id: 'c3',
        title: 'Fragility fractures in the upper limb: proximal and distal humerus',
        journal: 'British Journal of Hospital Medicine',
        details: 'April 2018, Vol 79 (4). Royal Lancaster Infirmary, Lancaster',
        link: 'https://doi.org/10.1136/bcr-2018-226968'
    },
    {
        id: 'c4',
        title: 'Outcomes of distal femoral replacement for complex knee revisions with bone loss',
        journal: 'JBJS',
        details: 'Jul 2016, 98-B (SUPP14)7. Wrightington Hospital, UK',
        link: 'https://boneandjoint.org.uk/Article/10.1302/1358-992X.98BSUPP_14.IOSUK2016-006'
    },
    {
        id: 'c5',
        title: 'Cemented bipolar hemi arthroplasty in unstable osteoporotic fractures of intertrochanteric neck femur in elderly patients: A prospective study',
        journal: 'Indian Journal of Basic and Applied Medical Research',
        details: 'June 2014, Vol.-3, Issue-3, P. 85-94',
        link: 'https://www.ijbamr.com/assets/images/issues/pdf/85-94.pdf'
    },
    {
        id: 'c6',
        title: 'Trochanteric fixation nailing for the treatment of unstable osteoporotic intertrochanteric neck femur fractures in elderly patients. A prospective study evaluating results in Indian population',
        journal: 'International Journal of Recent Trends in Science and Technology',
        details: 'Vol. 12, issue- 1, Aug 2014',
        link: 'https://www.statperson.com/Journal/ScienceAndTechnology/Article/Volume12Issue1/12_1_20.pdf'
    }
];

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.8, ease: "easeOut" } 
    }
};

const Publications = () => {
    const { t } = useLanguage();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    return (
        <section
            ref={sectionRef}
            id="publications"
            className="pb-32 bg-white relative overflow-hidden"
        >
            {/* Subtle Gradient Background Element */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-gradient-to-b from-slate-50 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                {/* Section Header */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-blue-50 border border-blue-100 shadow-sm">
                        <GraduationCap className="w-4 h-4 text-blue-600" />
                        <span className="text-blue-700 text-[10px] font-black uppercase tracking-[0.2em]">
                            {t('publications.badge')}
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 font-montserrat tracking-tight leading-tight">
                        {t('publications.title')}{' '}
                        <span className="text-blue-600">{t('publications.titleHighlight')}</span>
                    </h2>

                    <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
                        {t('publications.description')}
                    </p>
                </motion.div>

                {/* Publications Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    
                    {/* 1st Author Card */}
                    <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : ""}
                        className="bg-white rounded-[40px] p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(30,58,138,0.08)] border border-blue-50/50 relative overflow-hidden group hover:shadow-[0_40px_80px_-20px_rgba(30,58,138,0.12)] transition-all duration-500"
                    >
                        {/* Card Accent */}
                        <div className="absolute top-0 left-0 w-2 h-full bg-blue-600/10 group-hover:bg-blue-600/20 transition-colors" />

                        <h3 className="text-[#162758] text-3xl font-montserrat font-black mb-10 tracking-tight flex items-center gap-4">
                            <span className="w-10 h-1 bg-blue-600/20 rounded-full" />
                            {t('publications.firstAuthor')}
                        </h3>
                        
                        <div className="space-y-0">
                            {primaryPublications.map((pub, index) => (
                                <div 
                                    key={pub.id} 
                                    className={`${index !== 0 ? 'border-t border-slate-100' : ''} py-8 first:pt-0 last:pb-0`}
                                >
                                    <a 
                                        href={pub.link} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex gap-6 group/item transition-all duration-300"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0 group-hover/item:bg-blue-600 group-hover/item:text-white transition-all duration-300">
                                            <Link size={16} className="text-slate-400 group-hover/item:text-white" />
                                        </div>
                                        <span className="text-slate-800 text-[16px] font-semibold leading-relaxed group-hover/item:text-blue-600 transition-colors decoration-2 underline-offset-8">
                                            {pub.title}. <span className="text-blue-600/80 group-hover/item:text-blue-700 font-bold">{pub.journal}</span>, {pub.details}
                                        </span>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* 2nd Author Card */}
                    <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : ""}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-[40px] p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(30,58,138,0.08)] border border-blue-50/50 relative overflow-hidden group hover:shadow-[0_40px_80px_-20px_rgba(30,58,138,0.12)] transition-all duration-500"
                    >
                        {/* Card Accent */}
                        <div className="absolute top-0 left-0 w-2 h-full bg-indigo-600/10 group-hover:bg-indigo-600/20 transition-colors" />

                        <h3 className="text-[#162758] text-3xl font-montserrat font-black mb-10 tracking-tight flex items-center gap-4">
                            <span className="w-10 h-1 bg-indigo-600/20 rounded-full" />
                            {t('publications.secondAuthor')}
                        </h3>
                        
                        <div className="space-y-0">
                            {collaborativePublications.map((pub, index) => (
                                <div 
                                    key={pub.id} 
                                    className={`${index !== 0 ? 'border-t border-slate-100' : ''} py-8 first:pt-0 last:pb-0`}
                                >
                                    <a 
                                        href={pub.link} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex gap-6 group/item transition-all duration-300"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0 group-hover/item:bg-indigo-600 group-hover/item:text-white transition-all duration-300">
                                            <Link size={16} className="text-slate-400 group-hover/item:text-white" />
                                        </div>
                                        <span className="text-slate-800 text-[16px] font-semibold leading-relaxed group-hover/item:text-indigo-600 transition-colors decoration-2 underline-offset-8">
                                            {pub.title}. <span className="text-indigo-600/80 group-hover/item:text-indigo-700 font-bold">{pub.journal}</span>, {pub.details}
                                        </span>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Stats simplified */}
                <motion.div
                    className="mt-20 pt-12 border-t border-slate-100 flex flex-wrap justify-center gap-16 md:gap-32"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5 }}
                >
                    <div className="text-center group">
                        <p className="text-4xl font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">10+</p>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black">{t('publications.stats.papers')}</p>
                    </div>
                    <div className="text-center group">
                        <p className="text-4xl font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">UK/India</p>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black">{t('publications.stats.impact')}</p>
                    </div>
                    <div className="text-center group">
                        <p className="text-4xl font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">JBJS</p>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black">{t('publications.stats.journals')}</p>
                    </div>
                </motion.div>
            </div>
        </section>

    );
};

export default Publications;
