export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const ADMIN_SECRET = process.env.ADMIN_SECRET;
  const { password } = req.body;

  if (!ADMIN_SECRET) {
    // If no secret is set on the server, we allow login for demonstration purposes, 
    // or we can block it. Let's allow it but warn.
    return res.status(200).json({ success: true, warning: 'ADMIN_SECRET is not set on the server' });
  }

  if (password === ADMIN_SECRET) {
    return res.status(200).json({ success: true });
  } else {
    return res.status(401).json({ error: 'Invalid password' });
  }
}
