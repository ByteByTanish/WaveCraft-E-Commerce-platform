import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatINR } from '../lib/format';

export default function Cart() {
  const { cart, subtotal, updateItem, removeItem, clearCart } = useCart();

  if (cart.items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-24 text-center">
        <h1 className="font-display font-700 text-2xl mb-3">Your cart is quiet</h1>
        <p className="text-mute mb-6">Your cart is empty. Let's find your perfect sound.</p>
        <Link to="/" className="text-accent hover:underline">
          Browse the shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display font-700 text-2xl">Your cart</h1>
        <button onClick={clearCart} className="text-sm text-mute hover:text-amber transition-colors">
          Clear cart
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {cart.items.map(({ product, quantity }) => (
          <div
            key={product._id}
            className="flex items-center gap-4 rounded-2xl border border-line bg-panel p-4"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-mute uppercase tracking-wide">{product.brand}</p>
              <h3 className="font-display font-600 truncate">{product.name}</h3>
              <p className="text-signal font-semibold mt-1">{formatINR(product.price)}</p>
            </div>

            <div className="flex items-center border border-line rounded-full">
              <button
                onClick={() => updateItem(product._id, quantity - 1)}
                className="w-8 h-8 text-mute hover:text-signal"
              >
                −
              </button>
              <span className="w-8 text-center">{quantity}</span>
              <button
                onClick={() => updateItem(product._id, quantity + 1)}
                className="w-8 h-8 text-mute hover:text-signal"
              >
                +
              </button>
            </div>

            <button
              onClick={() => removeItem(product._id)}
              className="text-mute hover:text-amber text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-line pt-6">
        <span className="text-mute">Subtotal</span>
        <span className="font-display font-700 text-2xl">{formatINR(subtotal)}</span>
      </div>

      <button className="mt-6 w-full rounded-full bg-signal text-ink font-semibold py-3 hover:opacity-90 transition-opacity">
        Checkout
      </button>
    </div>
  );
}
