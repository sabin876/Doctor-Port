import React, { useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, ArrowRight, AlertCircle,
  Mail, KeyRound, FileText, Download, ExternalLink,
  User, Calendar,
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { verifyOTP, downloadFile } from '../../lib/reportApi';

// ─── helpers ──────────────────────────────────────────────────────────────────

const OTP_LENGTH = 6;

function extractError(err) {
  if (typeof err === 'string') return err;
  return (
    err?.detail ||
    err?.otp?.[0] ||
    err?.token?.[0] ||
    err?.non_field_errors?.[0] ||
    'Something went wrong. Please try again.'
  );
}

const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString(undefined, {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
};

// ─── OTP Digit Boxes ──────────────────────────────────────────────────────────

const OTPBoxes = ({ digits, setDigits, inputRefs, onComplete, shakeKey }) => {
  const handleChange = (index, value) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[index] = digit;
    setDigits(next);
    if (digit && index < OTP_LENGTH - 1) inputRefs.current[index + 1]?.focus();
    if (digit && index === OTP_LENGTH - 1 && next.every(Boolean)) onComplete(next.join(''));
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) inputRefs.current[index - 1]?.focus();
    if (e.key === 'ArrowLeft' && index > 0) inputRefs.current[index - 1]?.focus();
    if (e.key === 'ArrowRight' && index < OTP_LENGTH - 1) inputRefs.current[index + 1]?.focus();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (!pasted) return;
    const next = Array(OTP_LENGTH).fill('');
    pasted.split('').forEach((d, i) => { next[i] = d; });
    setDigits(next);
    inputRefs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
    if (pasted.length === OTP_LENGTH) onComplete(pasted);
  };

  return (
    <motion.div
      key={shakeKey}
      animate={shakeKey ? { x: [0, -8, 8, -6, 6, -4, 4, 0] } : {}}
      transition={{ duration: 0.4 }}
      className="flex justify-center gap-2.5"
      onPaste={handlePaste}
    >
      {digits.map((digit, i) => (
        <input
          key={i}
          ref={(el) => (inputRefs.current[i] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className={`
            w-11 h-14 text-center text-xl font-black rounded-xl border-2 outline-none transition-all
            ${digit
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : 'border-slate-200 bg-slate-50 text-slate-800'}
            focus:border-blue-500 focus:bg-blue-50 focus:shadow-[0_0_0_3px_rgba(37,99,235,0.12)]
          `}
        />
      ))}
    </motion.div>
  );
};

// ─── MetaItem ─────────────────────────────────────────────────────────────────

const MetaItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100/50 shrink-0">
      <Icon className="w-5 h-5" />
    </div>
    <div className="min-w-0">
      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none mb-1">{label}</p>
      <p className="text-sm font-bold text-slate-800 leading-tight truncate max-w-[220px]">{value || '—'}</p>
    </div>
  </div>
);

// ─── ReportCard ───────────────────────────────────────────────────────────────

const ReportCard = ({ report }) => {
  const [downloading, setDownloading] = useState(false);
  const fileUrl = report?.pdf || report?.file || report?.document || null;

  const handleDownload = async () => {
    if (!fileUrl) return;
    setDownloading(true);
    try {
      const blobUrl = await downloadFile(fileUrl);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = `medical-report-${report.id || 'doc'}.pdf`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
    } catch {
      window.open(fileUrl, '_blank');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(37,99,235,0.07)] border border-slate-100 overflow-hidden"
    >
      {/* Header bar */}
      <div className="bg-gradient-to-r from-blue-600 to-sky-500 p-7 text-white flex justify-between items-start">
        <div className="space-y-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-wider">
            Confidential Medical Report
          </span>
          <h2 className="text-xl font-black font-poppins">Your Report</h2>
        </div>
        <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
          <FileText className="w-5 h-5 text-white" />
        </div>
      </div>

      <div className="p-7 space-y-7">

        {/* Meta */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 bg-slate-50/60 p-5 rounded-2xl border border-slate-100">
          <MetaItem icon={User}     label="Assigned Doctor"  value={report.doctor} />
          <MetaItem icon={Mail}     label="Patient Email"    value={report.patient_email} />
          <div className="sm:col-span-2">
            <MetaItem icon={Calendar} label="Report Date"   value={formatDate(report.created_at)} />
          </div>
        </div>

        {/* Diagnosis notes */}
        {report.content && (
          <div className="space-y-2">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Diagnosis &amp; Notes</h3>
            <div className="bg-slate-50/30 border border-slate-100 p-5 rounded-2xl whitespace-pre-wrap text-slate-700 leading-relaxed text-sm font-medium min-h-[100px]">
              {report.content}
            </div>
          </div>
        )}

        {/* File download */}
        {fileUrl ? (
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Attached Document</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="flex-1 flex items-center justify-center gap-2.5 py-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white rounded-2xl font-bold shadow-[0_8px_20px_-4px_rgba(16,185,129,0.3)] transition-all text-sm"
              >
                {downloading
                  ? <><svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Preparing…</>
                  : <><Download className="w-5 h-5" /> Download Report</>
                }
              </button>
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-bold transition-all text-sm"
              >
                <ExternalLink className="w-4 h-4" /> View in Browser
              </a>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-100 rounded-xl text-amber-700 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span className="font-medium">No file attached to this report.</span>
          </div>
        )}

      </div>
    </motion.div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

const ReportAccess = () => {
  const [searchParams] = useSearchParams();

  // Pre-fill email if patient lands from the email link
  // /report-access?email=<email>
  // token and report_id are ignored — patient just types email + OTP from Gmail
  const emailFromUrl = searchParams.get('email') || '';

  const [email, setEmail] = useState(emailFromUrl);

  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(''));
  const [shakeKey, setShakeKey] = useState(0);

  const [status, setStatus]     = useState('idle');  // idle | loading | success
  const [errorMsg, setErrorMsg] = useState('');
  const [report, setReport]     = useState(null);

  const inputRefs = useRef([]);

  // ── Verify OTP ─────────────────────────────────────────────────────────────

  const handleVerify = async (otpValue) => {
    const otp = otpValue || digits.join('');
    if (otp.length < OTP_LENGTH) { setErrorMsg('Please enter all 6 digits.'); return; }
    if (!email.trim())           { setErrorMsg('Please enter your email address.'); return; }

    setStatus('loading');
    setErrorMsg('');

    try {
      // POST /api/verify-otp/ → { email, otp }
      // Backend looks up the latest active OTP for this email
      // Returns: { detail, token, report: { id, doctor, patient_email, content, created_at, pdf } }
      const data = await verifyOTP(email.trim(), otp);
      setReport(data.report || data);
      setStatus('success');
    } catch (err) {
      setErrorMsg(extractError(err));
      setStatus('idle');
      setShakeKey((k) => k + 1);
    }
  };

  const otpFilled = digits.every(Boolean);

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-sky-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <Helmet>
        <title>{report ? 'Medical Report' : 'Report Access'} | Patient Portal</title>
      </Helmet>

      <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-200/20 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-sky-200/25 blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md space-y-6">

        {/* ── Verify form (hidden once report is loaded) ── */}
        <AnimatePresence>
          {!report && (
            <motion.div
              key="verify-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="bg-white rounded-[2.5rem] p-8 sm:p-10 shadow-[0_20px_50px_rgba(37,99,235,0.06)] border border-slate-100"
            >
              {/* Icon + title */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100/50 text-blue-600 flex items-center justify-center mx-auto mb-5 shadow-sm">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h1 className="text-2xl font-black text-slate-800 mb-2 font-poppins">Access Your Report</h1>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Enter your email and the 6-digit code sent by your doctor to view your medical report.
                </p>
              </div>

              <div className="space-y-6">

                {/* Email field */}
                <div className="space-y-2">
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-400">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4.5 h-4.5" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setErrorMsg(''); }}
                      placeholder="patient@example.com"
                      className="w-full pl-11 pr-4 py-3.5 border-2 border-slate-200 rounded-xl outline-none transition-all text-sm font-medium text-slate-800 bg-white focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)] placeholder:text-slate-300"
                    />
                  </div>
                </div>

                {/* OTP label */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400">
                      Verification Code
                    </label>
                    <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                      <KeyRound className="w-3 h-3" /> From your email
                    </span>
                  </div>

                  <OTPBoxes
                    digits={digits}
                    setDigits={setDigits}
                    inputRefs={inputRefs}
                    onComplete={handleVerify}
                    shakeKey={shakeKey}
                  />
                </div>

                {/* Error */}
                <AnimatePresence>
                  {errorMsg && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="flex items-start gap-2.5 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm"
                    >
                      <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                      <span className="font-medium">{errorMsg}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Verify button */}
                <button
                  onClick={() => handleVerify()}
                  disabled={!otpFilled || !email.trim() || status === 'loading'}
                  className={`
                    w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl font-bold text-sm transition-all
                    ${otpFilled && email.trim() && status !== 'loading'
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-[0_8px_24px_-4px_rgba(37,99,235,0.35)] hover:-translate-y-0.5'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }
                  `}
                >
                  {status === 'loading'
                    ? <><svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Verifying…</>
                    : <>Unlock Report <ArrowRight className="w-4 h-4" /></>
                  }
                </button>

                {/* Contact doctor note */}
                <p className="text-center text-slate-400 text-xs pt-1 border-t border-slate-100 mt-2">
                  Code expired? Contact your doctor to resend the report email.
                </p>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Report card (appears after successful verify) ── */}
        <AnimatePresence>
          {report && <ReportCard key="report" report={report} />}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default ReportAccess;