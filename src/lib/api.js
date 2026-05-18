const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://api.drulhasorthopedic.com/api";

const processImageUrls = (item) => {
    if (!item) return item;
    const baseUrl = API_BASE_URL.replace(/\/api\/?$/, '');
    
    if (item.image && !item.image.startsWith('http')) {
        item.image = `${baseUrl}${item.image.startsWith('/') ? '' : '/'}${item.image}`;
    }
    if (item.og_image && !item.og_image.startsWith('http')) {
        item.og_image = `${baseUrl}${item.og_image.startsWith('/') ? '' : '/'}${item.og_image}`;
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
    getTranslations: async (lang = 'EN') => {
        const response = await fetch(`${API_BASE_URL}/translations/?lang=${lang}`);
        return response.json();
    },
    getSiteSettings: async () => {
        const response = await fetch(`${API_BASE_URL}/settings/`);
        return response.json();
    }
};
