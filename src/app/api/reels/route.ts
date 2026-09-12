import { NextResponse } from 'next/server';

const DEFAULT_REELS = {
  india: [
    {
      id: 'default-in-1',
      vertical: 'india',
      title: 'Aspire Homes Luxury Property Walkthrough',
      videoUrl: 'https://www.instagram.com/reel/DbirxkjvUGM/',
      instagramUrl: 'https://www.instagram.com/aspire_homes_properties?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==',
      thumbnail: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=600&auto=format&fit=crop',
      views: '54.2K views',
      tag: 'Featured',
    },
    {
      id: 'default-in-2',
      vertical: 'india',
      title: 'Premium Residential & Commercial Investment Options',
      videoUrl: 'https://www.instagram.com/reel/DdEv9I6PTB2/',
      instagramUrl: 'https://www.instagram.com/aspire_homes_properties?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==',
      thumbnail: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=600&auto=format&fit=crop',
      views: '48.6K views',
      tag: 'Featured',
    },
    {
      id: 'default-in-3',
      vertical: 'india',
      title: 'Exclusive Jammu Real Estate Opportunities',
      videoUrl: 'https://www.instagram.com/reel/DYG0L68PGIs/',
      instagramUrl: 'https://www.instagram.com/aspire_homes_properties?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==',
      thumbnail: 'https://images.unsplash.com/photo-1599809275671-b3ed8947f3b5?q=80&w=600&auto=format&fit=crop',
      views: '62.1K views',
      tag: 'Featured',
    },
    {
      id: 'default-in-4',
      vertical: 'india',
      title: 'Modern Architecture & Interiors Showcasing',
      videoUrl: 'https://www.instagram.com/reel/DV6eF54j-FV/',
      instagramUrl: 'https://www.instagram.com/aspire_homes_properties?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==',
      thumbnail: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop',
      views: '71.4K views',
      tag: 'Featured',
    },
    {
      id: 'default-in-5',
      vertical: 'india',
      title: 'Prime Location Villa & Plot Tour',
      videoUrl: 'https://www.instagram.com/reel/DVDGilOj4JY/',
      instagramUrl: 'https://www.instagram.com/aspire_homes_properties?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==',
      thumbnail: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600&auto=format&fit=crop',
      views: '83.9K views',
      tag: 'Featured',
    },
  ],
  global: [
    {
      id: 'default-gl-1',
      vertical: 'global',
      title: 'Exclusive Global Luxury Property Showcase',
      videoUrl: 'https://www.instagram.com/reel/DU4_B4Vj1Dy/',
      instagramUrl: 'https://www.instagram.com/aspirerealtyglobal/',
      thumbnail: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=600&auto=format&fit=crop',
      tag: 'Featured',
    },
    {
      id: 'default-gl-2',
      vertical: 'global',
      title: 'Prime International Real Estate Investment Opportunity',
      videoUrl: 'https://www.instagram.com/reel/DVNSHRcD53n/',
      instagramUrl: 'https://www.instagram.com/aspirerealtyglobal/',
      thumbnail: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=600&auto=format&fit=crop',
      tag: 'Featured',
    },
    {
      id: 'default-gl-3',
      vertical: 'global',
      title: 'Luxury Villa & Beachfront Estate Architecture Tour',
      videoUrl: 'https://www.instagram.com/reel/DQyQMvAjwmf/',
      instagramUrl: 'https://www.instagram.com/aspirerealtyglobal/',
      thumbnail: 'https://images.unsplash.com/photo-1599809275671-b3ed8947f3b5?q=80&w=600&auto=format&fit=crop',
      tag: 'Featured',
    },
    {
      id: 'default-gl-4',
      vertical: 'global',
      title: 'Modern Architecture & Masterpiece Penthouse Interiors',
      videoUrl: 'https://www.instagram.com/reel/DQbv-6Aj0e9/',
      instagramUrl: 'https://www.instagram.com/aspirerealtyglobal/',
      thumbnail: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop',
      tag: 'Featured',
    },
    {
      id: 'default-gl-5',
      vertical: 'global',
      title: 'Premium Waterfront Property & Estate Walkthrough',
      videoUrl: 'https://www.instagram.com/reel/C58MpuLRy4w/',
      instagramUrl: 'https://www.instagram.com/aspirerealtyglobal/',
      thumbnail: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600&auto=format&fit=crop',
      tag: 'Featured',
    },
  ]
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const vertical = searchParams.get('vertical') || 'india';

  try {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    const dbReels = await prisma.reel.findMany({
      where: { vertical },
      orderBy: { createdAt: 'desc' }
    });

    await prisma.$disconnect();

    const defaults = DEFAULT_REELS[vertical as 'india' | 'global'] || DEFAULT_REELS.india;

    const dbReelIds = new Set(dbReels.map((r: any) => r.id));
    const remainingDefaults = defaults.filter(d => !dbReelIds.has(d.id));
    const combined = [...dbReels, ...remainingDefaults].map(r => ({ ...r, tag: 'Featured' }));

    return NextResponse.json({ reels: combined });
  } catch (error) {
    console.error('Error fetching reels:', error);
    const defaults = DEFAULT_REELS[vertical as 'india' | 'global'] || DEFAULT_REELS.india;
    return NextResponse.json({ reels: defaults.map(r => ({ ...r, tag: 'Featured' })) });
  }
}

export async function POST(req: Request) {
  try {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    const body = await req.json();

    const vertical = body.vertical || 'india';
    const fallbackInsta = vertical === 'india'
      ? 'https://www.instagram.com/aspire_homes_properties?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=='
      : 'https://www.instagram.com/aspirerealtyglobal/';

    const reel = await prisma.reel.create({
      data: {
        title: body.title,
        vertical: vertical,
        videoUrl: body.videoUrl,
        instagramUrl: body.instagramUrl || fallbackInsta,
        thumbnail: body.thumbnail || null,
        tag: 'Featured',
      }
    });

    await prisma.$disconnect();
    return NextResponse.json({ reel }, { status: 201 });
  } catch (error) {
    console.error('Error creating reel:', error);
    return NextResponse.json({ error: 'Failed to create reel' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    try {
      await prisma.reel.delete({
        where: { id }
      });
    } catch (e) {}

    await prisma.$disconnect();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting reel:', error);
    return NextResponse.json({ error: 'Failed to delete reel' }, { status: 500 });
  }
}
