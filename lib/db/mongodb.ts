import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || '';

if (!MONGO_URI) {
  throw new Error('Missing MONGO_URI in environment variables');
}

let isConnected: boolean = false; 

export async function connectToDatabase() {
  if (isConnected) {
    console.log('Already connected to the database');
    return;
  }

  try {
    await mongoose.connect(MONGO_URI); 
    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Failed to connect to MongoDB');
  }
}
