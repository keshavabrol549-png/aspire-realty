import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    const listing = await prisma.listing.findUnique({
      where: { id }
    });

    await prisma.$disconnect();

    if (!listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }

    return NextResponse.json({ listing });
  } catch (error) {
    console.error('Error fetching listing:', error);
    return NextResponse.json({ error: 'Failed to fetch listing' }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    const body = await req.json();

    const listing = await prisma.listing.update({
      where: { id },
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
        status: body.status,
      },
    });

    await prisma.$disconnect();
    return NextResponse.json({ listing });
  } catch (error) {
    console.error('Error updating listing:', error);
    return NextResponse.json({ error: 'Failed to update listing' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    await prisma.listing.delete({
      where: { id }
    });

    await prisma.$disconnect();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting listing:', error);
    return NextResponse.json({ error: 'Failed to delete listing' }, { status: 500 });
  }
}
