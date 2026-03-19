import { Mail, Phone, MapPin, Facebook, Linkedin, Instagram } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const TopBar = () => {
    const { t } = useLanguage();
    return (
        <div className="bg-[#1282b2] text-white py-2 px-4 sm:px-6 lg:px-8 relative z-[60] border-b border-white/10 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between text-[11px] font-montserrat font-bold uppercase tracking-wider">

                {/* Contact Info & Address */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6 opacity-95 w-full md:w-auto text-center md:text-left">
                    <a href="tel:+971547033311" className="flex items-center gap-1.5 hover:text-white/80 transition-colors">
                        <Phone className="w-3.5 h-3.5" />
                        <span className="whitespace-nowrap">{t('topBar.phone')}: +971 54 703 3311</span>
                    </a>

                    <a href="mailto:info@corx.ae" className="hidden lg:flex items-center gap-1.5 hover:text-white/80 transition-colors">
                        <Mail className="w-3.5 h-3.5" />
                        <span>{t('topBar.email')}: info@corx.ae</span>
                    </a>

                    <div className="hidden sm:flex items-center gap-1.5 font-montserrat">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="line-clamp-1">{t('topBar.location')}: {t('topBar.locationValue')}</span>
                    </div>
                </div>

                {/* Social Icons */}
                <div className="hidden md:flex items-center gap-4 ps-6 border-s border-white/10 ms-6">
                    <a href="#" className="hover:text-white/80 transition-colors">
                        <Facebook className="w-4 h-4" />
                    </a>
                    <a href="#" className="hover:text-white/80 transition-colors">
                        <Linkedin className="w-4 h-4" />
                    </a>
                    <a href="#" className="hover:text-white/80 transition-colors">
                        <Instagram className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
