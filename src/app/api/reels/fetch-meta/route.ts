import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    // Extract shortcode from Instagram URL
    const match = url.match(/instagram\.com\/(?:reel|p|tv)\/([A-Za-z0-9_-]+)/i);
    const shortcode = match ? match[1] : null;

    if (!shortcode) {
      return NextResponse.json({
        success: false,
        message: 'Could not parse Instagram Reel shortcode. Please check the URL format.',
        thumbnail: null,
      });
    }

    const cleanInstaUrl = `https://www.instagram.com/p/${shortcode}/`;
    const embedUrl = `https://www.instagram.com/p/${shortcode}/embed`;

    // Try fetching via Microlink API to get real cover image (og:image)
    let thumbnailUrl = '';
    try {
      const mlRes = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(cleanInstaUrl)}`);
      const mlData = await mlRes.json();
      if (mlData?.data?.image?.url && !mlData.data.image.url.startsWith('data:')) {
        thumbnailUrl = mlData.data.image.url;
      }
    } catch (e) {
      console.error('Microlink thumbnail fetch error:', e);
    }

    // Fallback professional luxury real estate cover image if microlink didn't return an image
    if (!thumbnailUrl) {
      thumbnailUrl = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop';
    }

    return NextResponse.json({
      success: true,
      shortcode,
      cleanInstaUrl,
      embedUrl,
      thumbnail: thumbnailUrl,
    });
  } catch (error) {
    console.error('Error auto-fetching reel metadata:', error);
    return NextResponse.json({ error: 'Failed to fetch reel meta' }, { status: 500 });
  }
}
