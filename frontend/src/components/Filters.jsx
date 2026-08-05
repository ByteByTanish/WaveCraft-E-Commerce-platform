const CATEGORY_LABELS = {
  headphones: 'Headphones',
  speakers: 'Speakers',
  earbuds: 'Earbuds',
  'wired-earphones': 'Wired Earphones',
  turntables: 'Turntables',
  accessories: 'Accessories',
};

export default function Filters({ filters, onChange, categories, brands }) {
  const update = (key, value) => onChange({ ...filters, [key]: value });

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-line bg-panel p-5">
      <div>
        <label className="text-xs uppercase tracking-wide text-mute">Search</label>
        <input
          value={filters.search}
          onChange={(e) => update('search', e.target.value)}
          placeholder="Find gear..."
          className="mt-1 w-full rounded-lg bg-ink border border-line px-3 py-2 text-sm focus:border-accent outline-none"
        />
      </div>

      <div>
        <label className="text-xs uppercase tracking-wide text-mute">Category</label>
        <select
          value={filters.category}
          onChange={(e) => update('category', e.target.value)}
          className="mt-1 w-full rounded-lg bg-ink border border-line px-3 py-2 text-sm focus:border-accent outline-none"
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {CATEGORY_LABELS[c] || c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs uppercase tracking-wide text-mute">Brand</label>
        <select
          value={filters.brand}
          onChange={(e) => update('brand', e.target.value)}
          className="mt-1 w-full rounded-lg bg-ink border border-line px-3 py-2 text-sm focus:border-accent outline-none"
        >
          <option value="">All brands</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs uppercase tracking-wide text-mute">Min ₹</label>
          <input
            type="number"
            min="0"
            value={filters.minPrice}
            onChange={(e) => update('minPrice', e.target.value)}
            className="mt-1 w-full rounded-lg bg-ink border border-line px-3 py-2 text-sm focus:border-accent outline-none"
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-wide text-mute">Max ₹</label>
          <input
            type="number"
            min="0"
            value={filters.maxPrice}
            onChange={(e) => update('maxPrice', e.target.value)}
            className="mt-1 w-full rounded-lg bg-ink border border-line px-3 py-2 text-sm focus:border-accent outline-none"
          />
        </div>
      </div>

      <div>
        <label className="text-xs uppercase tracking-wide text-mute">Sort by</label>
        <select
          value={filters.sort}
          onChange={(e) => update('sort', e.target.value)}
          className="mt-1 w-full rounded-lg bg-ink border border-line px-3 py-2 text-sm focus:border-accent outline-none"
        >
          <option value="newest">Newest</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="rating">Top rated</option>
        </select>
      </div>

      <button
        onClick={() =>
          onChange({ search: '', category: '', brand: '', minPrice: '', maxPrice: '', sort: 'newest' })
        }
        className="text-sm text-mute hover:text-accent transition-colors text-left"
      >
        Clear all filters
      </button>
    </div>
  );
}
