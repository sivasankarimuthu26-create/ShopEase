import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/User.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const indexes = await User.collection.indexes();

const usernameIndex = indexes.find(
  (index) => index.name === "username_1"
);

if (usernameIndex) {
  await User.collection.dropIndex("username_1");
  console.log("Old username index removed.");
}

    const email = "shopease.admin@example.com";
    const password = "Admin@123";

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      existingUser.password = await bcrypt.hash(password, 10);
      existingUser.role = "admin";

      await existingUser.save();

      console.log("Existing user updated as admin.");
    } else {
      await User.create({
        name: "ShopEase Admin",
        email,
        password,
        role: "admin",
      });

      console.log("Admin account created successfully.");
    }

    await mongoose.connection.close();

    console.log("MongoDB connection closed.");
  } catch (error) {
    console.error("Create admin failed:", error);
    process.exit(1);
  }
};

createAdmin();