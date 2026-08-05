import { Truck, ShieldCheck, RotateCcw, Headset } from 'lucide-react';

const BADGES = [
  { icon: Truck, title: 'Free Shipping', subtitle: 'On all orders' },
  { icon: ShieldCheck, title: 'Secure Payment', subtitle: '100% protected' },
  { icon: RotateCcw, title: 'Easy Returns', subtitle: '7 day window' },
  { icon: Headset, title: '24/7 Support', subtitle: "We're here to help" },
];

export default function TrustBadges({ className = '' }) {
  return (
    <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 ${className}`}>
      {BADGES.map(({ icon: Icon, title, subtitle }) => (
        <div key={title} className="flex items-center gap-3 rounded-2xl border border-line bg-panel px-4 py-4">
          <Icon className="w-6 h-6 text-signal flex-shrink-0" strokeWidth={1.8} />
          <div>
            <p className="text-sm font-display font-600">{title}</p>
            <p className="text-xs text-mute">{subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
