import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Calendar, User, Clock, Share2, Tag, ArrowRight } from 'lucide-react';

const articles = {
    'knee-replacement-signs': {
        title: "Is It Time for a Knee Replacement? 7 Signs You Shouldn't Ignore",
        date: "June 17, 2025",
        author: "Dr. Ulhas Sonar",
        category: "Knee Health",
        image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&auto=format&fit=crop",
        readTime: "5 min read",
        content: `
            <p>Many patients live with joint pain far longer than necessary, hoping it will get better with time. As an orthopaedic surgeon with years of experience treating complex knee conditions, I often meet individuals who say, "I wish I’d come in sooner."</p>
            
            <h3>Here are seven clinical signs I encourage every patient to monitor closely:</h3>
            
            <ol>
                <li><strong>Severe and Persistent Pain:</strong> Pain that interferes with sleep, daily activity, or doesn’t improve with rest or medication is a major red flag.</li>
                <li><strong>Mobility Restrictions:</strong> If walking short distances, climbing stairs, or getting out of a chair becomes difficult, your joint may have significant structural damage.</li>
                <li><strong>Swelling and Inflammation:</strong> Ongoing inflammation that doesn’t respond to conservative treatment could signal joint deterioration or underlying arthritis.</li>
                <li><strong>Morning Stiffness That Lingers:</strong> Mild stiffness is normal. But if your knee stays stiff for over 30 minutes, it may indicate moderate to advanced osteoarthritis.</li>
                <li><strong>Reduced Quality of Life:</strong> When knee pain limits your participation in work, travel, family time, or sleep, surgical options should be considered.</li>
                <li><strong>Dependency on Painkillers:</strong> Needing medication frequently to manage pain is not sustainable and could lead to complications.</li>
                <li><strong>Ineffective Non-Surgical Treatments:</strong> If physiotherapy, weight loss, bracing, or injections have failed to bring relief, surgery may provide a definitive solution.</li>
            </ol>
            
            <p>Knee replacement is not about age. It’s about quality of life. When joint pain stops you from living fully, it’s time to seek an expert opinion. In my practice, I use a comprehensive approach — including imaging, gait assessment, and conservative options — before recommending surgery.</p>
        `
    },
    'shoulder-steroid-injection': {
        title: "Steroid Injection for Shoulder Pain: What You Should Know",
        date: "June 17, 2024",
        author: "Dr. Ulhas Sonar",
        category: "Shoulder Care",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1200&auto=format&fit=crop",
        readTime: "4 min read",
        content: `
            <p>Shoulder pain — especially from conditions like rotator cuff inflammation or bursitis — can limit your daily life. One effective treatment used by orthopedic specialists is a steroid injection into the subacromial space of the shoulder. This can help reduce pain and inflammation and may also assist in diagnosing the root cause of your discomfort.</p>
            
            <h3>Why Is It Done?</h3>
            <p>Steroid injections serve two main purposes:</p>
            <ul>
                <li><strong>Diagnosis:</strong> The amount and duration of pain relief after the injection help your doctor confirm whether the shoulder pain is coming from inflammation in the subacromial space.</li>
                <li><strong>Pain Relief:</strong> Many patients experience significant relief, sometimes lasting for several months. However, responses can vary — some may notice only mild improvement, while others may not benefit at all.</li>
            </ul>
            
            <h3>What Happens During the Procedure?</h3>
            <ul>
                <li>The injection is done in a clinical setting with full sterile precautions.</li>
                <li>A mixture of steroid and local anesthetic is injected into the subacromial space (just above the rotator cuff).</li>
                <li>A small dressing is applied; no cuts or stitches are needed.</li>
                <li>You can remove the dressing after 48 hours.</li>
            </ul>
            
            <h3>Are There Any Risks?</h3>
            <p>Like any procedure, steroid injections carry a few risks:</p>
            <ul>
                <li>Temporary pain or swelling (steroid flare)</li>
                <li>Bleeding or bruising</li>
                <li>No relief from pain</li>
                <li>Allergic reactions or anaphylaxis</li>
                <li>Skin changes (e.g., lightening of skin, fat loss at the site)</li>
                <li>Tendon weakening (if used repeatedly)</li>
                <li>Rare but serious risk of infection</li>
            </ul>
        `
    },
    'knee-steroid-injection': {
        title: "Steroid Injections for Knee Pain: What You Need to Know",
        date: "March 12, 2024",
        author: "Dr. Ulhas Sonar",
        category: "Pain Management",
        image: "https://images.unsplash.com/photo-1581594632702-52c1cb8d799d?w=1200&auto=format&fit=crop",
        readTime: "4 min read",
        content: `
            <p>Chronic knee pain caused by arthritis or inflammation can significantly affect daily life. One of the commonly used treatments for relief is a steroid injection into the knee joint. These injections can provide both pain relief and help in confirming the diagnosis, especially when symptoms are unclear.</p>
            
            <h3>Why Are Steroid Injections Used?</h3>
            <p>Steroid injections serve two main goals:</p>
            <ul>
                <li><strong>Diagnostic Tool:</strong> The response to the injection helps your doctor confirm the source of the pain.</li>
                <li><strong>Pain Relief:</strong> It can reduce inflammation and discomfort, with relief ranging from temporary to long-lasting.</li>
            </ul>
            
            <h3>How Is It Done?</h3>
            <p>The procedure is quick and typically done in a clinic setting:</p>
            <ul>
                <li>The area is cleaned using sterile precautions.</li>
                <li>A fine needle is inserted into the joint to deliver a mix of steroid and local anesthetic.</li>
                <li>A small dressing is applied, which can be removed after 48 hours.</li>
            </ul>
            
            <h3>Post-Injection Care</h3>
            <ul>
                <li>Rest the knee and avoid heavy activities for a few days.</li>
                <li>Ice the area for 1–2 days.</li>
                <li>Maintain normal knee movement (don't stop walking unless advised).</li>
                <li>Watch for warning signs like redness, fever, or worsening pain.</li>
            </ul>
        `
    },
    'personalized-knee-alignment': {
        title: "Alignment concept: Total Knee Replacement",
        date: "May 20, 2024",
        author: "Dr. Ulhas Sonar",
        category: "Innovations",
        image: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=1200&auto=format&fit=crop",
        readTime: "6 min read",
        content: `
            <p>Total Knee Arthroplasty (TKA) has undergone a major evolution—from focusing on generic mechanical alignment to modern, personalized alignment strategies. Dr. Ulhas Sonar shares insights into how understanding joint anatomy and using technology can lead to better surgical outcomes.</p>
            
            <h3>From Mechanical to Personalized Alignment</h3>
            <p>Traditional mechanical alignment aimed to achieve a neutral 180° hip-knee-ankle axis. While it offers good implant survival, it doesn’t reflect natural limb variations. Modern alignment techniques—like Kinematic Alignment (KA)—strive to replicate the patient’s pre-arthritic anatomy by resurfacing bone and preserving soft tissue.</p>
            
            <h3>The Role of Technology</h3>
            <p>With robotic-assisted systems and computer navigation, surgeons can now plan precise resections, adjust for gap balancing, and reduce soft-tissue damage. This shift improves patient satisfaction, functional scores, and may reduce revision risks over time.</p>
        `
    },
    'tkr-implant-evolution': {
        title: "The Evolution of TKR Implants",
        date: "April 15, 2024",
        author: "Dr. Ulhas Sonar",
        category: "Surgery",
        image: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=1200&auto=format&fit=crop",
        readTime: "5 min read",
        content: `
            <p>Total Knee Replacement (TKR) implants have come a long way from the early days of hinge prostheses to today’s advanced, patient-specific systems. Learn how TKR implant design has evolved to enhance stability, longevity, and patient satisfaction.</p>
            
            <h3>From Hinges to Modularity</h3>
            <p>Early implants were simple and rigid. Over time, the need for anatomical movement led to innovations like the Total Condylar Prosthesis and femoral rollback mechanisms, improving function and wear resistance.</p>
            
            <h3>Key Advancements</h3>
            <ul>
                <li>Mobile-bearing designs reduce wear and enhance mobility.</li>
                <li>Highly congruent liners improve patellar tracking.</li>
                <li>Patient-specific instrumentation (PSI) allows for personalized alignment.</li>
            </ul>
        `
    },
    'tkr-surgical-steps': {
        title: "Steps in Total Knee Replacement",
        date: "May 5, 2024",
        author: "Dr. Ulhas Sonar",
        category: "Education",
        image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=1200&auto=format&fit=crop",
        readTime: "7 min read",
        content: `
            <p>Total Knee Replacement (TKR) is a complex yet highly rewarding procedure aimed at restoring mobility and relieving chronic pain. Here is a step-by-step guide to modern TKR, emphasizing precision and alignment.</p>
            
            <h3>1. Pre-operative Evaluation</h3>
            <p>The process begins with a thorough clinical examination, including assessment of deformity correction, ligament stability, and range of motion.</p>
            
            <h3>2. Positioning & Preparation</h3>
            <p>Patients are positioned supine, and a strict sterile protocol is followed to minimize infection risk.</p>
            
            <h3>3. The Surgical Technique</h3>
            <ul>
                <li><strong>Approach:</strong> Typically via the medial parapatellar approach.</li>
                <li><strong>Femur & Tibia Preparation:</strong> Involves removing osteophytes and making accurate bone cuts using intramedullary and extramedullary referencing.</li>
                <li><strong>Trialing & Balancing:</strong> Components are trialed to check fit, gaps, and tracking.</li>
                <li><strong>Cementation:</strong> Components are fixed with surgical cement.</li>
            </ul>
        `
    }
};

const ArticleDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const article = articles[id];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!article) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Article Not Found</h2>
                <Link to="/articles" className="text-primary-600 font-bold flex items-center gap-2">
                    <ChevronLeft className="w-5 h-5" /> Back to Articles
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative h-[40vh] md:h-[60vh] min-h-[300px] w-full overflow-hidden">
                <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end">
                    <div className="max-w-4xl mx-auto px-6 pb-12 w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-block px-3 py-1 rounded-full bg-primary-500 text-white text-[10px] font-bold uppercase tracking-wider mb-4">
                                {article.category}
                            </span>
                            <h1 className="text-2xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                                {article.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-white/80 text-xs md:text-sm">
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    <span>{article.author}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>{article.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    <span>{article.readTime}</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Back Button */}
                <button
                    onClick={() => navigate('/articles')}
                    className="absolute top-6 left-6 md:top-8 md:left-8 p-2.5 md:p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all z-20"
                >
                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                </button>
            </div>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* Share & Meta (Desktop Sidebar) */}
                    <div className="hidden lg:block">
                        <div className="sticky top-32">
                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Share Article</h4>
                            <div className="flex flex-col gap-4">
                                <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-primary-50 hover:border-primary-200 hover:text-primary-600 transition-all">
                                    <Share2 className="w-5 h-5" />
                                </button>
                                <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-primary-50 hover:border-primary-200 hover:text-primary-600 transition-all">
                                    <Tag className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <article className="prose prose-sm md:prose-lg prose-primary max-w-none">
                            <div
                                className="text-gray-700 leading-relaxed space-y-4 md:space-y-6"
                                dangerouslySetInnerHTML={{ __html: article.content }}
                            />
                        </article>

                        {/* Practical CTA */}
                        <div className="mt-12 md:mt-16 p-6 md:p-8 rounded-3xl bg-gray-50 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Need a consultation?</h3>
                                <p className="text-sm md:text-base text-gray-600">Schedule an appointment with Dr. Ulhas for personalized care.</p>
                            </div>
                            <Link
                                to="/contact"
                                className="w-full md:w-auto px-8 py-4 bg-primary-600 text-white rounded-xl text-center font-bold hover:bg-primary-700 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                            >
                                Book Visit <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Articles (Simplified) */}
            <div className="bg-gray-50 py-16">
                <div className="max-w-4xl mx-auto px-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-8">More Articles</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Object.entries(articles)
                            .filter(([key]) => key !== id)
                            .slice(0, 2)
                            .map(([key, item]) => (
                                <Link
                                    key={key}
                                    to={`/articles/${key}`}
                                    className="group bg-white p-6 rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-lg transition-all"
                                >
                                    <span className="text-[10px] font-bold text-primary-600 uppercase tracking-widest block mb-2">{item.category}</span>
                                    <h4 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-1">{item.title}</h4>
                                </Link>
                            ))}
                    </div>
                    <div className="mt-12 flex justify-center">
                        <button
                            onClick={() => navigate('/articles')}
                            className="text-primary-600 font-bold flex items-center gap-2 hover:underline"
                        >
                            <ArrowRight className="w-5 h-5 rotate-180" /> View All Articles
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleDetail;
