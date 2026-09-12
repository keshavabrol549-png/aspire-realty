import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Demo credentials - in production, validate against database
const ADMIN_EMAIL = 'admin@aspirerealty.com';
const ADMIN_PASSWORD = 'admin123';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Validate credentials
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Create a simple auth token (in production, use JWT)
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
      { success: false, message: 'Invalid credentials' },
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
