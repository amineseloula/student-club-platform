import Navbar from './components/layout/Navbar';
import LandingPage from './pages/LandingPage/LandingPage';
import Footer from './components/layout/Footer';
import './styles/App.css';

function App() {
  return (
    <div className="app-layout">
      {/* ── Sticky Navbar with Language/RTL switch & Mobile Menu ── */}
      <Navbar />

      {/* ── Landing Page Content ── */}
      <main className="landing-main">
        <LandingPage />
      </main>

      {/* ── Platform Footer ── */}
      <Footer />
    </div>
  );
}

export default App;
