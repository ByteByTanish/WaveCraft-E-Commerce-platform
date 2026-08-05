import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import client from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { formatINR } from '../lib/format';
import ProductImage from '../components/ProductImage';

export default function ProductDetails() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState('');
  const { user } = useAuth();
  const { addItem } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    client.get(`/products/${slug}`).then((res) => setProduct(res.data.product));
  }, [slug]);

  if (!product) {
    return <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-20 text-mute">Loading...</div>;
  }

  const hasDeal = product.originalPrice && product.originalPrice > product.price;

  const handleAdd = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    await addItem(product._id, quantity);
    setStatus('Added to cart');
    setTimeout(() => setStatus(''), 2000);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-10 grid md:grid-cols-2 gap-10">
      <div className="rounded-2xl overflow-hidden bg-panel border border-line aspect-square">
        <ProductImage src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>

      <div className="flex flex-col gap-4">
        <span className="text-xs uppercase tracking-wide text-mute">{product.brand}</span>
        <h1 className="font-display font-700 text-3xl">{product.name}</h1>
        <p className="text-mute leading-relaxed">{product.description}</p>

        <div className="flex items-center gap-4 mt-2 flex-wrap">
          <span className="flex items-baseline gap-2">
            <span className="text-signal text-2xl font-semibold">{formatINR(product.price)}</span>
            {hasDeal && (
              <span className="text-sm text-mute line-through">{formatINR(product.originalPrice)}</span>
            )}
          </span>
          <span className="text-sm text-mute">★ {product.rating.toFixed(1)}</span>
          <span className="text-sm text-mute">{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</span>
        </div>

        {product.specs && Object.keys(product.specs).length > 0 && (
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-2 border-t border-line pt-4">
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key} className="text-sm">
                <span className="text-mute">{key}</span>
                <p className="text-paper">{value}</p>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3 mt-4">
          <div className="flex items-center border border-line rounded-full">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-9 h-9 text-mute hover:text-signal"
            >
              −
            </button>
            <span className="w-8 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-9 h-9 text-mute hover:text-signal"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAdd}
            disabled={product.stock === 0}
            className="flex-1 rounded-full bg-signal text-ink font-semibold py-2.5 hover:opacity-90 transition-opacity disabled:opacity-40"
          >
            Add to cart
          </button>
        </div>

        {status && <p className="text-signal text-sm">{status}</p>}
      </div>
    </div>
  );
}
