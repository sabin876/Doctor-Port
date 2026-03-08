import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const FAQ = () => {
    const { t } = useLanguage();
    const [openIndex, setOpenIndex] = useState(0); // Open first by default for better visual impact

    const faqs = [
        {
            question: t('faq.items.0.question'),
            answer: t('faq.items.0.answer')
        },
        {
            question: t('faq.items.1.question'),
            answer: t('faq.items.1.answer')
        },
        {
            question: t('faq.items.2.question'),
            answer: t('faq.items.2.answer')
        },
        {
            question: t('faq.items.3.question'),
            answer: t('faq.items.3.answer')
        },
        {
            question: t('faq.items.4.question'),
            answer: t('faq.items.4.answer')
        }
    ];

    return (
        <section id="faq" className="py-32 bg-white relative overflow-hidden">
            {/* Background Aesthetic Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-50/30 rounded-full blur-[120px] -z-10 -translate-x-1/2 translate-y-1/2"></div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-blue-50 border border-blue-100/50 text-blue-600 text-sm font-bold tracking-tight"
                    >
                        <HelpCircle size={16} />
                        {t('faq.badge')}
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-montserrat font-extrabold text-[#1a1a1a] mb-6 tracking-tight"
                    >
                        {t('faq.title').split(' ').slice(0, -1).join(' ')} <span className="text-blue-600">{t('faq.title').split(' ').pop()}</span>
                    </motion.h2>
                    <div className="w-20 h-1.5 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`group rounded-3xl transition-all duration-500 border ${openIndex === index
                                    ? 'bg-white border-blue-200 shadow-2xl shadow-blue-500/10'
                                    : 'bg-gray-50/50 border-gray-100 hover:border-blue-100 hover:bg-white hover:shadow-xl hover:shadow-gray-200/50'
                                }`}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-8 py-7 flex justify-between items-center text-start focus:outline-none"
                            >
                                <span className={`text-xl font-bold transition-colors duration-300 ${openIndex === index ? 'text-blue-600' : 'text-gray-900 group-hover:text-blue-600'
                                    }`}>
                                    {faq.question}
                                </span>
                                <div className={`ms-6 shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${openIndex === index ? 'bg-blue-600 text-white rotate-180' : 'bg-white text-blue-400 group-hover:text-blue-600 border border-gray-100'
                                    }`}>
                                    <ChevronDown size={22} className="transition-transform" />
                                </div>
                            </button>
                            <AnimatePresence initial={false}>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                                    >
                                        <div className="px-8 pb-8">
                                            <div className="h-px w-full bg-gray-100 mb-6"></div>
                                            <p className="text-lg text-gray-600 leading-relaxed font-medium">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA or Note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <p className="text-gray-500 font-medium">
                        Still have questions? <a href="#contact" className="text-blue-600 font-bold hover:underline">Contact our clinic</a> for more details.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default FAQ;
