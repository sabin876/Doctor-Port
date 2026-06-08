import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, CheckCircle2, HelpCircle, ChevronDown, ChevronUp, Home, Star, ShieldCheck, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../lib/api';
import SEO from './SEO';
import Breadcrumbs from './ui/Breadcrumbs';
import physioIllustration from '../assets/physio-illustration.png';

const conditions = [
  {
    id: 1,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    ),
    title: "Back and neck pain",
    description: "Targeted rehabilitation for stiffness, postural pain, muscular spasm, and reduced function.",
  },
  {
    id: 2,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <circle cx="12" cy="12" r="9" /><path d="M12 8v4l3 3" />
      </svg>
    ),
    title: "Knee pain and stiffness",
    description: "Structured therapy to improve joint movement, strength, and confidence during walking and activity.",
  },
  {
    id: 3,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <path d="M12 2a10 10 0 1 0 10 10" /><path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Shoulder pain",
    description: "Focused treatment for pain, weakness, and limited shoulder movement during daily activities.",
  },
  {
    id: 4,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: "Sports injuries",
    description: "Recovery programs for muscle strains, soft tissue injury, overuse problems, and return to activity.",
  },
  {
    id: 5,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <circle cx="12" cy="12" r="3" /><circle cx="12" cy="12" r="8" />
      </svg>
    ),
    title: "Arthritis care",
    description: "Gentle, progressive treatment to reduce pain, improve movement and support long-term joint health.",
  },
  {
    id: 6,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <path d="M12 5v14M5 12h14" />
      </svg>
    ),
    title: "Post-surgical rehabilitation",
    description: "Planned recovery support after orthopaedic procedures with mobility and strengthening exercises.",
  },
  {
    id: 7,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <path d="M12 3l9 18H3L12 3z" />
      </svg>
    ),
    title: "Deformity correction support",
    description: "Rehabilitation care to improve alignment-related movement patterns and functional recovery.",
  },
  {
    id: 8,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <circle cx="12" cy="12" r="5" fill="currentColor" fillOpacity="0.3" /><circle cx="12" cy="12" r="9" />
      </svg>
    ),
    title: "Hip joint replacement recovery",
    description: "Stepwise physiotherapy focused on strength, balance, walking confidence, and safe return to daily life.",
  },
];

const checklistItems = [
  "Treatment guided by consultant orthopedics surgeon expertise",
  "Individual attention with one-to-one sessions",
  "Clear diagnosis and targeted treatment planning",
  "Focus on long-term recovery, not temporary relief",
  "Availability of both clinic-based and home physiotherapy services",
];

const tagBadges = [
  "One-to-one physiotherapy sessions",
  "Structured diagnosis and recovery planning",
];

// Simple physiotherapist SVG illustration
function TherapistIllustration() {
  return (
    <svg viewBox="0 0 200 220" width="200" height="220" xmlns="http://www.w3.org/2000/svg">
      {/* Head */}
      <ellipse cx="100" cy="48" rx="28" ry="30" fill="#f0c08a" />
      {/* Hair / cap */}
      <ellipse cx="100" cy="28" rx="30" ry="18" fill="#1a3a5c" />
      {/* Neck */}
      <rect x="91" y="74" width="18" height="14" rx="4" fill="#f0c08a" />
      {/* Body / scrubs */}
      <rect x="62" y="86" width="76" height="80" rx="18" fill="#1a4d80" />
      {/* Clipboard */}
      <rect x="108" y="98" width="38" height="48" rx="6" fill="#d0dff0" />
      <rect x="112" y="94" width="30" height="8" rx="3" fill="#b0c8e8" />
      <line x1="115" y1="112" x2="140" y2="112" stroke="#7a9bbf" strokeWidth="2" strokeLinecap="round" />
      <line x1="115" y1="120" x2="140" y2="120" stroke="#7a9bbf" strokeWidth="2" strokeLinecap="round" />
      <line x1="115" y1="128" x2="132" y2="128" stroke="#7a9bbf" strokeWidth="2" strokeLinecap="round" />
      {/* Left arm */}
      <rect x="44" y="90" width="22" height="52" rx="11" fill="#1a4d80" />
      {/* Stethoscope arc */}
      <path d="M66 118 Q80 140 96 130" fill="none" stroke="#8aaec8" strokeWidth="3" strokeLinecap="round" />
      <circle cx="96" cy="130" r="5" fill="#8aaec8" />
      {/* Legs */}
      <rect x="72" y="160" width="22" height="50" rx="10" fill="#1a3a5c" />
      <rect x="106" y="160" width="22" height="50" rx="10" fill="#1a3a5c" />
      {/* Shoes */}
      <ellipse cx="83" cy="208" rx="14" ry="8" fill="#0f2236" />
      <ellipse cx="117" cy="208" rx="14" ry="8" fill="#0f2236" />
    </svg>
  );
}

