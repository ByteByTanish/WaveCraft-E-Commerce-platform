import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import client from '../api/client';
import Container from '../components/Container';
import TrustBadges from '../components/TrustBadges';
import CategoryGrid from '../components/CategoryGrid';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    client.get('/products', { params: { limit: 48, sort: 'newest' } }).then((res) => {
      setProducts(res.data.items);
    });
  }, []);

  const deals = products.filter((p) => p.originalPrice && p.originalPrice > p.price).slice(0, 4);
  const featured = products.filter((p) => p.featured).slice(0, 8);

  return (
    <div>
      <section className="hero-section relative overflow-hidden border-b border-line">
        <div className="absolute inset-0 bg-gradient-to-br from-signal/10 via-transparent to-accent/10 pointer-events-none" />
        <Container className="relative py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-signal text-sm uppercase tracking-widest mb-4">Sound, naturally</p>
            <h1 className="font-display font-700 text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mb-6">
              Audio gear that connects you to <span className="text-signal">nature</span>.
            </h1>
            <p className="text-mute text-lg leading-relaxed mb-8 max-w-lg">
              Headphones, earbuds, speakers, and turntables — chosen for how they sound,
              not just how they look. 30+ pieces, considered from first listen to last.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Link
                to="/shop"
                className="rounded-full bg-signal text-ink font-semibold px-7 py-3.5 hover:opacity-90 transition-opacity"
              >
                Shop now
              </Link>
              <Link
                to="/categories"
                className="flex items-center gap-2 text-signal font-medium hover:gap-3 transition-all"
              >
                Explore categories <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 bg-signal/10 rounded-full blur-3xl" />
            <div className="relative aspect-square rounded-3xl overflow-hidden border border-line bg-panel">
              <img
                src="https://plus.unsplash.com/premium_photo-1677838847804-4054143fb91a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Over-ear headphones"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-10">
        <TrustBadges />
      </Container>

      <Container className="py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-700 text-2xl sm:text-3xl">Shop by category</h2>
          <Link to="/categories" className="text-sm text-signal hover:underline hidden sm:block">
            View all categories
          </Link>
        </div>
        <CategoryGrid />
      </Container>

      {deals.length > 0 && (
        <Container className="py-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-700 text-2xl sm:text-3xl">Best deals</h2>
            <Link to="/shop" className="text-sm text-signal hover:underline hidden sm:block">
              View all deals
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {deals.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </Container>
      )}

      {featured.length > 0 && (
        <Container className="py-10 pb-20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-700 text-2xl sm:text-3xl">Featured picks</h2>
            <Link to="/shop" className="text-sm text-signal hover:underline hidden sm:block">
              Browse the shop
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {featured.slice(0, 4).map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </Container>
      )}
    </div>
  );
}
