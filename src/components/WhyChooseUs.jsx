import { ShieldCheck, Zap, Heart, UserCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const WhyChooseUs = () => {
    const { language } = useLanguage();
    const isRtl = language === 'AR';
    const features = [
        {
            title: "Expert Care",
            desc: "14+ years of complex orthopaedic care experience and surgical precision.",
            icon: ShieldCheck,
            color: "text-blue-600",
            bg: "bg-blue-100"
        },
        {
            title: "Advanced Technology",
            desc: "Using the latest medical technologies and techniques for optimal surgical outcomes.",
            icon: Zap,
            color: "text-yellow-600",
            bg: "bg-yellow-100"
        },
        {
            title: "Quick Recovery",
            desc: "Specialized minimally invasive techniques for faster healing and reduced hospital stays.",
            icon: Heart,
            color: "text-red-600",
            bg: "bg-red-100"
        },
        {
            title: "Personalized Care",
            desc: "Each treatment plan is carefully tailored to address your specific needs and conditions.",
            icon: UserCheck, // Changed from User to UserCheck for variety
            color: "text-green-600",
            bg: "bg-green-100"
        }
    ];

    return (
        <section id="about" className="py-32 bg-[#f8fafc] relative overflow-hidden">
            {/* Background decoration */}
            <div className={`absolute top-0 start-1/2 ${isRtl ? 'translate-x-1/2' : '-translate-x-1/2'} w-full h-full bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.08),transparent_70%)] z-0`}></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-1.5 mb-4 rounded-full bg-primary-50 text-primary-600 text-xs font-black uppercase tracking-[0.2em]"
                    >
                        Why Choose Dr. Ulhas
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl md:text-5xl font-montserrat font-extrabold text-blue-900 mb-6 tracking-tight"
                    >
                        Why Trust Your Care to <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Dr. Ulhas Sonar?</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-gray-500 max-w-2xl mx-auto text-lg font-medium"
                    >
                        Pioneering advanced orthopedic solutions with a patient-first approach in the heart of Dubai.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-white rounded-[2rem] p-8 shadow-premium border border-white hover:border-primary-100 hover:shadow-premium-hover transition-all duration-500 group"
                        >
                            <div className={`w-16 h-16 ${feature.bg} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                                <feature.icon className={`h-8 w-8 ${feature.color}`} />
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight uppercase italic">{feature.title}</h3>
                            <p className="text-gray-500 leading-relaxed font-medium text-sm">
                                {feature.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Additional "Holistic" Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-32 bg-primary-950 rounded-[3rem] p-10 md:p-20 relative overflow-hidden group shadow-2xl"
                >
                    <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="w-12 h-1.5 bg-blue-500 mb-8 rounded-full"></div>
                            <h3 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter uppercase italic leading-[1.1]">
                                World-Class Orthopedics <br />
                                <span className="text-blue-400">In The Heart of UAE</span>
                            </h3>
                            <p className="text-xl text-blue-100/80 mb-10 font-medium leading-relaxed max-w-xl">
                                Leveraging international expertise and cutting-edge technology to restore your mobility and enhance your quality of life.
                            </p>
                            <a href="#contact" className="inline-flex items-center bg-white text-primary-950 font-black py-4 px-10 rounded-2xl hover:bg-blue-50 transition-all hover:scale-105 shadow-xl">
                                Start Your Recovery
                                <Zap className="ms-2 w-5 h-5 fill-primary-950 text-primary-950" />
                            </a>
                        </div>
                        <div className="hidden lg:flex justify-end">
                            <div className="relative w-80 h-80 group-hover:scale-110 transition-transform duration-1000">
                                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                                <div className="absolute inset-0 border-2 border-white/5 rounded-full animate-[spin_20s_linear_infinite]"></div>
                                <ShieldCheck className="relative z-10 w-full h-full text-white/5 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]" />
                            </div>
                        </div>
                    </div>
                    {/* Decorative background circles */}
                    <div className="absolute -top-20 -end-20 w-[30rem] h-[30rem] bg-blue-600/10 rounded-full blur-[100px]"></div>
                    <div className="absolute -bottom-20 -start-20 w-[30rem] h-[30rem] bg-indigo-600/10 rounded-full blur-[100px]"></div>
                </motion.div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
