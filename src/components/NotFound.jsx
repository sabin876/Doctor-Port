import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, BookOpen, Stethoscope, PhoneCall } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SEO from './SEO';

const NotFound = () => {
    const { t } = useLanguage();

    return (
        <main className="relative min-h-[80vh] flex items-center justify-center bg-gray-50/50 py-20 px-6 overflow-hidden">
            <SEO 
                title="Page Not Found | 404 Error | Dr. Ulhas Sonar"
                description="The page you are looking for does not exist or has been moved. Explore our home, service, or contact sections."
                url="/404"
            />

            {/* Floating Ambient Blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <motion.div 
                    animate={{ 
                        x: [0, 40, -20, 0],
                        y: [0, -30, 20, 0]
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-100/40 rounded-full blur-[100px]"
                />
                <motion.div 
                    animate={{ 
                        x: [0, -50, 30, 0],
                        y: [0, 40, -30, 0]
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-100/50 rounded-full blur-[120px]"
                />
            </div>

            <div className="max-w-xl w-full text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="bg-white/80 backdrop-blur-md rounded-[2.5rem] border border-gray-100 p-8 sm:p-12 shadow-[0_30px_70px_rgba(0,0,0,0.03)]"
                >
                    {/* Animated Medical Floating Icon */}
                    <motion.div 
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="w-16 h-16 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center mx-auto mb-8 shadow-inner"
                    >
                        <Stethoscope size={30} strokeWidth={2} />
                    </motion.div>

                    {/* Gradient Error Code */}
                    <h1 className="text-7xl sm:text-8xl font-black tracking-tighter mb-4 bg-gradient-to-r from-primary-600 to-indigo-600 bg-clip-text text-transparent select-none">
                        404
                    </h1>

                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                        Oops! Page Not Found
                    </h2>
                    
                    <p className="text-sm sm:text-base text-gray-500 leading-relaxed mb-8 max-w-sm mx-auto">
                        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let's get you back on track!
                    </p>

                    {/* Primary/Secondary CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                        <Link 
                            to="/"
                            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-8 bg-[#003B73] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-primary-200 hover:bg-[#002B55] hover:shadow-xl hover:shadow-primary-300 transition-all duration-300 active:scale-95"
                        >
                            <Home size={16} />
                            Go Back Home
                        </Link>
                        <Link 
                            to="/services"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-8 border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 active:scale-95"
                        >
                            Explore Treatments
                        </Link>
                    </div>

                    {/* Helpful Utility Quick Links */}
                    <div className="border-t border-gray-100 pt-6">
                        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Useful Links</h4>
                        <div className="grid grid-cols-2 gap-3 text-left">
                            <Link 
                                to="/blog"
                                className="flex items-center gap-2.5 p-3 rounded-xl border border-gray-50 hover:bg-gray-50 hover:border-gray-100 text-xs text-gray-600 hover:text-primary-600 transition-all duration-300"
                            >
                                <BookOpen size={14} className="text-gray-400" />
                                <span>Read Blog</span>
                            </Link>
                            <Link 
                                to="/contact"
                                className="flex items-center gap-2.5 p-3 rounded-xl border border-gray-50 hover:bg-gray-50 hover:border-gray-100 text-xs text-gray-600 hover:text-primary-600 transition-all duration-300"
                            >
                                <PhoneCall size={14} className="text-gray-400" />
                                <span>Contact Clinic</span>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </main>
    );
};

export default NotFound;
