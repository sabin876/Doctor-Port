import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const BASE_URL = 'https://drulhasorthopedic.com';

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

        const canonicalUrl = `${BASE_URL}${cleanPath || '/'}`;

        // Find existing canonical tags
        const links = document.querySelectorAll('link[rel="canonical"]');

        if (links.length > 0) {
            // Keep the first tag updated
            links[0].setAttribute('href', canonicalUrl);
            // Remove any duplicates to guarantee single canonical in DOM
            for (let i = 1; i < links.length; i++) {
                links[i].remove();
            }
        } else {
            const link = document.createElement('link');
            link.setAttribute('rel', 'canonical');
            link.setAttribute('href', canonicalUrl);
            document.head.appendChild(link);
        }
    }, [pathname]);

    return null; // renders nothing
};

export default CanonicalTag;
