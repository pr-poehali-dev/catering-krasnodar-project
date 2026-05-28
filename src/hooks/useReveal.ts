import { useEffect } from 'react';

const useReveal = () => {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('.reveal');
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.delay ?? '0';
            window.setTimeout(() => el.classList.add('is-visible'), Number(delay));
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
};

export default useReveal;
