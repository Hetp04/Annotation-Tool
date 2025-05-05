export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            <h1>Annotate AI Models with Interactive Annotations</h1>
            <p className="hero-subtitle">Annotate conversations with LLMs to help debug and improve their behavior. Create training data from real interactions to enhance model performance.</p>
            <div className="hero-cta">
              <a href="#get-started" className="btn btn-primary btn-large">
                <i className="fas fa-play-circle"></i>
                Start Annotating
              </a>
              <a href="#demo" className="btn btn-secondary btn-large">
                <i className="fas fa-desktop"></i>
                See How It Works
              </a>
            </div>
          </div>
          <div className="hero-demo">
            <div className="demo-container">
              <div className="demo-window chat-window">
                <div className="demo-header">
                  <div className="demo-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div className="demo-title">AI Chat Session</div>
                </div>
                <div className="demo-content">
                  <div className="chat-message user">
                    <p>How do I implement a factorial function?</p>
                  </div>
                  <div className="chat-message ai">
                    <p>To calculate the factorial, we need to 
                      <span className="highlight">
                        use a recursive function
                        <span className="highlight-label highlight-method">Technical: Method</span>
                      </span> 
                      or 
                      <span className="highlight">
                        implement an iterative loop
                        <span className="highlight-label highlight-feedback">Technical: Feedback</span>
                      </span> 
                      that multiplies numbers from 1 to n.
                    </p>
                  </div>
                  <div className="chat-message ai">
                    <p>Here's a simple implementation in Python:</p>
                    <pre className="code-block"><code>def factorial(n): if n == 0: return 1 return n * factorial(n-1)</code></pre>
                  </div>
                </div>
              </div>
              
              <div className="demo-window popup-window">
                <div className="demo-header">
                  <div className="demo-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div className="demo-title">Annotation Tools</div>
                </div>
                <div className="demo-content popup-content">
                  <div className="popup-item active">
                    <i className="fas fa-plus"></i>
                    <span>Add New Label</span>
                  </div>
                  <div className="popup-item">
                    <i className="fas fa-camera"></i>
                    <span>Take Screenshot</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 