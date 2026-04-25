import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, CheckCircle2, ArrowRight, Activity, ShieldCheck, Zap, HeartPulse, ClipboardCheck, Users, HelpCircle, ChevronDown, ChevronUp, Home, Star, RotateCcw, PlusSquare, Triangle, Hexagon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SEO from './SEO';
import Breadcrumbs from './ui/Breadcrumbs';
import physioIllustration from '../assets/physio-illustration.png';

const PhysiotherapyHomeService = () => {
    const { t, language } = useLanguage();
    const isRtl = language === 'AR';

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Get content from translations (defaulting to EN if specific keys are missing in AR/HI)
    const content = t('physioHome');

    return (
        <main className="relative pt-20 bg-white overflow-hidden">
            <SEO 
                title={content.seo.title}
                description={content.seo.description}
                url="/services/physiotherapy-home-services"
            />

            <div className="bg-white border-b border-gray-100">
                <Breadcrumbs items={[
                    { name: t('nav.home'), path: '/' },
                    { name: t('nav.services'), path: '/services' },
                    { name: t('services.items.7.title') }
                ]} />
            </div>

            {/* Premium Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary-50/30 rounded-full blur-[120px] -mr-40 -mt-40"></div>
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-50/40 rounded-full blur-[120px] -ml-40 -mb-40"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 lg:py-24">
                {/* Redesigned Hero Section - 2 Columns */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
                    {/* Left Column: Content & Features */}
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
                            <Zap size={12} className="fill-primary-600" />
                            DHA Licensed Experts
                        </motion.div>

                        <h1 className="text-3xl md:text-5xl font-normal text-primary-950 mb-6 tracking-tighter leading-[1.05]">
                            {content.hero.title}
                        </h1>

                        <p className="text-base md:text-lg text-gray-500 font-normal leading-relaxed mb-10 max-w-2xl">
                            {content.hero.description}
                        </p>

                        {/* Feature Highlights Grid (2x2) */}
                        <div className="grid sm:grid-cols-2 gap-4 mb-10">
                            {[
                                { icon: ShieldCheck, text: content.features[0] },
                                { icon: Home, text: content.features[1] },
                                { icon: Users, text: content.features[2] },
                                { icon: Star, text: content.features[4] } // Using "Transparent pricing"
                            ].map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50/80 backdrop-blur-sm border border-gray-100 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-300">
                                    <div className="w-10 h-10 rounded-xl bg-white text-primary-600 flex items-center justify-center shadow-sm flex-shrink-0">
                                        <feature.icon size={20} strokeWidth={2.5} />
                                    </div>
                                    <span className="text-xs font-normal text-gray-700 leading-tight">
                                        {feature.text}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Dual Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <a 
                                href="tel:+971551053445"
                                className="w-full sm:w-auto group flex items-center justify-center gap-3 py-4 px-10 bg-[#003B73] text-white font-normal text-[11px] uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-primary-200 hover:bg-[#002B55] hover:shadow-2xl hover:shadow-primary-300 active:scale-95 transition-all duration-300"
                            >
                                <Phone size={18} />
                                {content.ctas.call}
                            </a>
                            <a 
                                href="https://wa.me/971551053445"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto group flex items-center justify-center gap-3 py-4 px-10 bg-[#25D366] text-white font-normal text-[11px] uppercase tracking-[0.2em] rounded-2xl shadow-lg shadow-emerald-100 hover:bg-[#1eb954] hover:shadow-xl active:scale-95 transition-all duration-300"
                            >
                                <MessageCircle size={18} />
                                {content.ctas.whatsapp}
                            </a>
                        </div>
                    </motion.div>

                    {/* Right Column: Illustration & Floating Card */}
                    <motion.div
                        initial={{ opacity: 0, x: isRtl ? -40 : 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        {/* Illustration Container */}
                        <div className="relative p-4 md:p-8 rounded-[4rem] bg-gradient-to-br from-primary-50 to-white border border-primary-50 shadow-2xl overflow-hidden group">
                            <motion.img 
                                initial={{ scale: 1.1, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 1.5 }}
                                src={physioIllustration} 
                                alt="Physiotherapy Services" 
                                className="w-full h-auto relative z-10 group-hover:scale-105 transition-transform duration-700"
                            />
                            
                            {/* Decorative Blobs */}
                            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-200/20 rounded-full blur-[80px]"></div>
                            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-emerald-200/20 rounded-full blur-[80px]"></div>
                        </div>

                        {/* Floating Experience Card */}
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

                {/* Redesigned Conditions Managed Section - Professional Grid */}
                <div className="mb-32">
                    {/* Header Block */}
                    <div className="mb-16">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center px-4 py-1.5 mb-6 rounded-full bg-blue-50 text-[#003B73] text-[10px] font-normal uppercase tracking-[0.2em] border border-blue-100"
                        >
                            {content.conditions.badge}
                        </motion.div>
                        <div className="grid lg:grid-cols-2 gap-8 items-end">
                            <h2 className="text-2xl md:text-4xl font-normal text-[#001D3D] leading-[1.1] tracking-tight">
                                {content.conditions.title}
                            </h2>
                            <p className="text-gray-500 text-lg font-normal leading-relaxed max-w-xl">
                                {content.conditions.description}
                            </p>
                        </div>
                    </div>

                    {/* 4-Column Grid of Condition Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {content.conditions.items.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className="group p-8 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:border-blue-100 transition-all duration-500 relative overflow-hidden"
                            >
                                {/* Decorative Accent */}
                                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/30 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-blue-100/40 transition-colors"></div>
                                
                                {/* Professional Icon Container */}
                                <div className="w-12 h-12 rounded-2xl bg-blue-50/50 text-[#003B73] flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-inner">
                                    {getConditionIcon(idx)}
                                </div>

                                <h4 className="text-lg font-normal text-[#001D3D] mb-4 leading-tight group-hover:text-blue-700 transition-colors">
                                    {item.title}
                                </h4>
                                <p className="text-xs text-gray-500 font-normal leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Benefits Section */}
                <div className="bg-primary-950 rounded-[4rem] p-10 md:p-20 text-white relative overflow-hidden mb-32">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-primary-500/20 rounded-full blur-[100px] -mr-40 -mt-40"></div>
                    <div className="relative z-10">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-metabolic mb-6">{content.benefits.title}</h2>
                                <p className="text-primary-100/70 text-base mb-10 leading-relaxed">{content.benefits.description}</p>
                                <div className="space-y-4">
                                    {content.benefits.items.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-4">
                                            <CheckCircle2 className="text-primary-500 flex-shrink-0" size={24} />
                                            <span className="text-lg font-normal">{item}</span>
                                        </div>
                                    ))}
                                </div>
                                <p className="mt-8 text-primary-400 font-normal italic">{content.benefits.footer}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <BenefitCard icon={<Zap size={32} />} title="Fast Results" />
                                <BenefitCard icon={<ShieldCheck size={32} />} title="Safe Care" />
                                <BenefitCard icon={<HeartPulse size={32} />} title="Pain Relief" />
                                <BenefitCard icon={<Users size={32} />} title="Expert Team" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Expert Home Treatment - Target Audience */}
                <div className="text-center mb-32">
                    <h2 className="text-2xl md:text-4xl font-metabolic text-primary-950 mb-6">{content.expertTreatment.title}</h2>
                    <p className="text-base text-gray-500 mb-16 max-w-2xl mx-auto">{content.expertTreatment.description}</p>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                        {content.expertTreatment.categories.map((cat, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group p-8 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:border-primary-100 transition-all duration-500 text-center"
                            >
                                <div className="w-16 h-16 rounded-3xl bg-primary-50 text-primary-600 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-500">
                                    <ClipboardCheck size={28} />
                                </div>
                                <h4 className="text-lg font-normal text-gray-900 group-hover:text-primary-700 transition-colors">{cat}</h4>
                            </motion.div>
                        ))}
                    </div>
                </div>



                {/* Why Choose Us */}
                <div className="grid lg:grid-cols-2 gap-24 items-start mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: isRtl ? 40 : -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl md:text-3xl font-metabolic text-primary-950 mb-8">{content.whyChoose.title}</h2>
                        <p className="text-base text-gray-500 mb-10 leading-relaxed">{content.whyChoose.description}</p>
                        
                        <div className="space-y-6">
                            {content.whyChoose.items.map((item, idx) => (
                                <div key={idx} className="flex gap-4 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="mt-1">
                                        <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                            <ShieldCheck size={20} />
                                        </div>
                                    </div>
                                    <p className="text-gray-700 font-normal leading-relaxed">{item}</p>
                                </div>
                            ))}
                        </div>
                        <p className="mt-8 text-sm font-normal text-primary-600 italic">{content.whyChoose.footer}</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: isRtl ? -40 : 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl md:text-3xl font-metabolic text-primary-950 mb-12">{content.expectations.title}</h2>
                        <div className="space-y-12 relative">
                            {/* Decorative Line */}
                            <div className="absolute left-[27px] top-[10px] bottom-[10px] w-0.5 bg-gray-100 hidden md:block"></div>
                            
                            {content.expectations.steps.map((step, idx) => (
                                <div key={idx} className="relative flex items-start gap-8">
                                    <div className="relative z-10 w-14 h-14 rounded-full bg-white border-4 border-gray-50 text-primary-600 flex items-center justify-center font-normal text-xl shadow-lg">
                                        {idx + 1}
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-normal text-gray-900 mb-3">{step.title}</h4>
                                        <p className="text-gray-500 leading-relaxed">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* FAQs */}
                <div className="max-w-4xl mx-auto py-24">
                    <div className="text-center mb-16">
                        <HelpCircle className="w-12 h-12 text-primary-600 mx-auto mb-6" />
                        <h2 className="text-2xl md:text-4xl font-metabolic text-primary-950 mb-6">{content.faqs.title}</h2>
                        <p className="text-gray-500">Find answers to common questions about our home physiotherapy services.</p>
                    </div>

                    <div className="space-y-4">
                        {content.faqs.items.map((faq, idx) => (
                            <FAQItem key={idx} question={faq.q} answer={faq.a} />
                        ))}
                    </div>
                </div>

                {/* New Post-FAQ CTA Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-7xl mx-auto px-4 mb-24 font-montserrat"
                >
                    <div className="bg-blue-50 rounded-[3.5rem] p-12 md:p-20 shadow-[0_30px_70px_rgba(0,0,0,0.06)] border border-blue-100 text-center relative overflow-hidden group">
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
                                    href="tel:+971551053445"
                                    className="w-full sm:w-auto flex items-center justify-center gap-3 py-5 px-12 bg-[#003B73] text-white font-normal text-[12px] uppercase tracking-[0.2em] rounded-[2rem] shadow-2xl shadow-primary-200 hover:bg-[#002B55] hover:-translate-y-1 active:scale-95 transition-all duration-300"
                                >
                                    <Phone size={18} />
                                    Call Us Now
                                </a>
                                <a 
                                    href="https://wa.me/971551053445"
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

// Helper to assign icons to condition categories
const getConditionIcon = (index) => {
    const icons = [
        <Activity size={22} strokeWidth={2.5} />,      // Back/Neck
        <Zap size={22} strokeWidth={2.5} />,           // Knee
        <RotateCcw size={22} strokeWidth={2.5} />,     // Shoulder
        <Activity size={22} strokeWidth={2.5} />,      // Sports
        <HeartPulse size={22} strokeWidth={2.5} />,    // Arthritis
        <PlusSquare size={22} strokeWidth={2.5} />,    // Post-surgical
        <Triangle size={22} strokeWidth={2.5} />,      // Deformity
        <Hexagon size={22} strokeWidth={2.5} />       // Hip
    ];
    return icons[index % icons.length];
};

const BenefitCard = ({ icon, title }) => (
    <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center group hover:bg-white/10 transition-all duration-500">
        <div className="text-primary-400 mb-4 group-hover:scale-110 transition-transform">
            {icon}
        </div>
        <span className="text-xs font-normal uppercase tracking-widest text-primary-100">{title}</span>
    </div>
);

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm transition-all duration-300">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-start"
            >
                <span className="text-lg font-normal text-gray-900 pr-8">{question}</span>
                {isOpen ? <ChevronUp className="text-primary-600" /> : <ChevronDown className="text-gray-400" />}
            </button>
            {isOpen && (
                <div className="px-6 md:px-8 pb-8">
                    <p className="text-gray-600 leading-relaxed border-t border-gray-50 pt-6">
                        {answer}
                    </p>
                </div>
            )}
        </div>
    );
};

export default PhysiotherapyHomeService;
