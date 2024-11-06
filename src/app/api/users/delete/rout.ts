import { NextResponse } from 'next/server';

export async function DELETE() {
  return NextResponse.json({ message: "This is a DELETE request" });
}
