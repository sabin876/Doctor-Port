
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

    // Define the slides array with imported images and content
    const slidesData = [
        {
            image: slide1,
            heading_top: "Move Without",
            heading_bottom: "Limits",
            description: "Advanced Joint Replacement & Sports Medicine. Precision care designed for your swift recovery and long-term joint health."
        },
        {
            image: slide2,
            heading_top: "Expert Orthopedic",
            heading_bottom: "Care",
            description: "Global expertise in upper limb and robotic-assisted knee surgery. Specialized in helping you return to your active life."
        },
        {
            image: slide3,
            heading_top: "Recovery Focused",
            heading_bottom: "Excellence",
            description: "Personalized orthopedic treatments tailored to your lifestyle. Combining innovation with compassionate patient care."
        }
    ];

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slidesData.length);
        }, 6000); // Increased duration slightly for reading
        return () => clearInterval(timer);
    }, [slidesData.length]);

    return (
        <div id="home" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-[#043275]">
            {/* Subtle background pattern - reduced opacity for dark theme */}
            <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Column - Content */}
                    <div className="text-left order-2 lg:order-1 min-h-[500px] flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-bold mb-8 backdrop-blur-sm"
                        >
                            <span className="w-2 h-2 rounded-full bg-cyan-400 mr-2 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)]"></span>
                            Leading Orthopedic Specialist in Dubai
                        </motion.div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSlide}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="overflow-hidden mb-6">
                                    <motion.h1
                                        className="text-5xl md:text-7xl lg:text-8xl font-montserrat font-extrabold text-white leading-[1.05] tracking-tight"
                                    >
                                        <motion.span
                                            initial={{ y: 50, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ duration: 0.8, delay: 0.2 }}
                                            className="inline-block mr-3"
                                        >
                                            {slidesData[currentSlide].heading_top}
                                        </motion.span>
                                        <br className="hidden md:block" />
                                        <motion.span
                                            initial={{ y: 50, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ duration: 0.8, delay: 0.4 }}
                                            className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-white animate-shimmer bg-[length:200%_auto]"
                                        >
                                            {slidesData[currentSlide].heading_bottom}
                                        </motion.span>
                                    </motion.h1>
                                </div>

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.6 }}
                                    className="text-xl text-white/90 mb-10 leading-relaxed max-w-xl font-normal"
                                >
                                    {slidesData[currentSlide].description}
                                </motion.p>
                            </motion.div>
                        </AnimatePresence>

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
                        className="relative w-full h-[500px] lg:h-[600px] order-1 lg:order-2"
                    >
                        <div className="relative z-10 w-full h-full overflow-hidden">
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
                                        src={slidesData[currentSlide].image}
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

