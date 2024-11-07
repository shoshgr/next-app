import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import User from '@/app/types/UserSchema';  

export async function GET() {
  try {
    const MONGO_URI = process.env.MONGO_URI || '';
    if (!MONGO_URI) {
      throw new Error('Missing MONGO_URI in environment variables');
    }

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGO_URI);
      console.log('Connected to MongoDB');
    } else {
      console.log('Using existing MongoDB connection');
    }

    const users = await User.find();  
    return NextResponse.json({ users });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return NextResponse.json({ error: 'Failed to retrieve users', details: error.message }, { status: 500 });
  }
}
