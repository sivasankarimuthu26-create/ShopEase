import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const frontendOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';

app.use(
  cors({
    origin: frontendOrigin,
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/orders", orderRoutes);
app.use('/api/auth', authRoutes);
app.use("/api/products", productRoutes);console.log("Product routes mounted");
app.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    service: 'ShopEase API',
    message: 'Health check passed',
  });
});

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`ShopEase server running on port ${PORT}`);
  });
};

startServer();
