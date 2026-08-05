import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import client from '../api/client';
import ProductCard from '../components/ProductCard';
import Filters from '../components/Filters';
import Container from '../components/Container';

const DEFAULT_FILTERS = {
  search: '',
  category: '',
  brand: '',
  minPrice: '',
  maxPrice: '',
  sort: 'newest',
};

export default function Shop() {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    ...DEFAULT_FILTERS,
    category: searchParams.get('category') || '',
    search: searchParams.get('search') || '',
  });
  const [data, setData] = useState({ items: [], categories: [], brands: [], page: 1, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setFilters((f) => ({
      ...f,
      category: searchParams.get('category') || '',
      search: searchParams.get('search') || '',
    }));
    setPage(1);
  }, [searchParams]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = { ...filters, page };
      Object.keys(params).forEach((k) => !params[k] && delete params[k]);
      const res = await client.get('/products', { params });
      setData(res.data);
    } finally {
      setLoading(false);
    }
  }, [filters, page]);

  useEffect(() => {
    const timeout = setTimeout(fetchProducts, 300);
    return () => clearTimeout(timeout);
  }, [fetchProducts]);

  useEffect(() => setPage(1), [filters]);

  return (
    <Container className="py-10">
      <div className="mb-8">
        <p className="text-signal text-sm uppercase tracking-widest mb-2">Full catalogue</p>
        <h1 className="font-display font-700 text-3xl sm:text-4xl">Shop all gear</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        <Filters
          filters={filters}
          onChange={setFilters}
          categories={data.categories}
          brands={data.brands}
        />

        <div>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-square rounded-2xl bg-panel animate-pulse" />
              ))}
            </div>
          ) : data.items.length === 0 ? (
            <div className="text-mute py-20 text-center border border-dashed border-line rounded-2xl">
              No gear matches those filters. Try widening your search.
            </div>
          ) : (
            <>
              <p className="text-sm text-mute mb-4">{data.total} products</p>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                {data.items.map((p) => (
                  <ProductCard key={p._id} product={p} />
                ))}
              </div>

              {data.pages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  {Array.from({ length: data.pages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`w-8 h-8 rounded-full text-sm border transition-colors ${
                        page === i + 1
                          ? 'bg-signal text-ink border-signal'
                          : 'border-line text-mute hover:border-signal hover:text-signal'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Container>
  );
}
