import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Global layout components
import Navbar from './components/Navbar';
import TopBar from './components/TopBar';
import Footer from './components/Footer';
import FloatingContactButtons from './components/FloatingContactButtons';
import FAQ from './components/FAQ';
import TrailingSlashRedirect from './components/ui/TrailingSlashRedirect';

// Lazy loaded page components
const Home = React.lazy(() => import('./components/Home'));
const AboutPage = React.lazy(() => import('./components/AboutPage'));
const Contact = React.lazy(() => import('./components/Contact'));
const ServicesPage = React.lazy(() => import('./components/ServicesPage'));
const ServiceDetail = React.lazy(() => import('./components/ServiceDetail'));
const Articles = React.lazy(() => import('./components/Articles'));
const ArticleDetail = React.lazy(() => import('./components/ArticleDetail'));
const Gallery = React.lazy(() => import('./components/Gallery'));
const ThankYou = React.lazy(() => import('./components/ThankYou'));

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
          <TrailingSlashRedirect />
          <div className="min-h-screen bg-white font-sans text-gray-800">
            <TopBar />
            <Navbar />
            <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center text-primary-600 font-bold">Loading...</div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/services/:id" element={<ServiceDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blog" element={<Articles />} />
                <Route path="/blog/:id" element={<ArticleDetail />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/thank-you" element={<ThankYou />} />
              </Routes>
            </React.Suspense>
            <FAQ />
            <Footer />
            <FloatingContactButtons />
          </div>
        </Router>
      </ErrorBoundary>
    </HelmetProvider>
  );
}





export default App;

