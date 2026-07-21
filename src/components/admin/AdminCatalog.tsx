import Icon from '@/components/ui/icon';
import { Product } from '@/lib/api';

type FormState = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  portion: string;
  badge: string;
  sort_order: number;
  images: string[];
};

type Props = {
  products: Product[];
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  editId: number | null;
  loading: boolean;
  uploading: boolean;
  onSave: (e: React.FormEvent) => void;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeImg: (url: string) => void;
  resetForm: () => void;
  startEdit: (p: Product) => void;
  onDelete: (id: number) => void;
  onDelReview: (id: number) => void;
};

const inputCls = 'w-full px-3 py-2.5 rounded-xl bg-stone border border-graphite/10 focus:border-graphite outline-none text-[14px] transition';

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="text-[12px] text-ash mb-1 block">{label}</label>
    {children}
  </div>
);

const AdminCatalog = ({
  products,
  form,
  setForm,
  editId,
  loading,
  uploading,
  onSave,
  onUpload,
  removeImg,
  resetForm,
  startEdit,
  onDelete,
  onDelReview,
}: Props) => {
  return (
    <main className="container mx-auto py-5 sm:py-8 grid lg:grid-cols-5 gap-4 sm:gap-6">
      {/* Form */}
      <form onSubmit={onSave} className="lg:col-span-2 bento-card bg-snow p-4 sm:p-6 lg:sticky lg:top-24 lg:self-start space-y-3">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-sans text-xl sm:text-2xl tracking-tightest font-medium">
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
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-2">
            {form.images.map((url) => (
              <div key={url} className="relative aspect-square rounded-xl overflow-hidden bg-stone group">
                <img src={url} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImg(url)}
                  className="absolute top-1 right-1 w-6 h-6 rounded-full bg-graphite/80 text-snow opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition flex items-center justify-center"
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

        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
          <Field label="Цена, ₽">
            <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: +e.target.value })} className={inputCls} />
          </Field>
          <Field label="Порция (напр. 36 шт)">
            <input type="text" value={form.portion} onChange={(e) => setForm({ ...form, portion: e.target.value })} className={inputCls} />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
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
          <article key={p.id} className="bento-card bg-snow p-4 sm:p-5">
            <div className="flex gap-3 sm:gap-4">
              <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-stone shrink-0 relative">
                {p.images[0] ? (
                  <img src={p.images[0].url} alt={p.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-ash">
                    <Icon name="Image" size={20} />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-sans text-base sm:text-lg tracking-tight font-medium truncate">{p.name}</h3>
                    <div className="text-[12px] text-ash mt-0.5 flex flex-wrap gap-x-2 gap-y-0.5">
                      {p.category && <span>{p.category}</span>}
                      {p.portion && <span>· {p.portion}</span>}
                      {p.badge && <span className="text-accent2">· {p.badge}</span>}
                    </div>
                    {p.description && (
                      <p className="text-[13px] text-graphite/70 mt-1.5 line-clamp-2">{p.description}</p>
                    )}
                  </div>
                  <div className="flex items-center justify-between sm:flex-col sm:items-end shrink-0 gap-2">
                    {p.price > 0 && <div className="font-semibold text-[14px] sm:text-base">{p.price} ₽</div>}
                    <div className="flex gap-1.5 sm:mt-2">
                      <button onClick={() => startEdit(p)} className="w-9 h-9 sm:w-8 sm:h-8 rounded-full bg-stone hover:bg-graphite hover:text-snow transition flex items-center justify-center">
                        <Icon name="Pencil" size={13} />
                      </button>
                      <button onClick={() => onDelete(p.id)} className="w-9 h-9 sm:w-8 sm:h-8 rounded-full bg-stone hover:bg-red-500 hover:text-snow transition flex items-center justify-center">
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
                      <button onClick={() => onDelReview(r.id)} className="w-8 h-8 sm:w-7 sm:h-7 rounded-full hover:bg-red-500/10 text-red-500 transition flex items-center justify-center shrink-0">
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
  );
};

export default AdminCatalog;