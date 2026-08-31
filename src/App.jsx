import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
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

// Page components
import Home from './components/Home';
import AboutPage from './components/AboutPage';
import Contact from './components/Contact';
import PhysiotherapyHomeService from './components/PhysiotherapyHomeService';
import ServicesPage from './components/ServicesPage';
import ServiceDetail from './components/ServiceDetail';
import SubServiceDetail from './components/SubServiceDetail';
import Articles from './components/Articles';
import ArticleDetail from './components/ArticleDetail';
import Gallery from './components/Gallery';
import ThankYou from './components/ThankYou';
import SocialLinksPage from './components/SocialLinksPage';
import Login from './components/Login';
import NotFound from './components/NotFound';
import DashboardLayout from './components/dashboard/DashboardLayout';
import DashboardHome from './components/dashboard/DashboardHome';
import ArticlesManager from './components/dashboard/ArticlesManager';
import ServicesManager from './components/dashboard/ServicesManager';
import SettingsManager from './components/dashboard/SettingsManager';
import ReportAccess from './pages/patient/ReportAccess';
import ReportView from './pages/patient/ReportView';

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

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

import { InitialDataProvider } from './context/InitialDataContext';

function App({ initialData, helmetContext }) {
  return (
    <InitialDataProvider initialData={initialData}>
      <HelmetProvider context={helmetContext}>
        <ErrorBoundary>
          <ScrollToTop />
          <TrailingSlashRedirect />
          <CanonicalTag />
          <SEOWrapper>
            <div className="min-h-screen bg-white font-sans text-gray-800">
              <Routes>
                {/* Standalone Social Media Page (No Navbar/Footer) */}
                <Route path="/social-media" element={<SocialLinksPage />} />

                {/* Dashboard Routes (Custom Layout) */}
                <Route path="/dashboard" element={<DashboardLayout />}>
                  <Route index element={<DashboardHome />} />
                  <Route path="articles" element={<ArticlesManager />} />
                  <Route path="services" element={<ServicesManager />} />
                  <Route path="settings" element={<SettingsManager />} />
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
                      <Route path="/services/physiotherapy" element={<PhysiotherapyHomeService />} />
                      <Route path="/services/test-physiotherapy" element={<PhysiotherapyHomeService />} />
                      <Route path="/services/test-physiotherapy-service" element={<PhysiotherapyHomeService />} />
                      <Route path="/services/physiotherapy-home-services" element={<Navigate to="/services/physiotherapy" replace />} />
                      <Route path="/services/physiotherapy-services" element={<Navigate to="/services/physiotherapy" replace />} />
                      <Route path="/services/Physiotherapy-Services" element={<Navigate to="/services/physiotherapy" replace />} />
                      <Route path="/services/:id" element={<ServiceDetail />} />
                      <Route path="/services/:parent_slug/:sub_slug" element={<SubServiceDetail />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/blog" element={<Articles />} />
                      <Route path="/blog/:id" element={<ArticleDetail />} />
                      <Route path="/gallery" element={<Gallery />} />
                      <Route path="/thank-you" element={<ThankYou />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/report-access" element={<ReportAccess />} />
                      <Route path="/verify-otp" element={<Navigate to="/report-access" replace />} />
                      <Route path="/report" element={<ReportView />} />
                      <Route path="/sitemap" element={<HtmlSitemap />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                    <Footer />
                    <FloatingContactButtons />
                  </>
                } />
              </Routes>
            </div>
          </SEOWrapper>
        </ErrorBoundary>
      </HelmetProvider>
    </InitialDataProvider>
  );
}

export default App;

