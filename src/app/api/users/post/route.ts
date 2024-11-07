import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import User from '@/app/types/UserSchema';  

export async function POST(req) {
  try {

    const data = await req.json();

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

    const newUser = new User(data);
    await newUser.save();

    return NextResponse.json({ message: 'User created successfully', user: newUser }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Failed to create user', details: error.message }, { status: 500 });
  }
}
