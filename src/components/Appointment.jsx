import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, ChevronRight, CheckCircle, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Appointment = () => {
    const { language, t } = useLanguage();
    const isRtl = language === 'AR';
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        type: 'Initial Consultation',
        date: '',
        message: ''
    });

    const handleNext = (e) => {
        e.preventDefault();
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section id="appointment" className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary-50 text-primary-600 text-xs font-black uppercase tracking-[0.2em]"
                        >
                            {t('appointment.badge')}
                        </motion.div>
                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-4xl font-montserrat font-black text-primary-950 mb-4 tracking-tight uppercase"
                        >
                            {t('appointment.title')}
                        </motion.h3>
                        <p className="text-xl font-medium text-gray-500 mb-10 leading-relaxed max-w-xl">
                            {t('appointment.description')}
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                        <Clock size={20} />
                                    </div>
                                </div>
                                <div className="ms-4">
                                    <h4 className="text-lg font-bold text-gray-900">{t('appointment.quick.title')}</h4>
                                    <p className="text-gray-500">{t('appointment.quick.desc')}</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                        <MessageSquare size={20} />
                                    </div>
                                </div>
                                <div className="ms-4">
                                    <h4 className="text-lg font-bold text-gray-900">{t('appointment.second.title')}</h4>
                                    <p className="text-gray-500">{t('appointment.second.desc')}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Interactive Multi-step Form */}
                    <motion.div
                        initial={{ opacity: 0, x: isRtl ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-white rounded-3xl shadow-2xl p-8 relative"
                    >
                        <div className="absolute top-0 start-0 w-full h-2 bg-gray-100 rounded-t-3xl overflow-hidden">
                            <motion.div
                                className="h-full bg-primary-600"
                                initial={{ width: "33%" }}
                                animate={{ width: `${step * 33.33}%` }}
                            />
                        </div>

                        <div className="mb-8 mt-4">
                            <h4 className="text-2xl font-bold text-gray-900">
                                {step === 1 && t('appointment.step1')}
                                {step === 2 && t('appointment.step2')}
                                {step === 3 && t('appointment.step3')}
                            </h4>
                            <p className="text-sm text-gray-500">{t('appointment.stepOf')} {step} {t('appointment.stepOfTotal')}</p>
                        </div>

                        <form onSubmit={(e) => e.preventDefault()}>
                            <AnimatePresence mode='wait'>
                                {step === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
                                        className="space-y-4"
                                    >
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('appointment.name')}</label>
                                            <div className="relative">
                                                <User className={`absolute ${isRtl ? 'right-3' : 'left-3'} top-3 text-gray-400`} size={18} />
                                                <input required type="text" name="name" value={formData.name} onChange={handleChange} className={`w-full ${isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all`} placeholder="John Doe" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('appointment.email')}</label>
                                            <div className="relative">
                                                <Mail className={`absolute ${isRtl ? 'right-3' : 'left-3'} top-3 text-gray-400`} size={18} />
                                                <input required type="email" name="email" value={formData.email} onChange={handleChange} className={`w-full ${isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all`} placeholder="john@example.com" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('appointment.phone')}</label>
                                            <div className="relative">
                                                <Phone className={`absolute ${isRtl ? 'right-3' : 'left-3'} top-3 text-gray-400`} size={18} />
                                                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className={`w-full ${isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all`} placeholder="+971..." />
                                            </div>
                                        </div>
                                        <button onClick={handleNext} className="w-full bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors mt-4 flex items-center justify-center">
                                            {t('appointment.next')} <ChevronRight size={18} className="ms-2" />
                                        </button>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
                                        className="space-y-4"
                                    >
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('appointment.type')}</label>
                                            <select name="type" value={formData.type} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all">
                                                <option>{t('appointment.types.initial')}</option>
                                                <option>{t('appointment.types.second')}</option>
                                                <option>{t('appointment.types.followup')}</option>
                                                <option>{t('appointment.types.surgery')}</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('appointment.date')}</label>
                                            <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('appointment.message')}</label>
                                            <textarea name="message" value={formData.message} onChange={handleChange} rows="3" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all" placeholder="Briefly describe your pain or condition..."></textarea>
                                        </div>
                                        <div className="flex gap-4 mt-4">
                                            <button onClick={handleBack} className="w-1/3 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
                                                {t('appointment.back')}
                                            </button>
                                            <button onClick={handleNext} className="w-2/3 bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center">
                                                {t('appointment.review')} <ChevronRight size={18} className="ms-2" />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
                                        className="text-center py-6"
                                    >
                                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6">
                                            <CheckCircle size={40} />
                                        </div>
                                        <h4 className="text-xl font-bold text-gray-900 mb-2">{t('appointment.almostDone')}</h4>
                                        <p className="text-gray-500 mb-8">
                                            {t('appointment.confirmMsg')} <strong>{formData.phone}</strong>.
                                        </p>

                                        <div className="flex gap-4">
                                            <button onClick={handleBack} className="w-1/3 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
                                                {t('appointment.back')}
                                            </button>
                                            <button className="w-2/3 bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors shadow-lg hover:shadow-primary-500/40">
                                                {t('appointment.confirm')}
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Appointment;
