import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import Container from '../components/Container';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <Container className="py-14">
      <p className="text-signal text-sm uppercase tracking-widest mb-2">Get in touch</p>
      <h1 className="font-display font-700 text-3xl sm:text-4xl mb-3">Contact us</h1>
      <p className="text-mute max-w-xl mb-10">
        Questions about an order, a product, or just want to talk gear? Send a note.
      </p>

      <div className="grid lg:grid-cols-[1fr_1.4fr] gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3 rounded-2xl border border-line bg-panel p-5">
            <Mail className="w-5 h-5 text-signal flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-display font-600 text-sm">Email</p>
              <p className="text-mute text-sm">Tanishmandhera@gmail.com</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-2xl border border-line bg-panel p-5">
            <Phone className="w-5 h-5 text-signal flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-display font-600 text-sm">Phone</p>
              <p className="text-mute text-sm">+91 93505 68432</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-2xl border border-line bg-panel p-5">
            <MapPin className="w-5 h-5 text-signal flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-display font-600 text-sm">Studio</p>
              <p className="text-mute text-sm">Kurukshetra, Haryana, India</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-panel p-6 sm:p-8">
          {sent ? (
            <div className="py-10 text-center">
              <p className="font-display font-700 text-xl mb-2">Message sent</p>
              <p className="text-mute">Thanks for reaching out — we'll get back to you soon.</p>
              <button
                onClick={() => {
                  setSent(false);
                  setForm({ name: '', email: '', message: '' });
                }}
                className="mt-6 text-signal hover:underline text-sm"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-xs uppercase tracking-wide text-mute">Name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-1 w-full rounded-lg bg-ink border border-line px-3 py-2.5 text-sm focus:border-signal outline-none"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wide text-mute">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="mt-1 w-full rounded-lg bg-ink border border-line px-3 py-2.5 text-sm focus:border-signal outline-none"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wide text-mute">Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="mt-1 w-full rounded-lg bg-ink border border-line px-3 py-2.5 text-sm focus:border-signal outline-none resize-none"
                />
              </div>
              <button
                type="submit"
                className="self-start rounded-full bg-signal text-ink font-semibold px-6 py-2.5 hover:opacity-90 transition-opacity"
              >
                Send message
              </button>
            </form>
          )}
        </div>
      </div>
    </Container>
  );
}
