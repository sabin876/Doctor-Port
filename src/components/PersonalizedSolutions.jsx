import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Activity } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import runnerAnkleImg from '../assets/knee and angle.webp';
import handWristInjuryImg from '../assets/hand and wist.webp';
import backNeckInjuryImg from '../assets/Back and Neck.webp';
import kneeArthroscopyImg from '../assets/knee.webp';
import sportsMedicineImg from '../assets/sports injury.webp';
import shoulderPainImg from '../assets/Shoulder.webp';
import hipPainImg from '../assets/Hip.webp';

const OrthoAnimation = () => (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Animated grid dots */}
        <div className="absolute inset-0 opacity-[0.02]"
            style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, #0088cc 2px, transparent 0)',
                backgroundSize: '48px 48px'
            }}
        />
        <svg viewBox="0 0 1200 800" className="w-full h-full text-blue-500/10 absolute inset-0">
            {/* Animated spine / joints representation */}
            <motion.path
                d="M 150 100 Q 250 300 150 500 T 150 900"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray="10 20"
                animate={{
                    strokeDashoffset: [0, 100]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            />
            {/* Floating connecting nodes */}
            {[0, 1, 2].map((i) => (
                <motion.circle
                    key={i}
                    cx={150 + Math.sin(i) * 50}
                    cy={200 + i * 200}
                    r="8"
                    fill="#0088cc"
                    className="opacity-30"
                    animate={{ scale: [1, 2, 1], opacity: [0.2, 0.6, 0.2] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i }}
                />
            ))}
            
            {/* Right side animated curve */}
            <motion.path
                d="M 1100 0 C 1200 200 1000 400 1100 800"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            />
        </svg>

        {/* Floating Icons */}
        <motion.div
            animate={{
                y: [0, -30, 0],
                rotate: [0, 10, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[30%] right-[15%] opacity-[0.04] text-[#0088cc]"
        >
            <Activity strokeWidth={1} size={180} />
        </motion.div>

        {/* Medical Crosses */}
        <motion.div
            animate={{
                scale: [1, 1.2, 1],
                opacity: [0.02, 0.05, 0.02],
                rotate: [0, 90]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[20%] left-[10%] text-[#0088cc] w-40 h-40"
        >
            <svg viewBox="0 0 100 100" fill="currentColor">
                <path d="M40 0h20v40h40v20H60v40H40V60H0V40h40V0z"/>
            </svg>
        </motion.div>
    </div>
);

const PersonalizedSolutions = () => {
    const { t, language } = useLanguage();
    const isRtl = language === 'AR';

    // Ordered: Knee, Sports Injuries, Shoulder, Foot & Ankle, Back & Neck, Hip, Hand & Wrist
    const solutions = [
        {
            title: t('personalizedSolutions.items.4.title'), // Knee
            image: kneeArthroscopyImg,
            color: "bg-blue-50"
        },
        {
            title: t('personalizedSolutions.items.6.title'), // Sports Injuries
            image: sportsMedicineImg,
            color: "bg-blue-50"
        },
        {
            title: t('personalizedSolutions.items.3.title'), // Shoulder
            image: shoulderPainImg,
            color: "bg-blue-50"
        },
        {
            title: t('personalizedSolutions.items.2.title'), // Foot & Ankle
            image: runnerAnkleImg,
            color: "bg-blue-50"
        },
        {
            title: t('personalizedSolutions.items.1.title'), // Back & Neck
            image: backNeckInjuryImg,
            color: "bg-blue-50"
        },
        {
            title: t('personalizedSolutions.items.5.title'), // Hip
            image: hipPainImg,
            color: "bg-blue-50"
        },
        {
            title: t('personalizedSolutions.items.0.title'), // Hand & Wrist
            image: handWristInjuryImg,
            color: "bg-blue-50"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }
    };

    return (
        <section id="personalized-solutions" className="py-20 bg-white relative overflow-hidden">
            <OrthoAnimation />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl lg:text-5xl font-montserrat text-[#333] mb-6 font-extrabold tracking-tight"
                    >
                        {t('personalizedSolutions.title')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-[#555] max-w-2xl mx-auto text-sm md:text-md"
                    >
                        {t('personalizedSolutions.description')}
                    </motion.p>
                </div>

                {/* Solutions Grid */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6 justify-center"
                >
                    {solutions.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="group cursor-pointer flex flex-col items-center"
                        >
                            <div className="relative w-full aspect-square mb-6 rounded-[2rem] overflow-hidden bg-[#f0f7ff] group-hover:shadow-2xl group-hover:shadow-blue-200/50 transition-all duration-500">
                                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                {/* Blue curve overlay like in the image */}
                                <div className="absolute inset-0 pointer-events-none p-4 z-20">
                                    <svg viewBox="0 0 100 100" className="w-full h-full opacity-20 group-hover:opacity-60 transition-all duration-500">
                                        <path
                                            d="M10 90 Q 50 10 90 90"
                                            fill="none"
                                            stroke="#0088cc"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-center font-bold text-[#0088cc] text-[10px] sm:text-[12px] md:text-[13px] uppercase tracking-wider group-hover:text-[#006699] transition-colors leading-tight max-w-[110px]">
                                {item.title}
                            </h3>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Footer Link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-16 text-center flex justify-center"
                >
                    <Link
                        to="/services"
                        className="group flex items-center justify-center gap-2 font-black text-sm tracking-[0.15em] uppercase text-[#0088cc] hover:text-[#006699] transition-colors duration-300 w-fit"
                    >
                        {t('personalizedSolutions.viewAll')}
                        <ArrowRight className={`w-5 h-5 transition-transform group-hover:${isRtl ? '-translate-x-1' : 'translate-x-1'}`} />
                    </Link>
                </motion.div>

            </div>


        </section>
    );
};

export default PersonalizedSolutions;
