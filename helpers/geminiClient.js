import { GoogleGenerativeAI } from "@google/generative-ai";

console.log(process.env.GEMINI_KEY)

const genAI = new GoogleGenerativeAI(`AIzaSyAXidMACKkby6DEBw0oK6rIuTn4rm007zM`);

const model = genAI.getGenerativeModel({model:"gemini-1.5-flash"});

export default model;