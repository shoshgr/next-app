import { NextResponse } from 'next/server';

export async function PUT() {
  return NextResponse.json({ message: "This is a PUT request" });
}
