import { Phone, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const FloatingContactButtons = () => {
    const { language } = useLanguage();
    const isRtl = language === 'AR';
    const phoneNumber = "+971585865606"; // Dr. Ulhas's phone number
    const whatsappNumber = "+971585865606"; // WhatsApp number

    return (
        <div className="fixed end-6 bottom-6 z-50 flex flex-col gap-4">
            {/* WhatsApp Button */}
            <motion.a
                href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, x: isRtl ? -100 : 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="group relative w-14 h-14 bg-[#25D366] rounded-full shadow-lg hover:shadow-2xl flex items-center justify-center transition-all duration-300"
            >
                {/* Pulse Animation */}
                <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></span>

                {/* WhatsApp Icon */}
                <MessageCircle className="w-7 h-7 text-white relative z-10" />

                {/* Tooltip */}
                <span className="absolute end-16 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs font-semibold px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                    Chat on WhatsApp
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
                className="group relative w-14 h-14 bg-primary-600 rounded-full shadow-lg hover:shadow-2xl flex items-center justify-center transition-all duration-300"
            >
                {/* Pulse Animation */}
                <span className="absolute inset-0 rounded-full bg-primary-600 animate-ping opacity-20"></span>

                {/* Phone Icon */}
                <Phone className="w-7 h-7 text-white relative z-10" />

                {/* Tooltip */}
                <span className="absolute end-16 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs font-semibold px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                    Call Now
                </span>
            </motion.a>
        </div>
    );
};

export default FloatingContactButtons;
