// groqService.js
// NOTE: This file should be used in a Node.js environment (backend), not directly in the browser

const Groq = require('groq-sdk');

// Initialize the Groq client with your API key
// In production, store this in environment variables
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY, 
});

/**
 * Send a message to the Groq API with image support
 * @param {Array} messages - Array of message objects formatted for Groq
 * @returns {Promise} - The Groq API response
 */
async function sendMessageToGroq(messages) {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: messages,
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      temperature: 1,
      max_completion_tokens: 1024,
      top_p: 1,
      stream: false,
      stop: null
    });
    
    return chatCompletion;
  } catch (error) {
    console.error('Error calling Groq API:', error);
    throw error;
  }
}

module.exports = { sendMessageToGroq }; 