import { useState } from 'react';
import { firebaseLogin, firebaseCreateAccount, showToast } from '../funcs';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        // Login flow
        await firebaseLogin(email, password);
        // Redirect or handle successful login
      } else {
        // Signup flow
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        
        const user = await firebaseCreateAccount(email, password, inviteCode, name);
        // Show success toast message
        window.alert('Account created successfully! Page is reloading...');
        // The redirect happens inside firebaseCreateAccount function
      }
    } catch (err) {
      setError(err.message || 'An error occurred during authentication');
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-hero">
        {/* Grid pattern background */}
        <div className="grid-pattern"></div>

        <div className="auth-hero-content">
          <div className="auth-logo">Phraze</div>

          <h1>Develop better language models</h1>
          <p>
            Powerful tools for annotating, analyzing, and improving LLM conversations.
            Create high-quality training data from real user interactions.
          </p>

          <div className="auth-features">
            <div className="auth-feature">
              <div className="feature-icon">
                <i className="fas fa-check"></i>
              </div>
              <div className="feature-text">
                Annotate conversations with custom labels and categories
              </div>
            </div>

            <div className="auth-feature">
              <div className="feature-icon">
                <i className="fas fa-check"></i>
              </div>
              <div className="feature-text">
                Track model performance with comprehensive analytics
              </div>
            </div>

            <div className="auth-feature">
              <div className="feature-icon">
                <i className="fas fa-check"></i>
              </div>
              <div className="feature-text">
                Export structured data for model fine-tuning
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="auth-form-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>{isLogin ? 'Sign in to Phraze' : 'Create your account'}</h2>
            <p>{isLogin ? 'Welcome back' : 'Start improving your LLMs today'}</p>
          </div>

          <div className="auth-toggle">
            <button
              className={`toggle-btn ${isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(true)}
            >
              Sign in
            </button>
            <button
              className={`toggle-btn ${!isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(false)}
            >
              Sign up
            </button>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <form className="auth-form" onSubmit={handleSubmit}>

            {!isLogin && (
              <div className="form-group">
                <label>Invite Code</label>
                <input 
                  type="text" 
                  id="invite-code" 
                  placeholder="Invite Code (Optional)" 
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                />
              </div>
            )}

            {!isLogin && (
              <div className="form-group">
                <label>Name</label>
                <input 
                  type="text" 
                  placeholder="Enter your name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={!isLogin}
                />
              </div>
            )}

            <div className="form-group">
              <label>Email address</label>
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                placeholder="Enter your password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {!isLogin && (
              <div className="form-group">
                <label>Confirm password</label>
                <input 
                  type="password" 
                  placeholder="Confirm your password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required={!isLogin}
                />
              </div>
            )}

            <button type="submit" className="auth-submit">
              {isLogin ? 'Sign in' : 'Create account'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                className="toggle-link"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 