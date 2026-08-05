import { useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function GoogleSignInButton() {
  const ref = useRef(null);
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  useEffect(() => {
    if (!clientId || !window.google || !ref.current) return;

    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: async (response) => {
        try {
          await loginWithGoogle(response.credential);
          navigate('/');
        } catch (err) {
          console.error('Google sign-in failed', err);
        }
      },
    });

    window.google.accounts.id.renderButton(ref.current, {
      theme: 'outline',
      size: 'large',
      width: 320,
      shape: 'pill',
    });
  }, [clientId, loginWithGoogle, navigate]);

  if (!clientId) {
    return (
      <p className="text-xs text-mute text-center border border-dashed border-line rounded-full py-2.5 px-4">
        Google sign-in isn't configured yet — set VITE_GOOGLE_CLIENT_ID
      </p>
    );
  }

  return <div ref={ref} className="flex justify-center" />;
}
