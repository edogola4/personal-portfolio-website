import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config.js';
import contactRoutes from './routes/contactRoutes.js';
import recordRoutes from './routes/recordRoutes.js';

// Create an Express application
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(config.mongodbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => {
  console.error('Failed to connect to MongoDB', err);
  process.exit(1); // Exit the process with failure
});

// Routes
app.use('/contact', contactRoutes);
app.use('/record', recordRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something went wrong!', error: err.message });
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).send({ message: 'Route not found' });
});

export default app;
