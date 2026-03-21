import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import runnerKneeImg from '../assets/runner-knee-injury.png';
import shoulderInjuryImg from '../assets/shoulder-sports-injury.png';
import runnerAnkleImg from '../assets/runner-ankle-injury.png';
import handWristInjuryImg from '../assets/hand-wrist-injury.png';
import backNeckInjuryImg from '../assets/back-neck-injury.png';

const solutions = [
    {
        title: "Hand & Wrist",
        image: handWristInjuryImg,
        color: "bg-blue-50"
    },
    {
        title: "Back & Neck",
        image: backNeckInjuryImg,
        color: "bg-blue-50"
    },
    {
        title: "Foot & Ankle",
        image: runnerAnkleImg,
        color: "bg-blue-50"
    },
    {
        title: "Elbow",
        image: "https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?q=80&w=800&auto=format&fit=crop",
        color: "bg-blue-50"
    },
    {
        title: "Knee & Leg",
        image: runnerKneeImg,
        color: "bg-blue-50"
    },
    {
        title: "Hip & Thigh",
        image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=800&auto=format&fit=crop",
        color: "bg-blue-50"
    },
    {
        title: "Shoulder",
        image: shoulderInjuryImg,
        color: "bg-blue-50"
    }
];

const SpecializedSolutions = () => {
    const { language } = useLanguage();
    const isRtl = language === 'AR';
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
        <section className="py-20 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl lg:text-5xl font-montserrat text-[#333] mb-6 font-extrabold tracking-tight"
                    >
                        Personalized solutions for every orthopedic need
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-[#555] max-w-2xl mx-auto text-sm md:text-md"
                    >
                        FOI physicians provide a responsive, personalized care plan for any musculoskeletal injury or condition.
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
                                    src={item.title === 'Hip & Thigh' ? 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop' : item.image}
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
                        className="group flex items-center justify-center gap-3 px-10 py-4 rounded-xl font-black text-sm tracking-[0.15em] uppercase bg-[#0088cc] text-white hover:bg-[#006699] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 w-fit"
                    >
                        View All Services & Treatments
                        <ArrowRight className={`w-5 h-5 transition-transform group-hover:${isRtl ? '-translate-x-1' : 'translate-x-1'}`} />
                    </Link>
                </motion.div>
            </div>

            {/* Background Decorative Curves */}
            <div className="absolute top-0 end-0 -z-10 w-1/3 h-full overflow-hidden opacity-10">
                <svg viewBox="0 0 200 600" className="w-full h-full text-[#0077b6]">
                    <path d="M200 0 Q 50 300 200 600" fill="none" stroke="currentColor" strokeWidth="2" />
                    <path d="M250 50 Q 100 350 250 650" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
            </div>
        </section>
    );
};

export default SpecializedSolutions;
