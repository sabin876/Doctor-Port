const getApiBaseUrl = () => {
    let envUrl = import.meta.env.VITE_API_BASE_URL;
    if (typeof window !== 'undefined') {
        const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        if (!isLocal && envUrl && (envUrl.includes('localhost') || envUrl.includes('127.0.0.1'))) {
            envUrl = 'https://api.drulhasorthopedic.com/api';
        }
    }
    return (envUrl || 'https://api.drulhasorthopedic.com/api').replace(/\/+$/, '');
};

const API_BASE_URL = getApiBaseUrl();

export const getAbsoluteImageUrl = (imgUrl, defaultImage = null) => {
    if (!imgUrl || typeof imgUrl !== 'string') {
        return defaultImage || 'https://drulhasorthopedic.com/assets/images/doctor-hero.webp';
    }
    let url = imgUrl.trim();
    if (!url) {
        return defaultImage || 'https://drulhasorthopedic.com/assets/images/doctor-hero.webp';
    }
    if (url.includes('localhost:8000') || url.includes('127.0.0.1:8000')) {
        url = url.replace(/http:\/\/(localhost|127\.0\.0\.1):8000/g, 'https://api.drulhasorthopedic.com');
    } else if (url.includes('localhost') || url.includes('127.0.0.1')) {
        url = url.replace(/http:\/\/(localhost|127\.0\.0\.1)(:\d+)?/g, 'https://drulhasorthopedic.com');
    }
    if (url.startsWith('http://') || url.startsWith('https://')) {
        if (url.startsWith('http://drulhasorthopedic.com')) {
            url = url.replace('http://', 'https://');
        }
        if (url.startsWith('http://api.drulhasorthopedic.com')) {
            url = url.replace('http://', 'https://');
        }
        return url;
    }
    if (url.startsWith('/media/') || url.startsWith('media/')) {
        const cleanMedia = url.startsWith('/') ? url : `/${url}`;
        return `https://api.drulhasorthopedic.com${cleanMedia}`;
    }
    const cleanPath = url.startsWith('/') ? url : `/${url}`;
    return `https://drulhasorthopedic.com${cleanPath}`;
};

const processImageUrls = (item) => {
    if (!item) return item;
    const baseUrl = API_BASE_URL.replace(/\/api\/?$/, '');
    const isProdHost = typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
    
    ['image', 'og_image', 'checklist_image', 'highlight_doctor_image'].forEach(key => {
        if (item[key] && typeof item[key] === 'string') {
            if (isProdHost && (item[key].includes('localhost') || item[key].includes('127.0.0.1'))) {
                item[key] = item[key].replace(/http:\/\/(localhost|127\.0\.0\.1)(:\d+)?/g, 'https://api.drulhasorthopedic.com');
            } else if (!item[key].startsWith('http')) {
                item[key] = `${baseUrl}${item[key].startsWith('/') ? '' : '/'}${item[key]}`;
            }
        }
    });
    return item;
};

