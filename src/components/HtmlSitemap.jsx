import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Stethoscope, ChevronRight, LayoutGrid } from 'lucide-react';
import Breadcrumbs from './ui/Breadcrumbs';
import SEO from './SEO';

const HtmlSitemap = () => {
    const [data, setData] = useState({ articles: [], services: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetch('http://127.0.0.1:8000/api/html-sitemap/')
            .then(res => res.json())
            .then(json => {
                setData(json);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch sitemap data:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <SEO 
                title="Sitemap | CORX Healthcare"
                description="Browse all articles and services offered by Dr. Ulhas Sonar at CORX Healthcare."
                url="/sitemap"
            />
            
            <div className="bg-white border-b border-gray-100">
                <Breadcrumbs items={[
                    { name: 'Home', path: '/' },
                    { name: 'Sitemap' }
                ]} />
            </div>

            <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 text-center"
                >
                    <div className="inline-flex items-center justify-center p-3 bg-primary-100 text-primary-600 rounded-2xl mb-4">
                        <LayoutGrid className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">Sitemap</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Explore our comprehensive directory of orthopedic services, medical articles, and treatment guides.
                    </p>
                </motion.div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Services Section */}
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <Stethoscope className="w-6 h-6 text-primary-600" />
                                <h2 className="text-xl font-bold text-gray-900">Medical Services</h2>
                            </div>
                            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                                <ul className="space-y-4">
                                    {data.services.map((service, index) => (
                                        <li key={index}>
                                            <Link 
                                                to={`/services/${index}`} 
                                                className="group flex items-center justify-between p-2 hover:bg-primary-50 rounded-lg transition-all"
                                            >
                                                <span className="text-gray-700 group-hover:text-primary-700 transition-colors">{service.title}</span>
                                                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>

                        {/* Articles Section */}
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <FileText className="w-6 h-6 text-primary-600" />
                                <h2 className="text-xl font-bold text-gray-900">Health Articles</h2>
                            </div>
                            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                                <ul className="space-y-4">
                                    {data.articles.map((article, index) => (
                                        <li key={index}>
                                            <Link 
                                                to={`/blog/${article.slug}`} 
                                                className="group flex items-center justify-between p-2 hover:bg-primary-50 rounded-lg transition-all"
                                            >
                                                <span className="text-gray-700 group-hover:text-primary-700 transition-colors line-clamp-1">{article.title}</span>
                                                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HtmlSitemap;
