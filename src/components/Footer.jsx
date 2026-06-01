import React, { useState, useEffect } from 'react';
import gmcLogo from '../assets/gmc-logo-navbar.webp';
import ebotLogo from '../assets/ebot-logo-navbar.webp';
import logo from '../assets/logo.webp';
import { Link as RouterLink } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Phone, Mail, Youtube, Instagram, Linkedin, Facebook, Twitter, ChevronRight, Sparkles } from 'lucide-react';
import { api } from '../lib/api';

const TikTokIcon = ({ size = 18 }) => (
    <svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="currentColor"
    >
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.43V16c0 4.13-3.41 7.55-7.61 7.5-4.65-.05-8.1-4.73-6.93-9.18 1.13-4.32 6.1-6.19 9.81-3.51.02 1.83.02 3.67 0 5.5-.06-.06-.11-.13-.17-.19-1.48-1.57-4.17-1.38-5.35.39-1.28 1.92-.12 4.73 2.18 4.73 2.14.02 3.96-1.74 3.96-3.88V.02z"/>
    </svg>
);

const Footer = () => {
    const { t } = useLanguage();
    const currentYear = new Date().getFullYear();
    const [dynamicServices, setDynamicServices] = useState([]);

    useEffect(() => {
        api.getServices()
            .then(data => {
                setDynamicServices(data.slice(0, 6)); // Show top 6
            })
            .catch(err => console.error("Failed to fetch services for footer:", err));
    }, []);

    return (
        <footer className="bg-gradient-to-b from-[#020815] via-[#040f26] to-[#01050e] text-white pt-24 pb-12 relative overflow-hidden border-t border-slate-800 font-sans">
            {/* Atmospheric Background Glows */}
            <div className="absolute top-0 start-0 w-full h-[500px] bg-gradient-to-br from-primary-950/20 via-transparent to-transparent pointer-events-none"></div>
            <div className="absolute -bottom-48 -start-48 w-[500px] h-[500px] bg-primary-600/5 rounded-full blur-[140px] pointer-events-none"></div>
            <div className="absolute top-20 -end-48 w-96 h-96 bg-sky-500/5 rounded-full blur-[120px] pointer-events-none"></div>
            
            {/* Subtle Horizontal Highlight Line at Top */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/40 to-transparent"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-y-12 gap-x-8 mb-20">
                    
                    {/* Brand Column */}
                    <div className="lg:col-span-4 flex flex-col justify-between">
                        <div>
                            {/* Primary Brand Identity */}
                            <RouterLink to="/" className="flex items-center gap-4 group mb-6 inline-flex">
                                <div className="bg-white/95 p-2 rounded-2xl border border-white/10 group-hover:border-primary-500/30 group-hover:shadow-[0_0_25px_rgba(2,132,199,0.25)] transition-all duration-500">
                                    <img src={logo} alt="Dr. Ulhas Sonar" className="h-10 w-auto object-contain" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-lg font-montserrat font-bold tracking-tight text-white leading-tight uppercase group-hover:text-primary-400 transition-colors duration-300">
                                        {t('common.doctorName')}
                                    </span>
                                    <span className="text-primary-500 text-[9px] font-montserrat font-medium uppercase tracking-[0.25em] mt-1">
                                        {t('common.specialty')}
                                    </span>
                                </div>
                            </RouterLink>

                            <p className="text-slate-400 text-sm leading-relaxed font-light max-w-sm mb-8 pr-4">
                                Precise orthopaedic surgical care delivered with integrity, respect for patient rights, and an individualised medical evidence-based approach—restoring movement, function, and active lives.
                            </p>
                        </div>
                        
                        {/* Social Links with Custom Hover Glow */}
                        <div>
                            <h4 className="text-[10px] font-normal uppercase tracking-[0.25em] mb-4 text-slate-500">Connect With Me</h4>
                            <div className="flex gap-3 flex-wrap">
                                {[
                                    { Icon: Youtube, label: 'YouTube', href: 'https://youtu.be/hX73EZA8eps?si=VxpSILzlZuVGQpwc', hoverClass: 'hover:bg-[#FF0000] hover:shadow-[0_0_15px_rgba(255,0,0,0.4)] hover:border-[#FF0000]' },
                                    { Icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/drulhasortho.1/', hoverClass: 'hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:shadow-[0_0_15px_rgba(238,42,123,0.4)] hover:border-[#ee2a7b]' },
                                    { Icon: Twitter, label: 'X (Twitter)', href: 'https://x.com/jointsurgeon', hoverClass: 'hover:bg-[#111111] hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:border-[#333333]' },
                                    { Icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/ulhassonarortho', hoverClass: 'hover:bg-[#0077b5] hover:shadow-[0_0_15px_rgba(0,119,181,0.4)] hover:border-[#0077b5]' },
                                    { Icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61585848005137', hoverClass: 'hover:bg-[#1877f2] hover:shadow-[0_0_15px_rgba(24,119,242,0.4)] hover:border-[#1877f2]' },
                                    { Icon: TikTokIcon, label: 'TikTok', href: 'https://www.tiktok.com/@dr.ulhas.orthoped', hoverClass: 'hover:bg-[#000000] hover:shadow-[0_0_15px_rgba(0,242,234,0.4)] hover:border-[#00f2ea]' }
                                ].map((social, index) => (
                                    <a 
                                        key={index} 
                                        href={social.href} 
                                        target="_blank" rel="noreferrer"
                                        aria-label={social.label}
                                        className={`w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-sm ${social.hoverClass}`}
                                    >
                                        <social.Icon size={16} strokeWidth={2} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Services Column */}
                    <div className="lg:col-span-2 lg:pl-4">
                        <h4 className="text-xs font-montserrat font-semibold uppercase tracking-[0.25em] mb-6 text-white flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary-500 shadow-[0_0_8px_rgba(2,132,199,0.8)]" />
                            {t('footer.services')}
                        </h4>
                        <ul className="space-y-3.5 mt-4">
                            {dynamicServices.map((service, idx) => (
                                <li key={idx}>
                                    <RouterLink 
                                        to={`/services/${service.slug}`} 
                                        className="text-slate-400 hover:text-white transition-all duration-300 flex items-center group relative py-0.5 text-sm font-light"
                                    >
                                        <span className="w-1 h-1 rounded-full bg-primary-500 scale-0 group-hover:scale-100 transition-all duration-300 mr-2 -ml-3 group-hover:ml-0 shadow-[0_0_8px_rgba(2,132,199,0.8)] flex-shrink-0" />
                                        <span className="group-hover:translate-x-1 transition-transform duration-300 truncate">{service.title}</span>
                                    </RouterLink>
                                </li>
                            ))}
                            <li>
                                <RouterLink 
                                    to="/services" 
                                    className="text-slate-400 hover:text-white transition-all duration-300 flex items-center group relative py-0.5 text-sm font-light"
                                >
                                    <span className="w-1 h-1 rounded-full bg-primary-500 scale-0 group-hover:scale-100 transition-all duration-300 mr-2 -ml-3 group-hover:ml-0 shadow-[0_0_8px_rgba(2,132,199,0.8)] flex-shrink-0" />
                                    <span className="group-hover:translate-x-1 transition-transform duration-300">{t('footer.serviceLinks.more')}</span>
                                </RouterLink>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links Column */}
                    <div className="lg:col-span-2 lg:pl-4">
                        <h4 className="text-xs font-montserrat font-semibold uppercase tracking-[0.25em] mb-6 text-white flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary-500 shadow-[0_0_8px_rgba(2,132,199,0.8)]" />
                            {t('footer.nav')}
                        </h4>
                        <ul className="space-y-3.5 mt-4">
                            {[
                                { name: t('nav.home'), href: '/' },
                                { name: t('nav.about'), href: '/about' },
                                { name: t('nav.services'), href: '/services' },
                                { name: t('nav.testimonials') || 'Testimonials', href: '/#testimonials' }
                            ].map((link, idx) => (
                                <li key={idx}>
                                    <RouterLink 
                                        to={link.href} 
                                        className="text-slate-400 hover:text-white transition-all duration-300 flex items-center group relative py-0.5 text-sm font-light"
                                    >
                                        <span className="w-1 h-1 rounded-full bg-primary-500 scale-0 group-hover:scale-100 transition-all duration-300 mr-2 -ml-3 group-hover:ml-0 shadow-[0_0_8px_rgba(2,132,199,0.8)] flex-shrink-0" />
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                                    </RouterLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links Column */}
                    <div className="lg:col-span-2 lg:pl-4">
                        <h4 className="text-xs font-montserrat font-semibold uppercase tracking-[0.25em] mb-6 text-white flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary-500 shadow-[0_0_8px_rgba(2,132,199,0.8)]" />
                            {t('footer.support')}
                        </h4>
                        <ul className="space-y-3.5 mt-4">
                            {[
                                { name: t('footer.patientResources'), href: '/#publications' },
                                { name: t('footer.articles'), href: '/blog' },
                                { name: t('nav.faq'), href: '/#faq' },
                                { name: t('footer.privacy'), href: '#' }
                            ].map((item, idx) => (
                                <li key={idx}>
                                    <RouterLink 
                                        to={item.href} 
                                        className="text-slate-400 hover:text-white transition-all duration-300 flex items-center group relative py-0.5 text-sm font-light"
                                    >
                                        <span className="w-1 h-1 rounded-full bg-primary-500 scale-0 group-hover:scale-100 transition-all duration-300 mr-2 -ml-3 group-hover:ml-0 shadow-[0_0_8px_rgba(2,132,199,0.8)] flex-shrink-0" />
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">{item.name}</span>
                                    </RouterLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info Column */}
                    <div className="lg:col-span-2">
                        <h4 className="text-xs font-montserrat font-semibold uppercase tracking-[0.25em] mb-6 text-white flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary-500 shadow-[0_0_8px_rgba(2,132,199,0.8)]" />
                            {t('footer.clinic')}
                        </h4>
                        <ul className="space-y-4 mt-4 mb-8">
                            <li className="flex gap-3.5 group cursor-pointer">
                                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 group-hover:bg-primary-500 group-hover:text-white group-hover:border-primary-400 group-hover:shadow-[0_0_15px_rgba(2,132,199,0.3)] flex items-center justify-center text-primary-400 transition-all duration-300 flex-shrink-0 shadow-md">
                                    <MapPin size={16} strokeWidth={2} />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-slate-300 text-xs font-light leading-relaxed group-hover:text-white transition-colors duration-300">
                                        {t('footer.hospitalName')}
                                    </span>
                                    <span className="text-slate-500 text-[10px] mt-0.5">Dubai, UAE</span>
                                </div>
                            </li>
                            
                            <li className="flex gap-3.5 group cursor-pointer">
                                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 group-hover:bg-primary-500 group-hover:text-white group-hover:border-primary-400 group-hover:shadow-[0_0_15px_rgba(2,132,199,0.3)] flex items-center justify-center text-primary-400 transition-all duration-300 flex-shrink-0 shadow-md">
                                    <Phone size={16} strokeWidth={2} />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-white text-[14px] font-medium tracking-tight whitespace-nowrap">{import.meta.env.VITE_CONTACT_PHONE}</span>
                                    <span className="text-primary-500 text-[9px] font-semibold uppercase tracking-[0.2em] mt-0.5">{t('footer.emergency')}</span>
                                </div>
                            </li>
                        </ul>

                        {/* Visit Me At Section - Enhanced Glassmorphism Design */}
                        <div className="pt-5 border-t border-white/5 mt-4">
                            <h4 className="text-[9px] font-semibold uppercase tracking-[0.3em] mb-4 text-primary-500">
                                {t('footer.visitMeAt')}
                            </h4>
                            <a 
                                href="https://csh.ae/" 
                                target="_blank" 
                                rel="noreferrer" 
                                className="group flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-primary-500/30 p-3 rounded-2xl shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(2,132,199,0.15)] active:scale-98"
                            >
                                {/* Professional SVG Shield Logo Representation */}
                                <div className="relative w-11 h-11 bg-primary-950/60 rounded-xl shadow-inner flex items-center justify-center flex-shrink-0 overflow-hidden border border-white/10 group-hover:border-primary-500/50 transition-all duration-500">
                                    <svg className="w-7 h-7 text-primary-400 group-hover:text-primary-300 transition-colors" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20 2L4 8V18C4 26.5 10.5 34.5 20 38C29.5 34.5 36 26.5 36 18V8L20 2Z" fill="currentColor" fillOpacity="0.15"/>
                                        <path d="M20 4L6 9.25V18C6 25.5 11.5 32.5 20 35.5C28.5 32.5 34 25.5 34 18V9.25L20 4Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M20 12V26M13 19H27" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <div className="absolute inset-0 bg-gradient-to-tr from-primary-600/30 to-transparent pointer-events-none"></div>
                                </div>
                                <div className="flex flex-col border-l border-white/10 pl-3 py-0.5 min-w-0 flex-1">
                                    <span className="text-white text-[11px] font-normal font-montserrat tracking-tight leading-tight mb-1 truncate text-right" dir="rtl">
                                        المستشفى الكندي التخصصي
                                    </span>
                                    <span className="text-slate-400 group-hover:text-slate-300 text-[9px] font-normal font-montserrat tracking-tighter leading-tight truncate transition-colors">
                                        Canadian Specialist Hospital
                                    </span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider Line */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>

                {/* Bottom Bar */}
                <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-slate-500 text-[11px] font-montserrat font-normal uppercase tracking-[0.2em] text-center md:text-left">
                        &copy; {currentYear} <span className="text-slate-400 font-semibold">{t('common.doctorName')}</span>. {t('footer.rights')}
                    </p>
                    <div className="flex items-center gap-2">
                        <Sparkles size={12} className="text-primary-500 animate-pulse" />
                        <span className="text-slate-600 text-[9px] font-montserrat font-medium uppercase tracking-[0.25em]">Designed for Excellence</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
