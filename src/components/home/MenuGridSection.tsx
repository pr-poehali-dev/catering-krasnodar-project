import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product, fetchProducts } from '@/lib/api';
import { useReveal } from '@/hooks/use-reveal';

const CATEGORY_ORDER = ['Канапе', 'Бранчи', 'Тарталетки', 'Ассорти боксы', 'Брускетты', 'Детское меню'];

const MenuGridSection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const head = useReveal();
  const grid = useReveal();

  useEffect(() => {
    fetchProducts()
      .then((list) => setProducts(list))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const map = new Map<string, { count: number; img: string }>();
    products.forEach((p) => {
      const c = p.category || 'Другое';
      const existing = map.get(c);
      const img = p.images[0]?.url || '';
      if (existing) {
        existing.count += 1;
        if (!existing.img && img) existing.img = img;
      } else {
        map.set(c, { count: 1, img });
      }
    });

    const known = CATEGORY_ORDER.filter((c) => map.has(c)).map((c) => ({ name: c, ...map.get(c)! }));
    const rest = Array.from(map.entries())
      .filter(([c]) => !CATEGORY_ORDER.includes(c))
      .map(([name, v]) => ({ name, ...v }));

    return [...known, ...rest];
  }, [products]);

  if (!loading && categories.length === 0) return null;

  return (
    <section className="py-16 sm:py-24 lg:py-28 border-t border-graphite/10 bg-snow relative scroll-mt-24">
      <div className="container mx-auto">
        <div
          ref={head.ref as never}
          className={`text-center mb-10 sm:mb-14 transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            head.visible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-[6px]'
          }`}
        >
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-ash mb-4 sm:mb-5">
            <span className="w-6 h-px bg-ash" />
            Из меню
            <span className="w-6 h-px bg-ash" />
          </div>
          <h2 className="font-sans text-[clamp(1.8rem,6vw,3.2rem)] leading-[0.95] tracking-tightest font-black uppercase text-balance">
            Что попробовать
          </h2>
        </div>

        <div ref={grid.ref as never} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-8 sm:gap-y-10">
          {loading ? (
            [...Array(6)].map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-3 animate-pulse">
                <div className="w-full aspect-square rounded-2xl bg-stone" />
                <div className="h-3 w-20 bg-stone rounded" />
              </div>
            ))
          ) : (
            categories.map((c, i) => (
              <Link
                key={c.name}
                to={`/menu#${c.name}`}
                className="group flex flex-col items-center text-center transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  transitionDelay: `${i * 80}ms`,
                  opacity: grid.visible ? 1 : 0,
                  transform: grid.visible ? 'translateY(0)' : 'translateY(30px)',
                }}
              >
                <div className="relative w-full aspect-square flex items-center justify-center">
                  {c.img ? (
                    <img
                      src={c.img}
                      alt={c.name}
                      loading="lazy"
                      className="w-[85%] h-[85%] object-contain drop-shadow-md group-hover:scale-110 group-hover:-rotate-2 transition-transform duration-500 ease-out"
                    />
                  ) : (
                    <div className="w-[70%] h-[70%] rounded-full bg-stone" />
                  )}
                </div>
                <div className="mt-3 sm:mt-4 font-sans text-[12px] sm:text-[14px] lg:text-[15px] font-black uppercase tracking-tight leading-tight group-hover:text-accent2 transition-colors">
                  {c.name}
                </div>
              </Link>
            ))
          )}
        </div>

        <div className="text-center mt-8 sm:mt-10">
          <Link
            to="/menu"
            className="btn-shadow-sm inline-flex items-center gap-2 px-6 py-3 rounded-full text-[14px] font-semibold border border-graphite/20 bg-snow hover:bg-graphite hover:text-snow hover:border-graphite transition"
          >
            Всё меню
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MenuGridSection;