import React from 'react';
import { Mail, Phone, MapPin, Facebook, Linkedin, Instagram } from 'lucide-react';

const TopBar = () => {
    return (
        <div className="bg-[#1282b2] text-white py-2 px-4 sm:px-6 lg:px-8 relative z-[60] border-b border-white/10 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between text-[11px] font-montserrat font-bold uppercase tracking-wider">

                {/* Contact Info & Address */}
                <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 opacity-95">
                    <a href="tel:+971547033311" className="flex items-center gap-1.5 hover:text-white/80 transition-colors">
                        <Phone className="w-3.5 h-3.5" />
                        <span>+971 54 703 3311</span>
                    </a>

                    <span className="hidden md:inline text-white/40">|</span>

                    <a href="mailto:info@corx.ae" className="flex items-center gap-1.5 hover:text-white/80 transition-colors">
                        <Mail className="w-3.5 h-3.5" />
                        <span>info@corx.ae</span>
                    </a>

                    <span className="hidden md:inline text-white/40">|</span>

                    <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Office 303, Royal Class Building, DIP, Dubai, United Arab Emirates</span>
                    </div>
                </div>

                {/* Social Icons */}
                <div className="flex items-center gap-4 pl-0 md:pl-6">
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
