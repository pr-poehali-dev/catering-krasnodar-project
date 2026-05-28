import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import { Product, addReview, fetchProducts } from '@/lib/api';
import { useReveal } from '@/hooks/use-reveal';

const ProductCard = ({ product, onReviewAdded }: { product: Product; onReviewAdded: () => void }) => {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [form, setForm] = useState({ author_name: '', text: '', rating: 5, event: '' });
  const [sending, setSending] = useState(false);
  const card = useReveal();

  const images = product.images.length ? product.images : [{ id: 0, url: '', sort_order: 0 }];
  const avgRating = product.reviews.length
    ? (product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length).toFixed(1)
    : null;

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.author_name.trim() || !form.text.trim()) {
      toast.error('Заполните имя и текст');
      return;
    }
    setSending(true);
    try {
      await addReview(product.id, form);
      toast.success('Спасибо за отзыв!');
      setForm({ author_name: '', text: '', rating: 5, event: '' });
      setReviewOpen(false);
      onReviewAdded();
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSending(false);
    }
  };

  return (
    <article
      ref={card.ref as never}
      className="bento-card group bg-snow overflow-hidden transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{
        opacity: card.visible ? 1 : 0,
        transform: card.visible ? 'translateY(0)' : 'translateY(30px)',
      }}
    >
      <Link to={`/product/${product.id}`} className="block aspect-[4/3] overflow-hidden bg-stone relative">
        {images.map((img, i) => (
          <img
            key={img.id || i}
            src={img.url}
            alt={product.name}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${active === i ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
        {!product.images.length && (
          <div className="absolute inset-0 flex items-center justify-center text-ash">
            <Icon name="Image" size={32} />
          </div>
        )}
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-snow/90 backdrop-blur flex items-center justify-center sm:opacity-0 sm:group-hover:opacity-100 transition">
          <Icon name="ArrowUpRight" size={14} />
        </div>

        {product.badge && (
          <div className="absolute top-3 left-3">
            <span className="bg-lime text-graphite text-[11px] font-semibold px-3 py-1 rounded-full">
              {product.badge}
            </span>
          </div>
        )}
        {product.category && !product.badge && (
          <div className="absolute top-3 left-3">
            <span className="bg-snow/90 backdrop-blur text-[11px] font-medium px-2.5 py-1 rounded-full">
              {product.category}
            </span>
          </div>
        )}

        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {product.images.map((_, i) => (
              <span
                key={i}
                onMouseEnter={(e) => {
                  e.preventDefault();
                  setActive(i);
                }}
                className={`h-1.5 rounded-full transition-all ${active === i ? 'w-6 bg-snow' : 'w-1.5 bg-snow/60'}`}
                aria-label={`Фото ${i + 1}`}
              />
            ))}
          </div>
        )}
      </Link>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link to={`/product/${product.id}`} className="block">
              <h4 className="font-sans text-[16px] sm:text-[17px] tracking-tight font-medium leading-snug hover:text-accent2 transition">{product.name}</h4>
            </Link>
            {product.portion && <div className="text-[12px] text-ash mt-0.5">{product.portion}</div>}
          </div>
          {product.price > 0 && (
            <div className="text-[15px] font-semibold whitespace-nowrap">{product.price} ₽</div>
          )}
        </div>

        {product.description && (
          <p className={`text-[13px] sm:text-[14px] text-graphite/75 mt-2.5 leading-relaxed ${open ? '' : 'line-clamp-2'}`}>
            {product.description}
          </p>
        )}
        {product.description && product.description.length > 100 && (
          <button onClick={() => setOpen(!open)} className="text-[12px] text-graphite/60 hover:text-graphite mt-1.5 underline-offset-2 hover:underline">
            {open ? 'Свернуть' : 'Подробнее'}
          </button>
        )}

        <div className="mt-4 pt-4 border-t border-graphite/10 flex items-center justify-between gap-3">
          <button
            onClick={() => setReviewOpen(!reviewOpen)}
            className="text-[12px] text-ash hover:text-graphite inline-flex items-center gap-1.5 transition"
          >
            <Icon name="Star" size={13} className={avgRating ? 'text-lime fill-lime' : ''} />
            {avgRating ? `${avgRating} · ${product.reviews.length}` : 'Нет отзывов'}
          </button>
          <Link
            to={`/product/${product.id}`}
            className="text-[12px] font-medium bg-graphite text-snow px-3.5 py-2 rounded-full hover:bg-graphite/85 transition inline-flex items-center gap-1.5"
          >
            Подробнее
            <Icon name="ArrowRight" size={11} />
          </Link>
        </div>

        {product.reviews.length > 0 && (
          <div className="mt-4 space-y-2.5">
            {product.reviews.slice(0, open ? undefined : 2).map((r) => (
              <div key={r.id} className="bg-stone rounded-2xl p-3 text-[13px]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{r.author_name}</span>
                  <span className="text-lime text-[11px]">{'★'.repeat(r.rating)}</span>
                  {r.event && <span className="text-ash text-[11px]">· {r.event}</span>}
                </div>
                <p className="text-graphite/80 leading-snug">{r.text}</p>
              </div>
            ))}
            {product.reviews.length > 2 && !open && (
              <button onClick={() => setOpen(true)} className="text-[12px] text-graphite/60 hover:text-graphite">
                Ещё {product.reviews.length - 2} отзыв(ов)
              </button>
            )}
          </div>
        )}

        {reviewOpen && (
          <form onSubmit={submitReview} className="mt-4 space-y-2 bg-stone rounded-2xl p-3">
            <input
              type="text"
              required
              placeholder="Ваше имя"
              value={form.author_name}
              onChange={(e) => setForm({ ...form, author_name: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-snow border border-graphite/10 text-[13px] outline-none focus:border-graphite"
            />
            <input
              type="text"
              placeholder="Событие (например: Свадьба, 50 гостей)"
              value={form.event}
              onChange={(e) => setForm({ ...form, event: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-snow border border-graphite/10 text-[13px] outline-none focus:border-graphite"
            />
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-ash">Оценка:</span>
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  type="button"
                  key={n}
                  onClick={() => setForm({ ...form, rating: n })}
                  className="text-lg leading-none"
                >
                  <span className={n <= form.rating ? 'text-lime' : 'text-graphite/20'}>★</span>
                </button>
              ))}
            </div>
            <textarea
              required
              rows={3}
              placeholder="Ваш отзыв"
              value={form.text}
              onChange={(e) => setForm({ ...form, text: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-snow border border-graphite/10 text-[13px] outline-none focus:border-graphite resize-none"
            />
            <div className="flex gap-2">
              <button type="submit" disabled={sending} className="flex-1 bg-graphite text-snow py-2.5 rounded-xl text-[13px] font-medium hover:bg-graphite/85 transition disabled:opacity-50">
                {sending ? 'Отправляем…' : 'Отправить'}
              </button>
              <button type="button" onClick={() => setReviewOpen(false)} className="px-4 py-2.5 rounded-xl text-[13px] border border-graphite/15 hover:bg-graphite/5">
                Отмена
              </button>
            </div>
          </form>
        )}
      </div>
    </article>
  );
};

const MenuSection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('Все');
  const head = useReveal();

  const load = async () => {
    try {
      const list = await fetchProducts();
      setProducts(list);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.category && set.add(p.category));
    return ['Все', ...Array.from(set)];
  }, [products]);

  const filtered = useMemo(
    () => (filter === 'Все' ? products : products.filter((p) => p.category === filter)),
    [products, filter],
  );

  return (
    <section id="menu" className="py-16 sm:py-24 lg:py-32 border-t border-graphite/10 relative">
      <div className="absolute inset-0 dotted-bg opacity-50 pointer-events-none" />
      <div className="container mx-auto relative">
        <div
          ref={head.ref as never}
          className={`flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12 transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            head.visible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-[6px]'
          }`}
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-ash mb-4 sm:mb-5">
              <span className="w-6 h-px bg-ash" />
              Каталог
            </div>
            <h2 className="font-sans text-[clamp(2rem,7vw,5rem)] leading-[0.95] tracking-tightest font-medium text-balance">
              Каталог <span className="font-serif italic font-normal">авторских</span> боксов
            </h2>
            <p className="mt-4 sm:mt-5 text-graphite/70 max-w-lg text-[15px] leading-relaxed">
              Готовим свежие порционные канапе, тарталетки и мини-десерты в день мероприятия. Подача — как на обложке кулинарного журнала.
            </p>
          </div>
          {categories.length > 1 && (
            <div className="flex gap-2 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap scrollbar-hide">
              {categories.map((t) => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`px-4 py-2 rounded-full text-[13px] font-medium border transition whitespace-nowrap shrink-0 ${
                    filter === t ? 'bg-graphite text-snow border-graphite' : 'bg-snow border-graphite/15 hover:border-graphite/40'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bento-card bg-snow animate-pulse">
                <div className="aspect-[4/3] bg-stone" />
                <div className="p-5 space-y-2">
                  <div className="h-4 bg-stone rounded w-2/3" />
                  <div className="h-3 bg-stone rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="bento-card bg-snow p-12 text-center">
            <Icon name="UtensilsCrossed" size={32} className="mx-auto text-ash mb-3" />
            <p className="text-ash">Каталог скоро появится. Свяжитесь с Галиной для индивидуального меню.</p>
            <a href="#contacts" className="inline-flex items-center gap-2 mt-4 bg-graphite text-snow px-5 py-3 rounded-full text-[14px] font-medium hover:bg-graphite/85 transition">
              Написать Галине
              <Icon name="ArrowRight" size={13} />
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} onReviewAdded={load} />
            ))}
          </div>
        )}

        <div className="text-center mt-10 sm:mt-12">
          <Link to="/menu" className="inline-flex items-center gap-2 bg-graphite text-snow px-5 py-3 rounded-full text-[14px] font-medium hover:bg-graphite/85 transition group">
            Открыть полное меню
            <span className="w-5 h-5 rounded-full bg-lime flex items-center justify-center group-hover:rotate-45 transition">
              <Icon name="ArrowRight" size={11} className="text-graphite" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;