export default function Demonstration() {
  return (
    <section className="demonstration">
      <div className="container">
        <h2>Demonstration</h2>
        <div className="demo-container">
          {/* First demo section */}
          <div className="demo-section">
            <div className="demo-step-container">
              <p className="demo-step">Step 1: Highlight any text from any webpage, including conversations with LLMs</p>
            </div>
            <div className="demo-window search-results">
              <div className="demo-header">
                <div className="demo-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="demo-title">Search Results</div>
              </div>
              <div className="demo-content">
                <div className="search-result">
                  <h3>Understanding Large Language Models: A Technical Overview</h3>
                  <p>Recent advances in <span className="highlight">transformer architectures</span> have led to significant improvements in natural language processing tasks...</p>
                </div>
                
                <div className="search-result">
                  <h3>Optimizing Training Parameters for Better Results</h3>
                  <p>The model's performance heavily depends on <span className="highlight" data-no-popup>hyperparameter tuning</span> and <span className="highlight" data-no-popup>proper data preprocessing</span> steps...</p>
                </div>
                
                <div className="search-result">
                  <h3>Common Issues in LLM Development</h3>
                  <p>Developers often encounter challenges with token limitation constraints and maintaining context across longer conversations...</p>
                </div>
              </div>
            </div>
          </div>

          {/* After Step 1, before Step 2 */}
          <div className="demo-section">
            <div className="demo-step-container">
              <p className="demo-step">Step 3: Create labels, codes, and notes in the Phraze app</p>
            </div>
            <div className="demo-window app-interface">
              <div className="demo-header">
                <div className="demo-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="demo-title">Phraze App</div>
              </div>
              <div className="demo-content app-content">
                <div className="annotation-options">
                  <div className="annotation-option">
                    <div className="option-icon">
                      <i className="fas fa-tag"></i>
                    </div>
                    <div className="option-content">
                      <h4>Add Label</h4>
                      <p>Create and assign custom labels to categorize your selected text. Choose from predefined labels or create your own.</p>
                    </div>
                  </div>
                  
                  <div className="annotation-option">
                    <div className="option-icon">
                      <i className="fas fa-code"></i>
                    </div>
                    <div className="option-content">
                      <h4>Add Code</h4>
                      <p>Add structured codes to analyze and organize your text selections. Use predefined code categories or customize your own.</p>
                    </div>
                  </div>

                  <div className="annotation-option">
                    <div className="option-icon">
                      <i className="fas fa-sticky-note"></i>
                    </div>
                    <div className="option-content">
                      <h4>Note Board</h4>
                      <p>Create detailed notes with rich text formatting. Add context, observations, or additional information to your annotations.</p>
                    </div>
                  </div>

                  <div className="annotation-option">
                    <div className="option-icon">
                      <i className="fas fa-microphone"></i>
                    </div>
                    <div className="option-content">
                      <h4>Voice Annotation</h4>
                      <p>Record and attach voice notes to your annotations. Perfect for capturing detailed verbal explanations or quick thoughts.</p>
                    </div>
                  </div>

                  <div className="annotation-option">
                    <div className="option-icon">
                      <i className="fas fa-video"></i>
                    </div>
                    <div className="option-content">
                      <h4>Video Annotation</h4>
                      <p>Add video annotations to your selected text. Capture and link visual explanations or demonstrations to your annotations.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Second demo section */}
          <div className="demo-section">
            <div className="demo-step-container">
              <p className="demo-step">Step 2: Right click to annotate and organize your highlights</p>
            </div>
            <div className="demo-window search-results with-zoom">
              <div className="demo-header">
                <div className="demo-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="demo-title">Annotation Menu</div>
              </div>
              <div className="demo-content">
                <div className="search-result">
                  <h3>Understanding Large Language Models: A Technical Overview</h3>
                  <p>Recent advances in <span className="highlight active">transformer architectures</span> have led to significant improvements in natural language processing tasks...</p>
                </div>
                
                <div className="search-result">
                  <h3>Optimizing Training Parameters for Better Results</h3>
                  <p>The model's performance heavily depends on <span className="highlight" data-no-popup>hyperparameter tuning</span> and <span className="highlight" data-no-popup>proper data preprocessing</span> steps...</p>
                </div>
                
                <div className="search-result">
                  <h3>Common Issues in LLM Development</h3>
                  <p>Developers often encounter challenges with <span className="highlight no-animation">token limitation constraints</span> and maintaining context across longer conversations...</p>
                </div>
              </div>

              {/* Context menu positioned near the active highlight */}
              <div className="context-menu">
                <div className="popup-item active">
                  <i className="fas fa-plus"></i>
                  <span>Open Phraze App</span>
                </div>
                <div className="popup-item">
                  <i className="fas fa-camera"></i>
                  <span>Take Screenshot</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 section */}
          <div className="demo-section">
            <div className="demo-step-container">
              <p className="demo-step">Step 4: Adding Labels and Codes to Your Highlights</p>
            </div>
            <div className="demo-window search-results">
              <div className="demo-header">
                <div className="demo-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="demo-title">Labeled Content</div>
              </div>
              <div className="demo-content">
                <div className="search-result">
                  <h3>Understanding Large Language Models: A Technical Overview</h3>
                  <p>Recent advances in <span className="highlight with-tag">
                    <span className="highlight-tag">Label: Underlying Technology</span>
                    transformer architectures</span> have led to significant improvements in natural language processing tasks...</p>
                </div>
                
                <div className="search-result">
                  <h3>Optimizing Training Parameters for Better Results</h3>
                  <p>The model's performance heavily depends on <span className="highlight with-tag">
                    <span className="highlight-tag">Label: Arguments</span>
                    hyperparameter tuning</span> and <span className="highlight with-tag">
                    <span className="highlight-tag">Label: Arguments</span>
                    proper data preprocessing</span> steps...</p>
                </div>
                
                <div className="search-result">
                  <h3>Common Issues in LLM Development</h3>
                  <p>Developers often encounter challenges with <span className="highlight with-tag">
                    <span className="highlight-tag">Label: Arguments</span>
                    token limitation constraints</span> and maintaining context across longer conversations...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 