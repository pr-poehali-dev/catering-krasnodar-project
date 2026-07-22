import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import Logo from '@/components/Logo';
import { Product, fetchProducts } from '@/lib/api';

const MAX_LINK = 'https://max.ru/join/IXMk3u0BPhokEDCdyrtOZn591m-jXLVNcrU02S-hkxo';

const MenuPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCat, setActiveCat] = useState<string>('Все');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchProducts()
      .then((list) => setProducts(list))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach((p) => {
      const c = p.category || 'Без категории';
      counts[c] = (counts[c] || 0) + 1;
    });
    return [
      { name: 'Все', count: products.length },
      ...Object.entries(counts).map(([name, count]) => ({ name, count })),
    ];
  }, [products]);

  const grouped = useMemo(() => {
    const q = search.trim().toLowerCase();
    const filtered = products.filter((p) => {
      const inCat = activeCat === 'Все' || (p.category || 'Без категории') === activeCat;
      const inSearch = !q || p.name.toLowerCase().includes(q) || (p.description || '').toLowerCase().includes(q);
      return inCat && inSearch;
    });
    const map = new Map<string, Product[]>();
    filtered.forEach((p) => {
      const c = p.category || 'Без категории';
      if (!map.has(c)) map.set(c, []);
      map.get(c)!.push(p);
    });
    return Array.from(map.entries());
  }, [products, activeCat, search]);

  return (
    <div className="min-h-screen bg-stone">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-snow/95 backdrop-blur border-b border-graphite/10">
        <div className="container mx-auto py-3 sm:py-4 flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2 text-[13px] hover:opacity-70 transition">
            <Icon name="ArrowLeft" size={16} />
            <span className="hidden sm:inline">На главную</span>
          </Link>
          <Logo size="sm" to="/" />
          <a
            href={MAX_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] sm:text-[13px] bg-graphite text-snow px-3 sm:px-4 py-2 rounded-full hover:bg-graphite/85 transition inline-flex items-center gap-1.5"
          >
            <span className="w-4 h-4 rounded-sm bg-lime text-graphite text-[9px] font-bold flex items-center justify-center">M</span>
            <span className="hidden sm:inline">Заказать</span>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="py-10 sm:py-14 lg:py-20 border-b border-graphite/10 relative overflow-hidden">
        <div className="absolute -top-32 -right-20 w-96 h-96 bg-lime/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto relative">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-ash mb-4">
            <span className="w-6 h-px bg-ash" /> Каталог
          </div>
          <h1 className="font-sans text-[clamp(2.2rem,8vw,5.5rem)] leading-[0.95] tracking-tightest font-medium text-balance max-w-3xl">
            <span className="font-serif italic font-normal">Меню</span> от Галины
          </h1>
          <p className="mt-4 sm:mt-5 text-graphite/70 max-w-xl text-[15px] leading-relaxed">
            Готовим в день мероприятия из свежих сезонных продуктов. Сборка и подача — как на обложке журнала.
          </p>

          <div className="mt-6 sm:mt-8 max-w-md relative">
            <Icon name="Search" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ash" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Найти блюдо…"
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-snow border border-graphite/10 focus:border-graphite outline-none text-[14px] transition"
            />
          </div>
        </div>
      </section>

      {/* Categories sticky bar */}
      <div className="sticky top-[57px] sm:top-[65px] z-30 bg-stone/95 backdrop-blur border-b border-graphite/10">
        <div className="container mx-auto py-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            {categories.map((c) => (
              <button
                key={c.name}
                onClick={() => setActiveCat(c.name)}
                className={`px-4 py-2 rounded-full text-[13px] font-medium border whitespace-nowrap shrink-0 transition inline-flex items-center gap-1.5 ${
                  activeCat === c.name
                    ? 'bg-graphite text-snow border-graphite'
                    : 'bg-snow border-graphite/15 hover:border-graphite/40'
                }`}
              >
                {c.name}
                <span className={`text-[11px] ${activeCat === c.name ? 'text-snow/60' : 'text-ash'}`}>{c.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Catalog */}
      <main className="container mx-auto py-8 sm:py-12">
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bento-card bg-snow animate-pulse">
                <div className="aspect-[4/3] bg-stone" />
                <div className="p-5 space-y-2">
                  <div className="h-4 bg-stone rounded w-2/3" />
                  <div className="h-3 bg-stone rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : grouped.length === 0 ? (
          <div className="bento-card bg-snow p-12 text-center">
            <Icon name="SearchX" size={32} className="mx-auto text-ash mb-3" />
            <p className="text-ash">Ничего не нашлось. Попробуйте другой запрос или категорию.</p>
            <button
              onClick={() => {
                setSearch('');
                setActiveCat('Все');
              }}
              className="mt-4 px-5 py-2.5 rounded-full bg-graphite text-snow text-[13px] hover:bg-graphite/85 transition"
            >
              Сбросить фильтры
            </button>
          </div>
        ) : (
          grouped.map(([cat, items]) => (
            <section key={cat} id={cat} className="mb-12 sm:mb-16 last:mb-0 scroll-mt-32">
              <div className="flex items-baseline gap-3 sm:gap-4 mb-5 sm:mb-6">
                <h2 className="font-sans text-2xl sm:text-3xl lg:text-4xl tracking-tightest font-medium">{cat}</h2>
                <span className="text-[12px] text-ash">{items.length} {items.length === 1 ? 'позиция' : 'позиций'}</span>
                <span className="flex-1 h-px bg-graphite/10" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {items.map((p) => (
                  <Link
                    key={p.id}
                    to={`/product/${p.id}`}
                    className="bento-card group bg-snow overflow-hidden flex flex-col"
                  >
                    <div className="aspect-[4/3] bg-stone relative overflow-hidden">
                      {p.images[0] ? (
                        <img
                          src={p.images[0].url}
                          alt={p.name}
                          loading="lazy"
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[800ms]"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-ash">
                          <Icon name="Image" size={32} />
                        </div>
                      )}
                      {p.badge && (
                        <span className="absolute top-3 left-3 bg-lime text-graphite text-[11px] font-semibold px-3 py-1 rounded-full">
                          {p.badge}
                        </span>
                      )}
                      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-snow/90 backdrop-blur flex items-center justify-center sm:opacity-0 sm:group-hover:opacity-100 transition">
                        <Icon name="ArrowUpRight" size={14} />
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="font-sans text-[16px] tracking-tight font-medium leading-snug group-hover:text-accent2 transition">
                            {p.name}
                          </h3>
                          {p.portion && <div className="text-[12px] text-ash mt-0.5">{p.portion}</div>}
                        </div>
                        {p.price > 0 && (
                          <div className="text-[15px] font-semibold whitespace-nowrap">{p.price} ₽</div>
                        )}
                      </div>
                      {p.description && (
                        <p className="text-[13px] text-graphite/70 mt-2 line-clamp-2 flex-1">{p.description}</p>
                      )}
                      {p.reviews.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-graphite/10 flex items-center gap-1.5 text-[12px] text-ash">
                          <Icon name="Star" size={12} className="text-lime fill-lime" />
                          {(p.reviews.reduce((s, r) => s + r.rating, 0) / p.reviews.length).toFixed(1)}
                          <span>· {p.reviews.length} отзывов</span>
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))
        )}
      </main>

      {/* CTA bottom */}
      <section className="border-t border-graphite/10 bg-graphite text-snow py-14 sm:py-20 relative overflow-hidden">
        <div className="absolute -top-32 -left-20 w-96 h-96 bg-lime/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto relative text-center">
          <h2 className="font-sans text-3xl sm:text-5xl tracking-tightest font-medium text-balance">
            Не нашли подходящее? <span className="font-serif italic font-normal text-lime">Соберём индивидуально</span>
          </h2>
          <p className="text-snow/70 mt-4 max-w-lg mx-auto text-[15px]">
            Расскажите о событии — подберём набор под бюджет и количество гостей за 15 минут
          </p>
          <a
            href={MAX_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-3 bg-lime text-graphite px-6 py-4 rounded-full text-[14px] font-semibold hover:bg-snow transition group"
          >
            <span className="w-5 h-5 rounded-md bg-graphite text-lime text-[10px] font-bold flex items-center justify-center">M</span>
            Написать в MAX
            <span className="w-6 h-6 rounded-full bg-graphite flex items-center justify-center group-hover:rotate-45 transition">
              <Icon name="ArrowRight" size={12} className="text-lime" />
            </span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default MenuPage;