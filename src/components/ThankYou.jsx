import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, Home, ArrowRight, Calendar, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Helmet } from 'react-helmet-async';

const ThankYou = () => {
    const { t } = useLanguage();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="min-h-screen pt-32 pb-20 bg-gray-50 flex items-center justify-center relative overflow-hidden">
            <Helmet>
                <title>Thank You - Dr. Ulhas Sonar</title>
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>

            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-5%] w-[40rem] h-[40rem] bg-primary-100/30 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[35rem] h-[35rem] bg-blue-100/30 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-10 flex justify-center"
                >
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 shadow-xl shadow-green-100">
                        <CheckCircle size={56} strokeWidth={1.5} />
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-5xl md:text-6xl font-metabolic font-black text-primary-950 mb-6 tracking-tight"
                >
                    Thank You!
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-xl text-gray-500 font-medium mb-12 max-w-xl mx-auto leading-relaxed"
                >
                    Your request has been received. Our team will get back to you within 24 hours to confirm your appointment details.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
                >
                    <Link
                        to="/"
                        className="flex items-center gap-2 px-8 py-4 bg-white text-primary-950 font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 group"
                    >
                        <Home size={18} className="text-primary-600" />
                        Return Home
                    </Link>
                    <Link
                        to="/contact"
                        className="flex items-center gap-2 px-8 py-4 bg-primary-600 text-white font-bold rounded-2xl shadow-xl shadow-primary-200 hover:bg-primary-700 transition-all group"
                    >
                        Book Another
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>

                {/* Direct Contact Options */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-white/60 backdrop-blur-md rounded-[2.5rem] border border-white shadow-sm"
                >
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 mb-2">
                            <Phone size={20} />
                        </div>
                        <h4 className="text-xs font-black text-primary-950 uppercase tracking-widest leading-none">Immediate Assistance</h4>
                        <a href="tel:+971551053445" className="text-lg font-bold text-primary-600">Call +971 55 105 3445</a>
                    </div>
                    <div className="flex flex-col items-center gap-2 pr-2">
                        <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 mb-2">
                            <Calendar size={20} />
                        </div>
                        <h4 className="text-xs font-black text-primary-950 uppercase tracking-widest leading-none">WhatsApp Booking</h4>
                        <a href="https://wa.me/971551053445" className="text-lg font-bold text-green-600">Chat with us now</a>
                    </div>
                </motion.div>
            </div>
        </main>
    );
};

export default ThankYou;
