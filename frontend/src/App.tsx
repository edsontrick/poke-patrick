import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { PokemonDetailPage } from './pages/PokemonDetailPage/PokemonDetailPage';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { LoginRoute } from './components/LoginRoute/LoginRoute';
import './styles/globals.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginRoute />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pokemon/:id"
          element={
            <ProtectedRoute>
              <PokemonDetailPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
