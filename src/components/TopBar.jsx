import { Mail, Phone, MapPin, Linkedin, Youtube, Instagram, Facebook, Twitter } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const TopBar = () => {
    const { t } = useLanguage();
    return (
        <div className="bg-[#1282b2] text-white py-2 px-4 sm:px-6 lg:px-8 relative z-[60] border-b border-white/10 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between text-[11px] font-montserrat font-bold uppercase tracking-wider">

                {/* Contact Info & Address */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6 opacity-95 w-full md:w-auto text-center md:text-left">
                    <a href="tel:+971551053445" className="flex items-center gap-1.5 hover:text-white/80 transition-colors">
                        <Phone className="w-3.5 h-3.5" />
                        <span className="whitespace-nowrap">{t('topBar.phone')}: +971 55 105 3445</span>
                    </a>

                    <a href="mailto:Kneeshoulderhip@gmail.com" className="hidden lg:flex items-center gap-1.5 hover:text-white/80 transition-colors">
                        <Mail className="w-3.5 h-3.5" />
                        <span>{t('topBar.email')}: Kneeshoulderhip@gmail.com</span>
                    </a>

                    <div className="hidden sm:flex items-center gap-1.5 font-montserrat">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="line-clamp-1">{t('topBar.location')}: {t('topBar.locationValue')}</span>
                    </div>
                </div>

                {/* Social Icons */}
                <div className="hidden md:flex items-center gap-4 ps-6 border-s border-white/10 ms-6">
                    <a href="https://www.youtube.com/@orthopaedictutorials2135" target="_blank" rel="noreferrer" className="hover:text-white/80 transition-colors">
                        <Youtube className="w-4 h-4" />
                    </a>
                    <a href="https://linkedin.com/in/ulhassonarortho" target="_blank" rel="noreferrer" className="hover:text-white/80 transition-colors">
                        <Linkedin className="w-4 h-4" />
                    </a>
                    <a href="https://x.com/jointsurgeon" target="_blank" rel="noreferrer" className="hover:text-white/80 transition-colors">
                        <Twitter className="w-4 h-4" />
                    </a>
                    <a href="https://www.instagram.com/drulhasortho.1/" target="_blank" rel="noreferrer" className="hover:text-white/80 transition-colors">
                        <Instagram className="w-4 h-4" />
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=61585848005137" target="_blank" rel="noreferrer" className="hover:text-white/80 transition-colors">
                        <Facebook className="w-4 h-4" />
                    </a>
                    <a href="https://www.tiktok.com/@dr.ulhas.orthoped" target="_blank" rel="noreferrer" className="hover:text-white/80 transition-colors">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.43V16c0 4.13-3.41 7.55-7.61 7.5-4.65-.05-8.1-4.73-6.93-9.18 1.13-4.32 6.1-6.19 9.81-3.51.02 1.83.02 3.67 0 5.5-.06-.06-.11-.13-.17-.19-1.48-1.57-4.17-1.38-5.35.39-1.28 1.92-.12 4.73 2.18 4.73 2.14.02 3.96-1.74 3.96-3.88V.02z"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
