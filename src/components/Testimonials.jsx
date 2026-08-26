import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const GOOGLE_REVIEWS_URL = "https://maps.app.goo.gl/xVLUsccwhHui473FA";
const GOOGLE_WRITE_REVIEW_URL = "https://maps.app.goo.gl/xVLUsccwhHui473FA";

const GoogleGIcon = () => (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
);

const testimonialsData = [
    {
        id: 1,
        name: "Avinash Shinde",
        date: "2 weeks ago",
        avatarBg: "#10b981",
        text: "My hip joints were severely affected by arthritis, making it difficult for me to move, and I was really fearful of surgery. Nevertheless, Dr. Ulhas Sonar sir instilled confidence in me, and now after joint replacement, I am living a pain-free, beautiful life!",
        rating: 5
    },
    {
        id: 2,
        name: "Priyanka Deshmukh",
        date: "1 month ago",
        avatarBg: "#2563eb",
        text: "We consulted Dr. Ulhas for my mother's total knee replacement surgery. The robotic-assisted TKR procedure was performed smoothly, and her recovery was surprisingly fast with minimal pain. Truly world-class expertise!",
        rating: 5
    },
    {
        id: 3,
        name: "Kishor Patil",
        date: "2 months ago",
        avatarBg: "#8b5cf6",
        text: "Dr. Ulhas Sonar is one of the finest orthopedic surgeons. He diagnosed my knee cartilage issue accurately and recommended non-surgical joint preservation therapy. My mobility has improved drastically.",
        rating: 5
    },
    {
        id: 4,
        name: "Rajesh Kulkarni",
        date: "3 months ago",
        avatarBg: "#e11d48",
        text: "I had a shoulder ligament tear from a sports injury. Dr. Ulhas Sonar performed keyhole arthroscopy with remarkable precision. I returned to my active routine within weeks. Exceptional surgeon!",
        rating: 5
    },
    {
        id: 5,
        name: "Suresh Agarwal",
        date: "4 months ago",
        avatarBg: "#f59e0b",
        text: "Thorough clinical examination, polite behavior, and honest medical advice. Dr. Ulhas explains every step of the treatment plan clearly without rushing. Strongly recommend him for any joint issues.",
        rating: 5
    },
    {
        id: 6,
        name: "Meena Joshi",
        date: "5 months ago",
        avatarBg: "#06b6d4",
        text: "Deep gratitude to Dr. Ulhas Sonar for treating my father's complex hip fracture. His global training from UK and Europe reflects in his clinical excellence and patient care.",
        rating: 5
    }
];

