import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Breadcrumbs from './ui/Breadcrumbs';
import SEO from './SEO';

// Import images
import kneeArthroscopyImg from '../assets/knee-arthroscopy.png';
import jointReplacementImg from '../assets/joint-replacement-bg.png';
import sportsMedicineImg from '../assets/sports-medicine-bg.png';
import spineSurgeryImg from '../assets/spine-surgery-bg.png';
import handWristImg from '../assets/hand-wrist-bg.png';
import footAnkleImg from '../assets/foot-ankle-bg.png';

const extendedDescriptions = {
    "Total/Partial Joint Replacement": {
        content: `Joint replacement surgery is a medical procedure where a damaged joint, such as the knee, hip, or shoulder, is replaced with an artificial implant. It is usually recommended for people with severe joint pain, arthritis, or injury that limits mobility and daily function. The surgery relieves pain, restores function, and improves quality of life. For more insights on joint damage, see our article on <a href='/blog/causes-of-knee-pain' class='text-primary-600 underline font-semibold'>the common causes of knee pain</a>.`,
        features: ["Knee Replacement for Arthritis", "Shoulder Replacement for Athletes", "Hip Replacement Surgeries"],
        image: jointReplacementImg
    },
    "Sports / ACL Injury Management": {
        content: `Sports injury management involves the prevention, diagnosis, treatment, and rehabilitation of injuries caused during physical activities. It focuses on restoring the athlete’s strength, mobility, and performance while minimizing the risk of future injuries. Often faced with <a href='/blog/knee-pain-gym-sports' class='text-primary-600 underline font-semibold'>gym or sports related knee pain</a>, it's crucial to identify if it's a ligament or cartilage issue early on.`,
        features: ["Hamstring Strain in Runners", "Tennis Elbow in Racquet Sports", "Meniscus Tears & ACL Injuries"],
        image: sportsMedicineImg
    },
    "Robotic / Computer Assisted Surgery": {
        content: `Robotic and computer-assisted surgeries represent a cutting-edge approach to joint replacement and orthopedic procedures. These technologies enhance surgical precision, allow for better implant alignment, and contribute to improved outcomes and faster recovery. With real-time navigation and 3D planning, surgeons can customize procedures based on each patient’s anatomy, resulting in more predictable results and long-term joint function.`,
        features: ["Robotic-Assisted Knee Replacement", "Computer-Navigated Hip Surgery", "Precise 3D Surgical Planning"],
        image: null
    },
    "Knee and Shoulder Arthroscopy": {
        content: `Arthroscopic surgery is a minimally invasive procedure used to diagnose and treat joint problems. It involves inserting a small camera, called an arthroscope, into the joint through a tiny incision. Surgeons can view the joint on a screen and perform necessary treatments using miniature instruments. Learn to distinguish different pains in our <a href='/blog/meniscus-tear-vs-strain' class='text-primary-600 underline font-semibold'>Meniscus Tear vs Muscle Strain guide</a>.`,
        features: ["Knee Arthroscopy for Meniscus Tear", "Ankle Arthroscopy for Ligament Damage", "Shoulder Rotation Cuff Repair"],
        image: kneeArthroscopyImg
    },
    "Deformity Corrections / Osteotomies": {
        content: `Deformity corrections and osteotomies involve surgically reshaping or realigning bones to restore proper function and structure of joints. These procedures are often used to treat congenital deformities, bone malalignment after injury, or conditions like arthritis that cause uneven joint loading. By redistributing weight and correcting the mechanical axis of the limb, osteotomies can relieve pain, improve mobility, and delay or prevent joint replacement surgery.`,
        features: ["Knock Knees Correction", "Bow Legs Correction", "Bone Re-alignment"],
        image: null
    },
    "Joint Preservation / Regeneration": {
        content: `Joint preservation and regeneration procedures aim to delay or prevent the need for joint replacement by repairing damaged cartilage and restoring natural joint function. These minimally invasive treatments include platelet-rich plasma (PRP) therapy, stem cell injections, and viscosupplementation. Ideal for early arthritis and cartilage injuries, they reduce pain, promote healing, and support long-term joint health.`,
        features: ["Cartilage Repair Injections", "Biological Treatments for Early Arthritis", "PRP Therapy"],
        image: null
    },
    "Fractures and Trauma Care": {
        content: `Fracture and trauma care involves the immediate and long-term treatment of broken bones and injuries caused by accidents or physical impact. This care includes proper diagnosis through X-rays or scans, immobilization with casts or splints, and surgical intervention if needed. Pain management and rehabilitation play vital roles in full recovery.`,
        features: ["Wrist Fracture from a Fall", "Leg Fracture in a Road Accident", "Complex Trauma Surgeries"],
        image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&auto=format&fit=crop&q=80"
    },
    "Physiotherapy and Rehabilitation": {
        content: `Post-surgical physiotherapy planning is essential for a patient’s full recovery after an operation. It involves designing a structured rehabilitation program to restore movement, strength, and function in the affected area. The plan is personalized based on the type of surgery, patient health, and recovery goals. Many patients can also benefit from <a href='/blog/knee-pain-exercises-desk' class='text-primary-600 underline font-semibold'>simple desk exercises</a> for preventative joint care building into their routine.`,
        features: ["Rehabilitation after Knee Replacement", "Physiotherapy after Spinal Surgery", "Sports Injury Recovery Plans"],
        image: "https://images.unsplash.com/photo-1576091160550-217359f49f4c?w=1200&auto=format&fit=crop&q=80"
    },
    // Dynamically added stand-alone services based on specific URL request overrides
    "Knee Surgery": {
        content: `Knee surgery encompasses a range of specialized procedures to treat injuries, arthritis, and structural issues. We expertly perform everything from minimally invasive arthroscopy for meniscus tears and ACL reconstruction to partial and total knee replacement surgery for severe joint deterioration.`,
        features: ["Robotic Knee Replacement", "ACL & Meniscus Repair", "Cartilage Preservation"],
        image: kneeArthroscopyImg
    },
    "Hip Surgery": {
        content: `Hip surgery focuses on alleviating severe hip pain and restoring function lost to trauma, or degenerative conditions like osteoarthritis. Our procedures include minimally invasive hip arthroscopy, resurfacing, and advanced total hip replacement using state-of-the-art implants for long-lasting mobility.`,
        features: ["Total Hip Replacement", "Hip Resurfacing", "Trauma & Fracture Fixation"],
        image: jointReplacementImg
    },
    "Shoulder Surgery": {
        content: `From rotator cuff tears to recurrent dislocations and advanced shoulder arthritis, our shoulder surgeries are designed to eliminate pain and restore a full range of motion. We specialize in both arthroscopic repairs and complex shoulder joint replacement surgeries for active individuals.`,
        features: ["Rotator Cuff Repair", "Shoulder Arthroscopy", "Shoulder Replacement"],
        image: sportsMedicineImg
    }
};

