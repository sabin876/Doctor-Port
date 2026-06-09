import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, CheckCircle, ArrowRight, ShieldCheck, KeyRound, Mail } from 'lucide-react';
import OTPInput from '../../components/OTPInput';
import ResendOTP from '../../components/ResendOTP';
import { api } from '../../lib/api';
import { Helmet } from 'react-helmet-async';

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgClass = type === 'success' ? 'bg-emerald-500' : 'bg-red-500';
  const Icon = type === 'success' ? CheckCircle : ShieldAlert;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      className={`fixed top-6 right-6 ${bgClass} text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 z-50`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-semibold text-sm">{message}</span>
    </motion.div>
  );
};

const ReportAccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const urlToken = searchParams.get('token') || '';

  const [token, setToken] = useState(urlToken);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'error') => {
    setToast({ message, type });
  };

  const handleVerify = async (e) => {
    if (e) e.preventDefault();
    if (!token.trim()) {
      showToast('Please enter your access token.', 'error');
      return;
    }
    if (!email.trim()) {
      showToast('Please enter your email address.', 'error');
      return;
    }
    if (otp.length !== 6) {
      showToast('Please enter a valid 6-digit code.', 'error');
      return;
    }

    setIsLoading(true);
    try {
      await api.verifyOtp(token.trim(), email.trim(), otp);
      showToast('Verification successful!', 'success');
      setTimeout(() => {
        navigate(`/report/${token.trim()}`);
      }, 1000);
    } catch (err) {
      showToast(err.message || 'Incorrect or expired verification code.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-sky-50 flex items-center justify-center p-4 relative overflow-hidden">
      <Helmet>
        <title>Report Access | Patient Portal</title>
      </Helmet>

      {/* Decorative Orbs */}
      <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-200/20 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-sky-200/25 blur-[100px] pointer-events-none" />

      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[2.5rem] p-8 sm:p-10 shadow-[0_20px_50px_rgba(37,99,235,0.06)] border border-slate-100 max-w-md w-full relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100/50 text-blue-600 flex items-center justify-center mx-auto mb-6 shadow-sm">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-slate-800 mb-2 font-poppins">Report Access Portal</h1>
          <p className="text-slate-500 text-sm font-medium">
            Enter your email address and the 6-digit code sent to your email to unlock your medical report.
          </p>
        </div>

        {!token && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-800 text-xs font-semibold leading-relaxed">
            ⚠️ Warning: Invalid or missing access token. Please click the secure link sent to your email to access your report.
          </div>
        )}

        {/* Verification Form */}
        <form onSubmit={handleVerify} className="space-y-6">

          {/* Email Address Input */}
          <div className="space-y-2">
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-5 h-5" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="patient@example.com"
                className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl outline-none transition-all text-sm font-medium bg-white text-slate-800 focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 text-center">
              6-Digit Verification Code
            </label>
            <OTPInput
              value={otp}
              onChange={setOtp}
              onComplete={(completedOtp) => {
                // Auto verify on final code digit
                setTimeout(() => handleVerify(), 200);
              }}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={!token.trim() || !email.trim() || otp.length !== 6 || isLoading}
            className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-[0_12px_24px_-6px_rgba(37,99,235,0.3)] hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying...
              </span>
            ) : (
              <>
                Unlock Report
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </form>

        {/* Footer / Resend */}
        {token.trim() && (
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col items-center gap-2 text-center">
            <span className="text-slate-400 text-xs font-medium">Didn't receive the code?</span>
            <ResendOTP
              token={token.trim()}
              onResendStart={() => showToast('Sending verification email...', 'success')}
              onResendSuccess={() => showToast('New code sent to your email!', 'success')}
              onResendError={(err) => showToast(err, 'error')}
            />
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ReportAccess;
