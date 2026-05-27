import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, CheckCircle2, ArrowRight, Activity, ShieldCheck, Zap, HeartPulse, ClipboardCheck, Users, HelpCircle, ChevronDown, ChevronUp, Home, Star, RotateCcw, PlusSquare, Triangle, Hexagon, ChevronLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../lib/api';
import Breadcrumbs from './ui/Breadcrumbs';
import SEO from './SEO';
import { defaultServiceFaqs } from '../constants/serviceFaqs';

// Import images
import kneeArthroscopyImg from '../assets/knee-arthroscopy.png';
import jointReplacementImg from '../assets/joint-replacement-bg.png';
import sportsMedicineImg from '../assets/sports-medicine-bg.png';
import spineSurgeryImg from '../assets/spine-surgery-bg.png';

// Fallback image
const defaultImage = "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200";

const ServiceDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t, language } = useLanguage();
    const isRtl = language === 'AR';
    
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        api.getServices()
            .then(data => {
                const found = data.find(s => s.slug === id);
                setService(found);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch service detail:", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center text-primary-600 font-bold">Loading Service...</div>;

    if (!service) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Service Not Found</h2>
                <Link to="/services" className="text-primary-600 font-medium flex items-center gap-2">
                    <ChevronLeft className="w-5 h-5" /> Back to Services
                </Link>
            </div>
        );
    }

    // Map features from service.items (JSON list)
    const features = service.items || ["Expert Diagnosis", "Personalized Treatment", "Follow-up Care", "Professional Support"];

    return (
        <main className="relative pt-20 bg-white overflow-hidden">
            <SEO 
                title={service.meta_title || `${service.title} | Dr. Ulhas Sonar`}
                description={service.meta_description || service.description}
                url={`/services/${id}`}
                image={service.image}
            />

            <div className="bg-white border-b border-gray-100">
                <Breadcrumbs items={[
                    { name: t('nav.home'), path: '/' },
                    { name: t('nav.services'), path: '/services' },
                    { name: service.title }
                ]} />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 lg:py-24">
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: isRtl ? 40 : -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-[10px] font-normal uppercase tracking-[0.3em]"
                        >
                            <Zap size={12} className="fill-primary-600" />
                            Specialized Service
                        </motion.div>

                        <h1 className="text-3xl md:text-5xl font-normal text-primary-950 mb-6 tracking-tighter leading-[1.05]">
                            {service.h1_title || service.title}
                        </h1>

                        <div 
                            className="text-base md:text-lg text-gray-500 font-normal leading-relaxed mb-10 max-w-2xl prose prose-primary"
                            dangerouslySetInnerHTML={{ __html: service.description }}
                        />

                        <div className="grid sm:grid-cols-2 gap-4 mb-10">
                            {features.slice(0, 4).map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50/80 backdrop-blur-sm border border-gray-100 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-300">
                                    <div className="w-10 h-10 rounded-xl bg-white text-primary-600 flex items-center justify-center shadow-sm flex-shrink-0">
                                        <CheckCircle2 size={20} strokeWidth={2.5} />
                                    </div>
                                    <span className="text-xs font-normal text-gray-700 leading-tight">
                                        {feature}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <a 
                                href={`tel:${import.meta.env.VITE_CONTACT_PHONE}`}
                                className="w-full sm:w-auto group flex items-center justify-center gap-3 py-4 px-10 bg-[#003B73] text-white font-normal text-[11px] uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-primary-200 hover:bg-[#002B55] hover:shadow-2xl hover:shadow-primary-300 active:scale-95 transition-all duration-300"
                            >
                                <Phone size={18} />
                                Call Us Now
                            </a>
                            <a 
                                href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER?.replace(/[^0-9]/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto group flex items-center justify-center gap-3 py-4 px-10 bg-[#25D366] text-white font-normal text-[11px] uppercase tracking-[0.2em] rounded-2xl shadow-lg shadow-emerald-100 hover:bg-[#1eb954] active:scale-95 transition-all duration-300"
                            >
                                <MessageCircle size={18} />
                                WhatsApp Now
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: isRtl ? -40 : 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative h-[400px] md:h-[500px] p-4 rounded-[4rem] bg-gradient-to-br from-primary-50 to-white border border-primary-50 shadow-2xl overflow-hidden group">
                            <img 
                                src={service.image || defaultImage} 
                                alt={service.image_alt_text || service.title} 
                                className="w-full h-full object-cover rounded-[3rem] relative z-10 group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* FAQ Section */}
                <ServiceFAQSection serviceSlug={id} customFaqs={service.faqs} serviceTitle={service.title} />

                {/* Additional Sections can be added here dynamically from service.items or extra fields */}
            </div>
        </main>
    );
};

const ServiceFAQSection = ({ serviceSlug, customFaqs, serviceTitle }) => {
    const defaultData = defaultServiceFaqs[serviceSlug] || defaultServiceFaqs["physiotherapy"];
    const faqs = (customFaqs && customFaqs.length > 0) ? customFaqs : defaultData.items;
    const badge = defaultData.badge || "Frequently asked questions";
    const defaultTitle = defaultData.title || `Answers to common ${serviceTitle.toLowerCase()} questions`;
    const title = (customFaqs && customFaqs.length > 0) ? `Answers to common ${serviceTitle.toLowerCase()} questions` : defaultTitle;
    const description = defaultData.description || `Helpful information for patients seeking ${serviceTitle.toLowerCase()} treatment.`;

    const [openIndex, setOpenIndex] = useState(0);

    return (
        <div className="max-w-4xl mx-auto py-16 md:py-24 font-sans px-4">
            <div className="text-center mb-12">
                <span className="inline-flex items-center px-4 py-1.5 mb-4 rounded-full bg-blue-50 text-blue-700 text-[10px] font-normal uppercase tracking-[0.3em] border border-blue-100/50">
                    {badge}
                </span>
                <h2 className="text-3xl md:text-5xl font-normal text-primary-950 mb-6 tracking-tighter leading-[1.05]">
                    {title}
                </h2>
                <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-normal">
                    {description}
                </p>
            </div>

            <div className="space-y-4">
                {faqs.map((faq, idx) => {
                    const isOpen = openIndex === idx;
                    const qText = faq.question || faq.q;
                    const aText = faq.answer || faq.a;
                    return (
                        <div 
                            key={idx} 
                            className="bg-white border border-gray-100/60 rounded-3xl overflow-hidden shadow-[0_10px_35px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_45px_-10px_rgba(0,0,0,0.05)] transition-all duration-500"
                        >
                            <button 
                                onClick={() => setOpenIndex(isOpen ? null : idx)}
                                className="w-full flex items-center justify-between p-6 md:p-8 text-start focus:outline-none"
                            >
                                <span className="text-base md:text-lg font-medium text-[#0A1A44] pr-8">{qText}</span>
                                <motion.span 
                                    animate={{ rotate: isOpen ? 45 : 0 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    className="text-xl md:text-2xl text-gray-400 font-light shrink-0 select-none cursor-pointer w-8 h-8 rounded-full bg-gray-50/50 flex items-center justify-center hover:bg-gray-100/70 transition-colors"
                                >
                                    ＋
                                </motion.span>
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
                                                {aText}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ServiceDetail;
