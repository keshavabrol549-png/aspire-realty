import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    const reel = await prisma.reel.upsert({
      where: { id },
      update: {
        title: body.title,
        vertical: body.vertical,
        videoUrl: body.videoUrl,
        instagramUrl: body.instagramUrl,
        thumbnail: body.thumbnail,
        views: body.views,
        tag: body.tag,
      },
      create: {
        id,
        title: body.title || 'Featured Reel',
        vertical: body.vertical || 'india',
        videoUrl: body.videoUrl || '',
        instagramUrl: body.instagramUrl || '',
        thumbnail: body.thumbnail || '',
        views: body.views || '10K+ views',
        tag: body.tag || 'Featured',
      },
    });

    await prisma.$disconnect();
    return NextResponse.json({ reel });
  } catch (error) {
    console.error('Error updating reel:', error);
    return NextResponse.json({ error: 'Failed to update reel' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    try {
      await prisma.reel.delete({
        where: { id },
      });
    } catch (e) {
      // If reel ID wasn't in DB (e.g., static default reel), ignore missing record error
    }

    await prisma.$disconnect();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting reel:', error);
    return NextResponse.json({ error: 'Failed to delete reel' }, { status: 500 });
  }
}
