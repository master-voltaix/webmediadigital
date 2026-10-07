// Vercel serverless function: receives an enquiry from the website and forwards
// it as an e-mail through Resend. The API key never reaches the browser; it is
// read from the RESEND_API_KEY environment variable set in the Vercel project.
//
// Optional environment variables:
//   ANFRAGE_TO   recipient, defaults to info@webmedia-digital.de
//   RESEND_FROM  sender, must belong to a domain verified in Resend

const ALLOWED_FIELDS = ['Name', 'Telefon / WhatsApp', 'E-Mail', 'Betrieb', 'Aktueller Stand', 'Die Website soll', 'Budget', 'Interesse an', 'Nachricht'];
const MAX_LENGTH = 2000;

const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }
  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ ok: false, error: 'E-Mail-Versand ist nicht eingerichtet' });
  }

  const body = req.body && typeof req.body === 'object' ? req.body : {};
  // Honeypot: real visitors never fill this hidden field.
  if (body.website) return res.status(200).json({ ok: true });

  const fields = ALLOWED_FIELDS
    .map(label => [label, typeof body[label] === 'string' ? body[label].trim().slice(0, MAX_LENGTH) : ''])
    .filter(([, value]) => value);
  const name = fields.find(([label]) => label === 'Name');
  const reachable = fields.some(([label]) => label === 'Telefon / WhatsApp' || label === 'E-Mail');
  if (!name || !reachable) {
    return res.status(400).json({ ok: false, error: 'Name und Kontaktweg fehlen' });
  }

  const email = fields.find(([label]) => label === 'E-Mail');
  const text = fields.map(([label, value]) => label + ': ' + value).join('\n');
  const html = '<h2>Neue Anfrage über die Website</h2><table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:15px">'
    + fields.map(([label, value]) => '<tr><td style="color:#667;vertical-align:top;white-space:nowrap">' + escapeHtml(label) + '</td><td>' + escapeHtml(value).replace(/\n/g, '<br>') + '</td></tr>').join('')
    + '</table>';

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + process.env.RESEND_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || 'WebMedia Digital <onboarding@resend.dev>',
        to: [process.env.ANFRAGE_TO || 'info@webmedia-digital.de'],
        reply_to: email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email[1]) ? email[1] : undefined,
        subject: 'Neue Anfrage von ' + name[1].slice(0, 80),
        text,
        html,
      }),
    });
    if (!response.ok) {
      console.error('Resend error', response.status, await response.text());
      return res.status(502).json({ ok: false, error: 'E-Mail konnte nicht gesendet werden' });
    }
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Resend request failed', error);
    return res.status(502).json({ ok: false, error: 'E-Mail konnte nicht gesendet werden' });
  }
};
