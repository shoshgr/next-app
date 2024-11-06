

import { NextResponse } from 'next/server';



// טיפול בבקשות POST
export async function POST() {
    return NextResponse.json({ message: "This is a POST request" });
}

// טיפול בבקשות PUT
export async function PUT() {
    return NextResponse.json({ message: "This is a PUT request" });
}

// טיפול בבקשות DELETE
export async function DELETE() {
  return NextResponse.json({ message: "User data deleted" });
}
