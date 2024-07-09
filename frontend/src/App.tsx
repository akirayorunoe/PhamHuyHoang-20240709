import { Suspense } from 'react';
import CoinsDetail from './pages/CoinDetail';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingFallback from './components/LoadingFallback';
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <div style={{ padding: 16 }}>
      <Router>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/coins/:coinId" element={<CoinsDetail />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
