import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import {
  Product,
  clearToken,
  deleteProduct,
  deleteReview,
  fetchProducts,
  getToken,
  login,
  saveProduct,
  setToken,
  uploadImage,
} from '@/lib/api';

const emptyForm = {
  id: 0,
  name: '',
  description: '',
  price: 0,
  category: '',
  portion: '',
  badge: '',
  sort_order: 0,
  images: [] as string[],
};

const AdminPage = () => {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({ ...emptyForm });
  const [editId, setEditId] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (getToken()) {
      setAuthed(true);
      loadProducts();
    }
  }, []);

  const loadProducts = async () => {
    try {
      const list = await fetchProducts();
      setProducts(list);
    } catch (e) {
      toast.error('Не удалось загрузить товары');
    }
  };

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = await login(password);
      setToken(token);
      setAuthed(true);
      await loadProducts();
      toast.success('Добро пожаловать!');
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const onLogout = () => {
    clearToken();
    setAuthed(false);
    setPassword('');
  };

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    try {
      const urls: string[] = [];
      for (const f of files) {
        const url = await uploadImage(f);
        urls.push(url);
      }
      setForm((f) => ({ ...f, images: [...f.images, ...urls] }));
      toast.success(`Загружено: ${urls.length}`);
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const removeImg = (url: string) =>
    setForm((f) => ({ ...f, images: f.images.filter((u) => u !== url) }));

  const startEdit = (p: Product) => {
    setEditId(p.id);
    setForm({
      id: p.id,
      name: p.name,
      description: p.description || '',
      price: p.price || 0,
      category: p.category || '',
      portion: p.portion || '',
      badge: p.badge || '',
      sort_order: p.sort_order || 0,
      images: p.images.map((i) => i.url),
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditId(null);
    setForm({ ...emptyForm });
  };

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error('Укажите название');
      return;
    }
    setLoading(true);
    try {
      await saveProduct(form, editId ?? undefined);
      toast.success(editId ? 'Товар обновлён' : 'Товар добавлен');
      resetForm();
      await loadProducts();
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (id: number) => {
    if (!confirm('Скрыть этот товар из каталога?')) return;
    try {
      await deleteProduct(id);
      toast.success('Скрыт');
      await loadProducts();
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  const onDelReview = async (id: number) => {
    if (!confirm('Удалить отзыв?')) return;
    try {
      await deleteReview(id);
      toast.success('Удалён');
      await loadProducts();
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone p-6">
        <form onSubmit={onLogin} className="w-full max-w-sm bento-card p-8 bg-snow">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-ash mb-4">
            <span className="w-6 h-px bg-ash" /> Админка
          </div>
          <h1 className="font-sans text-3xl tracking-tightest font-medium mb-6">Вход</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
            className="w-full px-4 py-3.5 rounded-2xl bg-stone border border-graphite/10 focus:border-graphite outline-none text-[14px]"
            autoFocus
          />
          <button
            type="submit"
            disabled={loading}
            className="mt-3 w-full bg-graphite text-snow py-3.5 rounded-2xl text-[14px] font-medium hover:bg-graphite/85 transition disabled:opacity-50"
          >
            {loading ? 'Вход…' : 'Войти'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone">
      <header className="sticky top-0 z-40 bg-snow/95 backdrop-blur border-b border-graphite/10">
        <div className="container mx-auto py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-graphite flex items-center justify-center">
              <Icon name="Package" size={16} className="text-lime" />
            </div>
            <div>
              <div className="font-sans text-lg tracking-tight font-medium">Каталог</div>
              <div className="text-[11px] text-ash">{products.length} позиций</div>
            </div>
          </div>
          <div className="flex gap-2">
            <a href="/" className="px-4 py-2 rounded-full text-[13px] border border-graphite/15 hover:bg-graphite/5 transition inline-flex items-center gap-1.5">
              <Icon name="ExternalLink" size={13} /> Сайт
            </a>
            <button onClick={onLogout} className="px-4 py-2 rounded-full text-[13px] border border-graphite/15 hover:bg-graphite/5 transition inline-flex items-center gap-1.5">
              <Icon name="LogOut" size={13} /> Выйти
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 grid lg:grid-cols-5 gap-6">
        {/* Form */}
        <form onSubmit={onSave} className="lg:col-span-2 bento-card bg-snow p-6 lg:sticky lg:top-24 lg:self-start space-y-3">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-sans text-2xl tracking-tightest font-medium">
              {editId ? 'Редактирование' : 'Новый товар'}
            </h2>
            {editId && (
              <button type="button" onClick={resetForm} className="text-[12px] text-ash hover:text-graphite">
                Отменить
              </button>
            )}
          </div>

          {/* Images */}
          <div>
            <label className="text-[12px] text-ash mb-2 block">Фото товара</label>
            <div className="grid grid-cols-4 gap-2 mb-2">
              {form.images.map((url) => (
                <div key={url} className="relative aspect-square rounded-xl overflow-hidden bg-stone group">
                  <img src={url} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImg(url)}
                    className="absolute top-1 right-1 w-6 h-6 rounded-full bg-graphite/80 text-snow opacity-0 group-hover:opacity-100 transition flex items-center justify-center"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </div>
              ))}
              <label className="aspect-square rounded-xl border-2 border-dashed border-graphite/20 hover:border-graphite/40 cursor-pointer flex flex-col items-center justify-center text-ash text-[11px] gap-1 transition">
                <Icon name={uploading ? 'Loader' : 'Plus'} size={18} className={uploading ? 'animate-spin' : ''} />
                {uploading ? '...' : 'Фото'}
                <input type="file" accept="image/*" multiple className="hidden" onChange={onUpload} />
              </label>
            </div>
          </div>

          <Field label="Название">
            <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} />
          </Field>

          <Field label="Описание">
            <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={inputCls} />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Цена, ₽">
              <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: +e.target.value })} className={inputCls} />
            </Field>
            <Field label="Порция (напр. 36 шт)">
              <input type="text" value={form.portion} onChange={(e) => setForm({ ...form, portion: e.target.value })} className={inputCls} />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Категория">
              <input type="text" placeholder="Канапе" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputCls} />
            </Field>
            <Field label="Бейдж">
              <input type="text" placeholder="Хит" value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} className={inputCls} />
            </Field>
          </div>

          <Field label="Порядок (меньше — выше)">
            <input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: +e.target.value })} className={inputCls} />
          </Field>

          <button type="submit" disabled={loading} className="w-full bg-graphite text-snow py-3.5 rounded-2xl text-[14px] font-medium hover:bg-graphite/85 transition disabled:opacity-50 inline-flex items-center justify-center gap-2">
            <Icon name={editId ? 'Save' : 'Plus'} size={15} />
            {loading ? 'Сохраняем…' : editId ? 'Сохранить' : 'Добавить товар'}
          </button>
        </form>

        {/* List */}
        <div className="lg:col-span-3 space-y-3">
          {products.length === 0 && (
            <div className="bento-card bg-snow p-10 text-center text-ash">
              Каталог пуст. Добавьте первый товар через форму слева.
            </div>
          )}
          {products.map((p) => (
            <article key={p.id} className="bento-card bg-snow p-5">
              <div className="flex gap-4">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-stone shrink-0 relative">
                  {p.images[0] ? (
                    <img src={p.images[0].url} alt={p.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-ash">
                      <Icon name="Image" size={20} />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="font-sans text-lg tracking-tight font-medium truncate">{p.name}</h3>
                      <div className="text-[12px] text-ash mt-0.5 flex flex-wrap gap-x-2 gap-y-0.5">
                        {p.category && <span>{p.category}</span>}
                        {p.portion && <span>· {p.portion}</span>}
                        {p.badge && <span className="text-accent2">· {p.badge}</span>}
                      </div>
                      {p.description && (
                        <p className="text-[13px] text-graphite/70 mt-1.5 line-clamp-2">{p.description}</p>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      {p.price > 0 && <div className="font-semibold">{p.price} ₽</div>}
                      <div className="flex gap-1 mt-2">
                        <button onClick={() => startEdit(p)} className="w-8 h-8 rounded-full bg-stone hover:bg-graphite hover:text-snow transition flex items-center justify-center">
                          <Icon name="Pencil" size={13} />
                        </button>
                        <button onClick={() => onDelete(p.id)} className="w-8 h-8 rounded-full bg-stone hover:bg-red-500 hover:text-snow transition flex items-center justify-center">
                          <Icon name="Trash2" size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {p.reviews.length > 0 && (
                <div className="mt-4 pt-4 border-t border-graphite/10">
                  <div className="text-[11px] uppercase tracking-wider text-ash mb-2">
                    Отзывы · {p.reviews.length}
                  </div>
                  <div className="space-y-2">
                    {p.reviews.map((r) => (
                      <div key={r.id} className="bg-stone rounded-xl p-3 text-[13px] flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="font-medium">
                            {r.author_name}{' '}
                            <span className="text-ash font-normal">
                              · {'★'.repeat(r.rating)}
                              {r.event ? ` · ${r.event}` : ''}
                            </span>
                          </div>
                          <p className="text-graphite/80 mt-0.5">{r.text}</p>
                        </div>
                        <button onClick={() => onDelReview(r.id)} className="w-7 h-7 rounded-full hover:bg-red-500/10 text-red-500 transition flex items-center justify-center shrink-0">
                          <Icon name="X" size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </main>
    </div>
  );
};

const inputCls = 'w-full px-3 py-2.5 rounded-xl bg-stone border border-graphite/10 focus:border-graphite outline-none text-[14px] transition';

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="text-[12px] text-ash mb-1 block">{label}</label>
    {children}
  </div>
);

export default AdminPage;