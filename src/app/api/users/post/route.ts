import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({ message: "This is a POST request" });
}
