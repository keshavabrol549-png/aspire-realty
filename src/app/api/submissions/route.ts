import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    const submission = await prisma.submission.create({
      data: {
        vertical: body.vertical,
        name: body.name,
        phone: body.phone,
        email: body.email || null,
        state: body.state,
        city: body.city,
        propertyType: body.propertyType,
        price: body.price,
        currency: body.currency || 'INR',
        bhk: body.bhk || null,
        areaSqFt: body.areaSqFt,
        description: body.description,
        images: body.images || [],
      }
    });

    await prisma.$disconnect();

    // TODO: Send email notification here
    console.log('New submission:', submission.id);

    return NextResponse.json({ success: true, submission });
  } catch (error) {
    console.error('Error creating submission:', error);
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
  }
}
