import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Global layout components
import Navbar from './components/Navbar';
import TopBar from './components/TopBar';
import Footer from './components/Footer';
import FloatingContactButtons from './components/FloatingContactButtons';
import TrailingSlashRedirect from './components/ui/TrailingSlashRedirect';
import CanonicalTag from './components/CanonicalTag';
import SEOWrapper from './components/SEOWrapper';
import HtmlSitemap from './components/HtmlSitemap';

// Lazy loaded page components
const Home = React.lazy(() => import('./components/Home'));
const AboutPage = React.lazy(() => import('./components/AboutPage'));
const Contact = React.lazy(() => import('./components/Contact'));
const PhysiotherapyHomeService = React.lazy(() => import('./components/PhysiotherapyHomeService'));
const ServicesPage = React.lazy(() => import('./components/ServicesPage'));
const ServiceDetail = React.lazy(() => import('./components/ServiceDetail'));
const Articles = React.lazy(() => import('./components/Articles'));
const ArticleDetail = React.lazy(() => import('./components/ArticleDetail'));
const Gallery = React.lazy(() => import('./components/Gallery'));
const ThankYou = React.lazy(() => import('./components/ThankYou'));
const SocialLinksPage = React.lazy(() => import('./components/SocialLinksPage'));
const Login = React.lazy(() => import('./components/Login'));
const NotFound = React.lazy(() => import('./components/NotFound'));
const DashboardLayout = React.lazy(() => import('./components/dashboard/DashboardLayout'));
const DashboardHome = React.lazy(() => import('./components/dashboard/DashboardHome'));
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
          <SEOWrapper>
            <div className="min-h-screen bg-white font-sans text-gray-800">
              <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center text-primary-600 font-bold">Loading...</div>}>
                <Routes>
                  {/* Standalone Social Media Page (No Navbar/Footer) */}
                  <Route path="/social-media" element={<SocialLinksPage />} />

                  {/* Dashboard Routes (Custom Layout) */}
                  <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<DashboardHome />} />
                    <Route path="articles" element={<div className="p-8 text-slate-500">Articles Management Comming Soon...</div>} />
                    <Route path="services" element={<div className="p-8 text-slate-500">Services Management Comming Soon...</div>} />
                    <Route path="settings" element={<div className="p-8 text-slate-500">Settings Comming Soon...</div>} />
                  </Route>

                  {/* Main App Routes with Header/Footer */}
                  <Route path="*" element={
                    <>
                      <TopBar />
                      <Navbar />
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/services" element={<ServicesPage />} />
                        <Route path="/services/physiotherapy-home-services" element={<PhysiotherapyHomeService />} />
                        <Route path="/services/:id" element={<ServiceDetail />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/blog" element={<Articles />} />
                        <Route path="/blog/:id" element={<ArticleDetail />} />
                        <Route path="/gallery" element={<Gallery />} />
                        <Route path="/thank-you" element={<ThankYou />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/sitemap" element={<HtmlSitemap />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                      <Footer />
                      <FloatingContactButtons />
                    </>
                  } />
                </Routes>
              </React.Suspense>
            </div>
          </SEOWrapper>
        </Router>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;

