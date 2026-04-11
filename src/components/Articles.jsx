import React from 'react';
import SEO from './SEO';
import heroImg from '../assets/doctor-surgery.webp';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Calendar, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Breadcrumbs from './ui/Breadcrumbs';
import { articlesList } from '../constants/articlesData';

// Articles data is now imported from constants/articlesData.js

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
    
    // Debug logging to catch missing or malformed image paths
    console.log('Articles Component Init');
    console.log('articlesList raw:', articlesList);
    
    // Filter to ensure we only try to render valid articles
    const validArticles = articlesList.filter(article => {
        if (!article.image) {
            console.warn(`Article missing image path: ${article.id}`);
        }
        return true; // We render anyway to see the grey placeholder and debug
    });

    return (
        <main className="pt-20 min-h-screen bg-gray-50">
            <SEO
                title="Orthopedic Articles & Insights | Dr. Ulhas"
                description="Read the latest articles on orthopedic conditions, treatments, and recovery from Dr. Ulhas Sonar."
                url="/blog"
                image={heroImg}
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
                        className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 tracking-tight"
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
                    {articlesList.map((article) => (
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
                                    {article.image ? (
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            onError={(e) => {
                                                console.error(`Failed to load image for ${article.id}: ${article.image}`);
                                                e.target.style.display = 'none';
                                            }}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-[10px] p-4 text-center">
                                            Topic: {article.title}
                                        </div>
                                    )}
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
