import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
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

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bento-card aspect-[3/4] animate-pulse bg-stone" />
            ))}
          </div>
        ) : (
          <div ref={grid.ref as never} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {categories.map((c, i) => (
              <Link
                key={c.name}
                to={`/menu#${c.name}`}
                className="group bento-card aspect-[3/4] relative overflow-hidden transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  transitionDelay: `${i * 80}ms`,
                  opacity: grid.visible ? 1 : 0,
                  transform: grid.visible ? 'translateY(0)' : 'translateY(30px)',
                }}
              >
                {c.img ? (
                  <img
                    src={c.img}
                    alt={c.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1200ms] ease-out"
                  />
                ) : (
                  <div className="absolute inset-0 bg-stone" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-graphite/90 via-graphite/20 to-transparent" />

                <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-snow/90 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-1 transition-all">
                  <Icon name="ArrowUpRight" size={14} />
                </div>

                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 text-snow">
                  <div className="font-sans text-[15px] sm:text-lg lg:text-xl tracking-tight font-medium leading-tight">
                    {c.name}
                  </div>
                  <div className="text-[11px] sm:text-[12px] text-snow/70 mt-0.5">
                    {c.count} {c.count === 1 ? 'позиция' : 'позиций'}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

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