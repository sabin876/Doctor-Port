import React, { useEffect, useState } from 'react';
import {
    Phone,
    Mail,
    MapPin,
    Youtube,
    Instagram,
    Linkedin,
    Facebook,
    Twitter,
    Send
} from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';
import SEO from './SEO';
import logo from '../assets/logo.webp';

const Contact = () => {
    const { language } = useLanguage();
    const isRtl = language === 'AR';

    // ✅ STATE FIXED
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
            const response = await fetch(
                'https://api.drulhasorthopedic.com/api/send-mail/',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(contactData)
                }
            );

            const data = await response.json();

            if (response.ok) {
                alert(data.result || 'Message sent successfully');

                setContactData({
                    full_name: '',
                    email: '',
                    subject: f"Contact from {contactData.full_name}",
                    city: '',
                    phone: '',
                    service: '',
                    message: ''
                });
            } else {
                alert(data.result || 'Failed to send message');
            }
        } catch (error) {
            console.error(error);
            alert('Server error. Try again later.');
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="relative bg-white pt-24">

            <SEO
                title="Contact Dr. Ulhas | Book an Appointment"
                description="Get in touch for orthopedic consultation."
                url="/contact"
                image={logo}
            />

            {/* HEADER */}
            <div className="bg-gradient-to-b from-[#eef2f9] to-white pt-20 pb-16 px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <span className="text-[#0d52bc] text-sm font-bold uppercase">
                        GET IN TOUCH
                    </span>
                    <h1 className="text-4xl font-bold text-[#1e293b] mt-2">
                        We're Here for You
                    </h1>
                </div>
            </div>

            {/* MAIN */}
            <div className="max-w-6xl mx-auto px-4 py-12 grid lg:grid-cols-[1fr_1.2fr] gap-12">

                {/* LEFT */}
                <div className="space-y-6">

                    <div className="bg-white p-6 rounded-2xl shadow border flex gap-4">
                        <Phone />
                        <div>
                            <h3 className="font-bold">Phone</h3>
                            <p className="text-blue-600">
                                {import.meta.env.VITE_CONTACT_PHONE}
                            </p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow border flex gap-4">
                        <Mail />
                        <div>
                            <h3 className="font-bold">Email</h3>
                            <p className="text-blue-600">
                                {import.meta.env.VITE_CONTACT_EMAIL}
                            </p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow border flex gap-4">
                        <MapPin />
                        <div>
                            <h3 className="font-bold">Dubai Clinic</h3>
                            <p>Canadian Specialist Hospital</p>
                        </div>
                    </div>

                </div>

                {/* RIGHT FORM */}
                <div className="bg-white p-8 rounded-3xl shadow border">

                    <h2 className="text-2xl font-bold mb-6">
                        Send Message
                    </h2>

                    {/* ✅ FIXED FORM SUBMIT */}
                    <form onSubmit={handleSubmit} className="space-y-4">

                        <input
                            name="full_name"
                            value={contactData.full_name}
                            onChange={handleInputChange}
                            placeholder="Full Name"
                            className="w-full p-3 border rounded"
                            required
                        />

                        <input
                            name="email"
                            value={contactData.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                            className="w-full p-3 border rounded"
                            required
                        />
                        <input
    name="subject"
    value={contactData.subject}
    onChange={handleInputChange}
    placeholder="Subject"
    className="w-full p-3 border rounded"
/>
                        <input
                            name="city"
                            value={contactData.city}
                            onChange={handleInputChange}
                            placeholder="City"
                            className="w-full p-3 border rounded"
                        />

                        <input
                            name="phone"
                            value={contactData.phone}
                            onChange={handleInputChange}
                            placeholder="Phone"
                            className="w-full p-3 border rounded"
                        />

                        <select
                            name="service"
                            value={contactData.service}
                            onChange={handleInputChange}
                            className="w-full p-3 border rounded"
                        >
                            <option value="">Select Service</option>
                            <option value="consultation">Consultation</option>
                            <option value="surgery">Surgery</option>
                        </select>

                        <textarea
                            name="message"
                            value={contactData.message}
                            onChange={handleInputChange}
                            placeholder="Message"
                            className="w-full p-3 border rounded h-32"
                            required
                        />

                        <button
                            type="submit"
                            className="w-full bg-[#003B73] text-white p-4 rounded flex items-center justify-center gap-2"
                        >
                            <Send size={18} />
                            Send Message
                        </button>

                    </form>
                </div>
            </div>
        </main>
    );
};

export default Contact;