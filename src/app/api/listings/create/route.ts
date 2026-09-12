import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();

    const body = await req.json();

    const listing = await prisma.listing.create({
      data: {
        title: body.title,
        description: body.description,
        price: body.price,
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
