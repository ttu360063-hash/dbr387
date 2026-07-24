export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  if (!YOUTUBE_API_KEY) {
    return res.status(500).json({ error: 'YOUTUBE_API_KEY is not configured on the server.' });
  }

  // Extract Video ID
  const videoIdMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
  const videoId = videoIdMatch ? videoIdMatch[1] : null;

  if (!videoId) {
    return res.status(400).json({ error: 'Invalid YouTube URL' });
  }

  try {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=${YOUTUBE_API_KEY}`);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: 'YouTube API Error', details: data });
    }

    if (!data.items || data.items.length === 0) {
      return res.status(404).json({ error: 'Video not found' });
    }

    const video = data.items[0];
    const snippet = video.snippet;
    const contentDetails = video.contentDetails;

    // Parse ISO 8601 duration (e.g., PT1H2M10S) to MM:SS or HH:MM:SS
    const parseDuration = (duration) => {
      const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
      
      const hours = (parseInt(match[1]) || 0);
      const minutes = (parseInt(match[2]) || 0);
      const seconds = (parseInt(match[3]) || 0);

      const m = hours > 0 ? String(minutes).padStart(2, '0') : String(minutes);
      const s = String(seconds).padStart(2, '0');

      if (hours > 0) {
        return `${hours}:${m}:${s}`;
      }
      return `${m}:${s}`;
    };

    // Get highest quality thumbnail
    const thumbnails = snippet.thumbnails;
    const bestThumb = thumbnails.maxres || thumbnails.standard || thumbnails.high || thumbnails.default;

    return res.status(200).json({
      title: snippet.title,
      description: snippet.description,
      thumbnail: bestThumb ? bestThumb.url : '',
      duration: parseDuration(contentDetails.duration),
      categoryId: snippet.categoryId,
      url: `https://www.youtube.com/watch?v=${videoId}`
    });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
