import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Activity, Zap, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import bodyGraphic from '../assets/body-graphic.png';

const SportingInjury = () => {
    const { language } = useLanguage();
    const isRtl = language === 'AR';
    const [activeArea, setActiveArea] = useState('knee');

    const anatomicalCategories = [
        {
            id: 'knee',
            title: isRtl ? 'الركبة والورك' : 'Knee & Hip',
            icon: <Activity className="w-5 h-5 text-primary-500" />,
            treatments: [
                isRtl ? 'إدارة إصابات الرباط الصليبي والغضروف المفصلي' : 'ACL & Meniscus Injury Management',
                isRtl ? 'جراحات استبدال المفاصل الكلية والجزئية' : 'Total & Partial Joint Replacements',
                isRtl ? 'الجراحات بمساعدة الروبوت والكمبيوتر' : 'Robotic & Computer-Assisted Surgeries',
                isRtl ? 'تصحيح التشوهات وقطع العظم' : 'Deformity Corrections & Osteotomies'
            ]
        },
        {
            id: 'shoulder',
            title: isRtl ? 'الكتف والأطراف العلوية' : 'Shoulder & Upper Limb',
            icon: <Zap className="w-5 h-5 text-teal-500" />,
            treatments: [
                isRtl ? 'تنظير الكتف المتقدم' : 'Advanced Shoulder Arthroscopy',
                isRtl ? 'إصلاح الكفة المدورة' : 'Rotator Cuff & Labral Repair',
                isRtl ? 'علاج عدم استقرار الكتف' : 'Shoulder Instability Treatment',
                isRtl ? 'إدارة حالات تيبس الكتف' : 'Frozen Shoulder Management'
            ]
        },
        {
            id: 'general',
            title: isRtl ? 'الصدمات والحفاظ على المفاصل' : 'Trauma & Preservation',
            icon: <ShieldCheck className="w-5 h-5 text-blue-500" />,
            treatments: [
                isRtl ? 'رعاية الكسور المعقدة والصدمات' : 'Complex Fracture & Trauma Care',
                isRtl ? 'إجراءات الحفاظ على المفاصل وتجديدها' : 'Joint Preservation & Regeneration',
                isRtl ? 'استشارات صحة العظام والمفاصل الهيكلية' : 'Bone & Structural Health Consultation',
                isRtl ? 'التخطيط لإعادة التأهيل بعد الجراحة' : 'Post-Surgical Rehab Planning'
            ]
        }
    ];

    return (
        <section className="py-24 bg-[#0a1128] overflow-hidden relative">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/10 rounded-full blur-[120px] -mr-48 -mt-24"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-600/5 rounded-full blur-[120px] -ml-48 -mb-24"></div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    {/* Visual Side (Body Graphic) */}
                    <motion.div
                        initial={{ opacity: 0, x: isRtl ? 40 : -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-1/2 relative"
                    >
                        <div className="relative z-10 group">
                            <div className="absolute inset-0 bg-primary-500/10 rounded-full blur-[80px] scale-75 opacity-50"></div>
                            <img
                                src={bodyGraphic}
                                alt="Anatomical Support Areas"
                                className="w-full h-auto drop-shadow-[0_20px_50px_rgba(0,136,204,0.3)] relative z-20"
                            />

                            {/* SVG Connector Overlay (Subtle) */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none z-30 opacity-40" viewBox="0 0 100 100">
                                <circle cx="50" cy="40" r="1" fill="white" className="animate-ping" />
                                <circle cx="68" cy="45" r="1" fill="#3a7e7a" className="animate-ping" style={{ animationDelay: '1s' }} />
                                <circle cx="48" cy="65" r="1" fill="#0088cc" className="animate-ping" style={{ animationDelay: '2s' }} />
                            </svg>
                        </div>
                    </motion.div>

                    {/* Content Side */}
                    <div className="w-full lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-500/10 text-primary-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                                {isRtl ? 'خبرة عالمية متخصصة' : 'Advanced Orthopedic Expertise'}
                            </span>
                            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-8 leading-tight tracking-tight">
                                {isRtl ? 'رعاية مخصصة لكل' : 'Personalized Care for Every'}{' '}
                                <span className="text-primary-500">{isRtl ? 'مشكلة عظمية' : 'Orthopedic Challenge'}</span>
                            </h2>
                        </motion.div>

                        {/* Tabs / Area selection */}
                        <div className="flex flex-wrap gap-3 mb-10">
                            {anatomicalCategories.map((area) => (
                                <button
                                    key={area.id}
                                    onClick={() => setActiveArea(area.id)}
                                    className={`flex items-center gap-2 px-5 py-3 rounded-2xl transition-all duration-300 font-bold text-xs uppercase tracking-wider ${activeArea === area.id
                                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30'
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
                                        }`}
                                >
                                    {area.icon}
                                    {area.title}
                                </button>
                            ))}
                        </div>

                        {/* Treatment List (Animated) */}
                        <div className="min-h-[220px]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeArea}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -15 }}
                                    transition={{ duration: 0.4 }}
                                    className="space-y-4"
                                >
                                    {anatomicalCategories.find(a => a.id === activeArea).treatments.map((treatment, idx) => (
                                        <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
                                            <div className="mt-1 w-5 h-5 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-500 group-hover:text-white transition-all text-primary-500">
                                                <Check className="w-3 h-3 stroke-[4px]" />
                                            </div>
                                            <p className="text-gray-300 text-sm md:text-base font-medium transition-colors group-hover:text-white">
                                                {treatment}
                                            </p>
                                        </div>
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Practical CTA */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="mt-12"
                        >
                            <a
                                href="/contact"
                                className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:shadow-2xl hover:shadow-primary-600/40 transition-all hover:scale-[1.02]"
                            >
                                {isRtl ? 'احجز استشارة الآن' : 'Book Expert Consultation'}
                                <Activity className="w-5 h-5" />
                            </a>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SportingInjury;
