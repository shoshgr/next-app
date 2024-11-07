import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import User from '@/app/types/UserSchema';

export async function PUT(req, { params }) {
  try {
    const  {id}  = params; // קבלת ה-ID מה-params של ה-URL
    const userUpdates = await req.json(); // קבלת הנתונים לעדכון מהבקשה

    // התחברות למסד הנתונים
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

    // עדכון המשתמש לפי שדה id ולא _id
    const updatedUser = await User.findOneAndUpdate(
      { id: id }, // משתמשים ב-id בתור מזהה לעדכון
      userUpdates, // הנתונים לעדכון
      { new: true } // מחזירים את המסמך לאחר העדכון
    );

    // אם לא נמצא משתמש לעדכן, מחזירים שגיאה
    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User updated successfully', user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Failed to update user', details: error.message }, { status: 500 });
  }
}
