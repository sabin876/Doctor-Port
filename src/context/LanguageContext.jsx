import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations } from '../translations';

const LanguageContext = createContext();

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('EN');

    // Load language from localStorage on mount
    useEffect(() => {
        const savedLang = localStorage.getItem('language');
        if (savedLang && ['EN', 'HI', 'AR'].includes(savedLang)) {
            setLanguage(savedLang);
        }
    }, []);

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
                // Wait for Google Translate to load if it's not ready
                setTimeout(triggerGoogleTranslate, 500);
            }
        };

        // Don't trigger if it's already in the target language (google translate might not be initialized yet)
        triggerGoogleTranslate();
    }, [language]);

    const t = (key) => {
        const keys = key.split('.');
        // Always use English as the source for Google Translate to work with
        // This ensures the DOM starts with English and Google handles the translation
        let value = translations['EN'];

        for (const k of keys) {
            if (value && typeof value === 'object') {
                value = value[k];
            } else {
                return key; // Return key if translation not found
            }
        }

        return value || key;
    };

    const value = {
        language,
        setLanguage,
        t
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};
