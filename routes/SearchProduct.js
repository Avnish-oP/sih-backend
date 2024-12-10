import express from "express";
import Product from "../models/productSchema.js"; 
import webcrawler from "../lib/crawler.js";
import connectDb from "../db/dbConfig.js"; 

const router = express.Router();

router.get("/make-model", async (req, res) => {
    const { name, type, make, model } = req.body;

    // Validate query parameters
    if (!name && !type && !make && !model) {
        return res.status(400).json({ error: "At least one query parameter (name, type, make, model) is required" });
    }
    console.log("Search parameters:", { name, type, make, model });

    try {
        await connectDb();

        // Construct queries for exact and partial matches
        const exactMatchQuery = {
            $and: [
                name ? { name: new RegExp(`^${name}$`, "i") } : null,
                type ? { type: new RegExp(`^${type}$`, "i") } : null,
                make ? { make: new RegExp(`^${make}$`, "i") } : null,
                model ? { model: new RegExp(`^${model}$`, "i") } : null,
            ].filter(Boolean),
        };

        const partialMatchQuery = {
            $or: [
                name ? { name: new RegExp(name, "i") } : null,
                type ? { type: new RegExp(type, "i") } : null,
                make ? { make: new RegExp(make, "i") } : null,
                model ? { model: new RegExp(model, "i") } : null,
            ].filter(Boolean),
        };

        // Step 1: Look for exact matches
        let dbProducts = await Product.find(exactMatchQuery);

        if (dbProducts.length === 0) {
            console.log("No exact matches found. Searching for partial matches...");
            // Step 2: If no exact matches, look for partial matches
            dbProducts = await Product.find(partialMatchQuery);
        }

        if (dbProducts.length > 0) {
            console.log(`Found ${dbProducts.length} products in the database`);
            return res.status(200).json({ success: true, products: dbProducts });
        }

        console.log("No matches found in the database. Searching via webcrawler...");

        // Step 3: If no matches, search using webcrawler
        const crawledProducts = await webcrawler(name); // Adjust webcrawler to accept additional parameters if needed

        if (crawledProducts.length === 0) {
            return res.status(404).json({ success: false, message: "No products found" });
        }

        // Step 4: Save crawled products to the database
        for (const product of crawledProducts) {
            const newProduct = new Product(product);
            await newProduct.save();
        }

        console.log("Crawled products saved to the database");
        return res.status(200).json({ success: true, products: crawledProducts });

    } catch (error) {
        console.error("Error in search route", error);
        res.status(500).json({ success: false, message: "Server error", error });
    }
});

export default router;
