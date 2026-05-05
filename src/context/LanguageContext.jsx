import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations as staticTranslations } from '../translations';
import { api } from '../lib/api';

const LanguageContext = createContext();

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        const savedLang = localStorage.getItem('language');
        return (savedLang && ['EN', 'HI', 'AR'].includes(savedLang)) ? savedLang : 'EN';
    });
    
    const [dynamicTranslations, setDynamicTranslations] = useState({});
    const [loading, setLoading] = useState(true);

    // Fetch translations from API
    useEffect(() => {
        const fetchTranslations = async () => {
            try {
                const data = await api.getTranslations(language);
                setDynamicTranslations(prev => ({
                    ...prev,
                    [language]: data
                }));
            } catch (error) {
                console.error('Failed to fetch translations:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTranslations();
    }, [language]);

    // Save language to localStorage when it changes
    useEffect(() => {
        localStorage.setItem('language', language);
        // Update document direction for RTL languages
        document.documentElement.dir = language === 'AR' ? 'rtl' : 'ltr';
        document.documentElement.lang = language === 'AR' ? 'ar' : language === 'HI' ? 'hi' : 'en';

        // Trigger Google Translate
        const triggerGoogleTranslate = () => {
            const googleCombo = document.querySelector('.goog-te-combo');
            if (googleCombo) {
                googleCombo.value = language.toLowerCase();
                googleCombo.dispatchEvent(new Event('change'));
            } else {
                setTimeout(triggerGoogleTranslate, 500);
            }
        };

        triggerGoogleTranslate();
    }, [language]);

    const t = (key) => {
        const keys = key.split('.');
        
        // 1. Try Dynamic Translations (from Backend)
        let value = dynamicTranslations[language];
        for (const k of keys) {
            if (value && typeof value === 'object') {
                value = value[k];
            } else {
                value = undefined;
                break;
            }
        }

        // 2. Try Static Translations (Fallback)
        if (value === undefined || value === null) {
            value = staticTranslations[language];
            for (const k of keys) {
                if (value && typeof value === 'object') {
                    value = value[k];
                } else {
                    value = undefined;
                    break;
                }
            }
        }

        // 3. Final Fallback to EN static
        if (value === undefined || value === null) {
            value = staticTranslations['EN'];
            for (const k of keys) {
                if (value && typeof value === 'object') {
                    value = value[k];
                } else {
                    return key; 
                }
            }
        }

        return (value !== undefined && value !== null) ? value : key;
    };

    const value = {
        language,
        setLanguage,
        t,
        loading
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};
