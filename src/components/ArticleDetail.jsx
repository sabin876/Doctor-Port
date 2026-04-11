import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Calendar, ArrowLeft, ChevronLeft, Share2, Tag, PlayCircle, Activity, User, ShieldCheck, FileText, Bookmark, Share, Award, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Breadcrumbs from './ui/Breadcrumbs';
import SEO from './SEO';
import { articles } from '../constants/articlesData';

const ArticleDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useLanguage();
    const article = articles[id];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!article) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Article Not Found</h2>
                <Link to="/blog" className="text-primary-600 font-bold flex items-center gap-2">
                    <ChevronLeft className="w-5 h-5" /> Back to Blog
                </Link>
            </div>
        );
    }

    const schemaList = [];
    if (id === 'knee-pain-pillar') {
        schemaList.push({
            "@context": "https://schema.org",
            "@type": "MedicalWebPage",
            "name": "Knee Pain in Young Adults and Working Professionals",
            "description": "Comprehensive guide to knee pain causes, MRI, treatment, and sports injuries.",
            "author": { "@type": "Person", "name": "Dr Ulhas Sonar" },
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "When should knee pain be investigated with MRI?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "MRI is recommended when knee pain is associated with swelling, instability, locking, or persistent symptoms despite rehabilitation."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Is knee pain after gym serious?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Most cases are due to overload, but swelling or instability may indicate structural injury."
                    }
                }
            ]
        });
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <SEO 
                title={article.metaTitle || `${article.title} | Dr. Ulhas Sonar`}
                description={article.metaDescription || article.title}
                url={`/blog/${id}`}
                image={article.image}
                type="article"
                schemaList={schemaList}
                twitterLabel1="Written by"
                twitterData1={article.author || "Dr. Ulhas Sonar"}
                twitterLabel2="Time to read"
                twitterData2={article.readTime || "5 min read"}
            />
            <div className="bg-white border-b border-gray-100">
                <Breadcrumbs items={[
                    { name: 'Home', path: '/' },
                    { name: 'Articles', path: '/blog' },
                    { name: article.title }
                ]} />
            </div>

            {/* Hero Section */}
            <div className="relative h-[40vh] md:h-[60vh] min-h-[300px] w-full overflow-hidden bg-gray-200">
                {article.image && (
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            console.error(`Failed to load article detail image: ${article.image}`);
                            e.target.style.display = 'none';
                        }}
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end">
                    <div className="max-w-4xl mx-auto px-6 pb-12 w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-block px-3 py-1 rounded-full bg-primary-500 text-white text-[10px] font-bold uppercase tracking-wider mb-4">
                                {article.category}
                            </span>
                            <h1 className="text-2xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                                {article.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-white/80 text-xs md:text-sm">
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    <span>{article.author}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>{article.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    <span>{article.readTime}</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Back Button */}
                <button
                    onClick={() => navigate('/blog')}
                    className="absolute top-6 left-6 md:top-8 md:left-8 p-2.5 md:p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all z-20"
                >
                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                </button>
            </div>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* Share & Meta (Desktop Sidebar) */}
                    <div className="hidden lg:block">
                        <div className="sticky top-32">
                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Share Article</h4>
                            <div className="flex flex-col gap-4">
                                <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-primary-50 hover:border-primary-200 hover:text-primary-600 transition-all">
                                    <Share2 className="w-5 h-5" />
                                </button>
                                <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-primary-50 hover:border-primary-200 hover:text-primary-600 transition-all">
                                    <Tag className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <article className="prose prose-sm md:prose-lg prose-primary max-w-none">
                            <div
                                className="text-gray-700 leading-relaxed space-y-4 md:space-y-6"
                                dangerouslySetInnerHTML={{ __html: article.content }}
                            />
                        </article>

                        {/* Relevant Treatments Section */}
                        {article.relatedServiceIds && article.relatedServiceIds.length > 0 && (
                            <div className="mt-12 md:mt-16 pt-8 border-t border-gray-100">
                                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <Activity className="w-6 h-6 text-primary-600" /> Relevant Treatments
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {article.relatedServiceIds.map((serviceIndex) => (
                                        <Link
                                            key={serviceIndex}
                                            to={`/services/${serviceIndex}`}
                                            className="group flex flex-col p-5 bg-white border border-gray-100 rounded-2xl hover:border-primary-200 hover:shadow-lg transition-all duration-300"
                                        >
                                            <span className="text-sm font-bold text-gray-900 mb-2 line-clamp-2">{t(`services.items.${serviceIndex}.title`)}</span>
                                            <div className="flex items-center justify-between text-primary-600 group-hover:text-primary-700 font-medium text-sm mt-auto">
                                                <span>View details</span>
                                                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Practical CTA */}
                        <div className="mt-12 md:mt-16 p-6 md:p-8 rounded-3xl bg-gray-50 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Need a consultation?</h3>
                                <p className="text-sm md:text-base text-gray-600">Schedule an appointment with Dr. Ulhas for personalized care.</p>
                            </div>
                            <Link
                                to="/contact"
                                className="w-full md:w-auto px-8 py-4 bg-primary-600 text-white rounded-xl text-center font-bold hover:bg-primary-700 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                            >
                                Book Visit <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Articles (Simplified) */}
            <div className="bg-gray-50 py-16">
                <div className="max-w-4xl mx-auto px-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-8">More Articles</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Object.entries(articles)
                            .filter(([key]) => key !== id)
                            .slice(0, 2)
                            .map(([key, item]) => (
                                <Link
                                    key={key}
                                    to={`/blog/${key}`}
                                    className="group bg-white p-6 rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-lg transition-all"
                                >
                                    <span className="text-[10px] font-bold text-primary-600 uppercase tracking-widest block mb-2">{item.category}</span>
                                    <h4 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-1">{item.title}</h4>
                                </Link>
                            ))}
                    </div>
                    <div className="mt-12 flex justify-center">
                        <button
                            onClick={() => navigate('/blog')}
                            className="text-primary-600 font-bold flex items-center gap-2 hover:underline"
                        >
                            <ArrowRight className="w-5 h-5 rotate-180" /> View All Blog Posts
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleDetail;
