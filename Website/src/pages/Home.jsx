import { useEffect } from 'react';
import Hero from '../components/Hero';
import Platforms from '../components/Platforms';
import Demonstration from '../components/Demonstration';

export default function Home() {
  useEffect(() => {
    // Intersection Observer for demo sections
    const demoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        } else {
          entry.target.classList.remove('fade-in');
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '-10% 0px'
    });

    // Observe all demo sections
    document.querySelectorAll('.demo-section').forEach(section => {
      demoObserver.observe(section);
    });

    return () => {
      document.querySelectorAll('.demo-section').forEach(section => {
        demoObserver.unobserve(section);
      });
    };
  }, []);

  return (
    <main style={{ 
      background: 'linear-gradient(to bottom,rgb(255, 255, 255), #f5f5f7 50%, #FAF9F6)'
    }}>
      <Hero />
      <Platforms />
      <Demonstration />
    </main>
  );
} 