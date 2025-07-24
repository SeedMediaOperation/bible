'use client';

import React from 'react';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center px-6 py-12">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300 select-none">404</h1>
        </div>
        
        {/* Main Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. 
            Let&apos;s get you back to exploring the Word of God.
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <Link 
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
          >
            Go Home
          </Link>
          <Link 
            href="/books"
            className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-6 py-3 rounded-lg transition-colors duration-200"
          >
            Browse Books
          </Link>
        </div>
        
        {/* Additional Help */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">
            Need help finding something?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
            <Link 
              href="/catelogues"
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              Browse Catalogues
            </Link>
            <Link 
              href="/vlogs"
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              Watch Vlogs
            </Link>
            <Link 
              href="/contact"
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;