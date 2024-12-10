import indiaMartSrapper from "../scrapper/indiamart.js";
import Product from "../models/productSchema.js";
import connectDb from "../db/dbConfig.js";

const scrappers = [indiaMartSrapper];

// Delay function for throttling requests
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Function to fetch and save products dynamically based on a search query
const webcrawler = async (query) => {
    try {
        await connectDb();

        let allProducts = [];
        for (const scrapper of scrappers) {
            const products = await scrapper(query);
            if (products) {
                allProducts.push(...products);
            }
        }
        console.log(`Total products fetched for query "${query}": ${allProducts.length}`);

        // Save fetched products to the database
        for (const product of allProducts) {
            await saveOrupdateProduct(product);
        }
        console.log(`Finished saving products for query "${query}".`);
        return allProducts; // Return products to be sent to the frontend
    } catch (error) {
        console.error("Error in webcrawler", error);
        throw error; // Throw error to be handled in the route
    }
};

// Function to save or update a product in the database
const saveOrupdateProduct = async (product) => {
    try {
        const { name, make, model, sources } = product;

        const existingProduct = await Product.findOne({
            name,
            make,
            model,
            "sources.sourceName": sources[0].sourceName,
        });

        if (existingProduct) {
            console.log("Product already exists, updating price history");
            existingProduct.currentPrice = product.currentPrice;
            existingProduct.priceHistory.push({
                price: product.currentPrice,
                date: new Date(),
            });
            existingProduct.updatedAt = new Date();
            await existingProduct.save();
            console.log(`Product updated: ${name} - ${make} - ${model}`);
        } else {
            console.log("Product does not exist, saving new product");
            const newProduct = new Product(product);
            await newProduct.save();
            console.log(`New product saved: ${name} - ${make} - ${model}`);
        }
    } catch (error) {
        console.error("Error saving product", error);
    }
};

export default webcrawler;
