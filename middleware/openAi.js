const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv');
dotenv.config();

const api_key = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(`${api_key}`);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });



const generateSummary = async (content) => {
    try {
        const prompt = `Summarize the following blog content: ${content}`;
        const result = await model.generateContent(prompt);
        
        return result.response.text();
    } catch (error) {
        console.error("Error generating summary:", error);
        return null;
    }
};

module.exports = { generateSummary }
