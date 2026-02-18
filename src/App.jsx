import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AboutPage from './components/AboutPage';
import Contact from './components/Contact';
import Articles from './components/Articles';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import FloatingControls from './components/FloatingControls';
import FloatingContactButtons from './components/FloatingContactButtons';
import TopBar from './components/TopBar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white font-sans text-gray-800">
        <TopBar />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
        <Footer />
        <FloatingControls />
        <FloatingContactButtons />
      </div>
    </Router>
  );
}

export default App;
