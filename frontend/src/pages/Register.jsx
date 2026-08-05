import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';
import GoogleSignInButton from '../components/GoogleSignInButton';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(name, email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto px-4 sm:px-6 py-20">
      <div className="flex justify-center mb-6">
        <Logo size={40} />
      </div>
      <h1 className="font-display font-700 text-2xl text-center mb-1">Join WaveCraft</h1>
      <p className="text-center text-sm text-mute mb-8">Grounded gear, honest prices, calmer listening.</p>

      <GoogleSignInButton />

      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-line" />
        <span className="text-xs text-mute uppercase tracking-wide">or</span>
        <div className="flex-1 h-px bg-line" />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="text-xs uppercase tracking-wide text-mute">Name</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-lg bg-panel border border-line px-3 py-2.5 focus:border-accent outline-none"
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-wide text-mute">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg bg-panel border border-line px-3 py-2.5 focus:border-accent outline-none"
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-wide text-mute">Password</label>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-lg bg-panel border border-line px-3 py-2.5 focus:border-accent outline-none"
          />
        </div>

        {error && <p className="text-amber text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded-full bg-signal text-ink font-semibold py-2.5 hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? 'Creating account...' : 'Create account'}
        </button>
      </form>

      <p className="text-center text-sm text-mute mt-6">
        Already have an account?{' '}
        <Link to="/login" className="text-accent hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
