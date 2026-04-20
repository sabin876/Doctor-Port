import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Youtube, Instagram, Linkedin, Facebook, Twitter, Send, Activity, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SEO from './SEO';
import logo from '../assets/logo.webp';

const Contact = () => {
    const { language, t } = useLanguage();
    const isRtl = language === 'AR';

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main id="contact" className="relative py-32 bg-white overflow-hidden">
            <SEO
                title="Contact Dr. Ulhas | Book an Appointment"
                description="Get in touch with Dr. Ulhas for expert orthopedic consultations in Dubai. Find our clinic location, contact numbers, and book your appointment today."
                url="/contact"
                image={logo}
            />
            {/* Ultra-Premium Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                {/* Medical Precision Grid */}
                <div className="absolute inset-0 opacity-[0.05]"
                    style={{
                        backgroundImage: 'radial-gradient(#2563eb 0.5px, transparent 0.5px)',
                        backgroundSize: '30px 30px'
                    }}
                />

                {/* Dynamic Medical Blobs */}
                <motion.div
                    animate={{
                        x: [0, 30, 0],
                        y: [0, -40, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-10%] left-[-5%] w-[45rem] h-[45rem] bg-blue-50/60 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{
                        x: [0, -20, 0],
                        y: [0, 50, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute bottom-[-15%] right-[-5%] w-[40rem] h-[40rem] bg-indigo-50/50 rounded-full blur-[100px]"
                />

                {/* Floating Medical Icons - Subtle Accent */}
                <div className="absolute inset-0">
                    <motion.div
                        animate={{ y: [0, -15, 0], opacity: [0.03, 0.07, 0.03] }}
                        transition={{ duration: 6, repeat: Infinity }}
                        className="absolute top-[20%] right-[10%] text-primary-600"
                    >
                        <Activity size={180} strokeWidth={0.5} />
                    </motion.div>
                    <motion.div
                        animate={{ y: [0, 15, 0], opacity: [0.03, 0.07, 0.03] }}
                        transition={{ duration: 8, repeat: Infinity, delay: 1 }}
                        className="absolute bottom-[20%] left-[5%] text-primary-400"
                    >
                        <ShieldCheck size={220} strokeWidth={0.5} />
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-[10px] font-normal uppercase tracking-[0.3em] backdrop-blur-md"
                    >
                        <Zap size={12} className="fill-primary-600" />
                        {t('contact.badge')}
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-6xl font-metabolic font-normal text-primary-950 mb-8 tracking-tighter leading-[1.1]"
                    >
                        {t('contact.title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">{t('contact.titleHighlight')}</span>
                    </motion.h1>

                    <div className="max-w-2xl mx-auto">
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-xl text-gray-500 font-normal leading-relaxed"
                        >
                            {t('contact.description')}
                        </motion.p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                    {/* Contact Channels */}
                    <div className="space-y-8 order-2 lg:order-1">
                        <div className="grid gap-6">
                            <ContactCard
                                icon={<Phone className="w-6 h-6" />}
                                title={t('contact.cards.call.title')}
                                content="+971 55 105 3445"
                                subContent={t('contact.cards.call.sub')}
                                delay={0.2}
                                color="bg-primary-50 text-primary-600"
                                href="tel:+971551053445"
                                isLink={true}
                            />
                            <ContactCard
                                icon={<Mail className="w-6 h-6" />}
                                title={t('contact.cards.email.title')}
                                content="Kneeshoulderhip@gmail.com"
                                subContent={t('contact.cards.email.sub')}
                                delay={0.3}
                                color="bg-indigo-50 text-indigo-600"
                                href="mailto:Kneeshoulderhip@gmail.com"
                                isLink={true}
                            />
                            <ContactCard
                                icon={<MapPin className="w-6 h-6" />}
                                title={t('contact.cards.visit.title')}
                                content={t('contact.cards.visit.content')}
                                subContent={t('contact.cards.visit.sub')}
                                delay={0.4}
                                color="bg-teal-50 text-teal-600"
                            />
                        </div>

                        {/* Social Presence - Unique Redesign */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="bg-white rounded-[3.5rem] p-8 md:p-12 shadow-[0_20px_80px_-20px_rgba(30,58,138,0.05)] border border-gray-100 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50/30 rounded-full blur-[60px] -mr-32 -mt-32 pointer-events-none"></div>
                            
                            <div className="relative z-10 mb-10 text-center md:text-start">
                                <h3 className="text-[10px] font-black text-primary-950 mb-3 uppercase tracking-[0.3em] opacity-80">
                                    {t('contact.cards.social')}
                                </h3>
                                <div className="h-1 w-12 bg-primary-600 rounded-full mb-4 mx-auto md:mx-0"></div>
                                <p className="text-xl font-metabolic font-normal text-slate-800 tracking-tight">Connect with Dr. Ulhas sonar on <br className="hidden md:block" /> your favorite platforms</p>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                                <SocialCard 
                                    href="https://www.youtube.com/@orthopaedictutorials2135" 
                                    icon={<Youtube size={24} />} 
                                    label="YouTube" 
                                    color="hover:bg-[#FF0000]"
                                    delay={0.1}
                                />
                                <SocialCard 
                                    href="https://www.instagram.com/drulhasortho.1/" 
                                    icon={<Instagram size={24} />} 
                                    label="Instagram" 
                                    color="hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888]"
                                    delay={0.2}
                                />
                                <SocialCard 
                                    href="https://x.com/jointsurgeon" 
                                    icon={<Twitter size={24} />} 
                                    label="X" 
                                    color="hover:bg-black"
                                    delay={0.3}
                                />
                                <SocialCard 
                                    href="https://linkedin.com/in/ulhassonarortho" 
                                    icon={<Linkedin size={24} />} 
                                    label="LinkedIn" 
                                    color="hover:bg-[#0077B5]"
                                    delay={0.4}
                                />
                                <SocialCard 
                                    href="https://www.facebook.com/profile.php?id=61585848005137" 
                                    icon={<Facebook size={24} />} 
                                    label="Facebook" 
                                    color="hover:bg-[#1877F2]"
                                    delay={0.5}
                                />
                                <SocialCard 
                                    href="https://www.tiktok.com/@dr.ulhas.orthoped" 
                                    icon={
                                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                                            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.43V16c0 4.13-3.41 7.55-7.61 7.5-4.65-.05-8.1-4.73-6.93-9.18 1.13-4.32 6.1-6.19 9.81-3.51.02 1.83.02 3.67 0 5.5-.06-.06-.11-.13-.17-.19-1.48-1.57-4.17-1.38-5.35.39-1.28 1.92-.12 4.73 2.18 4.73 2.14.02 3.96-1.74 3.96-3.88V.02z"/>
                                        </svg>
                                    } 
                                    label="TikTok" 
                                    color="hover:bg-[#000000]"
                                    delay={0.6}
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* Modern Contact Form */}
                    <motion.div
                        id="contact-form"
                        initial={{ opacity: 0, x: isRtl ? -40 : 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, type: "spring", damping: 20 }}
                        className="bg-white rounded-[4rem] p-10 md:p-14 shadow-[0_40px_120px_-30px_rgba(30,58,138,0.12)] border border-gray-100 relative overflow-hidden group lg:sticky lg:top-32 order-1 lg:order-2"
                    >
                        <div className="absolute top-0 right-0 w-80 h-80 bg-primary-50/40 rounded-full blur-[80px] -mr-40 -mt-40 pointer-events-none group-hover:bg-primary-100/50 transition-colors duration-1000"></div>

                        <div className="relative z-10">
                            <h3 className="text-4xl font-metabolic font-normal text-primary-950 mb-10 tracking-tight">{t('contact.form.title')}</h3>
                            <form
                                className="space-y-6"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    // Simulation of successful submission
                                    window.location.href = '/thank-you';
                                }}
                            >
                                <InputField label={t('contact.form.name')} type="text" placeholder={t('contact.form.namePlaceholder')} required />
                                <InputField label={t('contact.form.phone')} type="tel" placeholder={t('contact.form.phonePlaceholder')} required />

                                <div className="space-y-3">
                                    <label className="block text-[10px] font-normal text-primary-900 uppercase tracking-widest ml-1">{t('contact.form.medicalInquiry')}</label>
                                    <textarea
                                        required
                                        className="w-full px-6 py-5 rounded-[2rem] border border-gray-100 focus:border-primary-400 focus:ring-[6px] focus:ring-primary-50 transition-all outline-none bg-gray-50/50 text-primary-950 placeholder-gray-400 font-medium text-sm h-40 resize-none shadow-inner"
                                        placeholder={t('contact.form.placeholder')}
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full group flex items-center justify-center gap-3 py-6 px-8 bg-primary-600 text-white font-normal text-xs uppercase tracking-[0.25em] rounded-2xl shadow-xl shadow-primary-200 hover:bg-primary-700 hover:shadow-2xl hover:shadow-primary-300 active:scale-95 transition-all duration-300"
                                >
                                    {t('contact.form.submit')}
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Premium Map Experience */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="mt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            >
                <div className="relative rounded-[4rem] overflow-hidden shadow-2xl border-8 border-gray-50/50 h-[30rem] lg:h-[40rem] group">
                    <div className="absolute inset-0 bg-primary-900/5 mix-blend-multiply z-10 pointer-events-none group-hover:opacity-0 transition-opacity duration-1000"></div>
                    <iframe
                        title="Medical Center Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.2612745339667!2d55.3371900150117!3d25.26180998386629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5ccf5777bd37%3A0x60037a5999092b71!2sCanadian%20Specialist%20Hospital!5e0!3m2!1sen!2sae!4v1655976541012!5m2!1sen!2sae"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        className="grayscale-[0.4] group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                    ></iframe>
                </div>
            </motion.div>
        </main>
    );
};

// Refined Helper Components
const ContactCard = ({ icon, title, content, subContent, delay, color, isLink, href }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.6 }}
        className="flex items-center bg-white rounded-[2.5rem] p-7 shadow-[0_10px_40px_-20px_rgba(30,58,138,0.08)] border border-gray-50 hover:shadow-[0_20px_60px_-15px_rgba(30,58,138,0.12)] transition-all duration-500 hover:-translate-y-2 group"
    >
        <div className={`flex-shrink-0 p-5 rounded-[1.8rem] ${color} me-7 shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
            {icon}
        </div>
        <div>
            <h4 className="text-[11px] font-normal text-primary-900 mb-2 uppercase tracking-[0.2em] opacity-50">{title}</h4>
            {isLink ? (
                <a href={href} className="text-xl font-normal text-gray-950 hover:text-primary-600 transition-colors block mb-1">
                    {content}
                </a>
            ) : (
                <p className="text-xl font-normal text-gray-950 mb-1 leading-tight">{content}</p>
            )}
            <p className="text-xs text-gray-400 font-normal tracking-tight">{subContent}</p>
        </div>
    </motion.div>
);

const SocialCard = ({ href, icon, label, color, delay }) => (
    <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className={`group relative flex flex-col items-center justify-center p-6 bg-gray-50/50 border border-gray-100 rounded-[2rem] transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden`}
    >
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${color}`}></div>
        <div className="relative z-10 text-primary-900/60 group-hover:text-white transition-all duration-500 mb-2 scale-110 group-hover:scale-125">
            {icon}
        </div>
        <span className="relative z-10 text-[9px] font-black uppercase tracking-[0.2em] text-primary-950/40 group-hover:text-white/90 transition-colors duration-500">
            {label}
        </span>
    </motion.a>
);

const InputField = ({ label, type, placeholder }) => (
    <div className="space-y-3">
        <label className="block text-[10px] font-normal text-primary-900 uppercase tracking-widest ml-1 leading-none">{label}</label>
        <input
            type={type}
            placeholder={placeholder}
            className="w-full px-6 py-5 rounded-2xl border border-gray-100 focus:border-primary-400 focus:ring-[6px] focus:ring-primary-50 transition-all outline-none bg-gray-50/50 text-primary-950 placeholder-gray-400 font-medium text-sm shadow-inner"
        />
    </div>
);

export default Contact;
