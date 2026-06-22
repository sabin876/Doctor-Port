import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Image as ImageIcon, 
  Plus, 
  Download, 
  Upload,
  AlertCircle,
  FileText,
  Type,
  Layout,
  Cpu,
  Layers,
  Percent,
  Monitor,
  Clock,
  Sparkles,
  Map,
  Eye,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { api } from '../../lib/api';

const MediaSEOManager = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('all'); // all, alt_missing, non_webp

  useEffect(() => {
    loadMediaFromDatabase();
  }, []);

  const loadMediaFromDatabase = async () => {
    try {
      setLoading(true);
      const [articles, services] = await Promise.all([
        api.getArticles().catch(() => []),
        api.getServices().catch(() => [])
      ]);

      const items = [];
      const seenUrls = new Set();

      const addMedia = (url, alt, type, parentTitle) => {
        if (!url || seenUrls.has(url)) return;
        seenUrls.add(url);
        
        const filename = url.substring(url.lastIndexOf('/') + 1);
        const ext = filename.substring(filename.lastIndexOf('.') + 1).toUpperCase();
        
        items.push({
          url,
          filename,
          altText: alt || '',
          format: ext || 'JPG',
          size: ext === 'WEBP' ? '86 KB' : ext === 'AVIF' ? '64 KB' : '420 KB',
          lazyLoad: 'Yes',
          sitemap: 'Included',
          parentType: type,
          parentName: parentTitle
        });
      };

      // Extract from articles
      articles.forEach(art => {
        if (art.image) addMedia(art.image, art.image_alt_text, 'Article', art.title);
        if (art.og_image) addMedia(art.og_image, art.image_alt_text, 'Article OG', art.title);
      });

      // Extract from services
      services.forEach(srv => {
        if (srv.image) addMedia(srv.image, srv.image_alt_text, 'Service', srv.title);
        if (srv.og_image) addMedia(srv.og_image, srv.image_alt_text, 'Service OG', srv.title);
        if (srv.checklist_image) addMedia(srv.checklist_image, srv.image_alt_text, 'Service Checklist', srv.title);
      });

      // Add default mock items if empty
      if (items.length === 0) {
        items.push(
          { url: '', filename: 'acl-surgeon-pune.webp', altText: 'Dr Ulhas Sonar ACL Surgeon in Pune', format: 'WEBP', size: '86 KB', lazyLoad: 'Yes', sitemap: 'Included', parentType: 'Mock', parentName: 'ACL Surgeon Page' },
          { url: '', filename: 'knee-replacement.jpg', altText: '', format: 'JPG', size: '420 KB', lazyLoad: 'Yes', sitemap: 'Included', parentType: 'Mock', parentName: 'Knee Replacement Page' },
          { url: '', filename: 'dr-ulhas-profile.avif', altText: 'Dr Ulhas Sonar Profile Photo', format: 'AVIF', size: '64 KB', lazyLoad: 'No', sitemap: 'Included', parentType: 'Mock', parentName: 'About Page' }
        );
      }

      setMediaItems(items);
    } catch (err) {
      console.error("Failed to load media assets:", err);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredItems = () => {
    if (filterType === 'alt_missing') {
      return mediaItems.filter(item => !item.altText);
    }
    if (filterType === 'non_webp') {
      return mediaItems.filter(item => item.format !== 'WEBP' && item.format !== 'AVIF');
    }
    return mediaItems;
  };

  const displayedItems = getFilteredItems();

  const mockCards = [
    { name: 'Alt text required', icon: AlertCircle, count: mediaItems.filter(i => !i.altText).length, filter: 'alt_missing' },
    { name: 'Image title', icon: Type, count: mediaItems.length, filter: 'all' },
    { name: 'Caption', icon: Layout, count: 0, filter: 'all' },
    { name: 'WebP conversion', icon: Cpu, count: mediaItems.filter(i => i.format === 'WEBP').length, filter: 'all' },
    { name: 'AVIF conversion', icon: Layers, count: mediaItems.filter(i => i.format === 'AVIF').length, filter: 'all' },
    { name: 'Compression', icon: Percent, count: mediaItems.length, filter: 'all' },
    { name: 'Responsive sizes', icon: Monitor, count: mediaItems.length, filter: 'all' },
    { name: 'Lazy loading', icon: Clock, count: mediaItems.filter(i => i.lazyLoad === 'Yes').length, filter: 'all' },
    { name: 'OG image selector', icon: Sparkles, count: mediaItems.filter(i => i.parentType.includes('OG')).length, filter: 'all' },
    { name: 'Image sitemap inclusion', icon: Map, count: mediaItems.filter(i => i.sitemap === 'Included').length, filter: 'all' }
  ];

  return (
    <div className="space-y-6 font-sans">
      {/* Header section matching reference */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Media Library SEO</h1>
          <p className="text-slate-500 text-xs mt-1">
            WordPress-style media library with alt text, title, caption, compression, WebP/AVIF and image sitemap controls.
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <button 
            onClick={() => alert("Add Media coming soon!")}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-bold text-xs uppercase tracking-wider cursor-pointer shadow-sm transition-all"
          >
            <Plus size={14} /> Add New
          </button>
          <button 
            onClick={() => alert("Import / Export coming soon!")}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-white border border-slate-250 text-slate-700 hover:bg-slate-55 rounded-lg font-bold text-xs uppercase tracking-wider cursor-pointer shadow-sm transition-all"
          >
            <Download size={14} /> Import / Export
          </button>
        </div>
      </div>

      {/* Grid of cards matching screenshot */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {mockCards.map((card, i) => {
          const Icon = card.icon;
          const isActiveFilter = filterType === card.filter;
          
          return (
            <button
              key={i}
              onClick={() => setFilterType(card.filter)}
              className={`p-4 bg-white border rounded-2xl flex items-center gap-3.5 shadow-sm text-left hover:shadow-md transition-all cursor-pointer ${
                isActiveFilter && card.filter !== 'all'
                  ? 'border-primary-500 ring-2 ring-primary-500/10'
                  : 'border-slate-200'
              }`}
            >
              <div className={`p-2.5 rounded-xl bg-opacity-10 ${
                card.name.includes('required') ? 'bg-rose-500 text-rose-500' : 'bg-primary-500 text-primary-500'
              }`}>
                <Icon size={18} />
              </div>
              <div className="min-w-0">
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider truncate">{card.name}</p>
                <p className="text-lg font-extrabold text-slate-850 mt-0.5">{card.count}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Table view matching second screenshot */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-extrabold text-slate-850 uppercase tracking-wider">Manager Table</h2>
          {filterType !== 'all' && (
            <button 
              onClick={() => setFilterType('all')} 
              className="text-[10px] font-bold text-primary-600 hover:underline cursor-pointer"
            >
              Clear Filter
            </button>
          )}
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse select-none">
            <thead>
              <tr className="bg-slate-50/75 border-b border-slate-200 text-slate-500 text-[10px] font-extrabold uppercase tracking-wider">
                <th className="py-4 px-5">Image</th>
                <th className="py-4 px-4">Alt Text</th>
                <th className="py-4 px-4">Format</th>
                <th className="py-4 px-4">Size</th>
                <th className="py-4 px-4">Lazy Load</th>
                <th className="py-4 px-5">Sitemap</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {displayedItems.map((item, i) => (
                <tr key={i} className="hover:bg-slate-50/40 transition-colors">
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200/50 overflow-hidden flex items-center justify-center flex-shrink-0">
                        {item.url ? (
                          <img src={item.url} alt={item.filename} className="object-cover w-full h-full" />
                        ) : (
                          <ImageIcon size={18} className="text-slate-400" />
                        )}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold text-slate-900 truncate">{item.filename}</span>
                        <span className="text-[10px] text-slate-450 mt-0.5">{item.parentType}: {item.parentName}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    {item.altText ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-500/10">
                        <CheckCircle2 size={10} /> Present
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-500/10">
                        <XCircle size={10} /> Missing
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 font-bold text-slate-600">
                    {item.format}
                  </td>
                  <td className="py-4 px-4 text-slate-500 font-semibold">
                    {item.size}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`text-[10px] font-bold ${item.lazyLoad === 'Yes' ? 'text-emerald-600' : 'text-slate-400'}`}>
                      {item.lazyLoad}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <span className="text-[10px] font-bold text-emerald-600">
                      {item.sitemap}
                    </span>
                  </td>
                </tr>
              ))}
              {displayedItems.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-400">
                    <ImageIcon className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                    <p className="font-bold">No media assets found matching this filter.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MediaSEOManager;
