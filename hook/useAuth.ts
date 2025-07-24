'use client';

import { useEffect } from 'react';

export const useAuth = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      fetch('/api/auth/refresh', { method: 'POST' });
    }, 60 * 60 * 1000); // Every 1h

    return () => clearInterval(interval);
  }, []);
};
