const nodemailer = require('nodemailer');

function escapeHtml(unsafe = '') {
  return String(unsafe).replace(/[&<>"]|'/g, (m) => {
    return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m] || m;
  });
}

function parseBody(req) {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', chunk => data += chunk);
    req.on('end', () => {
      try {
        const ct = (req.headers['content-type'] || '').toLowerCase();
        if (ct.includes('application/json')) return resolve(JSON.parse(data || '{}'));
        if (ct.includes('application/x-www-form-urlencoded')) return resolve(Object.fromEntries(new URLSearchParams(data)));
        // If Vercel/Next auto-parsed body it may be on req.body
        if (req.body && typeof req.body === 'object') return resolve(req.body);
        // Fallback try parse JSON or return empty
        try { return resolve(JSON.parse(data || '{}')); } catch (e) { return resolve({}); }
      } catch (e) {
        return resolve({});
      }
    });
    req.on('error', () => resolve({}));
  });
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const body = await parseBody(req);
  const name = (body.name || '').trim();
  const email = (body.email || '').trim();
  const message = (body.message || '').trim();
  const subject = (body.subject || `New message from ${name || 'website visitor'}`).trim();
  const project = (body.project || '').trim();

  if (!name || !email || !message) {
    return res.status(422).json({ error: 'Please provide name, email and message.' });
  }

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_PASS;
  // Default recipient: provided by user. Can be overridden with GMAIL_TO env var.
  const to = process.env.GMAIL_TO || user || 'piyushverma198601986@gmail.com';
  const fromName = process.env.GMAIL_FROM_NAME || 'Portfolio Contact';

  if (!user || !pass) {
    return res.status(500).json({ error: 'SMTP credentials are not configured on Vercel (GMAIL_USER / GMAIL_PASS).' });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user, pass }
  });

  const html = `
    <h2>New contact from portfolio</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    ${project ? `<p><strong>Project:</strong> ${escapeHtml(project)}</p>` : ''}
    ${body.subject ? `<p><strong>Subject:</strong> ${escapeHtml(body.subject)}</p>` : ''}
    <hr />
    <p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>
    <hr />
    <p>Received: ${new Date().toLocaleString()}</p>
  `;

  try {
    await transporter.sendMail({
      from: `${fromName} <${user}>`,
      to,
      subject: `${subject} — ${name}`,
      text: `${message}\n\nProject: ${project}\nFrom: ${name} <${email}>`,
      html,
      replyTo: email
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Error sending email:', err);
    return res.status(500).json({ error: 'Failed to send email.' });
  }
};