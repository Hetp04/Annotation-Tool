import { useState, useEffect } from 'react';
import { currentUsername, initUsernameFetcher, getFirebaseData, saveFirebaseData } from '../funcs';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, onValue, remove } from 'firebase/database';
import { database, auth } from '../firebase-init';
import { useNavigate, useLocation } from 'react-router-dom';

export default function ChatSidebar({ onChatSelect }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [username, setUsername] = useState(currentUsername);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [chats, setChats] = useState([]);
  const [sharedChats, setSharedChats] = useState([]);
  const [companyEmail, setCompanyEmail] = useState('');
  const [editingChatId, setEditingChatId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Initialize the username fetcher if not already initialized
    initUsernameFetcher();
    
    // Set up a simple polling mechanism to check for username changes
    const usernameCheck = setInterval(() => {
      if (currentUsername !== username) {
        setUsername(currentUsername);
      }
    }, 1000);
    
    // Check login status
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoggedIn(true);
        try {
          // Get company email for the user
          const userEmail = user.email.replace(".", ",");
          const companyEmailPath = await getFirebaseData(`emailToCompanyDirectory/${userEmail}`);
          
          if (companyEmailPath) {
            setCompanyEmail(companyEmailPath);
            // Set up listener for chats
            loadUserChats(companyEmailPath);
          }
        } catch (error) {
          console.error("Error fetching company email:", error);
        }
      } else {
        setIsLoggedIn(false);
        setChats([]);
      }
    });
    
    // Check for shared chat in URL
    const params = new URLSearchParams(location.search);
    const sharedId = params.get('share');
    
    if (sharedId) {
      loadSharedChat(sharedId);
    }
    
    // Load all shared chats that have been accessed before
    loadAllSharedChats();
    
    return () => {
      clearInterval(usernameCheck);
      unsubscribe();
    };
  }, [username, location.search]);

  // Function to load user chats from Firebase
  const loadUserChats = (companyEmailPath) => {
    const chatsRef = ref(database, `Companies/${companyEmailPath}/groqChats`);
    
    onValue(chatsRef, (snapshot) => {
      if (snapshot.exists()) {
        const chatsData = snapshot.val();
        const chatsArray = Object.entries(chatsData).map(([id, chat]) => ({
          id,
          title: chat.title || 'Untitled Chat',
          timestamp: chat.timestamp || Date.now(),
          ...chat
        })).sort((a, b) => b.timestamp - a.timestamp);
        
        setChats(chatsArray);
      } else {
        setChats([]);
      }
    });
  };

  // Function to load a specific shared chat
  const loadSharedChat = async (sharedId) => {
    try {
      const sharedChatData = await getFirebaseData(`sharedChats/${sharedId}`);
      
      if (sharedChatData) {
        // Store the shared chat ID in local storage to remember it was accessed
        const storedSharedChats = JSON.parse(localStorage.getItem('accessedSharedChats') || '[]');
        if (!storedSharedChats.includes(sharedId)) {
          storedSharedChats.push(sharedId);
          localStorage.setItem('accessedSharedChats', JSON.stringify(storedSharedChats));
        }
        
        // Add the ID to the shared chat data for reference
        const sharedChat = { ...sharedChatData, id: sharedId, isShared: true };
        
        // Update shared chats list
        setSharedChats(prev => {
          const exists = prev.some(chat => chat.id === sharedId);
          if (!exists) {
            return [...prev, sharedChat].sort((a, b) => b.timestamp - a.timestamp);
          }
          return prev;
        });
        
        // Select the shared chat automatically
        if (onChatSelect && typeof onChatSelect === 'function') {
          onChatSelect(sharedChat);
        }
        
        // Remove the share parameter from URL to prevent reloading the same chat
        navigate('/demonstration', { replace: true });
      }
    } catch (error) {
      console.error("Error loading shared chat:", error);
    }
  };
  
  // Function to load all previously accessed shared chats
  const loadAllSharedChats = async () => {
    try {
      const storedSharedChats = JSON.parse(localStorage.getItem('accessedSharedChats') || '[]');
      
      if (storedSharedChats.length === 0) return;
      
      const loadedSharedChats = [];
      
      for (const sharedId of storedSharedChats) {
        const sharedChatData = await getFirebaseData(`sharedChats/${sharedId}`);
        if (sharedChatData) {
          loadedSharedChats.push({ 
            ...sharedChatData, 
            id: sharedId, 
            isShared: true 
          });
        }
      }
      
      // Update state with sorted shared chats
      if (loadedSharedChats.length > 0) {
        setSharedChats(loadedSharedChats.sort((a, b) => b.timestamp - a.timestamp));
      }
    } catch (error) {
      console.error("Error loading all shared chats:", error);
    }
  };

  // Function to create a new chat
  const createNewChat = async () => {
    if (!isLoggedIn || !companyEmail) {
      console.error("User is not logged in or company email not found");
      return;
    }
    
    const chatId = `chat_${Date.now()}`;
    const newChat = {
      title: 'New Chat',
      timestamp: Date.now(),
      messages: []
    };
    
    try {
      await saveFirebaseData(`Companies/${companyEmail}/groqChats/${chatId}`, newChat);
      
      // Instead of navigating, call the prop function to update the current chat
      if (onChatSelect && typeof onChatSelect === 'function') {
        onChatSelect({
          id: chatId,
          ...newChat
        });
      }
    } catch (error) {
      console.error("Error creating new chat:", error);
    }
  };

  // Function to open a chat
  const openChat = (chatId, isShared = false) => {
    // Find the chat in the appropriate list
    const chatList = isShared ? sharedChats : chats;
    const selectedChat = chatList.find(chat => chat.id === chatId);
    
    if (selectedChat && onChatSelect && typeof onChatSelect === 'function') {
      onChatSelect(selectedChat);
    }
  };

  // Function to delete a chat
  const deleteChat = async (event, chatId) => {
    event.stopPropagation(); // Prevent the chat from being opened
    
    if (!isLoggedIn || !companyEmail) {
      console.error("User is not logged in or company email not found");
      return;
    }
    
    if (window.confirm("Are you sure you want to delete this chat?")) {
      try {
        // Remove the chat from Firebase
        const chatRef = ref(database, `Companies/${companyEmail}/groqChats/${chatId}`);
        await remove(chatRef);
        
        // If this was the currently selected chat, create a new one
        const selectedChat = chats.find(chat => chat.id === chatId);
        if (selectedChat && onChatSelect && typeof onChatSelect === 'function') {
          // If there are other chats, select the first one
          if (chats.length > 1) {
            const nextChat = chats.find(chat => chat.id !== chatId);
            if (nextChat) {
              onChatSelect(nextChat);
            }
          } else {
            // If this was the only chat, create a new one
            createNewChat();
          }
        }
      } catch (error) {
        console.error("Error deleting chat:", error);
      }
    }
  };

  // Function to start editing a chat title
  const startEditing = (event, chatId, currentTitle) => {
    event.stopPropagation(); // Prevent the chat from being opened
    setEditingChatId(chatId);
    setEditValue(currentTitle);
  };

  // Function to handle input changes
  const handleEditInputChange = (event) => {
    setEditValue(event.target.value);
  };

  // Function to save the edited chat title
  const saveEditedChatTitle = async (event, chatId) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (!editValue.trim()) {
      setEditValue('Untitled Chat');
    }
    
    if (!isLoggedIn || !companyEmail) {
      console.error("User is not logged in or company email not found");
      return;
    }
    
    try {
      // Update the chat title in Firebase
      await saveFirebaseData(`Companies/${companyEmail}/groqChats/${chatId}/title`, editValue.trim());
      
      // Find the chat and update the title in the parent component
      const updatedChat = chats.find(chat => chat.id === chatId);
      if (updatedChat && onChatSelect && typeof onChatSelect === 'function') {
        // Create a new object with the updated title
        const updatedChatWithNewTitle = {
          ...updatedChat,
          title: editValue.trim()
        };
        
        // Notify the parent component about the title change
        onChatSelect(updatedChatWithNewTitle);
      }
      
      // Exit edit mode
      setEditingChatId(null);
    } catch (error) {
      console.error("Error renaming chat:", error);
    }
  };

  // Function to handle keydown events in the edit input
  const handleEditKeyDown = (event, chatId) => {
    if (event.key === 'Enter') {
      saveEditedChatTitle(event, chatId);
    } else if (event.key === 'Escape') {
      // Cancel editing
      setEditingChatId(null);
    }
  };

  // Function to handle clicking outside of the input to save
  const handleEditBlur = (event, chatId) => {
    saveEditedChatTitle(event, chatId);
  };

  // Function to handle search input changes
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    performSearch(event.target.value);
  };

  // Function to perform the search
  const performSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    const lowerCaseQuery = query.toLowerCase();
    
    // Search through chat titles and messages in both regular and shared chats
    const results = [...chats, ...sharedChats].filter(chat => {
      // Search in title
      const titleMatch = chat.title.toLowerCase().includes(lowerCaseQuery);
      
      // Search in messages
      let messageMatch = false;
      if (chat.messages && Array.isArray(chat.messages)) {
        messageMatch = chat.messages.some(message => 
          message.content && message.content.toLowerCase().includes(lowerCaseQuery)
        );
      }
      
      return titleMatch || messageMatch;
    });
    
    setSearchResults(results);
  };

  // Function to clear search
  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
  };

  // Function to toggle search mode
  const toggleSearch = () => {
    setIsSearching(!isSearching);
    if (!isSearching) {
      setSearchQuery('');
      setSearchResults([]);
    }
  };

  // Function to remove a shared chat from the list (doesn't delete it from Firebase)
  const removeSharedChat = (event, chatId) => {
    event.stopPropagation(); // Prevent the chat from being opened
    
    if (window.confirm("Remove this shared chat from your list? This won't delete it completely.")) {
      try {
        // Remove the chat ID from local storage
        const storedSharedChats = JSON.parse(localStorage.getItem('accessedSharedChats') || '[]');
        const updatedSharedChats = storedSharedChats.filter(id => id !== chatId);
        localStorage.setItem('accessedSharedChats', JSON.stringify(updatedSharedChats));
        
        // Remove from state
        setSharedChats(prev => prev.filter(chat => chat.id !== chatId));
        
        // If this was the currently selected chat, select another one
        const nextChat = sharedChats.find(chat => chat.id !== chatId) || 
                        chats.length > 0 ? chats[0] : null;
        
        if (nextChat && onChatSelect && typeof onChatSelect === 'function') {
          onChatSelect(nextChat);
        } else if (onChatSelect && typeof onChatSelect === 'function') {
          // No chats left, clear the selection
          onChatSelect(null);
        }
      } catch (error) {
        console.error("Error removing shared chat:", error);
      }
    }
  };

  return (
    <div style={{
      width: isCollapsed ? '60px' : '280px',
      height: '100vh',
      background: '#F5F5F5',
      borderRight: '1px solid rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
    }}>
      {/* Logo/Brand Section */}
      <div style={{
        padding: isCollapsed ? '1rem 0' : '1.2rem',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        background: '#EBEBEB',
        display: 'flex',
        alignItems: 'center',
        justifyContent: isCollapsed ? 'center' : 'flex-start',
      }}>
        {!isCollapsed && (
          <span style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#333333',
            letterSpacing: '-0.025em'
          }}>
            Phraze
          </span>
        )}
      </div>

      {(
        <div style={{ 
          padding: '1rem', 
          display: 'flex', 
          gap: '1rem',
          justifyContent: 'space-between',
          marginTop: isCollapsed ? '1.5rem' : '0'
        }}>
          <div>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              style={{
                padding: '0.5rem',
                background: 'none',
                border: 'none',
                color: '#666666',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
                ':hover': {
                  color: '#333333'
                }
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                {isCollapsed 
                 ? <path d="M5 12h14M12 5l7 7-7 7"/>
                 : <path d="M19 12H5M12 19l-7-7 7-7"/>
                 }
              </svg>
            </button>
          </div>
          <div style={{
            display: 'flex',
            gap: '0.5rem'
          }}>
            <button
              onClick={createNewChat}
              disabled={!isLoggedIn}
              style={{
                padding: '0.5rem',
                background: 'none',
                border: 'none',
                color: isLoggedIn ? '#666666' : '#AAAAAA',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: isLoggedIn ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s',
                ':hover': {
                  color: '#333333'
                }
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <path d="M14 2v6h6"/>
                <path d="M12 18v-6"/>
                <path d="M9 15h6"/>
              </svg>
            </button>
            <button
              onClick={toggleSearch}
              style={{
                padding: '0.5rem',
                background: isSearching ? '#E0E0E0' : 'none',
                border: 'none',
                color: '#666666',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
                borderRadius: '4px',
                ':hover': {
                  color: '#333333',
                  background: '#E0E0E0'
                }
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Search Input (only visible when searching) */}
      {!isCollapsed && isSearching && (
        <div style={{
          padding: '0 1rem 1rem',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: 'white',
            borderRadius: '8px',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            padding: '0 0.5rem'
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#666666', marginRight: '0.5rem' }}>
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchInputChange}
              placeholder="Search chats..."
              style={{
                border: 'none',
                padding: '0.75rem 0.5rem 0.75rem 0',
                outline: 'none',
                width: '100%',
                fontSize: '0.875rem'
              }}
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.25rem'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#666666' }}>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Chat History */}
      {!isCollapsed && (
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '0.5rem 1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          {/* Regular Chats Section */}
          {isLoggedIn && chats.length > 0 && !isSearching && (
            <div>
              <div style={{ 
                fontSize: '0.75rem', 
                fontWeight: '600', 
                color: '#666', 
                marginBottom: '0.5rem',
                padding: '0 0.5rem'
              }}>
                YOUR CHATS
              </div>
              
              {chats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => openChat(chat.id)}
                  style={{
                    padding: '0.875rem',
                    background: '#EBEBEB',
                    border: '1px solid rgba(0, 0, 0, 0.05)',
                    borderRadius: '0.75rem',
                    color: '#333333',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.75rem',
                    marginBottom: '0.5rem',
                    width: '100%'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', overflow: 'hidden', width: '100%' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'rgba(0, 0, 0, 0.5)', flexShrink: 0 }}>
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                    {editingChatId === chat.id ? (
                      <form 
                        onSubmit={(e) => saveEditedChatTitle(e, chat.id)}
                        onClick={(e) => e.stopPropagation()}
                        style={{ width: '100%' }}
                      >
                        <input
                          type="text"
                          value={editValue}
                          onChange={handleEditInputChange}
                          onKeyDown={(e) => handleEditKeyDown(e, chat.id)}
                          onBlur={(e) => handleEditBlur(e, chat.id)}
                          autoFocus
                          style={{
                            width: '100%',
                            padding: '4px 8px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            fontSize: '0.875rem',
                            background: 'white'
                          }}
                        />
                      </form>
                    ) : (
                      <span 
                        style={{ 
                          overflow: 'hidden', 
                          textOverflow: 'ellipsis', 
                          whiteSpace: 'nowrap',
                          cursor: 'text'
                        }}
                        onClick={(e) => startEditing(e, chat.id, chat.title)}
                        title="Click to edit"
                      >
                        {chat.title}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={(e) => deleteChat(e, chat.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#666',
                      opacity: 0.7,
                      cursor: 'pointer',
                      borderRadius: '4px',
                      transition: 'all 0.2s',
                      flexShrink: 0
                    }}
                    onMouseOver={(e) => e.currentTarget.style.opacity = 1}
                    onMouseOut={(e) => e.currentTarget.style.opacity = 0.7}
                    title="Delete chat"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                      <line x1="10" y1="11" x2="10" y2="17"/>
                      <line x1="14" y1="11" x2="14" y2="17"/>
                    </svg>
                  </button>
                </button>
              ))}
            </div>
          )}
          
          {/* Shared Chats Section */}
          {sharedChats.length > 0 && !isSearching && (
            <div style={{ marginTop: chats.length > 0 ? '1.5rem' : '0' }}>
              <div style={{ 
                fontSize: '0.75rem', 
                fontWeight: '600', 
                color: '#666', 
                marginBottom: '0.5rem',
                padding: '0 0.5rem'
              }}>
                SHARED CHATS
              </div>
              
              {sharedChats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => openChat(chat.id, true)}
                  style={{
                    padding: '0.875rem',
                    background: '#EBEBEB',
                    border: '1px solid rgba(0, 0, 0, 0.05)',
                    borderRadius: '0.75rem',
                    color: '#333333',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.75rem',
                    marginBottom: '0.5rem',
                    width: '100%'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', overflow: 'hidden', width: '100%' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'rgba(0, 0, 0, 0.5)', flexShrink: 0 }}>
                      <circle cx="18" cy="5" r="3"></circle>
                      <circle cx="6" cy="12" r="3"></circle>
                      <circle cx="18" cy="19" r="3"></circle>
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                    </svg>
                    <span 
                      style={{ 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis', 
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {chat.title}
                    </span>
                  </div>
                  <button
                    onClick={(e) => removeSharedChat(e, chat.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#666',
                      opacity: 0.7,
                      cursor: 'pointer',
                      borderRadius: '4px',
                      transition: 'all 0.2s',
                      flexShrink: 0
                    }}
                    onMouseOver={(e) => e.currentTarget.style.opacity = 1}
                    onMouseOut={(e) => e.currentTarget.style.opacity = 0.7}
                    title="Remove from list"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </button>
              ))}
            </div>
          )}
          
          {/* Search Results */}
          {isSearching && searchQuery && (
            <div>
              {searchResults.length > 0 ? (
                searchResults.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => openChat(chat.id, chat.isShared)}
                    style={{
                      padding: '0.875rem',
                      background: '#EBEBEB',
                      border: '1px solid rgba(0, 0, 0, 0.05)',
                      borderRadius: '0.75rem',
                      color: '#333333',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '0.75rem',
                      marginBottom: '0.5rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', overflow: 'hidden', width: '100%' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'rgba(0, 0, 0, 0.5)', flexShrink: 0 }}>
                        {chat.isShared ? (
                          <>
                            <circle cx="18" cy="5" r="3"></circle>
                            <circle cx="6" cy="12" r="3"></circle>
                            <circle cx="18" cy="19" r="3"></circle>
                            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                          </>
                        ) : (
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                        )}
                      </svg>
                      <span 
                        style={{ 
                          overflow: 'hidden', 
                          textOverflow: 'ellipsis', 
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {chat.title}
                        {chat.messages && Array.isArray(chat.messages) && 
                          chat.messages.some(message => 
                            message.content && message.content.toLowerCase().includes(searchQuery.toLowerCase())
                          ) && (
                            <div style={{
                              fontSize: '0.75rem',
                              color: '#666',
                              marginTop: '0.25rem',
                              fontStyle: 'italic'
                            }}>
                              {chat.messages.filter(message => 
                                message.content && message.content.toLowerCase().includes(searchQuery.toLowerCase())
                              ).length} matching messages
                            </div>
                          )
                        }
                      </span>
                    </div>
                    <button
                      onClick={(e) => chat.isShared ? removeSharedChat(e, chat.id) : deleteChat(e, chat.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#666',
                        opacity: 0.7,
                        cursor: 'pointer',
                        borderRadius: '4px',
                        transition: 'all 0.2s',
                        flexShrink: 0
                      }}
                      onMouseOver={(e) => e.currentTarget.style.opacity = 1}
                      onMouseOut={(e) => e.currentTarget.style.opacity = 0.7}
                      title={chat.isShared ? "Remove from list" : "Delete chat"}
                    >
                      {chat.isShared ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                          <line x1="10" y1="11" x2="10" y2="17"/>
                          <line x1="14" y1="11" x2="14" y2="17"/>
                        </svg>
                      )}
                    </button>
                  </button>
                ))
              ) : (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '2rem 0', 
                  color: '#666666',
                  fontSize: '0.875rem' 
                }}>
                  No matching chats found.
                </div>
              )}
            </div>
          )}
          
          {/* Empty State */}
          {(!isLoggedIn || (chats.length === 0 && sharedChats.length === 0)) && !isSearching && (
            <div style={{ 
              textAlign: 'center', 
              padding: '2rem 0', 
              color: '#666666',
              fontSize: '0.875rem' 
            }}>
              {!isLoggedIn 
                ? "Please log in to see your chats." 
                : "No chats yet. Click the new chat button to get started."}
            </div>
          )}
        </div>
      )}

      {/* User Section */}
      <div style={{
        borderTop: '1px solid rgba(0, 0, 0, 0.1)',
        padding: isCollapsed ? '1rem 0' : '1rem',
        background: '#EBEBEB',
        display: 'flex',
        alignItems: 'center',
        justifyContent: isCollapsed ? 'center' : 'space-between',
        gap: '0.75rem'
      }}>
        {!isCollapsed && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            flex: 1
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: '#E0E0E0',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              color: '#333333',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}>
              {username.charAt(0).toUpperCase()}
            </div>
            <div style={{ 
              fontSize: '0.875rem',
              color: '#333333',
              fontWeight: '500'
            }}>
              {username}
            </div>
            <div style={{
              fontSize: '0.75rem',
              color: isLoggedIn ? '#4CAF50' : '#FF5722',
              marginLeft: 'auto',
              fontWeight: '500'
            }}>
              {isLoggedIn ? 'Online' : 'Offline'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 