export const api = {
    getArticles: async () => {
        const response = await fetch(`${API_BASE_URL}/articles/`);
        const data = await response.json();
        return Array.isArray(data) ? data.map(processImageUrls) : data;
    },
    getArticle: async (slug) => {
        const response = await fetch(`${API_BASE_URL}/articles/${slug}/`);
        const data = await response.json();
        return processImageUrls(data);
    },
    getServices: async () => {
        const response = await fetch(`${API_BASE_URL}/services/`);
        const data = await response.json();
        return Array.isArray(data) ? data.map(processImageUrls) : data;
    },
    createService: async (data) => {
        const isFormData = data instanceof FormData;
        const response = await fetch(`${API_BASE_URL}/services/`, {
            method: 'POST',
            headers: isFormData ? {} : { 'Content-Type': 'application/json' },
            body: isFormData ? data : JSON.stringify(data)
        });
        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            const errMessage = errData.detail || Object.entries(errData).map(([k, v]) => `${k}: ${v}`).join(', ') || 'Validation failed';
            throw new Error(errMessage);
        }
        return response.json();
    },
    updateService: async (slug, data) => {
        const isFormData = data instanceof FormData;
        const response = await fetch(`${API_BASE_URL}/services/${slug}/`, {
            method: 'PATCH',
            headers: isFormData ? {} : { 'Content-Type': 'application/json' },
            body: isFormData ? data : JSON.stringify(data)
        });
        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            const errMessage = errData.detail || Object.entries(errData).map(([k, v]) => `${k}: ${v}`).join(', ') || 'Validation failed';
            throw new Error(errMessage);
        }
        return response.json();
    },
    deleteService: async (slug) => {
        const response = await fetch(`${API_BASE_URL}/services/${slug}/`, {
            method: 'DELETE'
        });
        return response.ok;
    },
    getTranslations: async (lang = 'EN') => {
        const response = await fetch(`${API_BASE_URL}/translations/?lang=${lang}`);
        return response.json();
    },
    getSiteSettings: async () => {
        const response = await fetch(`${API_BASE_URL}/settings/`);
        return response.json();
    },
    updateSiteSettings: async (data) => {
        const response = await fetch(`${API_BASE_URL}/settings/`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(errData.detail || 'Failed to update site settings');
        }
        return response.json();
    },
    getHeroVideo: async () => {
        const response = await fetch(`${API_BASE_URL}/hero-video/`);
        return response.json();
    },
    getGalleryItems: async () => {
        const response = await fetch(`${API_BASE_URL}/gallery/`);
        const data = await response.json();
        if (Array.isArray(data)) {
            return data.map(item => {
                const processed = processImageUrls(item);
                return {
                    id: processed.id,
                    src: processed.image,
                    category: processed.category,
                    title: processed.title,
                    desc: processed.description,
                    span: processed.span || 'col-span-1 row-span-1'
                };
            });
        }
        return data;
    },
    getHtmlSitemap: async () => {
        const response = await fetch(`${API_BASE_URL}/html-sitemap/`);
        return response.json();
    },
    login: async (username, password) => {
        const response = await fetch(`${API_BASE_URL}/login/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        return response.json();
    },
    getAdminUrl: () => {
        return API_BASE_URL.replace(/\/api\/?$/, '') + '/admin/';
    },
    sendContactMail: async (data) => {
        const response = await fetch(`${API_BASE_URL}/send-mail/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return response.json();
    },
    sendOtp: async (email) => {
        const response = await fetch(`${API_BASE_URL}/send-otp/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(errData.detail || 'Failed to send OTP');
        }
        return response.json();
    },
    verifyOtp: async (email, otp) => {
        const response = await fetch(`${API_BASE_URL}/verify-otp/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp })
        });
        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(errData.detail || 'Incorrect or expired OTP');
        }
        return response.json();
    },
    getReport: async (email, reportId) => {
        const response = await fetch(`${API_BASE_URL}/report/?email=${encodeURIComponent(email)}&report_id=${encodeURIComponent(reportId)}`);
        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw { status: response.status, message: errData.detail || 'Failed to load report' };
        }
        return response.json();
    },
    getSecondOpinions: async () => {
        const response = await fetch(`${API_BASE_URL}/second-opinions/`);
        const data = await response.json();
        return Array.isArray(data) ? data : [];
    },
    createSecondOpinion: async (data) => {
        const response = await fetch(`${API_BASE_URL}/second-opinions/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(errData.detail || 'Failed to create second opinion record');
        }
        return response.json();
    },
    updateSecondOpinion: async (id, data) => {
        const response = await fetch(`${API_BASE_URL}/second-opinions/${id}/`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(errData.detail || 'Failed to update second opinion record');
        }
        return response.json();
    },
    deleteSecondOpinion: async (id) => {
        const response = await fetch(`${API_BASE_URL}/second-opinions/${id}/`, {
            method: 'DELETE'
        });
        return response.ok;
    },
    getHomeFaqs: async () => {
        const response = await fetch(`${API_BASE_URL}/home-faqs/`);
        const data = await response.json();
        return Array.isArray(data) ? data : [];
    },
    getHomePage: async () => {
        const response = await fetch(`${API_BASE_URL}/home-page/`);
        const data = await response.json();
        return processImageUrls(data);
    },
    updateHomePage: async (data) => {
        const isFormData = data instanceof FormData;
        const response = await fetch(`${API_BASE_URL}/home-page/`, {
            method: 'PATCH',
            headers: isFormData ? {} : { 'Content-Type': 'application/json' },
            body: isFormData ? data : JSON.stringify(data)
        });
        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(errData.detail || 'Failed to update home page');
        }
        return response.json();
    }
};

