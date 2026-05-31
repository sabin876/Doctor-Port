import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Calendar, ChevronLeft, Share2, Tag, Activity, User, ArrowRight, List, Link2, Check } from 'lucide-react';
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
    const [activeId, setActiveId] = useState('');
    const [copied, setCopied] = useState(false);

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

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollPosition = window.scrollY + 200; // Offset for navbar

                    let currentActiveId = '';
                    for (let i = 0; i < headings.length; i++) {
                        const el = document.getElementById(headings[i].id);
                        if (el) {
                            const top = el.offsetTop;
                            if (scrollPosition >= top) {
                                currentActiveId = headings[i].id;
                            } else {
                                break;
                            }
                        }
                    }

                    // Fallback to last heading at the bottom of the page
                    const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 150;
                    if (isBottom && headings.length > 0) {
                        currentActiveId = headings[headings.length - 1].id;
                    }

                    // Fallback to first heading if near the top
                    if (!currentActiveId && headings.length > 0) {
                        currentActiveId = headings[0].id;
                    }

                    setActiveId(currentActiveId);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Run once initially after elements have rendered
        const timer = setTimeout(handleScroll, 150);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timer);
        };
    }, [headings]);

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            })
            .catch(err => {
                console.error('Could not copy text: ', err);
            });
    };

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
                    <div className="max-w-6xl mx-auto px-6 pb-12 w-full">
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
            <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* TOC & Share Sidebar */}
                    <div className="hidden lg:block">
                        <div className="sticky top-32 space-y-8">
                            {headings.length > 0 && (
                                <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)] backdrop-blur-sm transition-all duration-300 hover:shadow-[0_20px_50px_rgb(0,0,0,0.035)]">
                                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
                                        <div className="w-8 h-8 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                                            <List className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h4 className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] leading-tight">Table of</h4>
                                            <h4 className="text-xs font-bold text-primary-950 uppercase tracking-[0.05em] leading-tight">Contents</h4>
                                        </div>
                                    </div>
                                    
                                    <div className="relative pl-4">
                                        {/* Vertical Timeline Bar */}
                                        <div className="absolute left-[5.5px] top-2 bottom-2 w-[1.5px] bg-gray-100" />
                                        
                                        <nav className="flex flex-col gap-4">
                                            {headings.map((h) => {
                                                const isActive = activeId === h.id;
                                                return (
                                                    <a
                                                        key={h.id}
                                                        href={`#${h.id}`}
                                                        className={`group relative flex items-start text-xs leading-relaxed transition-all duration-300 ${
                                                            isActive
                                                                ? 'text-primary-600 font-semibold pl-2'
                                                                : 'text-gray-500 hover:text-gray-900 font-normal hover:pl-1'
                                                        }`}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            const element = document.getElementById(h.id);
                                                            if (element) {
                                                                // Calculate scroll position offset for sticky header
                                                                const yOffset = -90; 
                                                                const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
                                                                window.scrollTo({ top: y, behavior: 'smooth' });
                                                            }
                                                        }}
                                                    >
                                                        {/* Interactive Bullet Dot */}
                                                        <span 
                                                            className={`absolute left-[-16px] top-[6px] w-[7px] h-[7px] rounded-full border bg-white transition-all duration-300 ${
                                                                isActive
                                                                    ? 'border-primary-600 bg-primary-600 scale-125 shadow-[0_0_8px_rgba(2,132,199,0.6)]'
                                                                    : 'border-gray-300 group-hover:border-gray-500 group-hover:scale-110'
                                                            }`}
                                                        />
                                                        <span className={h.level > 2 ? 'pl-3 text-[11px] text-gray-400' : ''}>
                                                            {h.text}
                                                        </span>
                                                    </a>
                                                );
                                            })}
                                        </nav>
                                    </div>
                                </div>
                            )}

                            {/* Share & Meta Card */}
                            <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)] backdrop-blur-sm transition-all duration-300 hover:shadow-[0_20px_50px_rgb(0,0,0,0.035)]">
                                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4 pb-2 border-b border-gray-50">Share Article</h4>
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <button 
                                            onClick={handleShare}
                                            className="w-10 h-10 rounded-xl border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary-50 hover:border-primary-200 hover:text-primary-600 active:scale-95 transition-all duration-300"
                                            title="Copy Link to Clipboard"
                                        >
                                            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                                        </button>
                                        
                                        {/* Beautiful dynamic Copy Tooltip */}
                                        {copied && (
                                            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2.5 py-1 text-[10px] font-medium text-white bg-gray-900 rounded-lg whitespace-nowrap shadow-md animate-fade-in">
                                                Link Copied!
                                            </span>
                                        )}
                                    </div>
                                    <a
                                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-xl border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-sky-50 hover:border-sky-200 hover:text-sky-600 active:scale-95 transition-all duration-300"
                                        title="Share on Twitter / X"
                                    >
                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                        </svg>
                                    </a>
                                    <a
                                        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + ' ' + window.location.href)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-xl border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-600 active:scale-95 transition-all duration-300"
                                        title="Share on WhatsApp"
                                    >
                                        <svg className="w-4.5 h-4.5 fill-current text-current" viewBox="0 0 24 24">
                                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.731-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.57 1.977 14.1 1.002 11.99.002c-5.439 0-9.864 4.372-9.868 9.8.001 2.01.528 3.975 1.527 5.727l-.991 3.616 3.709-.965zm11.39-7.234c-.3-.15-1.772-.875-2.046-.975-.276-.1-.477-.15-.677.15-.2.3-.777.975-.951 1.174-.176.2-.351.224-.652.074-.3-.15-1.265-.467-2.41-1.485-.89-.794-1.49-1.775-1.665-2.075-.175-.3-.019-.462.13-.611.135-.135.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.677-1.625-.926-2.225-.244-.589-.493-.51-.677-.52l-.577-.008c-.2 0-.527.075-.803.375-.276.3-1.053 1.025-1.053 2.5s1.077 2.9 1.227 3.1c.15.2 2.119 3.235 5.132 4.537.717.31 1.275.494 1.71.632.72.228 1.375.196 1.893.118.577-.087 1.771-.724 2.022-1.424.252-.7.252-1.3.176-1.425-.076-.12-.276-.2-.577-.35z" />
                                        </svg>
                                    </a>
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
