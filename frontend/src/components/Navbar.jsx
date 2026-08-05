import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Search, Sun, Moon, ShoppingCart } from 'lucide-react';

import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

import Logo from './Logo';
import Container from './Container';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/categories', label: 'Categories' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(search.trim() ? `/shop?search=${encodeURIComponent(search.trim())}` : '/shop');
    setSearch('');
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-ink/95 backdrop-blur border-b border-line">
    
      <Container className="flex items-center justify-between h-[88px] gap-6">
        <Link
  to="/"
  className="group flex items-center gap-5 flex-shrink-0 select-none"
>
  <div
    className="
      flex items-center justify-center
      w-[58px]
      h-[58px]
      rounded-2xl
      transition-all
      duration-300
      group-hover:scale-105
      group-hover:shadow-[0_0_30px_rgba(34,211,166,0.22)]
    "
  >
    <Logo size={50} />
  </div>

  <div className="leading-none">
    <h1
      className="
        font-display
        font-extrabold
        text-[34px]
        tracking-[-0.03em]
        text-paper
      "
    >
      Wave<span className="text-signal">Craft</span>
    </h1>

    <p
      className="
        mt-1
        text-[11px]
        uppercase
        tracking-[0.42em]
        text-paper/60
      "
    >
      Hear Beyond Limits
    </p>
  </div>
</Link>

        <nav className="hidden lg:flex items-center gap-9 text-[15px] font-medium">
          {NAV_LINKS.map((link) => (
            <Link key={link.to} to={link.to} className="text-mute hover:text-signal transition-colors">
              {link.label}
            </Link>
          ))}
          {user?.role === 'admin' && (
            <Link to="/admin" className="text-mute hover:text-signal transition-colors">
              Admin
            </Link>
          )}
        </nav>

        <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-mute absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search gear..."
              className="w-full rounded-full bg-panel border border-line pl-9 pr-3 py-2 text-sm focus:border-signal outline-none"
            />
          </div>
        </form>

        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <button
            onClick={toggleTheme}
            aria-label="Toggle light and dark mode"
            className="w-10 h-10 hidden sm:flex items-center justify-center rounded-full border border-line text-mute hover:text-accent hover:border-accent transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <Link
            to="/cart"
            aria-label="Cart"
            className="relative w-10 h-10 flex items-center justify-center rounded-full border border-line text-mute hover:text-signal hover:border-signal transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-signal text-ink text-[11px] font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="hidden sm:flex items-center gap-3">
              <span className="text-sm text-mute">Hi, {user.name.split(' ')[0]}</span>
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="text-sm px-4 py-2 rounded-full border border-line hover:border-accent hover:text-accent transition-colors"
              >
                Log out
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden sm:inline-block text-sm px-4 py-2 rounded-full bg-signal text-ink font-semibold hover:opacity-90 transition-opacity"
            >
              Log in
            </Link>
          )}

          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="w-10 h-10 flex lg:hidden items-center justify-center rounded-full border border-line text-mute"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </Container>

      {menuOpen && (
        <div className="lg:hidden border-t border-line bg-ink">
          <Container className="py-4 flex flex-col gap-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className="w-4 h-4 text-mute absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search gear..."
                className="w-full rounded-full bg-panel border border-line pl-9 pr-3 py-2 text-sm focus:border-signal outline-none"
              />
            </form>

            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="text-mute hover:text-signal transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {user?.role === 'admin' && (
              <Link to="/admin" onClick={() => setMenuOpen(false)} className="text-mute hover:text-signal transition-colors">
                Admin
              </Link>
            )}

            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 text-mute hover:text-accent transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              Toggle theme
            </button>

            {user ? (
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                  navigate('/');
                }}
                className="text-left text-mute hover:text-accent transition-colors"
              >
                Log out ({user.name.split(' ')[0]})
              </button>
            ) : (
              <Link to="/login" onClick={() => setMenuOpen(false)} className="text-signal font-semibold">
                Log in
              </Link>
            )}
          </Container>
        </div>
      )}
    </header>
  );
}
