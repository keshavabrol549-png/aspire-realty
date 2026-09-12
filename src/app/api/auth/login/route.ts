import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const inputUser = String(body.username || body.email || body.identifier || '').trim().toLowerCase();
    const inputPassword = String(body.password || '');

    if (!inputUser || !inputPassword) {
      return NextResponse.json(
        { success: false, message: 'Username/Email and Password are required' },
        { status: 400 }
      );
    }

    // Get allowed admin credentials from Environment Variables
    const allowedUsernames = [
      process.env.ADMIN_USERNAME,
      process.env.ADMIN_EMAIL,
      process.env.ADMIN_USER,
    ]
      .filter(Boolean)
      .map((u) => String(u).trim().toLowerCase());

    const expectedPassword = process.env.ADMIN_PASSWORD;

    // Validate against environment variables
    const isUserValid = allowedUsernames.length > 0 && allowedUsernames.includes(inputUser);
    const isPasswordValid = Boolean(expectedPassword && inputPassword === expectedPassword);

    if (isUserValid && isPasswordValid) {
      // Create auth token
      const token = Buffer.from(`${inputUser}:${Date.now()}`).toString('base64');

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
      { success: false, message: 'Invalid username/email or password' },
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
