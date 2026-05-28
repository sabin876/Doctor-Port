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
  ArrowLeft
} from 'lucide-react';
import { api } from '../../lib/api';

const ServicesManager = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Editor State
  const [isEditing, setIsEditing] = useState(false);
  const [editingService, setEditingService] = useState(null); // null means creating new
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    icon: 'activity',
    description: '',
    items: [],
    faqs: []
  });

  // Feature item and FAQ inputs
  const [newFeature, setNewFeature] = useState('');
  const [newFaq, setNewFaq] = useState({ question: '', answer: '' });

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
        faqs: Array.isArray(service.faqs) ? [...service.faqs] : []
      });
    } else {
      setEditingService(null);
      setFormData({
        title: '',
        slug: '',
        icon: 'activity',
        description: '',
        items: [],
        faqs: []
      });
    }
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
      if (editingService) {
        // Update existing service
        await api.updateService(editingService.slug, formData);
      } else {
        // Create new service
        await api.createService(formData);
      }
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

            {/* Form */}
            <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Form Settings (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                  <h3 className="text-lg font-bold text-slate-800 border-b border-slate-50 pb-2">Basic Settings</h3>
                  
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

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-600 uppercase">Lucide Icon Class</label>
                      <input 
                        type="text" 
                        required
                        className="w-full text-sm px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 ring-primary-500/20 focus:outline-none"
                        value={formData.icon}
                        onChange={e => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                        placeholder="e.g. activity, bone, cpu"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600 uppercase">Rich HTML Description</label>
                    <textarea 
                      required
                      rows={12}
                      className="w-full text-sm px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 ring-primary-500/20 focus:outline-none font-mono"
                      value={formData.description}
                      onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="<h3>Conditions Managed...</h3><p>Enter HTML description...</p>"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-4 mt-6">
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
              </div>

              {/* Right Sidebar Lists Settings (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                {/* Highlights Manager */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                  <h3 className="text-lg font-bold text-slate-800 border-b border-slate-50 pb-2">Key Highlights</h3>
                  
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

                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
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
                  <h3 className="text-lg font-bold text-slate-800 border-b border-slate-50 pb-2">Service FAQs</h3>

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
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServicesManager;
