import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  Preorder,
  Product,
  clearToken,
  deletePreorder,
  deleteProduct,
  deleteReview,
  fetchPreorders,
  fetchProducts,
  getToken,
  login,
  saveProduct,
  setToken,
  updatePreorderStatus,
  uploadImage,
} from '@/lib/api';
import AdminLogin from '@/components/admin/AdminLogin';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminPreorders from '@/components/admin/AdminPreorders';
import AdminCatalog from '@/components/admin/AdminCatalog';

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
  const [preorders, setPreorders] = useState<Preorder[]>([]);
  const [tab, setTab] = useState<'catalog' | 'preorders'>('preorders');
  const [form, setForm] = useState({ ...emptyForm });
  const [editId, setEditId] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (getToken()) {
      setAuthed(true);
      loadProducts();
      loadPreorders();
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

  const loadPreorders = async () => {
    try {
      const list = await fetchPreorders();
      setPreorders(list);
    } catch (e) {
      console.error(e);
    }
  };

  const onChangeStatus = async (id: number, status: string) => {
    try {
      await updatePreorderStatus(id, status);
      setPreorders((arr) => arr.map((p) => (p.id === id ? { ...p, status } : p)));
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  const onDeletePreorder = async (id: number) => {
    if (!confirm('Удалить заявку?')) return;
    try {
      await deletePreorder(id);
      setPreorders((arr) => arr.filter((p) => p.id !== id));
      toast.success('Удалена');
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  const newPreordersCount = preorders.filter((p) => p.status === 'new').length;

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = await login(password);
      setToken(token);
      setAuthed(true);
      await Promise.all([loadProducts(), loadPreorders()]);
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
      <AdminLogin
        password={password}
        setPassword={setPassword}
        loading={loading}
        onLogin={onLogin}
      />
    );
  }

  return (
    <div className="min-h-screen bg-stone">
      <AdminHeader
        tab={tab}
        setTab={setTab}
        productsCount={products.length}
        newPreordersCount={newPreordersCount}
        onLogout={onLogout}
      />

      {tab === 'preorders' && (
        <AdminPreorders
          preorders={preorders}
          newPreordersCount={newPreordersCount}
          loadPreorders={loadPreorders}
          onChangeStatus={onChangeStatus}
          onDeletePreorder={onDeletePreorder}
        />
      )}

      {tab === 'catalog' && (
        <AdminCatalog
          products={products}
          form={form}
          setForm={setForm}
          editId={editId}
          loading={loading}
          uploading={uploading}
          onSave={onSave}
          onUpload={onUpload}
          removeImg={removeImg}
          resetForm={resetForm}
          startEdit={startEdit}
          onDelete={onDelete}
          onDelReview={onDelReview}
        />
      )}
    </div>
  );
};

export default AdminPage;
