import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { X, ZoomIn, Images, Award, Users, Microscope, ChevronLeft, ChevronRight } from 'lucide-react';
import SEO from './SEO';

import surgerImg from '../assets/gallery-surgery-room.webp';
import consultImg from '../assets/gallery-consultation.webp';
import awardsImg from '../assets/gallery-awards.webp';
import confImg from '../assets/gallery-conference.webp';
import heroSlide1 from '../assets/hero-slide-1.webp';
import heroSlide2 from '../assets/hero-slide-2.webp';
import kneeArthro from '../assets/knee-arthroscopy.webp';
import doctorProfile from '../assets/doctor-profile.webp';

const galleryItems = [
    {
        id: 1,
        src: surgerImg,
        category: 'Clinic',
        title: 'State-of-the-Art Operating Theatre',
        desc: 'Advanced surgical suite equipped with robotic-assisted systems for precision orthopedic procedures.',
        span: 'col-span-2 row-span-2',
    },
    {
        id: 2,
        src: consultImg,
        category: 'Consultation',
        title: 'Patient Consultation',
        desc: 'Dr. Ulhas Sonar reviewing imaging with a patient to discuss the best treatment pathway.',
        span: 'col-span-1 row-span-1',
    },
    {
        id: 3,
        src: heroSlide1,
        category: 'Surgery',
        title: 'Joint Replacement Surgery',
        desc: 'Total knee replacement procedure delivering precision outcomes and faster recovery.',
        span: 'col-span-1 row-span-1',
    },
    {
        id: 4,
        src: awardsImg,
        category: 'Awards',
        title: 'Excellence in Orthopedic Surgery',
        desc: 'Recognised for outstanding contributions to orthopedic care and surgical innovation.',
        span: 'col-span-1 row-span-2',
    },
    {
        id: 5,
        src: kneeArthro,
        category: 'Surgery',
        title: 'Knee Arthroscopy',
        desc: 'Minimally invasive knee arthroscopy restoring joint function and mobility.',
        span: 'col-span-1 row-span-1',
    },
    {
        id: 6,
        src: confImg,
        category: 'Conference',
        title: 'International Orthopedic Conference',
        desc: 'Presenting cutting-edge research on TKR alignment concepts to an international audience.',
        span: 'col-span-1 row-span-1',
    },
    {
        id: 7,
        src: heroSlide2,
        category: 'Clinic',
        title: 'Modern Clinic Facilities',
        desc: 'World-class outpatient facilities designed for patient comfort and clinical excellence.',
        span: 'col-span-1 row-span-1',
    },
    {
        id: 8,
        src: doctorProfile,
        category: 'About',
        title: 'Dr. Ulhas Sonar',
        desc: 'British-Indian orthopedic surgeon with 15+ years of global experience in joint replacement and sports medicine.',
        span: 'col-span-1 row-span-1',
    },
];

const categories = ['All', 'Clinic', 'Surgery', 'Consultation', 'Awards', 'Conference', 'About'];

const categoryIcons = {
    All: Images,
    Clinic: Microscope,
    Surgery: Microscope,
    Consultation: Users,
    Awards: Award,
    Conference: Users,
    About: Users,
};

