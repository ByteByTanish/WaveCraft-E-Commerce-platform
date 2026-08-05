import { useEffect, useState } from 'react';
import client from '../api/client';
import { formatINR } from '../lib/format';

const CATEGORIES = ['headphones', 'speakers', 'earbuds', 'wired-earphones', 'turntables', 'accessories'];

const EMPTY_FORM = {
  name: '',
  brand: '',
  category: 'headphones',
  price: '',
  stock: '',
  image: '',
  description: '',
  rating: '4.5',
  featured: false,
};

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await client.get('/admin/products');
      setProducts(res.data.products);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const startEdit = (product) => {
    setEditingId(product._id);
    setForm({
      name: product.name,
      brand: product.brand,
      category: product.category,
      price: product.price,
      stock: product.stock,
      image: product.image,
      description: product.description,
      rating: product.rating,
      featured: product.featured,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        rating: Number(form.rating),
      };
      if (editingId) {
        await client.put(`/admin/products/${editingId}`, payload);
      } else {
        await client.post('/admin/products', payload);
      }
      resetForm();
      fetchProducts();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not save product');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this product from the catalogue?')) return;
    await client.delete(`/admin/products/${id}`);
    if (editingId === id) resetForm();
    fetchProducts();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-display font-700 text-2xl mb-1">Product admin</h1>
      <p className="text-mute mb-8">Add new gear or tend to what's already on the shelf.</p>

      <form
        onSubmit={handleSubmit}
        className="grid sm:grid-cols-2 gap-4 rounded-2xl border border-line bg-panel p-6 mb-10"
      >
        <div className="sm:col-span-2">
          <h2 className="font-display font-600 mb-1">{editingId ? 'Edit product' : 'Add a product'}</h2>
        </div>

        <div>
          <label className="text-xs uppercase tracking-wide text-mute">Name</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="mt-1 w-full rounded-lg bg-ink border border-line px-3 py-2 text-sm focus:border-accent outline-none"
          />
        </div>

        <div>
          <label className="text-xs uppercase tracking-wide text-mute">Brand</label>
          <input
            required
            value={form.brand}
            onChange={(e) => setForm({ ...form, brand: e.target.value })}
            className="mt-1 w-full rounded-lg bg-ink border border-line px-3 py-2 text-sm focus:border-accent outline-none"
          />
        </div>

        <div>
          <label className="text-xs uppercase tracking-wide text-mute">Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="mt-1 w-full rounded-lg bg-ink border border-line px-3 py-2 text-sm focus:border-accent outline-none"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs uppercase tracking-wide text-mute">Image URL</label>
          <input
            required
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="mt-1 w-full rounded-lg bg-ink border border-line px-3 py-2 text-sm focus:border-accent outline-none"
          />
        </div>

        <div>
          <label className="text-xs uppercase tracking-wide text-mute">Price (₹)</label>
          <input
            type="number"
            min="0"
            required
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="mt-1 w-full rounded-lg bg-ink border border-line px-3 py-2 text-sm focus:border-accent outline-none"
          />
        </div>

        <div>
          <label className="text-xs uppercase tracking-wide text-mute">Stock</label>
          <input
            type="number"
            min="0"
            required
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
            className="mt-1 w-full rounded-lg bg-ink border border-line px-3 py-2 text-sm focus:border-accent outline-none"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="text-xs uppercase tracking-wide text-mute">Description</label>
          <textarea
            required
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="mt-1 w-full rounded-lg bg-ink border border-line px-3 py-2 text-sm focus:border-accent outline-none resize-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            id="featured"
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            className="accent-signal"
          />
          <label htmlFor="featured" className="text-sm text-mute">
            Featured
          </label>
        </div>

        {error && <p className="sm:col-span-2 text-amber text-sm">{error}</p>}

        <div className="sm:col-span-2 flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-signal text-ink font-semibold px-6 py-2.5 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {saving ? 'Saving...' : editingId ? 'Save changes' : 'Add product'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="text-sm text-mute hover:text-accent transition-colors"
            >
              Cancel edit
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <p className="text-mute">Loading catalogue...</p>
      ) : (
        <div className="rounded-2xl border border-line bg-panel overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-mute border-b border-line">
                <th className="p-3">Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price</th>
                <th className="p-3">Stock</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="border-b border-line last:border-0">
                  <td className="p-3">
                    <p className="font-display font-600">{p.name}</p>
                    <p className="text-xs text-mute">{p.brand}</p>
                  </td>
                  <td className="p-3 text-mute capitalize">{p.category.replace('-', ' ')}</td>
                  <td className="p-3">{formatINR(p.price)}</td>
                  <td className="p-3">{p.stock}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => startEdit(p)}
                      className="text-accent hover:underline mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="text-amber hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
