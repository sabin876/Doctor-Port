import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Calendar, ArrowRight } from 'lucide-react';

const articlesData = [
    {
        id: 'knee-replacement-signs',
        title: "Is It Time for a Knee Replacement? 7 Signs You Shouldn't Ignore",
        excerpt: "Many patients live with joint pain far longer than necessary. Learn the clinical signs that indicate it might be time to consider knee replacement surgery.",
        category: "Knee Health",
        categoryColor: "bg-blue-100 text-blue-700",
        image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop",
        author: "Dr. Ulhas Sonar",
        date: "June 17, 2025"
    },
    {
        id: 'shoulder-steroid-injection',
        title: "Steroid Injection for Shoulder Pain: What You Should Know",
        excerpt: "Shoulder pain from conditions like rotator cuff inflammation can be debilitating. Discover how steroid injections can provide relief and help in diagnosis.",
        category: "Shoulder Care",
        categoryColor: "bg-teal-100 text-teal-700",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&h=600&fit=crop",
        author: "Dr. Ulhas Sonar",
        date: "June 17, 2024"
    },
    {
        id: 'knee-steroid-injection',
        title: "Steroid Injections for Knee Pain: What You Need to Know",
        excerpt: "Chronic knee pain caused by arthritis or inflammation can significantly impact your life. Learn about the benefits and considerations of steroid injections.",
        category: "Pain Management",
        categoryColor: "bg-purple-100 text-purple-700",
        image: "https://images.unsplash.com/photo-1581594632702-52c1cb8d799d?w=800&h=600&fit=crop",
        author: "Dr. Ulhas Sonar",
        date: "March 12, 2024"
    },
    {
        id: 'personalized-knee-alignment',
        title: "Alignment concept: Total Knee Replacement",
        excerpt: "A shift from one-size-fits-all. Explore how personalized alignment strategies and joint anatomy understanding lead to better surgical outcomes.",
        category: "Innovations",
        categoryColor: "bg-cyan-100 text-cyan-700",
        image: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&h=600&fit=crop",
        author: "Dr. Ulhas Sonar",
        date: "May 20, 2024"
    },
    {
        id: 'tkr-implant-evolution',
        title: "The Evolution of TKR Implants",
        excerpt: "From simple hinges to patient-specific systems. Discover how TKR implant design has evolved to enhance stability and patient satisfaction.",
        category: "Surgery",
        categoryColor: "bg-indigo-100 text-indigo-700",
        image: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=800&h=600&fit=crop",
        author: "Dr. Ulhas Sonar",
        date: "April 15, 2024"
    },
    {
        id: 'tkr-surgical-steps',
        title: "Steps in Total Knee Replacement",
        excerpt: "A systematic surgical overview. A step-by-step guide to modern TKR, emphasizing precision, alignment, and patient-specific care.",
        category: "Education",
        categoryColor: "bg-emerald-100 text-emerald-700",
        image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&h=600&fit=crop",
        author: "Dr. Ulhas Sonar",
        date: "May 5, 2024"
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
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary-50 text-primary-600 text-xs font-black uppercase tracking-[0.2em]"
                    >
                        Medical Insights
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight"
                    >
                        Expert <span className="text-primary-600">Orthopedic</span> Articles
                    </motion.h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Stay informed with the latest insights on orthopedic health, treatments, and surgical innovations from Dr. Ulhas Sonar.
                    </p>
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
                            whileHover={{ y: -8 }}
                            className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col"
                        >
                            <Link
                                to={`/articles/${article.id}`}
                                className="flex flex-col h-full"
                            >
                                {/* Image Container */}
                                <div className="relative h-56 overflow-hidden bg-gray-200">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    {/* Category Tag */}
                                    <div className="absolute top-4 start-4">
                                        <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${article.categoryColor}`}>
                                            {article.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
                                        {article.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4 flex-1 line-clamp-3 text-sm leading-relaxed">
                                        {article.excerpt}
                                    </p>

                                    {/* Author & Date */}
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                                                <User className="w-4 h-4 text-primary-600" />
                                            </div>
                                            <span className="text-sm font-medium text-gray-700">{article.author}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-gray-500">
                                            <Calendar className="w-4 h-4" />
                                            <span className="text-xs">{article.date}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-20 bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl p-8 md:p-12 text-center text-white shadow-xl"
                >
                    <h2 className="text-3xl font-bold mb-4">Have Questions About Your Condition?</h2>
                    <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
                        Book a consultation with Dr. Ulhas Sonar for personalized assessment and expert orthopedic care.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 bg-white text-primary-600 font-bold py-4 px-8 rounded-full hover:bg-primary-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                    >
                        Schedule Consultation <ArrowRight className="w-5 h-5" />
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default Articles;
