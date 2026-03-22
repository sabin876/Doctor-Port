import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import faqImage from '../assets/FAQ.png';

const FAQ = () => {
    const { t } = useLanguage();
    const [openIndex, setOpenIndex] = useState(0);

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
        <section id="faq" className="py-24 bg-gray-50/30 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-[#0A1A44] mb-4 tracking-tight"
                    >
                        Asked Frequently Questions
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-500 max-w-2xl mx-auto text-lg"
                    >
                        Non cum cras felis lacus sociosqu, risus porttitor suspendisse. Sociis mauris inceptos non fermentum
                    </motion.p>
                </div>

                {/* Content Layout */}
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center mt-12">
                    
                    {/* Left Column: FAQ Items */}
                    <div className="w-full lg:w-1/2 flex flex-col pt-8">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`border-b border-gray-300 py-6`}
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="w-full flex justify-between items-center text-left focus:outline-none gap-4"
                                >
                                    <span className={`text-xl font-bold transition-colors ${openIndex === index ? 'text-[#0A1A44]' : 'text-[#0A1A44] hover:text-blue-700'}`}>
                                        {faq.question}
                                    </span>
                                    <div className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                                        openIndex === index 
                                        ? 'border-2 border-[#0A1A44] text-[#0A1A44]' 
                                        : 'bg-[#0A1A44] text-white'
                                    }`}>
                                        <ChevronDown size={14} className={`transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
                                    </div>
                                </button>
                                <AnimatePresence initial={false}>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pt-4 text-gray-600 text-base leading-relaxed pr-10">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right Column: Doctor Image */}
                    <div className="w-full lg:w-1/2 relative flex justify-center items-center mt-12 lg:mt-0">
                        <motion.img 
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            src={faqImage} 
                            alt="FAQ Illustration" 
                            className="w-full max-w-md h-auto rounded-3xl shadow-xl object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
