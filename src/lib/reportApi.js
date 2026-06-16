import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.drulhasorthopedic.com';

const client = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
});

// Attach doctor JWT when present
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Normalise error shape for all JSON responses
client.interceptors.response.use(
  (res) => res,
  (err) => {
    const error = err.response?.data || { detail: 'Network error. Please try again.' };
    error.status = err.response?.status;
    return Promise.reject(error);
  },
);

// ─── Doctor ───────────────────────────────────────────────────────────────────

/** Doctor creates report → OTP auto-emailed to patient. Requires JWT. */
export const createReport = (payload) =>
  client.post('/api/reports/create/', payload).then((r) => r.data);

// ─── Patient ──────────────────────────────────────────────────────────────────

/** Resend OTP when expired. */
export const sendOTP = (reportId, email) =>
  client.post('/api/send-otp/', { report_id: reportId, email }).then((r) => r.data);

/**
 * Verify OTP.
 * Backend returns the report data + file URL on success.
 * We need the raw axios response (not just .data) so we can
 * inspect headers and handle blob responses if the backend
 * ever streams binary directly.
 *
 * Returns: { token, report: { id, doctor, patient_email, content, created_at, pdf, file } }
 */
export const verifyOTP = async (email, otp) => {
  const res = await client.post('/api/verify-otp/', {
    email,
    otp,
  });
  return res.data;
};

export const downloadFile = async (fileUrl) => {
  const response = await client.get(fileUrl, { responseType: 'blob' });
  return URL.createObjectURL(response.data);
};
   
export default client;