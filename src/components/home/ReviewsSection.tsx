import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';
import { useReveal } from '@/hooks/use-reveal';

const reviews = [
  {
    image: 'https://cdn.poehali.dev/projects/a8ae25f0-9542-4f49-bc05-8b8f1da19cee/bucket/eaad6521-676d-4f8c-8254-3b877bdf74fc.jpg',
    caption: 'Роспись · 16 гостей',
  },
  {
    image: 'https://cdn.poehali.dev/projects/a8ae25f0-9542-4f49-bc05-8b8f1da19cee/bucket/8023e15d-f418-4b05-9642-8982b7773886.jpg',
    caption: 'Фруктовый бокс',
  },
  {
    image: 'https://cdn.poehali.dev/projects/a8ae25f0-9542-4f49-bc05-8b8f1da19cee/bucket/51397a55-54f5-4d48-b0f4-d2c4e06d0573.jpg',
    caption: 'Большой фуршет',
  },
];

const ReviewsSection = () => {
  const head = useReveal();
  const grid = useReveal();
  const [active, setActive] = useState<number | null>(null);

  const open = (i: number) => setActive(i);
  const close = () => setActive(null);
  const prev = () => setActive((a) => (a === null ? a : (a - 1 + reviews.length) % reviews.length));
  const next = () => setActive((a) => (a === null ? a : (a + 1) % reviews.length));

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [active]);

  return (
    <section id="reviews" className="py-16 sm:py-24 lg:py-32 border-t border-graphite/10 bg-graphite text-snow relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-lime/20 rounded-full blur-[120px] pointer-events-none animate-float-y" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-accent2/20 rounded-full blur-[120px] pointer-events-none animate-float-y" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto relative">
        <div
          ref={head.ref as never}
          className={`flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12 transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            head.visible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-[6px]'
          }`}
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-snow/50 mb-4 sm:mb-5">
              <span className="w-6 h-px bg-snow/30" />
              Отзывы клиентов
            </div>
            <h2 className="font-sans text-[clamp(2rem,7vw,5rem)] leading-[0.95] tracking-tightest font-medium text-balance">
              Слова, которые
              <span className="font-serif italic font-normal text-lime"> греют сердце</span>
            </h2>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 bg-snow/5 border hairline-light rounded-2xl px-5 py-3.5 backdrop-blur">
            <div className="font-sans text-4xl sm:text-5xl tracking-tightest font-medium leading-none">4.9</div>
            <div>
              <div className="flex gap-0.5 mb-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Icon key={j} name="Star" size={12} className="fill-lime text-lime" />
                ))}
              </div>
              <div className="text-[12px] text-snow/60">320+ отзывов Вконтакте</div>
            </div>
          </div>
        </div>

        <div ref={grid.ref as never} className="grid md:grid-cols-3 gap-3 sm:gap-4">
          {reviews.map((r, i) => (
            <button
              key={i}
              type="button"
              onClick={() => open(i)}
              className={`group relative rounded-3xl overflow-hidden border hairline-light bg-snow/[0.04] aspect-[9/16] transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] text-left ${
                i === 1 ? 'md:scale-[1.03] md:-translate-y-3 shadow-2xl shadow-lime/20' : ''
              }`}
              style={{
                transitionDelay: `${i * 150}ms`,
                opacity: grid.visible ? 1 : 0,
                transform: grid.visible
                  ? i === 1 ? 'translateY(-12px) scale(1.03)' : 'translateY(0)'
                  : 'translateY(40px)',
              }}
            >
              <img
                src={r.image}
                alt={r.caption}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1000ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-graphite/85 via-graphite/10 to-transparent pointer-events-none" />
              <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-snow/95 text-graphite text-[11px] font-semibold px-2.5 py-1 rounded-full backdrop-blur">
                <span className="flex">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Icon key={j} name="Star" size={9} className="fill-lime text-lime" />
                  ))}
                </span>
                Реальный отзыв
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 flex items-end justify-between gap-3">
                <div className="text-snow text-[13px] font-medium">{r.caption}</div>
                <div className="w-9 h-9 rounded-full bg-lime flex items-center justify-center group-hover:scale-110 transition shrink-0">
                  <Icon name="Maximize2" size={13} className="text-graphite" />
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-10 sm:mt-12 flex justify-center">
          <a
            href="https://vk.com/foodinboxvrn"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-snow text-graphite px-6 py-4 rounded-full text-[14px] font-medium hover:bg-lime transition"
          >
            <span className="w-7 h-7 rounded-full bg-graphite text-snow flex items-center justify-center text-[11px] font-bold tracking-tight">
              VK
            </span>
            Посмотреть все отзывы
            <span className="w-6 h-6 rounded-full bg-graphite flex items-center justify-center group-hover:rotate-45 transition">
              <Icon name="ArrowUpRight" size={12} className="text-lime" />
            </span>
          </a>
        </div>
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[100] bg-graphite/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-snow/10 hover:bg-snow/20 backdrop-blur text-snow flex items-center justify-center transition z-10"
            aria-label="Закрыть"
          >
            <Icon name="X" size={20} />
          </button>

          {reviews.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-snow/10 hover:bg-snow/20 backdrop-blur text-snow flex items-center justify-center transition z-10"
                aria-label="Назад"
              >
                <Icon name="ChevronLeft" size={22} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-snow/10 hover:bg-snow/20 backdrop-blur text-snow flex items-center justify-center transition z-10"
                aria-label="Вперёд"
              >
                <Icon name="ChevronRight" size={22} />
              </button>
            </>
          )}

          <div
            className="relative max-w-[90vw] sm:max-w-md max-h-[90vh] flex flex-col items-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={reviews[active].image}
              alt={reviews[active].caption}
              className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
            />
            <div className="flex items-center gap-3 text-snow/80 text-[13px]">
              <span>{reviews[active].caption}</span>
              <span className="text-snow/40">·</span>
              <span>{active + 1} / {reviews.length}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ReviewsSection;