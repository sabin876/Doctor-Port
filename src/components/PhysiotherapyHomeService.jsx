import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, CheckCircle2, HelpCircle, ChevronDown, ChevronUp, Home, Star, ShieldCheck, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../lib/api';
import SEO from './SEO';
import Breadcrumbs from './ui/Breadcrumbs';
import physioIllustration from '../assets/physio-illustration.png';

const PhysiotherapyHomeService = () => {
    const { t, language } = useLanguage();
    const isRtl = language === 'AR';
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        api.getServices()
            .then(data => {
                const found = data.find(s => s.slug === 'test-physiotherapy') || 
                              data.find(s => s.slug === 'test-physiotherapy-service') || 
                              data.find(s => s.slug === 'physiotherapy');
                setService(found);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch physiotherapy service:", err);
                setLoading(false);
            });
    }, []);

    // Get static content from translations (as fallback/structure)
    const content = t('physioHome');

    // Get the description and other fields from the database if loaded, or fallback to static translated blocks
    const pageDescription = service?.description || content.hero.description;
    const pageTitle = service?.title || content.hero.title;
    const faqs = (service?.faqs && service.faqs.length > 0) ? service.faqs : content.faqs.items;

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-primary-600 font-bold bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    return (
        <main className="relative pt-20 bg-white overflow-hidden">
            <SEO 
                title={service?.meta_title || content.seo.title}
                description={service?.meta_description || content.seo.description}
                url="/services/physiotherapy"
                image={service?.image}
            />

            <div className="bg-white border-b border-gray-100">
                <Breadcrumbs items={[
                    { name: t('nav.home'), path: '/' },
                    { name: t('nav.services'), path: '/services' },
                    { name: pageTitle }
                ]} />
            </div>

            {/* Premium Background Ambient Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary-50/20 rounded-full blur-[120px] -mr-40 -mt-40"></div>
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-50/30 rounded-full blur-[120px] -ml-40 -mb-40"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 lg:py-24">
                {/* 1. Redesigned Premium Hero Section - 2 Columns */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
                    {/* Left Column: Title & Booking */}
                    <motion.div
                        initial={{ opacity: 0, x: isRtl ? 40 : -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-[10px] font-normal uppercase tracking-[0.3em]"
                        >
                            <Zap size={12} className="fill-primary-600 animate-pulse text-primary-600" />
                            DHA Licensed Experts
                        </motion.div>

                        <h1 className="text-3xl md:text-5xl font-normal text-primary-950 mb-6 tracking-tighter leading-[1.05]">
                            {pageTitle}
                        </h1>

                        <p className="text-base md:text-lg text-gray-500 font-normal leading-relaxed mb-10 max-w-2xl">
                            {content.hero.description}
                        </p>

                        {/* Dual Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <a 
                                href="tel:+971556319379"
                                className="w-full sm:w-auto group flex items-center justify-center gap-3 py-4 px-10 bg-[#003B73] text-white font-normal text-[11px] uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-primary-200 hover:bg-[#002B55] hover:shadow-2xl hover:shadow-primary-300 active:scale-95 transition-all duration-300"
                            >
                                <Phone size={18} />
                                {content.ctas.call}
                            </a>
                            <a 
                                href="https://wa.me/971556319379"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto group flex items-center justify-center gap-3 py-4 px-10 bg-[#25D366] text-white font-normal text-[11px] uppercase tracking-[0.2em] rounded-2xl shadow-lg shadow-emerald-100 hover:bg-[#1eb954] hover:shadow-xl active:scale-95 transition-all duration-300"
                            >
                                <MessageCircle size={18} />
                                {content.ctas.whatsapp}
                            </a>
                        </div>
                    </motion.div>

                    {/* Right Column: Illustration & Float Card */}
                    <motion.div
                        initial={{ opacity: 0, x: isRtl ? -40 : 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative p-4 md:p-8 rounded-[4rem] bg-gradient-to-br from-primary-50 to-white border border-primary-50 shadow-2xl overflow-hidden group">
                            <motion.img 
                                initial={{ scale: 1.1, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 1.5 }}
                                src={physioIllustration} 
                                alt="Physiotherapy Services" 
                                className="w-full h-auto relative z-10 group-hover:scale-105 transition-transform duration-700"
                            />
                            
                            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-200/20 rounded-full blur-[80px]"></div>
                            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-emerald-200/20 rounded-full blur-[80px]"></div>
                        </div>

                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="absolute -bottom-6 -left-6 md:left-0 md:-bottom-10 max-w-[280px] p-6 bg-white/90 backdrop-blur-xl border border-white rounded-[2rem] shadow-2xl z-20"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-primary-100 text-primary-700 flex items-center justify-center flex-shrink-0 animate-pulse">
                                    <Home size={24} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-normal text-primary-950 mb-1 leading-tight">Home, hotel, or office visits</h4>
                                    <p className="text-[10px] text-gray-500 font-normal leading-relaxed">Professional physiotherapy tailored to your schedule and condition.</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* 2. Dynamic Backend Description Content (Beautiful Premium Styling) */}
                {pageDescription && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="prose prose-primary max-w-4xl mx-auto py-16 px-6 md:px-12 bg-white rounded-[3.5rem] shadow-[0_15px_60px_rgba(0,0,0,0.02)] border border-gray-100 font-sans mb-24 relative overflow-hidden"
                    >
                        {/* Decorative internal ambient elements */}
                        <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary-50/50 rounded-full blur-[90px] pointer-events-none"></div>
                        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-blue-50/50 rounded-full blur-[90px] pointer-events-none"></div>

                        <div 
                            className="text-gray-700 leading-relaxed font-normal text-base md:text-lg relative z-10"
                            dangerouslySetInnerHTML={{ __html: pageDescription }}
                        />
                    </motion.div>
                )}

                {/* 3. CTA Banner - Book Your Session */}
                {content.ctaBanner && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-24"
                    >
                        <div className="relative rounded-[3.5rem] overflow-hidden bg-gradient-to-r from-[#003B73] via-[#00569e] to-[#0284c7] py-16 px-8 md:py-20 md:px-16 shadow-2xl">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-40 -mt-40 blur-[100px] pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-400/10 rounded-full -ml-32 -mb-32 blur-[80px] pointer-events-none" />
                            
                            <div className="relative z-10 flex flex-col items-center text-center gap-8">
                                <div className="inline-flex items-center px-5 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-[10px] font-normal uppercase tracking-[0.25em]">
                                    <Zap size={12} className="mr-2 fill-yellow-400 text-yellow-400" />
                                    Expert Physiotherapy in Dubai
                                </div>

                                <h2 className="text-2xl md:text-4xl font-normal text-white tracking-tight leading-[1.1] max-w-3xl">
                                    {content.ctaBanner.title}
                                </h2>
                                <p className="text-white/75 text-base md:text-lg font-light max-w-2xl leading-relaxed">
                                    {content.ctaBanner.subtitle}
                                </p>

                                <div className="flex flex-col sm:flex-row items-center gap-5 mt-4 w-full sm:w-auto">
                                    <a
                                        href="tel:+971556319379"
                                        className="w-full sm:w-auto group flex items-center justify-center gap-3 py-4 px-10 bg-white text-[#003B73] font-semibold text-[12px] uppercase tracking-[0.15em] rounded-2xl shadow-xl hover:bg-blue-50 hover:scale-[1.03] active:scale-95 transition-all duration-300"
                                    >
                                        <Phone size={18} />
                                        Call Us Now
                                    </a>
                                    <a
                                        href="https://wa.me/971556319379"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full sm:w-auto group flex items-center justify-center gap-3 py-4 px-10 bg-[#25D366] text-white font-semibold text-[12px] uppercase tracking-[0.15em] rounded-2xl shadow-xl hover:bg-[#1eb954] hover:scale-[1.03] active:scale-95 transition-all duration-300"
                                    >
                                        <MessageCircle size={18} />
                                        WhatsApp Now
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* 4. FAQs - Dynamic Interactive Glassmorphic Accordion */}
                <div className="max-w-4xl mx-auto py-16">
                    <div className="text-center mb-16">
                        <HelpCircle className="w-12 h-12 text-primary-600 mx-auto mb-6 animate-pulse" />
                        <h2 className="text-2xl md:text-4xl font-normal text-primary-950 mb-6">{content.faqs.title}</h2>
                        <p className="text-gray-500">Find answers to common questions about our home physiotherapy services.</p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, idx) => {
                            const qText = faq.question || faq.q;
                            const aText = faq.answer || faq.a;
                            return (
                                <FAQItem key={idx} question={qText} answer={aText} />
                            );
                        })}
                    </div>
                </div>
            </div>
        </main>
    );
};

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-start"
            >
                <span className="text-lg font-normal text-gray-900 pr-8">{question}</span>
                {isOpen ? <ChevronUp className="text-primary-600" /> : <ChevronDown className="text-gray-400" />}
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="px-6 md:px-8 pb-8">
                            <p className="text-gray-600 leading-relaxed border-t border-gray-50 pt-6 text-sm md:text-base font-normal">
                                {answer}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PhysiotherapyHomeService;
