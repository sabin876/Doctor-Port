import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Facebook, Linkedin, Instagram, Youtube, Twitter, Send } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="relative py-24 bg-white overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-30 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[30rem] h-[30rem] bg-blue-100 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[30rem] h-[30rem] bg-blue-50 rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-50 text-blue-600 text-[11px] font-bold uppercase tracking-[0.2em]"
                    >
                        Get In Touch
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-montserrat font-extrabold text-blue-900 mb-6 tracking-tight"
                    >
                        Start Your Recovery <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 font-black">Journey</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="max-w-2xl text-lg font-normal text-gray-600 mx-auto"
                    >
                        Take the first step towards a pain-free life. Our team is ready to assist you with world-class expertise.
                    </motion.p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                    {/* Contact Info Cards */}
                    <div className="space-y-6 order-2 lg:order-1">
                        <ContactCard
                            icon={<Phone className="w-6 h-6" />}
                            title="Call Support"
                            content="+971 54 703 3311"
                            subContent="Direct line for appointments & queries"
                            delay={0.3}
                            color="bg-blue-50 text-blue-600"
                        />
                        <ContactCard
                            icon={<Mail className="w-6 h-6" />}
                            title="Email Us"
                            content="info@corx.ae"
                            subContent="For official records and detailed questions"
                            delay={0.4}
                            color="bg-indigo-50 text-indigo-600"
                            isLink={true}
                            href="mailto:info@corx.ae"
                        />
                        <ContactCard
                            icon={<MapPin className="w-6 h-6" />}
                            title="Visit Clinic"
                            content="Office 303, Royal Class Building"
                            subContent="DIP, Dubai, UAE"
                            delay={0.5}
                            color="bg-teal-50 text-teal-600"
                        />

                        {/* Social Media */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="bg-gray-50 rounded-[2rem] p-8 border border-gray-100"
                        >
                            <h3 className="text-sm font-bold text-gray-900 mb-6 uppercase tracking-wider">Connect With Us</h3>
                            <div className="flex flex-wrap gap-4">
                                <SocialLink href="https://www.facebook.com/people/Ulhas-Sonar/pfbid02t9HgyN1ngXRHdmXqhjjRku4dc4bJCMb6TL69rrePPSL4WSP3yqUvUnCA8tmPv3Lhl/" icon={<Facebook size={20} />} />
                                <SocialLink href="https://twitter.com/jointsurgeon" icon={<Twitter size={20} />} />
                                <SocialLink href="https://www.instagram.com/drulhassonar/" icon={<Instagram size={20} />} />
                                <SocialLink href="https://www.linkedin.com/in/ULHASSONARORTHO" icon={<Linkedin size={20} />} />
                                <SocialLink href="https://www.youtube.com/channel/UCGKiDKbBw_8j2gmN7lgHRTQ" icon={<Youtube size={20} />} />
                            </div>
                        </motion.div>
                    </div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-gray-100 relative overflow-hidden group lg:sticky lg:top-32 order-1 lg:order-2"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl group-hover:bg-blue-100 transition-all duration-700"></div>

                        <h3 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-tight">Send A Private Message</h3>
                        <form className="space-y-5 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <InputField label="Your Name" type="text" placeholder="e.g. John Doe" />
                                <InputField label="Your Email" type="email" placeholder="e.g. john@example.com" />
                            </div>
                            <InputField label="Phone Number" type="tel" placeholder="+971..." />
                            <div>
                                <label className="block text-[11px] font-bold text-gray-700 mb-2 uppercase tracking-wide">Medical Inquiry</label>
                                <textarea
                                    className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none bg-gray-50 text-gray-900 placeholder-gray-400 resize-none h-32 font-medium text-sm"
                                    placeholder="Describe your condition briefly..."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-primary-600 text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg hover:bg-primary-500 hover:scale-[1.01] active:scale-[0.98] transition-all duration-300"
                            >
                                <Send className="w-4 h-4" />
                                Send Message
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>

            {/* Map Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            >
                <div className="bg-gray-50 rounded-[2rem] shadow-sm overflow-hidden border border-gray-100 h-64 lg:h-96 w-full relative group">
                    <iframe
                        title="Canadian Specialist Hospital Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.2612745339667!2d55.3371900150117!3d25.26180998386629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5ccf5777bd37%3A0x60037a5999092b71!2sCanadian%20Specialist%20Hospital!5e0!3m2!1sen!2sae!4v1655976541012!5m2!1sen!2sae"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        className="grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700"
                    ></iframe>
                </div>
            </motion.div>
        </section>
    );
};

// Helper Components
const ContactCard = ({ icon, title, content, subContent, delay, color, isLink, href }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay }}
        className="flex items-start bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:border-primary-100 group"
    >
        <div className={`flex-shrink-0 p-3.5 rounded-xl ${color} mr-5 group-hover:scale-110 transition-transform duration-300`}>
            {icon}
        </div>
        <div>
            <h4 className="text-base font-extrabold text-gray-900 mb-1 tracking-tight">{title}</h4>
            {isLink ? (
                <a href={href} className="text-lg text-gray-700 hover:text-primary-600 transition-colors block mb-0.5 font-medium">
                    {content}
                </a>
            ) : (
                <p className="text-lg text-gray-700 mb-0.5 font-medium">{content}</p>
            )}
            <p className="text-xs text-gray-400 font-medium">{subContent}</p>
        </div>
    </motion.div>
);

const SocialLink = ({ href, icon }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 bg-white hover:bg-primary-600 text-gray-400 hover:text-white rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm border border-gray-100 hover:border-transparent hover:shadow-lg"
    >
        {icon}
    </a>
);

const InputField = ({ label, type, placeholder }) => (
    <div>
        <label className="block text-[11px] font-bold text-gray-700 mb-2 uppercase tracking-wide leading-none">{label}</label>
        <input
            type={type}
            placeholder={placeholder}
            className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none bg-gray-50 text-gray-900 placeholder-gray-400 font-medium text-sm"
        />
    </div>
);

export default Contact;
