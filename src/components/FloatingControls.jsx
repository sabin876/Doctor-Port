import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingControls = () => {
    const [scrollState, setScrollState] = useState('top'); // 'top', 'scrolled', 'bottom'

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            if (scrollY < 100) {
                setScrollState('top');
            } else if (scrollY + windowHeight >= documentHeight - 50) {
                setScrollState('bottom');
            } else {
                setScrollState('scrolled');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleScrollClick = () => {
        if (scrollState === 'top') {
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth',
            });
        } else {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className="fixed bottom-10 right-10 z-50 flex flex-col gap-6 items-center">
            {/* Smart Scroll Button */}
            <motion.button
                onClick={handleScrollClick}
                className="bg-white/80 backdrop-blur-md text-primary-900 w-14 h-14 rounded-2xl shadow-premium border border-white/20 flex items-center justify-center focus:outline-none hover:bg-white transition-all"
                whileHover={{ y: -5, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                    y: [0, -4, 0],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut"
                }}
                aria-label={scrollState === 'top' ? "Scroll to bottom" : "Scroll to top"}
            >
                <AnimatePresence mode="wait">
                    {scrollState === 'top' ? (
                        <motion.div
                            key="down"
                            initial={{ rotate: -180, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 180, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ArrowDown className="w-6 h-6" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="up"
                            initial={{ rotate: 180, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -180, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ArrowUp className="w-6 h-6" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
};

export default FloatingControls;
