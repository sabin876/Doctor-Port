import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Breadcrumbs = ({ items }) => {
    return (
        <nav aria-label="Breadcrumb" className="w-full bg-transparent py-4 text-sm z-10 px-6 max-w-7xl mx-auto">
            <ol className="flex items-center flex-wrap gap-2 text-gray-500 font-medium">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    return (
                        <li key={index} className="flex items-center">
                            {isLast ? (
                                <span className="text-primary-600 truncate" aria-current="page">
                                    {item.name}
                                </span>
                            ) : (
                                <>
                                    <Link 
                                        to={item.path} 
                                        className="hover:text-primary-600 transition-colors whitespace-nowrap"
                                    >
                                        {item.name}
                                    </Link>
                                    <ChevronRight className="w-4 h-4 mx-2 text-gray-400 flex-shrink-0" />
                                </>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
