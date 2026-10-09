import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "../models/Product.js";
import products from "./products.js";

dotenv.config();

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected for seeding.");

    // Remove existing products so we start fresh
    await Product.deleteMany({});

    // Insert exactly 50 products
    const productsToInsert = products.slice(0, 50);

    const insertedProducts = await Product.insertMany(productsToInsert);

    console.log(
      `${insertedProducts.length} products inserted successfully.`
    );

    await mongoose.connection.close();

    console.log("MongoDB connection closed.");
  } catch (error) {
    console.error("Product seeding failed:", error);
    process.exit(1);
  }
};

seedProducts();