const PhysiotherapyHomeService = () => {
    const { t, language } = useLanguage();
    const isRtl = language === 'AR';
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);

    const phoneNumber = import.meta.env.VITE_CONTACT_PHONE || "+971556319379";
    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "+971556319379";
    const whatsappClean = whatsappNumber.replace(/[^0-9]/g, '');

    useEffect(() => {
        window.scrollTo(0, 0);
        api.getServices()
            .then(data => {
                const found = data.find(s => s.slug === 'physiotherapy') || 
                              data.find(s => s.slug === 'test-physiotherapy') || 
                              data.find(s => s.slug === 'test-physiotherapy-service');
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

    const conditionsData = (service?.conditions && service.conditions.length > 0) ? service.conditions : conditions;
    const checklistData = (service?.checklist_items && service.checklist_items.length > 0) ? service.checklist_items : checklistItems;
    const tagBadgesData = (service?.tag_badges && service.tag_badges.length > 0) ? service.tag_badges : tagBadges;

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
                                href={`tel:${phoneNumber}`}
                                className="w-full sm:w-auto group flex items-center justify-center gap-3 py-4 px-10 bg-[#003B73] text-white font-normal text-[11px] uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-primary-200 hover:bg-[#002B55] hover:shadow-2xl hover:shadow-primary-300 active:scale-95 transition-all duration-300"
                            >
                                <Phone size={18} />
                                {content.ctas.call}
                            </a>
                            <a 
                                href={`https://wa.me/${whatsappClean}`}
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

                {/* 2a. Conditions managed with physiotherapy services */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-24 relative"
                >
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
                        <div className="max-w-2xl">
                            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 mb-4 rounded-full bg-primary-50 border border-primary-100 text-[#003B73] text-[10px] font-normal uppercase tracking-[0.2em]">
                                Conditions managed with physiotherapy services
                            </span>
                            <h2 className="text-3xl md:text-5xl font-normal text-primary-950 tracking-tighter leading-[1.05] mb-4">
                                {service?.conditions_title || "Professional care for pain, stiffness, and movement problems"}
                            </h2>
                        </div>
                        <div className="max-w-md">
                            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                                Physiotherapy plays an important role in managing a wide range of conditions. Early
                                treatment often leads to faster recovery and helps prevent long-term complications.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {conditionsData.map((condition) => (
                            <div
                                key={condition.id}
                                className="group bg-primary-600 text-white border border-primary-500 rounded-[2.5rem] p-8 shadow-md hover:-translate-y-1.5 hover:bg-primary-700 hover:shadow-lg transition-all duration-300"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-white/20 text-white flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white group-hover:text-primary-600 transition-all duration-300 shadow-sm overflow-hidden">
                                    {typeof condition.icon === 'string' ? (
                                        <div 
                                            className="w-[22px] h-[22px] flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:stroke-current"
                                            dangerouslySetInnerHTML={{ __html: condition.icon }} 
                                        />
                                    ) : (
                                        condition.icon
                                    )}
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-3 leading-snug">
                                    {condition.title}
                                </h3>
                                 <div 
                                    className="text-blue-100 text-xs md:text-sm leading-relaxed font-light [&>p]:mb-1 [&>ul]:list-disc [&>ul]:pl-4 [&>ol]:list-decimal [&>ol]:pl-4 [&_a]:text-white [&_a]:underline"
                                    dangerouslySetInnerHTML={{ __html: condition.description }}
                                 />
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* 2b. Why Choose Us / Quality Care */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24"
                >
                    {/* Left Column: Why Choose Us info */}
                    <div className="lg:col-span-7 space-y-8">
                        <div>
                            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 mb-4 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-normal uppercase tracking-[0.2em]">
                                Why choose our physiotherapy services in Dubai
                            </span>
                            <h2 className="text-3xl md:text-5xl font-normal text-primary-950 tracking-tighter leading-[1.05] mb-4">
                                {service?.checklist_title || "Clinical structure, one-to-one care, and clear treatment direction"}
                            </h2>
                            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                                Choosing the right physiotherapy service is important for both safety and results. Our
                                approach is based on careful assessment, targeted treatment, and ongoing progression.
                            </p>
                        </div>

                        <div className="space-y-3.5">
                            {checklistData.map((item, i) => (
                                <div key={i} className="flex items-start gap-4 p-4 bg-primary-600 text-white border border-primary-500 rounded-3xl shadow-md hover:bg-primary-700 hover:shadow-lg transition-all duration-300">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center mt-0.5">
                                        <CheckCircle2 size={16} className="fill-white/10" />
                                    </div>
                                    <span className="text-white text-sm md:text-base font-normal leading-relaxed">{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="bg-gradient-to-br from-[#003B73]/5 to-sky-50/25 border-l-4 border-[#003B73] rounded-3xl p-6 shadow-sm">
                            <p className="text-[#003B73] font-normal text-sm md:text-base leading-relaxed italic">
                                "Every patient is assessed carefully, and treatment is adapted as progress is made —
                                ensuring the right care at every stage of recovery."
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Illustration & Badges */}
                    <div className="lg:col-span-5 flex flex-col gap-6 w-full">
                        <div className="bg-white border border-gray-100 rounded-[3.5rem] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col items-center relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-full blur-3xl pointer-events-none"></div>
                            
                            <span className="self-end px-4 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-[10px] font-normal uppercase tracking-[0.2em] mb-6">
                                UK-trained Orthopaedic Expertise
                            </span>
                            
                            <div className="flex justify-center items-center py-6 group-hover:scale-105 transition-transform duration-500 max-h-72">
                                {service?.checklist_image ? (
                                    <img 
                                        src={service.checklist_image} 
                                        alt="Value checklist illustration" 
                                        className="max-h-64 w-auto object-contain rounded-2xl"
                                    />
                                ) : (
                                    <TherapistIllustration />
                                )}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {tagBadgesData.map((tag, i) => (
                                <span 
                                    key={i} 
                                    className="bg-white border border-gray-150 rounded-2xl px-5 py-3.5 text-[11px] font-normal uppercase tracking-[0.1em] text-primary-950 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.03)] hover:border-[#003B73] hover:shadow-md transition-all duration-300 cursor-default"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>

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

                {/* New Post-FAQ CTA Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-7xl mx-auto px-4 mb-24 font-montserrat"
                >
                    <div className="bg-blue-50 rounded-[3.5rem] p-8 sm:p-12 md:p-20 shadow-[0_30px_70px_rgba(0,0,0,0.06)] border border-blue-100 text-center relative overflow-hidden group">
                        {/* Decorative Background Elements */}
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-50/50 rounded-full blur-[100px] group-hover:bg-blue-100/50 transition-colors duration-700"></div>
                        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-50/50 rounded-full blur-[100px] group-hover:bg-emerald-100/50 transition-colors duration-700"></div>

                        <div className="relative z-10">
                            {/* Badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="inline-flex items-center px-6 py-2.5 mb-10 rounded-full bg-blue-50 text-primary-700 text-[11px] font-normal uppercase tracking-[0.25em] border border-blue-100"
                            >
                                Book your physiotherapy session today
                            </motion.div>
                            
                            <h2 className="text-2xl md:text-4xl font-normal text-primary-950 mb-8 tracking-tighter leading-[1.1] max-w-4xl mx-auto">
                                Safe, structured, and professional care in Dubai
                            </h2>
                            
                            <p className="text-base md:text-lg text-gray-500 font-normal max-w-2xl mx-auto mb-14 leading-relaxed opacity-80">
                                Home physiotherapy, hotel visits, workplace sessions, and rehabilitation support designed around your condition and schedule.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                <a 
                                    href={`tel:${phoneNumber}`}
                                    className="w-full sm:w-auto flex items-center justify-center gap-3 py-5 px-12 bg-[#003B73] text-white font-normal text-[12px] uppercase tracking-[0.2em] rounded-[2rem] shadow-2xl shadow-primary-200 hover:bg-[#002B55] hover:-translate-y-1 active:scale-95 transition-all duration-300"
                                >
                                    <Phone size={18} />
                                    Call Us Now
                                </a>
                                <a 
                                    href={`https://wa.me/${whatsappClean}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full sm:w-auto flex items-center justify-center gap-3 py-5 px-12 bg-[#25D366] text-white font-normal text-[12px] uppercase tracking-[0.2em] rounded-[2rem] shadow-xl shadow-emerald-100 hover:bg-[#1eb954] hover:-translate-y-1 active:scale-95 transition-all duration-300"
                                >
                                    <MessageCircle size={18} />
                                    WhatsApp Now
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>
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
