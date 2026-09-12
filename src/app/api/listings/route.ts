import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const vertical = searchParams.get('vertical');
  const id = searchParams.get('id');
  const limit = searchParams.get('limit');
  const propertyType = searchParams.get('propertyType');
  const bhk = searchParams.get('bhk');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const city = searchParams.get('city');

  try {
    if (id) {
      const listing = await prisma.listing.findUnique({
        where: { id }
      });
      return NextResponse.json({ listing });
    }

    const whereClause: any = {};
    if (vertical) whereClause.vertical = vertical;
    whereClause.status = 'active';

    if (propertyType && propertyType !== 'all') {
      if (propertyType.includes(',')) {
        whereClause.propertyType = { in: propertyType.split(',') };
      } else if (propertyType === 'residential') {
        whereClause.propertyType = { in: ['apartment', 'house', 'villa', 'penthouse', 'flat'] };
      } else if (propertyType === 'houses') {
        whereClause.propertyType = { in: ['house', 'villa', 'apartment', 'flat'] };
      } else {
        whereClause.propertyType = propertyType;
      }
    }

    if (bhk && bhk !== 'all') {
      whereClause.bhk = parseInt(bhk, 10);
    }

    if (city && city.trim() !== '') {
      whereClause.city = { contains: city.trim(), mode: 'insensitive' };
    }

    if (minPrice || maxPrice) {
      whereClause.price = {};
      if (minPrice) whereClause.price.gte = parseInt(minPrice, 10);
      if (maxPrice) whereClause.price.lte = parseInt(maxPrice, 10);
    }

    // For admin dashboard
    if (searchParams.get('admin') === 'true') {
      delete whereClause.status;
      delete whereClause.vertical;
    }

    const queryOptions: any = {
      where: whereClause,
      orderBy: { createdAt: 'desc' }
    };

    if (limit) {
      queryOptions.take = parseInt(limit, 10);
    }

    const listings = await prisma.listing.findMany(queryOptions);
    return NextResponse.json({ listings });
  } catch (error: any) {
    console.error('Error fetching listings:', error);
    return NextResponse.json({ listings: [], error: error?.message || 'Failed to fetch listings' }, { status: 500 });
  }
}

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
