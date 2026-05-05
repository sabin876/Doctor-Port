import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, CheckCircle2, ArrowRight, Activity, ShieldCheck, Zap, HeartPulse, ClipboardCheck, Users, HelpCircle, ChevronDown, ChevronUp, Home, Star, RotateCcw, PlusSquare, Triangle, Hexagon, ChevronLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../lib/api';
import Breadcrumbs from './ui/Breadcrumbs';
import SEO from './SEO';

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

                        <p className="text-base md:text-lg text-gray-500 font-normal leading-relaxed mb-10 max-w-2xl">
                            {service.description}
                        </p>

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
                                href="tel:+971551053445"
                                className="w-full sm:w-auto group flex items-center justify-center gap-3 py-4 px-10 bg-[#003B73] text-white font-normal text-[11px] uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-primary-200 hover:bg-[#002B55] hover:shadow-2xl hover:shadow-primary-300 transition-all duration-300"
                            >
                                <Phone size={18} />
                                Call Us Now
                            </a>
                            <a 
                                href="https://wa.me/971551053445"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto group flex items-center justify-center gap-3 py-4 px-10 bg-[#25D366] text-white font-normal text-[11px] uppercase tracking-[0.2em] rounded-2xl shadow-lg shadow-emerald-100 hover:bg-[#1eb954] transition-all duration-300"
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

                {/* Additional Sections can be added here dynamically from service.items or extra fields */}
            </div>
        </main>
    );
};

export default ServiceDetail;
