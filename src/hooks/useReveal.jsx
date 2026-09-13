import { useEffect } from 'react';

export function useReveal() {
  useEffect(() => {
    const observe = () => {
      const els = document.querySelectorAll('.reveal:not(.visible)');
      const io = new IntersectionObserver(
        entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } }),
        { threshold: 0.08 }
      );
      els.forEach(el => io.observe(el));
      return io;
    };

    let io = observe();

    // Re-observe whenever new .reveal elements are added (e.g. pagination)
    const mo = new MutationObserver(() => {
      io.disconnect();
      io = observe();
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => { io.disconnect(); mo.disconnect(); };
  }, []);
}
