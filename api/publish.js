export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  
  if (!GITHUB_TOKEN) {
    return res.status(500).json({ error: 'GITHUB_TOKEN environment variable is not set.' });
  }

  const { data } = req.body;
  if (!data) {
    return res.status(400).json({ error: 'No data provided' });
  }

  // Repo details
  const owner = 'ttu360063-hash';
  const repo = 'dbr387';
  const path = 'public/data.json';
  
  try {
    // 1. Get the current file SHA to update it
    let sha = '';
    const getRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28',
      }
    });

    if (getRes.ok) {
      const fileData = await getRes.json();
      sha = fileData.sha;
    }

    // 2. Prepare the new content
    const contentStr = JSON.stringify(data, null, 2);
    // Base64 encode handling utf-8 characters properly
    const contentBase64 = Buffer.from(contentStr, 'utf-8').toString('base64');

    // 3. Commit the change
    const putRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      body: JSON.stringify({
        message: 'A atualização foi feita pelo Painel Administrativo 🚀',
        content: contentBase64,
        sha: sha || undefined, // sha is required if the file exists
      })
    });

    if (!putRes.ok) {
      const errorData = await putRes.json();
      return res.status(putRes.status).json({ error: 'Failed to commit to GitHub', details: errorData });
    }

    return res.status(200).json({ success: true, message: 'Data published successfully!' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
