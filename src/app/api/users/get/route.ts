// app/api/users/get/route.ts

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://dummyjson.com/users');
    if (!res.ok) {
      throw new Error('Failed to fetch users');
    }
    const data = await res.json();
    const users = data.users.slice(0, 30);
    return NextResponse.json({ users });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
  }
}
