// pages/api/waitlist.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: 'Invalid email' });
  }

  try {
    await resend.emails.send({
      from: 'PostAgent <hello@getpostagent.com>',
      to: email,
      cc: ['support@getpostagent.com'],
      subject: "🎉 You're on the PostAgent waitlist!",
      html:  `
        <h2>Thanks for signing up!</h2>
        <p>You're officially on the waitlist for <strong>PostAgent</strong>.</p>
        <p>We’ll be in touch soon as we open early access.</p>
        <br />
        <p style="color: #888;">Built for Agents. Designed to Close.</p>
      `,
});
    console.log('Resend success:', result);
    return res.status(200).json({ message: 'Email sent' });
  } catch (error) {
    console.error('Resend error:', error);
    return res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
}