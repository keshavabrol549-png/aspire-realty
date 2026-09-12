import { NextResponse } from 'next/server';

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
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    if (id) {
      const listing = await prisma.listing.findUnique({
        where: { id }
      });
      await prisma.$disconnect();
      return NextResponse.json({ listing });
    }

    const whereClause: any = {};
    if (vertical) whereClause.vertical = vertical;
    whereClause.status = 'active';

    if (propertyType && propertyType !== 'all') {
      if (propertyType.includes(',')) {
        whereClause.propertyType = { in: propertyType.split(',') };
      } else if (propertyType === 'residential') {
        whereClause.propertyType = { in: ['apartment', 'house', 'villa', 'penthouse'] };
      } else if (propertyType === 'houses') {
        whereClause.propertyType = { in: ['house', 'villa', 'apartment'] };
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

    // For admin dashboard, if no explicit filters but admin wants all
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

    await prisma.$disconnect();
    return NextResponse.json({ listings });
  } catch (error) {
    console.error('Error fetching listings:', error);
    return NextResponse.json({ listings: [], error: 'Failed to fetch listings' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    const body = await req.json();

    const listing = await prisma.listing.create({
      data: {
        title: body.title,
        description: body.description,
        price: body.price,
        currency: body.currency || 'INR',
        city: body.city,
        state: body.state,
        vertical: body.vertical,
        propertyType: body.propertyType,
        bhk: body.bhk,
        areaSqFt: body.areaSqFt,
        images: body.images || [],
        status: body.status || 'active',
      },
    });

    await prisma.$disconnect();
    return NextResponse.json({ listing }, { status: 201 });
  } catch (error) {
    console.error('Error creating listing:', error);
    return NextResponse.json({ error: 'Failed to create listing' }, { status: 500 });
  }
}
