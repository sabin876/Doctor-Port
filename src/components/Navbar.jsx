import React, { useState, useEffect } from 'react';
import { Link as ScrollLink, scroller } from 'react-scroll';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Calendar, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.webp';


import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
    const { language: lang, setLanguage, t } = useLanguage();
    const isRtl = lang === 'AR';
    const [isOpen, setIsOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const isHome = location.pathname === '/';

    const handleNavigation = (target, route = null) => {
        setIsOpen(false);

        // If a route is provided (like '/contact')
        if (route) {
            const isCurrentlyOnRoute = location.pathname === route;

            if (isCurrentlyOnRoute) {
                // If already on the page, just scroll
                scroller.scrollTo(target, {
                    smooth: true,
                    duration: 500,
                    offset: -70,
                });
            } else {
                // If on different page, navigate then scroll
                navigate(route);
                setTimeout(() => {
                    scroller.scrollTo(target, {
                        smooth: true,
                        duration: 500,
                        offset: -70,
                    });
                }, 500); // slightly longer timeout to ensure page loads
            }
            return;
        }

        // Standard behavior for hash links on the home page
        if (isHome) {
            scroller.scrollTo(target, {
                smooth: true,
                duration: 500,
                offset: -70,
            });
        } else {
            navigate('/', { state: { scrollTo: target } });
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
        { id: 'home', name: 'Home', target: 'home', isRouterLink: false },
        { id: 'about', name: 'About', path: '/about', isRouterLink: true },
        { id: 'services', name: 'Services', path: '/services', isRouterLink: true, hasDropdown: true },
        { id: 'articles', name: 'Articles', path: '/articles', isRouterLink: true },
        { id: 'gallery', name: 'Gallery', path: '/gallery', isRouterLink: true },
        { id: 'contact', name: 'Contact', target: 'contact-form', route: '/contact', isRouterLink: false },
    ];

    const dropdownServices = [
        { id: 'arthroscopy', name: t('footer.serviceLinks.arthroscopy'), path: '/services/3' },
        { id: 'sportsMedicine', name: t('footer.serviceLinks.sportsMedicine'), path: '/services/1' },
        { id: 'roboticSurgery', name: t('footer.serviceLinks.roboticSurgery'), path: '/services/2' },
        { id: 'jointReplacement', name: t('footer.serviceLinks.jointReplacement'), path: '/services/0' },
        { id: 'deformityCorrection', name: t('footer.serviceLinks.deformityCorrection'), path: '/services/4' },
        { id: 'physiotherapy', name: t('footer.serviceLinks.physiotherapy'), path: '/services/7' },
        { id: 'more', name: t('footer.serviceLinks.more'), path: '/services' },
    ];

    const languages = [
        { code: 'EN', name: 'English', flag: 'https://flagcdn.com/w20/gb.png' },
        { code: 'AR', name: 'العربية', flag: 'https://flagcdn.com/w20/ae.png' },
        { code: 'HI', name: 'हिन्दी', flag: 'https://flagcdn.com/w20/in.png' }
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
                <div className="flex justify-between items-center h-16 md:h-20">
                    <div className="flex-shrink-0 flex items-center -ml-2 lg:-ml-12">
                        <div onClick={() => handleNavigation('home')} className="cursor-pointer flex items-center gap-3">
                                <motion.img
                                    src={logo}
                                    alt="Doctor Ulhas Sonar Logo"
                                    className="h-10 sm:h-12 md:h-14 w-auto object-contain"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                />
                            <div className="flex flex-col">
                                <span className="text-lg sm:text-2xl font-metabolic font-extrabold tracking-tight text-primary-900 leading-none">
                                    {t('common.doctorName')}
                                </span>
                                <span className="text-[9px] sm:text-[11px] font-metabolic uppercase tracking-[0.2em] font-medium text-primary-600">
                                    {t('common.specialty')}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-x-8">
                        {navLinks.map((link) => (
                            link.hasDropdown ? (
                                <div 
                                    key={link.id} 
                                    className="relative group/services"
                                    onMouseEnter={() => setIsServicesOpen(true)}
                                    onMouseLeave={() => setIsServicesOpen(false)}
                                >
                                    <button
                                        className="flex items-center gap-1 text-[13px] font-montserrat font-bold transition-all duration-300 hover:text-primary-600 relative group text-primary-950 uppercase tracking-widest py-2"
                                    >
                                        {t(`nav.${link.id}`)}
                                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isServicesOpen ? 'rotate-180 text-primary-600' : 'text-gray-400'}`} />
                                        <span className={`absolute -bottom-1 ${isRtl ? 'end-0' : 'start-0'} w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover/services:w-full`}></span>
                                    </button>

                                    <AnimatePresence>
                                        {isServicesOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                                                className={`absolute ${isRtl ? 'end-0' : 'start-0'} mt-3 w-64 bg-white border border-gray-100 rounded-2xl shadow-premium-hover overflow-hidden z-50 p-2`}
                                            >
                                                {dropdownServices.map((service) => (
                                                    <RouterLink
                                                        key={service.id}
                                                        to={service.path}
                                                        onClick={() => setIsServicesOpen(false)}
                                                        className="flex items-center justify-between w-full px-4 py-3 text-[12px] font-montserrat font-bold rounded-xl transition-all duration-200 text-gray-700 hover:bg-primary-50 hover:text-primary-600 hover:pl-5 group/item"
                                                    >
                                                        <span>{service.name}</span>
                                                        <ChevronDown className={`w-3 h-3 ${isRtl ? 'rotate-90' : '-rotate-90'} opacity-0 group-hover/item:opacity-100 transition-all`} />
                                                    </RouterLink>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : link.isRouterLink ? (
                                <RouterLink
                                    key={link.name}
                                    to={link.path}
                                    className="text-[13px] font-montserrat font-bold transition-all duration-300 hover:text-primary-600 relative group text-primary-950 uppercase tracking-widest"
                                >
                                    {t(`nav.${link.id}`)}
                                    <span className={`absolute -bottom-1 ${isRtl ? 'end-0' : 'start-0'} w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full`}></span>
                                </RouterLink>
                            ) : (
                                <button
                                    key={link.id}
                                    onClick={() => handleNavigation(link.target, link.route)}
                                    className="text-[13px] font-montserrat font-bold transition-all duration-300 hover:text-primary-600 relative group text-primary-950 uppercase tracking-widest"
                                >
                                    {t(`nav.${link.id}`)}
                                    <span className={`absolute -bottom-1 ${isRtl ? 'end-0' : 'start-0'} w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full`}></span>
                                </button>
                            )
                        ))}

                        {/* Language Selector Dropdown Button */}
                        <div className="relative group/lang">
                            <button
                                onClick={() => setIsLangOpen(!isLangOpen)}
                                onMouseEnter={() => setIsLangOpen(true)}
                                className="flex items-center gap-x-2 transition-all duration-300 hover:text-primary-600 group py-2"
                            >
                                <img
                                    src={currentLang.flag}
                                    alt={currentLang.name}
                                    className="w-4 h-auto rounded-sm opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                                <span className="font-montserrat font-bold text-primary-950 group-hover:text-primary-600 text-[13px] tracking-widest">
                                    Lan
                                </span>
                                <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform duration-500 ${isLangOpen ? 'rotate-180 text-primary-600' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {isLangOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 15, scale: 0.95 }}
                                        onMouseLeave={() => setIsLangOpen(false)}
                                        className="absolute end-0 mt-3 w-48 bg-white border border-gray-100 rounded-2xl shadow-premium-hover overflow-hidden z-50 p-2"
                                    >
                                        <div className="mb-2 px-3 py-1.5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50 pb-2">
                                            {t('nav.selectLanguage')}
                                        </div>
                                        {languages.map((l) => (
                                            <button
                                                key={l.code}
                                                onClick={() => {
                                                    setLanguage(l.code);
                                                    setIsLangOpen(false);
                                                }}
                                                className={`w-full flex items-center gap-3 px-4 py-3 text-[14px] font-metabolic font-bold rounded-xl transition-all duration-200 ${lang === l.code ? 'bg-primary-50 text-primary-600 shadow-sm ring-1 ring-primary-100' : 'text-gray-600 hover:bg-gray-50 hover:pl-5'}`}
                                            >
                                                <img src={l.flag} alt={l.name} loading="lazy" decoding="async" className="w-5 h-auto rounded-sm shadow-sm" />
                                                <span>{l.name}</span>
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <button
                            onClick={() => handleNavigation('contact-form', '/contact')}
                            className="bg-primary-600 text-white px-6 py-2.5 rounded-xl font-montserrat font-black text-[10px] uppercase tracking-widest hover:bg-primary-700 transition-all duration-300 shadow-premium hover:shadow-premium-hover hover:-translate-y-0.5 flex items-center group/btn"
                        >
                            <Calendar className="w-4 h-4 me-2 group-hover/btn:rotate-12 transition-transform" />
                            {t('nav.bookNow')}
                        </button>
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
                        initial={{ opacity: 0, x: isRtl ? '-100%' : '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: isRtl ? '-100%' : '100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    >
                        <div className="flex flex-col items-center py-12 space-y-8 px-6">
                            {navLinks.map((link, index) => (
                                link.hasDropdown ? (
                                    <div key={link.id} className="w-full flex flex-col items-center">
                                        <button
                                            onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                                            className="flex items-center gap-2 text-[13px] font-montserrat font-bold text-gray-900 hover:text-primary-600 transition-colors uppercase tracking-widest"
                                        >
                                            {t(`nav.${link.id}`)}
                                            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isMobileServicesOpen ? 'rotate-180' : ''}`} />
                                        </button>
                                        <AnimatePresence>
                                            {isMobileServicesOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden flex flex-col items-center mt-4 space-y-4 w-full bg-gray-50/50 rounded-2xl py-4"
                                                >
                                                    {dropdownServices.map((service) => (
                                                        <RouterLink
                                                            key={service.id}
                                                            to={service.path}
                                                            onClick={() => setIsOpen(false)}
                                                            className="text-[12px] font-montserrat font-bold text-gray-600 hover:text-primary-600 transition-colors uppercase tracking-widest"
                                                        >
                                                            {service.name}
                                                        </RouterLink>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ) : link.isRouterLink ? (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <RouterLink
                                            to={link.path}
                                            onClick={() => setIsOpen(false)} // Close mobile menu on click
                                            className="text-[13px] font-montserrat font-bold text-gray-900 hover:text-primary-600 transition-colors uppercase tracking-widest"
                                        >
                                            {t(`nav.${link.id}`)}
                                        </RouterLink>
                                    </motion.div>
                                ) : (
                                    <motion.button
                                        key={link.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        onClick={() => handleNavigation(link.target, link.route)}
                                        className="text-[13px] font-montserrat font-bold text-gray-900 hover:text-primary-600 transition-colors uppercase tracking-widest"
                                    >
                                        {t(`nav.${link.id}`)}
                                    </motion.button>
                                )
                            ))}

                            {/* Mobile Language Selector */}
                            <div className="flex flex-col items-center gap-4 w-full border-t border-gray-100 pt-8">
                                <p className="text-[10px] uppercase tracking-widest font-metabolic font-black text-gray-400">{t('nav.selectLanguage')}</p>
                                <div className="flex flex-wrap justify-center gap-4">
                                    {languages.map((l) => (
                                            <button
                                                key={l.code}
                                                onClick={() => {
                                                    setLanguage(l.code);
                                                    setIsOpen(false);
                                                }}
                                                className={`px-4 py-2 text-[13px] font-montserrat font-bold transition-all duration-300 flex items-center gap-2 ${lang === l.code ? 'text-primary-600' : 'text-gray-600 hover:text-primary-600'}`}
                                            >
                                                <img src={l.flag} alt={l.name} loading="lazy" decoding="async" className="w-4 h-auto rounded-sm" />
                                                {l.name}
                                            </button>
                                    ))}
                                </div>
                            </div>

                            <div className="w-full pt-8">
                                <button
                                    onClick={() => handleNavigation('contact-form', '/contact')}
                                    className="block w-full bg-primary-600 text-white text-center py-4 rounded-xl font-montserrat font-bold shadow-xl shadow-primary-200 uppercase tracking-widest text-xs"
                                >
                                    {t('nav.bookNow')}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
