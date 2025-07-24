'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const BreadCrumb = () => {
    const pathname = usePathname(); // e.g., "/en/dashboard/books/versions"
    const segments = pathname.split('/').filter(Boolean); // remove empty values

    // If using i18n, remove the locale from breadcrumbs
    const locale = segments[0];
    const filteredSegments = segments.slice(1); 
    let path = `/${locale}`;

    return (
        <div className="text-sm breadcrumbs !text-white ">
            <ul className="w-fit bg-white/30 flex gap-2 rounded-full px-4 py-2">

                {filteredSegments.map((segment, index) => {
                    path += `/${segment}`;
                    const label = segment.charAt(0).toUpperCase() + segment.slice(1); // Capitalize
                    const isLast = index === filteredSegments.length - 1;

                    return (
                        <li key={index}>
                            {isLast ? (
                                <span>{label}</span>
                            ) : (
                                <Link href={path}>{label}</Link>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default BreadCrumb;
