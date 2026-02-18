import React, { useState, useEffect } from 'react';
import { Link as ScrollLink, scroller } from 'react-scroll';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Calendar, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [lang, setLang] = useState('EN');
    const [isLangOpen, setIsLangOpen] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const isHome = location.pathname === '/';

    const handleNavigation = (target) => {
        setIsOpen(false);
        if (isHome) {
            scroller.scrollTo(target, {
                smooth: true,
                duration: 500,
                offset: -70,
            });
        } else {
            navigate('/', { state: { scrollTo: target } });
            // Small timeout to allow navigation to complete before scrolling
            setTimeout(() => {
                scroller.scrollTo(target, {
                    smooth: true,
                    duration: 500,
                    offset: -70,
                });
            }, 100);
        }
    };

    const navLinks = [
        { name: 'Home', target: 'home', isRouterLink: false },
        { name: 'About', path: '/about', isRouterLink: true },
        { name: 'Services', target: 'services', isRouterLink: false },
        { name: 'Articles', path: '/articles', isRouterLink: true },
        { name: 'FAQ', path: '/faq', isRouterLink: true },
        { name: 'Contact', path: '/contact', isRouterLink: true },
    ];

    const languages = [
        { code: 'EN', name: 'English', flag: 'https://flagcdn.com/w20/gb.png' },
        { code: 'AR', name: 'Arabic', flag: 'https://flagcdn.com/w20/ae.png' },
        { code: 'HI', name: 'Hindi', flag: 'https://flagcdn.com/w20/in.png' }
    ];

    const currentLang = languages.find(l => l.code === lang) || languages[0];

    return (
        <motion.nav
            className={`sticky top-0 w-full z-50 transition-all duration-500 bg-white border-b border-gray-100 shadow-sm`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex-shrink-0 flex items-center">
                        <div onClick={() => handleNavigation('home')} className="cursor-pointer flex items-center gap-3">
                            <motion.img
                                src={logo}
                                alt="Dr. Ulhas Sonar Logo"
                                className="h-16 sm:h-20 w-auto object-contain"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            />
                            <div className="flex flex-col">
                                <span className="text-2xl font-sans font-extrabold tracking-tight text-primary-900 leading-none">
                                    Dr. Ulhas Sonar
                                </span>
                                <span className="text-[11px] font-sans uppercase tracking-[0.2em] font-medium text-primary-600">
                                    Orthopedic Surgeon
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-10">
                        {navLinks.map((link) => (
                            link.isRouterLink ? (
                                <RouterLink
                                    key={link.name}
                                    to={link.path}
                                    className="text-sm font-sans font-black transition-all duration-300 hover:text-primary-600 relative group text-primary-950 uppercase tracking-widest"
                                >
                                    {link.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
                                </RouterLink>
                            ) : (
                                <button
                                    key={link.name}
                                    onClick={() => handleNavigation(link.target)}
                                    className="text-sm font-sans font-black transition-all duration-300 hover:text-primary-600 relative group text-primary-950 uppercase tracking-widest"
                                >
                                    {link.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
                                </button>
                            )
                        ))}

                        {/* Language Selector */}
                        <div className="relative">
                            <button
                                onClick={() => setIsLangOpen(!isLangOpen)}
                                className="flex items-center gap-2.5 text-gray-700 hover:text-primary-600 transition-colors font-medium text-[15px]"
                            >
                                <img
                                    src={currentLang.flag}
                                    alt={currentLang.name}
                                    className="w-5 h-auto rounded-sm shadow-sm"
                                />
                                <span className="font-sans font-bold">{currentLang.name}</span>
                                <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {isLangOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute right-0 mt-4 w-44 bg-white border border-gray-100 rounded-2xl shadow-premium overflow-hidden z-50 p-1"
                                    >
                                        {languages.map((l) => (
                                            <button
                                                key={l.code}
                                                onClick={() => {
                                                    setLang(l.code);
                                                    setIsLangOpen(false);
                                                }}
                                                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-sans font-medium rounded-xl transition-colors ${lang === l.code ? 'bg-primary-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                                            >
                                                <img src={l.flag} alt={l.name} className="w-5 h-auto rounded-sm shadow-sm" />
                                                <span>{l.name}</span>
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <a
                            href="https://csh.ae/find-a-doctor?name=ulhas"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-primary-600 text-white px-8 py-3.5 rounded-2xl font-sans font-black text-xs uppercase tracking-widest hover:bg-primary-700 transition-all duration-300 shadow-premium hover:shadow-premium-hover hover:-translate-y-0.5 flex items-center group/btn"
                        >
                            <Calendar className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
                            Book Now
                        </a>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="focus:outline-none text-primary-900"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 top-20 bg-white/95 backdrop-blur-xl z-40 md:hidden overflow-y-auto"
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    >
                        <div className="flex flex-col items-center py-12 space-y-8 px-6">
                            {navLinks.map((link, index) => (
                                link.isRouterLink ? (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <RouterLink
                                            to={link.path}
                                            onClick={() => setIsOpen(false)} // Close mobile menu on click
                                            className="text-2xl font-sans font-bold text-gray-900 hover:text-primary-600 transition-colors uppercase tracking-widest"
                                        >
                                            {link.name}
                                        </RouterLink>
                                    </motion.div>
                                ) : (
                                    <motion.button
                                        key={link.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        onClick={() => handleNavigation(link.target)}
                                        className="text-2xl font-sans font-bold text-gray-900 hover:text-primary-600 transition-colors uppercase tracking-widest"
                                    >
                                        {link.name}
                                    </motion.button>
                                )
                            ))}

                            {/* Mobile Language Selector */}
                            <div className="flex flex-col items-center gap-4 w-full border-t border-gray-100 pt-8">
                                <p className="text-[10px] uppercase tracking-widest font-sans font-black text-gray-400">Select Language</p>
                                <div className="flex flex-wrap justify-center gap-4">
                                    {languages.map((l) => (
                                        <button
                                            key={l.code}
                                            onClick={() => {
                                                setLang(l.code);
                                                setIsOpen(false);
                                            }}
                                            className={`px-6 py-2 rounded-xl text-sm font-sans font-black transition-all ${lang === l.code ? 'bg-primary-600 text-white shadow-lg' : 'bg-gray-100 text-gray-600'}`}
                                        >
                                            {l.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="w-full pt-8">
                                <a
                                    href="https://csh.ae/find-a-doctor?name=ulhas"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full bg-primary-600 text-white text-center py-4 rounded-xl font-sans font-bold shadow-xl shadow-primary-200 uppercase tracking-widest text-xs"
                                >
                                    Book Appointment
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
