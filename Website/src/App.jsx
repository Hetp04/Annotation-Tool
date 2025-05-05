import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Preloader from './components/Preloader';
import Home from './pages/Home';
import Features from './pages/Features';
import Auth from './pages/Auth';
import Demonstration from './pages/Demonstration';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {loading ? (
        <Preloader />
      ) : (
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/demonstration" element={<Demonstration />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </Layout>
      )}
    </Router>
  );
}

export default App; 