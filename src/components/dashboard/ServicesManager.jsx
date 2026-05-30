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
  PlusCircle, 
  MinusCircle, 
  FileText, 
  HelpCircle,
  Activity,
  ArrowLeft,
  Bone,
  HeartPulse,
  Cpu,
  Layers,
  Stethoscope,
  Bandage,
  Shield,
  Zap,
  BookOpen,
  Eye,
  Undo2
} from 'lucide-react';
import { api } from '../../lib/api';

const ServicesManager = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Editor State
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const [editingService, setEditingService] = useState(null); // null means creating new
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    icon: 'activity',
    description: '',
    items: [],
    faqs: [],
    conditions: [],
    checklist_items: [],
    tag_badges: [],
    conditions_title: '',
    checklist_title: ''
  });

  // Feature item and FAQ inputs
  const [newFeature, setNewFeature] = useState('');
  const [newFaq, setNewFaq] = useState({ question: '', answer: '' });

  // Custom sections inputs (Conditions, checklist items, tag badges)
  const defaultSpineSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><path d="M12 2v20M5 12h14M8 5h8M8 19h8M6 8h12M6 16h12" /></svg>`;
  const [newCondition, setNewCondition] = useState({ title: '', description: '', icon: defaultSpineSvg });
  const [newChecklistItem, setNewChecklistItem] = useState('');
  const [newTagBadge, setNewTagBadge] = useState('');

  // Image Upload / Preview States
  const [mainImageFile, setMainImageFile] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState('');
  const [ogImageFile, setOgImageFile] = useState(null);
  const [ogImagePreview, setOgImagePreview] = useState('');
  const [checklistImageFile, setChecklistImageFile] = useState(null);
  const [checklistImagePreview, setChecklistImagePreview] = useState('');

  const insertHTMLTag = (tagOpen, tagClose) => {
    const textarea = document.getElementById('rich-description-textarea');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);
    const replacement = tagOpen + selected + tagClose;

    const updatedValue = text.substring(0, start) + replacement + text.substring(end);
    setFormData(prev => ({ ...prev, description: updatedValue }));

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + tagOpen.length, start + tagOpen.length + selected.length);
    }, 50);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const data = await api.getServices();
      setServices(data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch services:', err);
      setError('Could not load services from backend database.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenEdit = (service) => {
    if (service) {
      setEditingService(service);
      setFormData({
        title: service.title || '',
        slug: service.slug || '',
        icon: service.icon || 'activity',
        description: service.description || '',
        items: Array.isArray(service.items) ? [...service.items] : [],
        faqs: Array.isArray(service.faqs) ? [...service.faqs] : [],
        conditions: Array.isArray(service.conditions) ? [...service.conditions] : [],
        checklist_items: Array.isArray(service.checklist_items) ? [...service.checklist_items] : [],
        tag_badges: Array.isArray(service.tag_badges) ? [...service.tag_badges] : [],
        conditions_title: service.conditions_title || '',
        checklist_title: service.checklist_title || ''
      });
      setMainImagePreview(service.image || '');
      setOgImagePreview(service.og_image || '');
      setChecklistImagePreview(service.checklist_image || '');
    } else {
      setEditingService(null);
      setFormData({
        title: '',
        slug: '',
        icon: 'activity',
        description: '',
        items: [],
        faqs: [],
        conditions: [],
        checklist_items: [],
        tag_badges: [],
        conditions_title: '',
        checklist_title: ''
      });
      setMainImagePreview('');
      setOgImagePreview('');
      setChecklistImagePreview('');
    }
    setMainImageFile(null);
    setOgImageFile(null);
    setChecklistImageFile(null);
    setActiveTab('basic');
    setIsEditing(true);
  };

  const handleTitleChange = (e) => {
    const val = e.target.value;
    setFormData(prev => {
      const updated = { ...prev, title: val };
      // Auto-generate slug if creating a new service
      if (!editingService) {
        updated.slug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      }
      return updated;
    });
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFormData(prev => ({
        ...prev,
        items: [...prev.items, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (idx) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== idx)
    }));
  };

  const handleAddCondition = () => {
    if (newCondition.title.trim() && newCondition.description.trim()) {
      setFormData(prev => ({
        ...prev,
        conditions: [
          ...(prev.conditions || []),
          {
            id: (prev.conditions?.length || 0) + 1,
            title: newCondition.title.trim(),
            description: newCondition.description.trim(),
            icon: newCondition.icon.trim() || defaultSpineSvg
          }
        ]
      }));
      setNewCondition({ title: '', description: '', icon: defaultSpineSvg });
    }
  };

  const handleRemoveCondition = (idx) => {
    setFormData(prev => ({
      ...prev,
      conditions: (prev.conditions || []).filter((_, i) => i !== idx)
    }));
  };

  const handleAddChecklistItem = () => {
    if (newChecklistItem.trim()) {
      setFormData(prev => ({
        ...prev,
        checklist_items: [...(prev.checklist_items || []), newChecklistItem.trim()]
      }));
      setNewChecklistItem('');
    }
  };

  const handleRemoveChecklistItem = (idx) => {
    setFormData(prev => ({
      ...prev,
      checklist_items: (prev.checklist_items || []).filter((_, i) => i !== idx)
    }));
  };

  const handleAddTagBadge = () => {
    if (newTagBadge.trim()) {
      setFormData(prev => ({
        ...prev,
        tag_badges: [...(prev.tag_badges || []), newTagBadge.trim()]
      }));
      setNewTagBadge('');
    }
  };

  const handleRemoveTagBadge = (idx) => {
    setFormData(prev => ({
      ...prev,
      tag_badges: (prev.tag_badges || []).filter((_, i) => i !== idx)
    }));
  };

  const handleAddFaq = () => {
    if (newFaq.question.trim() && newFaq.answer.trim()) {
      setFormData(prev => ({
        ...prev,
        faqs: [...prev.faqs, { ...newFaq }]
      }));
      setNewFaq({ question: '', answer: '' });
    }
  };

  const handleRemoveFaq = (idx) => {
    setFormData(prev => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== idx)
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData();
      payload.append('title', formData.title);
      payload.append('slug', formData.slug);
      payload.append('icon', formData.icon);
      payload.append('description', formData.description);
      payload.append('items', JSON.stringify(formData.items));
      payload.append('faqs', JSON.stringify(formData.faqs));
      payload.append('conditions', JSON.stringify(formData.conditions || []));
      payload.append('checklist_items', JSON.stringify(formData.checklist_items || []));
      payload.append('tag_badges', JSON.stringify(formData.tag_badges || []));
      payload.append('conditions_title', formData.conditions_title || '');
      payload.append('checklist_title', formData.checklist_title || '');

      // Append files if they were chosen
      if (mainImageFile) {
        payload.append('image', mainImageFile);
      }
      if (ogImageFile) {
        payload.append('og_image', ogImageFile);
      }
      if (checklistImageFile) {
        payload.append('checklist_image', checklistImageFile);
      }

      if (editingService) {
        // Update existing service
        await api.updateService(editingService.slug, payload);
      } else {
        // Create new service
        await api.createService(payload);
      }

      // Reset file and preview states
      setMainImageFile(null);
      setOgImageFile(null);
      setChecklistImageFile(null);

      setIsEditing(false);
      fetchServices();
    } catch (err) {
      console.error('Failed to save service:', err);
      alert('Failed to save service content to backend database.');
    }
  };

  const handleDelete = async (slug) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await api.deleteService(slug);
        fetchServices();
      } catch (err) {
        console.error('Failed to delete service:', err);
        alert('Failed to delete service from database.');
      }
    }
  };

  const filteredServices = services.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading && !isEditing) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
        <p className="text-sm">Fetching clinical services list...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-sans">
      <AnimatePresence mode="wait">
        {!isEditing ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* Header Block */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Services Management</h1>
                <p className="text-slate-500 text-sm mt-1">Create, update, and organize clinic and home services.</p>
              </div>
              <button
                onClick={() => handleOpenEdit(null)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary-600 text-white rounded-xl font-medium text-sm shadow-md hover:bg-primary-700 active:scale-95 transition-all w-full sm:w-auto"
              >
                <Plus size={18} />
                Create Service
              </button>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-500 max-w-md shadow-sm">
              <Search size={18} />
              <input 
                type="text" 
                placeholder="Search services by title or slug..." 
                className="bg-transparent border-none focus:outline-none text-sm w-full text-slate-800 placeholder-slate-400"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>

            {error && (
              <div className="p-4 bg-red-50 text-red-700 rounded-xl text-sm border border-red-100 flex items-center gap-3">
                <MinusCircle size={18} />
                {error}
              </div>
            )}

            {/* Grid List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredServices.map(service => (
                <div 
                  key={service.slug}
                  className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary-50 text-primary-600 font-semibold border border-primary-100 uppercase">
                        {service.icon?.slice(0, 2) || 'sv'}
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 bg-slate-50 px-2 py-1 rounded">
                        /{service.slug}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold text-slate-800 tracking-tight group-hover:text-primary-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-light mt-1">
                      Last Updated: {new Date(service.updated_at).toLocaleDateString()}
                    </p>

                    <div className="mt-4 flex gap-4 text-xs text-slate-500 font-medium">
                      <span>✓ {service.items?.length || 0} Highlights</span>
                      <span>? {service.faqs?.length || 0} FAQs</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <button
                      onClick={() => handleOpenEdit(service)}
                      className="inline-flex items-center justify-center gap-2 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 hover:bg-slate-100 hover:text-slate-800 py-2.5 px-4 rounded-xl transition-all"
                    >
                      <Edit3 size={14} />
                      Edit Content
                    </button>
                    <button
                      onClick={() => handleDelete(service.slug)}
                      className="inline-flex items-center justify-center gap-2 text-xs font-semibold text-red-600 bg-red-50/50 border border-red-100 hover:bg-red-50 hover:text-red-700 py-2.5 px-4 rounded-xl transition-all"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </div>
              ))}

              {filteredServices.length === 0 && (
                <div className="col-span-full bg-slate-100 border border-slate-200/50 rounded-2xl p-12 text-center text-slate-500">
                  <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="font-semibold text-slate-700">No Services Found</p>
                  <p className="text-sm text-slate-400 mt-1">Try refining your search query or create a new service.</p>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="editor"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* Editor Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="text-slate-500 hover:bg-slate-100 p-2 rounded-lg"
                >
                  <ArrowLeft size={20} />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                    {editingService ? `Edit: ${editingService.title}` : 'Create New Service'}
                  </h1>
                  <p className="text-slate-500 text-xs">Configure service content, highlights, and custom FAQs.</p>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-slate-200 mb-6 bg-slate-50/50 p-1.5 rounded-xl gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('basic')}
                className={`py-2.5 px-6 font-semibold text-sm rounded-lg transition-all ${
                  activeTab === 'basic'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                1. Basic Info
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('highlights')}
                className={`py-2.5 px-6 font-semibold text-sm rounded-lg transition-all ${
                  activeTab === 'highlights'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                2. Highlights & FAQs
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('physio')}
                className={`py-2.5 px-6 font-semibold text-sm rounded-lg transition-all ${
                  activeTab === 'physio'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                3. Treatment & Value Sections
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSave} className="space-y-6 max-w-5xl mx-auto">
              <AnimatePresence mode="wait">
                {activeTab === 'basic' && (
                  <motion.div
                    key="tab-basic"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5"
                  >
                    <div className="border-b border-slate-100 pb-3">
                      <h3 className="text-lg font-bold text-slate-800">Basic Settings</h3>
                      <p className="text-xs text-slate-400">Configure title, slug identifier, icon name, and main descriptions.</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-600 uppercase">Service Title</label>
                        <input 
                          type="text" 
                          required
                          className="w-full text-sm px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 ring-primary-500/20 focus:outline-none"
                          value={formData.title}
                          onChange={handleTitleChange}
                          placeholder="e.g. Total Joint Replacement"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-600 uppercase">URL Slug</label>
                        <input 
                          type="text" 
                          required
                          className="w-full text-sm px-4 py-3 border border-slate-200 bg-slate-50 rounded-xl focus:outline-none"
                          value={formData.slug}
                          onChange={e => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                          disabled={!!editingService}
                          placeholder="e.g. joint-replacement"
                        />
                      </div>
                    </div>

                    {/* Visual Service Icon Category Selector */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Service Category Icon</label>
                      <p className="text-xs text-slate-400 font-light">Select a category icon representing the service's clinical specialty:</p>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 mt-2">
                        {[
                          { id: 'activity', name: 'Sports', Icon: Activity },
                          { id: 'bone', name: 'Joints', Icon: Bone },
                          { id: 'heart-pulse', name: 'Physio', Icon: HeartPulse },
                          { id: 'cpu', name: 'Robotic', Icon: Cpu },
                          { id: 'layers', name: 'Deformity', Icon: Layers },
                          { id: 'stethoscope', name: 'Clinic', Icon: Stethoscope },
                          { id: 'bandage', name: 'Trauma', Icon: Bandage }
                        ].map(opt => {
                          const isSelected = formData.icon === opt.id;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, icon: opt.id }))}
                              className={`flex flex-col items-center justify-center p-3 border rounded-xl transition-all cursor-pointer ${
                                isSelected 
                                  ? 'border-primary-600 bg-primary-50/50 text-primary-600 shadow-sm ring-1 ring-primary-500' 
                                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600'
                              }`}
                            >
                              <opt.Icon size={20} className="mb-1.5" />
                              <span className="text-[10px] font-semibold tracking-wide uppercase">{opt.name}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Service Page Description</label>
                      <p className="text-xs text-slate-400 font-light">Use the visual formatting toolbar below to style the main description for the client page:</p>
                      
                      {/* Rich Text Toolbar */}
                      <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-50 border border-slate-200 border-b-0 rounded-t-xl mt-2 select-none">
                        <button
                          type="button"
                          onClick={() => insertHTMLTag('<strong>', '</strong>')}
                          className="px-2.5 py-1 text-xs font-bold hover:bg-slate-200 rounded text-slate-700 cursor-pointer"
                          title="Bold"
                        >
                          B
                        </button>
                        <button
                          type="button"
                          onClick={() => insertHTMLTag('<em>', '</em>')}
                          className="px-2.5 py-1 text-xs italic hover:bg-slate-200 rounded text-slate-700 cursor-pointer"
                          title="Italic"
                        >
                          I
                        </button>
                        <span className="w-px h-4 bg-slate-300 mx-1"></span>
                        <button
                          type="button"
                          onClick={() => insertHTMLTag('<h2>', '</h2>')}
                          className="px-2 py-1 text-xs font-semibold hover:bg-slate-200 rounded text-slate-700 cursor-pointer"
                          title="Heading 2"
                        >
                          H2
                        </button>
                        <button
                          type="button"
                          onClick={() => insertHTMLTag('<h3>', '</h3>')}
                          className="px-2 py-1 text-xs font-semibold hover:bg-slate-200 rounded text-slate-700 cursor-pointer"
                          title="Heading 3"
                        >
                          H3
                        </button>
                        <span className="w-px h-4 bg-slate-300 mx-1"></span>
                        <button
                          type="button"
                          onClick={() => insertHTMLTag('<p>', '</p>')}
                          className="px-2 py-1 text-xs hover:bg-slate-200 rounded text-slate-700 cursor-pointer"
                          title="Paragraph"
                        >
                          P
                        </button>
                        <button
                          type="button"
                          onClick={() => insertHTMLTag('<ul>\n  <li>', '</li>\n</ul>')}
                          className="px-2 py-1 text-xs hover:bg-slate-200 rounded text-slate-700 cursor-pointer"
                          title="Bullet List"
                        >
                          • Bullet
                        </button>
                        <button
                          type="button"
                          onClick={() => insertHTMLTag('<ol>\n  <li>', '</li>\n</ol>')}
                          className="px-2 py-1 text-xs hover:bg-slate-200 rounded text-slate-700 cursor-pointer"
                          title="Numbered List"
                        >
                          1. Numbered
                        </button>
                        <button
                          type="button"
                          onClick={() => insertHTMLTag('<br/>\n', '')}
                          className="px-2 py-1 text-xs hover:bg-slate-200 rounded text-slate-700 cursor-pointer"
                          title="Line Break"
                        >
                          ⏎ Spacing
                        </button>
                      </div>

                      <textarea 
                        id="rich-description-textarea"
                        required
                        rows={12}
                        className="w-full text-sm px-4 py-3 border border-slate-200 rounded-b-xl focus:ring-2 ring-primary-500/20 focus:outline-none font-mono"
                        value={formData.description}
                        onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="e.g. <h2>Welcome to Orthopedics</h2><p>Our specialists provide advanced clinical care...</p>"
                      />
                    </div>

                    {/* Live HTML Preview Card */}
                    {formData.description && (
                      <div className="space-y-1.5 mt-4">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Live Output Preview (How client sees it)</label>
                        <div className="border border-slate-200 rounded-2xl p-6 bg-white prose prose-primary max-w-none max-h-72 overflow-y-auto font-sans leading-relaxed">
                          <div dangerouslySetInnerHTML={{ __html: formData.description }} />
                        </div>
                      </div>
                    )}

                    {/* Service Banner Image & SEO Image Row */}
                    <div className="grid sm:grid-cols-2 gap-6 pt-6 border-t border-slate-150">
                      {/* Main Service Image */}
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-600 uppercase">Service Banner Image</label>
                        <div className="flex flex-col gap-3 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                          {mainImagePreview ? (
                            <div className="relative group rounded-xl overflow-hidden bg-slate-100 border border-slate-200 max-h-40 flex items-center justify-center">
                              <img 
                                src={mainImagePreview} 
                                alt="Main Banner Preview" 
                                className="object-cover max-h-40 w-full rounded-xl transition-all duration-300 group-hover:scale-105" 
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  setMainImageFile(null);
                                  setMainImagePreview('');
                                }}
                                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-lg shadow-md transition-all active:scale-95 border-0 cursor-pointer flex items-center justify-center"
                                title="Remove Image"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          ) : (
                            <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center text-slate-400 bg-white hover:bg-slate-50 transition-colors flex flex-col items-center justify-center gap-1">
                              <Activity size={24} className="text-slate-300" />
                              <span className="text-[11px] font-medium text-slate-600">No Banner Image</span>
                              <span className="text-[10px] text-slate-400">Upload a photo for page banner</span>
                            </div>
                          )}
                          <div className="flex gap-2">
                            <input 
                              type="file" 
                              accept="image/*"
                              id="main-image-upload"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  setMainImageFile(file);
                                  setMainImagePreview(URL.createObjectURL(file));
                                }
                              }}
                            />
                            <label 
                              htmlFor="main-image-upload"
                              className="flex-1 py-2 px-3 text-center border border-slate-250 hover:border-slate-300 hover:bg-slate-50 bg-white rounded-lg text-slate-700 font-semibold text-[10px] uppercase tracking-wider cursor-pointer select-none transition-colors"
                            >
                              Choose Photo
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* SEO OG Image */}
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-600 uppercase">SEO Social Share Image (OG)</label>
                        <div className="flex flex-col gap-3 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                          {ogImagePreview ? (
                            <div className="relative group rounded-xl overflow-hidden bg-slate-100 border border-slate-200 max-h-40 flex items-center justify-center">
                              <img 
                                src={ogImagePreview} 
                                alt="OG Social Preview" 
                                className="object-cover max-h-40 w-full rounded-xl transition-all duration-300 group-hover:scale-105" 
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  setOgImageFile(null);
                                  setOgImagePreview('');
                                }}
                                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-lg shadow-md transition-all active:scale-95 border-0 cursor-pointer flex items-center justify-center"
                                title="Remove Image"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          ) : (
                            <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center text-slate-400 bg-white hover:bg-slate-50 transition-colors flex flex-col items-center justify-center gap-1">
                              <Activity size={24} className="text-slate-300" />
                              <span className="text-[11px] font-medium text-slate-600">No OG Image</span>
                              <span className="text-[10px] text-slate-400">Used when sharing page on social media</span>
                            </div>
                          )}
                          <div className="flex gap-2">
                            <input 
                              type="file" 
                              accept="image/*"
                              id="og-image-upload"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  setOgImageFile(file);
                                  setOgImagePreview(URL.createObjectURL(file));
                                }
                              }}
                            />
                            <label 
                              htmlFor="og-image-upload"
                              className="flex-1 py-2 px-3 text-center border border-slate-250 hover:border-slate-300 hover:bg-slate-50 bg-white rounded-lg text-slate-700 font-semibold text-[10px] uppercase tracking-wider cursor-pointer select-none transition-colors"
                            >
                              Choose Photo
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'highlights' && (
                  <motion.div
                    key="tab-highlights"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="grid md:grid-cols-2 gap-6"
                  >
                    {/* Highlights Manager */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                      <div className="border-b border-slate-100 pb-2">
                        <h3 className="text-lg font-bold text-slate-800">Key Highlights</h3>
                        <p className="text-xs text-slate-400">Add highlight bullets displayed at the top of the page.</p>
                      </div>
                      
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          className="w-full text-sm px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none"
                          placeholder="Add key highlight feature..."
                          value={newFeature}
                          onChange={e => setNewFeature(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
                        />
                        <button
                          type="button"
                          onClick={handleAddFeature}
                          className="text-primary-600 hover:bg-primary-50 p-2 rounded-xl"
                        >
                          <PlusCircle size={24} />
                        </button>
                      </div>

                      <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                        {formData.items.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between gap-3 p-3 bg-slate-50 border border-slate-100 rounded-xl">
                            <span className="text-xs text-slate-700 font-medium leading-snug">{item}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveFeature(idx)}
                              className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg"
                            >
                              <MinusCircle size={16} />
                            </button>
                          </div>
                        ))}
                        {formData.items.length === 0 && (
                          <p className="text-xs text-slate-400 text-center py-4 font-light">No highlights added yet.</p>
                        )}
                      </div>
                    </div>

                    {/* FAQ Manager */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                      <div className="border-b border-slate-100 pb-2">
                        <h3 className="text-lg font-bold text-slate-800">Service FAQs</h3>
                        <p className="text-xs text-slate-400">Add custom accordions for the Service FAQs section.</p>
                      </div>

                      <div className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <input 
                          type="text" 
                          className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none bg-white"
                          placeholder="FAQ Question..."
                          value={newFaq.question}
                          onChange={e => setNewFaq(prev => ({ ...prev, question: e.target.value }))}
                        />
                        <textarea 
                          rows={2}
                          className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none bg-white"
                          placeholder="FAQ Answer..."
                          value={newFaq.answer}
                          onChange={e => setNewFaq(prev => ({ ...prev, answer: e.target.value }))}
                        />
                        <button
                          type="button"
                          onClick={handleAddFaq}
                          className="inline-flex items-center justify-center gap-2 w-full text-xs font-semibold py-2 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100"
                        >
                          <Plus size={14} /> Add FAQ Item
                        </button>
                      </div>

                      <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                        {formData.faqs.map((faq, idx) => (
                          <div key={idx} className="p-3 bg-white border border-slate-150 rounded-xl space-y-1 relative group">
                            <button
                              type="button"
                              onClick={() => handleRemoveFaq(idx)}
                              className="absolute top-2 right-2 text-red-500 hover:bg-red-50 p-1 rounded-md"
                            >
                              <MinusCircle size={14} />
                            </button>
                            <p className="text-xs font-semibold text-slate-800 pr-6 leading-normal">{faq.question}</p>
                            <p className="text-[10px] text-slate-500 font-light leading-relaxed border-t border-slate-50 pt-1 mt-1">{faq.answer}</p>
                          </div>
                        ))}
                        {formData.faqs.length === 0 && (
                          <p className="text-xs text-slate-400 text-center py-4 font-light">No FAQs added yet.</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'physio' && (
                  <motion.div
                    key="tab-physio"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="grid md:grid-cols-12 gap-6"
                  >
                    {/* Visual Client Helper Info Box */}
                    <div className="md:col-span-12 bg-blue-50/40 border border-blue-100 rounded-2xl p-5 flex gap-4 text-slate-700">
                      <div className="w-10 h-10 rounded-xl bg-white text-blue-600 flex items-center justify-center shadow-sm flex-shrink-0 border border-blue-50">
                        <HelpCircle size={20} className="text-blue-650" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-blue-900">How do Custom Sections work?</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          These fields let you build a fully custom treatment showcase page for your clients. Any items you add here will automatically generate:
                        </p>
                        <ul className="text-xs text-slate-500 list-disc pl-4 space-y-1 mt-1.5 leading-relaxed">
                          <li><strong>Conditions Treated Grid:</strong> A grid showing up to 8 core pain areas, conditions, or clinical focuses (with icons and short descriptions).</li>
                          <li><strong>Value Checklist:</strong> Bullet points showing "Why Choose Us" features (like clinic-based care or specialist guidance) next to an illustration.</li>
                          <li><strong>Quality Badges:</strong> Small highlights (like certification or training badges) below the checklist illustration.</li>
                        </ul>
                      </div>
                    </div>

                    {/* Headings & Illustration Config (Full Width - 12 cols) */}
                    <div className="md:col-span-12 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                      <div className="border-b border-slate-100 pb-2">
                        <h3 className="text-lg font-bold text-slate-800">Section Headings & Illustration</h3>
                        <p className="text-xs text-slate-400">Customize headings and the illustration image for the Conditions and Value Checklist sections.</p>
                      </div>
                      <div className="grid sm:grid-cols-3 gap-6">
                        <div className="sm:col-span-2 space-y-4">
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-600 uppercase">Conditions Section Heading</label>
                            <input 
                              type="text" 
                              className="w-full text-sm px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 ring-primary-500/20 focus:outline-none"
                              value={formData.conditions_title}
                              onChange={e => setFormData(prev => ({ ...prev, conditions_title: e.target.value }))}
                              placeholder="e.g. Professional care for pain, stiffness, and movement problems"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-600 uppercase">Value Checklist Heading</label>
                            <input 
                              type="text" 
                              className="w-full text-sm px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 ring-primary-500/20 focus:outline-none"
                              value={formData.checklist_title}
                              onChange={e => setFormData(prev => ({ ...prev, checklist_title: e.target.value }))}
                              placeholder="e.g. Clinical structure, one-to-one care, and clear treatment direction"
                            />
                          </div>
                        </div>

                        {/* Checklist Section Illustration Upload */}
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-600 uppercase">Checklist Section Image / Illustration</label>
                          <div className="flex flex-col gap-3 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                            {checklistImagePreview ? (
                              <div className="relative group rounded-xl overflow-hidden bg-slate-100 border border-slate-200 h-28 flex items-center justify-center">
                                <img 
                                  src={checklistImagePreview} 
                                  alt="Checklist Section Preview" 
                                  className="object-contain h-28 w-full rounded-xl transition-all duration-300 group-hover:scale-105" 
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    setChecklistImageFile(null);
                                    setChecklistImagePreview('');
                                  }}
                                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-lg shadow-md transition-all active:scale-95 border-0 cursor-pointer flex items-center justify-center"
                                  title="Remove Illustration"
                                >
                                  <X size={14} />
                                </button>
                              </div>
                            ) : (
                              <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center text-slate-400 bg-white h-28 hover:bg-slate-50 transition-colors flex flex-col items-center justify-center">
                                <span className="text-[10px] font-semibold text-slate-600">Default Therapist SVG</span>
                                <span className="text-[9px] text-slate-400">Reverts to custom SVG illustration</span>
                              </div>
                            )}
                            <div className="flex gap-2">
                              <input 
                                type="file" 
                                accept="image/*"
                                id="checklist-image-upload"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    setChecklistImageFile(file);
                                    setChecklistImagePreview(URL.createObjectURL(file));
                                  }
                                }}
                              />
                              <label 
                                htmlFor="checklist-image-upload"
                                className="flex-1 py-1.5 px-3 text-center border border-slate-250 hover:border-slate-300 hover:bg-slate-50 bg-white rounded-lg text-slate-700 font-semibold text-[9px] uppercase tracking-wider cursor-pointer select-none transition-colors"
                              >
                                Upload Image
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Left Column checklist & tags (5 cols) */}
                    <div className="md:col-span-5 space-y-6">
                      {/* Value Checklist Manager */}
                      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                        <div className="border-b border-slate-100 pb-2">
                          <h3 className="text-base font-bold text-slate-800">Value Checklist</h3>
                          <p className="text-[10px] text-slate-400">Checked items under 'Why Choose Our Services'.</p>
                        </div>
                        
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none bg-white"
                            placeholder="Add checklist item..."
                            value={newChecklistItem}
                            onChange={e => setNewChecklistItem(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddChecklistItem())}
                          />
                          <button
                            type="button"
                            onClick={handleAddChecklistItem}
                            className="text-primary-600 hover:bg-primary-50 p-1 rounded-lg"
                          >
                            <PlusCircle size={20} />
                          </button>
                        </div>

                        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                          {(formData.checklist_items || []).map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between gap-2 p-2 bg-slate-50 border border-slate-100 rounded-xl">
                              <span className="text-[11px] text-slate-700 font-medium leading-snug">{item}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveChecklistItem(idx)}
                                className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg"
                              >
                                <MinusCircle size={14} />
                              </button>
                            </div>
                          ))}
                          {(formData.checklist_items || []).length === 0 && (
                            <p className="text-[10px] text-slate-400 text-center py-2 font-light">Using default checklist items.</p>
                          )}
                        </div>
                      </div>

                      {/* Tag Badges Manager */}
                      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                        <div className="border-b border-slate-100 pb-2">
                          <h3 className="text-base font-bold text-slate-800">Tag Badges</h3>
                          <p className="text-[10px] text-slate-400">Badges displayed below the checklist layout.</p>
                        </div>
                        
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none bg-white"
                            placeholder="Add tag badge..."
                            value={newTagBadge}
                            onChange={e => setNewTagBadge(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddTagBadge())}
                          />
                          <button
                            type="button"
                            onClick={handleAddTagBadge}
                            className="text-primary-600 hover:bg-primary-50 p-1 rounded-lg"
                          >
                            <PlusCircle size={20} />
                          </button>
                        </div>

                        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                          {(formData.tag_badges || []).map((badge, idx) => (
                            <div key={idx} className="flex items-center justify-between gap-2 p-2 bg-slate-50 border border-slate-100 rounded-xl">
                              <span className="text-[11px] text-slate-700 font-medium leading-snug">{badge}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveTagBadge(idx)}
                                className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg"
                              >
                                <MinusCircle size={14} />
                              </button>
                            </div>
                          ))}
                          {(formData.tag_badges || []).length === 0 && (
                            <p className="text-[10px] text-slate-400 text-center py-2 font-light">Using default tag badges.</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right Column Conditions Grid (7 cols) */}
                    <div className="md:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                      <div className="border-b border-slate-100 pb-2">
                        <h3 className="text-lg font-bold text-slate-800">Conditions Treated & Focus Areas</h3>
                        <p className="text-xs text-slate-400">Configure the 8 core pain/stiffness or clinical specialty grid cards.</p>
                      </div>
                      
                      <div className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="grid sm:grid-cols-2 gap-3">
                          <input 
                            type="text" 
                            className="w-full text-xs px-3 py-2.5 border border-slate-200 rounded-lg focus:outline-none bg-white font-medium"
                            placeholder="Condition Title (e.g. Back pain)"
                            value={newCondition.title}
                            onChange={e => setNewCondition(prev => ({ ...prev, title: e.target.value }))}
                          />
                          <div className="hidden">
                            <input type="hidden" value={newCondition.icon} />
                          </div>
                        </div>

                        {/* Curated visual grid selector for Condition Icon */}
                        <div className="space-y-1.5 mt-1">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Condition Card Icon</label>
                          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                            {[
                              { id: 'spine', name: 'Spine', Icon: Bone, svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><path d="M12 2v20M5 12h14M8 5h8M8 19h8M6 8h12M6 16h12" /></svg>` },
                              { id: 'knee', name: 'Joint', Icon: HeartPulse, svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><circle cx="12" cy="12" r="9" /><path d="M12 8v4l3 3" /></svg>` },
                              { id: 'shoulder', name: 'Shoulder', Icon: Layers, svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><circle cx="12" cy="12" r="3" /><circle cx="12" cy="12" r="8" /></svg>` },
                              { id: 'pain', name: 'Pain', Icon: Zap, svg: `<svg viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>` },
                              { id: 'sports', name: 'Sports', Icon: Activity, svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>` },
                              { id: 'care', name: 'Clinic', Icon: Stethoscope, svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><path d="M4.8 2.5A2.3 2.3 0 0 0 2.5 4.8v4.4a8.8 8.8 0 0 0 8.8 8.8h1.4a8.8 8.8 0 0 0 8.8-8.8V4.8a2.3 2.3 0 0 0-2.3-2.3M12 18v3m-3 0h6" /></svg>` },
                              { id: 'shield', name: 'Safety', Icon: Shield, svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>` },
                              { id: 'refresh', name: 'Rehab', Icon: Undo2, svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" /></svg>` }
                            ].map(opt => {
                              const isSelected = newCondition.icon === opt.svg;
                              return (
                                <button
                                  key={opt.id}
                                  type="button"
                                  onClick={() => setNewCondition(prev => ({ ...prev, icon: opt.svg }))}
                                  className={`flex flex-col items-center justify-center p-2 border rounded-xl transition-all cursor-pointer ${
                                    isSelected 
                                      ? 'border-primary-600 bg-primary-50/50 text-primary-600 shadow-sm ring-1 ring-primary-500' 
                                      : 'border-slate-200 hover:border-slate-350 hover:bg-slate-50 text-slate-500'
                                  }`}
                                >
                                  <opt.Icon size={16} className="mb-1" />
                                  <span className="text-[9px] font-medium leading-none">{opt.name}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                        <textarea 
                          rows={2}
                          className="w-full text-xs px-3 py-2.5 border border-slate-200 rounded-lg focus:outline-none bg-white"
                          placeholder="Condition Description..."
                          value={newCondition.description}
                          onChange={e => setNewCondition(prev => ({ ...prev, description: e.target.value }))}
                        />
                        <button
                          type="button"
                          onClick={handleAddCondition}
                          className="inline-flex items-center justify-center gap-2 w-full text-xs font-semibold py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-sm"
                        >
                          <Plus size={14} /> Add Focus/Condition Card
                        </button>
                      </div>

                      <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                        {(formData.conditions || []).map((cond, idx) => (
                          <div key={idx} className="p-3 bg-slate-50 border border-slate-150 rounded-xl space-y-1 relative group">
                            <button
                              type="button"
                              onClick={() => handleRemoveCondition(idx)}
                              className="absolute top-2 right-2 text-red-500 hover:bg-red-100 p-1.5 rounded-md"
                            >
                              <MinusCircle size={14} />
                            </button>
                            <p className="text-xs font-semibold text-slate-800 pr-6 leading-normal">{cond.title}</p>
                            <p className="text-[10px] text-slate-500 font-light leading-relaxed border-t border-slate-100/50 pt-1 mt-1">{cond.description}</p>
                          </div>
                        ))}
                        {(formData.conditions || []).length === 0 && (
                          <p className="text-xs text-slate-400 text-center py-4 font-light">Using default conditions list.</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-4 border-t border-slate-100 pt-6">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-sm rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary-600 text-white font-semibold text-sm rounded-xl hover:bg-primary-700 active:scale-95 transition-all shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServicesManager;
