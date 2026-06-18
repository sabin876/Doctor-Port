import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Youtube, Instagram, Linkedin, Facebook, Twitter, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SEO from './SEO';
import logo from '../assets/logo.webp';
import { api } from '../lib/api';

const Contact = () => {
    const { language, t } = useLanguage();
    const isRtl = language === 'AR';
    const contactPhone = import.meta.env.VITE_CONTACT_PHONE || "+971556319379";
    const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || "Kneeshoulderhip@gmail.com";

    // Form states
    const [contactData, setContactData] = useState({
        full_name: '',
        email: '',
        city: '',
        phone: '',
        service: '',
        message: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setContactData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!contactData.full_name || !contactData.email || !contactData.message) {
            alert('Please fill in required fields.');
            return;
        }

        try {
            const data = await api.sendContactMail(contactData);

            alert(data.result || 'Message sent successfully');

            setContactData({
                full_name: '',
                email: '',
                city: '',
                phone: '',
                service: '',
                message: ''
            });
        } catch (error) {
            console.error(error);
            alert('Server error. Try again later.');
        }
    };

    useEffect(() => {
        if (window.location.hash) {
            const id = window.location.hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
                return;
            }
        }
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
                                <a href={`tel:${contactPhone}`} className="text-[#0d52bc] font-semibold text-lg block leading-tight mb-1">{contactPhone}</a>
                                <a href="tel:9049200041" className="text-[#0d52bc] font-semibold text-lg block leading-tight mb-1">9049200041 (India)</a>
                                <a href="tel:9049200061" className="text-[#0d52bc] font-semibold text-lg block leading-tight mb-2">9049200061 (India)</a>
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
                                <a href={`mailto:${contactEmail}`} className="text-[#0d52bc] font-semibold text-base block mb-1 truncate max-w-[200px] sm:max-w-full">{contactEmail}</a>
                                <p className="text-gray-400 text-sm">Online support available</p>
                            </div>
                        </div>

                        {/* Location Card 2 (Pune) */}
                        <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-gray-100 flex items-start gap-5 transition-transform hover:-translate-y-1 duration-300">
                            <div className="w-12 h-12 rounded-full bg-[#f0fbf4] text-[#10b981] flex items-center justify-center flex-shrink-0">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <h3 className="text-[#1e293b] font-bold text-base mb-1">Pune Clinic (India)</h3>
                                <button 
                                    onClick={() => document.getElementById('map-section')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="text-[#0d52bc] hover:text-[#0a3f91] font-semibold text-base mb-1 block text-left hover:underline"
                                >
                                    {t('footer.viewLocation') || 'View Location'}
                                </button>
                                <p className="text-gray-400 text-sm">Kondhwa, Pune, Maharashtra</p>
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
                                <SocialIcon href="https://youtu.be/hX73EZA8eps?si=VxpSILzlZuVGQpwc" icon={<Youtube size={18} className="fill-current" />} />
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] border border-gray-100 relative">
                        {/* Soft decorative background shape behind form */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-50 rounded-full blur-3xl -z-10"></div>
                        
                        <h2 className="text-2xl font-bold text-[#1e293b] mb-8">Send Us a Message</h2>
                        
                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <InputField 
                                    label="Full Name" 
                                    placeholder="John Doe" 
                                    type="text" 
                                    name="full_name"
                                    value={contactData.full_name}
                                    onChange={handleInputChange}
                                    required 
                                />
                                <InputField 
                                    label="Email Address" 
                                    placeholder="john@example.com" 
                                    type="email" 
                                    name="email"
                                    value={contactData.email}
                                    onChange={handleInputChange}
                                    required 
                                />
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <InputField 
                                    label="City" 
                                    placeholder="Dubai" 
                                    type="text" 
                                    name="city"
                                    value={contactData.city}
                                    onChange={handleInputChange}
                                />
                                <InputField 
                                    label="Phone Number" 
                                    placeholder="+971 55 000 0000" 
                                    type="tel" 
                                    name="phone"
                                    value={contactData.phone}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="block text-xs font-semibold text-gray-700">Service Type</label>
                                <select 
                                    name="service"
                                    value={contactData.service}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 outline-none focus:border-[#0d52bc] focus:ring-2 focus:ring-blue-100 transition-all text-sm appearance-none cursor-pointer"
                                >
                                    <option value="" disabled>Select a service</option>
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
                                    name="message"
                                    value={contactData.message}
                                    onChange={handleInputChange}
                                    placeholder="How can we help you?"
                                    required
                                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 outline-none focus:border-[#0d52bc] focus:ring-2 focus:ring-blue-100 transition-all text-sm h-32 resize-none"
                                ></textarea>
                            </div>

                            <button 
                                type="submit"
                                className="w-full py-4 px-6 bg-[#003B73] hover:bg-[#002B55] text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors duration-300 mt-2"
                            >
                                <Send size={18} />
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Full Width Map Section */}
            <div id="map-section" className="w-full relative">
                <div className="h-[400px] lg:h-[500px] w-full relative">
                    <div className="absolute top-6 left-6 z-10 bg-white/90 backdrop-blur-sm px-5 py-2.5 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse"></div>
                        <span className="font-bold text-[#1e293b] text-sm tracking-wide">Pune Clinic (India)</span>
                    </div>
                    <iframe
                        title="Pune Medical Center Location"
                        src="https://maps.google.com/maps?q=SUNSHINE+CHILDRENS+CLINIC+KONDHWA,+Pune&t=&z=14&ie=UTF8&iwloc=&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover"
                    ></iframe>
                </div>
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

const InputField = ({ label, placeholder, type, name, value, onChange, required }) => (
    <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-gray-700">{label}</label>
        <input 
            type={type} 
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 outline-none focus:border-[#0d52bc] focus:ring-2 focus:ring-blue-100 transition-all text-sm"
        />
    </div>
);

export default Contact;