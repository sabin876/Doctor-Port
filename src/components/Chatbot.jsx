import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Bot, Sparkles, Phone, Calendar, Headphones } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const botTranslations = {
    EN: {
        title: "Dr. Ulhas' Assistant",
        status: "Online",
        placeholder: "Type a message...",
        welcome: "Hello! I am Dr. Ulhas' AI assistant. How can I help you today? You can ask about my qualifications, treatments, clinic locations, or how to book an appointment.",
        pills: {
            booking: "📅 Book Appointment",
            doctor: "🎓 Qualifications & Exp",
            location: "🏥 Clinic Locations",
            whatsapp: "💬 WhatsApp Chat",
            services: "💼 Services & Expertises"
        },
        responses: {
            booking: "To book an appointment with Dr. Ulhas Sonar:\n1. Click the 'Book Appointment' button in the main menu to fill the booking form.\n2. Call our team at +919049200041.\n3. Send a direct WhatsApp message to +919049200041.",
            doctor: "Dr. Ulhas Sonar is a British Indian Orthopedic Surgeon with 15+ years of experience across the UK, India, and Dubai. He holds FRCS (JCIE) UK, FEBOT (Switzerland), MCh Upper Limb Surgeries (UK), and PG Dip in Computer & Robotics Assisted TKR (Glasgow). He has performed 5000+ successful surgeries and has over 10k happy patients.",
            location: "Our clinic locations:\n- Dubai Clinic: DIP 1, Dubai, UAE (Mon-Sat, 9 AM - 7 PM)\n- Canadian Specialist Hospital, Dubai, UAE\n- Pune Clinic: Kondhwa, Pune, Maharashtra, India\nPhysiotherapy home services are also available across Dubai.",
            whatsapp: "You can message Dr. Ulhas' team on WhatsApp: +919049200041. Click the WhatsApp button at the bottom-right for a direct chat.",
            services: "Dr. Ulhas specializes in:\n- Joint Replacement (Total/Partial Hip & Knee)\n- Robotic & Computer-Assisted Knee Surgery\n- Sports Medicine (ACL, Meniscus, Ligament Repairs)\n- Arthroscopy (Minimally Invasive keyhole surgery)\n- Complex Trauma & Deformity Corrections\n- Home Physiotherapy Rehabilitation",
            greeting: "Hello! I am Dr. Ulhas' AI assistant. How can I help you today? Feel free to ask about treatments, doctor credentials, locations, timings, or how to book an appointment.",
            fees: "Consultation and treatment fees depend on the specific medical service required. Please contact our team at +919049200041 or WhatsApp us for transparent pricing and package details.",
            hours: "Our clinics are open Monday through Saturday from 9:00 AM to 7:00 PM. We are closed on Sundays.",
            robotic: "Dr. Ulhas specializes in precision Robotic-Assisted Knee Replacements using advanced techniques for higher accuracy, less pain, and a faster recovery.",
            sports: "We provide comprehensive treatment for athletic injuries, including ACL reconstruction, meniscus repair, shoulder instability care, and knee ligament repairs.",
            physio: "We provide DHA-licensed professional physiotherapy home services across Dubai, offering convenient post-operative rehab, stroke care, and pain management in your home.",
            thanks: "You're very welcome! Let me know if you need anything else. Wishing you active and healthy joints!",
            fallback: "I'm sorry, I didn't quite catch that. Please try asking about 'appointment', 'qualifications', 'locations', 'hours', 'fees', or 'treatments'."
        }
    },
    HI: {
        title: "डॉ. उल्हास के सहायक",
        status: "ऑनलाइन",
        placeholder: "संदेश लिखें...",
        welcome: "नमस्ते! मैं डॉ. उल्हास का एआई सहायक हूँ। आज मैं आपकी क्या मदद कर सकता हूँ? आप मुझसे मेरी योग्यता, उपचार, क्लिनिक के स्थान या अपॉइंटमेंट बुक करने के बारे में पूछ सकते हैं।",
        pills: {
            booking: "📅 अपॉइंटमेंट बुक करें",
            doctor: "🎓 योग्यता और अनुभव",
            location: "🏥 क्लिनिक का पता",
            whatsapp: "💬 व्हाट्सएप परामर्श",
            services: "💼 सेवाएं और उपचार"
        },
        responses: {
            booking: "डॉ. उल्हास सोनार के साथ अपॉइंटमेंट बुक करने के लिए:\n1. मुख्य मेनू में 'अपॉइंटमेंट बुक करें' बटन पर क्लिक करके फ़ॉर्म भरें।\n2. हमारी टीम को +919049200041 पर कॉल करें।\n3. व्हाट्सएप के माध्यम से सीधा संदेश भेजें (+919049200041)।",
            doctor: "डॉ. उल्हास सोनार एक ब्रिटिश-भारतीय आर्थोपेडिक सर्जन हैं, जिन्हें यूके, भारत और दुबई में 15+ वर्षों का वैश्विक अनुभव है। उनके पास FRCS (UK), FEBOT (स्विट्जरलैंड), MCh (यूके) जैसी डिग्रियां हैं। उन्होंने 5000+ सफल सर्जरी की हैं और 10,000+ से अधिक संतुष्ट मरीज़ हैं।",
            location: "हमारे स्थान:\n- दुबई क्लिनिक: DIP 1, दुबई, यूएई (सोम-शनि, सुबह 9 से शाम 7 बजे)\n- कनाडाई स्पेशलिस्ट अस्पताल, दुबई, यूएई\n- पुणे क्लिनिक: कोंढवा, पुणे, महाराष्ट्र, भारत\nदुबई में होम फिजियोथेरेपी भी उपलब्ध है।",
            whatsapp: "आप डॉ. उल्हास की टीम से व्हाट्सएप पर संपर्क कर सकते हैं: +919049200041। सीधा संदेश भेजने के लिए नीचे दाहिने ओर व्हाट्सएप बटन पर क्लिक करें।",
            services: "डॉ. उल्हास इन क्षेत्रों में विशेषज्ञ हैं:\n- जोड़ प्रतिस्थापन (घुटने और कूल्हे)\n- रोबोटिक और कंप्यूटर-सहायता प्राप्त सर्जरी\n- स्पोर्ट्स मेडिसिन (ACL और मेनिस्कस मरम्मत)\n- आर्थ्रोस्कोपी (कीहोल जोड़ों की सर्जरी)\n- आर्थोपेडिक ट्रॉमा और विकृति सुधार\n- होम फिजियोथेरेपी सेवाएं",
            greeting: "नमस्ते! मैं डॉ. उल्हास का एआई सहायक हूँ। मैं आपकी किस प्रकार सहायता कर सकता हूँ? आप मुझसे उपचारों, योग्यता, स्थान, समय, या अपॉइंटमेंट के बारे में पूछ सकते हैं।",
            fees: "परामर्श और उपचार शुल्क आवश्यक चिकित्सा सेवा पर निर्भर करते हैं। कृपया सटीक शुल्क और पैकेज विवरण के लिए हमारी टीम से +919049200041 पर संपर्क करें या व्हाट्सएप करें।",
            hours: "हमारे क्लिनिक सोमवार से शनिवार सुबह 9:00 बजे से शाम 7:00 बजे तक खुले रहते हैं। रविवार को क्लिनिक बंद रहता है।",
            robotic: "डॉ. उल्हास उन्नत तकनीकों का उपयोग करके सटीक रोबोटिक-सहायता प्राप्त घुटने के प्रतिस्थापन (Knee Replacement) में विशेषज्ञता रखते हैं, जिससे रिकवरी तेज़ होती है और दर्द कम होता है।",
            sports: "हम खेल की चोटों जैसे ACL पुनर्निर्माण, मेनिस्कस मरम्मत, कंधे की अस्थिरता और घुटने के लिगामेंट की चोटों के लिए व्यापक उपचार प्रदान करते हैं।",
            physio: "हम दुबई में DHA-लाइसेंस प्राप्त पेशेवर होम फिजियोथेरेपी सेवाएं प्रदान करते हैं, जिससे आप घर बैठे ही सर्जरी के बाद की रिकवरी और दर्द प्रबंधन करा सकते हैं।",
            thanks: "आपका बहुत-बहुत धन्यवाद! स्वस्थ रहें और जोड़ों के दर्द से मुक्त रहें।",
            fallback: "क्षमा करें, मैं समझ नहीं पाया। कृपया 'अपॉइंटमेंट', 'योग्यता', 'स्थान', 'समय', 'शुल्क', या 'उपचार' के बारे में पूछें।"
        }
    },
    AR: {
        title: "مساعد الدكتور أولهاس",
        status: "نشط الآن",
        placeholder: "اكتب رسالة...",
        welcome: "مرحباً! أنا مساعد الدكتور أولهاس الذكي. كيف يمكنني مساعدتك اليوم؟ يمكنك الاستفسار عن مؤهلاتي، علاجاتي، مواقع عياداتي، أو كيفية حجز موعد.",
        pills: {
            booking: "📅 حجز موعد",
            doctor: "🎓 المؤهلات والخبرة",
            location: "🏥 مواقع العيادات",
            whatsapp: "💬 استشارة واتساب",
            services: "💼 الخدمات والعلاجات"
        },
        responses: {
            booking: "لحجز موعد مع الدكتور أولهاس سونار:\n1. انقر فوق زر 'حجز موعد' في القائمة الرئيسية لملء النموذج.\n2. اتصل بفريقنا على +919049200041.\n3. أرسل رسالة واتساب مباشرة إلى +919049200041.",
            doctor: "الدكتور أولهاس سونار هو جراح عظام بريطاني هندي يتمتع بخبرة عالمية تزيد عن 15 عاماً في المملكة المتحدة والهند ودبي. حاصل على زماه FRCS (المملكة المتحدة)، FEBOT (سويسرا)، وماجستير جراحة الأطراف العلوية (المملكة المتحدة). قام بإجراء أكثر من 5000 عملية جراحية ناجحة وأكثر من 10 آلاف مريض سعيد.",
            location: "مواقع عياداتنا:\n- عيادة دبي: مجمع دبي للاستثمار 1 (DIP 1)، دبي (الإثنين-السبت، 9 صباحاً - 7 مساءً)\n- المستشفى الكندي التخصصي، دبي، الإمارات\n- عيادة Pune: كوندوا، بونه، ماهاراشترا، الهند\nتتوفر أيضاً خدمات العلاج الطبيعي المنزلي في دبي.",
            whatsapp: "يمكنك التواصل مع فريق الدكتور أولهاس عبر الواتساب: +919049200041. انقر فوق زر الواتساب في أسفل اليمين للتواصل المباشر.",
            services: "يتخصص الدكتور أولهاس في:\n- استبدال المفاصل (الركبة والفخذ)\n- الجراحة الروبوتية والموجهة بالكمبيوتر للركبة\n- الطب الرياضي (إصلاح الرباط الصليبي والغضروف المفصلي)\n- تنظير المفاصل (جراحة ثقب المفتاح طفيفة التوغل)\n- علاج كسور العظام المعقدة وتصحيح التشوهات\n- خدمات إعادة التأهيل والعلاج الطبيعي المنزلي",
            greeting: "مرحباً! أنا مساعد الدكتور أولهاس الذكي. كيف يمكنني مساعدتك اليوم؟ يمكنك الاستفسار عن العلاجات، مؤهلات الطبيب، الفروع، ساعات العمل، أو كيفية حجز موعد.",
            fees: "تعتمد رسوم الاستشارة والعلاج على الخدمة الطبية المطلوبة. يرجى الاتصال بفريقنا على الرقم +919049200041 أو عبر الواتساب للحصول على تفاصيل الأسعار والشرائح العلاجية.",
            hours: "عياداتنا مفتوحة من يوم الإثنين إلى السبت، من الساعة 9:00 صباحاً حتى 7:00 مساءً. وتغلق العيادة يوم الأحد.",
            robotic: "يتخصص الدكتور أولهاس في عمليات استبدال الركبة باستخدام التقنيات الروبوتية الموجهة بدقة لضمان محاذاة أفضل، ألم أقل، وتماثل أسرع للشفاء.",
            sports: "نقدم علاجات متكاملة لإصابات الملاعب مثل إعادة بناء الرباط الصليبي (ACL)، خياطة الغضروف الهلالي، عدم استقرار الكتف، وتمزق الأربطة.",
            physio: "نوفر خدمات العلاج الطبيعي المنزلي المرخصة من هيئة الصحة بدبي (DHA) لتقديم رعاية وتأهيل مريح بعد العمليات الجراحية وإدارة الألم في منزلك بدبي.",
            thanks: "على الرحب والسعة! أتمنى لك دوام الصحة والعافية ومفاصل قوية وسليمة.",
            fallback: "معذرةً، لم أتمكن من فهم طلبك بالكامل. يرجى الاستفسار عن 'موعد'، 'مؤهلات'، 'موقع'، 'أوقات العمل'، 'الأسعار'، أو 'العلاجات'."
        }
    }
};

