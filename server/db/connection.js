import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from config.env
dotenv.config({ path: '../config.env' });

const ATLAS_URI = process.env.ATLAS_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(ATLAS_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

connectDB();

export default mongoose.connection;
