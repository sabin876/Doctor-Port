import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Calendar, User, Mail, ShieldAlert, ArrowLeft, Download } from 'lucide-react';
import { api } from '../../lib/api';
import { Helmet } from 'react-helmet-async';

const ReportView = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [report, setReport] = useState(null);
  const [errorState, setErrorState] = useState(null); // 'not_verified' | 'not_found' | 'error'
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const data = await api.getReport(token);
        setReport(data);
      } catch (err) {
        if (err.status === 403) {
          setErrorState('not_verified');
          // Automatically redirect to verify page after 2 seconds
          setTimeout(() => {
            navigate(`/report-access?token=${token}`);
          }, 2500);
        } else if (err.status === 404) {
          setErrorState('not_found');
        } else {
          setErrorState('error');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchReport();
  }, [token, navigate]);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Helmet>
          <title>Loading Report... | Patient Portal</title>
        </Helmet>
        <div className="text-center space-y-4">
          <svg className="animate-spin h-10 w-10 text-blue-600 mx-auto" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-slate-500 font-bold text-sm">Decrypting report data securely...</p>
        </div>
      </div>
    );
  }

  if (errorState === 'not_verified') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Helmet>
          <title>Access Denied | Patient Portal</title>
        </Helmet>
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-premium border border-slate-100 max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center mx-auto shadow-sm">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-800 mb-2 font-poppins">Verification Required</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              You haven't verified your identity yet. Redirecting you to the verification screen to enter your code...
            </p>
          </div>
          <div className="pt-2">
            <Link
              to={`/report-access?token=${token}`}
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all text-sm shadow-sm"
            >
              Verify Code Now
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (errorState === 'not_found' || errorState === 'error') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Helmet>
          <title>Report Not Found | Patient Portal</title>
        </Helmet>
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-premium border border-slate-100 max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mx-auto shadow-sm">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-800 mb-2 font-poppins">
              {errorState === 'not_found' ? 'Report Not Found' : 'Error Loading Report'}
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              {errorState === 'not_found'
                ? 'The requested report link is invalid, has expired, or the token was deleted.'
                : 'A network error occurred while fetching your medical report. Please try again later.'}
            </p>
          </div>
          <div className="pt-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-bold text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Go to Home Page
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-sky-50 py-12 px-4 flex items-center justify-center relative overflow-hidden">
      <Helmet>
        <title>Medical Report | Patient Portal</title>
      </Helmet>

      {/* Background Decorative Elements */}
      <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-200/20 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-sky-200/25 blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(37,99,235,0.06)] border border-slate-100 max-w-2xl w-full overflow-hidden relative z-10"
      >
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-blue-600 to-sky-600 p-8 sm:p-10 text-white flex justify-between items-start">
          <div className="space-y-2">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider">
              Confidential Medical Report
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-poppins">Report Details</h1>
          </div>
          <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
            <FileText className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Content Card Body */}
        <div className="p-8 sm:p-10 space-y-8">
          {/* Meta Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100/50">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none mb-1">Assigned Doctor</p>
                <p className="text-sm font-bold text-slate-800 leading-tight">{report.doctor || 'Dr. Ulhas Sonar'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100/50">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none mb-1">Patient Email</p>
                <p className="text-sm font-bold text-slate-800 leading-tight truncate max-w-[180px]">{report.patient_email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:col-span-2">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100/50">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none mb-1">Release Date</p>
                <p className="text-sm font-bold text-slate-800 leading-tight">{formatDate(report.created_at)}</p>
              </div>
            </div>
          </div>

          {/* Report Text Content */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Diagnosis & Notes</h3>
            <div className="bg-slate-50/20 border border-slate-100 p-6 rounded-2xl min-h-[150px] whitespace-pre-wrap text-slate-700 leading-relaxed text-sm font-medium">
              {report.content || "No diagnosis notes provided."}
            </div>
          </div>

          {/* PDF Download Button (If pdf field is present in report data) */}
          {report.pdf && (
            <div className="pt-2">
              <a
                href={report.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold shadow-[0_12px_24px_-6px_rgba(16,185,129,0.3)] transition-all"
              >
                <Download className="w-5 h-5" />
                Download PDF Report
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ReportView;
