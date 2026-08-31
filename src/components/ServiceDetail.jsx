import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, CheckCircle2, ArrowRight, Activity, ShieldCheck, Zap, HeartPulse, ClipboardCheck, Users, HelpCircle, ChevronDown, ChevronUp, Home, Star, RotateCcw, PlusSquare, Triangle, Hexagon, ChevronLeft, Stethoscope } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../lib/api';
import { getTranslatedService } from '../lib/serviceTranslations';
import Breadcrumbs from './ui/Breadcrumbs';
import SEO from './SEO';
import { defaultServiceFaqs } from '../constants/serviceFaqs';
import CTABanner from './CTABanner';
import RoboticKneeJourney from './RoboticKneeJourney';
import SecondOpinionSection from './SecondOpinionSection';

// Import images
import kneeArthroscopyImg from '../assets/knee-arthroscopy.png';
import jointReplacementImg from '../assets/joint-replacement-bg.png';
import sportsMedicineImg from '../assets/sports-medicine-bg.png';
import spineSurgeryImg from '../assets/spine-surgery-bg.png';

// Fallback image
const defaultImage = "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200";

// Simple physiotherapist SVG illustration
function TherapistIllustration() {
  return (
    <svg viewBox="0 0 200 220" width="200" height="220" xmlns="http://www.w3.org/2000/svg">
      {/* Head */}
      <ellipse cx="100" cy="48" rx="28" ry="30" fill="#f0c08a" />
      {/* Hair / cap */}
      <ellipse cx="100" cy="28" rx="30" ry="18" fill="#1a3a5c" />
      {/* Neck */}
      <rect x="91" y="74" width="18" height="14" rx="4" fill="#f0c08a" />
      {/* Body / scrubs */}
      <rect x="62" y="86" width="76" height="80" rx="18" fill="#1a4d80" />
      {/* Clipboard */}
      <rect x="108" y="98" width="38" height="48" rx="6" fill="#d0dff0" />
      <rect x="112" y="94" width="30" height="8" rx="3" fill="#b0c8e8" />
      <line x1="115" y1="112" x2="140" y2="112" stroke="#7a9bbf" strokeWidth="2" strokeLinecap="round" />
      <line x1="115" y1="120" x2="140" y2="120" stroke="#7a9bbf" strokeWidth="2" strokeLinecap="round" />
      <line x1="115" y1="128" x2="132" y2="128" stroke="#7a9bbf" strokeWidth="2" strokeLinecap="round" />
      {/* Left arm */}
      <rect x="44" y="90" width="22" height="52" rx="11" fill="#1a4d80" />
      {/* Stethoscope arc */}
      <path d="M66 118 Q80 140 96 130" fill="none" stroke="#8aaec8" strokeWidth="3" strokeLinecap="round" />
      <circle cx="96" cy="130" r="5" fill="#8aaec8" />
      {/* Legs */}
      <rect x="72" y="160" width="22" height="50" rx="10" fill="#1a3a5c" />
      <rect x="106" y="160" width="22" height="50" rx="10" fill="#1a3a5c" />
      {/* Shoes */}
      <ellipse cx="83" cy="208" rx="14" ry="8" fill="#0f2236" />
      <ellipse cx="117" cy="208" rx="14" ry="8" fill="#0f2236" />
    </svg>
  );
}

const fractureServicesList = [
    {
        title: "Fracture Assessment",
        desc: "Fracture assessment includes specialist evaluation of bone injuries, swelling, pain, deformity and difficulty using the affected limb. The consultation may include clinical examination, review of X-rays, CT scans or MRI scans, and discussion of the most suitable treatment pathway."
    },
    {
        title: "Fracture Fixation Surgery",
        desc: "Fracture fixation surgery is used for selected fractures that are displaced, unstable, involve a joint, or are unlikely to heal well with non-surgical care alone. Fixation may involve plates, screws, nails or wires depending on the fracture pattern, bone involved, soft-tissue condition and patient needs."
    },
    {
        title: "Upper Limb Fracture Treatment",
        desc: "Upper limb fracture treatment includes care for fractures of the shoulder, arm, elbow, forearm, wrist and hand. These injuries may affect lifting, gripping, writing, driving, work and daily function, so treatment is planned with attention to bone healing, joint movement and hand or arm use."
    },
    {
        title: "Lower Limb Fracture Treatment",
        desc: "Lower limb fracture treatment includes care for fractures of the hip, thigh, knee, leg, ankle and foot. Because these injuries can affect walking and weight-bearing, treatment focuses on fracture stability, safe mobilisation, pain control and gradual return to activity."
    },
    {
        title: "Wrist Fracture Surgery",
        desc: "Wrist fracture surgery may be needed for selected distal radius fractures and other wrist fractures when alignment is poor, the fracture is unstable or joint involvement is present. Some wrist fractures can be treated with plaster or splinting, while others may require fixation to support better alignment and hand function."
    },
    {
        title: "Ankle Fracture Treatment",
        desc: "Ankle fracture treatment includes assessment of stable and unstable ankle injuries. Stable fractures may be managed with immobilisation and rehabilitation, while displaced or unstable fractures may require surgical fixation to restore ankle alignment and support safe walking."
    },
    {
        title: "Hip Fracture Surgery",
        desc: "Hip fracture surgery may be required for selected hip fractures, especially when walking ability, fracture type and patient health indicate the need for fixation or replacement. Treatment depends on the fracture pattern, bone quality, age, general health and mobility needs."
    },
    {
        title: "Ligament and Soft-Tissue Injury Care",
        desc: "Ligament and soft-tissue injury care includes treatment for sprains, ligament injuries, muscle injuries and tendon-related problems. Treatment may involve rest, bracing, physiotherapy, activity modification, imaging review or surgery when instability or significant structural damage is present."
    },
    {
        title: "Minor Injury and Sports Trauma Care",
        desc: "Minor injury and sports trauma care includes assessment and treatment of common injuries such as falls, twists, sprains, bruising and activity-related trauma. Early assessment is useful when pain, swelling, difficulty walking or reduced movement continues after the injury."
    },
    {
        title: "General Orthopaedic Consultation",
        desc: "A general orthopaedic consultation is suitable for bone, joint, muscle, tendon and ligament problems affecting daily activities, work, walking or sport. This may include assessment of persistent pain, stiffness, swelling, weakness, movement restriction or reduced confidence after injury."
    },
    {
        title: "Post-Fracture Rehabilitation Planning",
        desc: "Post-fracture rehabilitation planning supports recovery after plaster treatment, splinting, bracing or fracture surgery. The plan may include mobilisation, range-of-motion exercises, strengthening, walking support, balance training and gradual return to daily activity."
    },
    {
        title: "Second Opinion for Fracture Treatment",
        desc: "A second opinion for fracture treatment may help patients who want clarity about X-rays, scans, plaster treatment, surgery, healing progress or delayed recovery. This consultation helps explain the diagnosis, treatment options, expected recovery, and whether current management is suitable."
    }
];

