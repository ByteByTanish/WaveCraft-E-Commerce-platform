import { Link } from 'react-router-dom';
import { formatINR } from '../lib/format';

export default function ProductCard({ product }) {
  const hasDeal = product.originalPrice && product.originalPrice > product.price;
  const discountPct = hasDeal
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link
      to={`/products/${product.slug}`}
      className="group flex flex-col rounded-2xl border border-line bg-panel overflow-hidden hover:border-signal/60 hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative aspect-square overflow-hidden bg-line">
        {hasDeal && (
          <span className="absolute top-3 left-3 z-10 rounded-full bg-signal text-ink text-xs font-semibold px-2.5 py-1">
            {discountPct}% OFF
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="p-4 flex flex-col gap-1 flex-1">
        <span className="text-xs uppercase tracking-wide text-mute">{product.brand}</span>
        <h3 className="font-display font-600 text-paper leading-snug">{product.name}</h3>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="flex items-baseline gap-2">
            <span className="text-signal font-semibold">{formatINR(product.price)}</span>
            {hasDeal && (
              <span className="text-xs text-mute line-through">{formatINR(product.originalPrice)}</span>
            )}
          </span>
          <span className="text-xs text-mute">★ {product.rating.toFixed(1)}</span>
        </div>
      </div>
    </Link>
  );
}