const Gallery = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [lightbox, setLightbox] = useState(null); // index in filtered list
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

    const filtered =
        activeCategory === 'All'
            ? galleryItems
            : galleryItems.filter((g) => g.category === activeCategory);

    const openLightbox = (idx) => setLightbox(idx);
    const closeLightbox = () => setLightbox(null);
    const prevImage = () => setLightbox((prev) => (prev - 1 + filtered.length) % filtered.length);
    const nextImage = () => setLightbox((prev) => (prev + 1) % filtered.length);

    return (
        <main
            ref={sectionRef}
            className="min-h-screen py-24 relative overflow-hidden"
            style={{
                background: 'linear-gradient(160deg, #f8faff 0%, #eef2ff 50%, #f0f9ff 100%)',
            }}
        >
            <SEO
                title="Photo Gallery | Dr. Ulhas Sonar"
                description="Explore Dr. Ulhas' gallery featuring state-of-the-art clinic facilities, joint replacement surgeries, awards, and conferences."
                url="/gallery"
            />
            {/* Decorative blobs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-200/30 rounded-full blur-[120px] pointer-events-none translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 bg-blue-50 border border-blue-100"
                    >
                        <Images className="w-4 h-4 text-blue-600" />
                        <span className="text-blue-600 text-xs font-bold uppercase tracking-[0.18em]">
                            Photo Gallery
                        </span>
                    </motion.div>

                    <h1 className="text-5xl md:text-6xl font-extrabold font-montserrat text-gray-900 mb-5 tracking-tight">
                        Our{' '}
                        <span
                            style={{
                                background: 'linear-gradient(90deg, #2563eb, #7c3aed)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            Gallery
                        </span>
                    </h1>

                    <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
                        A visual journey through Dr. Ulhas Sonar's world-class facilities,
                        procedures, and milestones in orthopedic excellence.
                    </p>
                </motion.div>

                {/* Category Filters */}
                <motion.div
                    className="flex flex-wrap justify-center gap-3 mb-14"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {categories.map((cat) => {
                        const Icon = categoryIcons[cat];
                        const isActive = cat === activeCategory;
                        return (
                            <motion.button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.97 }}
                                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${isActive
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-200'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600'
                                    }`}
                            >
                                <Icon className="w-3.5 h-3.5" />
                                {cat}
                            </motion.button>
                        );
                    })}
                </motion.div>

                {/* Masonry Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[220px] gap-4"
                >
                    <AnimatePresence mode="popLayout">
                        {filtered.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.85 }}
                                transition={{ duration: 0.4, delay: idx * 0.06 }}
                                onClick={() => openLightbox(idx)}
                                className={`relative group overflow-hidden rounded-2xl cursor-pointer shadow-md hover:shadow-2xl transition-shadow duration-500 ${item.span}`}
                            >
                                {/* Image */}
                                <img
                                    src={item.src}
                                    alt={item.title}
                                    loading="lazy"
                                    decoding="async"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400" />

                                {/* Zoom icon */}
                                <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 shadow-lg">
                                    <ZoomIn className="w-4 h-4 text-gray-800" />
                                </div>

                                {/* Category pill */}
                                <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="px-2.5 py-1 rounded-full bg-blue-600/90 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                                        {item.category}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
                                    <h3 className="text-white font-bold text-sm leading-snug mb-1">{item.title}</h3>
                                    <p className="text-white/70 text-xs leading-relaxed line-clamp-2">{item.desc}</p>
                                </div>

                                {/* Shine sweep */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {lightbox !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center"
                        style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(12px)' }}
                        onClick={closeLightbox}
                    >
                        {/* Close */}
                        <button
                            onClick={closeLightbox}
                            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Prev */}
                        <button
                            onClick={(e) => { e.stopPropagation(); prevImage(); }}
                            className="absolute left-4 sm:left-8 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>

                        {/* Next */}
                        <button
                            onClick={(e) => { e.stopPropagation(); nextImage(); }}
                            className="absolute right-4 sm:right-8 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>

                        {/* Image & Info */}
                        <motion.div
                            key={lightbox}
                            initial={{ opacity: 0, scale: 0.92 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.92 }}
                            transition={{ duration: 0.3 }}
                            className="max-w-5xl w-full mx-16 flex flex-col items-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={filtered[lightbox].src}
                                alt={filtered[lightbox].title}
                                className="max-h-[70vh] w-auto max-w-full rounded-2xl shadow-2xl object-contain"
                            />
                            <div className="mt-5 text-center">
                                <span className="inline-block px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold uppercase tracking-wider mb-3">
                                    {filtered[lightbox].category}
                                </span>
                                <h3 className="text-white text-xl font-bold mb-2">{filtered[lightbox].title}</h3>
                                <p className="text-white/60 text-sm max-w-lg">{filtered[lightbox].desc}</p>
                                <p className="text-white/30 text-xs mt-3">
                                    {lightbox + 1} / {filtered.length}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
};

export default Gallery;
