import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Helmet } from 'react-helmet-async';
import { Phone, MessageCircle, Youtube, Instagram, Twitter, Linkedin, Facebook, Globe, ArrowLeft, ArrowUpRight, Share2 } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import logo from '../assets/logo.webp';

const TikTokIcon = ({ className }) => (
    <svg 
        className={className}
        viewBox="0 0 24 24" 
        fill="currentColor"
    >
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.43V16c0 4.13-3.41 7.55-7.61 7.5-4.65-.05-8.1-4.73-6.93-9.18 1.13-4.32 6.1-6.19 9.81-3.51.02 1.83.02 3.67 0 5.5-.06-.06-.11-.13-.17-.19-1.48-1.57-4.17-1.38-5.35.39-1.28 1.92-.12 4.73 2.18 4.73 2.14.02 3.96-1.74 3.96-3.88V.02z"/>
    </svg>
);

const SocialLinksPage = () => {
    const { t } = useLanguage();
    
    const dubaiPhone = "+971551053445";
    const indiaPhone1 = "904920041";
    const indiaPhone2 = "9049200061";
    
    const whatsappLink = `https://wa.me/${dubaiPhone.replace(/\+/g, '')}?text=Hello%20Dr.%20Ulhas,%20I%20would%20like%20to%20book%20an%20orthopedic%20consultation.`;

    const contactLinks = [
        {
            title: 'Call Dubai Clinic',
            subtitle: '+971 55 105 3445',
            url: `tel:${dubaiPhone}`,
            icon: Phone,
            bgClass: 'bg-gradient-to-r from-primary-600 to-primary-800',
            hoverClass: 'hover:shadow-primary-600/40',
            iconBg: 'bg-white/20',
            textColor: 'text-white'
        },
        {
            title: 'Call India Clinic',
            icon: Phone,
            bgClass: 'bg-gradient-to-r from-blue-600 to-blue-900',
            hoverClass: 'hover:shadow-blue-600/40',
            iconBg: 'bg-white/20',
            textColor: 'text-white',
            sublinks: [
                { label: '904920041', url: `tel:${indiaPhone1}` },
                { label: '9049200061', url: `tel:${indiaPhone2}` }
            ]
        },
        {
            title: 'WhatsApp Consultation',
            subtitle: 'Direct message for appointments',
            url: whatsappLink,
            icon: MessageCircle,
            bgClass: 'bg-gradient-to-r from-[#128C7E] to-[#25D366]',
            hoverClass: 'hover:shadow-[#25D366]/40',
            iconBg: 'bg-white/20',
            textColor: 'text-white'
        },
        {
            title: 'Visit Official Website',
            subtitle: 'Explore services & treatments',
            url: '/',
            icon: Globe,
            bgClass: 'bg-white/10 backdrop-blur-md border border-white/20',
            hoverClass: 'hover:bg-white/20 hover:border-white/40',
            iconBg: 'bg-white/10',
            textColor: 'text-white'
        }
    ];

    const socialLinks = [
        {
            title: 'Instagram',
            url: 'https://www.instagram.com/drulhasortho.1/',
            icon: Instagram,
            color: 'group-hover:text-[#E1306C]'
        },
        {
            title: 'YouTube',
            url: 'https://www.youtube.com/@orthopaedictutorials2135',
            icon: Youtube,
            color: 'group-hover:text-[#FF0000]'
        },
        {
            title: 'TikTok',
            url: 'https://www.tiktok.com/@dr.ulhas.orthoped',
            icon: TikTokIcon,
            color: 'group-hover:text-gray-300'
        },
        {
            title: 'LinkedIn',
            url: 'https://linkedin.com/in/ulhassonarortho',
            icon: Linkedin,
            color: 'group-hover:text-[#0077b5]'
        },
        {
            title: 'Facebook',
            url: 'https://www.facebook.com/profile.php?id=61585848005137',
            icon: Facebook,
            color: 'group-hover:text-[#1877F2]'
        },
        {
            title: 'X (Twitter)',
            url: 'https://x.com/jointsurgeon',
            icon: Twitter,
            color: 'group-hover:text-gray-400'
        }
    ];

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0, scale: 0.95 },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: { type: "spring", stiffness: 100, damping: 12 }
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Dr. Ulhas Sonar - Social Links',
                    text: 'Connect with Dr. Ulhas Sonar, Orthopedic Surgeon in Dubai.',
                    url: window.location.href,
                });
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    return (
        <div className="min-h-screen bg-[#04122d] text-white flex flex-col relative overflow-hidden font-sans pt-8 pb-16 px-4 md:px-6">
            <Helmet>
                <title>Connect with Dr. Ulhas Sonar | Social Media & Contact Links</title>
                <meta name="description" content="Connect with Dr. Ulhas Sonar across all social media platforms and contact the clinic directly for orthopaedic consultations in Dubai." />
            </Helmet>

            {/* Dynamic Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <motion.div 
                    animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-primary-600/20 blur-[100px]"
                />
                <motion.div 
                    animate={{ 
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute top-[40%] -right-[20%] w-[60vw] h-[60vw] rounded-full bg-blue-500/20 blur-[120px]"
                />
            </div>

            <div className="relative z-10 max-w-lg w-full mx-auto flex flex-col">
                {/* Header Actions */}
                <div className="flex justify-between items-center mb-8 w-full">
                    <RouterLink 
                        to="/" 
                        className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 hover:scale-105 transition-all"
                        aria-label="Back to Website"
                    >
                        <ArrowLeft size={18} />
                    </RouterLink>
                    
                    <button 
                        onClick={handleShare}
                        className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 hover:scale-105 transition-all"
                        aria-label="Share this page"
                    >
                        <Share2 size={18} />
                    </button>
                </div>

                {/* Profile Section */}
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                    className="flex flex-col items-center mb-10 text-center"
                >
                    <div className="relative group mb-5">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-blue-500 rounded-full blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-500"></div>
                        <div className="relative w-32 h-32 bg-white rounded-full p-3 shadow-2xl flex items-center justify-center border-2 border-white/20">
                            <img src={logo} alt="Dr. Ulhas Sonar" className="w-full h-auto object-contain drop-shadow-md" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
                        {t('common.doctorName')}
                    </h1>
                    <p className="text-primary-400 text-xs font-semibold uppercase tracking-[0.2em] mb-4 bg-primary-900/40 px-4 py-1.5 rounded-full border border-primary-500/30 inline-block">
                        {t('common.specialty')}
                    </p>
                    <p className="text-gray-300 text-sm font-normal leading-relaxed max-w-sm">
                        Precise orthopaedic surgical care delivered with integrity and an evidence-based approach in Dubai, UAE.
                    </p>
                </motion.div>

                {/* Primary Contact Links */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full space-y-4 mb-8"
                >
                    {contactLinks.map((link, index) => {
                        const Icon = link.icon;
                        const isMulti = !!link.sublinks;
                        
                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={isMulti ? {} : { scale: 0.98 }}
                                className={`group flex items-center p-4 rounded-2xl shadow-lg transition-all duration-300 ${link.bgClass} ${link.hoverClass} overflow-hidden relative`}
                            >
                                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300"></div>
                                
                                {/* For single links, make the whole card clickable */}
                                {!isMulti && (
                                    <a 
                                        href={link.url}
                                        target={link.url.startsWith('/') || link.url.startsWith('tel:') ? '_self' : '_blank'}
                                        rel={link.url.startsWith('/') || link.url.startsWith('tel:') ? '' : 'noopener noreferrer'}
                                        className="absolute inset-0 z-20"
                                        aria-label={link.title}
                                    />
                                )}

                                <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${link.iconBg} flex items-center justify-center backdrop-blur-sm shadow-inner relative z-10`}>
                                    <Icon className={`w-6 h-6 ${link.textColor}`} />
                                </div>
                                <div className="ml-4 flex flex-col flex-grow relative z-10">
                                    <span className={`font-bold ${link.textColor} text-base md:text-lg tracking-tight`}>{link.title}</span>
                                    
                                    {isMulti ? (
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {link.sublinks.map((sub, i) => (
                                                <a 
                                                    key={i}
                                                    href={sub.url}
                                                    className="bg-white/20 hover:bg-white/40 px-3 py-1.5 rounded-lg text-[10px] md:text-xs font-bold transition-all border border-white/10 text-white relative z-30"
                                                >
                                                    {sub.label}
                                                </a>
                                            ))}
                                        </div>
                                    ) : (
                                        link.subtitle && (
                                            <span className={`${link.textColor} opacity-80 text-xs font-medium mt-0.5`}>{link.subtitle}</span>
                                        )
                                    )}
                                </div>
                                
                                {!isMulti && (
                                    <div className="flex-shrink-0 ml-2 relative z-10">
                                        <ArrowUpRight className={`w-5 h-5 ${link.textColor} opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300`} />
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Social Media Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="w-full"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">Connect Socially</span>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 md:gap-4">
                        {socialLinks.map((social, index) => {
                            const Icon = social.icon;
                            return (
                                <motion.a
                                    key={index}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex flex-col items-center justify-center p-4 md:p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                                >
                                    <Icon className={`w-8 h-8 text-white/80 transition-colors duration-300 mb-2 ${social.color}`} />
                                    <span className="text-[10px] md:text-xs font-medium text-gray-300 group-hover:text-white">{social.title}</span>
                                </motion.a>
                            )
                        })}
                    </div>
                </motion.div>
                
                {/* Footer */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="mt-16 text-center"
                >
                    <p className="text-gray-500 text-[10px] uppercase tracking-widest font-medium">
                        &copy; {new Date().getFullYear()} {t('common.doctorName')}.<br/>All rights reserved.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default SocialLinksPage;
