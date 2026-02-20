import { CardContainer, CardBody, CardItem } from './ui/3d-card';
import { useLanguage } from '../context/LanguageContext';
import doctorImg from '../assets/hero-slide-1.png'; // Reverted to previous photo
import slide1 from '../assets/hero-bg-1.jpg';
import slide2 from '../assets/hero-bg-2.jpg';
import slide3 from '../assets/hero-bg-3.jpg';

const Hero = () => {
    const { language } = useLanguage();
    const isRtl = language === 'AR';
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const slides = [slide1, slide2, slide3];

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div id="home" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">

            {/* Slideshow Background */}
            <div className="absolute inset-0 z-0 overflow-hidden bg-black">
                <div className="absolute inset-0 bg-black/60 z-10" /> {/* Dark overlay */}
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentSlide}
                        src={slides[currentSlide]}
                        alt="Background"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </AnimatePresence>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className={`text-center lg:text-start ${isRtl ? 'lg:text-right' : 'lg:text-left'}`}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-bold mb-8 shadow-glass"
                        >
                            <span className="w-2.5 h-2.5 rounded-full bg-blue-400 me-3 animate-pulse shadow-[0_0_10px_rgba(96,165,250,0.8)]"></span>
                            Leading Orthopedic Specialist in Dubai
                        </motion.div>

                        <h1 className="text-6xl md:text-7xl lg:text-[100px] font-montserrat font-extrabold text-white leading-[1.05] mb-8 tracking-tighter">
                            Move Without <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-white animate-shimmer bg-[length:200%_auto]">
                                Limits
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-blue-50/90 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
                            Advanced Joint Replacement & Sports Medicine. Precision care designed for your swift recovery and long-term joint health.
                        </p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className={`flex flex-col sm:flex-row gap-6 justify-center ${isRtl ? 'lg:justify-end' : 'lg:justify-start'}`}
                        >
                            <a
                                href="https://csh.ae/find-a-doctor?name=ulhas"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative flex items-center justify-center px-10 py-5 bg-white text-primary-900 rounded-2xl font-black text-lg transition-all hover:scale-105 hover:shadow-[0_20px_40px_-10px_rgba(255,255,255,0.3)] active:scale-95 overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center">
                                    Book Consult <Calendar className="ms-3 w-6 h-6 group-hover:rotate-12 transition-transform" />
                                </span>
                            </a>
                            <Link
                                to="services"
                                smooth={true}
                                offset={-70}
                                className="flex items-center justify-center px-10 py-5 bg-blue-600/20 backdrop-blur-xl text-white border-2 border-white/30 rounded-2xl font-black text-lg transition-all hover:bg-blue-600/40 hover:border-white/60 hover:scale-105 cursor-pointer"
                            >
                                Explorer Services
                                <ChevronRight className="ms-2 w-6 h-6" />
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className={`mt-16 flex flex-wrap items-center justify-center gap-12 ${isRtl ? 'lg:justify-end' : 'lg:justify-start'}`}
                        >
                            <div className="flex flex-col">
                                <span className="text-4xl font-extrabold text-white tracking-tight">14+</span>
                                <span className="text-xs text-blue-300 uppercase tracking-[0.2em] font-semibold">Years Expert</span>
                            </div>
                            <div className="w-px h-12 bg-white/20 hidden sm:block"></div>
                            <div className="flex flex-col">
                                <span className="text-4xl font-extrabold text-white tracking-tight">5K+</span>
                                <span className="text-xs text-blue-300 uppercase tracking-[0.2em] font-semibold">Success Ops</span>
                            </div>
                            <div className="w-px h-12 bg-white/20 hidden sm:block"></div>
                            <div className="flex flex-col">
                                <span className="text-4xl font-extrabold text-white tracking-tight">5.0</span>
                                <span className="text-xs text-blue-300 uppercase tracking-[0.2em] font-semibold">Patient Score</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative flex justify-center items-center"
                    >
                        <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-[120px] animate-pulse"></div>
                        <CardContainer className="inter-var">
                            <CardBody className="bg-transparent relative group/card w-auto sm:w-[32rem] h-auto rounded-3xl p-4">
                                <CardItem
                                    translateZ="100"
                                    className="w-full"
                                >
                                    <div className="relative rounded-[2.5rem] overflow-hidden border-4 border-white/10 shadow-2xl bg-gradient-to-b from-blue-500/10 to-transparent p-2">
                                        <img
                                            src={doctorImg}
                                            alt="Dr. Ulhas Sonar"
                                            className="w-full h-full object-cover rounded-[2rem] hover:scale-110 transition-transform duration-1000"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                                        <div className="absolute bottom-10 start-10 text-white">
                                            <p className="font-extrabold text-4xl tracking-tight leading-none">Dr. Ulhas Sonar</p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <div className="h-0.5 w-8 bg-blue-400"></div>
                                                <p className="text-blue-300 font-bold tracking-widest text-xs uppercase">Surgery Expert</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardItem>

                                <CardItem
                                    translateZ="150"
                                    rotateX={15}
                                    rotateZ={-5}
                                    className="absolute -top-6 -end-6 rounded-2xl bg-white p-6 shadow-premium hidden md:block animate-float"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center text-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="m9 12 2 2 4-4" /></svg>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Global Trust</p>
                                            <p className="text-2xl font-black text-primary-900 leading-tight">99.8%</p>
                                        </div>
                                    </div>
                                </CardItem>

                                <CardItem
                                    translateZ="120"
                                    rotateX={-10}
                                    className="absolute -bottom-4 -start-6 rounded-2xl bg-primary-900/40 backdrop-blur-xl border border-white/10 p-5 shadow-2xl hidden md:block"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="flex -space-x-3">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="w-8 h-8 rounded-full border-2 border-primary-900 bg-gray-200 overflow-hidden">
                                                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Patient" />
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-white text-xs font-bold font-sans">
                                            Trusted by <span className="text-blue-300">5,000+</span> <br /> Patients in UAE
                                        </p>
                                    </div>
                                </CardItem>
                            </CardBody>
                        </CardContainer>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default Hero;
