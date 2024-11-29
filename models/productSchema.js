import mongoose from "mongoose";

const priceHistorySchema = new mongoose.Schema({
  price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  specifications: { type: Map, of: String }, // Key-value pair for dynamic specifications
  currentPrice: { type: Number, required: true },
  priceHistory: [priceHistorySchema],
  sources: [
    {
      sourceName: { type: String, required: true },
      link: { type: String, required: true },
      lastUpdated: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);

export default Product;