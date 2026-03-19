import logo from '../assets/logo.png';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
    const { t } = useLanguage();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-primary-950 text-white pt-24 pb-12 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 start-0 w-full h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Visit Me At Section */}
                <div className="flex flex-col items-center mb-20">
                    <h3 className="text-white text-2xl font-montserrat font-black mb-8 tracking-tight">
                        {t('footer.visitMeAt')}
                    </h3>
                    <div className="bg-white rounded-[2rem] p-6 md:p-8 flex items-center gap-6 shadow-2xl max-w-xl w-full">
                        <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 relative">
                            {/* Shield Icon Representation */}
                            <div className="absolute inset-0 bg-[#c41e3a] rounded-xl flex items-center justify-center overflow-hidden">
                                <div className="absolute inset-1 border-2 border-white/20 rounded-lg"></div>
                                <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm0 16.91c-3.11-.94-5.5-4.47-5.5-8V6.44l5.5-2.06 5.5 2.06v2.41c0 3.53-2.39 7.06-5.5 8z"/>
                                    <path d="M12 7l1.5 3h3l-2.5 2 1 3-3-2-3 2 1-3-2.5-1h3.1z" />
                                </svg>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[#0a1e3b] text-lg md:text-xl font-black font-montserrat tracking-tight leading-tight mb-1">
                                المستشفى الكندي التخصصي
                            </span>
                            <span className="text-[#0a1e3b] text-base md:text-lg font-bold font-montserrat tracking-tight leading-tight opacity-90">
                                Canadian Specialist Hospital
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
                    <div className="col-span-1">
                        <div className="flex flex-col mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <img src={logo} alt="Dr. Ulhas Sonar" className="h-12 w-auto brightness-0 invert opacity-90" />
                                <div className="flex flex-col">
                                    <span className="text-xl font-montserrat font-black tracking-tighter uppercase text-white leading-none">
                                        {t('common.doctorName')}
                                    </span>
                                    <span className="text-blue-400 text-[9px] font-montserrat font-black uppercase tracking-[0.2em] mt-1">
                                        {t('common.specialty')}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed font-medium max-w-xs">
                            {t('footer.desc')}
                        </p>
                    </div>

                    <div>
                        <h4 className="text-xs font-montserrat font-black uppercase tracking-[0.3em] mb-8 text-blue-400">{t('footer.nav')}</h4>
                        <ul className="space-y-4 text-sm font-bold">
                            <li><a href="#home" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"><span className="w-0 group-hover:w-4 h-0.5 bg-blue-500 me-0 group-hover:me-2 transition-all"></span>{t('nav.home')}</a></li>
                            <li><a href="#about" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"><span className="w-0 group-hover:w-4 h-0.5 bg-blue-500 me-0 group-hover:me-2 transition-all"></span>{t('nav.about')}</a></li>
                            <li><a href="#services" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"><span className="w-0 group-hover:w-4 h-0.5 bg-blue-500 me-0 group-hover:me-2 transition-all"></span>{t('nav.services')}</a></li>
                            <li><a href="#testimonials" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"><span className="w-0 group-hover:w-4 h-0.5 bg-blue-500 me-0 group-hover:me-2 transition-all"></span>{t('nav.testimonials') || 'Testimonials'}</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-montserrat font-black uppercase tracking-[0.3em] mb-8 text-blue-400">{t('footer.support')}</h4>
                        <ul className="space-y-4 text-sm font-bold">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"><span className="w-0 group-hover:w-4 h-0.5 bg-blue-500 me-0 group-hover:me-2 transition-all"></span>{t('footer.patientResources')}</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"><span className="w-0 group-hover:w-4 h-0.5 bg-blue-500 me-0 group-hover:me-2 transition-all"></span>{t('footer.articles')}</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"><span className="w-0 group-hover:w-4 h-0.5 bg-blue-500 me-0 group-hover:me-2 transition-all"></span>{t('nav.faq')}</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"><span className="w-0 group-hover:w-4 h-0.5 bg-blue-500 me-0 group-hover:me-2 transition-all"></span>{t('footer.privacy')}</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-montserrat font-black uppercase tracking-[0.3em] mb-8 text-blue-400">{t('footer.clinic')}</h4>
                        <ul className="space-y-6 text-sm font-bold">
                            <li className="flex gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-blue-400 flex-shrink-0">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                </div>
                                <span className="text-gray-300">Canadian Specialist Hospital, Dubai, UAE</span>
                            </li>
                            <li className="flex gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-blue-400 flex-shrink-0">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <span className="text-gray-300">+971 55 105 3445</span>
                                    <span className="text-gray-500 text-[10px] font-medium tracking-wide mt-0.5">Visit me at Canadian Specialist Hospital</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 mb-8 p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <p className="text-gray-400 text-[11px] leading-relaxed font-medium">
                        {t('footer.disclaimer')}
                    </p>
                </div>

                <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-gray-500 text-xs font-montserrat font-bold uppercase tracking-widest leading-none">&copy; {currentYear} {t('common.doctorName')}. {t('footer.rights')}</p>
                    <div className="flex gap-8 font-montserrat font-black">
                        {['FB', 'TW', 'IG', 'LI'].map(social => (
                            <a key={social} href="#" className="text-gray-600 hover:text-white text-[10px] font-black tracking-widest transition-colors">{social}</a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Decorative background circle */}
            <div className="absolute -bottom-40 -start-40 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]"></div>
        </footer>
    );
};

export default Footer;
