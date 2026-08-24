import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  ChevronRight, 
  Check, 
  X, 
  Search, 
  FileText, 
  ArrowLeft,
  BookOpen,
  Calendar,
  User,
  Activity,
  Globe,
  HelpCircle,
  Eye,
  Settings,
  Filter,
  Sparkles,
  AlertTriangle
} from 'lucide-react';
import { api } from '../../lib/api';

const ArticlesManager = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // all, published, draft, review, seo_issues
  
  // Editor State
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const [editingArticle, setEditingArticle] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: 'Dr. Ulhas Sonar',
    category: 'Blog',
    category_color: 'bg-indigo-50 text-indigo-600 border border-indigo-150',
    meta_title: '',
    meta_description: '',
    canonical_url: '',
    og_title: '',
    og_description: '',
    schema_type: 'Article',
    schema_markup: '',
    index_page: true,
    follow_links: true,
    image_alt_text: '',
    h1_title: ''
  });

  // Image Upload / Preview States
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [ogImageFile, setOgImageFile] = useState(null);
  const [ogImagePreview, setOgImagePreview] = useState('');
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const data = await api.getArticles();
      setArticles(data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch articles:', err);
      setError('Could not load articles from backend database.');
    } finally {
      setLoading(false);
    }
  };

  const calculateSEOScore = (art) => {
    let score = 50;
    if (art.meta_title) score += 10;
    if (art.meta_description) score += 15;
    if (art.schema_markup && art.schema_markup !== 'null' && art.schema_markup !== '{}') score += 10;
    if (art.image_alt_text) score += 5;
    if (art.image) score += 5;
    if (art.h1_title) score += 5;
    return Math.min(score, 100);
  };

  const getSEOIssue = (art) => {
    if (!art.meta_title) return { text: 'Title missing', class: 'text-rose-600 bg-rose-50 px-2 py-0.5 rounded font-bold' };
    if (art.meta_title.length > 60) return { text: 'Meta long', class: 'text-amber-600 bg-amber-50 px-2 py-0.5 rounded font-bold' };
    if (!art.meta_description) return { text: 'Desc missing', class: 'text-rose-600 bg-rose-50 px-2 py-0.5 rounded font-bold' };
    if (art.meta_description.length > 160) return { text: 'Desc long', class: 'text-amber-600 bg-amber-50 px-2 py-0.5 rounded font-bold' };
    if (!art.schema_markup || art.schema_markup === 'null' || art.schema_markup === '{}') {
      return { text: 'Missing schema', class: 'text-amber-600 bg-amber-50 px-2 py-0.5 rounded font-bold' };
    }
    if (!art.image_alt_text) return { text: 'Alt text missing', class: 'text-amber-600 bg-amber-50 px-2 py-0.5 rounded font-bold' };
    return { text: 'Good', class: 'text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-bold' };
  };

  const handleOpenEdit = (article) => {
    if (article) {
      setEditingArticle(article);
      setFormData({
        title: article.title || '',
        slug: article.slug || '',
        excerpt: article.excerpt || '',
        content: article.content || '',
        author: article.author || 'Dr. Ulhas Sonar',
        category: article.category || 'Blog',
        category_color: article.category_color || 'bg-indigo-50 text-indigo-600 border border-indigo-150',
        meta_title: article.meta_title || '',
        meta_description: article.meta_description || '',
        canonical_url: article.canonical_url || '',
        og_title: article.og_title || '',
        og_description: article.og_description || '',
        schema_type: article.schema_type || 'Article',
        schema_markup: article.schema_markup ? (typeof article.schema_markup === 'object' ? JSON.stringify(article.schema_markup, null, 2) : article.schema_markup) : '',
        index_page: article.index_page !== false,
        follow_links: article.follow_links !== false,
        image_alt_text: article.image_alt_text || '',
        h1_title: article.h1_title || ''
      });
      let parsedFaqs = [];
      if (article.faqs) {
        if (typeof article.faqs === 'string') {
          try { parsedFaqs = JSON.parse(article.faqs); } catch (e) { parsedFaqs = []; }
        } else if (Array.isArray(article.faqs)) {
          parsedFaqs = article.faqs;
        }
      }
      setFaqs(parsedFaqs);
      setImagePreview(article.image || '');
      setOgImagePreview(article.og_image || '');
    } else {
      setEditingArticle(null);
      setFormData({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        author: 'Dr. Ulhas Sonar',
        category: 'Blog',
        category_color: 'bg-indigo-50 text-indigo-600 border border-indigo-150',
        meta_title: '',
        meta_description: '',
        canonical_url: '',
        og_title: '',
        og_description: '',
        schema_type: 'Article',
        schema_markup: '',
        index_page: true,
        follow_links: true,
        image_alt_text: '',
        h1_title: ''
      });
      setFaqs([]);
      setImagePreview('');
      setOgImagePreview('');
    }
    setImageFile(null);
    setOgImageFile(null);
    setActiveTab('basic');
    setIsEditing(true);
  };

  const handleAddFAQ = () => {
    setFaqs(prev => [...prev, { question: '', answer: '' }]);
  };

  const handleUpdateFAQ = (index, field, value) => {
    setFaqs(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleRemoveFAQ = (index) => {
    setFaqs(prev => prev.filter((_, i) => i !== index));
  };

  const handleTitleChange = (e) => {
    const val = e.target.value;
    setFormData(prev => {
      const updated = { ...prev, title: val };
      if (!editingArticle) {
        updated.slug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      }
      return updated;
    });
  };

  const insertHTMLTag = (tagOpen, tagClose) => {
    const textarea = document.getElementById('rich-content-textarea');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);
    const replacement = tagOpen + selected + tagClose;

    const updatedValue = text.substring(0, start) + replacement + text.substring(end);
    setFormData(prev => ({ ...prev, content: updatedValue }));

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + tagOpen.length, start + tagOpen.length + selected.length);
    }, 50);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData();
      payload.append('title', formData.title);
      payload.append('slug', formData.slug);
      payload.append('excerpt', formData.excerpt);
      payload.append('content', formData.content);
      payload.append('author', formData.author);
      payload.append('category', formData.category);
      payload.append('category_color', formData.category_color);
      payload.append('meta_title', formData.meta_title);
      payload.append('meta_description', formData.meta_description);
      payload.append('canonical_url', formData.canonical_url);
      payload.append('og_title', formData.og_title);
      payload.append('og_description', formData.og_description);
      payload.append('schema_type', formData.schema_type);
      payload.append('index_page', formData.index_page ? 'true' : 'false');
      payload.append('follow_links', formData.follow_links ? 'true' : 'false');
      payload.append('image_alt_text', formData.image_alt_text);
      payload.append('h1_title', formData.h1_title);
      payload.append('faqs', JSON.stringify(faqs));

      if (formData.schema_markup.trim()) {
        try {
          const parsed = JSON.parse(formData.schema_markup);
          payload.append('schema_markup', JSON.stringify(parsed));
        } catch (err) {
          alert('Invalid JSON markup format in Schema settings.');
          return;
        }
      }

      if (imageFile) {
        payload.append('image', imageFile);
      }
      if (ogImageFile) {
        payload.append('og_image', ogImageFile);
      }

      if (editingArticle) {
        await api.updateArticle(editingArticle.slug, payload);
      } else {
        await api.createArticle(payload);
      }

      setImageFile(null);
      setOgImageFile(null);
      setIsEditing(false);
      fetchArticles();
    } catch (err) {
      console.error('Failed to save article:', err);
      alert('Failed to save article content. Ensure title/slug is unique.');
    }
  };

  const handleDelete = async (slug) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await api.deleteArticle(slug);
        fetchArticles();
      } catch (err) {
        console.error('Failed to delete article:', err);
        alert('Failed to delete article.');
      }
    }
  };

  // Stats calculation
  const publishedCount = articles.filter(a => a.index_page).length;
  const draftCount = articles.filter(a => !a.index_page).length;
  const reviewCount = articles.filter(a => !a.meta_description).length; // Simulated review
  const seoIssuesCount = articles.filter(a => calculateSEOScore(a) < 85).length;

  const getFilteredArticles = () => {
    let list = articles;
    if (activeFilter === 'published') {
      list = articles.filter(a => a.index_page);
    } else if (activeFilter === 'draft') {
      list = articles.filter(a => !a.index_page);
    } else if (activeFilter === 'review') {
      list = articles.filter(a => !a.meta_description);
    } else if (activeFilter === 'seo_issues') {
      list = articles.filter(a => calculateSEOScore(a) < 85);
    }
    
    if (searchQuery.trim()) {
      list = list.filter(art => 
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.slug.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return list;
  };

  const displayedArticles = getFilteredArticles();

  if (loading && !isEditing) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
        <p className="text-sm">Fetching clinical posts...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-sans">
      <AnimatePresence mode="wait">
        {!isEditing ? (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Header section matching screenshot */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Posts / Blog</h1>
                <p className="text-slate-500 text-xs mt-1">
                  Manage posts / blog like WordPress with SEO, schema, index/noindex and follow/nofollow controls.
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                <button
                  onClick={() => handleOpenEdit(null)}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-bold text-xs uppercase tracking-wider cursor-pointer shadow-sm transition-all"
                >
                  Add Article
                </button>
                <button
                  onClick={() => alert("Bulk SEO Editor Comming Soon!")}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-white border border-slate-250 text-slate-700 hover:bg-slate-50 rounded-lg font-bold text-xs uppercase tracking-wider cursor-pointer shadow-sm transition-all"
                >
                  <Filter size={14} /> Bulk SEO Edit
                </button>
              </div>
            </div>

            {/* Filter pills and Search matching screenshot */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-white p-3 border border-slate-200/80 rounded-2xl shadow-sm">
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: `All ${articles.length}` },
                  { id: 'published', label: `Published ${publishedCount}` },
                  { id: 'draft', label: `Draft ${draftCount}` },
                  { id: 'review', label: `Review ${reviewCount}` },
                  { id: 'seo_issues', label: `SEO Issues ${seoIssuesCount}` }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveFilter(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeFilter === tab.id
                        ? 'bg-primary-50 text-primary-600 border border-primary-100'
                        : 'text-slate-500 hover:text-slate-800 bg-slate-50 border border-transparent'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 w-full lg:w-72">
                <Search size={14} />
                <input 
                  type="text" 
                  placeholder="Search posts / blog..." 
                  className="bg-transparent border-none focus:outline-none text-xs w-full text-slate-800 placeholder-slate-400 font-medium"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Table view matching reference layout */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-x-auto">
              <table className="w-full text-left border-collapse select-none">
                <thead>
                  <tr className="bg-slate-50/75 border-b border-slate-200 text-slate-500 text-[10px] font-extrabold uppercase tracking-wider">
                    <th className="py-4 px-4 w-10 text-center"><input type="checkbox" className="rounded text-primary-600 focus:ring-primary-500" /></th>
                    <th className="py-4 px-4 w-72">Title</th>
                    <th className="py-4 px-3">Type</th>
                    <th className="py-4 px-3">Slug</th>
                    <th className="py-4 px-3">Status</th>
                    <th className="py-4 px-3">Index</th>
                    <th className="py-4 px-3">Follow</th>
                    <th className="py-4 px-4 w-32">SEO</th>
                    <th className="py-4 px-3">Schema</th>
                    <th className="py-4 px-4 text-center">Issue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                  {displayedArticles.map(article => {
                    const seoScore = calculateSEOScore(article);
                    const issue = getSEOIssue(article);
                    
                    return (
                      <tr key={article.slug} className="hover:bg-slate-50/40 transition-colors group">
                        <td className="py-4 px-4 text-center">
                          <input type="checkbox" className="rounded text-primary-600 focus:ring-primary-500" />
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex flex-col gap-0.5">
                            <span className="font-bold text-slate-900 group-hover:text-primary-600 transition-colors line-clamp-2 leading-relaxed">
                              {article.title}
                            </span>
                            <div className="flex gap-2.5 mt-1.5 text-[10px] font-bold text-slate-450 uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                              <button onClick={() => handleOpenEdit(article)} className="text-primary-600 hover:text-primary-700 cursor-pointer">Edit</button>
                              <span className="text-slate-300">|</span>
                              <button onClick={() => handleOpenEdit(article)} className="text-slate-600 hover:text-slate-800 cursor-pointer">Quick Edit</button>
                              <span className="text-slate-300">|</span>
                              <a href={`/blog/${article.slug}`} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-800 flex items-center gap-0.5">
                                View <ExternalLink size={10} />
                              </a>
                              <span className="text-slate-300">|</span>
                              <button onClick={() => { setActiveTab('seo'); handleOpenEdit(article); }} className="text-emerald-600 hover:text-emerald-700 cursor-pointer">SEO</button>
                              <span className="text-slate-300">|</span>
                              <button onClick={() => handleDelete(article.slug)} className="text-rose-650 hover:text-rose-850 cursor-pointer">Delete</button>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-3">
                          <span className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                            article.slug.startsWith('services/') 
                              ? 'bg-blue-50 text-blue-600 border border-blue-100'
                              : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                          }`}>
                            {article.slug.startsWith('services/') ? 'Service' : (article.category || 'Blog')}
                          </span>
                        </td>
                        <td className="py-4 px-3 font-mono text-[10px] text-slate-400 truncate max-w-[150px]">
                          /blog/{article.slug}/
                        </td>
                        <td className="py-4 px-3">
                          <span className={`inline-flex items-center gap-1 text-[10px] font-bold ${
                            article.index_page ? 'text-emerald-600' : 'text-amber-500'
                          }`}>
                            ● {article.index_page ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td className="py-4 px-3">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                            article.index_page ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                          }`}>
                            {article.index_page ? 'Index' : 'Noindex'}
                          </span>
                        </td>
                        <td className="py-4 px-3">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                            article.follow_links ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                          }`}>
                            {article.follow_links ? 'Follow' : 'Nofollow'}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-800 text-[10px] w-10">{seoScore} <span className="text-slate-400 font-normal">/100</span></span>
                            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${
                                  seoScore >= 85 ? 'bg-emerald-500' : seoScore >= 70 ? 'bg-amber-500' : 'bg-rose-500'
                                }`}
                                style={{ width: `${seoScore}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-3 font-medium text-slate-500">
                          {article.schema_type || 'Article'}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className={issue.class}>
                            {issue.text}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                  {displayedArticles.length === 0 && (
                    <tr>
                      <td colSpan="10" className="py-12 text-center text-slate-400">
                        <FileText className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                        <p className="font-bold">No articles found matching the search/filter criteria.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="editor"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
          >
            {/* Editor Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="text-slate-500 hover:bg-slate-100 p-2 rounded-xl cursor-pointer"
                >
                  <ArrowLeft size={18} />
                </button>
                <div>
                  <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                    {editingArticle ? `Edit Content: ${editingArticle.title}` : 'Add New Content'}
                  </h1>
                  <p className="text-slate-500 text-xs mt-0.5">Configure full blog post details, main cover photo, index directives, and custom schema markups.</p>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-slate-200 bg-slate-50/50 p-1 rounded-xl gap-1.5 max-w-lg">
              <button
                type="button"
                onClick={() => setActiveTab('basic')}
                className={`flex-1 py-2 px-3 font-bold text-xs uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                  activeTab === 'basic' ? 'bg-white text-primary-600 shadow-sm border border-slate-200/50' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Content
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('faqs')}
                className={`flex-1 py-2 px-3 font-bold text-xs uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                  activeTab === 'faqs' ? 'bg-white text-primary-600 shadow-sm border border-slate-200/50' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                FAQs ({faqs.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('media')}
                className={`flex-1 py-2 px-3 font-bold text-xs uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                  activeTab === 'media' ? 'bg-white text-primary-600 shadow-sm border border-slate-200/50' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Media & Alt
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('seo')}
                className={`flex-1 py-2 px-3 font-bold text-xs uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                  activeTab === 'seo' ? 'bg-white text-primary-600 shadow-sm border border-slate-200/50' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                SEO & Schema
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSave} className="space-y-6">
              <AnimatePresence mode="wait">
                
                {/* Basic Content Tab */}
                {activeTab === 'basic' && (
                  <motion.div
                    key="tab-basic"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-5"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Article Title</label>
                        <input 
                          type="text" 
                          required
                          className="w-full text-sm px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 ring-primary-500/20 focus:outline-none"
                          value={formData.title}
                          onChange={handleTitleChange}
                          placeholder="e.g. Can You Walk With ACL Tear?"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">URL Slug</label>
                        <input 
                          type="text" 
                          required
                          className="w-full text-sm px-4 py-3 border border-slate-200 bg-slate-50 rounded-xl focus:outline-none"
                          value={formData.slug}
                          onChange={e => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                          disabled={!!editingArticle}
                          placeholder="can-you-walk-with-acl-tear"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Author</label>
                        <input 
                          type="text" 
                          required
                          className="w-full text-sm px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 ring-primary-500/20 focus:outline-none"
                          value={formData.author}
                          onChange={e => setFormData(prev => ({ ...prev, author: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Category</label>
                        <input 
                          type="text" 
                          required
                          className="w-full text-sm px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 ring-primary-500/20 focus:outline-none"
                          value={formData.category}
                          onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Category Style Class</label>
                        <input 
                          type="text" 
                          required
                          className="w-full text-xs px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 ring-primary-500/20 focus:outline-none font-mono"
                          value={formData.category_color}
                          onChange={e => setFormData(prev => ({ ...prev, category_color: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Excerpt (Summary)</label>
                      <textarea 
                        required
                        rows={3}
                        className="w-full text-sm px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 ring-primary-500/20 focus:outline-none"
                        value={formData.excerpt}
                        onChange={e => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                        placeholder="Brief post excerpt..."
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Content Body (HTML)</label>
                      <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-50 border border-slate-200 border-b-0 rounded-t-xl mt-2 select-none">
                        <button type="button" onClick={() => insertHTMLTag('<strong>', '</strong>')} className="px-2 py-1 text-[10px] font-bold hover:bg-slate-200 rounded text-slate-700 cursor-pointer">B</button>
                        <button type="button" onClick={() => insertHTMLTag('<em>', '</em>')} className="px-2 py-1 text-[10px] italic hover:bg-slate-200 rounded text-slate-700 cursor-pointer">I</button>
                        <span className="w-px h-4 bg-slate-350 mx-1"></span>
                        <button type="button" onClick={() => insertHTMLTag('<h2>', '</h2>')} className="px-2 py-1 text-[10px] font-bold hover:bg-slate-200 rounded text-slate-700 cursor-pointer">H2</button>
                        <button type="button" onClick={() => insertHTMLTag('<h3>', '</h3>')} className="px-2 py-1 text-[10px] font-bold hover:bg-slate-200 rounded text-slate-700 cursor-pointer">H3</button>
                        <span className="w-px h-4 bg-slate-350 mx-1"></span>
                        <button type="button" onClick={() => insertHTMLTag('<p>', '</p>')} className="px-2 py-1 text-[10px] hover:bg-slate-200 rounded text-slate-700 cursor-pointer">P</button>
                        <button type="button" onClick={() => insertHTMLTag('<ul>\n  <li>', '</li>\n</ul>')} className="px-2 py-1 text-[10px] hover:bg-slate-200 rounded text-slate-700 cursor-pointer">List</button>
                        <button type="button" onClick={() => insertHTMLTag('<br/>\n', '')} className="px-2 py-1 text-[10px] hover:bg-slate-200 rounded text-slate-700 cursor-pointer">Break</button>
                      </div>
                      <textarea 
                        id="rich-content-textarea"
                        required
                        rows={12}
                        className="w-full text-sm px-4 py-3 border border-slate-200 rounded-b-xl focus:ring-2 ring-primary-500/20 focus:outline-none font-mono"
                        value={formData.content}
                        onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
                      />
                    </div>
                  </motion.div>
                )}

                {/* FAQs Tab */}
                {activeTab === 'faqs' && (
                  <motion.div
                    key="tab-faqs"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between bg-primary-50/60 border border-primary-100 p-4 rounded-2xl">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                          <HelpCircle size={16} className="text-primary-600" /> Article Frequently Asked Questions
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Add custom Q&A pairs for this article. These will be rendered in the article detail section.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleAddFAQ}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold text-xs cursor-pointer shadow-sm transition-all"
                      >
                        <Plus size={14} /> Add FAQ
                      </button>
                    </div>

                    {faqs.length === 0 ? (
                      <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center text-slate-400 bg-white">
                        <HelpCircle size={28} className="mx-auto mb-2 text-slate-300" />
                        <p className="text-xs font-semibold text-slate-600">No FAQs added for this article yet.</p>
                        <p className="text-[11px] text-slate-400 mt-1">Click "Add FAQ" above to create question and answer pairs.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {faqs.map((faq, index) => (
                          <div key={index} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3 relative group">
                            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                              <span className="text-xs font-bold text-primary-600 uppercase tracking-wider">
                                FAQ #{index + 1}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleRemoveFAQ(index)}
                                className="text-rose-500 hover:text-rose-700 hover:bg-rose-50 p-1.5 rounded-lg transition-colors cursor-pointer"
                                title="Remove FAQ"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                            
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Question</label>
                              <input
                                type="text"
                                className="w-full text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 ring-primary-500/20 focus:outline-none font-medium"
                                value={faq.question || ''}
                                onChange={e => handleUpdateFAQ(index, 'question', e.target.value)}
                                placeholder="e.g. How long is recovery after total knee replacement?"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Answer</label>
                              <textarea
                                rows={3}
                                className="w-full text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 ring-primary-500/20 focus:outline-none leading-relaxed"
                                value={faq.answer || ''}
                                onChange={e => handleUpdateFAQ(index, 'answer', e.target.value)}
                                placeholder="Detailed answer for this question..."
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Media & Alt Tab */}
                {activeTab === 'media' && (
                  <motion.div
                    key="tab-media"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-550 uppercase tracking-wider block">Main Article Image</label>
                        <div className="flex flex-col gap-3 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                          {imagePreview ? (
                            <div className="relative rounded-xl overflow-hidden bg-slate-100 border border-slate-200 max-h-48 flex items-center justify-center">
                              <img src={imagePreview} alt="main preview" className="object-cover max-h-48 w-full rounded-xl" />
                              <button type="button" onClick={() => { setImageFile(null); setImagePreview(''); }} className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-lg border-0 cursor-pointer"><X size={14} /></button>
                            </div>
                          ) : (
                            <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center text-slate-400 bg-white hover:bg-slate-50 transition-colors flex flex-col items-center justify-center gap-1.5">
                              <Activity size={24} className="text-slate-350" />
                              <span className="text-[11px] font-semibold text-slate-600">No Main Image</span>
                            </div>
                          )}
                          <div className="flex gap-2">
                            <input 
                              type="file" 
                              accept="image/*"
                              id="article-image-upload"
                              className="hidden"
                              onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    setImageFile(file);
                                    setImagePreview(URL.createObjectURL(file));
                                  }
                              }}
                            />
                            <label htmlFor="article-image-upload" className="flex-1 py-2 px-3 text-center border border-slate-250 hover:border-slate-300 hover:bg-slate-50 bg-white rounded-lg text-slate-700 font-bold text-[10px] uppercase tracking-wider cursor-pointer select-none transition-colors">Choose File</label>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-555 uppercase tracking-wider block">Social Share (OG) Image</label>
                        <div className="flex flex-col gap-3 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                          {ogImagePreview ? (
                            <div className="relative rounded-xl overflow-hidden bg-slate-100 border border-slate-200 max-h-48 flex items-center justify-center">
                              <img src={ogImagePreview} alt="og preview" className="object-cover max-h-48 w-full rounded-xl" />
                              <button type="button" onClick={() => { setOgImageFile(null); setOgImagePreview(''); }} className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-lg border-0 cursor-pointer"><X size={14} /></button>
                            </div>
                          ) : (
                            <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center text-slate-400 bg-white hover:bg-slate-50 transition-colors flex flex-col items-center justify-center gap-1.5">
                              <Globe size={24} className="text-slate-355" />
                              <span className="text-[11px] font-semibold text-slate-600">No OG Image</span>
                            </div>
                          )}
                          <div className="flex gap-2">
                            <input 
                              type="file" 
                              accept="image/*"
                              id="article-og-upload"
                              className="hidden"
                              onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    setOgImageFile(file);
                                    setOgImagePreview(URL.createObjectURL(file));
                                  }
                              }}
                            />
                            <label htmlFor="article-og-upload" className="flex-1 py-2 px-3 text-center border border-slate-250 hover:border-slate-300 hover:bg-slate-50 bg-white rounded-lg text-slate-700 font-bold text-[10px] uppercase tracking-wider cursor-pointer select-none transition-colors">Choose File</label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1 max-w-md">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Image Alt Text</label>
                      <input 
                        type="text" 
                        className="w-full text-sm px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 ring-primary-500/20 focus:outline-none"
                        value={formData.image_alt_text}
                        onChange={e => setFormData(prev => ({ ...prev, image_alt_text: e.target.value }))}
                      />
                    </div>
                  </motion.div>
                )}

                {/* SEO & Schema Tab */}
                {activeTab === 'seo' && (
                  <motion.div
                    key="tab-seo"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-5"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Meta Title (Override)</label>
                        <input 
                          type="text" 
                          className="w-full text-sm px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 ring-primary-500/20 focus:outline-none"
                          value={formData.meta_title}
                          onChange={e => setFormData(prev => ({ ...prev, meta_title: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">H1 Page Title (Override)</label>
                        <input 
                          type="text" 
                          className="w-full text-sm px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 ring-primary-500/20 focus:outline-none"
                          value={formData.h1_title}
                          onChange={e => setFormData(prev => ({ ...prev, h1_title: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Meta Description</label>
                      <textarea 
                        rows={2}
                        className="w-full text-sm px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 ring-primary-500/20 focus:outline-none"
                        value={formData.meta_description}
                        onChange={e => setFormData(prev => ({ ...prev, meta_description: e.target.value }))}
                      />
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="space-y-1 sm:col-span-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Canonical URL</label>
                        <input 
                          type="url" 
                          className="w-full text-sm px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 ring-primary-500/20 focus:outline-none"
                          value={formData.canonical_url}
                          onChange={e => setFormData(prev => ({ ...prev, canonical_url: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Schema Type</label>
                        <select 
                          className="w-full text-sm px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 ring-primary-500/20 focus:outline-none bg-white cursor-pointer"
                          value={formData.schema_type}
                          onChange={e => setFormData(prev => ({ ...prev, schema_type: e.target.value }))}
                        >
                          <option value="Article">Article Schema</option>
                          <option value="MedicalBusiness">Medical Business</option>
                          <option value="FAQPage">FAQ Schema</option>
                          <option value="None">None</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-xs font-bold text-slate-700 block">Index Page</label>
                          <span className="text-[10px] text-slate-400 font-medium">Allow search engines to index this.</span>
                        </div>
                        <input 
                          type="checkbox" 
                          className="w-5 h-5 rounded border-slate-350 text-primary-600 focus:ring-primary-500 cursor-pointer"
                          checked={formData.index_page}
                          onChange={e => setFormData(prev => ({ ...prev, index_page: e.target.checked }))}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-xs font-bold text-slate-700 block">Follow Links</label>
                          <span className="text-[10px] text-slate-400 font-medium">Allow crawlers to follow links.</span>
                        </div>
                        <input 
                          type="checkbox" 
                          className="w-5 h-5 rounded border-slate-355 text-primary-600 focus:ring-primary-500 cursor-pointer"
                          checked={formData.follow_links}
                          onChange={e => setFormData(prev => ({ ...prev, follow_links: e.target.checked }))}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">JSON-LD Schema Markup</label>
                      <textarea 
                        rows={4}
                        className="w-full text-xs px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 ring-primary-500/20 focus:outline-none font-mono"
                        value={formData.schema_markup}
                        onChange={e => setFormData(prev => ({ ...prev, schema_markup: e.target.value }))}
                      />
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>

              {/* Form Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-white border border-slate-250 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm cursor-pointer"
                >
                  Save
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ArticlesManager;
