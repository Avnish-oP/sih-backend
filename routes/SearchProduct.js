import express from "express";
import Product from "../models/productSchema.js";
import axios from "axios";

const router = express.Router();


router.get('/', async (req, res) => {
    const {name, make, model, searchType, specification } = req.body;
    if(searchType === 'specification' && !specification) {
        return res.status(400).json({
            success: false,
            message: 'Specification is required for specification based search'
        });
    }
    else if(searchType === 'model' && !make && !model) {
        return res.status(400).json({
            success: false,
            message: 'Make and model are required for model based search'
        });
    }
    else{
        try {
            if (searchType === 'specification') {
                const product = await axios.get("http://ml-api.example.com/search", {
                    params: {
                        specification
                    }
                }
                );
                return product.data;
            }
            const product = await Product.findOne({ make, model });
            const result = {
                make: product.make,
                model: product.model,
                currentPrice: product.currentPrice,
                priceHistory: product.priceHistory,
                sources: product.sources,
                createdAt: product.createdAt
            }
            if (product) {
                return res.status(200).json({
                    success: true,
                    data: result
                });
            } else {
                return res.redirect('http://ml-api.example.com/search');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }

    }
});

module.exports = router;