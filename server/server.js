import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import records from "./routes/record.js";
import dotenv from "dotenv";

// Load environment variables from config.env
dotenv.config({ path: './config.env' });

const PORT = process.env.PORT || 5050;
const ATLAS_URI = process.env.ATLAS_URI;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/record", records);

// Connect to MongoDB
mongoose.connect(ATLAS_URI)
  .then(() => console.log('MongoDB connected Good work Brandon!'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
