import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../lib/api';

const defaultItems = [
    {
        id: 1,
        category: 'knee',
        title: 'Second Opinion Before Knee Replacement',
        p1: 'Knee replacement decisions should be based on symptoms, X-ray findings, arthritis severity, alignment, walking ability and response to previous treatment.',
        p2: 'A second opinion can help clarify whether the patient needs total knee replacement, partial knee replacement, robotic knee replacement, knee preservation surgery, osteotomy, PRP treatment or continued non-surgical care.'
    },
    {
        id: 2,
        category: 'acl',
        title: 'Second Opinion Before ACL or Meniscus Surgery',
        p1: 'Sports injury surgery should be planned according to injury pattern, knee stability, meniscus condition, cartilage health, activity level and return-to-sport goals.',
        p2: 'A second opinion can help patients understand whether ACL reconstruction, revision ACL reconstruction, meniscus repair, meniscus trimming, knee arthroscopy or rehabilitation is the most appropriate choice.'
    },
    {
        id: 3,
        category: 'hipShoulder',
        title: 'Second Opinion Before Hip or Shoulder Surgery',
        p1: 'Hip and shoulder surgery decisions depend on pain severity, stiffness, imaging findings, functional limitation and response to non-surgical treatment.',
        p2: 'A second opinion can help clarify whether hip replacement, shoulder arthroscopy, rotator cuff repair, instability surgery, injections or rehabilitation is suitable.'
    },
    {
        id: 4,
        category: 'fracture',
        title: 'Second Opinion for Fracture or Trauma Treatment',
        p1: 'Fracture treatment decisions depend on the fracture pattern, displacement, stability, joint involvement, soft-tissue condition and patient activity goals.',
        p2: 'A second opinion may help patients understand whether plaster, splinting, bracing, fracture fixation surgery or further imaging is required.'
    }
];

const SecondOpinionSection = ({ customBadge, customTitle, customDescription, customItems }) => {
    const { language } = useLanguage();
    const isRtl = language === 'AR';
    const [opinions, setOpinions] = useState(() => {
        if (Array.isArray(customItems) && customItems.length > 0) {
            const activeOnly = customItems.filter(item => item.is_active !== false);
            return activeOnly.map(item => ({
                id: item.id,
                category: item.category,
                title: item.title,
                p1: item.paragraph_1 || item.p1 || '',
                p2: item.paragraph_2 || item.p2 || ''
            }));
        }
        if (typeof window !== 'undefined' && window.__INITIAL_SECOND_OPINIONS__ && window.__INITIAL_SECOND_OPINIONS__.length > 0) {
            const activeOnly = window.__INITIAL_SECOND_OPINIONS__.filter(item => item.is_active !== false);
            return activeOnly.map(item => ({
                id: item.id,
                category: item.category,
                title: item.title,
                p1: item.paragraph_1 || item.p1 || '',
                p2: item.paragraph_2 || item.p2 || ''
            }));
        }
        return defaultItems;
    });
    const [loading, setLoading] = useState(() => {
        if (Array.isArray(customItems) && customItems.length > 0) return false;
        if (typeof window !== 'undefined' && window.__INITIAL_SECOND_OPINIONS__) return false;
        return true;
    });

    const whatsappNumber = "+919049200041";
    const whatsappMessage = encodeURIComponent("Hello Dr. Ulhas, I would like to get a second opinion regarding my orthopedic condition.");

    useEffect(() => {
        if (Array.isArray(customItems) && customItems.length > 0) {
            const activeOnly = customItems.filter(item => item.is_active !== false);
            const formatted = activeOnly.map(item => ({
                id: item.id,
                category: item.category,
                title: item.title,
                p1: item.paragraph_1 || item.p1 || '',
                p2: item.paragraph_2 || item.p2 || ''
            }));
            setOpinions(formatted);
            setLoading(false);
            return;
        }

        if (typeof window !== 'undefined' && window.__INITIAL_SECOND_OPINIONS__) {
            setLoading(false);
            return;
        }

        api.getSecondOpinions()
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    const activeOnly = data.filter(item => item.is_active !== false);
                    const formatted = activeOnly.map(item => ({
                        id: item.id,
                        category: item.category,
                        title: item.title,
                        p1: item.paragraph_1 || item.p1 || '',
                        p2: item.paragraph_2 || item.p2 || ''
                    }));
                    setOpinions(formatted);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch second opinions:", err);
                setLoading(false);
            });
    }, [customItems]);

    return (
        <section id="second-opinion-section" className="py-16 md:py-20 bg-gray-50 border-t border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header (Clean & Icon-free) */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#003B73] text-xs font-semibold uppercase tracking-wider mb-3">
                        <span>{customBadge || "Specialized Orthopedic Care"}</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-montserrat font-bold text-gray-900 leading-tight mb-4">
                        {customTitle || "Second Opinion Services"}
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600 font-normal leading-relaxed">
                        {customDescription || "Get expert evaluation and clear, evidence-based recommendations before undergoing surgery or complex orthopedic treatment."}
                    </p>
                </div>

                {/* 4 Clean Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
                    {opinions.map((item, index) => (
                        <motion.div
                            key={item.id || index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                        >
                            <div>
                                {/* Title (Icon Removed) */}
                                <h3 className="text-lg sm:text-xl font-montserrat font-bold text-gray-900 leading-snug mb-4">
                                    {item.title}
                                </h3>

                                {/* Paragraphs */}
                                <div className="space-y-3 text-sm text-gray-600 leading-relaxed font-normal">
                                    <p>{item.p1}</p>
                                    <p className="text-gray-700 font-medium">{item.p2}</p>
                                </div>
                            </div>

                            {/* Card Footer CTA */}
                            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                                <span className="text-xs text-gray-400 font-medium">Dr. Ulhas Sonar</span>
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-600 uppercase tracking-wider hover:text-primary-800 transition-colors"
                                >
                                    <span>Consult Now</span>
                                    <ArrowRight size={14} className={isRtl ? 'rotate-180' : ''} />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA Banner */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-1">
                            Need a Second Opinion on Your MRI or X-Ray?
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-600">
                            Book a direct consultation or share your medical reports via WhatsApp for expert advice.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 shrink-0 w-full sm:w-auto">
                        <Link
                            to="/contact"
                            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-xs"
                        >
                            <Calendar size={15} />
                            <span>Book Consultation</span>
                        </Link>
                        <a
                            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-xs"
                        >
                            <MessageCircle size={15} />
                            <span>WhatsApp</span>
                        </a>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default SecondOpinionSection;
