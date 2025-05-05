import SlidingRectangles from '../components/SlidingRectangles';
import { useScrollAnimation } from '../components/ScrollAnimation';

export default function Features() {
  // Initialize scroll animation
  useScrollAnimation();
  
  return (
    <main className="features-page" style={{ 
      background: 'linear-gradient(to bottom,rgb(255, 255, 255), #f5f5f7 50%, #FAF9F6)'
    }}>
      {/* Hero Section */}
      <section className="features-hero" style={{ paddingTop: '120px', background: 'transparent' }}>
        <div className="container">
          <div style={{ 
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px'
          }}>
            <p className="small-text" style={{ margin: 0 }}>Phraze</p>
          </div>
          <h1>Advanced Features for LLM Development</h1>
          <p className="small-text" style={{ margin: 0, whiteSpace: 'nowrap' }}>Highlight, annotate, and organize text from any webpage or LLM conversation</p>
        </div>
      </section>

      {/* Sliding Rectangles Animation */}
      <SlidingRectangles />

      {/* Start Now Button */}
      <div style={{ 
        display: 'flex',
        justifyContent: 'center',
        margin: '40px 0'
      }}>
        <a href="#" className="small-text" style={{
          backgroundColor: 'rgb(240,240,240)',
          borderRadius: '18px',
          padding: '10px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textDecoration: 'none',
          color: '#333',
          fontWeight: '500',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          margin: 0
        }}>
          Start now
          <span style={{ marginLeft: '8px' }}>↗</span>
        </a>
      </div>

      {/* Detailed Features Section */}
      <section className="features-detailed" style={{ background: 'transparent' }}>
        <div className="container">
          <div className="features-section">
            <h2>Annotation Tools</h2>
            <div className="features-grid-detailed">
              <div className="feature-card-openai">
                <div className="feature-icon-openai">
                  <i className="fas fa-highlighter"></i>
                </div>
                <div className="feature-content-openai">
                  <h3>Smart Highlighting</h3>
                  <p>Highlight and categorize specific parts of LLM responses with custom labels and categories.</p>
                  <ul className="feature-list-openai">
                    <li>Custom label creation</li>
                    <li>Hierarchical categorization</li>
                    <li>Bulk annotation tools</li>
                    <li>Keyboard shortcuts</li>
                  </ul>
                </div>
              </div>

              <div className="feature-card-openai">
                <div className="feature-icon-openai">
                  <i className="fas fa-comments"></i>
                </div>
                <div className="feature-content-openai">
                  <h3>Conversation Analysis</h3>
                  <p>Deep dive into conversation patterns and model behavior with advanced analytics.</p>
                  <ul className="feature-list-openai">
                    <li>Response time analysis</li>
                    <li>Context retention metrics</li>
                    <li>Topic drift detection</li>
                    <li>Sentiment tracking</li>
                  </ul>
                </div>
              </div>

              <div className="feature-card-openai">
                <div className="feature-icon-openai">
                  <i className="fas fa-chart-line"></i>
                </div>
                <div className="feature-content-openai">
                  <h3>Performance Metrics</h3>
                  <p>Track and visualize your model's performance across different dimensions.</p>
                  <ul className="feature-list-openai">
                    <li>Accuracy metrics</li>
                    <li>Response consistency</li>
                    <li>Custom KPI tracking</li>
                    <li>Trend analysis</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Project Organization Section */}
          <div className="features-section collaboration-section" style={{ 
            marginTop: '120px',
            paddingBottom: '80px',
            borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '80px',
              alignItems: 'center'
            }}>
              {/* Text Content */}
              <div className="feature-content-openai" style={{ maxWidth: '560px' }}>
                <h2 style={{ 
                  fontSize: '2.5rem', 
                  marginBottom: '24px',
                  color: '#202123',
                  letterSpacing: '-0.03em',
                  lineHeight: '1.2',
                  fontWeight: '600'
                }}>
                  Organize and Access Your Conversations Using Separated Projects
                </h2>
                <p style={{ 
                  fontSize: '1.125rem',
                  lineHeight: '1.6',
                  color: '#353740',
                  marginBottom: '32px',
                  opacity: '0.9'
                }}>
                  Stay organized by creating individual projects for each set of annotations. Each project keeps its own notes, history, comments, and highlights, allowing for easy access and management of your work.
                </p>
                <div className="feature-list-container" style={{ 
                  display: 'grid',
                  gap: '24px',
                  marginTop: '40px'
                }}>
                  <div className="feature-item" style={{
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'flex-start'
                  }}>
                    <span style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: 'rgba(148, 163, 184, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-color)',
                      fontSize: '1rem',
                      flexShrink: 0
                    }}>
                      <i className="fas fa-folder-open"></i>
                    </span>
                    <div>
                      <h4 style={{ 
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        color: '#202123',
                        marginBottom: '8px'
                      }}>
                      Organized Workspaces
                    </h4>
                      <p style={{ fontSize: '1rem', color: '#6e6e80', lineHeight: '1.6' }}>
                      Create projects to keep related annotations, feedback, and notes together in one place.
                    </p>
                    </div>
                  </div>
                  <div className="feature-item" style={{
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'flex-start'
                  }}>
                    <span style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: 'rgba(148, 163, 184, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-color)',
                      fontSize: '1rem',
                      flexShrink: 0
                    }}>
                      <i className="fas fa-sliders-h"></i>
                    </span>
                    <div>
                      <h4 style={{ 
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        color: '#202123',
                        marginBottom: '8px'
                      }}>
                      Tailored Projects
                    </h4>
                      <p style={{ fontSize: '1rem', color: '#6e6e80', lineHeight: '1.6' }}>
                      Customize each project to fit your specific needs, making it easier to stay focused and efficient.
                    </p>
                    </div>
                  </div>
                  <div className="feature-item" style={{
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'flex-start'
                  }}>
                    <span style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: 'rgba(148, 163, 184, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-color)',
                      fontSize: '1rem',
                      flexShrink: 0
                    }}>
                      <i className="fas fa-history"></i>
                    </span>
                    <div>
                      <h4 style={{ 
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        color: '#202123',
                        marginBottom: '8px'
                      }}>
                      Annotation History
                    </h4>
                      <p style={{ fontSize: '1rem', color: '#6e6e80', lineHeight: '1.6' }}>
                      Track every change and update within each project, so you can see how things have evolved over time.
                    </p>
                    </div>
                  </div>
                  <div className="feature-item" style={{
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'flex-start'
                  }}>
                    <span style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: 'rgba(148, 163, 184, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-color)',
                      fontSize: '1rem',
                      flexShrink: 0
                    }}>
                      <i className="fas fa-comment-dots"></i>
                    </span>
                    <div>
                      <h4 style={{ 
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        color: '#202123',
                        marginBottom: '8px'
                      }}>
                      Comments and Highlights
                    </h4>
                      <p style={{ fontSize: '1rem', color: '#6e6e80', lineHeight: '1.6' }}>
                      Leave comments and highlights specific to each project, helping you keep your thoughts clear and organized.
                    </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div style={{ 
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                background: '#fff',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}>
                <img 
                  src="/src/images/pic3.png" 
                  alt="Project organization interface"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    borderRadius: '16px'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to bottom, rgba(255,255,255,0) 80%, rgba(255,255,255,0.1))',
                  pointerEvents: 'none',
                  borderRadius: '16px'
                }}></div>
              </div>
            </div>
          </div>

          {/* Real-Time Collaboration Section */}
          <div className="features-section collaboration-section" style={{ 
            marginTop: '120px',
            paddingBottom: '80px',
            borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '80px',
              alignItems: 'center'
            }}>
              {/* Text Content */}
              <div className="feature-content-openai" style={{ maxWidth: '560px' }}>
                <h2 style={{ 
                  fontSize: '2.5rem', 
                  marginBottom: '24px',
                  color: '#202123',
                  letterSpacing: '-0.03em',
                  lineHeight: '1.2',
                  fontWeight: '600'
                }}>
                  Real-Time Collaboration with AI-Powered Insights
                </h2>
                <p style={{ 
                  fontSize: '1.125rem',
                  lineHeight: '1.6',
                  color: '#353740',
                  marginBottom: '32px',
                  opacity: '0.9'
                }}>
                  Enhance your annotation workflow with role-based collaboration, enabling multiple users to discuss, suggest, and refine labels, codes, and notes in real time. Designed for efficiency, this feature streamlines the decision-making process and improves annotation quality.
                </p>
                <div className="feature-list-container" style={{ 
                  display: 'grid',
                  gap: '24px',
                  marginTop: '40px'
                }}>
                  <div className="feature-item" style={{
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'flex-start'
                  }}>
                    <span style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: 'rgba(148, 163, 184, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-color)',
                      fontSize: '1rem',
                      flexShrink: 0
                    }}>
                      <i className="fas fa-users"></i>
                    </span>
                    <div>
                      <h4 style={{ 
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        color: '#202123',
                        marginBottom: '8px'
                      }}>
                      Role-Based Access
                    </h4>
                      <p style={{ fontSize: '1rem', color: '#6e6e80', lineHeight: '1.6' }}>
                      Assign roles such as Admin, Reviewer, or Contributor to manage permissions for suggesting, editing, and approving annotations.
                    </p>
                    </div>
                  </div>
                  <div className="feature-item" style={{
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'flex-start'
                  }}>
                    <span style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: 'rgba(148, 163, 184, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-color)',
                      fontSize: '1rem',
                      flexShrink: 0
                    }}>
                      <i className="fas fa-comments"></i>
                    </span>
                    <div>
                      <h4 style={{ 
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        color: '#202123',
                        marginBottom: '8px'
                      }}>
                      Live Discussions
                    </h4>
                      <p style={{ fontSize: '1rem', color: '#6e6e80', lineHeight: '1.6' }}>
                      Team members can add comments and provide feedback directly within the annotation process.
                    </p>
                    </div>
                  </div>
                  <div className="feature-item" style={{
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'flex-start'
                  }}>
                    <span style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: 'rgba(148, 163, 184, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-color)',
                      fontSize: '1rem',
                      flexShrink: 0
                    }}>
                      <i className="fas fa-robot"></i>
                    </span>
                    <div>
                      <h4 style={{ 
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        color: '#202123',
                        marginBottom: '8px'
                      }}>
                      AI-Powered Suggestions
                    </h4>
                      <p style={{ fontSize: '1rem', color: '#6e6e80', lineHeight: '1.6' }}>
                      Generate smart label recommendations and message refinements with a single click.
                    </p>
                    </div>
                  </div>
                  <div className="feature-item" style={{
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'flex-start'
                  }}>
                    <span style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: 'rgba(148, 163, 184, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-color)',
                      fontSize: '1rem',
                      flexShrink: 0
                    }}>
                      <i className="fas fa-check-circle"></i>
                    </span>
                    <div>
                      <h4 style={{ 
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        color: '#202123',
                        marginBottom: '8px'
                      }}>
                      Instant Approval Workflow
                    </h4>
                      <p style={{ fontSize: '1rem', color: '#6e6e80', lineHeight: '1.6' }}>
                      Easily review, approve, or modify suggestions for seamless annotation management.
                    </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div style={{ 
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                background: '#fff',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}>
                <img 
                  src="/src/images/pic1.png" 
                  alt="Real-time collaboration interface"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    borderRadius: '16px'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to bottom, rgba(255,255,255,0) 80%, rgba(255,255,255,0.1))',
                  pointerEvents: 'none',
                  borderRadius: '16px'
                }}></div>
              </div>
            </div>
          </div>

          {/* Manual Logging Section */}
          <div className="features-section collaboration-section" style={{ 
            marginTop: '120px',
            paddingBottom: '80px',
            borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '80px',
              alignItems: 'center'
            }}>
              {/* Text Content */}
              <div className="feature-content-openai" style={{ maxWidth: '560px' }}>
                <h2 style={{ 
                  fontSize: '2.5rem', 
                  marginBottom: '24px',
                  color: '#202123',
                  letterSpacing: '-0.03em',
                  lineHeight: '1.2',
                  fontWeight: '600'
                }}>
                  Manual Logging: Capture and Annotate Key Interactions
                </h2>
                <p style={{ 
                  fontSize: '1.125rem',
                  lineHeight: '1.6',
                  color: '#353740',
                  marginBottom: '32px',
                  opacity: '0.9'
                }}>
                  Some interactions may not be automatically recorded, but they are still essential for analysis. Manual Logging enables users to capture screenshots of conversations or text and manually annotate them, ensuring no critical insights are overlooked.
                </p>
                <div className="feature-list-container" style={{ 
                  display: 'grid',
                  gap: '24px',
                  marginTop: '40px'
                }}>
                  <div className="feature-item" style={{
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'flex-start'
                  }}>
                    <span style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: 'rgba(148, 163, 184, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-color)',
                      fontSize: '1rem',
                      flexShrink: 0
                    }}>
                      <i className="fas fa-tags"></i>
                    </span>
                    <div>
                      <h4 style={{ 
                        fontSize: '1.125rem',
                      fontWeight: '600',
                      color: '#202123',
                        marginBottom: '8px'
                      }}>
                        Customizable Annotations
                      </h4>
                      <p style={{ fontSize: '1rem', color: '#6e6e80', lineHeight: '1.6' }}>
                        Add labels, notes, and codes to any manually captured text.
                      </p>
                    </div>
                  </div>
                  <div className="feature-item" style={{
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'flex-start'
                  }}>
                    <span style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: 'rgba(148, 163, 184, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-color)',
                      fontSize: '1rem',
                      flexShrink: 0
                    }}>
                      <i className="fas fa-clipboard-list"></i>
                    </span>
                    <div>
                      <h4 style={{ 
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        color: '#202123',
                        marginBottom: '8px'
                      }}>
                        Detailed Documentation
                      </h4>
                      <p style={{ fontSize: '1rem', color: '#6e6e80', lineHeight: '1.6' }}>
                        Maintain a structured record of key discussions and decisions.
                      </p>
                    </div>
                  </div>
                  <div className="feature-item" style={{
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'flex-start'
                    }}>
                      <span style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                        background: 'rgba(148, 163, 184, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--accent-color)',
                      fontSize: '1rem',
                      flexShrink: 0
                    }}>
                      <i className="fas fa-sync-alt"></i>
                    </span>
                    <div>
                      <h4 style={{ 
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        color: '#202123',
                        marginBottom: '8px'
                      }}>
                        Seamless Review Process
                    </h4>
                      <p style={{ fontSize: '1rem', color: '#6e6e80', lineHeight: '1.6' }}>
                        Easily reference past interactions for improved collaboration and training.
                    </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div style={{ 
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                background: '#fff',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}>
                <img 
                  src="/src/images/pic4.png" 
                  alt="Manual logging interface"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    borderRadius: '16px'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to bottom, rgba(255,255,255,0) 80%, rgba(255,255,255,0.1))',
                  pointerEvents: 'none',
                  borderRadius: '16px'
                }}></div>
              </div>
            </div>
          </div>

          {/* Data Import & Export Section */}
          <div className="features-section collaboration-section" style={{ 
            marginTop: '120px',
            paddingBottom: '80px',
            borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '80px',
              alignItems: 'center'
            }}>
              {/* Text Content */}
              <div className="feature-content-openai" style={{ maxWidth: '560px' }}>
                <h2 style={{ 
                  fontSize: '2.5rem', 
                  marginBottom: '24px',
                  color: '#202123',
                  letterSpacing: '-0.03em',
                  lineHeight: '1.2',
                  fontWeight: '600'
                }}>
                  Effortless Data Import & Export
                </h2>
                <p style={{ 
                  fontSize: '1.125rem',
                  lineHeight: '1.6',
                  color: '#353740',
                  marginBottom: '32px',
                  opacity: '0.9'
                }}>
                  Seamlessly manage your annotation history with flexible import and export options. Whether you're collaborating with a team or integrating annotations into your workflows, our system ensures smooth data handling.
                </p>
                <div className="feature-list-container" style={{ 
                  display: 'grid',
                  gap: '24px',
                  marginTop: '40px'
                }}>
                  <div className="feature-item" style={{
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'flex-start'
                  }}>
                    <span style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: 'rgba(148, 163, 184, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-color)',
                      fontSize: '1rem',
                      flexShrink: 0
                    }}>
                      <i className="fas fa-file-export"></i>
                    </span>
                    <div>
                      <h4 style={{ 
                        fontSize: '1.125rem',
                      fontWeight: '600',
                      color: '#202123',
                        marginBottom: '8px'
                      }}>
                        Export with Ease
                      </h4>
                      <p style={{ fontSize: '1rem', color: '#6e6e80', lineHeight: '1.6' }}>
                        Download your annotation history as a structured JSON file for backup, sharing, or further processing.
                      </p>
                    </div>
                  </div>
                  <div className="feature-item" style={{
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'flex-start'
                  }}>
                    <span style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: 'rgba(148, 163, 184, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-color)',
                      fontSize: '1rem',
                      flexShrink: 0
                    }}>
                      <i className="fas fa-share-alt"></i>
                    </span>
                    <div>
                      <h4 style={{ 
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        color: '#202123',
                        marginBottom: '8px'
                      }}>
                        Multiple Transfer Options
                      </h4>
                      <p style={{ fontSize: '1rem', color: '#6e6e80', lineHeight: '1.6' }}>
                        Get your JSON file via QR code, email, or direct copy, making it easy to share and migrate data.
                      </p>
                    </div>
                  </div>
                  <div className="feature-item" style={{
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'flex-start'
                    }}>
                      <span style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                        background: 'rgba(148, 163, 184, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--accent-color)',
                      fontSize: '1rem',
                      flexShrink: 0
                    }}>
                      <i className="fas fa-file-import"></i>
                    </span>
                    <div>
                      <h4 style={{ 
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        color: '#202123',
                        marginBottom: '8px'
                      }}>
                        Simple Importing
                    </h4>
                      <p style={{ fontSize: '1rem', color: '#6e6e80', lineHeight: '1.6' }}>
                        Re-upload your JSON file to restore annotations instantly, ensuring continuity and efficiency.
                    </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div style={{ 
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                background: '#fff',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}>
                <img 
                  src="/src/images/pic5.png" 
                  alt="Data import and export interface"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    borderRadius: '16px'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to bottom, rgba(255,255,255,0) 80%, rgba(255,255,255,0.1))',
                  pointerEvents: 'none',
                  borderRadius: '16px'
                }}></div>
              </div>
            </div>
          </div>

          {/* Track & Share Section */}
          <div className="features-section collaboration-section" style={{ 
            marginTop: '120px',
            paddingBottom: '80px'
          }}>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '80px',
              alignItems: 'center'
            }}>
              {/* Text Content */}
              <div className="feature-content-openai" style={{ maxWidth: '560px' }}>
                <h2 style={{ 
                  fontSize: '2.5rem', 
                  marginBottom: '24px',
                      color: '#202123',
                  letterSpacing: '-0.03em',
                  lineHeight: '1.2',
                  fontWeight: '600'
                }}>
                  Track & Share Your Annotations with Ease
                </h2>
                <p style={{ 
                  fontSize: '1.125rem',
                  lineHeight: '1.6',
                  color: '#353740',
                  marginBottom: '32px',
                  opacity: '0.9'
                }}>
                  Stay on top of your work with interactive graphs that help you understand your annotation patterns. Whether you're analyzing trends or sharing insights, this feature makes it simple.
                </p>
                <div className="feature-list-container" style={{ 
                  display: 'grid',
                  gap: '24px',
                  marginTop: '40px'
                }}>
                  <div className="feature-item" style={{
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'flex-start'
                  }}>
                    <span style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: 'rgba(148, 163, 184, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-color)',
                      fontSize: '1rem',
                      flexShrink: 0
                    }}>
                      <i className="fas fa-chart-bar"></i>
                    </span>
                    <div>
                      <h4 style={{ 
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        color: '#202123',
                        marginBottom: '8px'
                      }}>
                        See Your Progress
                      </h4>
                      <p style={{ fontSize: '1rem', color: '#6e6e80', lineHeight: '1.6' }}>
                        Get a visual breakdown of your labels and codes, making it easier to track how your annotations evolve over time.
                      </p>
                    </div>
                  </div>
                  <div className="feature-item" style={{
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'flex-start'
                    }}>
                      <span style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                        background: 'rgba(148, 163, 184, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--accent-color)',
                      fontSize: '1rem',
                      flexShrink: 0
                    }}>
                      <i className="fas fa-share"></i>
                    </span>
                    <div>
                      <h4 style={{ 
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        color: '#202123',
                        marginBottom: '8px'
                      }}>
                        Effortless Sharing
                    </h4>
                      <p style={{ fontSize: '1rem', color: '#6e6e80', lineHeight: '1.6' }}>
                        Instantly create a view-only link to share your entire annotation history. Anyone with the link can explore and filter your annotations—no edits, just insights.
                    </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div style={{ 
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                background: '#fff',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}>
                <img 
                  src="/src/images/pic7.png" 
                  alt="Annotation tracking and sharing interface"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    borderRadius: '16px'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to bottom, rgba(255,255,255,0) 80%, rgba(255,255,255,0.1))',
                  pointerEvents: 'none',
                  borderRadius: '16px'
                }}></div>
              </div>
            </div>
          </div>

      {/* Call to Action */}
      <section className="features-cta" style={{ background: 'transparent' }}>
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Enhance Your LLM?</h2>
            <p>Start improving your model's performance today with our comprehensive toolkit.</p>
            <div className="cta-buttons">
              <a href="#" className="btn btn-primary btn-large">
                <i className="fas fa-rocket"></i>
                Get Started
              </a>
              <a href="#" className="btn btn-secondary btn-large">
                <i className="fas fa-calendar"></i>
                Schedule Demo
              </a>
            </div>
          </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
} 