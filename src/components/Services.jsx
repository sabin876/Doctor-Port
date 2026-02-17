import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import kneeArthroscopyImg from '../assets/knee-arthroscopy.png';

const Services = () => {
    const [showAll, setShowAll] = useState(false);

    const services = [
        {
            title: "Sports / ACL / Meniscus Injury Management",
            desc: "Customized plans for ligament injuries, tendonitis, and joint overload, surgical and non-surgical.",
            image: kneeArthroscopyImg
        },
        {
            title: "Knee and Shoulder Arthroscopy",
            desc: "Minimally invasive treatment for ligament tears, meniscus injuries, and joint instability.",
            image: kneeArthroscopyImg
        },
        {
            title: "Deformity Corrections / Osteotomies",
            desc: "Comprehensive care for degenerative joints including knee and hip replacements.",
            image: kneeArthroscopyImg
        },
        {
            title: "Total / Partial Joint Replacement Surgeries",
            desc: "Comprehensive care for degenerative joints including knee and hip replacements.",
            image: kneeArthroscopyImg
        },
        {
            title: "Robotic / Computer Assisted Surgeries",
            desc: "Advanced precision surgery using robotic assistance for better outcomes.",
            image: kneeArthroscopyImg
        },
        {
            title: "Joint Preservation / Regeneration",
            desc: "Minimally invasive treatment for ligament tears, meniscus injuries, and joint instability.",
            image: kneeArthroscopyImg
        },
        {
            title: "Fractures and Trauma Care",
            desc: "Emergency stabilization, surgical repair, and rehabilitation for fractures and dislocations.",
            image: kneeArthroscopyImg
        },
        {
            title: "Bone & Joint Health Consultation",
            desc: "You don't need to wait for pain to become unbearable. Expert consultation.",
            image: kneeArthroscopyImg
        }
    ];

    const displayedServices = showAll ? services : services.slice(0, 4);

    return (
        <section id="services" className="py-24 bg-gray-50/50 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-100/60 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        x: [0, 50, -50, 0],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50/60 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-[20%] left-[20%] w-[20%] h-[20%] bg-primary-100/40 rounded-full blur-[80px]"
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-1.5 mb-4 rounded-full bg-blue-100/50 text-blue-600 text-[11px] font-bold uppercase tracking-[0.2em] backdrop-blur-sm"
                    >
                        Medical Specializations
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-montserrat font-extrabold text-blue-900 mb-6 tracking-tight">
                        Our Specialized <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 font-black">Services</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="mt-4 max-w-2xl text-lg font-normal text-gray-600 mx-auto"
                    >
                        Comprehensive care using the latest surgical and non-surgical advancements for your mobility and health.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <AnimatePresence>
                        {displayedServices.map((service, index) => (
                            <motion.div
                                key={index}
                                className="group relative bg-white rounded-[2rem] p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col h-full overflow-hidden"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -8 }}
                            >
                                {/* X-Ray Scan Effect - High Contrast Blue */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-[1.5s] ease-in-out pointer-events-none z-0"></div>

                                {/* Medical Pattern Background - High Contrast Dots */}
                                <div className="absolute inset-0 opacity-[0.08] group-hover:opacity-[0.15] transition-opacity duration-500 pointer-events-none z-0"
                                    style={{ backgroundImage: 'radial-gradient(circle, #0284c7 1.5px, transparent 1.5px)', backgroundSize: '20px 20px' }}>
                                </div>

                                {/* Image Section (Optional) */}
                                {service.image && (
                                    <div className="mb-6 h-40 overflow-hidden rounded-2xl relative z-10">
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-primary-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
                                    </div>
                                )}

                                <div className="flex flex-col flex-grow relative z-10 pt-2">
                                    <h3 className="text-xl font-extrabold text-gray-950 mb-4 tracking-tight leading-tight group-hover:text-primary-600 transition-colors duration-300">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm font-normal leading-relaxed mb-6 flex-grow">
                                        {service.desc}
                                    </p>

                                    <div className="pt-4 border-t border-gray-50 mt-auto">
                                        <button className="flex items-center text-[13px] font-bold text-primary-600 group/btn">
                                            View Details
                                            <ChevronRight className="ml-1 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                        </button>
                                    </div>
                                </div>

                                {/* Hover Border Accent */}
                                <div className="absolute inset-0 border-2 border-primary-500/0 group-hover:border-primary-500/10 rounded-[2rem] transition-all duration-500 pointer-events-none z-20"></div>
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
                        className="group flex items-center gap-3 px-8 py-4 bg-white border-2 border-primary-600 text-primary-600 rounded-2xl font-bold text-sm uppercase tracking-wider hover:bg-primary-600 hover:text-white transition-all duration-300 shadow-md hover:shadow-xl"
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
