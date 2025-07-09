// /pages/index.js
import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        setError(data.message || 'Something went wrong');
      }
    } catch (err) {
      setError('Failed to submit. Please try again later.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-background text-text flex flex-col justify-between px-4">
      <Head>
        <title>PostAgent – Built for Agents. Designed to Close.</title>
      </Head>

      <main className="w-full max-w-xl text-center space-y-8 mx-auto mt-20">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">
          Built for Agents.<br />Designed to Close.
        </h1>

        <p className="text-lg text-primary">
          PostAgent is the easiest way to plan, create, and schedule your real estate marketing content.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-primary transition"
            >
              Join Waitlist
            </button>
          </form>
        ) : (
          <p className="text-primary-600 font-semibold">✅ You're on the list! We'll be in touch soon.</p>
        )}

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </main>

      <footer className="text-sm text-muted p-4 bg-white w-full text-center space-y-2 border-t sticky bottom-0">
        <p>🚀 <strong>PostAgent is coming soon.</strong> Be the first to get early access.</p>
        <p>🔒 We respect your privacy. Your email will only be used to send updates about PostAgent. No spam. Ever.</p>
        <p>&copy; {new Date().getFullYear()} PostAgent • Built for Agents. Designed to Close.</p>
      </footer>
    </div>
  );
}
