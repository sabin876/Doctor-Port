import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Mail, AlertCircle, Download, Send } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { verifyOTP, sendOTP } from '../../lib/reportApi';
import logoImg from '../../assets/logo.webp';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.drulhasorthopedic.com';

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
const ReportCard = ({ report }) => {
  const fileUrl = report.report_file 
    ? (report.report_file.startsWith('http') ? report.report_file : `${BASE_URL}${report.report_file}`) 
    : null;

  const isImage = fileUrl && /\.(jpeg|jpg|gif|png|webp)$/i.test(fileUrl);
  const isPdf = fileUrl && /\.pdf$/i.test(fileUrl);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden w-full max-w-md"
    >
      <div className="bg-gradient-to-r from-blue-600 to-sky-500 p-7 text-white">
        <h2 className="text-xl font-black font-poppins">Report Details</h2>
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

        {fileUrl && (
          <div className="space-y-3 pt-2">
            {/* 1. View Image Directly in UI */}
            {isImage && (
              <div className="rounded-xl overflow-hidden border border-slate-200">
                <img src={fileUrl} alt="Report" className="w-full h-auto" />
              </div>
            )}

            {/* 2. PDF Viewer (Embedded) */}
            {isPdf && (
              <div className="w-full h-64 border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                <iframe src={fileUrl} title="PDF Preview" className="w-full h-full" />
              </div>
            )}

            <div className="flex gap-2">
              {/* View in new tab button */}
              <a 
                href={fileUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-all text-sm"
              >
                View Fullscreen
              </a>
              {/* Direct download button */}
              <a 
                href={fileUrl} 
                download
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all text-sm"
              >
                <Download className="w-4 h-4" /> Download
              </a>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// ─── Main Page Component ──────────────────────────────────────────────
const ReportAccess = () => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState(searchParams.get('email') || '');
  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(''));
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success'
  const [errorMsg, setErrorMsg] = useState('');
  const [report, setReport] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [sendLoading, setSendLoading] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleSendOTP = async () => {
    if (!email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    setSendLoading(true);
    setErrorMsg('');
    try {
      await sendOTP(null, email.trim());
      setOtpSent(true);
      setResendCooldown(60);
      setErrorMsg('');
    } catch (err) {
      setErrorMsg(err?.detail || 'Failed to send OTP. Please check your email or try again.');
    } finally {
      setSendLoading(false);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        inputRefs.current[index - 1].focus();
        const next = [...digits];
        next[index - 1] = '';
        setDigits(next);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pastedData)) {
      const next = pastedData.split('');
      setDigits(next);
      inputRefs.current[OTP_LENGTH - 1].focus();
    }
  };

  const handleVerify = async (otpValue = digits.join('')) => {
    if (otpValue.length < OTP_LENGTH) return setErrorMsg('Please enter the full 6-digit code.');
    if (!email.includes('@')) return setErrorMsg('Please enter a valid email.');

    setStatus('loading');
    setErrorMsg('');

    try {
      const data = await verifyOTP(email.trim(), otpValue);
      setReport(data.report);
      setStatus('success');
    } catch (err) {
      setErrorMsg(err?.detail || 'Invalid OTP. Please try again.');
      setStatus('idle');
      setDigits(Array(OTP_LENGTH).fill(''));
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
              <div className="w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <img src={logoImg} alt="Doctor Logo" className="w-full h-full object-contain drop-shadow-sm" />
              </div>
              <h1 className="text-2xl font-black text-slate-800">Verify Identity</h1>
              <p className="text-slate-500 text-sm mt-2">Enter your email and request/verify the 6-digit code.</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Email Address</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleSendOTP();
                        }
                      }}
                      disabled={sendLoading || resendCooldown > 0}
                      placeholder="patient@example.com"
                      className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-xl outline-none focus:border-blue-500 font-medium transition-all disabled:opacity-70"
                    />
                    {sendLoading && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <svg className="animate-spin h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
                {!otpSent && !sendLoading && resendCooldown === 0 && (
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center mt-2">Press Enter to receive code</p>
                )}
                {otpSent && (
                  <p className="text-emerald-600 text-xs font-semibold flex items-center gap-1.5 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    OTP sent to your email!
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block text-center">Enter 6-Digit Code</label>
                <div className="flex gap-2 justify-center">
                  {digits.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => (inputRefs.current[i] = el)}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onKeyDown={(e) => handleKeyDown(e, i)}
                      onPaste={handlePaste}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        if (!val && digits[i]) {
                          return;
                        }
                        const next = [...digits];
                        next[i] = val.slice(-1);
                        setDigits(next);
                        if (val && i < OTP_LENGTH - 1) {
                          inputRefs.current[i + 1].focus();
                        }
                      }}
                      className="w-12 h-14 text-center text-xl font-black border-2 border-slate-200 rounded-xl focus:border-blue-500 outline-none transition-all"
                    />
                  ))}
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 bg-red-50 text-red-500 text-sm rounded-xl font-medium flex items-center gap-2 justify-center border border-red-100">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button 
                onClick={() => handleVerify()}
                disabled={status === 'loading'}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all disabled:opacity-50 shadow-md shadow-blue-200"
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