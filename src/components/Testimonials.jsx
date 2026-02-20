import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const testimonials = [
    {
        name: "Avinash Shinde",
        text: "having a wonderful life My hip joints were severely affected by arthritis, making it difficult for me to move, and I was really fearful of surgery. Nevertheless, sir instilled confidence in me, and now that I have both hip joints replaced, I am living a beautiful life. Regards, sir.",
        date: "9 days ago",
        verified: true,
        image: "https://i.pravatar.cc/150?u=avinash"
    },
    {
        name: "Masood Shah",
        date: "1 month ago",
        verified: true,
        text: "Excellent service and care. Dr. Ulhas is very professional and explained the procedure clearly. I'm very happy with my recovery.",
        image: "https://i.pravatar.cc/150?u=masood"
    },
    {
        name: "Rahul Shah",
        date: "2 months ago",
        verified: true,
        text: "Highly recommended for any orthopedic issues. The staff is also very supportive. My knee pain is gone!",
        image: "https://i.pravatar.cc/150?u=rahul"
    },
    {
        name: "Beth Shah",
        date: "3 months ago",
        verified: true,
        text: "The best orthopedic doctor in the region. Truly life-changing experience. Thank you sir!",
        image: "https://i.pravatar.cc/150?u=beth"
    },
    {
        name: "Arqam Shah",
        date: "4 months ago",
        verified: true,
        text: "Very thorough examination and honest advice. Feeling much better after following the prescribed treatment.",
        image: "https://i.pravatar.cc/150?u=arqam"
    },
    {
        name: "Mohammed Shah",
        date: "5 months ago",
        verified: true,
        text: "Professional, caring, and efficient. Great experience overall. God bless you sir.",
        image: "https://i.pravatar.cc/150?u=mohammed"
    }
];

