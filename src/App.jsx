// import './App.css';

import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Features from './components/Features';
import About from './components/About';
import BestNetwork from './components/BestNetwork';
import LiveSports from './components/LiveSports';
import Brands from './components/Brands';
import Pricing from './components/Pricing';
import CtaSection from './components/CtaSection';
import Faq from './components/Faq';
import Footer from './components/Footer';

function App() {
  return (
    <div className="font-sans">
      <Navbar />
      <Banner />
      <Features />
      <About />
      <BestNetwork />
      <LiveSports />
      <Brands />
      <Pricing />
      <CtaSection />
      <Faq />
      <Footer />
    </div>
  );
}

export default App;
