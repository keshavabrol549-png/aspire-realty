import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Environment variables with fallback
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@aspirerealty.com';
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

    // Validate credentials
    if (email.trim().toLowerCase() === ADMIN_EMAIL.trim().toLowerCase() && password === ADMIN_PASSWORD) {
      // Create auth token
      const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');

      // Set secure cookie
      const cookieStore = await cookies();
      cookieStore.set('admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60, // 24 hours
      });

      return NextResponse.json(
        { success: true, message: 'Login successful' },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Invalid email or password' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}
