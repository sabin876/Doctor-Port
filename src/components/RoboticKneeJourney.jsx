import React from 'react';
import { motion } from 'framer-motion';

const defaultSteps = [
    {
        number: "01",
        title: "Comprehensive Assessment",
        description: "Detailed clinical evaluation, imaging review, and discussion of lifestyle and treatment goals."
    },
    {
        number: "02",
        title: "Personalised Planning",
        description: "The robotic platform creates an individualised surgical plan based on your exact knee anatomy."
    },
    {
        number: "03",
        title: "Robotic Precision",
        description: "Real-time information assists the surgeon in carrying out the procedure with unmatched accuracy."
    },
    {
        number: "04",
        title: "Joint Restoration",
        description: "Damaged surfaces are replaced with precision implants to restore function and improve mobility."
    }
];

// Helper to dynamically resolve distinct styles and colors based on steps to keep layout colorful
const getStepStyle = (index) => {
    const presets = [
        { 
            color: "text-sky-600", 
            bg: "bg-sky-50/70", 
            border: "border-sky-200", 
            hoverBorder: "hover:border-sky-300", 
            hoverText: "text-sky-700",
            gradient: "from-sky-500/12 to-sky-500/2", 
            cardBg: "from-sky-50/80 via-sky-50/30 to-white",
            shadow: "shadow-sky-500/5 hover:shadow-sky-500/12" 
        },
        { 
            color: "text-emerald-600", 
            bg: "bg-emerald-50/70", 
            border: "border-emerald-200", 
            hoverBorder: "hover:border-emerald-300", 
            hoverText: "text-emerald-700",
            gradient: "from-emerald-500/12 to-emerald-500/2", 
            cardBg: "from-emerald-50/80 via-emerald-50/30 to-white",
            shadow: "shadow-emerald-500/5 hover:shadow-emerald-500/12" 
        },
        { 
            color: "text-amber-600", 
            bg: "bg-amber-50/70", 
            border: "border-amber-200", 
            hoverBorder: "hover:border-amber-300", 
            hoverText: "text-amber-700",
            gradient: "from-amber-500/12 to-amber-500/2", 
            cardBg: "from-amber-50/80 via-amber-50/30 to-white",
            shadow: "shadow-amber-500/5 hover:shadow-amber-500/12" 
        },
        { 
            color: "text-indigo-600", 
            bg: "bg-indigo-50/70", 
            border: "border-indigo-200", 
            hoverBorder: "hover:border-indigo-300", 
            hoverText: "text-indigo-700",
            gradient: "from-indigo-500/12 to-indigo-500/2", 
            cardBg: "from-indigo-50/80 via-indigo-50/30 to-white",
            shadow: "shadow-indigo-500/5 hover:shadow-indigo-500/12" 
        },
        { 
            color: "text-rose-600", 
            bg: "bg-rose-50/70", 
            border: "border-rose-200", 
            hoverBorder: "hover:border-rose-300", 
            hoverText: "text-rose-700",
            gradient: "from-rose-500/12 to-rose-500/2", 
            cardBg: "from-rose-50/80 via-rose-50/30 to-white",
            shadow: "shadow-rose-500/5 hover:shadow-rose-500/12" 
        }
    ];

    const preset = presets[index % presets.length];

    return {
        color: preset.color,
        bg: preset.bg,
        border: preset.border,
        hoverBorder: preset.hoverBorder,
        hoverText: preset.hoverText,
        gradient: preset.gradient,
        cardBg: preset.cardBg,
        shadow: preset.shadow
    };
};

