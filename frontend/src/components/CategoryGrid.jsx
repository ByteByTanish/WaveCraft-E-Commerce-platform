import { Link } from 'react-router-dom';
import { Headphones, Music2, Cable, Volume2, Disc3, Package } from 'lucide-react';

export const CATEGORY_META = [
  { value: 'headphones', label: 'Headphones', icon: Headphones },
  { value: 'earbuds', label: 'Earbuds', icon: Music2 },
  { value: 'wired-earphones', label: 'Wired Earphones', icon: Cable },
  { value: 'speakers', label: 'Speakers', icon: Volume2 },
  { value: 'turntables', label: 'Turntables', icon: Disc3 },
  { value: 'accessories', label: 'Accessories', icon: Package },
];

export default function CategoryGrid({ className = '' }) {
  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 ${className}`}>
      {CATEGORY_META.map(({ value, label, icon: Icon }) => (
        <Link
          key={value}
          to={`/shop?category=${value}`}
          className="group flex flex-col items-center gap-3 rounded-2xl border border-line bg-panel p-6 hover:border-signal/60 hover:-translate-y-1 transition-all duration-300"
        >
          <span className="w-14 h-14 rounded-full bg-signal/12 flex items-center justify-center group-hover:bg-signal/20 transition-colors">
            <Icon className="w-6 h-6 text-signal" strokeWidth={1.8} />
          </span>
          <span className="text-sm font-display font-600 text-center">{label}</span>
        </Link>
      ))}
    </div>
  );
}
