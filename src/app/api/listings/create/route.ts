import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.title || !body.price) {
      return NextResponse.json({ error: 'Title and Price are required' }, { status: 400 });
    }

    const price = parseInt(String(body.price), 10);
    const areaSqFt = parseInt(String(body.areaSqFt || '1000'), 10);
    const bhk = body.bhk !== undefined && body.bhk !== null && body.bhk !== '' ? parseInt(String(body.bhk), 10) : null;
    const vertical = body.vertical || 'india';
    const propertyType = body.propertyType || 'flat';
    const currency = body.currency || (vertical === 'global' ? 'USD' : 'INR');

    let images: string[] = [];
    if (Array.isArray(body.images)) {
      images = body.images;
    } else if (typeof body.images === 'string') {
      images = body.images.split(',').map((s: string) => s.trim()).filter(Boolean);
    }

    const listing = await prisma.listing.create({
      data: {
        title: String(body.title),
        description: String(body.description || ''),
        price: isNaN(price) ? 0 : price,
        currency: String(currency),
        city: String(body.city || (vertical === 'global' ? 'Dubai' : 'Jammu')),
        state: String(body.state || (vertical === 'global' ? 'UAE' : 'Jammu & Kashmir')),
        vertical: String(vertical),
        propertyType: String(propertyType),
        bhk: bhk !== null && !isNaN(bhk) ? bhk : null,
        areaSqFt: isNaN(areaSqFt) ? 1000 : areaSqFt,
        images,
        status: String(body.status || 'active'),
      },
    });

    return NextResponse.json({ listing }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating listing:', error);
    return NextResponse.json({ error: error?.message || 'Failed to create listing' }, { status: 500 });
  }
}
