// pages/api/waitlist.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  try {
    const result = await resend.emails.send({
      from: 'PostAgent <hello@getpostagent.com>',
      to: email,
      cc: ['support@getpostagent.com'], // optional
      subject: '🎉 You’re on the PostAgent Waitlist!',
      html: `
        <h2>Welcome to PostAgent 👋</h2>
        <p>Thanks for joining the waitlist!</p>
        <p>We're building a simple, powerful content planning suite designed specifically for real estate agents — and you're now first in line to try it.</p>
        <hr />
        <p>🎁 As a bonus, we’ll be sending you our <strong>“10 High-Performing Captions for Agents”</strong> — real examples you can use or tweak today.</p>
        <p>We'll be in touch soon with updates, sneak peeks, and early access.</p>
        <p>– The PostAgent Team<br><a href="https://getpostagent.com">getpostagent.com</a></p>
      `,
      text: `Welcome to PostAgent!\n\nThanks for joining the waitlist.\n\nWe're building a simple, powerful content planning suite for real estate agents — and you're now first in line to try it.\n\n🎁 As a bonus, we’ll send you our “10 High-Performing Captions for Agents.”\n\nWe'll be in touch soon with updates.\n\n– The PostAgent Team\ngetpostagent.com`,
    });

    return res.status(200).json({ success: true, result });
  } catch (error) {
    console.error('Resend error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
