export default function Platforms() {
  return (
    <section className="platforms">
      <div className="container">
        <h2>Essential Tools for LLM Training</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-header">
              <div className="feature-icon">
                <i className="fas fa-tag"></i>
              </div>
              <h3>Conversation Annotation</h3>
            </div>
            <div className="feature-content">
              <p>Label and categorize model responses to identify patterns in behavior and output quality.</p>
              <div className="feature-details">
                <div className="feature-points">
                  <div className="feature-point">
                    <i className="fas fa-check"></i>
                    <span>Capture and label key segments of LLM responses</span>
                  </div>
                  <div className="feature-point">
                    <i className="fas fa-check"></i>
                    <span>Classify replies as helpful, incomplete, or irrelevant</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="feature-card">
            <div className="feature-header">
              <div className="feature-icon">
                <i className="fas fa-code"></i>
              </div>
              <h3>Debug Assistant</h3>
            </div>
            <div className="feature-content">
              <p>Track and analyze model outputs to understand where and why your LLM needs improvement.</p>
              <div className="feature-details">
                <div className="feature-points">
                  <div className="feature-point">
                    <i className="fas fa-check"></i>
                    <span>Track conversation errors to optimize behavior</span>
                  </div>
                  <div className="feature-point">
                    <i className="fas fa-check"></i>
                    <span>Identify patterns in model failures</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-header">
              <div className="feature-icon">
                <i className="fas fa-database"></i>
              </div>
              <h3>Training Data Creation</h3>
            </div>
            <div className="feature-content">
              <p>Convert annotated conversations into structured training data for model refinement.</p>
              <div className="feature-details">
                <div className="feature-points">
                  <div className="feature-point">
                    <i className="fas fa-check"></i>
                    <span>Create structured datasets for fine-tuning</span>
                  </div>
                  <div className="feature-point">
                    <i className="fas fa-check"></i>
                    <span>Export annotations for model retraining</span>
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