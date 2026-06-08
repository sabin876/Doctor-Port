import React, { useRef, useState, useEffect } from 'react';

const OTPInput = ({ value, onChange, onComplete }) => {
  const [digits, setDigits] = useState(Array(6).fill(''));
  const inputRefs = useRef([]);

  useEffect(() => {
    // Keep local digits state synchronized with parent value string
    const valString = value || '';
    const newDigits = Array(6).fill('');
    for (let i = 0; i < Math.min(valString.length, 6); i++) {
      newDigits[i] = valString[i];
    }
    setDigits(newDigits);
  }, [value]);

  const handleChange = (e, index) => {
    const val = e.target.value;
    if (/[^0-9]/.test(val)) return; // Only numeric

    const newDigits = [...digits];
    // Take the last character entered (in case user types another char on top of an existing one)
    newDigits[index] = val ? val.slice(-1) : '';
    setDigits(newDigits);

    const combined = newDigits.join('');
    onChange(combined);

    // Auto-advance
    if (val && index < 5) {
      inputRefs.current[index + 1].focus();
    }

    if (combined.length === 6 && onComplete) {
      onComplete(combined);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        // Empty box backspace -> focus and clear previous box
        const newDigits = [...digits];
        newDigits[index - 1] = '';
        setDigits(newDigits);
        onChange(newDigits.join(''));
        inputRefs.current[index - 1].focus();
      } else if (digits[index]) {
        // Clear current box
        const newDigits = [...digits];
        newDigits[index] = '';
        setDigits(newDigits);
        onChange(newDigits.join(''));
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();
    if (!/^\d{6}$/.test(pastedData)) return; // Only 6 digit numeric

    const newDigits = pastedData.split('');
    setDigits(newDigits);
    onChange(pastedData);
    inputRefs.current[5].focus();

    if (onComplete) {
      onComplete(pastedData);
    }
  };

  return (
    <div className="flex justify-between gap-2 sm:gap-4 dir-ltr" onPaste={handlePaste}>
      {digits.map((digit, idx) => (
        <input
          key={idx}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={digit}
          ref={(el) => (inputRefs.current[idx] = el)}
          onChange={(e) => handleChange(e, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
        />
      ))}
    </div>
  );
};

export default OTPInput;
