import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Category from './pages/Category';
import ProductDetail from './pages/ProductDetail';
import Favorites from './pages/Favorites';
import Colors from './pages/Colors';

function App() {
  return (
    <LanguageProvider>
      <FavoritesProvider>
        <Router>
          <div className="App">
            <Header />
            <main style={{ minHeight: 'calc(100vh - 200px)' }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/colors" element={<Colors />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/:category/:productName" element={<ProductDetail />} />
                <Route path="/:category" element={<Category />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </FavoritesProvider>
    </LanguageProvider>
  );
}

export default App;

