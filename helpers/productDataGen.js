import model from "./geminiClient.js";
import mongoose from "mongoose";
import Product from "../models/productSchema.js";

const generateProductData = async () => {
  const prompt = `
  Generate product data in JSON format for a database. Each product should have:
  - Name
  - Make
  - Model
  - ItemType
  - Price (integer)
  - Source
  - Vintage (year)
  - PriceHistory (array of {date: YYYY-MM-DD, price: integer})
  - Specifications (processor, ram, storage).

  Generate 5 sample entries for electronics.
  `;

  try {
    const response = await model.generateContent(prompt);

    const data = JSON.parse(response.data.choices[0].text.trim());
    console.log("Generated Product Data:", data);
    return data;
  } catch (error) {
    console.error("Error generating data:", error.message);
  }
};

const saveToDatabase = async (products) => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Product.insertMany(products);
    console.log("Products saved to database successfully!");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error saving data to MongoDB:", error.message);
  }
};

export { generateProductData, saveToDatabase };
