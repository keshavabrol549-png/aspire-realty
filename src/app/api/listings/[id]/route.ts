import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const listing = await prisma.listing.findUnique({
      where: { id }
    });

    if (!listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }

    return NextResponse.json({ listing });
  } catch (error: any) {
    console.error('Error fetching listing:', error);
    return NextResponse.json({ error: error?.message || 'Failed to fetch listing' }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body = await req.json();

    const price = body.price !== undefined ? parseInt(String(body.price), 10) : undefined;
    const areaSqFt = body.areaSqFt !== undefined ? parseInt(String(body.areaSqFt), 10) : undefined;
    const bhk = body.bhk !== undefined && body.bhk !== null && body.bhk !== '' ? parseInt(String(body.bhk), 10) : null;

    let images: string[] | undefined = undefined;
    if (Array.isArray(body.images)) {
      images = body.images;
    } else if (typeof body.images === 'string') {
      images = body.images.split(',').map((s: string) => s.trim()).filter(Boolean);
    }

    const listing = await prisma.listing.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        ...(price !== undefined && !isNaN(price) ? { price } : {}),
        currency: body.currency,
        city: body.city,
        state: body.state,
        vertical: body.vertical,
        propertyType: body.propertyType,
        bhk,
        ...(areaSqFt !== undefined && !isNaN(areaSqFt) ? { areaSqFt } : {}),
        ...(images !== undefined ? { images } : {}),
        status: body.status,
      },
    });

    return NextResponse.json({ listing });
  } catch (error: any) {
    console.error('Error updating listing:', error);
    return NextResponse.json({ error: error?.message || 'Failed to update listing' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await prisma.listing.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting listing:', error);
    return NextResponse.json({ error: error?.message || 'Failed to delete listing' }, { status: 500 });
  }
}
