import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json()); // for JSON
app.use(express.urlencoded({ extended: true })); // ADD THIS LINE


// Test route
app.get('/test', (req, res) => {
  res.send('Server is working!');
});

app.use((req, res, next) => {
  console.log(`🌐 ${req.method} ${req.originalUrl}`);
  next();
});


// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/cart', cartRoutes); 
app.use('/api/payment', paymentRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/testimonials', testimonialRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    // Only listen in local dev (not on Vercel)
    if (process.env.NODE_ENV !== 'production') {
      const PORT = process.env.PORT || 4000;
      app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
    }
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
  });

// Export app for Vercel serverless
export default app;
