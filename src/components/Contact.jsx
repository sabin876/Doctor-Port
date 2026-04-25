import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Youtube, Instagram, Linkedin, Facebook, Twitter, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SEO from './SEO';
import logo from '../assets/logo.webp';

const Contact = () => {
    const { language, t } = useLanguage();
    const isRtl = language === 'AR';

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main id="contact" className="relative bg-white pt-24">
            <SEO
                title="Contact Dr. Ulhas | Book an Appointment"
                description="Get in touch with Dr. Ulhas for expert orthopedic consultations in Dubai. Find our clinic location, contact numbers, and book your appointment today."
                url="/contact"
                image={logo}
            />

            {/* Header Section with Gradient */}
            <div className="bg-gradient-to-b from-[#eef2f9] to-white pt-20 pb-16 px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <span className="text-[#0d52bc] text-sm font-bold uppercase tracking-wider mb-4 block">GET IN TOUCH</span>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#1e293b] mb-6">We're Here for You</h1>
                    <p className="text-gray-500 text-lg md:text-xl">
                        Whether you need a consultation or have a question about our orthopedic services,<br className="hidden md:block" /> reach out to us.
                    </p>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-20">
                <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">
                    
                    {/* Left Column: Contact Cards & Socials */}
                    <div className="space-y-6">
                        {/* Phone Card */}
                        <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-100 flex items-start gap-5 transition-transform hover:-translate-y-1 duration-300">
                            <div className="w-12 h-12 rounded-full bg-[#f0f4f8] text-[#0d52bc] flex items-center justify-center flex-shrink-0">
                                <Phone size={20} className="fill-current" />
                            </div>
                            <div>
                                <h3 className="text-[#1e293b] font-bold text-base mb-1">Phone</h3>
                                <a href="tel:+971551053445" className="text-[#0d52bc] font-semibold text-lg block leading-tight mb-1">+971 55 105 3445</a>
                                <a href="tel:904920041" className="text-[#0d52bc] font-semibold text-lg block leading-tight mb-1">904920041</a>
                                <a href="tel:9049200061" className="text-[#0d52bc] font-semibold text-lg block leading-tight mb-2">9049200061</a>
                                <p className="text-gray-400 text-sm">Available for appointments</p>
                            </div>
                        </div>

                        {/* Email Card */}
                        <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-100 flex items-start gap-5 transition-transform hover:-translate-y-1 duration-300">
                            <div className="w-12 h-12 rounded-full bg-[#f0f4f8] text-[#0d52bc] flex items-center justify-center flex-shrink-0">
                                <Mail size={20} />
                            </div>
                            <div>
                                <h3 className="text-[#1e293b] font-bold text-base mb-1">Email</h3>
                                <a href="mailto:Kneeshoulderhip@gmail.com" className="text-[#0d52bc] font-semibold text-base block mb-1 truncate max-w-[200px] sm:max-w-full">Kneeshoulderhip@gmail.com</a>
                                <p className="text-gray-400 text-sm">Online support available</p>
                            </div>
                        </div>

                        {/* Location Card */}
                        <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-100 flex items-start gap-5 transition-transform hover:-translate-y-1 duration-300">
                            <div className="w-12 h-12 rounded-full bg-[#f0fbf4] text-[#10b981] flex items-center justify-center flex-shrink-0">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <h3 className="text-[#1e293b] font-bold text-base mb-1">Location</h3>
                                <p className="text-gray-600 font-medium text-base mb-1">Canadian Specialist Hospital</p>
                                <p className="text-gray-400 text-sm">Dubai, United Arab Emirates</p>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="pt-8">
                            <h3 className="text-[#1e293b] font-bold text-base mb-4">Connect with Us</h3>
                            <div className="flex flex-wrap gap-3">
                                <SocialIcon href="https://www.facebook.com/profile.php?id=61585848005137" icon={<Facebook size={18} className="fill-current" />} />
                                <SocialIcon href="https://x.com/jointsurgeon" icon={<Twitter size={18} className="fill-current" />} />
                                <SocialIcon href="https://www.instagram.com/drulhasortho.1/" icon={<Instagram size={18} />} />
                                <SocialIcon href="https://linkedin.com/in/ulhassonarortho" icon={<Linkedin size={18} className="fill-current" />} />
                                <SocialIcon href="https://www.youtube.com/@orthopaedictutorials2135" icon={<Youtube size={18} className="fill-current" />} />
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] border border-gray-100 relative">
                        {/* Soft decorative background shape behind form */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-50 rounded-full blur-3xl -z-10"></div>
                        
                        <h2 className="text-2xl font-bold text-[#1e293b] mb-8">Send Us a Message</h2>
                        
                        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <InputField label="Full Name" placeholder="John Doe" type="text" />
                                <InputField label="Email Address" placeholder="john@example.com" type="email" />
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <InputField label="City" placeholder="Dubai" type="text" />
                                <InputField label="Phone Number" placeholder="+971 55 000 0000" type="tel" />
                            </div>

                            <div className="space-y-1.5">
                                <label className="block text-xs font-semibold text-gray-700">Service Type</label>
                                <select className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 outline-none focus:border-[#0d52bc] focus:ring-2 focus:ring-blue-100 transition-all text-sm appearance-none cursor-pointer">
                                    <option value="" disabled selected>Select a service</option>
                                    <option value="consultation">General Consultation</option>
                                    <option value="joint">Joint Replacement Surgery</option>
                                    <option value="sports">Sports / ACL Injury</option>
                                    <option value="arthroscopy">Arthroscopy</option>
                                    <option value="other">Other Inquiry</option>
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <label className="block text-xs font-semibold text-gray-700">Message</label>
                                <textarea 
                                    placeholder="How can we help you?"
                                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 outline-none focus:border-[#0d52bc] focus:ring-2 focus:ring-blue-100 transition-all text-sm h-32 resize-none"
                                ></textarea>
                            </div>

                            <button 
                                type="submit"
                                className="w-full py-4 px-6 bg-[#0d52bc] hover:bg-[#0a4299] text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors duration-300 mt-2"
                            >
                                <Send size={18} />
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Full Width Map Section */}
            <div className="w-full h-[400px] lg:h-[500px] relative">
                <iframe
                    title="Medical Center Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.2612745339667!2d55.3371900150117!3d25.26180998386629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5ccf5777bd37%3A0x60037a5999092b71!2sCanadian%20Specialist%20Hospital!5e0!3m2!1sen!2sae!4v1655976541012!5m2!1sen!2sae"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                ></iframe>
            </div>
        </main>
    );
};

const SocialIcon = ({ href, icon }) => (
    <a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-[#0d52bc] hover:text-white transition-all duration-300"
    >
        {icon}
    </a>
);

const InputField = ({ label, placeholder, type }) => (
    <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-gray-700">{label}</label>
        <input 
            type={type} 
            placeholder={placeholder}
            className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 outline-none focus:border-[#0d52bc] focus:ring-2 focus:ring-blue-100 transition-all text-sm"
        />
    </div>
);

export default Contact;