const Chatbot = () => {
    const { language } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const isRtl = language === 'AR';
    const activeLang = botTranslations[language] ? language : 'EN';
    const text = botTranslations[activeLang];

    // Load initial welcome message
    useEffect(() => {
        setMessages([
            { id: 1, text: text.welcome, isBot: true, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
        ]);
    }, [language]);

    // Scroll to bottom whenever messages list updates
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isTyping]);

    const handleSendMessage = (userText) => {
        if (!userText.trim()) return;

        // User message
        const newUserMsg = {
            id: Date.now(),
            text: userText,
            isBot: false,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, newUserMsg]);
        setInputValue('');
        setIsTyping(true);

        // Simulated bot response delay
        setTimeout(() => {
            const botResponseText = getBotResponse(userText);
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: botResponseText,
                isBot: true,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
            setIsTyping(false);
        }, 900);
    };

    const getBotResponse = (input) => {
        const query = input.toLowerCase().trim();

        // 1. Greetings
        if (
            query === 'hi' || query === 'hello' || query === 'hey' || query === 'helloo' ||
            query.includes('hi ') || query.includes('hello ') || query.includes('greetings') ||
            query.includes('नमस्ते') || query.includes('हैलो') || 
            query.includes('مرحبا') || query.includes('سلام') || query.includes('أهلا')
        ) {
            return text.responses.greeting;
        }

        // 2. Gratitude / Thank You
        if (
            query.includes('thank') || query.includes('thanks') || query.includes('thx') || 
            query.includes('धन्यवाद') || query.includes('शुक्रिया') || 
            query.includes('شكرا') || query.includes('شكرًا') || query.includes('تسلم')
        ) {
            return text.responses.thanks;
        }

        // 3. Fees / Cost / Price
        if (
            query.includes('fee') || query.includes('cost') || query.includes('price') || query.includes('charge') || query.includes('how much') || query.includes('expense') ||
            query.includes('शुल्क') || query.includes('फीस') || query.includes('कीमत') || query.includes('दाम') ||
            query.includes('تكلف') || query.includes('سعر') || query.includes('رسوم') || query.includes('بكم') || query.includes('كم سعر')
        ) {
            return text.responses.fees;
        }

        // 4. Hours / Timing / Schedule
        if (
            query.includes('hour') || query.includes('time') || query.includes('timing') || query.includes('open') || query.includes('schedule') || query.includes('closed') || query.includes('when') ||
            query.includes('समय') || query.includes('घंटे') || query.includes('कब') || query.includes('खुलता') || query.includes('बंद') ||
            query.includes('وقت') || query.includes('ساعة') || query.includes('ساعات') || query.includes('مفتوح') || query.includes('مغلق') || query.includes('متى')
        ) {
            return text.responses.hours;
        }

        // 5. Specific Service: Robotic Surgery
        if (
            query.includes('robotic') || query.includes('robot') || query.includes('computer-assisted') || query.includes('tkr') ||
            query.includes('रोबोटिक') || query.includes('रोबोट') ||
            query.includes('روبوت') || query.includes('روبوتي') || query.includes('آلي')
        ) {
            return text.responses.robotic;
        }

        // 6. Specific Service: Sports Injuries
        if (
            query.includes('sport') || query.includes('acl') || query.includes('meniscus') || query.includes('ligament') || query.includes('sprain') || query.includes('fracture') || query.includes('injury') || query.includes('shoulder instability') ||
            query.includes('खेल') || query.includes('चोट') || query.includes('लिगामेंट') ||
            query.includes('رياض') || query.includes('إصابة رياض') || query.includes('رباط صليبي') || query.includes('تمزق') || query.includes('أربطة')
        ) {
            return text.responses.sports;
        }

        // 7. Specific Service: Physiotherapy
        if (
            query.includes('physio') || query.includes('rehab') || query.includes('physical therapy') || query.includes('home visit') || query.includes('home service') ||
            query.includes('फिजियो') || query.includes('थेरेपी') || query.includes('पुनर्वास') || query.includes('घर पर') ||
            query.includes('طبيعي') || query.includes('علاج طبيعي') || query.includes('تأهيل') || query.includes('منزلي')
        ) {
            return text.responses.physio;
        }

        // 8. Booking queries
        if (
            query.includes('book') || query.includes('appoint') || query.includes('consult') || 
            query.includes('बुक') || query.includes('परामर्श') || 
            query.includes('حجز') || query.includes('موعد')
        ) {
            return text.responses.booking;
        }

        // 9. Doctor details queries
        if (
            query.includes('who') || query.includes('doctor') || query.includes('ulhas') || query.includes('sonar') || 
            query.includes('qualif') || query.includes('exp') || query.includes('edu') || 
            query.includes('डॉक्टर') || query.includes('योग्यता') || query.includes('अनुभव') || 
            query.includes('من') || query.includes('طبيب') || query.includes('أولهاس') || query.includes('مؤهل') || query.includes('خبرة')
        ) {
            return text.responses.doctor;
        }

        // 10. Location queries
        if (
            query.includes('where') || query.includes('location') || query.includes('address') || query.includes('clinic') || query.includes('hospital') || query.includes('dubai') || query.includes('pune') || 
            query.includes('कहाँ') || query.includes('पता') || query.includes('क्लिनिक') || 
            query.includes('أين') || query.includes('موقع') || query.includes('عنوان') || query.includes('عياد') || query.includes('مستشف') || query.includes('دبي')
        ) {
            return text.responses.location;
        }

        // 11. Contact/WhatsApp queries
        if (
            query.includes('phone') || query.includes('number') || query.includes('call') || query.includes('whatsapp') || query.includes('contact') || 
            query.includes('फ़ोन') || query.includes('नंबर') || query.includes('कॉल') || query.includes('व्हाट्सएप') || 
            query.includes('هاتف') || query.includes('رقم') || query.includes('اتصال') || query.includes('واتساب')
        ) {
            return text.responses.whatsapp;
        }

        // 12. General Treatments/Services queries
        if (
            query.includes('treat') || query.includes('service') || query.includes('surger') || query.includes('knee') || query.includes('hip') || query.includes('joint') || query.includes('pain') || 
            query.includes('सेवा') || query.includes('उपचार') || query.includes('सर्जरी') || query.includes('घुटना') || query.includes('दर्द') || 
            query.includes('علاج') || query.includes('خدم') || query.includes('جراح') || query.includes('ركب') || query.includes('فخذ') || query.includes('مفصل') || query.includes('ألم')
        ) {
            return text.responses.services;
        }

        // Fallback response
        return text.responses.fallback;
    };

    return (
        <div className="relative font-sans notranslate" dir={isRtl ? 'rtl' : 'ltr'}>
            {/* Tooltip / Label: Chat with Agent */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.span
                        initial={{ opacity: 0, scale: 0.8, y: "-50%" }}
                        animate={{ 
                            opacity: 1, 
                            scale: 1,
                            y: ["-50%", "-60%", "-50%"]
                        }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{
                            opacity: { delay: 1.0, duration: 0.3 },
                            scale: { delay: 1.0, duration: 0.3 },
                            y: { repeat: Infinity, duration: 2.5, ease: "easeInOut" }
                        }}
                        className={`absolute ${
                            isRtl ? 'start-16' : 'end-16'
                        } top-1/2 bg-primary-950 text-white text-[9px] font-bold px-3 py-1.5 rounded-lg shadow-premium whitespace-nowrap uppercase tracking-widest pointer-events-none flex items-center gap-1.5 z-10 border border-white/10`}
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        {language === 'AR' ? 'تحدث مع المساعد' : language === 'HI' ? 'सहायक से चैट करें' : 'Chat with Agent'}
                    </motion.span>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, x: isRtl ? -100 : 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className={`relative w-12 h-12 md:w-14 md:h-14 rounded-full shadow-lg hover:shadow-2xl flex items-center justify-center cursor-pointer transition-all duration-300 ${
                    isOpen ? 'bg-red-500 text-white' : 'bg-primary-600 text-white hover:bg-primary-700'
                }`}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X className="w-6 h-6" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="open"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="relative flex items-center justify-center"
                        >
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-ping"></span>
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                            <Headphones className="w-6 h-6" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Chat Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="absolute end-0 bottom-12 md:bottom-14 w-[360px] max-w-[90vw] h-[520px] max-h-[75vh] flex flex-col bg-white/95 backdrop-blur-md rounded-2xl shadow-premium border border-slate-200 overflow-hidden z-40"
                    >
                        {/* Header */}
                        <div className="px-5 py-4 bg-gradient-to-r from-primary-900 to-primary-950 text-white flex items-center justify-between shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="relative w-10 h-10 rounded-full bg-primary-800/30 flex items-center justify-center border border-primary-500/30">
                                    <Bot className="w-5.5 h-5.5 text-primary-300" />
                                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-primary-950 rounded-full animate-pulse"></span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-[14px] leading-tight flex items-center gap-1.5">
                                        {text.title}
                                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                                    </h4>
                                    <span className="text-[10px] text-green-300 font-medium tracking-wide uppercase">
                                        {text.status}
                                    </span>
                                </div>
                            </div>
                            <button 
                                onClick={() => setIsOpen(false)}
                                className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Message Feed */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-200">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                                >
                                    {msg.isBot ? (
                                        <div className="flex gap-2.5 items-start max-w-[85%]">
                                            <div className="w-8 h-8 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0 border border-primary-100 shadow-sm">
                                                <Bot className="w-4.5 h-4.5" />
                                            </div>
                                            <div className="rounded-2xl px-4 py-3 text-sm shadow-sm bg-slate-50 border border-slate-200 text-slate-800 rounded-tl-none leading-relaxed">
                                                <p className="whitespace-pre-line">{msg.text}</p>
                                                <span className="block text-[9px] mt-1 text-right text-slate-400">
                                                    {msg.time}
                                                </span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex justify-end max-w-[85%]">
                                            <div className="rounded-2xl px-4 py-3 text-sm shadow-sm bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-tr-none leading-relaxed">
                                                <p className="whitespace-pre-line">{msg.text}</p>
                                                <span className="block text-[9px] mt-1 text-right text-primary-200">
                                                    {msg.time}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* Typing Indicator */}
                            {isTyping && (
                                <div className="flex gap-2.5 items-start max-w-[85%]">
                                    <div className="w-8 h-8 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0 border border-primary-100 shadow-sm animate-pulse">
                                        <Bot className="w-4.5 h-4.5" />
                                    </div>
                                    <div className="bg-slate-50 border border-slate-200 rounded-2xl rounded-tl-none px-4 py-3 text-slate-500 text-sm shadow-sm">
                                        <div className="flex gap-1.5 items-center py-1">
                                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Footer Input */}
                        <form 
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSendMessage(inputValue);
                            }}
                            className="p-3 border-t border-slate-100 bg-white flex gap-2 items-center"
                        >
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder={text.placeholder}
                                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary-500 focus:bg-white transition-all text-slate-800"
                            />
                            <button
                                type="submit"
                                disabled={!inputValue.trim()}
                                className="w-10 h-10 bg-primary-600 hover:bg-primary-700 text-white rounded-xl flex items-center justify-center transition-colors disabled:bg-slate-100 disabled:text-slate-300 cursor-pointer"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Chatbot;
