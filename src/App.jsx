import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AboutPage from './components/AboutPage';
import Contact from './components/Contact';
import ServicesPage from './components/ServicesPage';
import Articles from './components/Articles';
import ArticleDetail from './components/ArticleDetail';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import FloatingControls from './components/FloatingControls';
import FloatingContactButtons from './components/FloatingContactButtons';
import TopBar from './components/TopBar';
import ServiceDetail from './components/ServiceDetail';
import CanonicalTag from './components/CanonicalTag';
import ThankYou from './components/ThankYou';
import { HelmetProvider } from 'react-helmet-async';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 20, color: 'red', border: '2px solid red', margin: 20 }}>
          <h1>Something went wrong.</h1>
          <pre>{this.state.error?.toString()}</pre>
          <p>Check console for more details.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <Router>
          <div className="min-h-screen bg-white font-sans text-gray-800">
            <CanonicalTag />
            <TopBar />
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:id" element={<ServiceDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/articles/:id" element={<ArticleDetail />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/thank-you" element={<ThankYou />} />
            </Routes>
            <Footer />
            <FloatingContactButtons />
          </div>
        </Router>
      </ErrorBoundary>
    </HelmetProvider>
  );
}





export default App;

