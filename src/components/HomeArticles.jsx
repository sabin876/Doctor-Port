import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Calendar, ArrowRight, BookOpen } from 'lucide-react';
import { api } from '../lib/api';
import { articlesList } from '../constants/articlesData';

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

const HomeArticles = () => {
    const [articles, setArticles] = useState(() => {
        if (typeof window !== 'undefined' && window.__INITIAL_ARTICLES__ && window.__INITIAL_ARTICLES__.length > 0) {
            return window.__INITIAL_ARTICLES__.slice(0, 3);
        }
        return articlesList.slice(0, 3);
    });

    useEffect(() => {
        api.getArticles()
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    setArticles(data.slice(0, 3));
                }
            })
            .catch(err => {
                console.error("Failed to load home articles:", err);
            });
    }, []);

    return (
        <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full bg-primary-50 text-primary-700 text-[11px] font-black uppercase tracking-[0.2em] border border-primary-100 shadow-sm"
                    >
                        <BookOpen className="w-3.5 h-3.5 text-primary-600" />
                        Latest Articles & Insights
                    </motion.div>
                    
                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4"
                    >
                        Health Insights & <span className="text-primary-600">Orthopedic Advice</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-base md:text-lg text-gray-600 leading-relaxed"
                    >
                        Stay informed with expert guidance on orthopedic care, joint health, and recovery tips from Dr. Ulhas Sonar.
                    </motion.p>
                </div>

                {/* 3 Articles Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {articles.map((article, idx) => {
                        const slug = article.slug || article.id;
                        return (
                            <motion.div
                                key={slug || idx}
                                variants={cardVariants}
                                whileHover={{ y: -8 }}
                                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                            >
                                <Link
                                    to={`/blog/${slug}`}
                                    className="flex flex-col h-full"
                                >
                                    {/* Image Container */}
                                    <div className="relative h-52 overflow-hidden bg-gray-100">
                                        {article.image ? (
                                            <img
                                                src={article.image}
                                                alt={article.image_alt_text || article.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                loading="lazy"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                }}
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs p-4 text-center bg-gray-200">
                                                {article.title}
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        {/* Category Badge */}
                                        {article.category && (
                                            <div className="absolute top-4 left-4 z-10">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm ${article.categoryColor || 'bg-primary-600 text-white'}`}>
                                                    {article.category}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors leading-snug">
                                                {article.title}
                                            </h3>
                                            <p className="text-gray-600 mb-6 line-clamp-3 text-sm leading-relaxed">
                                                {article.excerpt || article.metaDescription}
                                            </p>
                                        </div>

                                        {/* Footer Meta */}
                                        <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 mt-auto">
                                            <div className="flex items-center gap-1.5">
                                                <User className="w-3.5 h-3.5 text-primary-600" />
                                                <span className="font-medium text-gray-700">{article.author || "Dr. Ulhas Sonar"}</span>
                                            </div>
                                            {article.date && (
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    <span>{article.date}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Redirect Button Below Cards */}
                <div className="mt-12 text-center">
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white text-sm md:text-base font-bold rounded-2xl shadow-lg shadow-primary-600/25 hover:shadow-xl hover:shadow-primary-600/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group"
                    >
                        <span>View All Articles</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default HomeArticles;
