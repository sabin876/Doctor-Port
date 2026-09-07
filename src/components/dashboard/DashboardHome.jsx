import React, { useEffect, useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Stethoscope, 
  Clock, 
  CheckCircle2, 
  Calendar, 
  ArrowUpRight, 
  Plus, 
  ExternalLink,
  Edit3
} from 'lucide-react';
import { api } from '../../lib/api';

const StatCard = ({ title, value, icon, badgeText, badgeClass, colorClass, linkTo }) => {
  const content = (
    <div className="bg-white rounded-2xl p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.08)] border border-slate-100 flex flex-col justify-between hover:shadow-md transition-all duration-300 group h-full">
      <div className="flex justify-between items-start mb-3">
        <div className={`p-3 rounded-xl ${colorClass}`}>
          {React.createElement(icon, { size: 22 })}
        </div>
        {badgeText && (
          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${badgeClass}`}>
            {badgeText}
          </span>
        )}
      </div>
      <div>
        <h3 className="text-slate-500 text-xs font-semibold mb-1 uppercase tracking-wider">{title}</h3>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-primary-600 transition-colors">{value}</h2>
      </div>
    </div>
  );

  return linkTo ? (
    <Link to={linkTo} className="block h-full cursor-pointer">
      {content}
    </Link>
  ) : (
    content
  );
};

const formatCountdownText = (targetDateStr) => {
  if (!targetDateStr) return '';
  try {
    const target = new Date(targetDateStr);
    const now = new Date();
    const diffMs = target - now;
    if (diffMs <= 0) return 'Live';
    const diffMins = Math.floor(diffMs / 60000);
    const days = Math.floor(diffMins / (60 * 24));
    const hours = Math.floor((diffMins % (60 * 24)) / 60);
    const mins = diffMins % 60;
    
    const parts = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (mins > 0 || parts.length === 0) parts.push(`${mins}m`);
    return `In ${parts.join(' ')}`;
  } catch {
    return '';
  }
};

const formatFriendlyDateTime = (targetDateStr) => {
  if (!targetDateStr) return '-';
  try {
    const d = new Date(targetDateStr);
    if (isNaN(d.getTime())) return '-';
    return d.toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  } catch {
    return targetDateStr;
  }
};

const DashboardHome = () => {
  const [articles, setArticles] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [arts, servs] = await Promise.all([
          api.getArticles({ all: true }).catch(() => []),
          api.getServices().catch(() => [])
        ]);
        setArticles(Array.isArray(arts) ? arts : []);
        setServices(Array.isArray(servs) ? servs : []);
      } catch (e) {
        console.error('Failed to load dashboard metrics:', e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const isArticleScheduled = (art) => {
    if (!art) return false;
    if (art.status === 'scheduled') return true;
    if (art.status === 'draft') return false;
    if (art.published_at) {
      return new Date(art.published_at) > new Date();
    }
    return false;
  };

  const isArticlePublished = (art) => {
    if (!art) return false;
    if (art.status === 'draft') return false;
    if (art.is_published !== undefined) return art.is_published;
    if (art.published_at) {
      return new Date(art.published_at) <= new Date();
    }
    return art.status === 'published';
  };

  const publishedArticles = articles.filter(isArticlePublished);
  const scheduledArticles = articles.filter(isArticleScheduled);
  const draftArticles = articles.filter(a => a.status === 'draft');

  return (
    <div className="space-y-8 pb-10 font-sans">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Real-time status of articles, scheduled publication releases, and services.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/dashboard/articles"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
          >
            <Plus size={14} /> Schedule New Post
          </Link>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-bold uppercase tracking-wider shadow-xs transition-all"
          >
            Live Site <ExternalLink size={13} />
          </a>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard 
          title="Live Published Posts" 
          value={loading ? '...' : publishedArticles.length} 
          icon={CheckCircle2} 
          badgeText="Live on Web" 
          badgeClass="bg-emerald-50 text-emerald-700 border border-emerald-200" 
          colorClass="bg-emerald-50 text-emerald-600" 
          linkTo="/dashboard/articles"
        />
        <StatCard 
          title="Scheduled Releases" 
          value={loading ? '...' : scheduledArticles.length} 
          icon={Clock} 
          badgeText="Automated" 
          badgeClass="bg-blue-50 text-blue-700 border border-blue-200" 
          colorClass="bg-blue-50 text-blue-600" 
          linkTo="/dashboard/articles"
        />
        <StatCard 
          title="Draft Posts" 
          value={loading ? '...' : draftArticles.length} 
          icon={FileText} 
          badgeText="Private" 
          badgeClass="bg-slate-100 text-slate-600 border border-slate-200" 
          colorClass="bg-slate-100 text-slate-600" 
          linkTo="/dashboard/articles"
        />
        <StatCard 
          title="Clinical Services" 
          value={loading ? '...' : services.length} 
          icon={Stethoscope} 
          badgeText="Active" 
          badgeClass="bg-indigo-50 text-indigo-700 border border-indigo-200" 
          colorClass="bg-indigo-50 text-indigo-600" 
          linkTo="/dashboard/services"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Scheduled & Recent Articles Feed */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.08)] border border-slate-200 p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Clock size={16} className="text-primary-600" /> Scheduled & Recent Posts
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Articles scheduled for upcoming release or recently published.</p>
            </div>
            <Link 
              to="/dashboard/articles" 
              className="text-xs text-primary-600 hover:text-primary-700 font-bold flex items-center gap-1"
            >
              Manage All <ArrowUpRight size={14} />
            </Link>
          </div>

          {loading ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              Loading articles...
            </div>
          ) : articles.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              No articles found. Click "Schedule New Post" to create one.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {articles.slice(0, 6).map((art) => {
                const isScheduled = isArticleScheduled(art);
                const isPub = isArticlePublished(art);
                const formattedDate = formatFriendlyDateTime(art.published_at || art.date);
                const countdown = formatCountdownText(art.published_at);

                return (
                  <div key={art.slug} className="py-3.5 flex items-center justify-between gap-4 group hover:bg-slate-50/50 rounded-xl px-2 transition-colors">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                        isScheduled 
                          ? 'bg-blue-50 text-blue-600 border border-blue-100' 
                          : isPub 
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}>
                        {isScheduled ? <Clock size={16} /> : <FileText size={16} />}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-1 group-hover:text-primary-600 transition-colors">
                          {art.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                          <span>{formattedDate}</span>
                          <span>•</span>
                          <span className="text-slate-400 font-medium">{art.category || 'Blog'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      {art.status === 'draft' ? (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                          Draft
                        </span>
                      ) : isScheduled ? (
                        <div className="flex flex-col items-end">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
                            <Clock size={11} /> Scheduled
                          </span>
                          <span className="text-[10px] font-bold text-blue-600 mt-0.5">
                            {countdown}
                          </span>
                        </div>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Live Now
                        </span>
                      )}

                      <Link
                        to="/dashboard/articles"
                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                        title="Edit Article"
                      >
                        <Edit3 size={14} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Quick Status & Info */}
        <div className="space-y-6">
          
          {/* Automated Publishing Status Card */}
          <div className="bg-gradient-to-br from-primary-600 to-indigo-700 rounded-2xl p-6 text-white shadow-md space-y-4">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white">
              <Clock size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold">Automated Publishing Engine</h3>
              <p className="text-xs text-primary-100 mt-1 leading-relaxed">
                When you schedule a post, the backend automatically manages visibility. As soon as the scheduled time arrives, the article goes live instantly without manual publishing.
              </p>
            </div>
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-primary-100 font-medium">Next Release</span>
              <span className="font-bold bg-white/20 px-2.5 py-1 rounded-lg">
                {scheduledArticles.length > 0 ? formatFriendlyDateTime(scheduledArticles[0].published_at) : 'None pending'}
              </span>
            </div>
          </div>

          {/* Quick Shortcuts Card */}
          <div className="bg-white rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.08)] border border-slate-200 p-5 space-y-3">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Quick Actions</h3>
            <div className="space-y-2">
              <Link 
                to="/dashboard/articles"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-primary-50 text-slate-700 hover:text-primary-700 text-xs font-bold transition-all border border-slate-100"
              >
                <span>Schedule an Article</span>
                <ArrowUpRight size={14} />
              </Link>
              <Link 
                to="/dashboard/services"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-primary-50 text-slate-700 hover:text-primary-700 text-xs font-bold transition-all border border-slate-100"
              >
                <span>Edit Treatments & Services</span>
                <ArrowUpRight size={14} />
              </Link>
              <Link 
                to="/dashboard/settings"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-primary-50 text-slate-700 hover:text-primary-700 text-xs font-bold transition-all border border-slate-100"
              >
                <span>Robots.txt & Meta Settings</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default DashboardHome;

