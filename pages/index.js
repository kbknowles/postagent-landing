import Head from 'next/head';
import { useState } from 'react';
import { prompts } from '../utils/smartPrompts';

const todayPrompt = prompts[new Date().getDay() % prompts.length];

export default function Home() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        console.error('Failed:', response.status);
        setError('Something went wrong. Please try again.');
        return;
      }

      const data = await response.json();
      console.log('Success:', data);
      setSubmitted(true);
      setShowModal(true);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Could not connect. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-background text-text flex flex-col justify-between">
      <Head>
        <title>PostAgent – Built for Agents. Designed to Close.</title>
      </Head>

      {/* Hero */}
      <section className="banner text-center px-6 bg-primary text-white">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
          Built for Agents. Designed to Close.
        </h1>
        <p className="text-2xl md:text-xl text-accent mb-4">
          Plan, create, and schedule content — all in one place.
        </p>
      </section>

      <main className="w-full max-w-xl text-center space-y-10 mx-auto mt-12 px-6">

        {/* What is PostAgent */}
        <section className="text-left bg-white p-6 rounded-lg shadow border border-muted">
          <h2 className="text-xl font-semibold text-primary mb-2">🔍 What is PostAgent?</h2>
          <p className="text-base text-primary leading-relaxed">
            PostAgent is a content calendar + creation suite made for real estate pros.
            It helps you stay consistent across social media — without wasting hours writing or designing.
          </p>
        </section>

        {/* Waitlist Form */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-primary">Join the Waitlist</h2>
          <p className="text-primary">Early access, sneak peeks, and bonuses. No spam.</p>

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

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </section>

        {/* Smart Prompt */}
        <section className="bg-white border-l-4 border-accent shadow-sm p-6 rounded-lg text-left">
          <h3 className="text-base font-semibold text-secondary mb-2">🧠 Smart Prompt of the Day</h3>
          <p className="text-primary italic">"{todayPrompt}"</p>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-sm text-primary p-4 bg-white w-full text-center space-y-2 border-t mt-16">
        <p>🚀 <strong>PostAgent is coming soon.</strong> Be the first to get early access.</p>
        <p>🔒 We respect your privacy. Your email will only be used to send updates about PostAgent. No spam. Ever.</p>
        <p>&copy; {new Date().getFullYear()} PostAgent • Built for Agents. Designed to Close.</p>
      </footer>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white max-w-md w-full mx-4 rounded-lg shadow-lg p-6 text-center relative animate-fade-in-up">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-xl"
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold text-primary mb-3">✅ You're on the list!</h2>
            <p className="text-primary mb-4">
              We’ll be in touch soon with <br />updates, sneak peeks, and early access.
            </p>
            <p className="text-sm text-accent font-semibold">
              🎁 Bonus: Watch your inbox for <br />
              <em>“10 High-Performing Captions for Agents.”</em>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
