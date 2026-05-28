import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import { Product, addReview, fetchProducts } from '@/lib/api';

const WHATSAPP = 'https://wa.me/79997223938';
const PHONE = 'tel:+79997223938';
const TELEGRAM = 'https://t.me/+79997223938';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(0);
  const [form, setForm] = useState({ author_name: '', text: '', rating: 5, event: '' });
  const [sending, setSending] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [all, setAll] = useState<Product[]>([]);

  const load = async () => {
    try {
      const list = await fetchProducts();
      setAll(list);
      const p = list.find((x) => String(x.id) === String(id));
      setProduct(p || null);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setActive(0);
    load();
    window.scrollTo({ top: 0 });
  }, [id]);

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    if (!form.author_name.trim() || !form.text.trim()) {
      toast.error('Заполните имя и текст отзыва');
      return;
    }
    setSending(true);
    try {
      await addReview(product.id, form);
      toast.success('Спасибо за отзыв!');
      setForm({ author_name: '', text: '', rating: 5, event: '' });
      setShowForm(false);
      await load();
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone flex items-center justify-center">
        <Icon name="Loader" size={28} className="animate-spin text-ash" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-stone flex flex-col items-center justify-center gap-4 p-6 text-center">
        <Icon name="PackageX" size={40} className="text-ash" />
        <h1 className="font-sans text-2xl tracking-tight">Товар не найден</h1>
        <Link to="/" className="text-graphite underline underline-offset-4">Вернуться на главную</Link>
      </div>
    );
  }

  const images = product.images.length ? product.images : [];
  const avgRating = product.reviews.length
    ? (product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length).toFixed(1)
    : null;

  const orderText = encodeURIComponent(`Здравствуйте, Галина! Хочу заказать «${product.name}».`);

  return (
    <div className="min-h-screen bg-stone">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-snow/95 backdrop-blur border-b border-graphite/10">
        <div className="container mx-auto py-3 sm:py-4 flex items-center justify-between gap-3">
          <Link to="/menu" className="flex items-center gap-2 text-[13px] hover:opacity-70 transition">
            <Icon name="ArrowLeft" size={16} />
            <span className="hidden sm:inline">К меню</span>
          </Link>
          <Link to="/" className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-graphite flex items-center justify-center">
              <Icon name="Package" size={14} className="text-lime" />
            </span>
            <span className="font-semibold tracking-[0.08em] text-[12px] uppercase">Furshet in Box</span>
          </Link>
          <a
            href={`${WHATSAPP}?text=${orderText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] sm:text-[13px] bg-graphite text-snow px-3 sm:px-4 py-2 rounded-full hover:bg-graphite/85 transition inline-flex items-center gap-1.5"
          >
            <Icon name="MessageCircle" size={13} />
            <span className="hidden sm:inline">Написать</span>
          </a>
        </div>
      </header>

      <main className="container mx-auto py-6 sm:py-10">
        <div className="grid lg:grid-cols-12 gap-4 sm:gap-6">
          {/* Gallery */}
          <div className="lg:col-span-7 space-y-3">
            <div className="bento-card bg-snow aspect-[4/3] sm:aspect-[16/11] relative overflow-hidden">
              {images.length ? (
                images.map((img, i) => (
                  <img
                    key={img.id || i}
                    src={img.url}
                    alt={product.name}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${active === i ? 'opacity-100' : 'opacity-0'}`}
                  />
                ))
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-ash">
                  <Icon name="Image" size={40} />
                </div>
              )}

              {product.badge && (
                <div className="absolute top-4 left-4">
                  <span className="bg-lime text-graphite text-[12px] font-semibold px-3 py-1.5 rounded-full">
                    {product.badge}
                  </span>
                </div>
              )}

              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setActive((a) => (a - 1 + images.length) % images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-snow/90 backdrop-blur shadow-lg flex items-center justify-center hover:bg-snow transition"
                    aria-label="Назад"
                  >
                    <Icon name="ChevronLeft" size={18} />
                  </button>
                  <button
                    onClick={() => setActive((a) => (a + 1) % images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-snow/90 backdrop-blur shadow-lg flex items-center justify-center hover:bg-snow transition"
                    aria-label="Вперёд"
                  >
                    <Icon name="ChevronRight" size={18} />
                  </button>
                </>
              )}
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-5 sm:grid-cols-6 gap-2">
                {images.map((img, i) => (
                  <button
                    key={img.id || i}
                    onClick={() => setActive(i)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition ${active === i ? 'border-graphite' : 'border-transparent opacity-70 hover:opacity-100'}`}
                  >
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <aside className="lg:col-span-5 space-y-4">
            <div className="bento-card bg-snow p-5 sm:p-7">
              {product.category && (
                <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-ash mb-3">
                  <span className="w-5 h-px bg-ash" />
                  {product.category}
                </div>
              )}
              <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl tracking-tightest font-medium leading-[1.05] text-balance">
                {product.name}
              </h1>

              <div className="flex items-center flex-wrap gap-x-4 gap-y-2 mt-4 text-[13px]">
                {product.portion && (
                  <span className="inline-flex items-center gap-1.5 text-ash">
                    <Icon name="Box" size={13} /> {product.portion}
                  </span>
                )}
                {avgRating && (
                  <span className="inline-flex items-center gap-1.5">
                    <Icon name="Star" size={13} className="text-lime fill-lime" />
                    <span className="font-medium">{avgRating}</span>
                    <span className="text-ash">· {product.reviews.length} отзывов</span>
                  </span>
                )}
              </div>

              {product.price > 0 && (
                <div className="mt-5 pt-5 border-t border-graphite/10">
                  <div className="text-[12px] text-ash">Стоимость от</div>
                  <div className="font-sans text-4xl sm:text-5xl tracking-tightest font-medium mt-1">
                    {product.price.toLocaleString('ru-RU')} <span className="text-2xl text-ash">₽</span>
                  </div>
                </div>
              )}

              <div className="mt-5 grid grid-cols-1 gap-2">
                <a
                  href={`${WHATSAPP}?text=${orderText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-graphite text-snow px-5 py-4 rounded-2xl text-[14px] font-medium inline-flex items-center justify-center gap-2 hover:bg-graphite/85 transition"
                >
                  <Icon name="MessageCircle" size={16} />
                  Заказать в WhatsApp
                  <span className="w-5 h-5 rounded-full bg-lime flex items-center justify-center group-hover:rotate-45 transition">
                    <Icon name="ArrowRight" size={11} className="text-graphite" />
                  </span>
                </a>
                <div className="grid grid-cols-2 gap-2">
                  <a href={PHONE} className="px-4 py-3 rounded-2xl text-[13px] font-medium border border-graphite/15 bg-snow hover:bg-graphite hover:text-snow transition inline-flex items-center justify-center gap-1.5">
                    <Icon name="Phone" size={13} /> Позвонить
                  </a>
                  <a href={TELEGRAM} target="_blank" rel="noopener noreferrer" className="px-4 py-3 rounded-2xl text-[13px] font-medium border border-graphite/15 bg-snow hover:bg-graphite hover:text-snow transition inline-flex items-center justify-center gap-1.5">
                    <Icon name="Send" size={13} /> Telegram
                  </a>
                </div>
              </div>

              <div className="mt-5 pt-5 border-t border-graphite/10 grid grid-cols-3 gap-3 text-center">
                <div>
                  <Icon name="Clock" size={16} className="mx-auto text-ash mb-1" />
                  <div className="text-[11px] text-ash leading-tight">Ответ за 15 мин</div>
                </div>
                <div>
                  <Icon name="Truck" size={16} className="mx-auto text-ash mb-1" />
                  <div className="text-[11px] text-ash leading-tight">Доставка по краю</div>
                </div>
                <div>
                  <Icon name="ShieldCheck" size={16} className="mx-auto text-ash mb-1" />
                  <div className="text-[11px] text-ash leading-tight">Договор и чеки</div>
                </div>
              </div>
            </div>
          </aside>

          {/* Description */}
          {product.description && (
            <section className="lg:col-span-7 bento-card bg-snow p-5 sm:p-7">
              <h2 className="font-sans text-2xl tracking-tightest font-medium mb-3">Описание</h2>
              <p className="text-[15px] leading-relaxed text-graphite/85 whitespace-pre-line">
                {product.description}
              </p>
            </section>
          )}

          {/* Reviews */}
          <section className="lg:col-span-12 bento-card bg-snow p-5 sm:p-7">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
              <div>
                <h2 className="font-sans text-2xl sm:text-3xl tracking-tightest font-medium">
                  Отзывы <span className="text-ash">· {product.reviews.length}</span>
                </h2>
                {avgRating && (
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={14}
                          className={i < Math.round(+avgRating) ? 'text-lime fill-lime' : 'text-graphite/15'}
                        />
                      ))}
                    </div>
                    <span className="text-[13px] text-ash">Средняя оценка {avgRating}</span>
                  </div>
                )}
              </div>
              <button
                onClick={() => setShowForm(!showForm)}
                className="bg-graphite text-snow px-4 py-2.5 rounded-full text-[13px] font-medium hover:bg-graphite/85 transition inline-flex items-center gap-2"
              >
                <Icon name={showForm ? 'X' : 'PenLine'} size={13} />
                {showForm ? 'Отменить' : 'Оставить отзыв'}
              </button>
            </div>

            {showForm && (
              <form onSubmit={submitReview} className="bg-stone rounded-2xl p-4 sm:p-5 mb-5 space-y-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Ваше имя *"
                    value={form.author_name}
                    onChange={(e) => setForm({ ...form, author_name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-snow border border-graphite/10 text-[14px] outline-none focus:border-graphite"
                  />
                  <input
                    type="text"
                    placeholder="Событие (напр. Свадьба, 50 гостей)"
                    value={form.event}
                    onChange={(e) => setForm({ ...form, event: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-snow border border-graphite/10 text-[14px] outline-none focus:border-graphite"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[13px] text-ash">Оценка:</span>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      type="button"
                      key={n}
                      onClick={() => setForm({ ...form, rating: n })}
                      className="text-2xl leading-none hover:scale-110 transition"
                    >
                      <span className={n <= form.rating ? 'text-lime' : 'text-graphite/20'}>★</span>
                    </button>
                  ))}
                </div>
                <textarea
                  required
                  rows={4}
                  placeholder="Расскажите впечатления о блюде и сервисе…"
                  value={form.text}
                  onChange={(e) => setForm({ ...form, text: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-snow border border-graphite/10 text-[14px] outline-none focus:border-graphite resize-none"
                />
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full sm:w-auto bg-graphite text-snow px-6 py-3 rounded-xl text-[14px] font-medium hover:bg-graphite/85 transition disabled:opacity-50 inline-flex items-center justify-center gap-2"
                >
                  <Icon name="Send" size={14} />
                  {sending ? 'Отправляем…' : 'Опубликовать отзыв'}
                </button>
              </form>
            )}

            {product.reviews.length === 0 ? (
              <div className="text-center py-10 text-ash">
                <Icon name="MessageSquare" size={28} className="mx-auto mb-2" />
                <p className="text-[14px]">Пока нет отзывов. Будьте первым!</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-3">
                {product.reviews.map((r) => (
                  <div key={r.id} className="bg-stone rounded-2xl p-4 sm:p-5">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-full bg-lime text-graphite flex items-center justify-center font-semibold text-[14px] shrink-0">
                          {r.author_name.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-[14px] truncate">{r.author_name}</div>
                          {r.event && <div className="text-[11px] text-ash truncate">{r.event}</div>}
                        </div>
                      </div>
                      <div className="flex shrink-0">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Icon
                            key={i}
                            name="Star"
                            size={12}
                            className={i < r.rating ? 'text-lime fill-lime' : 'text-graphite/15'}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-[14px] leading-relaxed text-graphite/85">{r.text}</p>
                    <div className="text-[11px] text-ash mt-2">
                      {new Date(r.created_at).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Related */}
          {(() => {
            const related = all.filter(
              (x) => x.id !== product.id && (product.category ? x.category === product.category : true),
            ).slice(0, 4);
            if (!related.length) return null;
            return (
              <section className="lg:col-span-12 mt-2">
                <div className="flex items-baseline justify-between gap-3 mb-5">
                  <h2 className="font-sans text-2xl sm:text-3xl tracking-tightest font-medium">
                    {product.category ? `Ещё из «${product.category}»` : 'Другие позиции'}
                  </h2>
                  <Link to="/menu" className="text-[13px] text-ash hover:text-graphite inline-flex items-center gap-1 transition">
                    Всё меню <Icon name="ArrowRight" size={13} />
                  </Link>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  {related.map((r) => (
                    <Link
                      key={r.id}
                      to={`/product/${r.id}`}
                      className="bento-card group bg-snow overflow-hidden flex flex-col"
                    >
                      <div className="aspect-square bg-stone relative overflow-hidden">
                        {r.images[0] ? (
                          <img
                            src={r.images[0].url}
                            alt={r.name}
                            loading="lazy"
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[800ms]"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-ash">
                            <Icon name="Image" size={24} />
                          </div>
                        )}
                        {r.badge && (
                          <span className="absolute top-2 left-2 bg-lime text-graphite text-[10px] font-semibold px-2 py-0.5 rounded-full">
                            {r.badge}
                          </span>
                        )}
                      </div>
                      <div className="p-3 sm:p-4 flex-1 flex flex-col">
                        <h3 className="font-sans text-[14px] sm:text-[15px] tracking-tight font-medium leading-snug group-hover:text-accent2 transition line-clamp-2">
                          {r.name}
                        </h3>
                        {r.portion && <div className="text-[11px] text-ash mt-0.5">{r.portion}</div>}
                        <div className="mt-auto pt-2 flex items-center justify-between">
                          {r.price > 0 ? (
                            <span className="text-[14px] font-semibold">{r.price} ₽</span>
                          ) : (
                            <span />
                          )}
                          <span className="w-7 h-7 rounded-full bg-stone group-hover:bg-graphite group-hover:text-snow flex items-center justify-center transition">
                            <Icon name="ArrowUpRight" size={12} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })()}
        </div>
      </main>

      {/* Sticky CTA mobile */}
      <div className="lg:hidden sticky bottom-0 z-40 bg-snow/95 backdrop-blur border-t border-graphite/10 p-3 flex gap-2">
        <a href={PHONE} className="w-12 h-12 rounded-2xl border border-graphite/15 flex items-center justify-center shrink-0">
          <Icon name="Phone" size={16} />
        </a>
        <a
          href={`${WHATSAPP}?text=${orderText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-graphite text-snow rounded-2xl text-[14px] font-medium inline-flex items-center justify-center gap-2"
        >
          <Icon name="MessageCircle" size={15} />
          Заказать
          {product.price > 0 && <span className="text-snow/70">· {product.price} ₽</span>}
        </a>
      </div>
    </div>
  );
};

export default ProductPage;