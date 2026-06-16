import React, { useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Mail, KeyRound, AlertCircle, ArrowRight, Download, User, Calendar, FileText } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { verifyOTP } from '../../lib/reportApi';

// ─── Helpers ──────────────────────────────────────────────────────────
const OTP_LENGTH = 6;
const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString(undefined, {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
};

// ─── ReportCard Component ─────────────────────────────────────────────
const ReportCard = ({ report }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden w-full max-w-md"
  >
    <div className="bg-gradient-to-r from-blue-600 to-sky-500 p-7 text-white">
      <h2 className="text-xl font-black">Report Details</h2>
    </div>
    <div className="p-7 space-y-6">
      <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl">
        <div>
          <p className="text-[10px] uppercase font-bold text-slate-400">Doctor</p>
          <p className="text-sm font-bold text-slate-800">{report.doctor_name}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase font-bold text-slate-400">Date</p>
          <p className="text-sm font-bold text-slate-800">{formatDate(report.created_at)}</p>
        </div>
      </div>
      <div>
        <p className="text-[10px] uppercase font-bold text-slate-400 mb-2">Diagnosis & Notes</p>
        <div className="bg-slate-50 p-4 rounded-xl text-sm text-slate-700 whitespace-pre-wrap">{report.content}</div>
      </div>
      {report.report_file && (
        <a 
          href={report.report_file} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center justify-center gap-2 w-full py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all"
        >
          <Download className="w-5 h-5" /> Download Report
        </a>
      )}
    </div>
  </motion.div>
);

// ─── Main Page Component ──────────────────────────────────────────────
const ReportAccess = () => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState(searchParams.get('email') || '');
  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(''));
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success'
  const [errorMsg, setErrorMsg] = useState('');
  const [report, setReport] = useState(null);
  const inputRefs = useRef([]);

  const handleVerify = async (otpValue = digits.join('')) => {
    if (otpValue.length < OTP_LENGTH) return setErrorMsg('Please enter the full 6-digit code.');
    if (!email.includes('@')) return setErrorMsg('Please enter a valid email.');

    setStatus('loading');
    setErrorMsg('');

    try {
      const data = await verifyOTP(email.trim(), otpValue);
      // The API returns { detail, report: {...} }
      setReport(data.report);
      setStatus('success');
    } catch (err) {
      setErrorMsg(err?.detail || 'Invalid OTP. Please try again.');
      setStatus('idle');
      setDigits(Array(OTP_LENGTH).fill('')); // Clear inputs on error
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <Helmet><title>Access Report</title></Helmet>

      <AnimatePresence mode="wait">
        {!report ? (
          <motion.div 
            key="form"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 w-full max-w-md"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 flex items-center justify-center rounded-2xl mx-auto mb-4">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h1 className="text-2xl font-black text-slate-800">Verify Identity</h1>
              <p className="text-slate-500 text-sm mt-2">Enter your email and the 6-digit code.</p>
            </div>

            <div className="space-y-4">
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-4 border-2 border-slate-200 rounded-xl outline-none focus:border-blue-500 font-medium"
              />
              
              <div className="flex gap-2 justify-center">
                {digits.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => (inputRefs.current[i] = el)}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      const next = [...digits];
                      next[i] = val;
                      setDigits(next);
                      if (val && i < OTP_LENGTH - 1) inputRefs.current[i + 1].focus();
                    }}
                    className="w-12 h-14 text-center text-xl font-black border-2 border-slate-200 rounded-xl focus:border-blue-500 outline-none"
                  />
                ))}
              </div>

              {errorMsg && <p className="text-red-500 text-sm text-center font-medium">{errorMsg}</p>}

              <button 
                onClick={() => handleVerify()}
                disabled={status === 'loading'}
                className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all disabled:opacity-50"
              >
                {status === 'loading' ? 'Verifying...' : 'Unlock Report'}
              </button>
            </div>
          </motion.div>
        ) : (
          <ReportCard key="report" report={report} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReportAccess;