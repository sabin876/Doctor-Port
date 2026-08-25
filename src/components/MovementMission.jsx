import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import doctorExamImg from '../assets/doctor-photo.webp';

// Pelvis 3D Anatomical Bone Illustration matching reference layout
function PelvisBoneIllustration() {
    return (
        <div className="w-full flex justify-center items-end pt-6 pointer-events-none select-none">
            <svg viewBox="0 0 240 180" className="w-48 md:w-56 h-auto drop-shadow-xl text-white fill-current opacity-95">
                {/* Lumbar vertebrae top */}
                <path d="M 120 10 L 114 18 L 114 35 L 126 35 L 126 18 Z" opacity="0.9" />
                <path d="M 120 22 C 110 22 110 32 120 32 C 130 32 130 22 120 22 Z" fill="#EBF5FF" />
                <path d="M 120 36 C 112 36 112 48 120 48 C 128 48 128 36 120 36 Z" fill="#EBF5FF" />
                {/* Ilium left wing */}
                <path d="M 110 35 C 80 15 40 30 30 65 C 20 100 45 125 75 130 C 85 132 95 125 105 110 C 95 90 90 65 110 35 Z" fill="#F0F8FF" stroke="#D0E8FF" strokeWidth="1.5" />
                {/* Ilium right wing */}
                <path d="M 130 35 C 160 15 200 30 210 65 C 220 100 195 125 165 130 C 155 132 145 125 135 110 C 145 90 150 65 130 35 Z" fill="#F0F8FF" stroke="#D0E8FF" strokeWidth="1.5" />
                {/* Sacrum center triangle */}
                <path d="M 106 45 L 134 45 L 128 95 L 120 105 L 112 95 Z" fill="#DCEEFF" />
                {/* Obturator foramen left */}
                <ellipse cx="85" cy="140" rx="14" ry="12" fill="#0084FF" />
                {/* Obturator foramen right */}
                <ellipse cx="155" cy="140" rx="14" ry="12" fill="#0084FF" />
                {/* Pubic arch bottom */}
                <path d="M 75 130 C 85 165 105 165 120 148 C 135 165 155 165 165 130 C 145 150 95 150 75 130 Z" fill="#FFFFFF" />
            </svg>
        </div>
    );
}

const MovementMission = () => {
    const whatsappLink = "https://wa.link/wriek2";

    return (
        <section id="movement-mission" className="py-16 md:py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                {/* Centered Top Header */}
                <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0084FF] tracking-tight mb-4"
                    >
                        Your Movement. Our Mission.
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-base sm:text-lg md:text-xl text-slate-600 font-medium leading-relaxed"
                    >
                        Trusted care that goes beyond the diagnosis, because your mobility matters.
                    </motion.p>
                </div>

                {/* 3 Column Grid Matching Reference Screenshot */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                    
                    {/* Column 1: Left Doctor Card with Overlay Quote & Consultation Button */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-5 relative rounded-[2rem] overflow-hidden shadow-lg border border-slate-100 flex flex-col justify-between p-8 md:p-10 min-h-[460px] md:min-h-[520px] bg-slate-900 group"
                    >
                        {/* Background Image */}
                        <img 
                            src={doctorExamImg}
                            alt="Dr. Ulhas Sonar examining patient"
                            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-80"
                        />

                        {/* Dark Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/65 to-slate-950/40 pointer-events-none" />

                        {/* Quote Content */}
                        <div className="relative z-10 my-auto pt-4">
                            <blockquote className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-tight mb-6 tracking-tight">
                                “ Every joint tells a story. My role is to restore its rhythm, mobility, and confidence — with precision and care. ”
                            </blockquote>
                            
                            <div className="text-lg md:text-xl font-bold text-white tracking-wide">
                                — Dr. Ulhas Sonar
                            </div>
                        </div>

                        {/* Button Bottom Left */}
                        <div className="relative z-10 pt-8 mt-auto">
                            <a
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0084FF] hover:bg-[#0072DC] text-white text-sm font-semibold shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
                            >
                                <span>Schedule a Consultation</span>
                                <ArrowUpRight className="w-4 h-4" />
                            </a>
                        </div>
                    </motion.div>

                    {/* Column 2: Middle Stacked Soft-Blue Cards */}
                    <div className="lg:col-span-4 flex flex-col gap-6 justify-between">
                        
                        {/* Top Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="bg-[#E4F2FD] rounded-[2rem] p-8 md:p-9 border border-sky-100 flex flex-col justify-center flex-1 transition-all duration-300 hover:shadow-md"
                        >
                            <h3 className="text-xl md:text-2xl font-bold text-[#0F4C81] mb-4 leading-snug">
                                Holistic Joint Health Approach
                            </h3>
                            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                                Focused on restoring function, easing discomfort, and enhancing daily living through evidence-led interventions.
                            </p>
                        </motion.div>

                        {/* Bottom Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-[#E4F2FD] rounded-[2rem] p-8 md:p-9 border border-sky-100 flex flex-col justify-center flex-1 transition-all duration-300 hover:shadow-md"
                        >
                            <h3 className="text-xl md:text-2xl font-bold text-[#0F4C81] mb-4 leading-snug">
                                Precision-led Procedures & Personalized Care
                            </h3>
                            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                                Leveraging advanced techniques for better outcomes with fewer disruptions to your routine.
                            </p>
                        </motion.div>

                    </div>

                    {/* Column 3: Right Solid Blue Card with 3D Spine/Pelvis Model */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-3 bg-[#0084FF] rounded-[2rem] p-8 md:p-9 text-white flex flex-col justify-between shadow-lg relative overflow-hidden min-h-[460px] md:min-h-[520px]"
                    >
                        {/* Text Header */}
                        <div>
                            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4 leading-tight">
                                Global Standards, Local Commitment
                            </h3>
                            <p className="text-white/95 text-sm md:text-base leading-relaxed font-normal">
                                A world-trained surgeon bringing the best of international orthopaedic practices to Dubai's diverse community.
                            </p>
                        </div>

                        {/* Pelvis 3D Anatomical Graphic Bottom */}
                        <PelvisBoneIllustration />
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default MovementMission;
