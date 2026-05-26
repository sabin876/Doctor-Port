import React from 'react';
import { motion } from 'framer-motion';
import { Users, FileText, Stethoscope, TrendingUp, Calendar, ArrowUpRight } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, trend, colorClass }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100 flex flex-col hover:shadow-lg transition-shadow duration-300"
  >
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${colorClass} bg-opacity-10 text-${colorClass.split('-')[1]}-600`}>
        <Icon size={24} />
      </div>
      <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full text-xs font-medium">
        <TrendingUp size={14} />
        {trend}
      </div>
    </div>
    <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
    <h2 className="text-3xl font-bold text-slate-800">{value}</h2>
  </motion.div>
);

const DashboardHome = () => {
  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">Welcome back, Admin 👋</h1>
        <p className="text-slate-500 mt-1">Here is what's happening with your clinic today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Patients" value="1,248" icon={Users} trend="+12%" colorClass="bg-blue-600 text-blue-600" />
        <StatCard title="Active Articles" value="24" icon={FileText} trend="+3" colorClass="bg-indigo-600 text-indigo-600" />
        <StatCard title="Services Provided" value="18" icon={Stethoscope} trend="+2%" colorClass="bg-emerald-600 text-emerald-600" />
        <StatCard title="Appointments" value="156" icon={Calendar} trend="+18%" colorClass="bg-amber-500 text-amber-500" />
      </div>

      {/* Charts & Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Area placeholder */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-800">Traffic Overview</h2>
            <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">View Report</button>
          </div>
          <div className="h-64 flex items-end gap-4 justify-between pt-4 border-b border-slate-100">
            {/* Fake Chart Bars */}
            {[40, 70, 45, 90, 65, 85, 100].map((h, i) => (
              <div key={i} className="w-full bg-slate-100 rounded-t-lg relative group">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                  className="absolute bottom-0 left-0 right-0 bg-primary-500 rounded-t-lg group-hover:bg-primary-600 transition-colors"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-slate-400 font-medium px-2">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Recent Articles</h2>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 text-slate-500">
                  <FileText size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-800 line-clamp-1">Understanding Joint Pain in Winter</h4>
                  <p className="text-xs text-slate-500 mt-1">Published 2 days ago</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2.5 rounded-xl text-primary-600 bg-primary-50 hover:bg-primary-100 transition-colors text-sm font-medium flex items-center justify-center gap-2">
            View All Articles <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