const serviceSlugs = [
    'joint-pain-treatment',
    'sports-medicine',
    'robotic-surgery',
    'arthroscopy',
    'deformity-correction',
    'consultation',
    'orthopedic-trauma',
    'physiotherapy',
    'knee-surgery',
    'hip-surgery',
    'shoulder-surgery'
];

const slugMap = {
    'joint-pain-treatment': 0,
    'sports-medicine': 1,
    'robotic-surgery': 2,
    'arthroscopy': 3,
    'deformity-correction': 4,
    'consultation': 5,
    'orthopedic-trauma': 6,
    'physiotherapy': 7,
    'knee-surgery': 8,
    'hip-surgery': 9,
    'shoulder-surgery': 10
};

const ServiceDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useLanguage();
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    let serviceIndex = parseInt(id, 10);
    if (isNaN(serviceIndex)) {
        serviceIndex = slugMap[id];
    }
    
    // Explicit title fallbacks for the new standalone SEO pages
    let serviceTitle = t(`services.items.${serviceIndex}.title`);
    let serviceDesc = t(`services.items.${serviceIndex}.desc`);
    
    if (serviceIndex === 8) { serviceTitle = "Knee Surgery"; serviceDesc = "Advanced surgical and arthroscopic treatments for knee injuries and arthritis." }
    if (serviceIndex === 9) { serviceTitle = "Hip Surgery"; serviceDesc = "Comprehensive hip joint preservation, resurfacing, and total replacement." }
    if (serviceIndex === 10) { serviceTitle = "Shoulder Surgery"; serviceDesc = "Specialized surgical repair for rotator cuff, impingement, and shoulder arthritis." }

    // Fallbacks in case translation isn't found
    if (!serviceTitle || isNaN(serviceIndex) || serviceIndex < 0 || serviceIndex > 10) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Service Not Found</h2>
                <Link to="/services" className="text-primary-600 font-bold flex items-center gap-2">
                    <ChevronLeft className="w-5 h-5" /> Back to Services
                </Link>
            </div>
        );
    }

    // Attempt to match english title with the extended dictionary, or fallback if translation changes
    const englishEquivalent = Object.keys(extendedDescriptions)[serviceIndex];
    const details = extendedDescriptions[englishEquivalent] || {};
    
    const image = details.image || "https://images.unsplash.com/photo-1581594632702-52c1cb8d799d?w=1200&auto=format&fit=crop&q=80"; // fallback

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <SEO 
                title={`${serviceTitle} | Dr. Ulhas Sonar`}
                description={serviceDesc}
                url={`/services/${id}`}
                image={image}
            />
            <div className="bg-white border-b border-gray-100">
                <Breadcrumbs items={[
                    { name: t('nav.home'), path: '/' },
                    { name: t('nav.services'), path: '/services' },
                    { name: serviceTitle }
                ]} />
            </div>

            {/* Hero Section */}
            <div className="relative h-[40vh] md:h-[50vh] min-h-[300px] w-full overflow-hidden bg-primary-950">
                <img
                    src={image}
                    alt={serviceTitle}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover opacity-40 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent flex flex-col justify-end">
                    <div className="max-w-4xl mx-auto px-6 pb-12 w-full text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-block px-3 py-1 rounded-full bg-primary-500/20 border border-primary-500/30 text-primary-300 text-[10px] font-bold uppercase tracking-wider mb-6">
                                Specialized Treatment
                            </span>
                            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight font-montserrat tracking-tight">
                                {serviceTitle}
                            </h1>
                        </motion.div>
                    </div>
                </div>

                {/* Back Button */}
                <button
                    onClick={() => navigate('/services')}
                    className="absolute top-24 left-6 md:left-8 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all z-20 group flex items-center gap-2 pe-5"
                >
                    <ChevronLeft className="w-5 h-5" /> 
                    <span className="text-xs font-bold tracking-widest uppercase">Back</span>
                </button>
            </div>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <div className="prose prose-lg prose-primary max-w-none">
                            <h2 className="text-2xl font-bold font-montserrat text-gray-900 mb-6">Overview</h2>
                            <div 
                                className="text-gray-600 leading-relaxed text-lg mb-8 space-y-4"
                                dangerouslySetInnerHTML={{ __html: details.content || serviceDesc }}
                                onClick={(e) => {
                                    if (e.target.tagName === 'A') {
                                        const href = e.target.getAttribute('href');
                                        if (href && href.startsWith('/')) {
                                            e.preventDefault();
                                            navigate(href);
                                            window.scrollTo(0, 0);
                                        }
                                    }
                                }}
                            />
                            
                            <h3 className="text-xl font-bold font-montserrat text-gray-900 mt-12 mb-6">Key Focus Areas</h3>
                            <div className="space-y-4">
                                {details.features && details.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                                        <div className="mt-1">
                                            <CheckCircle2 className="w-5 h-5 text-primary-500" />
                                        </div>
                                        <p className="font-semibold text-gray-700 m-0">{feature}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Practical CTA */}
                        <div className="mt-16 p-8 md:p-10 rounded-[2rem] bg-gradient-to-br from-primary-900 to-primary-950 text-white shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/20 rounded-full blur-[80px]"></div>
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                                <div>
                                    <h3 className="text-2xl font-black font-montserrat mb-2">Need a Consultation?</h3>
                                    <p className="text-primary-100">Schedule an appointment with Dr. Ulhas to discuss your specific condition and treatment options.</p>
                                </div>
                                <Link
                                    to="/contact"
                                    className="w-full md:w-auto px-8 py-4 bg-white text-primary-900 rounded-xl text-center font-black uppercase tracking-widest text-sm hover:bg-gray-50 transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-lg shadow-black/20"
                                >
                                    Book Visit <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32">
                            <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100 mb-8">
                                <h4 className="text-sm font-black font-montserrat text-gray-900 uppercase tracking-widest mb-6 border-b border-gray-200 pb-4">Other Services</h4>
                                <div className="space-y-4">
                                    {Object.keys(extendedDescriptions).map((key, index) => {
                                        if (index === serviceIndex) return null;
                                        // only show a few
                                        return (
                                            <Link 
                                                key={index}
                                                to={`/services/${serviceSlugs[index]}`} className="group block"
                                            >
                                                <h5 className="font-bold text-gray-600 group-hover:text-primary-600 transition-colors line-clamp-2 leading-snug">
                                                    {index === 8 ? "Knee Surgery" : index === 9 ? "Hip Surgery" : index === 10 ? "Shoulder Surgery" : t(`services.items.${index}.title`)}
                                                </h5>
                                            </Link>
                                        );
                                    }).slice(0, 5)}
                                </div>
                                <Link to="/services" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors">
                                    View All Services <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetail;
