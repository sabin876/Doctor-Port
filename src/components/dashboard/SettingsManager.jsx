import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Save, CheckCircle2, AlertCircle, Sparkles, Megaphone, Link as LinkIcon, FileText, Code } from 'lucide-react';
import { api } from '../../lib/api';

const SettingsManager = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [settings, setSettings] = useState({
    cta_title: 'Struggling with Joint or Back Pain?',
    cta_subtitle: 'Get expert orthopedic care today.',
    cta_button_text: 'Book Appointment Now',
    cta_button_link: '/contact',
    robots_txt: 'User-agent: *\nAllow: /',
    header_scripts: '',
    footer_scripts: ''
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const data = await api.getSiteSettings();
      if (data) {
        setSettings({
          cta_title: data.cta_title || 'Struggling with Joint or Back Pain?',
          cta_subtitle: data.cta_subtitle || 'Get expert orthopedic care today.',
          cta_button_text: data.cta_button_text || 'Book Appointment Now',
          cta_button_link: data.cta_button_link || '/contact',
          robots_txt: data.robots_txt || 'User-agent: *\nAllow: /',
          header_scripts: data.header_scripts || '',
          footer_scripts: data.footer_scripts || ''
        });
      }
      setErrorMsg('');
    } catch (err) {
      console.error('Failed to fetch site settings:', err);
      setErrorMsg('Could not load settings from server.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setSuccessMsg('');
      setErrorMsg('');
      await api.updateSiteSettings(settings);
      setSuccessMsg('Settings and CTA banner updated successfully!');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      console.error('Failed to update settings:', err);
      setErrorMsg(err.message || 'Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-sans max-w-4xl">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Site Settings & CTA Manager</h1>
        <p className="text-slate-500 text-xs mt-1">
          Manage call to action (CTA) banner text, appointment links, and global site configurations.
        </p>
      </div>

      {successMsg && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold rounded-2xl flex items-center gap-3">
          <CheckCircle2 size={18} className="text-emerald-600" />
          {successMsg}
        </motion.div>
      )}

      {errorMsg && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-rose-50 border border-rose-200 text-rose-800 text-sm font-semibold rounded-2xl flex items-center gap-3">
          <AlertCircle size={18} className="text-rose-600" />
          {errorMsg}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* CTA Banner Settings Box */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="p-2.5 rounded-2xl bg-primary-50 text-primary-600">
              <Megaphone size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Call to Action (CTA) Banner</h2>
              <p className="text-xs text-slate-500">Appears above FAQ and footer sections across main pages</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                CTA Title
              </label>
              <input
                type="text"
                value={settings.cta_title}
                onChange={(e) => handleChange('cta_title', e.target.value)}
                placeholder="e.g. Struggling with Joint or Back Pain?"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                CTA Subtitle / Description
              </label>
              <input
                type="text"
                value={settings.cta_subtitle}
                onChange={(e) => handleChange('cta_subtitle', e.target.value)}
                placeholder="e.g. Get expert orthopedic care today."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Button Text
                </label>
                <input
                  type="text"
                  value={settings.cta_button_text}
                  onChange={(e) => handleChange('cta_button_text', e.target.value)}
                  placeholder="e.g. Book Appointment Now"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Button Link Path
                </label>
                <input
                  type="text"
                  value={settings.cta_button_link}
                  onChange={(e) => handleChange('cta_button_link', e.target.value)}
                  placeholder="e.g. /contact"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Technical & SEO Settings */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-600">
              <Code size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Header Scripts & SEO Controls</h2>
              <p className="text-xs text-slate-500">Google Analytics, GSC verification, and robots.txt</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Robots.txt Rules
              </label>
              <textarea
                rows={3}
                value={settings.robots_txt}
                onChange={(e) => handleChange('robots_txt', e.target.value)}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl font-bold text-sm tracking-wide shadow-lg shadow-primary-600/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
          >
            <Save size={18} />
            {saving ? 'Saving Changes...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsManager;
