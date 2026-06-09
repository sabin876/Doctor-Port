const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "https://api.drulhasorthopedic.com/api").replace(/\/+$/, "");

const processImageUrls = (item) => {
    if (!item) return item;
    const baseUrl = API_BASE_URL.replace(/\/api\/?$/, '');
    
    if (item.image && !item.image.startsWith('http')) {
        item.image = `${baseUrl}${item.image.startsWith('/') ? '' : '/'}${item.image}`;
    }
    if (item.og_image && !item.og_image.startsWith('http')) {
        item.og_image = `${baseUrl}${item.og_image.startsWith('/') ? '' : '/'}${item.og_image}`;
    }
    if (item.checklist_image && !item.checklist_image.startsWith('http')) {
        item.checklist_image = `${baseUrl}${item.checklist_image.startsWith('/') ? '' : '/'}${item.checklist_image}`;
    }
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
    }
};

