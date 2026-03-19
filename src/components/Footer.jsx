import logo from '../assets/logo.png';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, ChevronRight } from 'lucide-react';

const Footer = () => {
    const { t } = useLanguage();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#040f25] text-white pt-24 pb-12 relative overflow-hidden border-t-[6px] border-primary-600">
            {/* Background Decorations */}
            <div className="absolute top-0 start-0 w-full h-[600px] bg-gradient-to-br from-primary-900/10 via-transparent to-transparent pointer-events-none"></div>
            <div className="absolute -bottom-40 -start-40 w-96 h-96 bg-primary-600/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute top-20 -end-40 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Visit Me At Section */}
                <div className="flex flex-col items-center mb-24 relative z-20">
                    <h3 className="text-[13px] font-montserrat font-black uppercase tracking-[0.2em] mb-8 text-white relative inline-block">
                        {t('footer.visitMeAt')}
                        <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary-600 rounded-full"></span>
                    </h3>
                    <a href="https://csh.ae/" target="_blank" rel="noreferrer" className="group flex items-center gap-4 bg-white/95 hover:bg-white p-4 pr-10 rounded-2xl shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-primary-500/20">
                        {/* Custom CSS representation of the Canadian Specialist Hospital logo */}
                        <div className="relative w-16 h-16 bg-[#162758] rounded-[5px] border-2 border-[#d32f2f] flex justify-center flex-shrink-0">
                            <svg className="absolute top-1 w-10 h-10 text-white fill-current" viewBox="0 0 24 24">
                                <path d="M12 1.5L14 8h5l-4.5 4L16 19l-4-3-4 3 1.5-7L5 8h5l2-6.5z"/>
                                <path className="fill-[#162758]" d="M11.5 13h1v8h-1v-8z"/>
                            </svg>
                            <div className="absolute bottom-1 w-full flex justify-between px-2.5">
                                <span className="text-white text-[8px] font-black leading-none">C</span>
                                <span className="text-white text-[8px] font-black leading-none">S</span>
                                <span className="text-white text-[8px] font-black leading-none">H</span>
                            </div>
                        </div>
                        <div className="flex flex-col border-l-2 border-gray-200 pl-4 py-1">
                            <span className="text-[#162758] text-[20px] font-black font-montserrat tracking-tight leading-none mb-1 text-right" dir="rtl">
                                المستشفى الكندي التخصصي
                            </span>
                            <span className="text-[#162758] text-[16px] font-bold font-montserrat tracking-tight leading-none">
                                Canadian Specialist Hospital
                            </span>
                        </div>
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
                    {/* Brand Column */}
                    <div className="lg:col-span-4 flex flex-col pt-2">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="bg-white/5 p-3 rounded-2xl border border-white/10 shadow-lg backdrop-blur-sm">
                                <img src={logo} alt="Dr. Ulhas Sonar" className="h-10 w-auto brightness-0 invert opacity-90" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl md:text-2xl font-montserrat font-black tracking-tight text-white leading-none">
                                    {t('common.doctorName')}
                                </span>
                                <span className="text-primary-400 text-[10px] font-montserrat font-bold uppercase tracking-[0.2em] mt-1.5 opacity-90">
                                    {t('common.specialty')}
                                </span>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-loose font-medium max-w-sm mb-8">
                            {t('footer.desc')}
                        </p>
                        
                        {/* Social Links */}
                        <div className="flex gap-4">
                            {[
                                { Icon: Facebook, label: 'Facebook' },
                                { Icon: Twitter, label: 'Twitter' },
                                { Icon: Instagram, label: 'Instagram' },
                                { Icon: Linkedin, label: 'LinkedIn' }
                            ].map((social, index) => (
                                <a 
                                    key={index} 
                                    href="#" 
                                    aria-label={social.label}
                                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white hover:border-primary-500 hover:-translate-y-1 transition-all duration-300 shadow-sm"
                                >
                                    <social.Icon size={18} strokeWidth={2} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links Column */}
                    <div className="lg:col-span-2 lg:col-start-6">
                        <h4 className="text-[13px] font-montserrat font-black uppercase tracking-[0.2em] mb-8 text-white relative inline-block">
                            {t('footer.nav')}
                            <span className="absolute -bottom-3 left-0 w-8 h-1 bg-primary-600 rounded-full"></span>
                        </h4>
                        <ul className="space-y-4 text-[15px] font-medium mt-4">
                            {[
                                { name: t('nav.home'), href: '#home' },
                                { name: t('nav.about'), href: '#about' },
                                { name: t('nav.services'), href: '#services' },
                                { name: t('nav.testimonials') || 'Testimonials', href: '#testimonials' }
                            ].map((link, idx) => (
                                <li key={idx}>
                                    <a href={link.href} className="text-gray-400 hover:text-primary-400 transition-colors duration-300 flex items-center group">
                                        <ChevronRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 text-primary-500 transition-all duration-300 mr-2" />
                                        <span>{link.name}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links Column */}
                    <div className="lg:col-span-2">
                        <h4 className="text-[13px] font-montserrat font-black uppercase tracking-[0.2em] mb-8 text-white relative inline-block">
                            {t('footer.support')}
                            <span className="absolute -bottom-3 left-0 w-8 h-1 bg-primary-600 rounded-full"></span>
                        </h4>
                        <ul className="space-y-4 text-[15px] font-medium mt-4">
                            {[
                                t('footer.patientResources'),
                                t('footer.articles'),
                                t('nav.faq'),
                                t('footer.privacy')
                            ].map((item, idx) => (
                                <li key={idx}>
                                    <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-300 flex items-center group">
                                        <ChevronRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 text-primary-500 transition-all duration-300 mr-2" />
                                        <span>{item}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info Column */}
                    <div className="lg:col-span-3">
                        <h4 className="text-[13px] font-montserrat font-black uppercase tracking-[0.2em] mb-8 text-white relative inline-block">
                            {t('footer.clinic')}
                            <span className="absolute -bottom-3 left-0 w-8 h-1 bg-primary-600 rounded-full"></span>
                        </h4>
                        <ul className="space-y-6 mt-4">
                            <li className="flex gap-4 group cursor-pointer">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-primary-600/20 group-hover:border-primary-500/30 flex items-center justify-center text-primary-400 group-hover:text-primary-300 transition-all duration-300 flex-shrink-0">
                                    <MapPin size={22} strokeWidth={1.5} />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <span className="text-gray-300 text-sm font-medium leading-relaxed group-hover:text-white transition-colors duration-300">
                                        Canadian Specialist Hospital<br/>Dubai, UAE
                                    </span>
                                </div>
                            </li>
                            <li className="flex gap-4 group cursor-pointer">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-primary-600/20 group-hover:border-primary-500/30 flex items-center justify-center text-primary-400 group-hover:text-primary-300 transition-all duration-300 flex-shrink-0">
                                    <Phone size={22} strokeWidth={1.5} />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <span className="text-white font-bold tracking-wide">+971 55 105 3445</span>
                                    <span className="text-gray-500 text-[11px] font-medium uppercase tracking-wider mt-1">24/7 Emergency</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-gray-500 text-[12px] font-montserrat font-semibold uppercase tracking-[0.15em]">
                        &copy; {currentYear} <span className="text-gray-400">{t('common.doctorName')}</span>. {t('footer.rights')}
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-600 text-[10px] font-montserrat font-bold uppercase tracking-widest">Designed for Excellence</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
