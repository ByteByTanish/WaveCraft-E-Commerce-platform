import Logo from "./components/Logo";
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Container from './components/Container';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Categories from './pages/Categories';
import Contact from './pages/Contact';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import PaymentSuccess from './pages/PaymentSuccess';
import { Link } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products/:slug" element={<ProductDetails />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
  path="/admin"
  element={
    <AdminRoute>
      <Admin />
    </AdminRoute>
  }
/>

<Route
  path="/payment-success"
  element={
    <ProtectedRoute>
      <PaymentSuccess />
    </ProtectedRoute>
  }
/>

<Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="border-t border-line bg-ink">
  <Container className="py-14">

    <div className="flex flex-col items-center justify-center text-center">

      {/* Logo */}
      <Link
        to="/"
        className="flex items-center gap-4 mb-7 group"
      >
        <Logo size={50} />

        <div className="leading-none text-left">
          <h2 className="font-display font-extrabold text-4xl text-paper">
            Wave<span className="text-signal">Craft</span>
          </h2>

          <p className="mt-1 text-[11px] uppercase tracking-[0.38em] text-paper/60">
            Hear Beyond Limits
          </p>
        </div>
      </Link>

      {/* Description */}
      <p className="text-mute text-lg max-w-2xl leading-8 mb-10">
        Built by Tanish Mandhera as a technical assessment project
      </p>

      {/* Navigation */}
      <nav className="flex flex-wrap items-center justify-center gap-0 mb-12">

  <Link
    to="/"
    className="
      px-6
      text-paper
      font-medium
      transition-all
      duration-300
      hover:text-signal
      hover:-translate-y-0.5
    "
  >
    Home
  </Link>

  <span className="h-5 w-px bg-gradient-to-b from-transparent via-signal/90 to-transparent opacity-80"></span>

  <Link
    to="/shop"
    className="
      px-6
      text-paper
      font-medium
      transition-all
      duration-300
      hover:text-signal
      hover:-translate-y-0.5
    "
  >
    Shop
  </Link>

  <span className="h-5 w-px bg-gradient-to-b from-transparent via-signal/90 to-transparent opacity-80"></span>

  <Link
    to="/categories"
    className="
      px-6
      text-paper
      font-medium
      transition-all
      duration-300
      hover:text-signal
      hover:-translate-y-0.5
    "
  >
    Categories
  </Link>

  <span className="h-5 w-px bg-gradient-to-b from-transparent via-signal/90 to-transparent opacity-80"></span>

  <Link
    to="/contact"
    className="
      px-6
      text-paper
      font-medium
      transition-all
      duration-300
      hover:text-signal
      hover:-translate-y-0.5
    "
  >
    Contact
  </Link>

</nav>

      <div className="w-full border-t border-line mb-8"></div>

      <p className="text-mute text-sm">
        © 2026 WaveCraft. All rights reserved.
      </p>

    </div>

  </Container>
</footer>
    </div>
  );
}
