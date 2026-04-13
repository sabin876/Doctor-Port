import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const TrailingSlashRedirect = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const { pathname, search, hash } = location;
        
        // If pathname is just '/' then it's fine
        // If it ends with '/' and length > 1, redirect
        if (pathname !== '/' && pathname.endsWith('/')) {
            const cleanPath = pathname.slice(0, -1);
            navigate(`${cleanPath}${search}${hash}`, { replace: true });
        }
    }, [location, navigate]);

    return null;
};

export default TrailingSlashRedirect;
