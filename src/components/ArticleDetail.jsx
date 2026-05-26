import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Calendar, ChevronLeft, Share2, Tag, Activity, User, ArrowRight, List } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../lib/api';
import Breadcrumbs from './ui/Breadcrumbs';
import SEO from './SEO';
// import { articles } from '../constants/articlesData'; // No longer needed

const ArticleDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [headings, setHeadings] = useState([]);
    const [siteSettings, setSiteSettings] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchData = async () => {
            try {
                const [articleData, settingsData] = await Promise.all([
                    api.getArticle(id),
                    api.getSiteSettings()
                ]);
                
                setArticle(articleData);
                setSiteSettings(settingsData);
                
                // Extract headings for TOC
                const div = document.createElement('div');
                div.innerHTML = articleData.content;
                const hTags = div.querySelectorAll('h2, h3, h4');
                setHeadings(Array.from(hTags).map((h, i) => ({
                    id: `heading-${i}`,
                    text: h.innerText,
                    level: parseInt(h.tagName.substring(1))
                })));
                
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch article data:", err);
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const applyInternalLinks = (content) => {
        if (!content || !siteSettings?.internal_linking_rules) return content;
        const rules = siteSettings.internal_linking_rules;
        const keywords = Object.keys(rules);
        if (keywords.length === 0) return content;

        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(`<div>${content}</div>`, 'text/html');
            const root = doc.body.firstChild;

            const processNode = (node) => {
                if (node.nodeType === Node.TEXT_NODE) {
                    const text = node.nodeValue;
                    let hasChanges = false;
                    const sortedKeywords = [...keywords].sort((a, b) => b.length - a.length);
                    
                    let htmlContent = text;
                    sortedKeywords.forEach(keyword => {
                        const escapedKeyword = keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                        const regex = new RegExp(`\\b${escapedKeyword}\\b`, 'gi');
                        htmlContent = htmlContent.replace(regex, (match) => {
                            hasChanges = true;
                            return `###LINK###${keyword}###SPLIT###${match}###ENDLINK###`;
                        });
                    });
                    
                    if (hasChanges) {
                        const fragment = document.createDocumentFragment();
                        const parts = htmlContent.split(/(###LINK###.*?###ENDLINK###)/);
                        parts.forEach(part => {
                            if (part.startsWith('###LINK###')) {
                                const matchData = part.match(/###LINK###(.*?)###SPLIT###(.*?)###ENDLINK###/);
                                if (matchData) {
                                    const kw = matchData[1];
                                    const matchText = matchData[2];
                                    const anchor = document.createElement('a');
                                    anchor.href = rules[kw];
                                    anchor.className = "text-[#0284c7] hover:underline font-semibold";
                                    anchor.textContent = matchText;
                                    fragment.appendChild(anchor);
                                }
                            } else {
                                fragment.appendChild(document.createTextNode(part));
                            }
                        });
                        return fragment;
                    }
                    return null;
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    if (node.tagName.toLowerCase() === 'a') {
                        return null;
                    }
                    const children = Array.from(node.childNodes);
                    children.forEach(child => {
                        const replacement = processNode(child);
                        if (replacement) {
                            node.replaceChild(replacement, child);
                        }
                    });
                }
                return null;
            };

            processNode(root);
            return root.innerHTML;
        } catch (e) {
            console.error("Error applying internal links:", e);
            return content;
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center text-primary-600 font-bold">Loading Article...</div>;

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

    return (
        <div className="min-h-screen bg-gray-50">
            <SEO 
                title={article.meta_title || `${article.title} | Dr. Ulhas Sonar`}
                description={article.meta_description || article.title}
                url={`/blog/${id}`}
                image={article.image}
                type="article"
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
                        alt={article.image_alt_text || article.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
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
                                {article.h1_title || article.title}
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
                    {/* TOC & Share Sidebar */}
                    <div className="hidden lg:block">
                        <div className="sticky top-32 space-y-12">
                            {headings.length > 0 && (
                                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center text-primary-600">
                                            <List className="w-4 h-4" />
                                        </div>
                                        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Table of Contents</h4>
                                    </div>
                                    <nav className="flex flex-col gap-1 relative before:absolute before:inset-y-0 before:left-[3px] before:w-[2px] before:bg-gray-100">
                                        {headings.map((h) => (
                                            <a
                                                key={h.id}
                                                href={`#${h.id}`}
                                                className={`group relative flex items-center py-2 text-sm transition-all duration-300
                                                    ${h.level > 2 ? 'pl-6 text-gray-500' : 'pl-4 text-gray-700 font-medium'}
                                                    hover:text-primary-600 hover:translate-x-1`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth' });
                                                }}
                                            >
                                                {/* Custom marker dot */}
                                                <span className={`absolute left-0 w-2 h-2 rounded-full border-2 bg-white transition-all duration-300
                                                    ${h.level > 2 ? '-translate-x-[3px] border-gray-200 group-hover:border-primary-400' : '-translate-x-[3px] border-gray-300 group-hover:border-primary-600 group-hover:bg-primary-600'}
                                                `}/>
                                                <span className="line-clamp-2 leading-tight">{h.text}</span>
                                            </a>
                                        ))}
                                    </nav>
                                </div>
                            )}

                            <div>
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
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <article className="prose prose-sm md:prose-lg prose-primary max-w-none">
                            <div
                                className="text-gray-700 leading-relaxed space-y-4 md:space-y-6"
                                dangerouslySetInnerHTML={{ __html: applyInternalLinks(article.content).replace(/<(h[2-4])/g, (match, p1, offset) => {
                                    const content = article.content;
                                    const index = headings.findIndex(h => content.substring(offset).includes(h.text));
                                    return `<${p1} id="heading-${index}"`;
                                }).replace(/<img/g, '<img loading="lazy" class="rounded-2xl shadow-md"') }}
                            />
                        </article>

                        {/* Relevant Treatments */}
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

                        {/* CTA */}
                        <div className="mt-12 md:mt-16 p-6 md:p-8 rounded-3xl bg-primary-600 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-primary-200">
                            <div>
                                <h3 className="text-lg md:text-xl font-bold mb-2">Need a consultation?</h3>
                                <p className="text-sm md:text-base text-white/80">Schedule an appointment with Dr. Ulhas for personalized care.</p>
                            </div>
                            <Link
                                to="/contact"
                                className="w-full md:w-auto px-8 py-4 bg-white text-primary-600 rounded-xl text-center font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                            >
                                Book Visit <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* More Articles could be fetched here, but for now we hide to prevent crash */}
        </div>
    );
};

export default ArticleDetail;
