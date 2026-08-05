import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 py-24 text-center">
      <h1 className="font-display font-700 text-3xl mb-3">404</h1>
      <p className="text-mute mb-6">This page dropped out of the mix.</p>
      <Link to="/" className="text-signal hover:underline">
        Back to the catalogue
      </Link>
    </div>
  );
}