const Testimonials = () => {
    const { language } = useLanguage();
    const isRtl = language === 'AR';
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const scrollRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Auto-slide logic
    useEffect(() => {
        if (isPaused) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [isPaused]);

    const next = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prev = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section
            id="testimonials"
            className="py-24 bg-gray-50/50 text-gray-900 overflow-hidden relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight text-blue-900">
                        {t('testimonials.title')}
                    </h2>
                    <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full mb-8"></div>

                    {/* Google-themed "Write a Review" Button with subtle pulse animation */}
                    <div className="flex justify-center flex-col items-center gap-2">
                        <motion.a
                            href="https://maps.app.goo.gl/dVBB87ar5qR33eeL9"
                            target="_blank"
                            rel="noopener noreferrer"
                            animate={{
                                boxShadow: ["0px 10px 20px rgba(234, 67, 53, 0.1)", "0px 15px 30px rgba(234, 67, 53, 0.2)", "0px 10px 20px rgba(234, 67, 53, 0.1)"]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            whileHover={{ scale: 1.05, boxShadow: "0px 20px 40px rgba(234, 67, 53, 0.3)" }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3.5 bg-white border-2 border-[#ea4335] text-gray-800 font-bold rounded-2xl transition-all duration-300 flex items-center gap-3 group relative overflow-hidden"
                        >
                            <div className="absolute top-0 start-0 w-full h-1 flex">
                                <div className="flex-1 h-full bg-[#4285f4]"></div>
                                <div className="flex-1 h-full bg-[#ea4335]"></div>
                                <div className="flex-1 h-full bg-[#fbbc05]"></div>
                                <div className="flex-1 h-full bg-[#34a853]"></div>
                            </div>
                            <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            <span className="bg-gradient-to-r from-[#4285f4] via-[#ea4335] to-[#fbbc05] bg-clip-text text-transparent">{t('testimonials.reviewButton')}</span>
                            <ChevronRight className={`w-5 h-5 text-gray-400 group-hover:${isRtl ? '-translate-x-1' : 'translate-x-1'} group-hover:text-[#34a853] transition-all`} />
                        </motion.a>
                    </div>
                </motion.div>

                <div className="relative group/nav">
                    {/* Navigation Arrows */}
                    <button
                        onClick={prev}
                        className="absolute start-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 p-3 rounded-full bg-white/90 hover:bg-white shadow-xl border border-gray-100 transition-all opacity-0 group-hover/nav:opacity-100 hidden lg:block text-blue-600"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={next}
                        className="absolute end-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 p-3 rounded-full bg-white/90 hover:bg-white shadow-xl border border-gray-100 transition-all opacity-0 group-hover/nav:opacity-100 hidden lg:block text-blue-600"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Carousel Container */}
                    <div className="flex gap-6 overflow-hidden pt-4">
                        <motion.div
                            className="flex gap-6 w-full"
                            animate={{ x: isRtl ? (isMobile ? `${currentIndex * 100}%` : `${currentIndex * (100 / 3.4)}%`) : (isMobile ? `-${currentIndex * 100}%` : `-${currentIndex * (100 / 3.4)}%`) }}
                            transition={{ type: "spring", stiffness: 300, damping: 35 }}
                        >
                            {testimonials.map((testimonial, index) => (
                                <motion.div
                                    key={index}
                                    className="min-w-full md:min-w-[calc(28.5%-1.5rem)] flex flex-col"
                                >
                                    {/* Testimonial Card */}
                                    <div className="w-full bg-white p-6 md:p-7 rounded-[2rem] border border-gray-200/60 shadow-xl shadow-gray-200/40 relative h-full flex flex-col hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 group">
                                        {/* Header inside Card - Matching Reference */}
                                        <div className="flex items-center gap-4 mb-5">
                                            {/* Profile Photo / Avatar with Orange Star Badge */}
                                            <div className="relative shrink-0">
                                                <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center font-bold text-xl bg-gray-100 text-gray-700 shadow-inner group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500 border border-gray-100">
                                                    {testimonial.image ? (
                                                        <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        testimonial.name[0]
                                                    )}
                                                </div>
                                                {/* Orange Star Badge from Reference */}
                                                <div className="absolute -bottom-1 -end-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md border border-gray-50">
                                                    <div className="w-4.5 h-4.5 bg-[#f38133] rounded-full flex items-center justify-center">
                                                        <Star size={10} fill="white" className="text-white" />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Name, Verification, and "on Google" */}
                                            <div className="flex-grow">
                                                <div className="flex items-center gap-1.5 flex-wrap">
                                                    <h4 className="font-bold text-lg text-gray-900 leading-tight">{testimonial.name}</h4>
                                                    {testimonial.verified && <CheckCircle2 className="w-4.5 h-4.5 text-[#1a73e8] fill-[#1a73e8]/10" />}
                                                </div>
                                                <div className="flex items-center gap-1 mt-0.5">
                                                    <p className="text-gray-500 text-sm font-medium">{testimonial.date} on</p>
                                                    {/* Colorful Google Logo and Text */}
                                                    <div className="flex items-center gap-1 ms-0.5">
                                                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                                        </svg>
                                                        <span className="text-[#5f6368] text-sm font-semibold tracking-tight">Google</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Stars and Text */}
                                        <div className="flex gap-0.5 mb-4 px-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={16} fill="#fbbc04" className="text-[#fbbc04]" />
                                            ))}
                                        </div>
                                        <p className="text-gray-600 text-[15px] leading-relaxed mb-2 px-1 flex-grow overflow-hidden line-clamp-4 italic font-medium">
                                            "{testimonial.text}"
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Dots Navigation */}
                <div className="flex justify-center gap-2.5 mt-12 mb-12">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            className={`h-2 rounded-full transition-all duration-500 ${currentIndex === i ? 'bg-blue-600 w-10' : 'bg-gray-200 w-2 hover:bg-gray-300'
                                }`}
                        />
                    ))}
                </div>

            </div>

            {/* Subtle Background Blobs */}
            <div className="absolute top-0 end-0 w-96 h-96 bg-blue-100/30 blur-[100px] rounded-full -z-10 animate-pulse"></div>
            <div className="absolute bottom-0 start-0 w-96 h-96 bg-purple-100/30 blur-[100px] rounded-full -z-10 animate-pulse"></div>
        </section>
    );
};

export default Testimonials;
