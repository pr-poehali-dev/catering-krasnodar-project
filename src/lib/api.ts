import funcUrls from '../../backend/func2url.json';

export const API = {
  auth: funcUrls.auth,
  products: funcUrls.products,
  upload: funcUrls.upload,
  preorders: funcUrls.preorders,
};

const TOKEN_KEY = 'admin_token';

export const getToken = () => localStorage.getItem(TOKEN_KEY) || '';
export const setToken = (t: string) => localStorage.setItem(TOKEN_KEY, t);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

export type ProductImage = { id: number; url: string; sort_order: number };
export type ProductReview = {
  id: number;
  author_name: string;
  rating: number;
  text: string;
  event: string | null;
  created_at: string;
};
export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  portion: string;
  badge: string;
  sort_order: number;
  is_active: boolean;
  images: ProductImage[];
  reviews: ProductReview[];
};

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch(API.products);
  const data = await res.json();
  return data.products || [];
};

export const login = async (password: string): Promise<string> => {
  const res = await fetch(API.auth, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Ошибка входа');
  return data.token;
};

export const uploadImage = async (file: File): Promise<string> => {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
  const res = await fetch(API.upload, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Auth-Token': getToken() },
    body: JSON.stringify({ file: dataUrl, filename: file.name }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Ошибка загрузки');
  return data.url;
};

export const saveProduct = async (
  payload: Partial<Product> & { images: string[] },
  id?: number,
) => {
  const url = id ? `${API.products}?id=${id}` : API.products;
  const res = await fetch(url, {
    method: id ? 'PUT' : 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Auth-Token': getToken() },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Ошибка сохранения');
  return data;
};

export const deleteProduct = async (id: number) => {
  const res = await fetch(`${API.products}?id=${id}`, {
    method: 'DELETE',
    headers: { 'X-Auth-Token': getToken() },
  });
  if (!res.ok) throw new Error('Ошибка удаления');
  return res.json();
};

export const addReview = async (
  productId: number,
  review: { author_name: string; rating: number; text: string; event?: string },
) => {
  const res = await fetch(`${API.products}?action=review&product_id=${productId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Ошибка');
  return data;
};

export const deleteReview = async (id: number) => {
  const res = await fetch(`${API.products}?action=review&id=${id}`, {
    method: 'DELETE',
    headers: { 'X-Auth-Token': getToken() },
  });
  if (!res.ok) throw new Error('Ошибка');
  return res.json();
};

export type Preorder = {
  id: number;
  name: string;
  phone: string;
  event_type: string | null;
  event_date: string | null;
  guests_count: number | null;
  budget: string | null;
  details: string | null;
  status: string;
  created_at: string;
};

export type PreorderPayload = {
  name: string;
  phone: string;
  event_type?: string;
  event_date?: string;
  guests_count?: number | string;
  budget?: string;
  details?: string;
};

export const createPreorder = async (payload: PreorderPayload) => {
  const res = await fetch(API.preorders, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Не удалось отправить заявку');
  return data;
};

export const fetchPreorders = async (): Promise<Preorder[]> => {
  const res = await fetch(API.preorders, {
    headers: { 'X-Auth-Token': getToken() },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Ошибка загрузки');
  return data.preorders || [];
};

export const updatePreorderStatus = async (id: number, status: string) => {
  const res = await fetch(API.preorders, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', 'X-Auth-Token': getToken() },
    body: JSON.stringify({ id, status }),
  });
  if (!res.ok) throw new Error('Ошибка');
  return res.json();
};

export const deletePreorder = async (id: number) => {
  const res = await fetch(`${API.preorders}?id=${id}`, {
    method: 'DELETE',
    headers: { 'X-Auth-Token': getToken() },
  });
  if (!res.ok) throw new Error('Ошибка');
  return res.json();
};