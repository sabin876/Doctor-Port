import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, CheckCircle2, ExternalLink, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const GOOGLE_REVIEWS_URL = "https://www.google.com/maps/place/Dr.+Ulhas+Sonar/@25.1972159,55.2727911,17z/data=!4m8!3m7!1s0xcd49d19fa816340b:0xf2cdecb2b78caee4!8m2!3d25.1972159!4d55.275366!9m1!1b1";
const GOOGLE_WRITE_REVIEW_URL = "https://search.google.com/local/writereview?placeid=ChIJz5cxhvRdXz4RCzQWqJ_RSc0";

const testimonials = [
    {
        name: "Avinash Shinde",
        text: "My hip joints were severely affected by arthritis, making it difficult for me to move, and I was really fearful of surgery. Nevertheless, sir instilled confidence in me, and now that I have both hip joints replaced, I am living a beautiful life. Regards, sir.",
        date: "9 days ago",
        verified: true,
        image: "https://lh3.googleusercontent.com/a-/ALV-UjV1XkMqBr5zWMlGQEq_a0j6_XVf2cFx9YxIXs9lYg=s96-c",
        googleUrl: GOOGLE_REVIEWS_URL
    },
    {
        name: "Masood Shah",
        date: "1 month ago",
        verified: true,
        text: "Excellent service and care. Dr. Ulhas is very professional and explained the procedure clearly. I'm very happy with my recovery.",
        image: "https://lh3.googleusercontent.com/a-/ALV-UjVQkLHT4kqoNgpJq6T1K9Y3mXDh_7smHPv6lBs3Vw=s96-c",
        googleUrl: GOOGLE_REVIEWS_URL
    },
    {
        name: "Rahul Shah",
        date: "2 months ago",
        verified: true,
        text: "Highly recommended for any orthopedic issues. The staff is also very supportive. My knee pain is gone after just a few months of treatment!",
        image: "https://lh3.googleusercontent.com/a-/ALV-UjVmFtNfJzH0QWcR4yQ8kX2XR1TLqZv3s6_5Hn0JjQ=s96-c",
        googleUrl: GOOGLE_REVIEWS_URL
    },
    {
        name: "Beth Shah",
        date: "3 months ago",
        verified: true,
        text: "The best orthopedic doctor in the region. Truly life-changing experience. Thank you sir!",
        image: "https://lh3.googleusercontent.com/a-/ALV-UjVpJ2rLKcW9c_8qBNT4M5MbLfYrNqF4HcTsqNR-mQ=s96-c",
        googleUrl: GOOGLE_REVIEWS_URL
    },
    {
        name: "Arqam Shah",
        date: "4 months ago",
        verified: true,
        text: "Very thorough examination and honest advice. Feeling much better after following the prescribed treatment.",
        image: "https://lh3.googleusercontent.com/a-/ALV-UjXTRCwB_q1H7y7t3GhNa2vORj5FT9Lnkk_JX4rA0g=s96-c",
        googleUrl: GOOGLE_REVIEWS_URL
    },
    {
        name: "Mohammed Shah",
        date: "5 months ago",
        verified: true,
        text: "Professional, caring, and efficient. Great experience overall. God bless you sir.",
        image: "https://lh3.googleusercontent.com/a-/ALV-UjWRaBwEb2ZqG0M7cFv8NhJK5A_TLrFXEKnPNT2WqA=s96-c",
        googleUrl: GOOGLE_REVIEWS_URL
    }
];

