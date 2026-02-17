import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Activity, Bone, Stethoscope } from 'lucide-react';

const articlesData = [
    {
        id: 1,
        title: "Steroid Injection for Shoulder Pain: What You Should Know",
        excerpt: "Shoulder pain — especially from conditions like rotator cuff inflammation — can be debilitating. Learn about how steroid injections can help.",
        link: "https://drulhasorthopedic.com/steroid-injection-for-shoulder-pain-what-you-should-know/",
        icon: Activity,
        category: "Shoulder"
    },
    {
        id: 2,
        title: "Steroid Injections for Knee Pain: What You Need to Know",
        excerpt: "Chronic knee pain caused by arthritis or inflammation can significantly impact your life. Discover the benefits and risks of steroid injections.",
        link: "https://drulhasorthopedic.com/steroid-injections-for-knee-pain-what-you-need-to-know/",
        icon: Bone,
        category: "Knee"
    },
    {
        id: 3,
        title: "Understanding Meniscus Tears",
        excerpt: "The meniscus is a C-shaped cartilage in your knee. Learn about symptoms, treatments, and recovery options for meniscus tears.",
        link: "https://drulhasorthopedic.com/understanding-meniscus-tears-symptoms-treatments-recovery-options/",
        icon: Stethoscope,
        category: "Knee"
    },
    {
        id: 4,
        title: "Alignment concept: Total Knee Replacement",
        excerpt: "Personalized Alignment in Total Knee Replacement: A Shift from One-Size-Fits-All. Understand modern TKR approaches.",
        link: "https://drulhasorthopedic.com/alignment-concept-total-knee-replacement/",
        icon: Bone,
        category: "Surgery"
    },
    {
        id: 5,
        title: "The Evolution of TKR Implants",
        excerpt: "Advancing Toward Precision and Performance. Total Knee Replacement (TKR) implants have come a long way. Explore their evolution.",
        link: "https://drulhasorthopedic.com/the-evolution-of-tkr-implants/",
        icon: Activity,
        category: "Technology"
    },
    {
        id: 6,
        title: "Steps in Total Knee Replacement",
        excerpt: "A Surgical Overview by Dr. Ulhas Sonar. Total Knee Replacement (TKR) is a complex procedure. Read our step-by-step guide.",
        link: "https://drulhasorthopedic.com/steps-in-tkr/",
        icon: BookOpen,
        category: "Surgery"
    }
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

const Articles = () => {
    return (
        <div className="pt-24 pb-16 min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
                    >
                        Patient <span className="text-primary-600">Resources</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-lg text-gray-600 max-w-2xl mx-auto"
                    >
                        Explore our library of expert articles on orthopedic health, treatments, and recovery.
                    </motion.p>
                </div>

                {/* Articles Grid */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {articlesData.map((article) => (
                        <motion.div
                            key={article.id}
                            variants={item}
                            whileHover={{ y: -10 }}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col border border-gray-100"
                        >
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="bg-primary-50 text-primary-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                                        {article.category}
                                    </span>
                                    <article.icon className="w-6 h-6 text-primary-400" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                    {article.title}
                                </h3>
                                <p className="text-gray-600 mb-6 flex-1 line-clamp-3">
                                    {article.excerpt}
                                </p>
                                <a
                                    href={article.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors"
                                >
                                    Read Article
                                    <motion.span
                                        className="ml-2"
                                        initial={{ x: 0 }}
                                        whileHover={{ x: 5 }}
                                    >
                                        <ArrowRight size={18} />
                                    </motion.span>
                                </a>
                            </div>
                            <div className="h-1 w-full bg-gradient-to-r from-primary-500 to-primary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Newsletter / CTA Section (Optional but adds interactivity and content) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-20 bg-primary-600 rounded-2xl p-8 md:p-12 text-center text-white"
                >
                    <h2 className="text-3xl font-bold mb-4">Have questions about your specific condition?</h2>
                    <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
                        Book a consultation with Dr. Ulhas Sonar for a personalized assessment and expert advice.
                    </p>
                    <a
                        href="/contact"
                        className="inline-block bg-white text-primary-600 font-bold py-3 px-8 rounded-full hover:bg-primary-50 transition-colors shadow-lg"
                    >
                        Book an Appointment
                    </a>
                </motion.div>
            </div>
        </div>
    );
};

export default Articles;
