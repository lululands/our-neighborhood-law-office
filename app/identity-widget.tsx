'use client';

import { useEffect } from 'react';

export type NetlifyIdentity = {
  init: () => void;
  currentUser: () => unknown;
  open: (mode?: string) => void;
  on: (event: string, callback: () => void) => void;
};

declare global {
  interface Window {
    netlifyIdentity?: NetlifyIdentity;
  }
}

export default function IdentityWidget() {
  useEffect(() => {
    const existing = document.querySelector('script[data-netlify-identity]');
    const initialize = () => window.netlifyIdentity?.init();

    if (existing) {
      initialize();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://identity.netlify.com/v1/netlify-identity-widget.js';
    script.async = true;
    script.dataset.netlifyIdentity = 'true';
    script.onload = initialize;
    document.body.appendChild(script);
  }, []);

  return null;
}
