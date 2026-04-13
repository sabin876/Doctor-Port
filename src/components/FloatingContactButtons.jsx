import { motion } from 'framer-motion';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const FloatingContactButtons = () => {
    const { language, t } = useLanguage();
    const navigate = useNavigate();
    const isRtl = language === 'AR';
    const phoneNumber = "+971551053445";
    const whatsappNumber = "+971551053445";

    const handleBookingClick = (e) => {
        e.preventDefault();
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            navigate('/contact');
        }
    };

    return (
        <div className="fixed end-4 bottom-4 md:end-6 md:bottom-6 z-50 flex flex-col gap-3 md:gap-4">
            {/* WhatsApp Button */}
            <motion.a
                href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20Dr.%20Ulhas,%20I%20would%20like%20to%20book%20an%20orthopedic%20consultation.`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, x: isRtl ? -100 : 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="group relative w-12 h-12 md:w-14 md:h-14 bg-[#25D366] rounded-full shadow-lg hover:shadow-2xl flex items-center justify-center transition-all duration-300"
            >
                <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></span>
                <MessageCircle className="w-7 h-7 text-white relative z-10" />
                <span className={`absolute ${isRtl ? 'start-16' : 'end-16'} top-1/2 -translate-y-1/2 bg-gray-900 text-white text-[10px] font-bold px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none uppercase tracking-widest`}>
                    WhatsApp
                </span>
            </motion.a>

            {/* Book Appointment Button */}
            <motion.a
                href="/contact"
                onClick={handleBookingClick}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, x: isRtl ? -100 : 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="group relative w-12 h-12 md:w-14 md:h-14 bg-indigo-600 rounded-full shadow-lg hover:shadow-2xl flex items-center justify-center transition-all duration-300"
            >
                <span className="absolute inset-0 rounded-full bg-indigo-600 animate-pulse opacity-20"></span>
                <Calendar className="w-6 h-6 text-white relative z-10" />
                <span className={`absolute ${isRtl ? 'start-16' : 'end-16'} top-1/2 -translate-y-1/2 bg-gray-900 text-white text-[10px] font-bold px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none uppercase tracking-widest`}>
                    Book Now
                </span>
            </motion.a>

            {/* Phone Call Button */}
            <motion.a
                href={`tel:${phoneNumber}`}
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, x: isRtl ? -100 : 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="group relative w-12 h-12 md:w-14 md:h-14 bg-primary-600 rounded-full shadow-lg hover:shadow-2xl flex items-center justify-center transition-all duration-300"
            >
                <span className="absolute inset-0 rounded-full bg-primary-600 animate-ping opacity-20"></span>
                <Phone className="w-6 h-6 text-white relative z-10" />
                <span className={`absolute ${isRtl ? 'start-16' : 'end-16'} top-1/2 -translate-y-1/2 bg-gray-900 text-white text-[10px] font-bold px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none uppercase tracking-widest`}>
                    Call Now
                </span>
            </motion.a>
        </div>
    );
};

export default FloatingContactButtons;
