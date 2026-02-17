import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
    { name: "Avinash Shinde", text: "My hip joints were severely affected by arthritis... now that I have both hip joints replaced, I am living a beautiful life.", title: "Hip Replacement" },
    { name: "Rahul Shah", text: "Dr. Ulhas replaced my mother's knee joint, and she is now completely OK. Excellent pre- and post-operative care.", title: "Best Orthopedic Surgeon" },
    { name: "Ashutosh Sovan", text: "He performed two operations on my son's broken hands and also performed a total knee replacement on my mother-in-law.", title: "Exceptional Skills" },
    { name: "Mrunmayi Avachat", text: "Doctor had treated me for my recurrent trapezius spasms... his treatment was amazingly effective.", title: "Effective Treatment" },
    { name: "Arqam Abbas", text: "I left collarbone broke while playing cricket... handled everything with real professionalism.", title: "Professional Care" },
    { name: "Mohd Abbas", text: "I had a lower back injury... his humble and calm approach put me at ease right away.", title: "Humble Approach" },
    { name: "Mohsin", text: "Dr. Ulhas treated my wife's complex arm injury with great skill and care... made her feel at ease.", title: "Great Skill" },
    { name: "Sudhir Sharma", text: "He operated on my left wrist very well and there was rapid improvement.", title: "Rapid Improvement" },
    { name: "Reddy Talampas", text: "Gave me great confidence and comfort throughout my treatment. Recovery has been smooth.", title: "Excellent Support" },
    { name: "Oleg Prodayvoda", text: "Shoulder injury from padel tennis... quickly made an accurate diagnosis.", title: "Accurate Diagnosis" },
    { name: "Confidential", text: "Great job of my right knee lateral meniscus operation. Fast recovery, no issues at all.", title: "Fast Recovery" },
];

const Testimonials = () => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = direction === 'left' ? -400 : 400;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section id="testimonials" className="py-24 bg-gradient-to-b from-gray-50/50 to-white relative overflow-hidden">
            {/* Animated Background Blobs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-purple-100 rounded-full blur-3xl pointer-events-none"
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl pointer-events-none"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-16">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="inline-block px-5 py-2 mb-6 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 text-primary-600 text-[11px] font-bold uppercase tracking-[0.2em]"
                        >
                            Patient Stories
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-montserrat font-extrabold text-blue-900 mb-6 tracking-tight leading-tight"
                        >
                            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Patients</span> Say
                        </motion.h2>
                    </div>
                    <div className="hidden md:flex space-x-3">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => scroll('left')}
                            className="p-4 rounded-2xl bg-white border border-gray-100 shadow-md hover:shadow-xl transition-all text-primary-900 hover:bg-primary-50"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => scroll('right')}
                            className="p-4 rounded-2xl bg-white border border-gray-100 shadow-md hover:shadow-xl transition-all text-primary-900 hover:bg-primary-50"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </motion.button>
                    </div>
                </div>

                <div
                    ref={scrollRef}
                    className="flex space-x-6 overflow-x-auto pb-12 hide-scrollbar snap-x snap-mandatory"
                    style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
                >
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            className="group min-w-[320px] md:min-w-[420px] flex-shrink-0 bg-white p-8 rounded-[2rem] shadow-md border border-gray-100 snap-center relative hover:shadow-2xl transition-all duration-500 overflow-hidden"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            whileHover={{ y: -10 }}
                        >
                            {/* Gradient Overlay on Hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]"></div>

                            {/* Quote Icon with Animation */}
                            <motion.div
                                whileHover={{ rotate: 15, scale: 1.2 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Quote className="absolute top-6 right-6 h-10 w-10 text-primary-100 group-hover:text-primary-200 transition-colors" />
                            </motion.div>

                            {/* Star Rating */}
                            <div className="flex space-x-1 mb-5 relative z-10">
                                {[...Array(5)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <Star size={18} fill="#FCD34D" className="text-yellow-400" />
                                    </motion.div>
                                ))}
                            </div>

                            {/* Testimonial Text */}
                            <p className="text-gray-700 text-base mb-6 leading-relaxed min-h-[100px] relative z-10 font-medium">
                                "{testimonial.text}"
                            </p>

                            {/* Author Info */}
                            <div className="flex items-center relative z-10">
                                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary-400 to-purple-600 flex items-center justify-center text-white font-bold text-base shadow-lg">
                                    {testimonial.name[0]}
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-extrabold text-gray-900">{testimonial.name}</p>
                                    <p className="text-xs font-semibold text-primary-600">{testimonial.title}</p>
                                </div>
                            </div>

                            {/* Shine Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 pointer-events-none"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
