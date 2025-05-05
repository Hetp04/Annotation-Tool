// groqClient.js
// This is a frontend service that communicates with your backend proxy

/**
 * Send a message to Groq through your secure backend proxy
 * @param {Array} messages - Formatted messages for the Groq API
 * @returns {Promise} - The response from your backend
 */
export async function sendMessageToGroq(messages) {
  try {
    // Point this to your Express backend or serverless function
    const response = await fetch('http://localhost:3001/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending message to backend:', error);
    throw error;
  }
}

/**
 * Formats a message with image for the Groq API
 * @param {string} text - The text content
 * @param {string} imageUrl - URL or data URL of the image
 * @returns {Object} - Properly formatted message object
 */
export function formatMessageWithImage(text, imageUrl) {
  const content = [];
  
  if (text) {
    content.push({ type: "text", text });
  }
  
  if (imageUrl) {
    content.push({ 
      type: "image_url", 
      image_url: { url: imageUrl }
    });
  }
  
  return {
    role: "user",
    content
  };
}

/**
 * Formats a simple text message for the Groq API
 * @param {string} text - The text content
 * @param {string} role - The role (user, assistant, system)
 * @returns {Object} - Properly formatted message object
 */
export function formatTextMessage(text, role = "user") {
  return {
    role,
    content: text
  };
} 