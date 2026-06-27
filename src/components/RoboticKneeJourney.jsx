import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { ChevronRight } from 'lucide-react';

const defaultSteps = [
    {
        number: "01",
        title: "Comprehensive Assessment",
        description: "Detailed clinical evaluation, imaging review, and discussion of lifestyle and treatment goals.",
        icon: "ClipboardList",
        color: "text-blue-500",
        gradient: "from-blue-500/10 to-blue-500/0",
        shadowHover: "hover:shadow-blue-500/20",
        borderHover: "group-hover:border-blue-200"
    },
    {
        number: "02",
        title: "Personalised Planning",
        description: "The robotic platform creates an individualised surgical plan based on your exact knee anatomy.",
        icon: "Target",
        color: "text-emerald-500",
        gradient: "from-emerald-500/10 to-emerald-500/0",
        shadowHover: "hover:shadow-emerald-500/20",
        borderHover: "group-hover:border-emerald-200"
    },
    {
        number: "03",
        title: "Robotic Precision",
        description: "Real-time information assists the surgeon in carrying out the procedure with unmatched accuracy.",
        icon: "Crosshair",
        color: "text-[#003B73]",
        gradient: "from-[#003B73]/10 to-[#003B73]/0",
        shadowHover: "hover:shadow-[#003B73]/20",
        borderHover: "group-hover:border-[#003B73]/20"
    },
    {
        number: "04",
        title: "Joint Restoration",
        description: "Damaged surfaces are replaced with precision implants to restore function and improve mobility.",
        icon: "HeartPulse",
        color: "text-indigo-500",
        gradient: "from-indigo-500/10 to-indigo-500/0",
        shadowHover: "hover:shadow-indigo-500/20",
        borderHover: "group-hover:border-indigo-200"
    }
];

const RoboticKneeJourney = ({ service }) => {
    // Fallback to default static data if backend fields aren't provided
    const journeyTitle = service?.journey_title || "Your Robotic Knee Replacement Journey";
    const journeyDescription = service?.journey_description || "Experience a structured and highly personalised approach, guided by state-of-the-art robotic precision at every step.";
    const stepsData = (service?.journey_steps && service.journey_steps.length > 0) ? service.journey_steps : defaultSteps;

    // Split title for styling (first parts normal, last part gradient)
    const titleWords = journeyTitle.split(' ');
    const lastWord = titleWords.pop();
    const secondLastWord = titleWords.pop();
    const restOfTitle = titleWords.join(' ');
    const highlightedPart = `${secondLastWord || ''} ${lastWord || ''}`.trim();

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-24 mt-20 relative px-4"
        >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent pointer-events-none rounded-[4rem]" />
            
            <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
                <span className="inline-flex items-center gap-1.5 px-5 py-2 mb-6 rounded-full bg-white border border-gray-100 shadow-sm text-gray-600 text-[11px] font-medium uppercase tracking-[0.25em]">
                    <span className="w-2 h-2 rounded-full bg-[#1282b2] animate-pulse"></span>
                    The Process
                </span>
                <h2 className="text-4xl md:text-5xl font-light text-primary-950 tracking-tighter leading-[1.1] mb-6">
                    {restOfTitle} <br className="hidden md:block" />
                    <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#003B73] to-[#1282b2]">{highlightedPart}</span>
                </h2>
                <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-light">
                    {journeyDescription}
                </p>
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Horizontal connecting line on Desktop */}
                <div className="hidden lg:block absolute top-[45%] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent z-0"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {stepsData.map((step, index) => {
                        const Icon = Icons[step.icon] || Icons.Activity;
                        
                        const presetColors = [
                            { color: "text-blue-500", gradient: "from-blue-500/10 to-blue-500/0", shadow: "hover:shadow-blue-500/20", border: "group-hover:border-blue-200" },
                            { color: "text-emerald-500", gradient: "from-emerald-500/10 to-emerald-500/0", shadow: "hover:shadow-emerald-500/20", border: "group-hover:border-emerald-200" },
                            { color: "text-[#003B73]", gradient: "from-[#003B73]/10 to-[#003B73]/0", shadow: "hover:shadow-[#003B73]/20", border: "group-hover:border-[#003B73]/20" },
                            { color: "text-indigo-500", gradient: "from-indigo-500/10 to-indigo-500/0", shadow: "hover:shadow-indigo-500/20", border: "group-hover:border-indigo-200" },
                            { color: "text-purple-500", gradient: "from-purple-500/10 to-purple-500/0", shadow: "hover:shadow-purple-500/20", border: "group-hover:border-purple-200" },
                            { color: "text-rose-500", gradient: "from-rose-500/10 to-rose-500/0", shadow: "hover:shadow-rose-500/20", border: "group-hover:border-rose-200" }
                        ];
                        const style = presetColors[index % presetColors.length];
                        
                        const stepColor = step.color || style.color;
                        const stepGradient = step.gradient || style.gradient;
                        const stepShadowHover = step.shadowHover || style.shadow;
                        const stepBorderHover = step.borderHover || style.border;

                        return (
                            <div 
                                key={index} 
                                className={`group relative bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:-translate-y-2 transition-all duration-500 ease-out z-10 overflow-hidden ${stepShadowHover}`}
                            >
                                {/* Gradient Background */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${stepGradient} pointer-events-none`} />
                                
                                {/* Watermark Number */}
                                <div className="absolute -bottom-4 -right-4 text-[100px] font-black text-gray-50/60 group-hover:text-gray-100/50 transition-colors duration-500 pointer-events-none select-none z-0">
                                    {step.number || `0${index + 1}`}
                                </div>

                                <div className="relative z-10">
                                    {/* Top Area: Icon and Connector */}
                                    <div className="flex items-center justify-between mb-8">
                                        <div className={`w-14 h-14 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center ${stepColor} ${stepBorderHover} group-hover:scale-110 transition-all duration-500`}>
                                            <Icon size={24} strokeWidth={1.5} />
                                        </div>
                                        {index !== stepsData.length - 1 && (
                                            <div className="hidden lg:flex w-8 h-8 rounded-full bg-gray-50 items-center justify-center text-gray-300 group-hover:bg-[#003B73] group-hover:text-white transition-all duration-500">
                                                <ChevronRight size={16} />
                                            </div>
                                        )}
                                    </div>

                                    {/* Content Area */}
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-[#003B73] transition-colors duration-300">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm leading-relaxed font-light">
                                        {step.description}
                                    </p>
                                </div>

                                {/* Bottom Decorative Line */}
                                <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${stepGradient.replace('/10', '/80').replace('/0', '/20')} w-0 group-hover:w-full transition-all duration-700 ease-out`} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
};

export default RoboticKneeJourney;
