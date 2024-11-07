import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import User from '@/app/types/UserSchema';  

export async function DELETE(req, { params }) {
  try {
    const { id } = params;  

  
    if (!id || isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
    }

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

    // מחיקת המשתמש לפי השדה id שלך (לא _id)
    const deletedUser = await User.findOneAndDelete({ id: Number(id) });

    if (!deletedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User deleted successfully', user: deletedUser }, { status: 200 });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Failed to delete user', details: error.message }, { status: 500 });
  }
}