const RoboticKneeJourney = ({ service }) => {
    const journeyTitle = service?.journey_title || "Your Robotic Knee Replacement Journey";
    const journeyDescription = service?.journey_description || "Experience a structured and highly personalised approach, guided by state-of-the-art robotic precision at every step.";
    const stepsData = (service?.journey_steps && service.journey_steps.length > 0) ? service.journey_steps : defaultSteps;

    // Split title for styling
    const titleWords = journeyTitle.split(' ');
    const lastWord = titleWords.pop();
    const secondLastWord = titleWords.pop();
    const restOfTitle = titleWords.join(' ');
    const highlightedPart = `${secondLastWord || ''} ${lastWord || ''}`.trim();

    return (
        <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-24 mt-20 relative px-4"
        >
            {/* Soft decorative background glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/15 to-transparent pointer-events-none rounded-[4rem]" />
            
            {/* Header Area */}
            <div className="text-center max-w-3xl mx-auto mb-24 relative z-10">
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 mb-5 rounded-full bg-white border border-gray-100 shadow-sm text-gray-500 text-[10px] font-semibold uppercase tracking-[0.25em]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1282b2] animate-pulse"></span>
                    The Process
                </span>
                <h2 className="text-3xl md:text-4xl font-light text-gray-900 tracking-tight leading-[1.2] mb-5">
                    {restOfTitle} <br className="hidden md:block" />
                    <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#003B73] to-[#1282b2]">{highlightedPart}</span>
                </h2>
                {journeyDescription && (
                    <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-xl mx-auto font-light">
                        {journeyDescription}
                    </p>
                )}
            </div>

            {/* Stepper Timeline Container */}
            <div className="relative max-w-5xl mx-auto z-10">
                
                {/* Desktop Central Flowing Dotted Line */}
                <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-4 hidden lg:block z-0">
                    <svg className="w-full h-full" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="line-gradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#0ea5e9" />
                                <stop offset="30%" stopColor="#10b981" />
                                <stop offset="60%" stopColor="#f59e0b" />
                                <stop offset="85%" stopColor="#6366f1" />
                                <stop offset="100%" stopColor="#ec4899" />
                            </linearGradient>
                        </defs>
                        {/* Static gray dotted background line */}
                        <line x1="8" y1="0" x2="8" y2="100%" stroke="#e2e8f0" strokeWidth="3" strokeDasharray="8 8" />
                        {/* Animated flowing dotted path */}
                        <motion.line
                            x1="8"
                            y1="0"
                            x2="8"
                            y2="100%"
                            stroke="url(#line-gradient)"
                            strokeWidth="3"
                            strokeDasharray="8 8"
                            animate={{ strokeDashoffset: [0, -32], opacity: [0.65, 0.95, 0.65] }}
                            transition={{
                                strokeDashoffset: {
                                    ease: "linear",
                                    duration: 1.2,
                                    repeat: Infinity
                                },
                                opacity: {
                                    ease: "easeInOut",
                                    duration: 2.5,
                                    repeat: Infinity
                                }
                            }}
                        />
                    </svg>
                </div>

                {/* Mobile Left-Aligned Flowing Dotted Line */}
                <div className="absolute left-[24px] top-4 bottom-4 w-4 lg:hidden z-0">
                    <svg className="w-full h-full" preserveAspectRatio="none">
                        <line x1="8" y1="0" x2="8" y2="100%" stroke="#e2e8f0" strokeWidth="3" strokeDasharray="8 8" />
                        <motion.line
                            x1="8"
                            y1="0"
                            x2="8"
                            y2="100%"
                            stroke="url(#line-gradient)"
                            strokeWidth="3"
                            strokeDasharray="8 8"
                            animate={{ strokeDashoffset: [0, -32], opacity: [0.65, 0.95, 0.65] }}
                            transition={{
                                strokeDashoffset: {
                                    ease: "linear",
                                    duration: 1.2,
                                    repeat: Infinity
                                },
                                opacity: {
                                    ease: "easeInOut",
                                    duration: 2.5,
                                    repeat: Infinity
                                }
                            }}
                        />
                    </svg>
                </div>

                {/* Timeline Cards Block */}
                <div className="space-y-12 relative z-10">
                    {stepsData.map((step, index) => {
                        const {
                            color,
                            bg,
                            border,
                            hoverBorder,
                            hoverText,
                            gradient,
                            cardBg,
                            shadow
                        } = getStepStyle(index);

                        return (
                            <div 
                                key={index} 
                                className={`relative flex flex-col lg:flex-row items-center justify-between group w-full ${index % 2 === 0 ? '' : 'lg:flex-row-reverse'}`}
                            >
                                {/* Horizontal connection dotted line (Desktop only - Animated Pulse) */}
                                <motion.div 
                                    animate={{ opacity: [0.4, 0.8, 0.4], scaleX: [0.95, 1.05, 0.95] }}
                                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }}
                                    className={`hidden lg:block absolute top-1/2 -translate-y-1/2 h-[2px] border-t-2 border-dashed ${border} ${index % 2 === 0 ? 'right-1/2' : 'left-1/2'} w-12 z-10 origin-center`} 
                                />

                                {/* Central timeline node indicator dot */}
                                <motion.div 
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }}
                                    className={`absolute left-[24px] lg:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-4 ${border} z-20 flex items-center justify-center shadow-md`}
                                >
                                    <div className={`w-2.5 h-2.5 rounded-full ${bg.replace('/70', '')} ${color}`} />
                                </motion.div>

                                {/* Step Card Container */}
                                <div className="w-full lg:w-[calc(50%-3rem)] pl-16 lg:pl-0">
                                    <motion.div 
                                        animate={{ y: [0, -8, 0] }}
                                        transition={{ 
                                            duration: 4, 
                                            repeat: Infinity,
                                            repeatType: "reverse",
                                            ease: "easeInOut",
                                            delay: index * 0.5
                                        }}
                                        whileHover={{ scale: 1.03 }}
                                        className={`relative bg-gradient-to-br ${cardBg} rounded-[2rem] p-8 border-2 ${border} ${hoverBorder} ${shadow} z-10 overflow-hidden w-full transition-all duration-500`}
                                    >
                                        {/* Accent Background Gradient overlay (partially visible by default) */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} pointer-events-none opacity-30`} />
                                        
                                        {/* Watermark Number in background */}
                                        <div className="absolute -bottom-6 -right-6 text-[120px] font-black text-gray-100/60 transition-colors duration-500 pointer-events-none select-none z-0">
                                            {step.number ? (parseInt(step.number) < 10 ? `0${step.number}` : step.number) : `0${index + 1}`}
                                        </div>

                                        <div className="relative z-10 flex flex-col h-full justify-between">
                                            <div>
                                                {/* Step Badge Header */}
                                                <div className="mb-6">
                                                    <span className={`inline-block text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${bg} ${color} ${border} border-2`}>
                                                        Step {step.number ? (parseInt(step.number) < 10 ? `0${step.number}` : step.number) : `0${index + 1}`}
                                                    </span>
                                                </div>

                                                {/* Card Content */}
                                                <h3 className={`text-lg font-bold ${color} mb-4 ${hoverText} transition-colors duration-300`}>
                                                    {step.title}
                                                </h3>
                                                <p className="text-gray-600 text-xs md:text-sm leading-relaxed font-normal text-justify">
                                                    {step.description}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Accent bottom bar that glows */}
                                        <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${gradient.replace('/12', '/90').replace('/2', '/40')} w-full`} />
                                    </motion.div>
                                </div>

                                {/* Placeholder empty column to force staggered layout on desktop */}
                                <div className="hidden lg:block w-[calc(50%-3rem)]" />
                            </div>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
};

export default RoboticKneeJourney;
