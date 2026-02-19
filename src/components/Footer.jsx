import logo from '../assets/logo.png';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-primary-950 text-white pt-24 pb-12 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 start-0 w-full h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
                    <div className="col-span-1">
                        <div className="flex flex-col mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <img src={logo} alt="Dr. Ulhas Sonar" className="h-12 w-auto brightness-0 invert opacity-90" />
                                <div className="flex flex-col">
                                    <span className="text-xl font-montserrat font-black tracking-tighter uppercase text-white leading-none">
                                        Dr. Ulhas Sonar
                                    </span>
                                    <span className="text-blue-400 text-[9px] font-montserrat font-black uppercase tracking-[0.2em] mt-1">
                                        Orthopedic Surgeon
                                    </span>
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed font-medium max-w-xs">
                            Dedicated to restoring your active life through advanced surgical precision and compassionate care in the heart of Dubai.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-xs font-montserrat font-black uppercase tracking-[0.3em] mb-8 text-blue-400">Navigation</h4>
                        <ul className="space-y-4 text-sm font-bold">
                            <li><a href="#home" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"><span className="w-0 group-hover:w-4 h-0.5 bg-blue-500 me-0 group-hover:me-2 transition-all"></span>Home</a></li>
                            <li><a href="#about" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"><span className="w-0 group-hover:w-4 h-0.5 bg-blue-500 me-0 group-hover:me-2 transition-all"></span>About</a></li>
                            <li><a href="#services" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"><span className="w-0 group-hover:w-4 h-0.5 bg-blue-500 me-0 group-hover:me-2 transition-all"></span>Services</a></li>
                            <li><a href="#testimonials" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"><span className="w-0 group-hover:w-4 h-0.5 bg-blue-500 me-0 group-hover:me-2 transition-all"></span>Testimonials</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-montserrat font-black uppercase tracking-[0.3em] mb-8 text-blue-400">Support</h4>
                        <ul className="space-y-4 text-sm font-bold">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"><span className="w-0 group-hover:w-4 h-0.5 bg-blue-500 me-0 group-hover:me-2 transition-all"></span>Patient Resources</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"><span className="w-0 group-hover:w-4 h-0.5 bg-blue-500 me-0 group-hover:me-2 transition-all"></span>Articles</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"><span className="w-0 group-hover:w-4 h-0.5 bg-blue-500 me-0 group-hover:me-2 transition-all"></span>FAQ</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"><span className="w-0 group-hover:w-4 h-0.5 bg-blue-500 me-0 group-hover:me-2 transition-all"></span>Privacy</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-montserrat font-black uppercase tracking-[0.3em] mb-8 text-blue-400">Clinic Info</h4>
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
                                <span className="text-gray-300">+971 55 105 3445</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-gray-500 text-xs font-montserrat font-bold uppercase tracking-widest leading-none">&copy; {currentYear} Dr. Ulhas Sonar. Crafted for Precision.</p>
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
