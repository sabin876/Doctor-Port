import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
    {
        question: "When should I consider joint replacement surgery?",
        answer: "Severe arthritis, cartilage loss, or deformities not responsive to conservative treatments often indicate the need for joint replacement, especially in knee and hip joints."
    },
    {
        question: "How long is the recovery period?",
        answer: "Recovery after knee or hip replacement usually takes 6–12 weeks for basic mobility, with full recovery often requiring 6–12 months."
    },
    {
        question: "What are the benefits of arthroscopic surgery?",
        answer: "Arthroscopic surgery offers smaller incisions, less pain, faster recovery, and lower infection risk compared to open surgery."
    },
    {
        question: "Is it worth getting a second opinion?",
        answer: "Yes, seeking a second opinion before surgery is encouraged to confirm your diagnosis and explore all treatment options. Dr. Ulhas offers complementary second opinions."
    },
    {
        question: "How are sports injuries treated?",
        answer: "Sports injuries are treated based on severity, often involving rest, physical therapy, medications, or surgery if necessary."
    }
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section id="faq" className="py-24 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary-50 text-primary-600 text-xs font-black uppercase tracking-[0.2em]"
                    >
                        Patient Clarifications
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl lg:text-7xl font-black text-primary-950 mb-8 tracking-tighter uppercase italic leading-none"
                    >
                        Your Curated <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">Knowledge Base</span>
                    </motion.h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none"
                            >
                                <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                                <span className="ml-4 flex-shrink-0 text-primary-500">
                                    {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                                </span>
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-6 pb-6 text-gray-600">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FAQ;
