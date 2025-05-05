import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import TimelineNav from './TimelineNav';
import Footer from './Footer';

export default function Layout({ children }) {
  const location = useLocation();

  useEffect(() => {
    // Reset scroll position when route changes
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
    
    // Special handling for demonstration page
    if (location.pathname === '/demonstration') {
      // Make absolutely sure we're at the top for this page
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }

    // Add reveal class to main content
    const mainElement = document.querySelector('main');
    const navbarElement = document.querySelector('.navbar');
    
    if (mainElement) mainElement.classList.add('reveal');
    if (navbarElement) navbarElement.classList.add('reveal');

    // Only setup timeline navigation on home page
    if (location.pathname === '/') {
      const sections = ['hero', 'platforms', 'demonstration'];
      const dots = document.querySelectorAll('.timeline-dot');
      
      const handleScroll = () => {
        const currentScroll = window.scrollY + window.innerHeight / 2;
        
        sections.forEach((section, index) => {
          const element = document.querySelector(`.${section}`);
          if (element) {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
            
            if (isVisible) {
              dots.forEach(dot => dot.classList.remove('active'));
              dots[index].classList.add('active');
            }
          }
        });
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [location]);

  return (
    <>
      <Navbar />
      {location.pathname === '/' && <TimelineNav />}
      {children}
      <Footer />
    </>
  );
} 