const Testimonials = () => {
    const { language, t } = useLanguage();
    const isRtl = language === 'AR';
    const doubledTestimonials = [...testimonials, ...testimonials];

    return (
        <section
            id="testimonials"
            className="py-24 bg-gray-50/50 text-gray-900 overflow-hidden relative"
        >
            <div className="max-w-[100vw] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 px-4"
                >
                    <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight text-blue-900">
                        {t('testimonials.title')}
                    </h2>
                    <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full mb-8"></div>

                    {/* Google-themed "Write a Review" Button with subtle pulse animation */}
                    <div className="flex justify-center flex-col items-center gap-2">
                        <motion.a
                            href={GOOGLE_WRITE_REVIEW_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            animate={{
                                boxShadow: ["0px 10px 30px rgba(66, 133, 244, 0.1)", "0px 15px 40px rgba(66, 133, 244, 0.2)", "0px 10px 30px rgba(66, 133, 244, 0.1)"]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            whileHover={{ scale: 1.05, boxShadow: "0px 20px 50px rgba(66, 133, 244, 0.3)" }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3.5 bg-white border border-gray-200 text-gray-800 font-bold rounded-2xl transition-all duration-500 flex items-center gap-3 group relative overflow-hidden"
                        >
                            {/* Subtle Google-colored TOP EDGE with a slight gradient blur */}
                            <div className="absolute top-0 start-0 w-full h-1.5 flex opacity-90 group-hover:h-2 transition-all duration-300">
                                <div className="flex-1 h-full bg-[#4285f4]"></div>
                                <div className="flex-1 h-full bg-[#ea4335]"></div>
                                <div className="flex-1 h-full bg-[#fbbc05]"></div>
                                <div className="flex-1 h-full bg-[#34a853]"></div>
                            </div>

                            <div className="w-6 h-6 flex items-center justify-center p-0.5 bg-white rounded-full shadow-sm border border-gray-50 group-hover:rotate-12 transition-transform duration-500">
                                <svg className="w-full h-full" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                            </div>

                            <span className="bg-gradient-to-r from-[#4285f4] via-[#ea4335] to-[#fbbc05] bg-clip-text text-transparent font-extrabold text-[15px] tracking-tight whitespace-nowrap">
                                {t('testimonials.reviewButton')}
                            </span>
                            
                            <ChevronRight className={`w-5 h-5 text-gray-300 group-hover:${isRtl ? '-translate-x-1' : 'translate-x-1'} group-hover:text-[#34a853] transition-all duration-300`} />
                        </motion.a>
                    </div>
                </motion.div>

                <div className="relative group/marquee px-4">
                    {/* Carousel Container - Seamless Infinite Marquee */}
                    <div className="flex overflow-hidden py-4">
                        <motion.div
                            className="flex gap-6"
                            animate={{ 
                                x: isRtl ? [0, 400 * testimonials.length] : [0, -400 * testimonials.length] 
                            }}
                            transition={{ 
                                x: {
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    duration: 60,
                                    ease: "linear"
                                }
                            }}
                            whileHover={{ transition: { duration: 120 } }} // Slow down on hover for readability
                        >
                            {doubledTestimonials.map((testimonial, index) => (
                                <div
                                    key={index}
                                    className="w-[300px] md:w-[400px] shrink-0 flex flex-col"
                                >
                                    {/* Testimonial Card */}
                                    <div className="w-full bg-white p-6 md:p-7 rounded-[2rem] border border-gray-200/60 shadow-xl shadow-gray-200/40 relative h-full flex flex-col hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 group cursor-pointer" onClick={() => window.open(testimonial.googleUrl, '_blank', 'noopener,noreferrer')}>
                                        {/* Header inside Card */}
                                        <div className="flex items-center gap-4 mb-5">
                                            {/* Profile Photo / Avatar with Orange Star Badge */}
                                            <div className="relative shrink-0">
                                                <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center font-bold text-xl bg-gray-100 text-gray-700 shadow-inner group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500 border border-gray-100">
                                                    {testimonial.image ? (
                                                        <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.innerText = testimonial.name[0]; }} />
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
                                                    <h4 className="font-bold text-lg text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">{testimonial.name}</h4>
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
                                        <p className="text-gray-600 text-[15px] leading-relaxed mb-4 px-1 flex-grow overflow-hidden line-clamp-4 italic font-medium">
                                            "{testimonial.text}"
                                        </p>
                                        {/* Read on Google footer link */}
                                        <div className="flex items-center gap-1.5 text-xs text-[#1a73e8] font-semibold mt-auto px-1">
                                            <ExternalLink size={12} />
                                            Read on Google
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Gradient Masks for seamless edge fade */}
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-50/50 via-gray-50/30 to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-50/50 via-gray-50/30 to-transparent z-10 pointer-events-none"></div>
                </div>

                {/* Personalized Solution CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-20"
                >
                    <a
                        href="#personalized-solutions"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-white text-blue-600 border border-blue-200 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-50 transition-all shadow-sm"
                    >
                        Inspired by these stories? <span className="underline decoration-2 underline-offset-4 ms-1">Get Your Personalized Solution</span>
                        <ArrowRight className="w-4 h-4" />
                    </a>
                </motion.div>
            </div>

            {/* Subtle Background Blobs */}
            <div className="absolute top-0 end-0 w-96 h-96 bg-blue-100/30 blur-[100px] rounded-full -z-10 animate-pulse"></div>
            <div className="absolute bottom-0 start-0 w-96 h-96 bg-purple-100/30 blur-[100px] rounded-full -z-10 animate-pulse"></div>
        </section>
    );
};

export default Testimonials;
