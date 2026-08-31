import React, { createContext, useContext } from 'react';

const InitialDataContext = createContext(null);

export const useInitialData = () => {
    return useContext(InitialDataContext);
};

export const InitialDataProvider = ({ initialData, children }) => {
    // If not passed via props on client, retrieve from window.__INITIAL_DATA__
    const resolvedData = initialData || (typeof window !== 'undefined' ? window.__INITIAL_DATA__ : null) || {};

    const services = resolvedData.services || (typeof window !== 'undefined' ? window.__INITIAL_SERVICES__ : []) || [];
    const articles = resolvedData.articles || (typeof window !== 'undefined' ? window.__INITIAL_ARTICLES__ : []) || [];
    const settings = resolvedData.settings || (typeof window !== 'undefined' ? window.__INITIAL_SETTINGS__ : {}) || {};
    const routeData = resolvedData.routeData || null;

    const getService = (slugOrId) => {
        if (!slugOrId) return null;
        const target = String(slugOrId).toLowerCase();

        // 1. Check if routeData is the exact matched service
        if (routeData && (routeData.slug?.toLowerCase() === target || String(routeData.id) === target)) {
            return routeData;
        }

        // 2. Check in loaded services list
        if (Array.isArray(services)) {
            const found = services.find(s => s.slug?.toLowerCase() === target || String(s.id) === target);
            if (found) return found;
        }

        // 3. Fallback to window global if present
        if (typeof window !== 'undefined' && Array.isArray(window.__INITIAL_SERVICES__)) {
            return window.__INITIAL_SERVICES__.find(s => s.slug?.toLowerCase() === target || String(s.id) === target) || null;
        }

        return null;
    };

    const getSubService = (parentSlug, subSlug) => {
        if (!parentSlug || !subSlug) return { parentService: null, subService: null };
        const pTarget = String(parentSlug).toLowerCase();
        const sTarget = String(subSlug).toLowerCase();

        if (routeData?.parentService && routeData?.subService) {
            if (routeData.parentService.slug?.toLowerCase() === pTarget && routeData.subService.slug?.toLowerCase() === sTarget) {
                return routeData;
            }
        }

        const parent = getService(parentSlug);
        if (parent && Array.isArray(parent.sub_services)) {
            const sub = parent.sub_services.find(s => s.slug?.toLowerCase() === sTarget || String(s.id) === sTarget);
            return { parentService: parent, subService: sub || null };
        }

        return { parentService: parent || null, subService: null };
    };

    const getArticle = (slugOrId) => {
        if (!slugOrId) return null;
        const target = String(slugOrId).toLowerCase();

        if (routeData && (routeData.slug?.toLowerCase() === target || String(routeData.id) === target)) {
            return routeData;
        }

        if (Array.isArray(articles)) {
            const found = articles.find(a => a.slug?.toLowerCase() === target || String(a.id) === target);
            if (found) return found;
        }

        if (typeof window !== 'undefined' && Array.isArray(window.__INITIAL_ARTICLES__)) {
            return window.__INITIAL_ARTICLES__.find(a => a.slug?.toLowerCase() === target || String(a.id) === target) || null;
        }

        return null;
    };

    const value = {
        data: resolvedData,
        services,
        articles,
        settings,
        routeData,
        getService,
        getSubService,
        getArticle,
        getServices: () => services,
        getArticles: () => articles,
        getSettings: () => settings
    };

    return (
        <InitialDataContext.Provider value={value}>
            {children}
        </InitialDataContext.Provider>
    );
};
