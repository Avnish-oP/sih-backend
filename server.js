import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import dbConfig from "./db/dbConfig.js";



const app = express();
app.use(express.json());
dotenv.config();

// app.use("/scrap", scrapRouter);
dbConfig();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})