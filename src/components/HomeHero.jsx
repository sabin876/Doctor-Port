
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronRight } from 'lucide-react';
import { Link } from 'react-scroll';

// Import images for the slideshow
import slide1 from '../assets/Hero section1.png';
import slide2 from '../assets/Hero Section 2.png';
import slide3 from '../assets/Hero Section 3.png';

const HomeHero = () => {
    const [currentSlide, setCurrentSlide] = React.useState(0);

    // Define the slides array with imported images
    const slides = [
        slide1,
        slide2,
        slide3,
    ];

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]); // Add slides.length to dependency array

    return (
        <div id="home" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-[#043275]">
            {/* Subtle background pattern - reduced opacity for dark theme */}
            <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Column - Content */}
                    <div className="text-left order-2 lg:order-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-bold mb-8 backdrop-blur-sm"
                        >
                            <span className="w-2 h-2 rounded-full bg-cyan-400 mr-2 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)]"></span>
                            Leading Orthopedic Specialist in Dubai
                        </motion.div>

                        <div className="overflow-hidden mb-6">
                            <motion.h1
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: {
                                        opacity: 1,
                                        transition: {
                                            staggerChildren: 0.12,
                                            delayChildren: 0.4
                                        }
                                    }
                                }}
                                className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[1.05] tracking-tight"
                            >
                                <motion.span
                                    variants={{
                                        hidden: { y: 80, opacity: 0 },
                                        visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] } }
                                    }}
                                    className="inline-block mr-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-white animate-shimmer bg-[length:200%_auto]"
                                >
                                    Move Without
                                </motion.span>
                                <br className="hidden md:block" />
                                <motion.span
                                    variants={{
                                        hidden: { y: 80, opacity: 0 },
                                        visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.2 } }
                                    }}
                                    className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-white animate-shimmer bg-[length:200%_auto]"
                                >
                                    Limits
                                </motion.span>
                            </motion.h1>
                        </div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="text-xl text-white/90 mb-10 leading-relaxed max-w-xl font-normal"
                        >
                            Advanced Joint Replacement & Sports Medicine. Precision care designed for your swift recovery and long-term joint health.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1 }}
                            className="flex flex-col sm:flex-row gap-5 mb-16"
                        >
                            <motion.a
                                href="https://csh.ae/find-a-doctor?name=ulhas"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative flex items-center justify-center px-8 py-4 bg-white text-[#043275] rounded-xl font-bold text-lg transition-all hover:bg-blue-50 active:scale-95 shadow-xl shadow-blue-900/20 overflow-hidden"
                                whileHover={{ scale: 1.05 }}
                                animate={{
                                    boxShadow: ["0px 0px 0px rgba(255,255,255,0)", "0px 0px 20px rgba(255,255,255,0.4)", "0px 0px 0px rgba(255,255,255,0)"]
                                }}
                                transition={{
                                    boxShadow: { duration: 2, repeat: Infinity }
                                }}
                            >
                                {/* Ping animation effect behind the button */}
                                <span className="absolute inset-0 rounded-xl bg-white/20 animate-ping pointer-events-none"></span>

                                <motion.span
                                    className="relative z-10 flex items-center"
                                    whileHover={{ x: 5 }}
                                >
                                    Book Consult
                                    <motion.span
                                        animate={{ x: [0, 4, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        <Calendar className="ml-2 w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                                    </motion.span>
                                </motion.span>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                            </motion.a>
                            <Link
                                to="services"
                                smooth={true}
                                offset={-70}
                                className="flex items-center justify-center px-8 py-4 bg-white/10 text-white border border-white/20 rounded-xl font-bold text-lg transition-all hover:bg-white/20 hover:border-white/40 active:scale-95 cursor-pointer backdrop-blur-md"
                            >
                                Explore Services
                                <ChevronRight className="ml-2 w-5 h-5 text-white/80" />
                            </Link>
                        </motion.div>

                        {/* Stats - Compact Row */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 1.4 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 pt-8"
                        >
                            {[
                                { number: '15+', label: 'Years' },
                                { number: '5k+', label: 'Patients' },
                                { number: '3k+', label: 'Surgeries' },
                                { number: '4.9', label: 'Rating' }
                            ].map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1.5 + index * 0.1 }}
                                >
                                    <div className="text-3xl font-black text-white mb-1">
                                        {stat.number}
                                    </div>
                                    <div className="text-xs text-blue-200/70 font-bold uppercase tracking-wider">
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                    </div>

                    {/* Right Column - Slideshow */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative w-full h-[500px] lg:h-[600px] order-1 lg:order-2 -mt-10 lg:-mt-20"
                    >
                        <div className="relative z-10 w-full h-full rounded-[2rem] overflow-hidden shadow-2xl">
                            <AnimatePresence mode='wait'>
                                <motion.div
                                    key={currentSlide}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1.5 }}
                                    className="relative w-full h-full"
                                >
                                    <img
                                        src={slides[currentSlide]}
                                        alt="Hero Slide"
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};
export default HomeHero;

