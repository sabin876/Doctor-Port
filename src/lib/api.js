const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://api.drulhasorthopedic.com/api";

export const api = {
    getArticles: async () => {
        const response = await fetch(`${API_BASE_URL}/articles/`);
        return response.json();
    },
    getArticle: async (slug) => {
        const response = await fetch(`${API_BASE_URL}/articles/${slug}/`);
        return response.json();
    },
    getServices: async () => {
        const response = await fetch(`${API_BASE_URL}/services/`);
        return response.json();
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
