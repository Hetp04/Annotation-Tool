import { useState, useRef, useEffect } from 'react';
import { auth } from '../firebase-init';
import ChatSidebar from '../components/ChatSidebar';
// Import our new groqClient service
import { sendMessageToGroq, formatMessageWithImage, formatTextMessage } from '../services/groqClient';

// Import Groq SDK
import Groq from 'groq-sdk';

// Groq API configuration
const GROQ_API_KEY = "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";
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
// const GROQ_MODEL = "llama3-8b-8192"; // Easily changeable model variable
const GROQ_MODEL = "meta-llama/llama-4-scout-17b-16e-instruct"; // Easily changeable model variable

// Initialize Groq client
const groq = new Groq({
  apiKey: GROQ_API_KEY,
  dangerouslyAllowBrowser: true
});

// Separate component for the input form
function MessageInput({ inputValue, setInputValue, handleSubmit, isLoading, textareaRef, handleImageUpload, imagePreview, clearImagePreview }) {
  const fileInputRef = useRef(null);

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <form 
      onSubmit={handleSubmit}
      style={{
        maxWidth: '800px',
        margin: '0 auto',
        position: 'relative'
      }}
    >
      {/* Image preview area */}
      {imagePreview && (
        <div style={{
          marginBottom: '0.5rem',
          position: 'relative',
          maxWidth: '200px'
        }}>
          <img 
            src={imagePreview} 
            alt="Preview" 
            style={{
              maxWidth: '100%',
              borderRadius: '0.5rem',
              border: '1px solid rgba(0,0,0,0.1)'
            }}
          />
          <button
            type="button"
            onClick={clearImagePreview}
            style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              background: 'rgba(0,0,0,0.6)',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '12px'
            }}
            aria-label="Remove image"
          >
            ✕
          </button>
        </div>
      )}

      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        position: 'relative',
        border: '1px solid rgba(0,0,0,0.1)',
        borderRadius: '0.75rem',
        backgroundColor: '#fff',
        paddingRight: '2.5rem'
      }}>
        {/* Image upload button */}
        <button
          type="button"
          onClick={triggerFileInput}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.75rem 0.5rem',
            color: '#6b7280',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          title="Upload image"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
        </button>
        
        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          style={{ display: 'none' }}
        />

        <textarea
          ref={textareaRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          placeholder="Message Phraze..."
          style={{
            width: '100%',
            padding: '0.75rem 0.5rem 0.75rem 0.5rem',
            border: 'none',
            borderRadius: '0.75rem',
            fontSize: '1rem',
            lineHeight: '1.5',
            resize: 'none',
            maxHeight: '200px',
            outline: 'none',
            backgroundColor: '#fff',
            fontFamily: 'inherit',
            overflowY: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
          rows={1}
          disabled={isLoading}
        />
        <button
          type="submit"
          style={{
            display: 'none',
            position: 'absolute',
            right: '0.75rem',
            bottom: '0.75rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            opacity: (inputValue.trim() || imagePreview) && !isLoading ? 1 : 0.5,
            transition: 'opacity 0.2s',
            padding: '0.25rem'
          }}
          disabled={!inputValue.trim() && !imagePreview || isLoading}
        >
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            style={{ 
              width: '1.25rem', 
              height: '1.25rem',
              transform: 'rotate(90deg)',
              color: '#10a37f'
            }}
          >
            <path d="M12 19V5M5 12l7-7 7 7"/>
          </svg>
        </button>
      </div>
    </form>
  );
}

// Separate component for disclaimer
const DisclaimerMessage = () => (
  <div style={{
    textAlign: 'center',
    fontSize: '0.75rem',
    color: '#6b7280',
    marginTop: '0.75rem'
  }}>
    Phraze can make mistakes. Consider checking important information.
  </div>
);

export default function Demonstration() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentChat, setCurrentChat] = useState(null);
  const [editingMessageIndex, setEditingMessageIndex] = useState(null);
  const [editingMessageContent, setEditingMessageContent] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const editTextareaRef = useRef(null);

  const scrollToBottom = () => {
    // messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Only scroll to bottom when messages change, but control when it happens
  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  // Listen for clearChats event from Navbar logout
  useEffect(() => {
    const handleClearChats = () => {
      setMessages([]);
      setCurrentChat(null);
      setInputValue('');
      clearImagePreview();
      setEditingMessageIndex(null);
      setEditingMessageContent('');
    };

    window.addEventListener('clearChats', handleClearChats);
    
    return () => {
      window.removeEventListener('clearChats', handleClearChats);
    };
  }, []);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'inherit';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [inputValue]);
  
  // Handle chat selection from sidebar
  const handleChatSelect = (selectedChat) => {
    // Make sure we update the current chat with the latest data
    setCurrentChat(selectedChat);
    
    // If the chat has messages, load them
    if (selectedChat && selectedChat.messages) {
      // Convert messages object to array if needed
      const chatMessages = Array.isArray(selectedChat.messages) 
        ? selectedChat.messages 
        : Object.values(selectedChat.messages);
        
      setMessages(chatMessages);
    } else {
      // New chat - clear messages
      setMessages([]);
    }
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith('image/')) return;
    
    setImageFile(file);
    
    // Create a preview URL
    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  // Clear image preview
  const clearImagePreview = () => {
    setImagePreview(null);
    setImageFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ((!inputValue.trim() && !imagePreview) || isLoading) return;

    let userMessageContent = inputValue;
    let messageType = 'text';
    let imageUrl = null;

    // If there's an image, upload it to Firebase Storage (simplified here)
    if (imageFile) {
      try {
        // In a real implementation, you would upload to Firebase here
        // For now, we'll just use the data URL as is
        imageUrl = imagePreview; // This would be a Firebase Storage URL in production
        messageType = 'image';
        
        // If there's also text, combine them
        if (inputValue.trim()) {
          messageType = 'image_text';
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        return;
      }
    }

    // Create user message object for display in the UI
    const userMessage = { 
      role: 'user', 
      content: userMessageContent,
      type: messageType
    };
    
    // If there's an image, add the imageUrl to the message
    if (imageUrl) {
      userMessage.imageUrl = imageUrl;
    }
    
    // Add user message to state
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    clearImagePreview();
    setIsLoading(true);
    
    try {
      // Create messages array with proper format for Groq API
      let apiMessages = [];
      
      // Check if any message contains an image
      const hasImage = imageUrl || messages.some(msg => msg.imageUrl);
      
      // Only add system message if there are no images
      if (!hasImage) {
        apiMessages.push({
          role: "system",
          content: "You are a helpful assistant called Phraze."
        });
      }
      
      // Format previous messages for the API
      for (const msg of messages) {
        if (msg.role === 'user') {
          if (msg.imageUrl) {
            // Message with image and text
            const contentArray = [];
            
            if (msg.content.trim()) {
              contentArray.push({
                type: "text",
                text: msg.content
              });
            }
            
            contentArray.push({
              type: "image_url",
              image_url: {
                url: msg.imageUrl
              }
            });
            
            apiMessages.push({
              role: "user",
              content: contentArray
            });
          } else {
            // Text-only user message
            apiMessages.push({
              role: "user",
              content: msg.content
            });
          }
        } else if (msg.role === 'assistant') {
          // Assistant message (always text)
          apiMessages.push({
            role: "assistant",
            content: msg.content
          });
        }
      }
      
      // Add the current user message
      if (imageUrl) {
        const contentArray = [];
        
        if (userMessageContent.trim()) {
          contentArray.push({
            type: "text",
            text: userMessageContent
          });
        }
        
        contentArray.push({
          type: "image_url",
          image_url: {
            url: imageUrl
          }
        });
        
        apiMessages.push({
          role: "user",
          content: contentArray
        });
      } else {
        apiMessages.push({
          role: "user",
          content: userMessageContent
        });
      }

      // Call Groq API with the new SDK format
      const chatCompletion = await groq.chat.completions.create({
        messages: apiMessages,
        model: GROQ_MODEL,
        temperature: 1,
        max_completion_tokens: 1024,
        top_p: 1,
        stream: false,
        stop: null
      });
      
      const assistantMessage = {
        role: 'assistant',
        content: chatCompletion.choices[0].message.content
      };

      // Add the assistant's response to the messages
      const updatedMessages = [...messages, userMessage, assistantMessage];
      setMessages(updatedMessages);
      
      console.log(currentChat);
      
      try {
        import('../funcs').then(async module => {
          try {
            const saveFirebaseData = module.saveFirebaseData;
            const getFirebaseData = module.getFirebaseData;
            const generateUniqueId = module.generateUniqueId || (() => Date.now().toString());
            
            // Get current user from Firebase Auth
            const currentUser = auth.currentUser;
            if (currentUser && currentUser.email) {
              const email = currentUser.email.replace(".", ",");
              const companyEmailPath = await getFirebaseData(`emailToCompanyDirectory/${email}`);
              
              if (companyEmailPath) {
                // If we don't have a current chat or it doesn't have an ID, create a new one
                if (!currentChat || !currentChat.id) {
                  // Generate a new unique ID for the chat
                  const newChatId = generateUniqueId();
                  
                  // Create a title from the first user message
                  const newTitle = userMessage.content.length > 30 
                    ? `${userMessage.content.substring(0, 27)}...` 
                    : userMessage.content || 'Image Chat';
                  
                  // Create a new chat in Firebase
                  const newChat = {
                    id: newChatId,
                    title: newTitle,
                    timestamp: Date.now(),
                    messages: updatedMessages
                  };
                  
                  // Save the new chat to Firebase
                  await saveFirebaseData(`Companies/${companyEmailPath}/groqChats/${newChatId}`, newChat);
                  
                  // Update local state with the new chat
                  setCurrentChat(newChat);
                  
                  console.log("Created new chat:", newChat);
                } else {
                  // If we already have a chat, update it as before
                  await saveFirebaseData(`Companies/${companyEmailPath}/groqChats/${currentChat.id}/messages`, updatedMessages);
                  
                  console.log("Company email path", companyEmailPath);
                  // Update title if it's a new chat with default title
                  if (currentChat.title === 'New Chat') {
                    // Create a title from the first user message
                    const newTitle = userMessage.content.length > 30 
                      ? `${userMessage.content.substring(0, 27)}...` 
                      : userMessage.content || 'Image Chat';
                      
                    await saveFirebaseData(`Companies/${companyEmailPath}/groqChats/${currentChat.id}/title`, newTitle);
                    
                    // Update local state
                    setCurrentChat(prev => ({
                      ...prev,
                      title: newTitle
                    }));
                  }
                }
              } else {
                console.warn("Company email path not found for user:", email);
              }
            } else {
              console.warn("No authenticated user found or user email missing");
            }
          } catch (innerError) {
            console.error("Error updating Firebase data:", innerError);
          }
        }).catch(importError => {
          console.error("Error importing funcs module:", importError);
        });
      } catch (outerError) {
        console.error("Error in Firebase update block:", outerError);
      }
    } catch (error) {
      console.error('Error calling Groq API:', error);
      // Add error message
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error while processing your request.'
      }]);
    } finally {
      setIsLoading(false);
      
      // Focus the textarea after response is received
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 0);
    }
  };

  // Handle message deletion
  const handleDeleteMessage = async (indexToDelete) => {
    if (!currentChat || !currentChat.id) return;
    
    try {
      // Create a new array without the deleted message
      const updatedMessages = messages.filter((_, index) => index !== indexToDelete);
      setMessages(updatedMessages);
      
      // Update Firebase
      import('../funcs').then(async module => {
        try {
          const saveFirebaseData = module.saveFirebaseData;
          const getFirebaseData = module.getFirebaseData;
          
          // Get current user from Firebase Auth
          const currentUser = auth.currentUser;
          if (currentUser && currentUser.email) {
            const email = currentUser.email.replace(".", ",");
            const companyEmailPath = await getFirebaseData(`emailToCompanyDirectory/${email}`);
            
            if (companyEmailPath) {
              // Update the messages in Firebase
              await saveFirebaseData(`Companies/${companyEmailPath}/groqChats/${currentChat.id}/messages`, updatedMessages);
              console.log("Message deleted successfully");
            }
          }
        } catch (error) {
          console.error("Error deleting message:", error);
        }
      });
    } catch (error) {
      console.error("Error in delete message function:", error);
    }
  };

  // Start editing a message
  const handleStartEditing = (index, content) => {
    var width = document.getElementById("message-content" + index).offsetWidth;
    if (width < 300) {
      width = 300;
    }
    setEditingMessageIndex(index);
    setEditingMessageContent(content);
    setTimeout(() => {
      if (editTextareaRef.current) {
        editTextareaRef.current.focus();
        editTextareaRef.current.style.height = 'inherit';
        editTextareaRef.current.style.height = `${editTextareaRef.current.scrollHeight}px`;
        editTextareaRef.current.style.width = width + "px";
      }
    }, 0);
  };

  // Cancel editing a message
  const handleCancelEditing = () => {
    setEditingMessageIndex(null);
    setEditingMessageContent('');
  };

  // Save the edited message and regenerate AI response
  const handleSaveEdit = async (indexToEdit) => {
    if (editingMessageContent.trim() === '') return;

    setIsLoading(true);
    
    // Find the next assistant message after the edited user message
    const nextAssistantIndex = messages.findIndex((msg, idx) => 
      idx > indexToEdit && msg.role === 'assistant'
    );
    
    // Create a new array with messages up to the edited one
    let updatedMessages = [...messages];
    updatedMessages[indexToEdit] = { ...updatedMessages[indexToEdit], content: editingMessageContent };
    
    // If there's an assistant message afterward, remove it (and any following messages)
    if (nextAssistantIndex !== -1) {
      updatedMessages = updatedMessages.slice(0, nextAssistantIndex);
    }
    
    // Update messages state first
    setMessages(updatedMessages);
    
    try {
      // Create messages array with proper format for Groq API
      let apiMessages = [];
      
      // Check if any message contains an image
      const hasImage = updatedMessages.some(msg => msg.imageUrl);
      
      // Only add system message if there are no images
      if (!hasImage) {
        apiMessages.push({
          role: "system",
          content: "You are a helpful assistant called Phraze."
        });
      }
      
      // Format messages for the API
      for (const msg of updatedMessages) {
        if (msg.role === 'user') {
          if (msg.imageUrl) {
            // Message with image and text
            const contentArray = [];
            
            if (msg.content.trim()) {
              contentArray.push({
                type: "text",
                text: msg.content
              });
            }
            
            contentArray.push({
              type: "image_url",
              image_url: {
                url: msg.imageUrl
              }
            });
            
            apiMessages.push({
              role: "user",
              content: contentArray
            });
          } else {
            // Text-only user message
            apiMessages.push({
              role: "user",
              content: msg.content
            });
          }
        } else if (msg.role === 'assistant') {
          // Assistant message (always text)
          apiMessages.push({
            role: "assistant",
            content: msg.content
          });
        }
      }

      // Call Groq API with the new SDK format
      const chatCompletion = await groq.chat.completions.create({
        messages: apiMessages,
        model: GROQ_MODEL,
        temperature: 1,
        max_completion_tokens: 1024,
        top_p: 1,
        stream: false,
        stop: null
      });
      
      const assistantMessage = {
        role: 'assistant',
        content: chatCompletion.choices[0].message.content
      };

      // Add the assistant's response to the messages
      const newMessages = [...updatedMessages, assistantMessage];
      setMessages(newMessages);
      
      // Update Firebase
      import('../funcs').then(async module => {
        try {
          const saveFirebaseData = module.saveFirebaseData;
          const getFirebaseData = module.getFirebaseData;
          
          const currentUser = auth.currentUser;
          if (currentUser && currentUser.email && currentChat && currentChat.id) {
            const email = currentUser.email.replace(".", ",");
            const companyEmailPath = await getFirebaseData(`emailToCompanyDirectory/${email}`);
            
            if (companyEmailPath) {
              await saveFirebaseData(`Companies/${companyEmailPath}/groqChats/${currentChat.id}/messages`, newMessages);
            }
          }
        } catch (error) {
          console.error("Error updating Firebase data:", error);
        }
      });
      
    } catch (error) {
      console.error('Error calling Groq API:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error while processing your request.'
      }]);
    } finally {
      setIsLoading(false);
      setEditingMessageIndex(null);
      setEditingMessageContent('');
    }
  };

  // Auto-resize edit textarea
  useEffect(() => {
    const textarea = editTextareaRef.current;
    if (textarea) {
      textarea.style.height = 'inherit';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [editingMessageContent]);

  // Handle sharing a chat
  const handleShareChat = async (chatToShare) => {
    if (!chatToShare || !chatToShare.id) return;
    
    try {
      // Import necessary functions
      const { generateUniqueId, saveFirebaseData, showToast } = await import('../funcs');
      
      // Generate a unique share ID
      const shareId = generateUniqueId(12);
      
      // Create a copy of the chat without any sensitive information
      const sharedChatData = {
        title: chatToShare.title,
        messages: chatToShare.messages,
        timestamp: Date.now(),
        originalId: chatToShare.id
      };
      
      // Save the shared chat to a public location in Firebase
      await saveFirebaseData(`sharedChats/${shareId}`, sharedChatData);
      
      // Create the shareable URL
      const shareableUrl = `${window.location.origin}/demonstration?share=${shareId}`;
      
      // Copy the URL to clipboard
      await navigator.clipboard.writeText(shareableUrl);
      
      // Show a success toast
      showToast("Shareable link copied to clipboard!", "success");
      
    } catch (error) {
      console.error("Error sharing chat:", error);
      const { showToast } = await import('../funcs');
      showToast("Failed to create shareable link", "error");
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <ChatSidebar onChatSelect={handleChatSelect} />
      
      <main className="chat-interface" style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        background: 'rgb(249, 248, 246)',
        position: 'relative'
      }}>
        {/* Chat title when a chat is selected */}
        {currentChat && currentChat.title && (
          <div style={{
            padding: '1rem',
            borderBottom: '1px solid rgba(0,0,0,0.1)',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
          }}>
            <h2 style={{ 
              margin: 0, 
              fontSize: '1.25rem',
              fontWeight: '500' 
            }}>
              {currentChat.title}
            </h2>
            
            {/* Share button - only visible when chat has messages */}
            {messages.length > 0 && (
              <button
                onClick={() => handleShareChat(currentChat)}
                style={{
                  position: 'absolute',
                  right: '1.5rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  color: '#666',
                  transition: 'all 0.2s'
                }}
                title="Share this chat"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="18" cy="5" r="3"></circle>
                  <circle cx="6" cy="12" r="3"></circle>
                  <circle cx="18" cy="19" r="3"></circle>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                </svg>
                <span style={{ fontSize: '0.875rem' }}>Share</span>
              </button>
            )}
          </div>
        )}
      
        {/* Welcome Screen with Input at Top (shown when no messages) */}
        {messages.length === 0 && (
          <div style={{
            position: 'absolute',
            top: '25%', 
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            width: '100%',
            maxWidth: '800px',
            padding: '0 2rem'
          }}>
            <h1 style={{ 
              fontSize: '2rem', 
              marginTop: '20rem',
              marginBottom: '1.5rem',
              color: '#202123'
            }}>
              How can I help you today?
            </h1>
            
            {/* Input form at the top when no messages */}
            <div style={{ marginBottom: '1.5rem', padding: '0 1rem' }}>
              <MessageInput 
                inputValue={inputValue} 
                setInputValue={setInputValue}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
                textareaRef={textareaRef}
                handleImageUpload={handleImageUpload}
                imagePreview={imagePreview}
                clearImagePreview={clearImagePreview}
              />
              <DisclaimerMessage />
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              maxWidth: '600px',
              margin: '0 auto',
              marginTop: '2rem'
            }}>
              {/* {[
                'Explain quantum computing',
                'Write a thank you note',
                'Debug my Python code',
                'Plan a vacation'
              ].map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setInputValue(suggestion)}
                  style={{
                    padding: '1rem',
                    background: '#f9fafb',
                    border: '1px solid rgba(0,0,0,0.1)',
                    borderRadius: '0.75rem',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    color: '#374151',
                    textAlign: 'left',
                    transition: 'all 0.2s',
                    ':hover': {
                      background: '#f3f4f6',
                      borderColor: 'rgba(0,0,0,0.2)'
                    }
                  }}
                >
                  {suggestion}
                </button>
              ))} */}
            </div>
          </div>
        )}

        {/* Chat Messages */}
        <div 
          key={currentChat ? currentChat.id : 'new-chat'}
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '2rem 0',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              style={{
                padding: '0 1rem',
                maxWidth: '800px',
                margin: '0 auto',
                width: '100%',
                display: 'flex',
                justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                position: 'relative'
              }}
            >
              <div 
                className="message-bubble"
                style={{
                  padding: '1rem',
                  background: message.role === 'user' ? '#ffffff' : 'transparent',
                  borderRadius: message.role === 'user' ? '2rem' : '0.5rem',
                  borderBottomRightRadius: message.role === 'user' ? '5px' : '0.5rem',
                  color: '#0A0A0A',
                  display: 'inline-block',
                  maxWidth: '85%',
                  position: 'relative'
                }}
              >
                {/* Edit Mode for User Messages */}
                {message.role === 'user' && editingMessageIndex === index ? (
                  <div style={{ 
                    position: 'relative',
                    width: '100%' // Ensure the container takes full width of parent
                  }}>
                    <textarea
                      ref={editTextareaRef}
                      value={editingMessageContent}
                      onChange={(e) => setEditingMessageContent(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.5rem',
                        border: 'none',
                        borderRadius: '0.5rem',
                        fontSize: '1rem',
                        lineHeight: '1.5',
                        resize: 'none',
                        outline: 'none',
                        fontFamily: 'inherit',
                        backgroundColor: '#f9f9f9',
                        boxSizing: 'border-box' // Ensure padding is included in width calculation
                      }}
                      rows={1}
                    />
                    <div style={{ 
                      marginTop: '0.5rem',
                      display: 'flex',
                      justifyContent: 'flex-end',
                      gap: '0.5rem'
                    }}>
                      <button
                        onClick={handleCancelEditing}
                        style={{
                          padding: '0.5rem 0.75rem',
                          background: 'rgb(235, 235, 235)',
                          border: 'none',
                          borderRadius: '0.25rem',
                          cursor: 'pointer',
                          fontSize: '0.75rem',
                          fontWeight: '500'
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveEdit(index)}
                        style={{
                          padding: '0.5rem 0.75rem',
                          background: 'rgb(235, 235, 235)',
                          border: 'none',
                          borderRadius: '0.25rem',
                          cursor: 'pointer',
                          color: 'black',
                          fontSize: '0.75rem',
                          fontWeight: '500'
                        }}
                      >
                        Save & Update
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Message Content with Image Support */}
                    <div
                    id={"message-content" + index}
                     style={{
                      fontSize: '1rem',
                      lineHeight: '1.5',
                      whiteSpace: 'pre-wrap'
                    }}>
                      {/* Display image if present */}
                      {message.imageUrl && (
                        <div style={{ marginBottom: message.content ? '0.75rem' : 0 }}>
                          <img 
                            src={message.imageUrl} 
                            alt="User uploaded" 
                            style={{
                              maxWidth: '100%',
                              borderRadius: '0.5rem',
                              maxHeight: '300px'
                            }}
                          />
                        </div>
                      )}
                      {/* Display text content */}
                      {message.content}
                    </div>
                    
                    {/* Edit button for user messages */}
                    {message.role === 'user' && !editingMessageIndex && (
                      <div 
                        className="message-actions"
                        style={{
                          position: 'absolute',
                          left: '-40px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          display: 'flex',
                          opacity: 0,
                          transition: 'opacity 0.2s'
                        }}
                      >
                        <button
                          onClick={() => handleStartEditing(index, message.content)}
                          style={{
                            background: 'rgba(240, 240, 240, 0.8)',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '0.5rem',
                            borderRadius: '50%',
                            color: '#6b7280',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '32px',
                            height: '32px'
                          }}
                          title="Edit message"
                        >
                          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div style={{
              padding: '0 1rem',
              maxWidth: '800px',
              margin: '0 auto',
              width: '100%'
            }}>
              <div style={{
                padding: '1rem',
                background: 'transparent',
                borderRadius: '0.5rem',
                color: '#0A0A0A',
                display: 'inline-block'
              }}>
                <div className="loading-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area at Bottom (only shown when there are messages) */}
        {messages.length > 0 && (
          <div style={{
            borderTop: '1px solid rgba(0,0,0,0.1)',
            padding: '1.5rem',
            background: 'rgb(249, 248, 246)'
          }}>
            <MessageInput 
              inputValue={inputValue} 
              setInputValue={setInputValue}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
              textareaRef={textareaRef}
              handleImageUpload={handleImageUpload}
              imagePreview={imagePreview}
              clearImagePreview={clearImagePreview}
            />
            <DisclaimerMessage />
          </div>
        )}
      </main>
    </div>
  );
}

/* Add CSS to make message actions visible on hover */
const styleTag = document.createElement('style');
styleTag.innerHTML = `
  .message-actions {
    opacity: 0;
  }
  .message-bubble:hover .message-actions {
    opacity: 1 !important;
  }
`;
document.head.appendChild(styleTag); 