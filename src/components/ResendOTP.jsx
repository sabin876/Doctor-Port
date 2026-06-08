import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';

const ResendOTP = ({ token, onResendStart, onResendSuccess, onResendError }) => {
  const [countdown, setCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResend = async () => {
    if (countdown > 0 || isLoading) return;
    setIsLoading(true);
    if (onResendStart) onResendStart();

    try {
      await api.sendOtp(token);
      setCountdown(60); // Cooldown for 60 seconds
      if (onResendSuccess) onResendSuccess();
    } catch (err) {
      if (onResendError) onResendError(err.message || 'Failed to resend OTP.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleResend}
      disabled={countdown > 0 || isLoading}
      className={`text-sm font-bold transition-colors ${
        countdown > 0 || isLoading
          ? 'text-slate-400 cursor-not-allowed'
          : 'text-blue-600 hover:text-blue-800'
      }`}
    >
      {isLoading ? (
        <span className="flex items-center gap-1.5 justify-center">
          <svg className="animate-spin h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Sending...
        </span>
      ) : countdown > 0 ? (
        `Resend code in ${countdown}s`
      ) : (
        'Resend OTP'
      )}
    </button>
  );
};

export default ResendOTP;
