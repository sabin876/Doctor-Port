import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, CheckCircle2, ChevronLeft, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../lib/api';
import { getTranslatedService } from '../lib/serviceTranslations';
import Breadcrumbs from './ui/Breadcrumbs';
import SEO from './SEO';
import CTABanner from './CTABanner';

const defaultImage = "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200";

const SubServiceDetail = () => {
    const { parent_slug, sub_slug } = useParams();
    const { t, language } = useLanguage();
    const isRtl = language === 'AR';

    const [parentService, setParentService] = useState(null);
    const [subService, setSubService] = useState(null);
    const [loading, setLoading] = useState(true);

    const contactPhone = import.meta.env.VITE_CONTACT_PHONE || "+971556319379";
    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "+971556319379";

    useEffect(() => {
        window.scrollTo(0, 0);
        api.getServices()
            .then(data => {
                const foundParent = data.find(s => s.slug?.toLowerCase() === parent_slug?.toLowerCase());
                
                if (foundParent) {
                    const translatedParent = getTranslatedService(foundParent, t, language);
                    setParentService(translatedParent);
                    
                    const foundSub = foundParent.sub_services?.find(sub => sub.slug?.toLowerCase() === sub_slug?.toLowerCase());
                    setSubService(foundSub);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch sub-service details:", err);
                setLoading(false);
            });
    }, [parent_slug, sub_slug, language, t]);

    if (loading) return <div className="min-h-screen flex items-center justify-center text-primary-600 font-bold">Loading...</div>;

    if (!parentService || !subService) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Service Not Found</h2>
                <Link to="/services" className="text-primary-600 font-medium flex items-center gap-2">
                    <ChevronLeft className="w-5 h-5" /> Back to Services
                </Link>
            </div>
        );
    }

    const ctaText = language === 'AR' ? {
        title: "هل تبحث عن استشارة متخصصة؟",
        subtitle: "استشر أخصائينا المدرب في المملكة المتحدة للحصول على رعاية سريرية متقدمة."
    } : language === 'HI' ? {
        title: "क्या आप विशेषज्ञ परामर्श की तलाश में हैं?",
        subtitle: "उन्नत और व्यक्तिगत देखभाल के लिए हमारे यूके-प्रशिक्षित विशेषज्ञ से संपर्क करें।"
    } : {
        title: "Seeking Professional Advice?",
        subtitle: "Consult our UK-trained specialist for advanced, personalized care."
    };

    return (
        <main className="relative pt-20 bg-white overflow-hidden">
            <SEO 
                title={`${subService.title} | ${parentService.title} | Dr. Ulhas Sonar`}
                description={`Learn more about ${subService.title}, a specialized treatment under ${parentService.title}.`}
                url={`/services/${parent_slug}/${sub_slug}`}
                image={parentService.image || defaultImage}
            />

            <div className="bg-white border-b border-gray-100">
                <Breadcrumbs items={[
                    { name: t('nav.home') || "Home", path: '/' },
                    { name: t('nav.services') || "Services", path: '/services' },
                    { name: parentService.title, path: `/services/${parentService.slug}` },
                    { name: subService.title }
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
                            Specialized Treatment
                        </motion.div>

                        <h1 className="text-2xl md:text-4xl font-normal text-primary-950 mb-4 tracking-tighter leading-[1.05]">
                            {subService.title}
                        </h1>
                        <h2 className="text-xl md:text-2xl font-light text-primary-700 mb-6">
                            Part of {parentService.title}
                        </h2>

                        <div className="text-base md:text-lg text-gray-500 font-normal leading-relaxed mb-10 max-w-2xl text-justify">
                            <p className="mb-4">
                                {subService.title} is an advanced sub-specialty under our comprehensive {parentService.title} program. We provide targeted diagnostics, cutting-edge therapies, and personalized rehabilitation for optimal patient outcomes.
                            </p>
                            <p>
                                Our clinical approach centers on providing tailored, premium care guided by international medical benchmarks, safety guidelines, and active therapy to ensure your fast recovery.
                            </p>
                        </div>



                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <a 
                                href={`tel:${contactPhone}`}
                                className="w-full sm:w-auto group flex items-center justify-center gap-3 py-4 px-10 bg-[#003B73] text-white font-normal text-[11px] uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-primary-200 hover:bg-[#002B55] hover:shadow-2xl hover:shadow-primary-300 active:scale-95 transition-all duration-300"
                            >
                                <Phone size={18} />
                                Call Us Now
                            </a>
                            <a 
                                href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
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
                                src={parentService.image || defaultImage} 
                                alt={subService.title} 
                                className="w-full h-full object-cover rounded-[3rem] relative z-10 group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </motion.div>
                </div>

                <CTABanner title={ctaText.title} subtitle={ctaText.subtitle} />

                {/* Additional Information Section inherited from Parent */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-24 mt-16 text-center"
                >
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 mb-6 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-[10px] font-normal uppercase tracking-[0.2em]">
                        Explore More
                    </span>
                    <h3 className="text-3xl md:text-5xl font-normal text-primary-950 tracking-tighter leading-[1.05] mb-6">
                        Comprehensive {parentService.title} Care
                    </h3>
                    <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-3xl mx-auto mb-10">
                        {subService.title} is just one of the many expert treatments we provide. Read more about our full range of procedures and how our UK-trained surgeon can help you.
                    </p>
                    <Link 
                        to={`/services/${parentService.slug}`}
                        className="inline-flex items-center justify-center gap-3 py-4 px-10 bg-white border border-gray-200 text-primary-700 font-semibold text-[12px] uppercase tracking-[0.15em] rounded-2xl shadow-sm hover:border-primary-300 hover:text-primary-800 transition-all duration-300"
                    >
                        View Full Service Overview
                    </Link>
                </motion.div>
            </div>
        </main>
    );
};

export default SubServiceDetail;
