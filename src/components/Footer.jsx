import React, { useState, useEffect } from 'react';
import gmcLogo from '../assets/gmc-logo-navbar.webp';
import ebotLogo from '../assets/ebot-logo-navbar.webp';
import logo from '../assets/logo.webp';
import cshLogo from '../assets/csh-logo.png';
import { Link as RouterLink } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Phone, Mail, Youtube, Instagram, Linkedin, Facebook, Twitter, ChevronRight } from 'lucide-react';
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
        <footer className="bg-[#04122d] text-white pt-24 pb-12 relative overflow-hidden border-t-[6px] border-primary-600 font-sans">
            {/* Background Decorations */}
            <div className="absolute top-0 start-0 w-full h-[600px] bg-gradient-to-br from-primary-900/20 via-transparent to-transparent pointer-events-none"></div>
            <div className="absolute -bottom-40 -start-40 w-96 h-96 bg-primary-600/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute top-20 -end-40 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-y-12 gap-x-8 mb-16">
                    {/* Brand Column */}
                    <div className="lg:col-span-4 flex flex-col pt-2">
                        {/* Primary Brand Identity */}
                        <div className="flex flex-col mb-8">
                            <RouterLink to="/" className="flex items-center gap-4 group mb-6">
                                <div className="bg-white p-2.5 rounded-2xl shadow-xl shadow-black/20 group-hover:scale-105 transition-transform duration-500">
                                    <img src={logo} alt="Dr. Ulhas Sonar" className="h-12 w-auto" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xl md:text-2xl font-montserrat font-normal tracking-tight text-white leading-tight uppercase">
                                        {t('common.doctorName')}
                                    </span>
                                    <span className="text-primary-400 text-[10px] font-montserrat font-normal uppercase tracking-[0.25em] mt-1 opacity-90">
                                        {t('common.specialty')}
                                    </span>
                                </div>
                            </RouterLink>


                        </div>
                        <p className="text-gray-400 text-sm leading-loose font-normal max-w-sm mb-8">
                            Precise orthopaedic surgical care delivered with integrity, respect for patient rights, and an individualised medical evidence-based approach—restoring movement, function, and active lives.
                        </p>
                        
                        {/* Social Links */}
                        <div className="flex gap-4">
                            {[
                                { Icon: Youtube, label: 'YouTube', href: 'https://youtu.be/hX73EZA8eps?si=VxpSILzlZuVGQpwc' },
                                { Icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/drulhasortho.1/' },
                                { Icon: Twitter, label: 'X (Twitter)', href: 'https://x.com/jointsurgeon' },
                                { Icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/ulhassonarortho' },
                                { Icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61585848005137' },
                                { Icon: TikTokIcon, label: 'TikTok', href: 'https://www.tiktok.com/@dr.ulhas.orthoped' }
                            ].map((social, index) => (
                                <a 
                                    key={index} 
                                    href={social.href} 
                                    target="_blank" rel="noreferrer"
                                    aria-label={social.label}
                                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white hover:border-primary-500 hover:-translate-y-1 transition-all duration-300 shadow-sm"
                                >
                                    <social.Icon size={18} strokeWidth={2} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Services Column */}
                    <div className="lg:col-span-2 pt-2">
                        <h4 className="text-[13px] font-montserrat font-normal uppercase tracking-[0.2em] mb-8 text-white relative inline-block">
                            {t('footer.services')}
                            <span className="absolute -bottom-3 left-0 w-8 h-1 bg-primary-600 rounded-full"></span>
                        </h4>
                        <ul className="space-y-4 text-[15px] font-normal mt-4">
                            {dynamicServices.map((service, idx) => (
                                <li key={idx}>
                                    <RouterLink to={`/services/${service.slug}`} className="text-gray-400 hover:text-primary-400 transition-colors duration-300 flex items-center group">
                                        <ChevronRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 text-primary-500 transition-all duration-300 mr-2" />
                                        <span className="whitespace-nowrap">{service.title}</span>
                                    </RouterLink>
                                </li>
                            ))}
                            <li>
                                <RouterLink to="/services" className="text-gray-400 hover:text-primary-400 transition-colors duration-300 flex items-center group">
                                    <ChevronRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 text-primary-500 transition-all duration-300 mr-2" />
                                    <span className="whitespace-nowrap">{t('footer.serviceLinks.more')}</span>
                                </RouterLink>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links Column */}
                    <div className="lg:col-span-2 pt-2">
                        <h4 className="text-[13px] font-montserrat font-normal uppercase tracking-[0.2em] mb-8 text-white relative inline-block">
                            {t('footer.nav')}
                            <span className="absolute -bottom-3 left-0 w-8 h-1 bg-primary-600 rounded-full"></span>
                        </h4>
                        <ul className="space-y-4 text-[15px] font-normal mt-4">
                            {[
                                { name: t('nav.home'), href: '/' },
                                { name: t('nav.about'), href: '/about' },
                                { name: t('nav.services'), href: '/services' },
                                { name: t('nav.testimonials') || 'Testimonials', href: '/#testimonials' }
                            ].map((link, idx) => (
                                <li key={idx}>
                                    <RouterLink to={link.href} className="text-gray-400 hover:text-primary-400 transition-colors duration-300 flex items-center group">
                                        <ChevronRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 text-primary-500 transition-all duration-300 mr-2" />
                                        <span>{link.name}</span>
                                    </RouterLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links Column */}
                    <div className="lg:col-span-2 pt-2">
                        <h4 className="text-[13px] font-montserrat font-normal uppercase tracking-[0.2em] mb-8 text-white relative inline-block">
                            {t('footer.support')}
                            <span className="absolute -bottom-3 left-0 w-8 h-1 bg-primary-600 rounded-full"></span>
                        </h4>
                        <ul className="space-y-4 text-[15px] font-normal mt-4">
                            {[
                                { name: t('footer.patientResources'), href: '/#publications' },
                                { name: t('footer.articles'), href: '/blog' },
                                { name: t('nav.faq'), href: '/#faq' },
                                { name: t('footer.privacy'), href: '#' }
                            ].map((item, idx) => (
                                <li key={idx}>
                                    <RouterLink to={item.href} className="text-gray-400 hover:text-primary-400 transition-colors duration-300 flex items-center group">
                                        <ChevronRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 text-primary-500 transition-all duration-300 mr-2" />
                                        <span>{item.name}</span>
                                    </RouterLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info Column */}
                    <div className="lg:col-span-2 pt-2">
                        <h4 className="text-[13px] font-montserrat font-normal uppercase tracking-[0.2em] mb-8 text-white relative inline-block">
                            {t('footer.clinic')}
                            <span className="absolute -bottom-3 left-0 w-8 h-1 bg-primary-600 rounded-full"></span>
                        </h4>
                        <ul className="space-y-6 mt-4 mb-10">
                            <li className="flex gap-4 group cursor-pointer">
                                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 group-hover:bg-primary-600/30 group-hover:border-primary-500/40 flex items-center justify-center text-primary-400 group-hover:text-primary-300 transition-all duration-300 flex-shrink-0 shadow-lg shadow-black/20">
                                    <MapPin size={22} strokeWidth={1.5} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-gray-300 text-sm font-normal leading-relaxed group-hover:text-white transition-colors duration-300">
                                        {t('footer.hospitalName')}
                                    </span>
                                    <span className="text-gray-500 text-xs mt-0.5">Dubai, UAE</span>
                                </div>
                            </li>
                            <li className="flex gap-4 group cursor-pointer">
                                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 group-hover:bg-primary-600/30 group-hover:border-primary-500/40 flex items-center justify-center text-primary-400 group-hover:text-primary-300 transition-all duration-300 flex-shrink-0 shadow-lg shadow-black/20">
                                    <Phone size={22} strokeWidth={1.5} />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <span className="text-white font-normal tracking-tight whitespace-nowrap text-lg">{import.meta.env.VITE_CONTACT_PHONE}</span>
                                    <span className="text-primary-500 text-[10px] font-normal uppercase tracking-[0.2em] mt-0.5">{t('footer.emergency')}</span>
                                </div>
                            </li>
                        </ul>

                        {/* Visit Me At Section - Enhanced Design */}
                        <div className="pt-4 border-t border-white/5 mt-4">
                            <h4 className="text-[10px] font-normal uppercase tracking-[0.3em] mb-5 text-primary-500">
                                {t('footer.visitMeAt')}
                            </h4>
                            <a 
                                href="https://csh.ae/" 
                                target="_blank" 
                                rel="noreferrer" 
                                className="group flex items-center justify-center bg-white p-2.5 rounded-2xl shadow-xl transition-all duration-500 hover:-translate-y-1.5 hover:shadow-primary-500/20 active:scale-95"
                            >
                                <img src={cshLogo} alt="Canadian Specialist Hospital" className="h-14 w-auto object-contain rounded-xl" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-gray-500 text-[12px] font-montserrat font-normal uppercase tracking-[0.15em]">
                        &copy; {currentYear} <span className="text-gray-400">{t('common.doctorName')}</span>. {t('footer.rights')}
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-600 text-[10px] font-montserrat font-normal uppercase tracking-widest">Designed for Excellence</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
