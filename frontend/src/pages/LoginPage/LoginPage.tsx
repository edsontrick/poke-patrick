import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, setToken } from '../../services/auth';
import { Logo } from '../../components/Logo/Logo';
import './LoginPage.css';

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await login({ username, password });
      setToken(response.token);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <header className="login-page__header">
        <div className="login-page__header-content">
          <div className="login-page__logo">
            <Logo size={48} showText={true} />
          </div>
          <p className="login-page__subtitle">Sign in to continue</p>
        </div>
      </header>
      <div className="login-page__container">
        <form className="login-page__form" onSubmit={handleSubmit}>
          {error && <div className="login-page__error">{error}</div>}
          
          <div className="login-page__field">
            <label htmlFor="username" className="login-page__label">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="login-page__input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              required
              disabled={loading}
            />
          </div>

          <div className="login-page__field">
            <label htmlFor="password" className="login-page__label">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="login-page__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="login-page__button"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
};

