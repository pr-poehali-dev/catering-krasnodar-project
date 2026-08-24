import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product, fetchProducts } from '@/lib/api';
import { useReveal } from '@/hooks/use-reveal';

const MenuGridSection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const head = useReveal();

  useEffect(() => {
    fetchProducts()
      .then((list) => setProducts(list))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const grouped = useMemo(() => {
    const map = new Map<string, Product[]>();
    products.forEach((p) => {
      const c = p.category || 'Другое';
      if (!map.has(c)) map.set(c, []);
      map.get(c)!.push(p);
    });
    return Array.from(map.entries()).slice(0, 2);
  }, [products]);

  if (!loading && grouped.length === 0) return null;

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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-3 animate-pulse">
                <div className="w-28 h-20 sm:w-32 sm:h-24 rounded-[50%] bg-stone" />
                <div className="h-3 w-20 bg-stone rounded" />
              </div>
            ))}
          </div>
        ) : (
          grouped.map(([cat, items]) => (
            <div key={cat} className="mb-12 sm:mb-16 last:mb-0">
              <div className="text-center mb-6 sm:mb-8">
                <span className="inline-block bg-snow text-graphite text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.1em] px-4 py-1.5 rounded-full border-2 border-graphite">
                  {cat}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-y-10">
                {items.slice(0, 8).map((p) => (
                  <Link
                    key={p.id}
                    to={`/product/${p.id}`}
                    className="group flex flex-col items-center gap-3 text-center"
                  >
                    <div className="w-28 h-20 sm:w-32 sm:h-24 lg:w-36 lg:h-28 rounded-[50%] overflow-hidden bg-stone shadow-md ring-1 ring-graphite/5 group-hover:scale-105 group-hover:shadow-lg transition-all duration-300">
                      {p.images[0] ? (
                        <img
                          src={p.images[0].url}
                          alt={p.name}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-stone" />
                      )}
                    </div>
                    <span className="text-[11px] sm:text-[12px] font-extrabold uppercase tracking-[0.02em] leading-tight max-w-[9rem] group-hover:text-accent2 transition-colors">
                      {p.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))
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