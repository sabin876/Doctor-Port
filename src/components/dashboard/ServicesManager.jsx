import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
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
  Undo2,
  Bot,
  Save,
  CheckCircle2,
  AlertCircle,
  Terminal,
  ShieldCheck
} from 'lucide-react';
import { api } from '../../lib/api';

const categoryOptions = [
  { value: 'knee', label: 'Knee Replacement' },
  { value: 'acl', label: 'ACL or Meniscus Surgery' },
  { value: 'hipShoulder', label: 'Hip or Shoulder Surgery' },
  { value: 'fracture', label: 'Fracture or Trauma Treatment' },
  { value: 'general', label: 'General Orthopedic Second Opinion' }
];

const ServicesManager = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeSection, setActiveSection] = useState('services'); // 'services', 'second-opinions', 'robots'

  // Robots.txt Section State
  const [robotsContent, setRobotsContent] = useState(`User-agent: *\nAllow: /\n\n# Disallow private dashboard & admin panels\nDisallow: /admin/\nDisallow: /dashboard/\n\n# Sitemap location\nSitemap: https://drulhasorthopedic.com/sitemap.xml`);
  const [robotsLoading, setRobotsLoading] = useState(false);
  const [robotsSaving, setRobotsSaving] = useState(false);
  const [robotsSuccessMsg, setRobotsSuccessMsg] = useState('');
  const [robotsErrorMsg, setRobotsErrorMsg] = useState('');
  const [testUrlInput, setTestUrlInput] = useState('/services/knee-replacement-knee-preservation-surgery');
  const [testResult, setTestResult] = useState(null);

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Second Opinions Management State
  const [secondOpinions, setSecondOpinions] = useState([]);
  const [soLoading, setSoLoading] = useState(false);
  const [soSearchQuery, setSoSearchQuery] = useState('');
  const [soModalOpen, setSoModalOpen] = useState(false);
  const [soEditingItem, setSoEditingItem] = useState(null);
  const [soSaving, setSoSaving] = useState(false);
  const [soFormData, setSoFormData] = useState({
    title: '',
    category: 'knee',
    paragraph_1: '',
    paragraph_2: '',
    order: 0,
    is_active: true
  });
  
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
    sub_services: [],
    conditions_title: '',
    checklist_title: '',
    cta_title: '',
    cta_subtitle: '',
    cta_button_text: '',
    cta_button_link: ''
  });

  // Feature item and FAQ inputs
  const [newFeature, setNewFeature] = useState('');
  const [newFaq, setNewFaq] = useState({ question: '', answer: '' });
  const [newSubService, setNewSubService] = useState({ title: '', slug: '', description: '' });

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

  useEffect(() => {
    if (searchParams.get('tab') === 'robots') {
      setActiveSection('robots');
    }
  }, [searchParams]);

  useEffect(() => {
    if (activeSection === 'robots') {
      fetchRobotsTxt();
    }
  }, [activeSection]);

  const fetchRobotsTxt = async () => {
    try {
      setRobotsLoading(true);
      const data = await api.getSiteSettings();
      if (data && data.robots_txt) {
        setRobotsContent(data.robots_txt);
      }
    } catch (err) {
      console.error('Failed to load robots.txt:', err);
    } finally {
      setRobotsLoading(false);
    }
  };

  const handleSaveRobots = async (e) => {
    e.preventDefault();
    try {
      setRobotsSaving(true);
      setRobotsSuccessMsg('');
      setRobotsErrorMsg('');
      await api.updateSiteSettings({ robots_txt: robotsContent });
      setRobotsSuccessMsg('Robots.txt updated & published to backend server successfully!');
      setTimeout(() => setRobotsSuccessMsg(''), 4000);
    } catch (err) {
      console.error('Failed to save robots.txt:', err);
      setRobotsErrorMsg(err.message || 'Failed to save robots.txt');
    } finally {
      setRobotsSaving(false);
    }
  };

  const handleTestRobotsUrl = () => {
    if (!testUrlInput.trim()) return;
    const lines = robotsContent.split('\n');
    let isDisallowed = false;
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.toLowerCase().startsWith('disallow:')) {
        const path = trimmed.substring(9).trim();
        if (path && path !== '/' && testUrlInput.startsWith(path)) {
          isDisallowed = true;
          break;
        } else if (path === '/') {
          isDisallowed = true;
          break;
        }
      }
    }
    setTestResult({
      url: testUrlInput,
      allowed: !isDisallowed,
      statusText: !isDisallowed ? 'ALLOWED for search engine crawling & indexing' : 'DISALLOWED by robots.txt directives'
    });
  };

  const fetchSecondOpinions = async () => {
    setSoLoading(true);
    try {
      const data = await api.getSecondOpinions();
      setSecondOpinions(data || []);
    } catch (err) {
      console.error('Failed to load second opinions:', err);
    } finally {
      setSoLoading(false);
    }
  };

  useEffect(() => {
    if (activeSection === 'second-opinions') {
      fetchSecondOpinions();
    }
  }, [activeSection]);

  const handleOpenAddSO = () => {
    setSoEditingItem(null);
    setSoFormData({
      title: '',
      category: 'knee',
      paragraph_1: '',
      paragraph_2: '',
      order: secondOpinions.length + 1,
      is_active: true
    });
    setSoModalOpen(true);
  };

  const handleOpenEditSO = (item) => {
    setSoEditingItem(item);
    setSoFormData({
      title: item.title || '',
      category: item.category || 'knee',
      paragraph_1: item.paragraph_1 || '',
      paragraph_2: item.paragraph_2 || '',
      order: item.order ?? 0,
      is_active: item.is_active ?? true
    });
    setSoModalOpen(true);
  };

  const handleDeleteSO = async (id) => {
    if (!window.confirm("Are you sure you want to delete this second opinion item?")) return;
    try {
      await api.deleteSecondOpinion(id);
      fetchSecondOpinions();
    } catch (err) {
      console.error("Delete second opinion failed:", err);
      alert("Failed to delete item.");
    }
  };

  const handleToggleActiveSO = async (item) => {
    try {
      await api.updateSecondOpinion(item.id, { is_active: !item.is_active });
      fetchSecondOpinions();
    } catch (err) {
      console.error("Toggle active second opinion failed:", err);
      alert("Failed to update status.");
    }
  };

  const handleSubmitSO = async (e) => {
    e.preventDefault();
    if (!soFormData.title || !soFormData.paragraph_1 || !soFormData.paragraph_2) {
      alert("Please fill in all required fields.");
      return;
    }

    setSoSaving(true);
    try {
      if (soEditingItem) {
        await api.updateSecondOpinion(soEditingItem.id, soFormData);
      } else {
        await api.createSecondOpinion(soFormData);
      }
      setSoModalOpen(false);
      fetchSecondOpinions();
    } catch (err) {
      console.error("Save second opinion failed:", err);
      alert(err.message || "Failed to save item.");
    } finally {
      setSoSaving(false);
    }
  };

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
        sub_services: Array.isArray(service.sub_services) ? [...service.sub_services] : [],
        conditions_title: service.conditions_title || '',
        checklist_title: service.checklist_title || '',
        cta_title: service.cta_title || '',
        cta_subtitle: service.cta_subtitle || '',
        cta_button_text: service.cta_button_text || '',
        cta_button_link: service.cta_button_link || '',
        second_opinion_is_active: service.second_opinion_is_active ?? false,
        second_opinion_badge: service.second_opinion_badge || 'Specialized Orthopedic Care',
        second_opinion_title: service.second_opinion_title || 'Second Opinion Services',
        second_opinion_description: service.second_opinion_description || 'Get expert evaluation and clear, evidence-based recommendations before undergoing surgery or complex orthopedic treatment.'
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
        sub_services: [],
        conditions_title: '',
        checklist_title: '',
        cta_title: '',
        cta_subtitle: '',
        cta_button_text: '',
        cta_button_link: '',
        second_opinion_is_active: false,
        second_opinion_badge: 'Specialized Orthopedic Care',
        second_opinion_title: 'Second Opinion Services',
        second_opinion_description: 'Get expert evaluation and clear, evidence-based recommendations before undergoing surgery or complex orthopedic treatment.'
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

  const handleAddSubService = () => {
    if (newSubService.title.trim()) {
      setFormData(prev => ({
        ...prev,
        sub_services: [
          ...(prev.sub_services || []),
          {
            title: newSubService.title.trim(),
            slug: newSubService.slug.trim() || newSubService.title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
            description: newSubService.description.trim()
          }
        ]
      }));
      setNewSubService({ title: '', slug: '', description: '' });
    }
  };

  const handleRemoveSubService = (idx) => {
    setFormData(prev => ({
      ...prev,
      sub_services: (prev.sub_services || []).filter((_, i) => i !== idx)
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
      payload.append('sub_services', JSON.stringify(formData.sub_services || []));
      payload.append('faqs', JSON.stringify(formData.faqs));
      payload.append('conditions', JSON.stringify(formData.conditions || []));
      payload.append('checklist_items', JSON.stringify(formData.checklist_items || []));
      payload.append('tag_badges', JSON.stringify(formData.tag_badges || []));
      payload.append('conditions_title', formData.conditions_title || '');
      payload.append('checklist_title', formData.checklist_title || '');
      payload.append('cta_title', formData.cta_title || '');
      payload.append('cta_subtitle', formData.cta_subtitle || '');
      payload.append('cta_button_text', formData.cta_button_text || '');
      payload.append('cta_button_link', formData.cta_button_link || '');
      payload.append('second_opinion_is_active', formData.second_opinion_is_active ? 'true' : 'false');
      payload.append('second_opinion_badge', formData.second_opinion_badge || '');
      payload.append('second_opinion_title', formData.second_opinion_title || '');
      payload.append('second_opinion_description', formData.second_opinion_description || '');

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
            {/* Section Switcher Navigation Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => setActiveSection('services')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-xs transition-all ${
                    activeSection === 'services'
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Stethoscope size={16} />
                  <span>Clinical Services & Procedures</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveSection('second-opinions')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-xs transition-all ${
                    activeSection === 'second-opinions'
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Layers size={16} />
                  <span>Second Opinion Care</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveSection('robots')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-xs transition-all ${
                    activeSection === 'robots'
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Bot size={16} />
                  <span>Robots.txt & Indexing Rules</span>
                </button>
              </div>

              {activeSection === 'services' ? (
                <button
                  onClick={() => handleOpenEdit(null)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary-600 text-white rounded-xl font-medium text-xs shadow-md hover:bg-primary-700 active:scale-95 transition-all"
                >
                  <Plus size={16} />
                  <span>Add New Service</span>
                </button>
              ) : activeSection === 'second-opinions' ? (
                <button
                  onClick={handleOpenAddSO}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary-600 text-white rounded-xl font-medium text-xs shadow-md hover:bg-primary-700 active:scale-95 transition-all"
                >
                  <Plus size={16} />
                  <span>Add Second Opinion</span>
                </button>
              ) : (
                <a
                  href="http://127.0.0.1:8000/robots.txt"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-800 text-white rounded-xl font-medium text-xs shadow-md hover:bg-slate-900 active:scale-95 transition-all"
                >
                  <Terminal size={16} />
                  <span>View Live robots.txt</span>
                </a>
              )}
            </div>

            {activeSection === 'robots' ? (
              /* Robots.txt & Crawling Directives Section */
              <div className="space-y-6">
                <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-600">
                        <Bot size={24} />
                      </div>
                      <div>
                        <h2 className="text-xl font-extrabold text-slate-900">Robots.txt & Crawling Directives</h2>
                        <p className="text-xs text-slate-500">Configure search engine bot access rules for Services, Sub-Services, and core site routes.</p>
                      </div>
                    </div>
                  </div>

                  {robotsSuccessMsg && (
                    <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold rounded-2xl flex items-center gap-3">
                      <CheckCircle2 size={18} className="text-emerald-600" />
                      {robotsSuccessMsg}
                    </div>
                  )}

                  {robotsErrorMsg && (
                    <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 text-sm font-semibold rounded-2xl flex items-center gap-3">
                      <AlertCircle size={18} className="text-rose-600" />
                      {robotsErrorMsg}
                    </div>
                  )}

                  <form onSubmit={handleSaveRobots} className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                          Robots.txt Content Editor
                        </label>
                        <button
                          type="button"
                          onClick={() => setRobotsContent("User-agent: *\nAllow: /\n\n# Disallow private dashboard & admin panels\nDisallow: /admin/\nDisallow: /dashboard/\n\n# Sitemap location\nSitemap: https://drulhasorthopedic.com/sitemap.xml")}
                          className="text-[11px] font-semibold text-primary-600 hover:underline cursor-pointer"
                        >
                          Apply Standard Medical Preset
                        </button>
                      </div>
                      <textarea
                        rows={10}
                        value={robotsContent}
                        onChange={(e) => setRobotsContent(e.target.value)}
                        className="w-full p-4 bg-slate-900 text-emerald-400 font-mono text-xs rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/30 leading-relaxed"
                        placeholder="User-agent: *&#10;Allow: /"
                      />
                    </div>

                    <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                        <ShieldCheck size={16} className="text-primary-600" /> Test Sub-Service URL Crawl Permission
                      </h4>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <input
                          type="text"
                          value={testUrlInput}
                          onChange={(e) => setTestUrlInput(e.target.value)}
                          placeholder="e.g. /services/robotic-knee-replacement-surgery"
                          className="flex-1 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-primary-500"
                        />
                        <button
                          type="button"
                          onClick={handleTestRobotsUrl}
                          className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold text-xs cursor-pointer transition-all"
                        >
                          Test Crawl Rule
                        </button>
                      </div>

                      {testResult && (
                        <div className={`p-3 rounded-xl border text-xs font-semibold flex items-center gap-2 ${
                          testResult.allowed ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'
                        }`}>
                          {testResult.allowed ? <CheckCircle2 size={16} className="text-emerald-600" /> : <AlertCircle size={16} className="text-rose-600" />}
                          <span>URL <code className="bg-white/50 px-1 py-0.5 rounded">{testResult.url}</code> is <strong>{testResult.statusText}</strong></span>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="submit"
                        disabled={robotsSaving}
                        className="flex items-center gap-2 px-8 py-3.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold text-xs shadow-md active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
                      >
                        <Save size={16} />
                        {robotsSaving ? 'Updating...' : 'Save & Publish Robots.txt'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ) : activeSection === 'second-opinions' ? (
              /* Second Opinions Management Section */
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200/80">
                  <div className="relative w-full sm:w-80">
                    <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search second opinions..."
                      value={soSearchQuery}
                      onChange={(e) => setSoSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary-500 transition-colors"
                    />
                  </div>

                  <span className="text-xs text-slate-500 font-medium">
                    Showing {secondOpinions.filter(op => op.title.toLowerCase().includes(soSearchQuery.toLowerCase())).length} items
                  </span>
                </div>

                {soLoading ? (
                  <div className="flex justify-center py-16 bg-white rounded-3xl border border-slate-100">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {secondOpinions
                      .filter(op => op.title.toLowerCase().includes(soSearchQuery.toLowerCase()))
                      .map((item) => {
                        const catObj = categoryOptions.find(c => c.value === item.category);
                        return (
                          <div 
                            key={item.id}
                            className={`bg-white rounded-2xl border transition-all duration-300 p-6 flex flex-col justify-between space-y-4 shadow-xs ${
                              item.is_active ? 'border-slate-200/80 hover:border-primary-200' : 'border-slate-200 bg-slate-50/50 opacity-75'
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-end gap-2 mb-3">
                                <span className="text-xs text-slate-400 font-mono">Order: #{item.order}</span>
                                <button
                                  onClick={() => handleToggleActiveSO(item)}
                                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-colors ${
                                    item.is_active 
                                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                                      : 'bg-slate-200 text-slate-600'
                                  }`}
                                >
                                  {item.is_active ? 'Active' : 'Draft'}
                                </button>
                              </div>

                              <h3 className="text-base font-bold text-slate-900 leading-snug mb-3">
                                {item.title}
                              </h3>

                              <div className="space-y-2 text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <p><strong className="text-slate-800">Paragraph 1:</strong> {item.paragraph_1}</p>
                                <p><strong className="text-slate-800">Paragraph 2:</strong> {item.paragraph_2}</p>
                              </div>
                            </div>

                            <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                              <button
                                onClick={() => handleOpenEditSO(item)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-semibold rounded-lg transition-colors"
                              >
                                <Edit3 size={14} />
                                <span>Edit</span>
                              </button>

                              <button
                                onClick={() => handleDeleteSO(item.id)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 hover:bg-red-100 text-xs font-semibold rounded-lg transition-colors"
                              >
                                <Trash2 size={14} />
                                <span>Delete</span>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}

                {/* Modal Form for Second Opinion Edit/Add */}
                {soModalOpen && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full p-6 sm:p-8 relative my-8 text-start">
                      <button
                        onClick={() => setSoModalOpen(false)}
                        className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                      >
                        <X size={20} />
                      </button>

                      <h2 className="text-lg font-bold text-slate-900 mb-6">
                        {soEditingItem ? 'Edit Second Opinion' : 'Add New Second Opinion'}
                      </h2>

                      <form onSubmit={handleSubmitSO} className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                            Title *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Second Opinion Before Knee Replacement"
                            value={soFormData.title}
                            onChange={(e) => setSoFormData({ ...soFormData, title: e.target.value })}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                            Display Order
                          </label>
                          <input
                            type="number"
                            value={soFormData.order}
                            onChange={(e) => setSoFormData({ ...soFormData, order: parseInt(e.target.value) || 0 })}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                            Paragraph 1 (What decisions are based on) *
                          </label>
                          <textarea
                            required
                            rows={3}
                            placeholder="e.g. Knee replacement decisions should be based on symptoms..."
                            value={soFormData.paragraph_1}
                            onChange={(e) => setSoFormData({ ...soFormData, paragraph_1: e.target.value })}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary-500 leading-relaxed"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                            Paragraph 2 (What a second opinion clarifies) *
                          </label>
                          <textarea
                            required
                            rows={3}
                            placeholder="e.g. A second opinion can help clarify whether the patient needs..."
                            value={soFormData.paragraph_2}
                            onChange={(e) => setSoFormData({ ...soFormData, paragraph_2: e.target.value })}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary-500 leading-relaxed"
                          />
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                          <input
                            type="checkbox"
                            id="is_active_so"
                            checked={soFormData.is_active}
                            onChange={(e) => setSoFormData({ ...soFormData, is_active: e.target.checked })}
                            className="w-4 h-4 rounded text-primary-600 focus:ring-primary-500"
                          />
                          <label htmlFor="is_active_so" className="text-xs font-medium text-slate-700 select-none">
                            Publish this item (Active)
                          </label>
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                          <button
                            type="button"
                            onClick={() => setSoModalOpen(false)}
                            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors"
                          >
                            Cancel
                          </button>

                          <button
                            type="submit"
                            disabled={soSaving}
                            className="inline-flex items-center gap-2 px-5 py-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold text-xs rounded-xl transition-colors disabled:opacity-50"
                          >
                            <span>{soSaving ? 'Saving...' : 'Save Record'}</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Main Clinical Services Section */
              <div className="space-y-6">
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
            </div>
            )}
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
                2. FAQs
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
              <button
                type="button"
                onClick={() => setActiveTab('subservices')}
                className={`py-2.5 px-6 font-semibold text-sm rounded-lg transition-all ${
                  activeTab === 'subservices'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                4. Sub-Services
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('second_opinion')}
                className={`py-2.5 px-6 font-semibold text-sm rounded-lg transition-all ${
                  activeTab === 'second_opinion'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                5. Second Opinion Section
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

                    {/* Per-Service CTA Banner Override Box */}
                    <div className="pt-6 border-t border-slate-150 space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                          Custom Call to Action (CTA) Banner Override
                        </label>
                        <span className="text-[10px] text-slate-400 font-medium">Leave blank to use global site CTA</span>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                        <div>
                          <label className="text-[11px] font-semibold text-slate-600 block mb-1">Custom CTA Title</label>
                          <input 
                            type="text"
                            value={formData.cta_title}
                            onChange={e => setFormData(prev => ({ ...prev, cta_title: e.target.value }))}
                            placeholder="Default: Struggling with Joint or Back Pain?"
                            className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl bg-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-semibold text-slate-600 block mb-1">Custom CTA Subtitle</label>
                          <input 
                            type="text"
                            value={formData.cta_subtitle}
                            onChange={e => setFormData(prev => ({ ...prev, cta_subtitle: e.target.value }))}
                            placeholder="Default: Get expert orthopedic care today."
                            className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl bg-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-semibold text-slate-600 block mb-1">Button Text</label>
                          <input 
                            type="text"
                            value={formData.cta_button_text}
                            onChange={e => setFormData(prev => ({ ...prev, cta_button_text: e.target.value }))}
                            placeholder="Default: Book Appointment Now"
                            className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl bg-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-semibold text-slate-600 block mb-1">Button Link Path</label>
                          <input 
                            type="text"
                            value={formData.cta_button_link}
                            onChange={e => setFormData(prev => ({ ...prev, cta_button_link: e.target.value }))}
                            placeholder="Default: /contact"
                            className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl bg-white focus:outline-none"
                          />
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
                    className="max-w-2xl mx-auto w-full"
                  >
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

                {activeTab === 'subservices' && (
                  <motion.div
                    key="tab-subservices"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="max-w-2xl mx-auto w-full space-y-6"
                  >
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                      <div className="border-b border-slate-100 pb-2">
                        <h3 className="text-lg font-bold text-slate-800">Sub-Services / Procedures</h3>
                        <p className="text-xs text-slate-400">Configure detailed procedures and sub-services that belong to this service.</p>
                      </div>

                      <div className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-600 uppercase">Sub-Service Title</label>
                          <input 
                            type="text" 
                            className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none bg-white"
                            placeholder="e.g. Fracture Assessment"
                            value={newSubService.title}
                            onChange={e => setNewSubService(prev => ({ ...prev, title: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-600 uppercase">Sub-Service Description</label>
                          <textarea 
                            rows={3}
                            className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none bg-white"
                            placeholder="Provide a detailed description of this procedure..."
                            value={newSubService.description}
                            onChange={e => setNewSubService(prev => ({ ...prev, description: e.target.value }))}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={handleAddSubService}
                          className="inline-flex items-center justify-center gap-2 w-full text-xs font-semibold py-2 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-150 transition-colors"
                        >
                          <Plus size={14} /> Add Sub-Service
                        </button>
                      </div>

                      <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                        {(formData.sub_services || []).map((ss, idx) => (
                          <div key={idx} className="p-4 bg-white border border-slate-150 rounded-xl space-y-1 relative group">
                            <button
                              type="button"
                              onClick={() => handleRemoveSubService(idx)}
                              className="absolute top-3 right-3 text-red-500 hover:bg-red-50 p-1.5 rounded-md"
                            >
                              <MinusCircle size={14} />
                            </button>
                            <p className="text-xs font-bold text-slate-800 pr-8 leading-normal">{ss.title}</p>
                            {ss.description && (
                              <p className="text-[10px] text-slate-500 font-light leading-relaxed border-t border-slate-50 pt-1 mt-1">{ss.description}</p>
                            )}
                          </div>
                        ))}
                        {(formData.sub_services || []).length === 0 && (
                          <p className="text-xs text-slate-400 text-center py-4 font-light">No sub-services added yet.</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'second_opinion' && (
                  <motion.div
                    key="tab-second-opinion"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="max-w-3xl mx-auto w-full space-y-6 text-start"
                  >
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
                      <div className="border-b border-slate-100 pb-3">
                        <h3 className="text-lg font-bold text-slate-800">Second Opinion Section Settings</h3>
                        <p className="text-xs text-slate-400">Customize the main section title, badge, subtext description, and visibility for this service page.</p>
                      </div>

                      <div className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                        <input
                          type="checkbox"
                          id="second_opinion_is_active_input"
                          checked={formData.second_opinion_is_active || false}
                          onChange={(e) => setFormData(prev => ({ ...prev, second_opinion_is_active: e.target.checked }))}
                          className="w-4 h-4 rounded text-primary-600 focus:ring-primary-500"
                        />
                        <label htmlFor="second_opinion_is_active_input" className="text-sm font-semibold text-slate-800 select-none cursor-pointer">
                          Enable Second Opinion / Specialized Care Section on this Service Page
                        </label>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-600 uppercase">Section Badge / Pill</label>
                          <input
                            type="text"
                            className="w-full text-sm px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 ring-primary-500/20 focus:outline-none"
                            value={formData.second_opinion_badge || ''}
                            onChange={e => setFormData(prev => ({ ...prev, second_opinion_badge: e.target.value }))}
                            placeholder="e.g. Specialized Orthopedic Care"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-600 uppercase">Section Main Title</label>
                          <input
                            type="text"
                            className="w-full text-sm px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 ring-primary-500/20 focus:outline-none"
                            value={formData.second_opinion_title || ''}
                            onChange={e => setFormData(prev => ({ ...prev, second_opinion_title: e.target.value }))}
                            placeholder="e.g. Second Opinion Services"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-600 uppercase">Section Subtitle / Description</label>
                        <textarea
                          rows={3}
                          className="w-full text-sm px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 ring-primary-500/20 focus:outline-none leading-relaxed"
                          value={formData.second_opinion_description || ''}
                          onChange={e => setFormData(prev => ({ ...prev, second_opinion_description: e.target.value }))}
                          placeholder="e.g. Get expert evaluation and clear, evidence-based recommendations before undergoing surgery or complex orthopedic treatment."
                        />
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
