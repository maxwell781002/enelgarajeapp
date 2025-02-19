'use client';

import { useEffect } from 'react';

export type FacebookOpenNavigatorProps = {
  children: React.ReactNode;
}

export default function FacebookOpenNavigator({ children }: FacebookOpenNavigatorProps) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userAgent = window.navigator.userAgent;
      if (userAgent.indexOf("FBAN") !== -1 || userAgent.indexOf("FBAV") !== -1) {
        const currentDomain = window.location.origin;
        window.location.href = currentDomain;
      }
    }
  }, []);

  return <>{children}</>;
};
