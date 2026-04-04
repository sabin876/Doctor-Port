import React from 'react';
import SEO from './SEO';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Calendar, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Breadcrumbs from './ui/Breadcrumbs';

const articlesData = [
    {
        id: 'causes-of-knee-pain',
        title: "Understanding Common Causes of Knee Pain",
        excerpt: "Knee pain affects people of all ages. Whether it's a sports injury or arthritis, understanding the underlying cause is the first step toward effective treatment.",
        category: "Knee Health",
        categoryColor: "bg-blue-100 text-blue-700",
        image: "/images/blog/knee-causes.png",
        author: "Dr. Ulhas Sonar",
        date: "March 21, 2026"
    },
    {
        id: 'knee-pain-gym-sports',
        title: "Knee Pain After Gym or Sports in Working Professionals: Ligament Injury or Cartilage Damage?",
        excerpt: "Knee pain after gym or sports is common in working professionals. Learn how to distinguish ligament injury from cartilage damage, warning signs, and management options.",
        category: "Sports Medicine",
        categoryColor: "bg-orange-100 text-orange-700",
        image: "/images/blog/gym-injury.png",
        author: "Dr. Ulhas Sonar",
        date: "March 21, 2026"
    },
    {
        id: 'when-to-get-mri-knee',
        title: "When Knee Pain Needs a Scan: Understanding MRI, X-rays, and Decision-Making",
        excerpt: "When should knee pain be investigated with MRI or X-ray? A detailed clinical guide for active adults on symptoms, red flags, and imaging decisions.",
        category: "Diagnostics",
        categoryColor: "bg-purple-100 text-purple-700",
        image: "/images/blog/mri-scan.png",
        author: "Dr. Ulhas Sonar",
        date: "March 21, 2026"
    },
    {
        id: 'continuing-sports-risks',
        title: "Continuing Sports with Knee Pain in Working Professionals: Risks and Mistakes",
        excerpt: "Is it safe to play through knee pain? Learn the common mistakes, long-term risks, and safer management strategies for active adults balancing work and sport.",
        category: "Injury Prevention",
        categoryColor: "bg-red-100 text-red-700",
        image: "/images/blog/sports-risks.png",
        author: "Dr. Ulhas Sonar",
        date: "March 21, 2026"
    },
    {
        id: 'anterior-knee-pain-office',
        title: "Anterior Knee Pain in Office Workers",
        excerpt: "Long hours at a desk can lead to 'theater sign' pain. Learn simple ergonomic fixes and lifestyle adjustments for office-based knee pain.",
        category: "Ergonomics",
        categoryColor: "bg-teal-100 text-teal-700",
        image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&h=600&fit=crop",
        author: "Dr. Ulhas Sonar",
        date: "March 21, 2026"
    },
    {
        id: 'meniscus-tear-vs-strain',
        title: "Meniscus Tear vs. Muscle Strain – How to Tell",
        excerpt: "Is it a sharp joint line pain or a soft tissue ache? Compare the symptoms and recovery timelines for these common knee injuries.",
        category: "Diagnosis",
        categoryColor: "bg-emerald-100 text-emerald-700",
        image: "https://images.unsplash.com/photo-1576091160550-217359f4ecf8?w=800&h=600&fit=crop",
        author: "Dr. Ulhas Sonar",
        date: "March 21, 2026"
    },
    {
        id: 'knee-pain-exercises-desk',
        title: "Best Exercises for Knee Pain (Desk Professionals)",
        excerpt: "Keep your joints moving with these simple stretches and strengthening exercises you can perform right at your workstation.",
        category: "Rehabilitation",
        categoryColor: "bg-cyan-100 text-cyan-700",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
        author: "Dr. Ulhas Sonar",
        date: "March 21, 2026"
    },
    {
        id: 'knee-pain-travel-flights',
        title: "Managing Knee Pain During Travel and Flights",
        excerpt: "Long-haul travel can cause joint stiffness and discomfort. Use these expert tips for staying comfortable on your next journey.",
        category: "Lifestyle",
        categoryColor: "bg-indigo-100 text-indigo-700",
        image: "https://images.unsplash.com/photo-1436491865332-7a61a109c0f5?w=800&h=600&fit=crop",
        author: "Dr. Ulhas Sonar",
        date: "March 21, 2026"
    },
    {
        id: 'knee-pain-pillar',
        title: "Knee Pain in Professionals: The Ultimate Specialist Guide",
        excerpt: "A complete clinical guide to knee pain for active adults. Understand causes, gym injuries, MRI decisions, and safe return to sports.",
        category: "Pillar Page",
        categoryColor: "bg-blue-100 text-blue-700",
        image: "/images/blog/knee-pillar.png",
        author: "Dr. Ulhas Sonar",
        date: "March 21, 2026"
    },
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
    const { t } = useLanguage();

    return (
        <main className="pt-20 min-h-screen bg-gray-50">
            <SEO
                title="Orthopedic Articles & Insights | Dr. Ulhas"
                description="Read the latest articles on orthopedic conditions, treatments, and recovery from Dr. Ulhas Sonar."
                url="/blog"
            />
            <div className="bg-white border-b border-gray-100">
                <Breadcrumbs items={[
                    { name: 'Home', path: '/' },
                    { name: 'Blog' }
                ]} />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-8">

                {/* Header Section */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary-50 text-primary-600 text-xs font-black uppercase tracking-[0.2em]"
                    >
                        {t('articles.badge')}
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight"
                    >
                        {t('articles.title')} <span className="text-primary-600">{t('articles.titleHighlight')}</span>
                    </motion.h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        {t('articles.description')}
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
                                to={`/blog/${article.id}`}
                                className="flex flex-col h-full"
                            >
                                {/* Image Container */}
                                <div className="relative h-56 overflow-hidden bg-gray-200">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        loading="lazy"
                                        decoding="async"
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
        </main>
    );
};

export default Articles;
