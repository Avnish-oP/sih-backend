import express from "express";

import dotenv from "dotenv";
import dbConfig from "./db/dbConfig.js";
import makeModel from "./routes/SearchProduct.js";



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();

// app.use("/scrap", scrapRouter);
dbConfig();

app.use("/api/search", makeModel);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})