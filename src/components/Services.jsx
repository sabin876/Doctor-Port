import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronDown,
    ChevronUp,
    Activity,
    Scan,
    Bone,
    Layers,
    Cpu,
    HeartPulse,
    Bandage,
    Stethoscope,
    ArrowRight
} from 'lucide-react';

const Services = () => {
    const [showAll, setShowAll] = useState(false);

    const services = [
        {
            title: "Sports / ACL / Meniscus Injury Management",
            desc: "Customized plans for ligament injuries, tendonitis, and joint overload, surgical and non-surgical.",
            icon: Activity,
            color: "bg-primary-600"
        },
        {
            title: "Knee and Shoulder Arthroscopy",
            desc: "Minimally invasive treatment for ligament tears, meniscus injuries, and joint instability.",
            icon: Scan,
            color: "bg-primary-700"
        },
        {
            title: "Deformity Corrections / Osteotomies",
            desc: "Comprehensive care for degenerative joints including knee and hip replacements.",
            icon: Bone,
            color: "bg-primary-600"
        },
        {
            title: "Total / Partial Joint Replacement Surgeries",
            desc: "Comprehensive care for degenerative joints including knee and hip replacements.",
            icon: Layers,
            color: "bg-primary-700"
        },
        {
            title: "Robotic / Computer Assisted Surgeries",
            desc: "Advanced precision surgery using robotic assistance for better outcomes.",
            icon: Cpu,
            color: "bg-primary-600"
        },
        {
            title: "Joint Preservation / Regeneration",
            desc: "Minimally invasive treatment for ligament tears, meniscus injuries, and joint instability.",
            icon: HeartPulse,
            color: "bg-primary-700"
        },
        {
            title: "Fractures and Trauma Care",
            desc: "Emergency stabilization, surgical repair, and rehabilitation for fractures and dislocations.",
            icon: Bandage,
            color: "bg-primary-600"
        },
        {
            title: "Bone & Joint Health Consultation",
            desc: "You don't need to wait for pain to become unbearable. Expert consultation.",
            icon: Stethoscope,
            color: "bg-primary-700"
        }
    ];

    const displayedServices = showAll ? services : services.slice(0, 4);

    return (
        <section id="services" className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-1.5 mb-4 rounded-full bg-primary-50 text-primary-700 text-[11px] font-bold uppercase tracking-[0.2em]"
                    >
                        Medical Specializations
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-montserrat font-extrabold text-gray-900 mb-6 tracking-tight">
                        Our Specialized <span className="text-primary-600">Services</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="mt-4 max-w-2xl text-lg font-normal text-gray-600 mx-auto"
                    >
                        Comprehensive care using the latest surgical and non-surgical advancements for your mobility and health.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <AnimatePresence>
                        {displayedServices.map((service, index) => (
                            <motion.div
                                key={index}
                                className={`group relative ${service.color} rounded-none p-8 flex flex-col h-full items-center text-center shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden`}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -10 }}
                            >
                                {/* Animated Background Glow */}
                                <div className="absolute top-0 left-0 w-full h-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                {/* Icon with pulse animation */}
                                <div className="mb-6 text-white relative z-10">
                                    <motion.div
                                        whileHover={{ rotate: [0, -10, 10, -5, 5, 0], scale: 1.1 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <service.icon size={48} strokeWidth={1.5} />
                                    </motion.div>
                                </div>

                                <div className="flex flex-col flex-grow items-center relative z-10">
                                    <h3 className="text-lg font-extrabold text-white mb-4 uppercase tracking-wider leading-tight">
                                        {service.title}
                                    </h3>

                                    <p className="text-white/90 text-sm font-medium leading-relaxed mb-8 flex-grow">
                                        {service.desc}
                                    </p>

                                    <div className="mt-auto">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-6 py-2 border-2 border-white text-white text-[13px] font-bold uppercase tracking-widest rounded-full hover:bg-white hover:text-primary-700 transition-all duration-300 flex items-center justify-center"
                                        >
                                            Learn More
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Show More / Show Less Button */}
                <motion.div
                    className="flex justify-center mt-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <motion.button
                        onClick={() => setShowAll(!showAll)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group flex items-center gap-3 px-8 py-4 bg-white border-2 border-primary-600 text-primary-600 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-primary-600 hover:text-white transition-all duration-300 shadow-md hover:shadow-xl"
                    >
                        {showAll ? (
                            <>
                                Show Less
                                <ChevronUp className="w-5 h-5 transition-transform group-hover:translate-y-[-2px]" />
                            </>
                        ) : (
                            <>
                                Show More Services
                                <ChevronDown className="w-5 h-5 transition-transform group-hover:translate-y-[2px]" />
                            </>
                        )}
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default Services;
