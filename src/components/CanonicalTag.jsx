import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const BASE_URL = 'https://orthopedic-specialist.com';

/**
 * CanonicalTag
 * ------------
 * Dynamically injects/updates a self-referencing <link rel="canonical">
 * in <head> on every route change.
 *
 * Rules applied:
 *  - Always uses the BASE_URL (no www, no trailing slash variance)
 *  - Strips trailing slash (except for the root "/")
 *  - Ignores query strings and hash fragments
 */
const CanonicalTag = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Normalise: strip trailing slash unless it's the root "/"
        const cleanPath = pathname.length > 1 && pathname.endsWith('/')
            ? pathname.slice(0, -1)
            : pathname;

        const canonicalUrl = `${BASE_URL}${cleanPath}`;

        // Find existing tag or create one
        let link = document.querySelector('link[rel="canonical"]');

        if (!link) {
            link = document.createElement('link');
            link.setAttribute('rel', 'canonical');
            document.head.appendChild(link);
        }

        link.setAttribute('href', canonicalUrl);

    }, [pathname]);

    return null; // renders nothing
};

export default CanonicalTag;
