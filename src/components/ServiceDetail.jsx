import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, CheckCircle2, ArrowRight, Activity, ShieldCheck, Zap, HeartPulse, ClipboardCheck, Users, HelpCircle, ChevronDown, ChevronUp, Home, Star, RotateCcw, PlusSquare, Triangle, Hexagon, ChevronLeft } from 'lucide-react';
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

// Fallback image
const defaultImage = "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200";

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

// Comprehensive data structure mirroring the physiotherapy page design for each service
const servicesData = {
    'joint-pain-treatment': {
        title: "Total/Partial Joint Replacement",
        seo: { title: "Joint Replacement Surgery in Dubai | Dr. Ulhas Sonar", description: "Advanced total and partial joint replacement for knees, hips, and shoulders to relieve severe arthritis pain." },
        hero: {
            badge: "Expert Joint Care",
            description: "Joint replacement surgery replaces damaged cartilage and bone with advanced artificial implants, relieving pain, restoring natural mobility, and vastly improving your quality of life."
        },
        features: ["Knee Replacement", "Hip Replacement", "Shoulder Surgeries", "Revision Surgeries"],
        image: jointReplacementImg,
        conditions: {
            badge: "Conditions Managed",
            title: "Common Conditions We Treat",
            description: "We provide surgical intervention when conservative treatments no longer provide relief.",
            items: [
                { title: "Osteoarthritis", desc: "Severe wear-and-tear arthritis degrading joint cartilage." },
                { title: "Rheumatoid Arthritis", desc: "Chronic inflammatory arthritis leading to joint destruction." },
                { title: "Avascular Necrosis", desc: "Loss of blood supply to the bone causing bone death." },
                { title: "Post-Traumatic Arthritis", desc: "Arthritis developing after a severe joint injury." }
            ]
        },
        benefits: {
            title: "Benefits of Joint Replacement",
            description: "Modern implants and surgical techniques have made joint replacements more successful and durable than ever.",
            items: ["Significant or complete pain relief", "Restored mobility and function", "Correction of limb deformity", "Long-lasting artificial implants"],
            footer: "Most patients return to their active lifestyles within a few months."
        },
        expertTreatment: {
            title: "Patient-Centered Approach",
            description: "We guide you through the entire process, from pre-surgical optimization to post-operative rehabilitation.",
            categories: ["Pre-op Evaluation", "Precision Surgery", "Fast-Track Rehab"]
        },
        whyChoose: {
            title: "Why Choose Dr. Ulhas Sonar",
            description: "With years of specialized experience in joint arthroplasty, we ensure the highest standards of surgical care.",
            items: ["Minimally invasive techniques for faster recovery", "Use of world-class, premium implants", "Comprehensive pain management protocols"],
            footer: "Dedicated to restoring your active life safely."
        },
        expectations: {
            title: "What to Expect",
            steps: [
                { title: "Consultation & Imaging", desc: "Detailed review of X-rays/MRIs and discussion of surgical options." },
                { title: "Surgical Planning", desc: "Customizing the procedure to your specific anatomy." },
                { title: "The Procedure", desc: "Performed under spinal or general anesthesia, typically taking 1-2 hours." },
                { title: "Recovery", desc: "Early mobilization within hours of surgery and structured physiotherapy." }
            ]
        },
        faqs: {
            title: "Frequently Asked Questions",
            items: [
                { q: "How long does a joint replacement last?", a: "Modern implants can last 15 to 20 years or more, depending on your activity level and weight." },
                { q: "When can I walk after surgery?", a: "Most patients are encouraged to stand and take small steps on the same day or the day after surgery with assistance." },
                { q: "Is the surgery very painful?", a: "We use advanced multimodal pain management protocols to minimize pain and ensure your comfort during recovery." }
            ]
        }
    },
    'sports-medicine': {
        title: "Sports / ACL Injury Management",
        seo: { title: "Sports Medicine & ACL Repair | Dr. Ulhas Sonar", description: "Expert management of sports injuries, meniscus tears, and ACL reconstructions." },
        hero: {
            badge: "Sports Medicine Specialist",
            description: "Specialized care for athletes and active individuals. We focus on diagnosing, treating, and rehabilitating sports injuries to get you back to peak performance safely and quickly."
        },
        features: ["ACL Reconstruction", "Meniscus Repair", "Cartilage Preservation", "Ligament Stabilization"],
        image: sportsMedicineImg,
        conditions: {
            badge: "Injuries Managed",
            title: "Sports Injuries We Treat",
            description: "Comprehensive care for acute traumas and chronic overuse injuries.",
            items: [
                { title: "ACL/PCL Tears", desc: "Cruciate ligament ruptures common in pivoting sports." },
                { title: "Meniscus Tears", desc: "Damage to the shock-absorbing cartilage in the knee." },
                { title: "Rotator Cuff Injuries", desc: "Tears in the shoulder tendons causing pain and weakness." },
                { title: "Tennis/Golfer's Elbow", desc: "Overuse tendonitis in the elbow joint." }
            ]
        },
        benefits: {
            title: "Benefits of Specialized Care",
            description: "Proper management of sports injuries prevents long-term joint damage and chronic instability.",
            items: ["Accurate biomechanical diagnosis", "Minimally invasive arthroscopic repairs", "Customized return-to-play protocols", "Prevention of early-onset arthritis"],
            footer: "Your athletic goals are our primary focus."
        },
        expertTreatment: {
            title: "Complete Athlete Care",
            description: "We don't just treat the injury; we treat the athlete, ensuring a safe return to sports.",
            categories: ["Accurate Diagnostics", "Surgical/Non-Surgical Care", "Sports Rehabilitation"]
        },
        whyChoose: {
            title: "Why Choose Us",
            description: "Understanding the unique physical demands of different sports allows us to tailor our surgical techniques and rehab protocols.",
            items: ["Experience treating professional and recreational athletes", "Advanced arthroscopic (keyhole) techniques", "Collaboration with elite physiotherapists"],
            footer: "We bridge the gap between injury and peak performance."
        },
        expectations: {
            title: "The Treatment Journey",
            steps: [
                { title: "Acute Injury Assessment", desc: "Clinical examination and MRI to determine the extent of damage." },
                { title: "Treatment Strategy", desc: "Deciding between conservative rehab or surgical intervention." },
                { title: "Surgical Repair", desc: "Anatomical reconstruction using state-of-the-art minimally invasive techniques." },
                { title: "Return to Sport", desc: "A phased, goal-oriented rehabilitation program." }
            ]
        },
        faqs: {
            title: "Frequently Asked Questions",
            items: [
                { q: "Do all ACL tears require surgery?", a: "Not necessarily. Less active individuals may cope with physiotherapy, but active individuals or those experiencing knee instability usually require reconstruction." },
                { q: "How long is the recovery from ACL surgery?", a: "A full return to cutting/pivoting sports typically takes 9 to 12 months of dedicated rehabilitation." },
                { q: "Can a meniscus tear heal on its own?", a: "Small tears in the vascular 'red zone' may heal, but most tears require arthroscopic trimming or repair to relieve symptoms." }
            ]
        }
    },
    'robotic-surgery': {
        title: "Robotic / Computer Assisted Surgery",
        seo: { title: "Robotic Joint Replacement Surgery | Dr. Ulhas Sonar", description: "State-of-the-art robotic and computer-navigated orthopedic surgeries for enhanced precision." },
        hero: {
            badge: "Advanced Technology",
            description: "Cutting-edge robotic systems and 3D computer navigation allow for sub-millimeter precision during joint replacement, leading to a more natural-feeling joint and faster recovery."
        },
        features: ["Robotic Knee Replacement", "Computer Navigation", "3D Surgical Planning", "Bone Preservation"],
        image: defaultImage,
        conditions: {
            badge: "Procedures",
            title: "Where We Use Robotics",
            description: "Technology is utilized in complex reconstructions where precision is paramount.",
            items: [
                { title: "Total Knee Arthroplasty", desc: "Perfecting alignment and ligament balance." },
                { title: "Partial Knee Arthroplasty", desc: "Targeting only the damaged compartment." },
                { title: "Total Hip Arthroplasty", desc: "Optimizing cup placement to prevent dislocation." },
                { title: "Complex Revisions", desc: "Navigating altered anatomy from previous surgeries." }
            ]
        },
        benefits: {
            title: "Why Choose Robotic Surgery",
            description: "Robotic assistance eliminates human error in bone cuts and implant positioning.",
            items: ["Personalized 3D surgical planning", "Less soft tissue damage and bone removal", "More natural joint kinematics (feeling)", "Potentially faster recovery and less pain"],
            footer: "The perfect synergy of surgical expertise and technological precision."
        },
        expertTreatment: {
            title: "Next-Generation Care",
            description: "Dr. Ulhas is trained in the latest navigated surgical protocols.",
            categories: ["CT-Based 3D Mapping", "Real-time Feedback", "Enhanced Accuracy"]
        },
        whyChoose: {
            title: "Why Choose Us",
            description: "While robots are tools, the surgeon's expertise dictates the outcome. We combine extensive anatomical knowledge with robotic precision.",
            items: ["Certified in robotic and navigated platforms", "Comprehensive preoperative digital templating", "Commitment to minimally invasive principles"],
            footer: "Leading the future of orthopedic surgery in Dubai."
        },
        expectations: {
            title: "What to Expect",
            steps: [
                { title: "Advanced Imaging", desc: "A specialized CT or MRI scan creates a 3D model of your joint." },
                { title: "Virtual Surgery", desc: "The surgeon plans the exact implant size and position digitally before the actual procedure." },
                { title: "Robotic Execution", desc: "During surgery, the robotic arm assists the surgeon in executing the plan with pinpoint accuracy." },
                { title: "Accelerated Rehab", desc: "Less tissue trauma often translates to a faster and less painful recovery phase." }
            ]
        },
        faqs: {
            title: "Frequently Asked Questions",
            items: [
                { q: "Does the robot do the surgery by itself?", a: "No. The surgeon is always in 100% control. The robotic arm simply acts as a highly precise tool to guide the surgeon's instruments based on the digital plan." },
                { q: "Is robotic surgery safe?", a: "Yes, it is extremely safe and has been shown to reduce outliers in implant malalignment compared to traditional manual techniques." },
                { q: "Am I a candidate for robotic joint replacement?", a: "Most patients requiring a primary joint replacement are excellent candidates for robotic-assisted surgery." }
            ]
        }
    },
    'arthroscopy': {
        title: "Knee and Shoulder Arthroscopy",
        seo: { title: "Knee & Shoulder Arthroscopy | Dr. Ulhas Sonar", description: "Minimally invasive keyhole surgery for joint pain, meniscus tears, and rotator cuff injuries." },
        hero: {
            badge: "Keyhole Surgery",
            description: "Arthroscopy is a minimally invasive technique using a tiny camera and instruments to diagnose and treat joint problems, resulting in smaller scars, less pain, and quicker healing."
        },
        features: ["Diagnostic Arthroscopy", "Meniscectomy / Repair", "Rotator Cuff Repair", "Labral Repair"],
        image: kneeArthroscopyImg,
        conditions: {
            badge: "Conditions Treated",
            title: "Problems Resolved with Arthroscopy",
            description: "Many intra-articular issues can be treated without large open incisions.",
            items: [
                { title: "Meniscus Tears", desc: "Trimming or repairing damaged knee cartilage." },
                { title: "Shoulder Impingement", desc: "Removing bone spurs causing shoulder pain." },
                { title: "Loose Bodies", desc: "Removing floating bone or cartilage fragments." },
                { title: "Recurrent Dislocations", desc: "Tightening torn ligaments to stabilize the joint." }
            ]
        },
        benefits: {
            title: "Benefits of Keyhole Surgery",
            description: "Compared to traditional open surgery, arthroscopy offers significant advantages.",
            items: ["Minimal scarring (incisions are ~1cm)", "Reduced postoperative pain", "Lower risk of infection", "Faster return to work and sports"],
            footer: "Most procedures are performed on a day-care basis."
        },
        expertTreatment: {
            title: "Surgical Excellence",
            description: "Utilizing high-definition cameras and specialized micro-instruments.",
            categories: ["Day Surgery", "Minimal Pain", "Fast Recovery"]
        },
        whyChoose: {
            title: "Why Choose Dr. Ulhas",
            description: "Extensive experience in advanced arthroscopic techniques for complex joint reconstructions.",
            items: ["High volume of successful arthroscopic procedures", "Use of latest absorbable anchors and sutures", "Detailed post-operative rehab guidance"],
            footer: "Maximizing function while minimizing tissue trauma."
        },
        expectations: {
            title: "What to Expect",
            steps: [
                { title: "Evaluation", desc: "Clinical examination and MRI review to confirm the need for arthroscopy." },
                { title: "The Procedure", desc: "Performed through 2-3 tiny punctures. You can often watch the procedure on a monitor if awake." },
                { title: "Discharge", desc: "You will typically go home the same day with specific instructions." },
                { title: "Rehabilitation", desc: "A tailored physical therapy plan begins shortly after surgery to restore motion." }
            ]
        },
        faqs: {
            title: "Frequently Asked Questions",
            items: [
                { q: "Will I need crutches after knee arthroscopy?", a: "It depends on the procedure. For a simple meniscus trim, you may walk the same day. For a meniscus repair or ACL reconstruction, crutches are required for a few weeks." },
                { q: "How long does the surgery take?", a: "Most arthroscopic procedures take between 30 minutes to 2 hours, depending on the complexity." },
                { q: "Is it done under general anesthesia?", a: "It can be done under general, spinal, or sometimes local anesthesia, depending on the joint and the extent of the surgery." }
            ]
        }
    },
    'deformity-correction': {
        title: "Deformity Corrections / Osteotomies",
        seo: { title: "Deformity Correction & Osteotomy | Dr. Ulhas Sonar", description: "Surgical realignment of bones (bow legs, knock knees) to restore mechanics and delay arthritis." },
        hero: {
            badge: "Joint Preservation",
            description: "Osteotomy involves surgically cutting and realigning bone to correct mechanical axis deformities like bow legs or knock knees, offloading damaged cartilage and preserving your natural joint."
        },
        features: ["High Tibial Osteotomy (HTO)", "Distal Femoral Osteotomy", "Limb Lengthening", "Trauma Deformity Correction"],
        image: defaultImage,
        conditions: {
            badge: "Conditions Managed",
            title: "When is Osteotomy Needed?",
            description: "Correcting alignment to prevent or delay the need for joint replacement.",
            items: [
                { title: "Genu Varum (Bow Legs)", desc: "Outward bowing causing medial knee arthritis." },
                { title: "Genu Valgum (Knock Knees)", desc: "Inward angling causing lateral knee arthritis." },
                { title: "Malunions", desc: "Bones that have healed crookedly after a fracture." },
                { title: "Congenital Deformities", desc: "Structural abnormalities present from birth." }
            ]
        },
        benefits: {
            title: "Benefits of Realignment",
            description: "By shifting weight from the damaged area to healthy cartilage, we can prolong the life of your joint.",
            items: ["Preserves your natural knee joint", "Delays or prevents the need for artificial replacement", "Allows return to high-impact activities", "Improves cosmetic appearance and gait"],
            footer: "An excellent option for young, active patients with localized arthritis."
        },
        expertTreatment: {
            title: "Precision Realignment",
            description: "Accurate preoperative planning is critical for exact degree correction.",
            categories: ["Digital Templating", "Custom Plates/Screws", "Biomechanical Balance"]
        },
        whyChoose: {
            title: "Why Choose Us",
            description: "Osteotomies require complex biomechanical calculations and precise surgical execution.",
            items: ["Expertise in complex limb reconstruction", "Use of advanced fixation devices (locking plates)", "Careful patient selection to ensure success"],
            footer: "Restoring the natural mechanics of your body."
        },
        expectations: {
            title: "The Treatment Journey",
            steps: [
                { title: "Full Leg X-Rays", desc: "Special standing X-rays are taken to measure your mechanical axis precisely." },
                { title: "Surgical Correction", desc: "The bone is carefully cut, realigned, and stabilized with a metal plate and screws." },
                { title: "Bone Healing", desc: "You will have a period of restricted weight-bearing while the bone heals (usually 6-8 weeks)." },
                { title: "Full Recovery", desc: "Return to normal activities and sports once the bone is fully consolidated." }
            ]
        },
        faqs: {
            title: "Frequently Asked Questions",
            items: [
                { q: "Is the metal plate left in forever?", a: "The plate can be left in permanently. However, if it causes irritation under the skin, it can be removed in a minor procedure after 1-2 years once the bone is fully healed." },
                { q: "Can I run after an osteotomy?", a: "Yes. Unlike a joint replacement, an osteotomy preserves your natural joint, allowing many patients to return to running and high-impact sports." },
                { q: "How long is the recovery?", a: "Complete bone healing takes 3-4 months, but most patients are walking normally without crutches by 6-8 weeks." }
            ]
        }
    },
    'consultation': {
        title: "Expert Consultation",
        seo: { title: "Orthopedic Consultation Dubai | Dr. Ulhas Sonar", description: "Book an expert consultation with Dr. Ulhas Sonar for accurate diagnosis and personalized treatment plans." },
        hero: {
            badge: "Expert Diagnosis",
            description: "A proper cure begins with an accurate diagnosis. During your consultation, we spend the time needed to understand your pain, review your imaging, and formulate a clear, personalized treatment plan."
        },
        features: ["Detailed Clinical Exam", "Imaging Review (MRI/X-ray)", "Second Opinions", "Personalized Treatment Plans"],
        image: defaultImage,
        conditions: {
            badge: "What We Cover",
            title: "Comprehensive Evaluations",
            description: "We consult on a wide spectrum of musculoskeletal issues.",
            items: [
                { title: "Chronic Joint Pain", desc: "Unexplained or persistent pain in knees, hips, or shoulders." },
                { title: "Sports Injuries", desc: "Acute injuries sustained during physical activity." },
                { title: "Surgical Second Opinions", desc: "Evaluating if surgery is truly the best or only option." },
                { title: "Arthritis Management", desc: "Creating long-term plans to preserve joint health." }
            ]
        },
        benefits: {
            title: "The Value of Expert Consultation",
            description: "Making the right decision early saves time, money, and prevents further injury.",
            items: ["Clear explanation of your condition in simple terms", "Exploration of all non-surgical options first", "Honest assessment of surgical risks and benefits", "Direct access to the primary surgeon"],
            footer: "Empowering you to make informed decisions about your health."
        },
        expertTreatment: {
            title: "Our Philosophy",
            description: "We believe in treating the patient, not just the MRI scan.",
            categories: ["Patient Listening", "Evidence-Based", "Holistic Approach"]
        },
        whyChoose: {
            title: "Why Choose Dr. Ulhas",
            description: "Dr. Ulhas brings international experience (UK, UAE) and a compassionate approach to every consultation.",
            items: ["Extensive time spent with each patient", "No rushed appointments or immediate push for surgery", "Transparent discussion of outcomes"],
            footer: "Your comfort and understanding are our priority."
        },
        expectations: {
            title: "What to Expect",
            steps: [
                { title: "History Taking", desc: "A detailed discussion of your symptoms, lifestyle, and medical history." },
                { title: "Physical Examination", desc: "Clinical tests to assess range of motion, strength, and stability." },
                { title: "Imaging Review", desc: "We review your X-rays or MRIs with you, explaining what they show." },
                { title: "Treatment Plan", desc: "We provide a step-by-step plan, starting with conservative measures if possible." }
            ]
        },
        faqs: {
            title: "Frequently Asked Questions",
            items: [
                { q: "Should I bring my old X-rays and MRI reports?", a: "Yes, please bring all previous imaging on a CD or USB, along with the printed reports, as well as any previous surgical records." },
                { q: "Do I need an MRI before I see you?", a: "Not always. A clinical examination is the first step. If an MRI is needed, we will order the correct type of scan after evaluating you." },
                { q: "How long does a consultation last?", a: "An initial consultation typically lasts 20-30 minutes, ensuring ample time for examination and answering all your questions." }
            ]
        }
    },
    'orthopedic-trauma': {
        title: "Fractures and Trauma Care",
        seo: { title: "Orthopedic Trauma & Fracture Fixation | Dr. Ulhas Sonar", description: "Expert surgical and conservative care for bone fractures, dislocations, and complex orthopedic trauma." },
        hero: {
            badge: "Trauma Specialist",
            description: "Accidents happen. We provide expert, timely care for bone fractures, dislocations, and complex soft tissue trauma using the latest fixation techniques to restore anatomy and function."
        },
        features: ["Complex Fracture Fixation", "Minimally Invasive Plating", "Joint Dislocations", "Post-Trauma Reconstruction"],
        image: defaultImage,
        conditions: {
            badge: "Trauma Managed",
            title: "Injuries We Treat",
            description: "Comprehensive management of upper and lower limb trauma.",
            items: [
                { title: "Periarticular Fractures", desc: "Complex fractures extending into the joint space." },
                { title: "Long Bone Fractures", desc: "Breaks in the femur, tibia, humerus, or radius." },
                { title: "Wrist and Ankle Fractures", desc: "Common injuries from falls or sports." },
                { title: "Non-unions", desc: "Fractures that have failed to heal properly over time." }
            ]
        },
        benefits: {
            title: "Benefits of Expert Trauma Care",
            description: "Proper initial fixation is crucial for long-term functional recovery.",
            items: ["Anatomical restoration of joints to prevent arthritis", "Stable fixation allowing early movement", "Minimally invasive techniques to protect blood supply", "Comprehensive rehabilitation planning"],
            footer: "Minimizing the long-term impact of severe injuries."
        },
        expertTreatment: {
            title: "Advanced Fixation",
            description: "Using modern titanium implants, locking plates, and intramedullary nails.",
            categories: ["Immediate Care", "Surgical Precision", "Guided Healing"]
        },
        whyChoose: {
            title: "Why Choose Us",
            description: "Trauma surgery requires rapid decision making and mastery of complex anatomy.",
            items: ["Experience with high-velocity trauma", "Expertise in managing complex fractures around joints", "Dedicated follow-up until complete bone union"],
            footer: "Reliable care when you need it most."
        },
        expectations: {
            title: "The Treatment Journey",
            steps: [
                { title: "Emergency Assessment", desc: "Immediate splinting, pain relief, and necessary CT/X-ray imaging." },
                { title: "Surgical Stabilization", desc: "If displaced, the bones are realigned and fixed with plates, screws, or rods." },
                { title: "Immobilization & Healing", desc: "A period of protected weight-bearing using casts or braces." },
                { title: "Rehabilitation", desc: "Aggressive physiotherapy to prevent stiffness and restore muscle strength." }
            ]
        },
        faqs: {
            title: "Frequently Asked Questions",
            items: [
                { q: "Will I definitely need surgery for a broken bone?", a: "No. Many fractures that are well-aligned (undisplaced) can be treated conservatively with a cast or brace. Surgery is for displaced or unstable fractures." },
                { q: "Will the metal hardware set off airport security?", a: "Modern orthopedic implants are made of titanium or surgical steel and rarely set off airport metal detectors." },
                { q: "How long does a bone take to heal?", a: "Most bones take 6 to 12 weeks to heal structurally, but full functional recovery (muscle strength and joint mobility) can take up to a year." }
            ]
        }
    },
    'physiotherapy': {
        // Handled by the redirect or fallback, but data included just in case
        title: "Physiotherapy and Rehabilitation",
        seo: { title: "Physiotherapy & Rehab | Dr. Ulhas Sonar", description: "Expert physiotherapy and post-operative rehabilitation services." },
        hero: { badge: "Rehabilitation", description: "Comprehensive physiotherapy to restore movement and function." },
        features: ["Post-Op Rehab", "Sports Physio", "Pain Management", "Mobility Training"],
        image: defaultImage,
        conditions: { badge: "Conditions", title: "Conditions Managed", description: "", items: [] },
        benefits: { title: "", description: "", items: [], footer: "" },
        expertTreatment: { title: "", description: "", categories: [] },
        whyChoose: { title: "", description: "", items: [], footer: "" },
        expectations: { title: "", steps: [] },
        faqs: { title: "", items: [] }
    },
    'knee-surgery': {
        title: "Knee Surgery",
        seo: { title: "Expert Knee Surgery in Dubai | Dr. Ulhas Sonar", description: "Advanced knee treatments including arthroscopy, ligament repair, and robotic knee replacements." },
        hero: {
            badge: "Knee Specialist",
            description: "From sports injuries in young athletes to severe arthritis in seniors, we offer a comprehensive spectrum of knee surgeries to eliminate pain and restore stability and motion."
        },
        features: ["Robotic Knee Replacement", "ACL Reconstruction", "Meniscus Repair", "Cartilage Transplants"],
        image: kneeArthroscopyImg,
        conditions: {
            badge: "Knee Conditions",
            title: "Common Knee Problems We Treat",
            description: "We address all structural and degenerative issues of the knee joint.",
            items: [
                { title: "Knee Osteoarthritis", desc: "Degradation of joint cartilage causing bone-on-bone friction." },
                { title: "Ligament Tears", desc: "Injuries to the ACL, PCL, MCL, or LCL causing instability." },
                { title: "Patellar Dislocation", desc: "Kneecap shifting out of its groove repeatedly." },
                { title: "Cartilage Defects", desc: "Localized craters in the cartilage from trauma or wear." }
            ]
        },
        benefits: {
            title: "Goals of Knee Surgery",
            description: "Our interventions aim to return you to your desired level of activity.",
            items: ["Eradicate chronic knee pain", "Restore joint stability for sports", "Correct leg alignment (bow legs/knock knees)", "Preserve natural joint tissues whenever possible"],
            footer: "Customized solutions for every stage of knee disease."
        },
        expertTreatment: {
            title: "Comprehensive Knee Care",
            description: "Offering the latest in biologic, arthroscopic, and robotic treatments.",
            categories: ["Joint Preservation", "Ligament Reconstruction", "Total Arthroplasty"]
        },
        whyChoose: {
            title: "Why Choose Dr. Ulhas",
            description: "A deep sub-specialty focus on knee mechanics and surgery ensures optimal outcomes.",
            items: ["Extensive experience in complex multi-ligament knee reconstructions", "Pioneer in robotic-assisted knee replacements", "Focus on rapid recovery protocols"],
            footer: "Your knees carry you through life; we make sure they can."
        },
        expectations: {
            title: "The Treatment Journey",
            steps: [
                { title: "Diagnosis", desc: "Precise clinical exam combined with high-resolution MRI or weight-bearing X-rays." },
                { title: "Decision Making", desc: "Collaboratively choosing between conservative care, biological injections, or surgery." },
                { title: "Surgical Intervention", desc: "Performed using the least invasive technique necessary for the best result." },
                { title: "Rehabilitation", desc: "A strict protocol to regain full extension, flexion, and quadriceps strength." }
            ]
        },
        faqs: {
            title: "Frequently Asked Questions",
            items: [
                { q: "What is the difference between partial and total knee replacement?", a: "A partial replacement only resurfaces the diseased part of the knee (usually the inner compartment), saving healthy bone and ligaments. A total replacement resurfaces the entire joint." },
                { q: "Can I kneel after knee surgery?", a: "After arthroscopy, yes. After a knee replacement, kneeling is possible but can feel unnatural or uncomfortable for some patients." },
                { q: "Is 'water on the knee' dangerous?", a: "Swelling (effusion) is a symptom of an underlying problem, like a meniscus tear or arthritis. While the fluid itself isn't dangerous, the root cause needs to be diagnosed and treated." }
            ]
        }
    },
    'hip-surgery': {
        title: "Hip Surgery",
        seo: { title: "Advanced Hip Surgery in Dubai | Dr. Ulhas Sonar", description: "Specialized hip surgeries including total hip replacement and management of hip fractures/arthritis." },
        hero: {
            badge: "Hip Specialist",
            description: "Hip pain can severely limit your daily life. We specialize in advanced hip preservation and total hip replacement surgeries designed to offer immediate pain relief and long-lasting mobility."
        },
        features: ["Total Hip Replacement", "Hip Resurfacing", "Avascular Necrosis Treatment", "Trauma Fixation"],
        image: jointReplacementImg,
        conditions: {
            badge: "Hip Conditions",
            title: "Hip Problems We Treat",
            description: "Addressing conditions that cause groin, thigh, or buttock pain.",
            items: [
                { title: "Hip Osteoarthritis", desc: "Wear and tear of the hip ball and socket joint." },
                { title: "Avascular Necrosis (AVN)", desc: "Bone death in the femoral head due to poor blood supply." },
                { title: "Hip Fractures", desc: "Breaks in the upper femur, common in the elderly." },
                { title: "Femoroacetabular Impingement (FAI)", desc: "Bone spurs causing friction during movement." }
            ]
        },
        benefits: {
            title: "Benefits of Hip Surgery",
            description: "Hip replacement is often considered one of the most successful operations in modern medicine.",
            items: ["Immediate and dramatic pain relief", "Restoration of a normal walking gait", "Correction of leg length discrepancies", "Return to activities like golf, swimming, and cycling"],
            footer: "Reclaiming your independence and mobility."
        },
        expertTreatment: {
            title: "Advanced Hip Care",
            description: "We utilize approaches that minimize muscle damage and speed up recovery.",
            categories: ["Precise Component Positioning", "Dual Mobility Implants", "Rapid Recovery"]
        },
        whyChoose: {
            title: "Why Choose Dr. Ulhas",
            description: "Hip surgery requires exact precision to ensure stability and equal leg lengths.",
            items: ["Use of advanced computer navigation for accurate implant placement", "Expertise in complex primary and revision hip surgeries", "Focus on tissue-sparing surgical approaches"],
            footer: "Precision engineering for your body."
        },
        expectations: {
            title: "The Treatment Journey",
            steps: [
                { title: "Assessment", desc: "Evaluating your gait, range of motion, and X-rays to assess joint space loss." },
                { title: "Digital Templating", desc: "Planning the exact size and angle of the hip implants on a computer before surgery." },
                { title: "Surgery", desc: "Removing the diseased bone and replacing it with a ceramic or metal/plastic implant." },
                { title: "Recovery", desc: "Walking on the same day of surgery, with a rapid return to daily activities." }
            ]
        },
        faqs: {
            title: "Frequently Asked Questions",
            items: [
                { q: "What precautions do I need after a hip replacement?", a: "Depending on the surgical approach, you may need to avoid bending your hip past 90 degrees or crossing your legs for the first 6 weeks to prevent dislocation." },
                { q: "How long will a new hip last?", a: "With modern materials like highly cross-linked polyethylene and ceramics, hip replacements are expected to last 20 to 25 years or more." },
                { q: "Can I play sports after a hip replacement?", a: "Low-impact sports like swimming, cycling, golf, and doubles tennis are highly encouraged. High-impact sports like running or singles tennis may wear out the implant faster." }
            ]
        }
    },
    'shoulder-surgery': {
        title: "Shoulder Surgery",
        seo: { title: "Expert Shoulder Surgery in Dubai | Dr. Ulhas Sonar", description: "Comprehensive surgical treatments for rotator cuff tears, shoulder dislocations, and arthritis." },
        hero: {
            badge: "Shoulder Specialist",
            description: "The shoulder has the greatest range of motion of any joint, making it vulnerable to injury. We offer advanced arthroscopic repairs and shoulder replacements to restore function and eliminate pain."
        },
        features: ["Rotator Cuff Repair", "Shoulder Dislocation Stabilization", "Total Shoulder Replacement", "Reverse Shoulder Replacement"],
        image: spineSurgeryImg, // Using spine/back as fallback or we can use sportsMedicineImg
        conditions: {
            badge: "Shoulder Conditions",
            title: "Shoulder Problems We Treat",
            description: "Expert care for instability, tendon tears, and arthritis.",
            items: [
                { title: "Rotator Cuff Tears", desc: "Tears in the tendons that lift and rotate the arm." },
                { title: "Shoulder Instability", desc: "Recurrent dislocations or subluxations." },
                { title: "Frozen Shoulder", desc: "Severe stiffness and pain in the shoulder capsule." },
                { title: "Shoulder Arthritis", desc: "Degradation of cartilage in the glenohumeral joint." }
            ]
        },
        benefits: {
            title: "Benefits of Shoulder Surgery",
            description: "Restoring the mechanics of the shoulder complex is vital for upper body function.",
            items: ["Restored ability to lift the arm overhead", "Elimination of night pain that disrupts sleep", "Prevention of further joint dislocation", "Return to sports like tennis, swimming, and weightlifting"],
            footer: "Regain strength and pain-free motion."
        },
        expertTreatment: {
            title: "Advanced Shoulder Care",
            description: "Utilizing the latest keyhole techniques and modern implant designs.",
            categories: ["Arthroscopic Repair", "Reverse Arthroplasty", "Targeted Rehab"]
        },
        whyChoose: {
            title: "Why Choose Dr. Ulhas",
            description: "Shoulder mechanics are highly complex and require specialized expertise to reconstruct.",
            items: ["Extensive experience in all-arthroscopic rotator cuff repairs", "Expertise in Reverse Shoulder Replacements for complex cases", "Collaborative approach with specialized shoulder physiotherapists"],
            footer: "Specialized care for complex joints."
        },
        expectations: {
            title: "The Treatment Journey",
            steps: [
                { title: "Clinical Exam & MRI", desc: "Detailed assessment of rotator cuff integrity and joint stability." },
                { title: "Surgical Intervention", desc: "Mostly performed arthroscopically through tiny incisions using suture anchors." },
                { title: "Immobilization", desc: "Wearing a specialized sling for 4-6 weeks to allow tendons to heal to the bone." },
                { title: "Phased Rehabilitation", desc: "A progressive physio program moving from passive motion to active strengthening over several months." }
            ]
        },
        faqs: {
            title: "Frequently Asked Questions",
            items: [
                { q: "Why is shoulder surgery recovery so long?", a: "Tendons have a poor blood supply and take a long time to biologically heal back into the bone. Rushing the recovery can cause the repair to fail." },
                { q: "What is a Reverse Shoulder Replacement?", a: "It is a special type of implant used when a patient has arthritis combined with an irreparable rotator cuff tear. It relies on the deltoid muscle, rather than the rotator cuff, to lift the arm." },
                { q: "Can a frozen shoulder be cured without surgery?", a: "Yes, the vast majority of frozen shoulders resolve with physiotherapy, corticosteroid injections, and time. Surgery is only a last resort for severe, stubborn cases." }
            ]
        }
    }
};

const ServiceDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t, language } = useLanguage();
    const isRtl = language === 'AR';
    
    // Redirect old numerical IDs to the new slug-based URLs
    const numericalId = parseInt(id, 10);
    if (!isNaN(numericalId) && numericalId >= 0 && numericalId < serviceSlugs.length) {
        return <Navigate to={`/services/${serviceSlugs[numericalId]}`} replace />;
    }

    if (id === 'physiotherapy') {
        return <Navigate to={`/services/physiotherapy-home-services`} replace />;
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const content = servicesData[id];

    if (!content) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Service Not Found</h2>
                <Link to="/services" className="text-primary-600 font-medium flex items-center gap-2">
                    <ChevronLeft className="w-5 h-5" /> Back to Services
                </Link>
            </div>
        );
    }

    return (
        <main className="relative pt-20 bg-white overflow-hidden">
            <SEO 
                title={content.seo.title}
                description={content.seo.description}
                url={`/services/${id}`}
            />

            <div className="bg-white border-b border-gray-100">
                <Breadcrumbs items={[
                    { name: t('nav.home'), path: '/' },
                    { name: t('nav.services'), path: '/services' },
                    { name: content.title }
                ]} />
            </div>

            {/* Premium Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary-50/30 rounded-full blur-[120px] -mr-40 -mt-40"></div>
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-50/40 rounded-full blur-[120px] -ml-40 -mb-40"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 lg:py-24">
                {/* Redesigned Hero Section - 2 Columns */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
                    {/* Left Column: Content & Features */}
                    <motion.div
                        initial={{ opacity: 0, x: isRtl ? 40 : -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-[10px] font-normal uppercase tracking-[0.3em]"
                        >
                            <Zap size={12} className="fill-primary-600" />
                            {content.hero.badge}
                        </motion.div>

                        <h1 className="text-3xl md:text-5xl font-normal text-primary-950 mb-6 tracking-tighter leading-[1.05]">
                            {content.title}
                        </h1>

                        <p className="text-base md:text-lg text-gray-500 font-normal leading-relaxed mb-10 max-w-2xl">
                            {content.hero.description}
                        </p>

                        {/* Feature Highlights Grid (2x2) */}
                        <div className="grid sm:grid-cols-2 gap-4 mb-10">
                            {[
                                { icon: ShieldCheck, text: content.features[0] },
                                { icon: Activity, text: content.features[1] },
                                { icon: HeartPulse, text: content.features[2] },
                                { icon: Star, text: content.features[3] }
                            ].map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50/80 backdrop-blur-sm border border-gray-100 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-300">
                                    <div className="w-10 h-10 rounded-xl bg-white text-primary-600 flex items-center justify-center shadow-sm flex-shrink-0">
                                        <feature.icon size={20} strokeWidth={2.5} />
                                    </div>
                                    <span className="text-xs font-normal text-gray-700 leading-tight">
                                        {feature.text}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Dual Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <a 
                                href="tel:+971551053445"
                                className="w-full sm:w-auto group flex items-center justify-center gap-3 py-4 px-10 bg-[#003B73] text-white font-normal text-[11px] uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-primary-200 hover:bg-[#002B55] hover:shadow-2xl hover:shadow-primary-300 active:scale-95 transition-all duration-300"
                            >
                                <Phone size={18} />
                                Call Us Now
                            </a>
                            <a 
                                href="https://wa.me/971551053445"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto group flex items-center justify-center gap-3 py-4 px-10 bg-[#25D366] text-white font-normal text-[11px] uppercase tracking-[0.2em] rounded-2xl shadow-lg shadow-emerald-100 hover:bg-[#1eb954] hover:shadow-xl active:scale-95 transition-all duration-300"
                            >
                                <MessageCircle size={18} />
                                WhatsApp Now
                            </a>
                        </div>
                    </motion.div>

                    {/* Right Column: Illustration & Floating Card */}
                    <motion.div
                        initial={{ opacity: 0, x: isRtl ? -40 : 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        {/* Illustration Container */}
                        <div className="relative h-[400px] md:h-[500px] p-4 rounded-[4rem] bg-gradient-to-br from-primary-50 to-white border border-primary-50 shadow-2xl overflow-hidden group">
                            <motion.img 
                                initial={{ scale: 1.1, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 1.5 }}
                                src={content.image || defaultImage} 
                                alt={content.title} 
                                className="w-full h-full object-cover rounded-[3rem] relative z-10 group-hover:scale-105 transition-transform duration-700"
                            />
                            
                            {/* Decorative Blobs */}
                            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-200/20 rounded-full blur-[80px]"></div>
                            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-emerald-200/20 rounded-full blur-[80px]"></div>
                        </div>

                        {/* Floating Experience Card */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="absolute -bottom-6 -left-6 md:left-0 md:-bottom-10 max-w-[280px] p-6 bg-white/90 backdrop-blur-xl border border-white rounded-[2rem] shadow-2xl z-20"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-primary-100 text-primary-700 flex items-center justify-center flex-shrink-0 animate-pulse">
                                    <ClipboardCheck size={24} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-normal text-primary-950 mb-1 leading-tight">Expert Surgical Care</h4>
                                    <p className="text-[10px] text-gray-500 font-normal leading-relaxed">Evidence-based treatments tailored to your condition.</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Redesigned Conditions Managed Section - Professional Grid */}
                <div className="mb-32">
                    {/* Header Block */}
                    <div className="mb-16">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center px-4 py-1.5 mb-6 rounded-full bg-blue-50 text-[#003B73] text-[10px] font-normal uppercase tracking-[0.2em] border border-blue-100"
                        >
                            {content.conditions.badge}
                        </motion.div>
                        <div className="grid lg:grid-cols-2 gap-8 items-end">
                            <h2 className="text-2xl md:text-4xl font-normal text-[#001D3D] leading-[1.1] tracking-tight">
                                {content.conditions.title}
                            </h2>
                            <p className="text-gray-500 text-lg font-normal leading-relaxed max-w-xl">
                                {content.conditions.description}
                            </p>
                        </div>
                    </div>

                    {/* 4-Column Grid of Condition Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {content.conditions.items.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className="group p-8 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:border-blue-100 transition-all duration-500 relative overflow-hidden"
                            >
                                {/* Decorative Accent */}
                                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/30 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-blue-100/40 transition-colors"></div>
                                
                                {/* Professional Icon Container */}
                                <div className="w-12 h-12 rounded-2xl bg-blue-50/50 text-[#003B73] flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-inner">
                                    <Activity size={22} strokeWidth={2.5} />
                                </div>

                                <h4 className="text-lg font-normal text-[#001D3D] mb-4 leading-tight group-hover:text-blue-700 transition-colors">
                                    {item.title}
                                </h4>
                                <p className="text-xs text-gray-500 font-normal leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Benefits Section */}
                <div className="bg-primary-950 rounded-[4rem] p-10 md:p-20 text-white relative overflow-hidden mb-32">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-primary-500/20 rounded-full blur-[100px] -mr-40 -mt-40"></div>
                    <div className="relative z-10">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-metabolic mb-6">{content.benefits.title}</h2>
                                <p className="text-primary-100/70 text-base mb-10 leading-relaxed">{content.benefits.description}</p>
                                <div className="space-y-4">
                                    {content.benefits.items.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-4">
                                            <CheckCircle2 className="text-primary-500 flex-shrink-0" size={24} />
                                            <span className="text-lg font-normal">{item}</span>
                                        </div>
                                    ))}
                                </div>
                                <p className="mt-8 text-primary-400 font-normal italic">{content.benefits.footer}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <BenefitCard icon={<Zap size={32} />} title="Fast Results" />
                                <BenefitCard icon={<ShieldCheck size={32} />} title="Safe Care" />
                                <BenefitCard icon={<HeartPulse size={32} />} title="Pain Relief" />
                                <BenefitCard icon={<Users size={32} />} title="Expert Team" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Expert Home Treatment - Target Audience */}
                <div className="text-center mb-32">
                    <h2 className="text-2xl md:text-4xl font-metabolic text-primary-950 mb-6">{content.expertTreatment.title}</h2>
                    <p className="text-base text-gray-500 mb-16 max-w-2xl mx-auto">{content.expertTreatment.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {content.expertTreatment.categories.map((cat, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group p-8 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:border-primary-100 transition-all duration-500 text-center"
                            >
                                <div className="w-16 h-16 rounded-3xl bg-primary-50 text-primary-600 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-500">
                                    <ClipboardCheck size={28} />
                                </div>
                                <h4 className="text-lg font-normal text-gray-900 group-hover:text-primary-700 transition-colors">{cat}</h4>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Why Choose Us */}
                <div className="grid lg:grid-cols-2 gap-24 items-start mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: isRtl ? 40 : -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl md:text-3xl font-metabolic text-primary-950 mb-8">{content.whyChoose.title}</h2>
                        <p className="text-base text-gray-500 mb-10 leading-relaxed">{content.whyChoose.description}</p>
                        
                        <div className="space-y-6">
                            {content.whyChoose.items.map((item, idx) => (
                                <div key={idx} className="flex gap-4 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="mt-1">
                                        <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                                            <ShieldCheck size={20} />
                                        </div>
                                    </div>
                                    <p className="text-gray-700 font-normal leading-relaxed">{item}</p>
                                </div>
                            ))}
                        </div>
                        <p className="mt-8 text-sm font-normal text-primary-600 italic">{content.whyChoose.footer}</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: isRtl ? -40 : 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl md:text-3xl font-metabolic text-primary-950 mb-12">{content.expectations.title}</h2>
                        <div className="space-y-12 relative">
                            {/* Decorative Line */}
                            <div className="absolute left-[27px] top-[10px] bottom-[10px] w-0.5 bg-gray-100 hidden md:block"></div>
                            
                            {content.expectations.steps.map((step, idx) => (
                                <div key={idx} className="relative flex items-start gap-8">
                                    <div className="relative z-10 w-14 h-14 rounded-full bg-white border-4 border-gray-50 text-primary-600 flex items-center justify-center font-normal text-xl shadow-lg flex-shrink-0">
                                        {idx + 1}
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-normal text-gray-900 mb-3">{step.title}</h4>
                                        <p className="text-gray-500 leading-relaxed">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* FAQs */}
                <div className="max-w-4xl mx-auto py-24">
                    <div className="text-center mb-16">
                        <HelpCircle className="w-12 h-12 text-primary-600 mx-auto mb-6" />
                        <h2 className="text-2xl md:text-4xl font-metabolic text-primary-950 mb-6">{content.faqs.title}</h2>
                        <p className="text-gray-500">Find answers to common questions about this procedure.</p>
                    </div>

                    <div className="space-y-4">
                        {content.faqs.items.map((faq, idx) => (
                            <FAQItem key={idx} question={faq.q} answer={faq.a} />
                        ))}
                    </div>
                </div>

                {/* New Post-FAQ CTA Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-7xl mx-auto px-4 mb-24 font-montserrat"
                >
                    <div className="bg-blue-50 rounded-[3.5rem] p-12 md:p-20 shadow-[0_30px_70px_rgba(0,0,0,0.06)] border border-blue-100 text-center relative overflow-hidden group">
                        {/* Decorative Background Elements */}
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-50/50 rounded-full blur-[100px] group-hover:bg-blue-100/50 transition-colors duration-700"></div>
                        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-50/50 rounded-full blur-[100px] group-hover:bg-emerald-100/50 transition-colors duration-700"></div>

                        <div className="relative z-10">
                            {/* Badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="inline-flex items-center px-6 py-2.5 mb-10 rounded-full bg-blue-50 text-primary-700 text-[11px] font-normal uppercase tracking-[0.25em] border border-blue-100"
                            >
                                Book your consultation today
                            </motion.div>
                            
                            <h2 className="text-2xl md:text-4xl font-normal text-primary-950 mb-8 tracking-tighter leading-[1.1] max-w-4xl mx-auto">
                                Safe, structured, and professional orthopedic care in Dubai
                            </h2>
                            
                            <p className="text-base md:text-lg text-gray-500 font-normal max-w-2xl mx-auto mb-14 leading-relaxed opacity-80">
                                Comprehensive diagnostics, surgical precision, and targeted rehabilitation designed around your unique condition and schedule.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                <a 
                                    href="tel:+971551053445"
                                    className="w-full sm:w-auto flex items-center justify-center gap-3 py-5 px-12 bg-[#003B73] text-white font-normal text-[12px] uppercase tracking-[0.2em] rounded-[2rem] shadow-2xl shadow-primary-200 hover:bg-[#002B55] hover:-translate-y-1 active:scale-95 transition-all duration-300"
                                >
                                    <Phone size={18} />
                                    Call Us Now
                                </a>
                                <a 
                                    href="https://wa.me/971551053445"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full sm:w-auto flex items-center justify-center gap-3 py-5 px-12 bg-[#25D366] text-white font-normal text-[12px] uppercase tracking-[0.2em] rounded-[2rem] shadow-xl shadow-emerald-100 hover:bg-[#1eb954] hover:-translate-y-1 active:scale-95 transition-all duration-300"
                                >
                                    <MessageCircle size={18} />
                                    WhatsApp Now
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </main>
    );
};

const BenefitCard = ({ icon, title }) => (
    <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center group hover:bg-white/10 transition-all duration-500">
        <div className="text-primary-400 mb-4 group-hover:scale-110 transition-transform">
            {icon}
        </div>
        <span className="text-xs font-normal uppercase tracking-widest text-primary-100">{title}</span>
    </div>
);

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm transition-all duration-300">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-start"
            >
                <span className="text-lg font-normal text-gray-900 pr-8">{question}</span>
                {isOpen ? <ChevronUp className="text-primary-600 flex-shrink-0" /> : <ChevronDown className="text-gray-400 flex-shrink-0" />}
            </button>
            {isOpen && (
                <div className="px-6 md:px-8 pb-8">
                    <p className="text-gray-600 leading-relaxed border-t border-gray-50 pt-6">
                        {answer}
                    </p>
                </div>
            )}
        </div>
    );
};

export default ServiceDetail;
