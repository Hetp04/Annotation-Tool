import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { auth } from '../firebase-init';





export default function Navbar() {

  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      // Dispatch a custom event to clear chats in Demonstration.jsx
      const clearChatsEvent = new CustomEvent('clearChats');
      window.dispatchEvent(clearChatsEvent);
      
      // Sign out from Firebase
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav 
      className="navbar" 
      style={{ 
        backgroundColor: isScrolled ? 'rgb(250, 250, 250)' : 'rgb(255, 255, 255)',
        transition: 'background-color 0.3s ease'
      }}
    >
      <div className="nav-container">
        <div className="nav-left">
          <Link to="/" className="logo">
            <img src="src/images/p.png" alt="Phraze Logo" className="logo-img" />
          </Link>
        </div>
        <div className="nav-center">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/features" className="nav-link">Features</Link>
          <Link to="/demonstration" className="nav-link">Demonstration</Link>
          {/* <a href="#Demonstration" className="nav-link">Demonstration</a> */}
        </div>
        <div className="nav-right" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px' 
        }}>
          <a href="https://chrome.google.com/webstore/detail/your-extension-id" className="add-to-chrome">
            <i className="fab fa-chrome"></i>
            Add to Chrome
          </a>
          {!isLoggedIn ? (
            <Link to="/auth" id="login-button" className="login-button" style={{
              padding: '8px 16px',
              backgroundColor: 'rgb(235, 235, 235)',
              color: 'black',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'all 0.2s ease',
              display: 'inline-block'
            }}>
              Login
            </Link>
          ) : (
            <button 
              onClick={handleLogout}
              className="logout-button"
              style={{
                padding: '8px 16px',
                backgroundColor: 'rgb(235, 235, 235)',
                color: 'black',
                borderRadius: '6px',
                border: 'none',
                fontWeight: '500',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
} 