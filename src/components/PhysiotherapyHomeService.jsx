import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, CheckCircle2, ArrowRight, Activity, ShieldCheck, Zap, HeartPulse, ClipboardCheck, Users, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SEO from './SEO';
import Breadcrumbs from './ui/Breadcrumbs';

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

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-24">
                {/* Hero Section */}
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-[10px] font-bold uppercase tracking-[0.3em]"
                    >
                        <Zap size={12} className="fill-primary-600" />
                        DHA Licensed Experts
                    </motion.div>

                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl font-metabolic font-normal text-primary-950 mb-8 tracking-tighter leading-[1.1] max-w-5xl mx-auto"
                    >
                        {content.hero.title}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl text-gray-500 font-normal leading-relaxed max-w-3xl mx-auto mb-12"
                    >
                        {content.hero.description}
                    </motion.p>

                    {/* Dual Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a 
                            href="tel:+971551053445"
                            className="w-full sm:w-auto group flex items-center justify-center gap-3 py-5 px-10 bg-primary-600 text-white font-normal text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-primary-200 hover:bg-primary-700 hover:shadow-2xl hover:shadow-primary-300 active:scale-95 transition-all duration-300"
                        >
                            <Phone size={18} />
                            {content.ctas.call}
                        </a>
                        <a 
                            href="https://wa.me/971551053445"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto group flex items-center justify-center gap-3 py-5 px-10 bg-white text-emerald-600 border border-emerald-100 font-normal text-xs uppercase tracking-[0.2em] rounded-2xl shadow-lg hover:bg-emerald-50 hover:border-emerald-200 hover:shadow-xl active:scale-95 transition-all duration-300"
                        >
                            <MessageCircle size={18} />
                            {content.ctas.whatsapp}
                        </a>
                    </div>
                </div>

                {/* Sub-Features Grid */}
                <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4 mb-32">
                    {content.features.map((feature, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-6 bg-gray-50/50 backdrop-blur-sm border border-gray-100 rounded-3xl text-center flex flex-col items-center justify-center hover:bg-white hover:shadow-lg transition-all duration-500"
                        >
                            <ShieldCheck size={24} className="text-primary-600 mb-4" />
                            <p className="text-xs font-semibold text-gray-700 leading-relaxed uppercase tracking-tight">{feature}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Conditions Managed */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: isRtl ? 40 : -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-metabolic text-primary-950 mb-6">{content.conditions.title}</h2>
                        <p className="text-lg text-gray-500 mb-10 leading-relaxed">{content.conditions.description}</p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {content.conditions.items.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-50 shadow-sm">
                                    <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 flex-shrink-0">
                                        <Activity size={16} />
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">{item}</span>
                                </div>
                            ))}
                        </div>
                        <p className="mt-8 text-sm font-medium text-primary-600 italic">{content.conditions.footer}</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: isRtl ? -40 : 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="aspect-square rounded-[4rem] overflow-hidden shadow-2xl relative">
                            <img 
                                src="https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=1200&auto=format&fit=crop&q=80" 
                                alt="Physiotherapy session" 
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent"></div>
                            <div className="absolute bottom-10 left-10 right-10">
                                <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
                                    <p className="text-white text-lg font-medium">Expert care at your doorstep, tailored to your recovery goals.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Benefits Section */}
                <div className="bg-primary-950 rounded-[4rem] p-10 md:p-20 text-white relative overflow-hidden mb-32">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-primary-500/20 rounded-full blur-[100px] -mr-40 -mt-40"></div>
                    <div className="relative z-10">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-metabolic mb-6">{content.benefits.title}</h2>
                                <p className="text-primary-100/70 text-lg mb-10 leading-relaxed">{content.benefits.description}</p>
                                <div className="space-y-4">
                                    {content.benefits.items.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-4">
                                            <CheckCircle2 className="text-primary-500 flex-shrink-0" size={24} />
                                            <span className="text-lg font-medium">{item}</span>
                                        </div>
                                    ))}
                                </div>
                                <p className="mt-8 text-primary-400 font-medium italic">{content.benefits.footer}</p>
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
                    <h2 className="text-3xl md:text-5xl font-metabolic text-primary-950 mb-6">{content.expertTreatment.title}</h2>
                    <p className="text-lg text-gray-500 mb-16 max-w-2xl mx-auto">{content.expertTreatment.description}</p>
                    
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
                                <h4 className="text-lg font-bold text-gray-900 group-hover:text-primary-700 transition-colors">{cat}</h4>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA Banner */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="p-12 md:p-20 rounded-[4rem] bg-gradient-to-r from-primary-600 to-primary-500 text-white text-center shadow-2xl relative overflow-hidden mb-32"
                >
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-metabolic mb-6 leading-tight">{content.ctaBanner.title}</h2>
                        <p className="text-xl text-primary-50 font-normal mb-12 opacity-80">{content.ctaBanner.subtitle}</p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <a 
                                href="tel:+971551053445"
                                className="w-full sm:w-auto py-5 px-10 bg-white text-primary-600 font-bold uppercase tracking-widest rounded-2xl hover:bg-primary-50 transition-all shadow-xl"
                            >
                                {content.ctas.call}
                            </a>
                            <a 
                                href="https://wa.me/971551053445"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto py-5 px-10 bg-emerald-600 text-white font-bold uppercase tracking-widest rounded-2xl hover:bg-emerald-700 border border-emerald-500/20 transition-all shadow-xl"
                            >
                                {content.ctas.whatsapp}
                            </a>
                        </div>
                    </div>
                </motion.div>

                {/* Why Choose Us */}
                <div className="grid lg:grid-cols-2 gap-24 items-start mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: isRtl ? 40 : -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-metabolic text-primary-950 mb-8">{content.whyChoose.title}</h2>
                        <p className="text-lg text-gray-500 mb-10 leading-relaxed">{content.whyChoose.description}</p>
                        
                        <div className="space-y-6">
                            {content.whyChoose.items.map((item, idx) => (
                                <div key={idx} className="flex gap-4 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="mt-1">
                                        <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                            <ShieldCheck size={20} />
                                        </div>
                                    </div>
                                    <p className="text-gray-700 font-medium leading-relaxed">{item}</p>
                                </div>
                            ))}
                        </div>
                        <p className="mt-8 text-sm font-medium text-primary-600 italic">{content.whyChoose.footer}</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: isRtl ? -40 : 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-metabolic text-primary-950 mb-12">{content.expectations.title}</h2>
                        <div className="space-y-12 relative">
                            {/* Decorative Line */}
                            <div className="absolute left-[27px] top-[10px] bottom-[10px] w-0.5 bg-gray-100 hidden md:block"></div>
                            
                            {content.expectations.steps.map((step, idx) => (
                                <div key={idx} className="relative flex items-start gap-8">
                                    <div className="relative z-10 w-14 h-14 rounded-full bg-white border-4 border-gray-50 text-primary-600 flex items-center justify-center font-bold text-xl shadow-lg">
                                        {idx + 1}
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h4>
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
                        <h2 className="text-3xl md:text-5xl font-metabolic text-primary-950 mb-6">{content.faqs.title}</h2>
                        <p className="text-gray-500">Find answers to common questions about our home physiotherapy services.</p>
                    </div>

                    <div className="space-y-4">
                        {content.faqs.items.map((faq, idx) => (
                            <FAQItem key={idx} question={faq.q} answer={faq.a} />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
};

const BenefitCard = ({ icon, title }) => (
    <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center group hover:bg-white/10 transition-all duration-500">
        <div className="text-primary-400 mb-4 group-hover:scale-110 transition-transform">
            {icon}
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-primary-100">{title}</span>
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
                <span className="text-lg font-bold text-gray-900 pr-8">{question}</span>
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