const Testimonials = () => {
    const { t } = useLanguage();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardsPerPage, setCardsPerPage] = useState(4);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const updateCardsPerPage = () => {
            if (window.innerWidth < 640) {
                setCardsPerPage(1);
            } else if (window.innerWidth < 1024) {
                setCardsPerPage(2);
            } else {
                setCardsPerPage(4);
            }
        };

        updateCardsPerPage();
        window.addEventListener('resize', updateCardsPerPage);
        return () => window.removeEventListener('resize', updateCardsPerPage);
    }, []);

    const maxIndex = Math.max(0, testimonialsData.length - cardsPerPage);

    // Auto-sliding interval with pause on hover
    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(() => {
            setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
        }, 3500);
        return () => clearInterval(timer);
    }, [isPaused, maxIndex]);

    const handlePrev = () => {
        setCurrentIndex(prev => (prev === 0 ? maxIndex : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    };

    const visibleTestimonials = testimonialsData.slice(currentIndex, currentIndex + cardsPerPage);

    // Fill remaining slots if near the end for smooth looping
    if (visibleTestimonials.length < cardsPerPage) {
        visibleTestimonials.push(...testimonialsData.slice(0, cardsPerPage - visibleTestimonials.length));
    }

    const totalDots = maxIndex + 1;

    return (
        <section id="testimonials" className="py-20 md:py-24 bg-gradient-to-b from-blue-50/80 via-white to-blue-50/50 relative overflow-hidden text-slate-900">
            {/* Hero-matching Background Effects & Orbs */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-50/60 via-white/80 to-blue-50/60" />
                <motion.div
                    className="absolute rounded-full blur-[100px] pointer-events-none w-[600px] h-[600px] bg-blue-400/10 -top-20 -left-40"
                    animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.45, 0.3] }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute rounded-full blur-[100px] pointer-events-none w-[500px] h-[500px] bg-cyan-400/10 bottom-0 -right-20"
                    animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.45, 0.3] }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
                />
                <div
                    className="absolute inset-0 opacity-[0.08]"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, #3b82f6 1.5px, transparent 0)',
                        backgroundSize: '40px 40px',
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Title and Subtitle */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <motion.h2 
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-wider uppercase mb-3"
                    >
                        TESTIMONIALS
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-600 text-sm sm:text-base md:text-lg font-normal"
                    >
                        See what patients are saying about Dr. Ulhas Sonar
                    </motion.p>
                </div>

                {/* Carousel Container */}
                <div 
                    className="relative px-2 sm:px-10 md:px-12"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {/* Left Navigation Arrow */}
                    <button
                        onClick={handlePrev}
                        aria-label="Previous testimonial"
                        className="absolute left-0 sm:left-1 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-blue-600 hover:text-white border border-blue-100 text-blue-600 shadow-md flex items-center justify-center z-20 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    {/* Cards Grid */}
                    <div className="overflow-hidden py-4">
                        <AnimatePresence mode="wait">
                            <motion.div 
                                key={currentIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4 }}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
                            >
                                {visibleTestimonials.map((item) => (
                                    <a
                                        key={item.id}
                                        href={GOOGLE_REVIEWS_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-white rounded-3xl p-6 shadow-xl text-slate-800 flex flex-col justify-between min-h-[290px] border border-slate-100/80 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 block"
                                    >
                                        <div>
                                            {/* Header Row: Avatar + Name/Date + Google Icon */}
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    {/* Color-coded Letter Avatar */}
                                                    <div 
                                                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md shrink-0"
                                                        style={{ backgroundColor: item.avatarBg }}
                                                    >
                                                        {item.name[0]}
                                                    </div>

                                                    <div>
                                                        <h3 className="font-extrabold text-slate-900 text-base leading-tight">
                                                            {item.name}
                                                        </h3>
                                                        <p className="text-slate-400 text-xs mt-0.5 font-medium">
                                                            {item.date}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Google Badge */}
                                                <GoogleGIcon />
                                            </div>

                                            {/* Stars Rating */}
                                            <div className="flex gap-1 mb-3">
                                                {[...Array(item.rating)].map((_, i) => (
                                                    <Star key={i} size={16} fill="#F59E0B" className="text-[#F59E0B]" />
                                                ))}
                                            </div>

                                            {/* Review Body Text */}
                                            <p className="text-slate-600 text-sm leading-relaxed font-normal">
                                                {item.text}
                                            </p>
                                        </div>
                                    </a>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Right Navigation Arrow */}
                    <button
                        onClick={handleNext}
                        aria-label="Next testimonial"
                        className="absolute right-0 sm:right-1 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-blue-600 hover:text-white border border-blue-100 text-blue-600 shadow-md flex items-center justify-center z-20 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center items-center gap-2 mt-8 mb-8">
                    {Array.from({ length: totalDots }).map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            aria-label={`Go to slide ${idx + 1}`}
                            className={`transition-all duration-300 rounded-full cursor-pointer ${
                                currentIndex === idx 
                                    ? 'w-7 h-2.5 bg-blue-600' 
                                    : 'w-2.5 h-2.5 bg-blue-200 hover:bg-blue-400'
                            }`}
                        />
                    ))}
                </div>

                {/* LEAVE A REVIEW Button */}
                <div className="flex justify-center mt-6">
                    <a
                        href={GOOGLE_WRITE_REVIEW_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-9 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm tracking-widest uppercase rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                    >
                        LEAVE A REVIEW
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