const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.06
        }
    }
};

const staggerItem = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 80,
            damping: 14
        }
    }
};

import { useInitialData } from '../context/InitialDataContext';

const ServiceDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t, language } = useLanguage();
    const isRtl = language === 'AR';
    const initialData = useInitialData();
    
    const initialService = initialData?.getService?.(id)
        || (typeof window !== 'undefined' && window.__INITIAL_SERVICES__
            ? window.__INITIAL_SERVICES__.find(s => s.slug?.toLowerCase() === id?.toLowerCase() || String(s.id) === id)
            : null);

    const [rawService, setRawService] = useState(initialService);
    const [loading, setLoading] = useState(!initialService);

    const contactPhone = import.meta.env.VITE_CONTACT_PHONE || "+91 90492 00041";
    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "+919049200041";

    useEffect(() => {
        window.scrollTo(0, 0);
        api.getServices()
            .then(data => {
                const found = data.find(s => s.slug?.toLowerCase() === id?.toLowerCase() || String(s.id) === id);
                if (found) {
                    setRawService(found);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch service detail:", err);
                setLoading(false);
            });
    }, [id]);

    const service = getTranslatedService(rawService, t, language);

    const subServicesList = (service?.sub_services && service.sub_services.length > 0)
        ? service.sub_services.map(item => ({
            title: item.title,
            desc: item.description
          }))
        : (id?.toLowerCase() === 'fracture-trauma-surgery' ? fractureServicesList : []);

    const getCTAText = () => {
        if (language === 'AR') {
            return {
                title: "هل تبحث عن استشارة متخصصة في جراحة العظام؟",
                subtitle: "استشر أخصائينا المدرب في المملكة المتحدة للحصول على رعاية سريرية متقدمة."
            };
        } else if (language === 'HI') {
            return {
                title: "क्या आप विशेषज्ञ आर्थोपेडिक परामर्श की तलाश में हैं?",
                subtitle: "उन्नत और व्यक्तिगत देखभाल के लिए हमारे यूके-प्रशिक्षित विशेषज्ञ से संपर्क करें।"
            };
        } else {
            return {
                title: "Seeking Professional Orthopedic Advice?",
                subtitle: "Consult our UK-trained specialist for advanced, personalized care."
            };
        }
    };
    const ctaText = getCTAText();

    if (loading) return <div className="min-h-screen flex items-center justify-center text-primary-600 font-bold">Loading Service...</div>;

    if (!service) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Service Not Found</h2>
                <Link to="/services" className="text-primary-600 font-medium flex items-center gap-2">
                    <ChevronLeft className="w-5 h-5" /> Back to Services
                </Link>
            </div>
        );
    }

    // Map features from service.items (JSON list)
    const features = (service.items && service.items.length > 0)
        ? service.items
        : ["Expert Diagnosis", "Personalized Treatment", "Follow-up Care", "Professional Support"];


    // Default checklist items for fallback (e.g. Fracture & Trauma Surgery)
    const defaultChecklists = {
        "fracture-trauma-surgery": {
            title: "Why Choose Dr Ulhas Sonar for Fracture & Trauma Surgery in Pune?",
            items: [
                "UK-Trained Orthopedic Surgeon",
                "FRCS (England)",
                "European Board Certified Orthopedic Surgeon",
                "Experience in Routine and Complex Trauma",
                "Fracture Reconstruction Expertise",
                "Joint Preservation Principles",
                "Individualised Treatment Planning",
                "Evidence-Based Orthopedic Care",
                "Focus on Functional Recovery"
            ]
        }
    };

    const hasChecklist = (rawService?.checklist_items && rawService.checklist_items.length > 0) || !!defaultChecklists[id?.toLowerCase()];
    const checklistItems = (rawService?.checklist_items && rawService.checklist_items.length > 0)
        ? rawService.checklist_items
        : (defaultChecklists[id?.toLowerCase()]?.items || []);
    const checklistTitle = rawService?.checklist_title
        || (defaultChecklists[id?.toLowerCase()]?.title)
        || `Why choose our ${service.title} services`;

    // Dynamic Detailed Sections Content (Fallback to Fracture & Trauma defaults if slug matches)
    const isFractureTrauma = id?.toLowerCase() === 'fracture-trauma-surgery';
    const hasDetailedSections = (rawService?.about_title && rawService?.about_description) || isFractureTrauma;
    const aboutTitle = rawService?.about_title || (isFractureTrauma ? "About Fracture & Trauma Surgery" : "");
    const aboutDesc = rawService?.about_description || (isFractureTrauma ? "Fracture and trauma surgery involves the diagnosis, treatment, and reconstruction of injuries affecting bones, joints, ligaments, tendons, and surrounding soft tissues. Treatment may range from non-surgical fracture management to advanced surgical fixation and complex trauma reconstruction depending on the nature of the injury." : "");
    const whoNeedsTitle = rawService?.who_needs_title || (isFractureTrauma ? "Who May Need Fracture & Trauma Surgery?" : "");
    const whoNeedsDesc = rawService?.who_needs_description || (isFractureTrauma ? "Specialist assessment may be required if you experience any of the following symptoms:" : "");
    const whoNeedsItems = (rawService?.who_needs_items && rawService.who_needs_items.length > 0)
        ? rawService.who_needs_items
        : (isFractureTrauma ? [
            "A suspected fracture following an injury",
            "Significant pain after a fall",
            "Swelling and deformity",
            "Difficulty walking or using a limb",
            "Fracture involving a joint",
            "Displaced fractures",
            "Multiple injuries",
            "Sports-related fractures",
            "Previous fracture healing problems",
            "Persistent pain after injury"
          ] : []);

    const commonlyTreatedTitle = rawService?.commonly_treated_title || (isFractureTrauma ? "Fractures & Injuries We Commonly Treat" : "");
    const commonlyTreatedDesc = rawService?.commonly_treated_description || (isFractureTrauma ? "From simple fractures requiring precise immobilization to complex high-energy polytrauma demanding multi-stage surgical intervention." : "");
    const commonlyTreated = (rawService?.commonly_treated && rawService.commonly_treated.length > 0)
        ? rawService.commonly_treated
        : (isFractureTrauma ? [
            {
                "title": "Upper Limb Injuries",
                "icon": "PlusSquare",
                "items": [
                    "Wrist fractures",
                    "Distal radius fractures",
                    "Hand fractures",
                    "Finger fractures",
                    "Forearm fractures",
                    "Elbow fractures",
                    "Arm fractures",
                    "Shoulder fractures",
                    "Clavicle fractures"
                ]
            },
            {
                "title": "Lower Limb Injuries",
                "icon": "Triangle",
                "items": [
                    "Hip fractures",
                    "Femur fractures",
                    "Knee fractures",
                    "Patella fractures",
                    "Tibial fractures",
                    "Ankle fractures",
                    "Foot fractures"
                ]
            },
            {
                "title": "Joint and Trauma Injuries",
                "icon": "Hexagon",
                "items": [
                    "Intra-articular fractures",
                    "Fracture dislocations",
                    "Complex joint injuries",
                    "Sports trauma",
                    "High-energy trauma",
                    "Post-fall injuries",
                    "Sprains and ligament injuries",
                    "Tendon and muscle injuries",
                    "Soft-tissue injuries"
                ]
            }
          ] : []);

    const renderIcon = (iconName, className) => {
        switch (iconName) {
            case 'PlusSquare': return <PlusSquare className={className} />;
            case 'Triangle': return <Triangle className={className} />;
            case 'Hexagon': return <Hexagon className={className} />;
            case 'ShieldCheck': return <ShieldCheck className={className} />;
            case 'Activity': return <Activity className={className} />;
            case 'Zap': return <Zap className={className} />;
            case 'HeartPulse': return <HeartPulse className={className} />;
            default: return <Activity className={className} />;
        }
    };

    const getThemeClasses = (idx) => {
        const themes = [
            {
                iconBg: "bg-blue-50",
                iconColor: "text-[#1282b2]",
                hoverBg: "group-hover:bg-[#1282b2]",
                dotBg: "bg-blue-400",
                hoverBorder: "hover:border-blue-200"
            },
            {
                iconBg: "bg-emerald-50",
                iconColor: "text-emerald-600",
                hoverBg: "group-hover:bg-emerald-600",
                dotBg: "bg-emerald-400",
                hoverBorder: "hover:border-emerald-200"
            },
            {
                iconBg: "bg-blue-50",
                iconColor: "text-[#003B73]",
                hoverBg: "group-hover:bg-[#003B73]",
                dotBg: "bg-blue-400",
                hoverBorder: "hover:border-blue-200"
            }
        ];
        return themes[idx % themes.length];
    };

    // Dynamic Schema Generation for SEO
    const stripHtml = (html) => {
        if (!html) return '';
        return html.replace(/<[^>]*>/g, '').trim();
    };

    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://drulhasorthopedic.com';

    // 1. MedicalProcedure Schema
    let bodyLocation = "";
    let procedureType = "SurgicalProcedure";
    const slugLower = id?.toLowerCase() || "";
    
    if (slugLower.includes('knee')) {
        bodyLocation = "Knee";
    } else if (slugLower.includes('hip')) {
        bodyLocation = "Hip";
    } else if (slugLower.includes('shoulder')) {
        bodyLocation = "Shoulder";
    } else if (slugLower.includes('spine')) {
        bodyLocation = "Spine";
    } else if (slugLower.includes('sports') || slugLower.includes('injury')) {
        bodyLocation = "Joints";
    }
    
    if (slugLower.includes('physiotherapy') || slugLower.includes('rehab')) {
        procedureType = "NoninvasiveProcedure";
    } else if (slugLower.includes('consultation')) {
        procedureType = "DiagnosticProcedure";
    }

    const medicalProcedureSchema = {
        "@context": "https://schema.org",
        "@type": "MedicalProcedure",
        "name": service.title,
        "description": stripHtml(service.description),
        "image": service.image,
        "procedureType": {
            "@type": "MedicalProcedureType",
            "name": procedureType
        },
        ...(bodyLocation ? { "bodyLocation": bodyLocation } : {}),
        "relevantSpecialty": {
            "@type": "MedicalSpecialty",
            "name": "Orthopedic"
        },
        "provider": {
            "@type": "Physician",
            "name": "Dr. Ulhas Sonar",
            "telephone": contactPhone,
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Canadian Specialist Hospital",
                "addressLocality": "Dubai",
                "addressCountry": "AE"
            }
        }
    };

    // 2. BreadcrumbList Schema
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": t('nav.home') || "Home",
                "item": `${origin}`
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": t('nav.services') || "Services",
                "item": `${origin}/services`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": service.title,
                "item": `${origin}/services/${id}`
            }
        ]
    };

    // 3. FAQPage Schema
    const defaultData = defaultServiceFaqs[id] || defaultServiceFaqs["physiotherapy"];
    const faqs = (service.faqs && service.faqs.length > 0) ? service.faqs : (defaultData ? defaultData.items : []);
    
    const faqSchema = faqs && faqs.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question || faq.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": stripHtml(faq.answer || faq.a)
            }
        }))
    } : null;

    const schemaList = [medicalProcedureSchema, breadcrumbSchema];
    if (faqSchema) {
        schemaList.push(faqSchema);
    }
    
    // Support merging user custom backend schema if present
    if (service.schema_markup) {
        schemaList.push(service.schema_markup);
    }

    return (
        <main className="relative pt-20 bg-white overflow-hidden">
            <SEO 
                title={service.meta_title || `${service.title} | Dr. Ulhas Sonar`}
                description={service.meta_description || service.description}
                url={`/services/${id}`}
                image={service.og_image || service.image}
                schemaList={schemaList}
            />

            <div className="bg-white border-b border-gray-100">
                <Breadcrumbs items={[
                    { name: t('nav.home'), path: '/' },
                    { name: t('nav.services'), path: '/services' },
                    { name: service.title }
                ]} />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 lg:py-24">
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: isRtl ? 40 : -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2.5 px-4 py-2 mb-6 rounded-full bg-gradient-to-r from-primary-500/10 to-sky-500/10 border border-primary-500/20 text-primary-800 text-[10px] font-semibold uppercase tracking-[0.25em] shadow-[0_2px_12px_rgba(14,165,233,0.08)] backdrop-blur-md"
                        >
                            <Zap size={11} className="fill-primary-600 text-primary-600 animate-pulse" />
                            Specialized Service
                        </motion.div>

                        <h1 className="text-2xl md:text-4xl font-bold text-primary-950 mb-6 tracking-tight leading-[1.1]">
                            {service.h1_title || service.title}
                        </h1>

                        <div 
                            className="text-base md:text-lg text-slate-600 font-normal leading-relaxed mb-10 max-w-2xl prose prose-primary select-text text-justify"
                            dangerouslySetInnerHTML={{ __html: service.description }}
                        />



                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <a 
                                href={`tel:${contactPhone}`}
                                className="w-full sm:w-auto group flex items-center justify-center gap-3 py-4 px-10 bg-gradient-to-r from-[#003B73] to-[#002B55] text-white font-semibold text-[11px] uppercase tracking-[0.2em] rounded-2xl shadow-lg shadow-primary-900/10 hover:shadow-xl hover:shadow-primary-900/20 active:scale-95 transition-all duration-300"
                            >
                                <Phone size={16} className="group-hover:animate-bounce" />
                                Call Us Now
                            </a>
                            <a 
                                href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto group flex items-center justify-center gap-3 py-4 px-10 bg-gradient-to-r from-[#25D366] to-[#1eb954] text-white font-semibold text-[11px] uppercase tracking-[0.2em] rounded-2xl shadow-lg shadow-emerald-500/10 hover:shadow-xl hover:shadow-emerald-500/20 active:scale-95 transition-all duration-300"
                            >
                                <MessageCircle size={16} className="group-hover:rotate-12 transition-transform" />
                                WhatsApp Now
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: isRtl ? -40 : 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative lg:pl-10"
                    >
                        {/* Background dots */}
                        <div className="absolute -top-6 -right-6 w-32 h-32 bg-[radial-gradient(#bae6fd_1.5px,transparent_1.5px)] [background-size:16px_16px] opacity-75 z-0" />
                        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[radial-gradient(#bae6fd_1.5px,transparent_1.5px)] [background-size:16px_16px] opacity-75 z-0" />

                        <div className="relative h-[400px] md:h-[500px] p-4 rounded-[4rem] bg-gradient-to-br from-primary-50/50 to-white border border-primary-50/50 shadow-2xl overflow-hidden group z-10">
                            <img 
                                src={service.image || defaultImage} 
                                alt={service.image_alt_text || service.title} 
                                className="w-full h-full object-cover rounded-[3rem] relative z-10 group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>

                        {/* Floating stat card */}
                        <div className="absolute -bottom-4 -left-4 md:-left-6 z-20 bg-white/95 backdrop-blur-md border border-slate-100 p-5 rounded-2xl shadow-xl flex items-center gap-4 max-w-[280px]">
                            <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 shadow-inner flex-shrink-0">
                                <Activity className="w-6 h-6 animate-pulse" />
                            </div>
                            <div>
                                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Care Quality</div>
                                <div className="text-sm font-bold text-slate-800">100% Patient-Centric</div>
                                <div className="text-[11px] text-slate-500">Tailored Recovery Plans</div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* About the Speciality & Clinical Indications Section */}
                {((aboutTitle && aboutDesc) || (whoNeedsTitle && whoNeedsItems.length > 0)) && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mb-24 mt-16"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                            {/* About Card */}
                            {aboutTitle && aboutDesc && (
                                <div className="lg:col-span-5 bg-gradient-to-br from-blue-50/60 via-blue-50/30 to-white border border-blue-100/70 rounded-[2.5rem] p-8 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.02)] relative overflow-hidden group flex flex-col justify-center text-start">
                                    <div className="absolute top-0 left-0 w-2 h-full bg-[#1282b2]" />
                                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 mb-6 w-fit rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-[10px] font-normal uppercase tracking-[0.2em]">
                                        About the Speciality
                                    </span>
                                    <h3 className="text-2xl md:text-3xl font-semibold text-primary-950 tracking-tight mb-6">
                                        {aboutTitle}
                                    </h3>
                                    <div 
                                        className="text-gray-600 text-sm md:text-base leading-relaxed prose prose-slate max-w-none [&>p]:mb-3 text-justify"
                                        dangerouslySetInnerHTML={{ __html: aboutDesc }}
                                    />
                                </div>
                            )}

                            {/* Who May Need Card */}
                            {whoNeedsTitle && whoNeedsItems.length > 0 && (
                                <div className={`${aboutTitle ? 'lg:col-span-7' : 'lg:col-span-12'} bg-gradient-to-br from-emerald-50/40 via-emerald-50/10 to-white border border-emerald-100/50 rounded-[2.5rem] p-8 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.02)] relative overflow-hidden group flex flex-col text-start`}>
                                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 mb-6 w-fit rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-normal uppercase tracking-[0.2em]">
                                        Clinical Indications
                                    </span>
                                    <h3 className="text-2xl md:text-3xl font-semibold text-primary-950 tracking-tight mb-2">
                                        {whoNeedsTitle}
                                    </h3>
                                    {whoNeedsDesc && (
                                        <p className="text-gray-500 text-xs md:text-sm mb-6">
                                            {whoNeedsDesc}
                                        </p>
                                    )}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                                        {whoNeedsItems.map((item, idx) => (
                                            <div key={idx} className="flex items-start gap-3">
                                                <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <CheckCircle2 size={13} className="text-[#1282b2]" />
                                                </div>
                                                <span className="text-gray-600 text-xs md:text-sm leading-snug">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
                {/* Services Under Fracture, Trauma & General Orthopaedic Surgery */}
                {subServicesList.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mb-24 mt-16 bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-50 border border-slate-100/70 rounded-[3.5rem] p-8 md:p-12 lg:p-16 relative overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.01)]"
                    >
                        <div className="absolute top-0 start-0 w-full h-full overflow-hidden z-0 opacity-10 pointer-events-none">
                            <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-[#1282b2]/20 blur-[100px] rounded-full"></div>
                            <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-[#003B73]/20 blur-[100px] rounded-full"></div>
                        </div>

                        <div className="text-start mb-12 relative z-10">
                            <span className="inline-flex items-center px-4 py-1.5 mb-4 rounded-full bg-blue-50 text-[#003B73] text-[10px] font-semibold uppercase tracking-[0.25em] border border-blue-100/50">
                                Specialized Procedures
                            </span>
                            <h2 className="text-3xl md:text-5xl font-montserrat font-bold text-primary-950 mb-6 tracking-tight leading-[1.05]">
                                {service.title === "Fracture & Trauma Surgery" ? "Services Under Fracture, Trauma & General Orthopaedic Surgery" : `Services Under ${service.title}`}
                            </h2>
                            <p className="text-slate-600 max-w-3xl text-base md:text-lg leading-relaxed font-normal">
                                {service.title === "Fracture & Trauma Surgery"
                                    ? "We provide a comprehensive range of orthopedic trauma care, fracture fixation, and rehabilitation planning tailored to help you return to your active lifestyle safely."
                                    : `We provide a comprehensive range of specialized procedures and support options under our ${service.title} care.`}
                            </p>
                        </div>

                        <motion.div 
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-100px" }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"
                        >
                            {subServicesList.map((item, idx) => {
                                const padNumber = String(idx + 1).padStart(2, '0');
                                return (
                                    <motion.div
                                        key={idx}
                                        variants={staggerItem}
                                        whileHover={{ y: -12, scale: 1.03 }}
                                        className="group relative bg-white border border-slate-100 hover:border-blue-200 rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.015)] hover:shadow-2xl transition-all duration-500 text-start flex flex-col justify-between overflow-hidden cursor-default min-h-[260px]"
                                    >
                                        {/* Background large number element */}
                                        <div className="absolute -right-2 -bottom-4 text-8xl font-black text-slate-50 group-hover:-translate-y-2 group-hover:scale-105 select-none pointer-events-none transition-all duration-500 font-sans">
                                            {padNumber}
                                        </div>

                                        <div className="relative z-10 flex flex-col h-full justify-between">
                                            <div>
                                                {/* Decorative Accent Bar */}
                                                <div className="w-12 h-1 bg-[#1282b2] group-hover:w-20 transition-all duration-500 rounded-full mb-6" />
                                                
                                                <div className="flex justify-between items-start mb-4">
                                                    <h3 className="text-lg md:text-xl font-montserrat font-bold text-[#003B73] leading-snug group-hover:translate-x-1.5 transition-transform duration-300">
                                                        {item.title}
                                                    </h3>
                                                    <span className="text-sm font-semibold text-slate-300 group-hover:scale-110 transition-transform duration-300">
                                                        {padNumber}
                                                    </span>
                                                </div>

                                                <p className="text-slate-600 group-hover:text-slate-700 text-xs md:text-sm leading-relaxed text-justify pr-4 transition-colors duration-350">
                                                    {item.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </motion.div>
                )}

                {/* 2a. Custom Conditions managed with this service (Dynamic CMS Template) */}
                {rawService?.conditions && rawService.conditions.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mb-24 mt-16 relative"
                    >
                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
                            <div className="max-w-2xl">
                                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 mb-4 rounded-full bg-primary-50 border border-primary-100 text-[#003B73] text-[10px] font-normal uppercase tracking-[0.2em]">
                                    Conditions managed with {service.title}
                                </span>
                                <h2 className="text-3xl md:text-5xl font-normal text-primary-950 tracking-tighter leading-[1.05] mb-4">
                                    {rawService.conditions_title || "Professional care and targeted recovery options"}
                                </h2>
                            </div>
                            <div className="max-w-md">
                                <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                                    Early, structured specialist-guided treatment is key to joint health and returns you to full activity faster with fewer complications.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {rawService.conditions.map((condition) => (
                                <div
                                    key={condition.id}
                                    className="group bg-primary-600 text-white border border-primary-500 rounded-[2.5rem] p-8 shadow-md hover:-translate-y-1.5 hover:bg-primary-700 hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-white/20 text-white flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white group-hover:text-primary-600 transition-all duration-300 shadow-sm overflow-hidden">
                                        {typeof condition.icon === 'string' ? (
                                            <div 
                                                className="w-[22px] h-[22px] flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:stroke-current"
                                                dangerouslySetInnerHTML={{ __html: condition.icon }} 
                                            />
                                        ) : (
                                            condition.icon
                                        )}
                                    </div>
                                    <h3 className="text-lg font-semibold text-white mb-3 leading-snug">
                                        {condition.title}
                                    </h3>
                                    <div 
                                        className="text-blue-100 text-xs md:text-sm leading-relaxed font-light [&>p]:mb-1 [&>ul]:list-disc [&>ul]:pl-4 [&>ol]:list-decimal [&>ol]:pl-4 [&_a]:text-white [&_a]:underline"
                                        dangerouslySetInnerHTML={{ __html: condition.description }}
                                     />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Journey Section (Dynamic from CMS) */}
                {rawService?.journey_is_active && (
                    <RoboticKneeJourney service={rawService} />
                )}

                {/* 2aa. Custom / Dynamic Detailed Service Sections - CTA & Commonly Treated */}
                {((commonlyTreatedTitle && commonlyTreated.length > 0) || (ctaText.title)) && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mb-24 mt-16 space-y-20"
                    >
                        {/* Struggling with Joint or Back Pain? CTA banner */}
                        {ctaText.title && (
                            <CTABanner title={ctaText.title} subtitle={ctaText.subtitle} />
                        )}

                        {/* Lower row: Fractures & Injuries We Commonly Treat */}
                        {commonlyTreatedTitle && commonlyTreated.length > 0 && (
                            <div className="space-y-8">
                                <div className="max-w-3xl text-start">
                                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 mb-4 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-[10px] font-normal uppercase tracking-[0.2em]">
                                        Treatments & Capabilities
                                    </span>
                                    <h3 className="text-3xl md:text-5xl font-normal text-primary-950 tracking-tighter leading-[1.05] mb-4">
                                        {commonlyTreatedTitle}
                                    </h3>
                                    {commonlyTreatedDesc && (
                                        <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                                            {commonlyTreatedDesc}
                                        </p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {commonlyTreated.map((category, idx) => {
                                        const theme = getThemeClasses(idx);
                                        return (
                                            <div key={idx} className={`group bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.02)] ${theme.hoverBorder} hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-start flex flex-col`}>
                                                <div className={`w-12 h-12 rounded-2xl ${theme.iconBg} flex items-center justify-center mb-6 ${theme.hoverBg} group-hover:text-white transition-all duration-300`}>
                                                    {renderIcon(category.icon, `w-6 h-6 ${theme.iconColor} group-hover:text-white transition-colors`)}
                                                </div>
                                                <h4 className={`text-xl font-semibold text-gray-900 mb-6 ${theme.iconColor} transition-colors`}>
                                                    {category.title}
                                                </h4>
                                                <ul className="space-y-3">
                                                    {(category.items || []).map((item, itemIdx) => (
                                                        <li key={itemIdx} className="flex items-center gap-3 text-gray-600 text-sm">
                                                            <span className={`w-1.5 h-1.5 rounded-full ${theme.dotBg} ${theme.hoverBg} transition-colors`} />
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}

                {/* Second Opinion Section - Placed right above Expertise & Quality / Why Choose Us */}
                {(rawService?.second_opinion_is_active === true || rawService?.second_opinion_is_active === 'true' || rawService?.second_opinion_is_active === 1) && (
                    <SecondOpinionSection 
                        customBadge={rawService?.second_opinion_badge}
                        customTitle={rawService?.second_opinion_title}
                        customDescription={rawService?.second_opinion_description}
                        customItems={rawService?.second_opinions}
                    />
                )}

                {/* 2b. Custom Why Choose Us Value Checklist (Dynamic CMS Template) */}
                {hasChecklist && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24 mt-16 text-start"
                    >
                        {/* Left Column: Why Choose Us info */}
                        <div className="lg:col-span-7 space-y-8">
                            <div>
                                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 mb-4 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-normal uppercase tracking-[0.2em]">
                                    Why choose our {service.title} services
                                </span>
                                <h2 className="text-3xl md:text-5xl font-normal text-primary-950 tracking-tighter leading-[1.05] mb-4">
                                    {checklistTitle}
                                </h2>
                                <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                                    Our clinical approach centers on providing tailored, premium care guided by international medical benchmarks, safety guidelines, and active therapy.
                                </p>
                            </div>

                            <div className="space-y-3.5">
                                {checklistItems.map((item, i) => (
                                    <div key={i} className="flex items-start gap-4 p-4 bg-primary-600 text-white border border-primary-500 rounded-3xl shadow-md hover:bg-primary-700 hover:shadow-lg transition-all duration-300">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center mt-0.5">
                                            <CheckCircle2 size={16} className="fill-white/10" />
                                        </div>
                                        <span className="text-white text-sm md:text-base font-normal leading-relaxed">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Column: Badges & Custom Illustration */}
                        <div className="lg:col-span-5 flex flex-col gap-6 w-full">
                            {(rawService.checklist_image || rawService.slug === 'physiotherapy' || rawService.slug === 'test-physiotherapy' || rawService.slug === 'test-physiotherapy-service') && (
                                <div className="bg-white border border-gray-100 rounded-[3.5rem] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col items-center relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-full blur-3xl pointer-events-none"></div>
                                    
                                    <span className="self-end px-4 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-[10px] font-normal uppercase tracking-[0.2em] mb-6">
                                        UK-trained Orthopaedic Expertise
                                    </span>
                                    
                                    <div className="flex justify-center items-center py-6 group-hover:scale-105 transition-transform duration-500 max-h-72">
                                        {rawService.checklist_image ? (
                                            <img 
                                                src={rawService.checklist_image} 
                                                alt="Value checklist illustration" 
                                                className="max-h-64 w-auto object-contain rounded-2xl"
                                            />
                                        ) : (
                                            <TherapistIllustration />
                                        )}
                                    </div>
                                </div>
                            )}

                            {rawService?.tag_badges && rawService.tag_badges.length > 0 && (
                                <div className="flex flex-wrap gap-3">
                                    {rawService.tag_badges.map((tag, i) => (
                                        <span 
                                            key={i} 
                                            className="bg-white border border-gray-150 rounded-2xl px-5 py-3.5 text-[11px] font-normal uppercase tracking-[0.1em] text-primary-950 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.03)] hover:border-[#003B73] hover:shadow-md transition-all duration-300 cursor-default"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* Custom Highlight Section */}
                {rawService?.highlight_title && <WhyChooseRoboticKnee service={rawService} />}

                {/* CTA Banner - Dynamic Booking Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-24 mt-16"
                >
                    <div className="relative rounded-[3.5rem] overflow-hidden bg-gradient-to-r from-[#003B73] via-[#00569e] to-[#0284c7] py-16 px-8 md:py-20 md:px-16 shadow-2xl">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-40 -mt-40 blur-[100px] pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-400/10 rounded-full -ml-32 -mb-32 blur-[80px] pointer-events-none" />
                        
                        <div className="relative z-10 flex flex-col items-center text-center gap-8">
                            <div className="inline-flex items-center px-5 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-[10px] font-normal uppercase tracking-[0.25em]">
                                <Zap size={12} className="mr-2 fill-yellow-400 text-yellow-400" />
                                Expert {service.title} in Dubai
                            </div>

                            <h2 className="text-2xl md:text-4xl font-normal text-white tracking-tight leading-[1.1] max-w-3xl">
                                Schedule a Consultation with our Consultant Orthopedics Surgeon Today
                            </h2>
                            <p className="text-white/75 text-base md:text-lg font-light max-w-2xl leading-relaxed">
                                Get advanced clinical care and a personalized recovery roadmap tailored to your specific joint and mobility needs.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center gap-5 mt-4 w-full sm:w-auto">
                                <a
                                    href={`tel:${contactPhone}`}
                                    className="w-full sm:w-auto group flex items-center justify-center gap-3 py-4 px-10 bg-white text-[#003B73] font-semibold text-[12px] uppercase tracking-[0.15em] rounded-2xl shadow-xl hover:bg-blue-50 hover:scale-[1.03] active:scale-95 transition-all duration-300"
                                >
                                    <Phone size={18} />
                                    Call Us Now
                                </a>
                                <a
                                    href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full sm:w-auto group flex items-center justify-center gap-3 py-4 px-10 bg-[#25D366] text-white font-semibold text-[12px] uppercase tracking-[0.15em] rounded-2xl shadow-xl hover:bg-[#1eb954] hover:scale-[1.03] active:scale-95 transition-all duration-300"
                                >
                                    <MessageCircle size={18} />
                                    WhatsApp Now
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* FAQ Section */}
                <ServiceFAQSection serviceSlug={id} customFaqs={service.faqs} serviceTitle={service.title} />

                {/* Additional Sections can be added here dynamically from service.items or extra fields */}
            </div>
        </main>
    );
};

const ServiceFAQSection = ({ serviceSlug, customFaqs, serviceTitle }) => {
    const defaultData = defaultServiceFaqs[serviceSlug] || defaultServiceFaqs["physiotherapy"];
    const faqs = (customFaqs && customFaqs.length > 0) ? customFaqs : defaultData.items;
    const badge = defaultData.badge || "Frequently asked questions";
    const defaultTitle = defaultData.title || `Answers to common ${serviceTitle.toLowerCase()} questions`;
    const title = (customFaqs && customFaqs.length > 0) ? `Answers to common ${serviceTitle.toLowerCase()} questions` : defaultTitle;
    const description = defaultData.description || `Helpful information for patients seeking ${serviceTitle.toLowerCase()} treatment.`;

    const [openIndex, setOpenIndex] = useState(0);

    return (
        <div className="relative rounded-[3rem] bg-gradient-to-b from-slate-50 via-blue-50/20 to-slate-50 border border-slate-100 p-8 md:p-16 my-16 font-sans overflow-hidden">
            {/* Soft ambient background glows */}
            <div className="absolute top-0 left-1/3 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-indigo-100/30 rounded-full blur-3xl translate-y-1/2 pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="text-center mb-12">
                    <span className="inline-flex items-center px-4 py-1.5 mb-4 rounded-full bg-blue-50 text-blue-700 text-[10px] font-normal uppercase tracking-[0.3em] border border-blue-100/50">
                        {badge}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-normal text-primary-950 mb-6 tracking-tighter leading-[1.05]">
                        {title}
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-normal">
                        {description}
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => {
                        const isOpen = openIndex === idx;
                        const qText = faq.question || faq.q;
                        const aText = faq.answer || faq.a;
                        return (
                            <div 
                                key={idx} 
                                className={`rounded-3xl transition-all duration-300 border ${
                                    isOpen 
                                    ? 'bg-white border-blue-200 shadow-md shadow-blue-900/5' 
                                    : 'bg-white/80 hover:bg-white border-slate-200/80 hover:border-blue-200 hover:shadow-sm'
                                }`}
                            >
                                <button 
                                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                                    className="w-full flex items-center justify-between p-6 md:p-8 text-start focus:outline-none"
                                >
                                    <span className="text-base md:text-lg font-medium text-[#0A1A44] pr-8">{qText}</span>
                                    <motion.span 
                                        animate={{ rotate: isOpen ? 45 : 0 }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                        className={`text-xl md:text-2xl font-light shrink-0 select-none cursor-pointer w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                                            isOpen 
                                            ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                                            : 'bg-slate-100 text-slate-500'
                                        }`}
                                    >
                                        ＋
                                    </motion.span>
                                </button>
                                
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            <div className="px-6 md:px-8 pb-8">
                                                <p className="text-gray-600 leading-relaxed border-t border-slate-100 pt-6 text-sm md:text-base font-normal">
                                                    {aText}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const WhyChooseRoboticKnee = ({ service }) => {
    return (
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24 mt-16 text-start">
            <div className="lg:col-span-7 space-y-8">
                <div>
                    {service.highlight_badge && (
                        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 mb-4 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-normal uppercase tracking-[0.2em]">
                            {service.highlight_badge}
                        </span>
                    )}
                    <h2 className="text-3xl md:text-5xl font-normal text-primary-950 tracking-tighter leading-[1.05] mb-4">
                        {service.highlight_title}
                    </h2>
                    {service.highlight_description && (
                        <div 
                            className="text-gray-500 text-sm md:text-base leading-relaxed prose prose-slate max-w-none [&>p]:mb-3"
                            dangerouslySetInnerHTML={{ __html: service.highlight_description }}
                        />
                    )}
                </div>
                
                {service.highlight_checklist_items && service.highlight_checklist_items.length > 0 && (
                    <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
                        {service.highlight_checklist_title && (
                            <h3 className="text-2xl font-semibold text-primary-950 tracking-tight mb-6">
                                {service.highlight_checklist_title}
                            </h3>
                        )}
                        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
                            {service.highlight_checklist_items.map((item, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                    </div>
                                    <span className="text-gray-600 text-sm md:text-base leading-snug">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            
            <div className="lg:col-span-5 flex flex-col gap-6 w-full">
                <div className="bg-white border border-gray-100 rounded-[2.5rem] shadow-[0_8px_30px_rgba(0,0,0,0.02)] overflow-hidden relative flex flex-col">
                    <div className="h-32 bg-primary-50 relative"></div>
                    <div className="px-8 pb-10 relative -mt-16 text-center flex-grow flex flex-col">
                        <div className="w-32 h-32 mx-auto rounded-full border-4 border-white shadow-sm overflow-hidden bg-white mb-6">
                            <img 
                                src={service.highlight_doctor_image || "/images/doctor-photo.webp"} 
                                alt={service.highlight_doctor_name || "Doctor"} 
                                onError={(e) => {
                                    e.target.onerror = null; 
                                    e.target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(service.highlight_doctor_name || "Doctor") + "&background=0D8ABC&color=fff&size=200";
                                }}
                                className="w-full h-full object-cover bg-white"
                            />
                        </div>
                        {service.highlight_doctor_name && (
                            <h3 className="text-2xl font-semibold text-primary-950 tracking-tight mb-1">{service.highlight_doctor_name}</h3>
                        )}
                        {service.highlight_doctor_role && (
                            <p className="text-primary-600 font-medium text-sm mb-6">{service.highlight_doctor_role}</p>
                        )}
                        
                        {service.highlight_doctor_badges && service.highlight_doctor_badges.length > 0 && (
                            <div className="flex justify-center gap-2 mb-6 flex-wrap">
                                {service.highlight_doctor_badges.map((badge, i) => (
                                    <span key={i} className="px-3 py-1 rounded-full bg-gray-50 border border-gray-100 text-gray-600 text-[10px] font-normal uppercase tracking-[0.1em]">{badge}</span>
                                ))}
                            </div>
                        )}
                        
                        {service.highlight_doctor_description && (
                            <div 
                                className="text-gray-500 text-sm md:text-base leading-relaxed text-center prose prose-slate max-w-none [&>p]:mb-3"
                                dangerouslySetInnerHTML={{ __html: service.highlight_doctor_description }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetail;
