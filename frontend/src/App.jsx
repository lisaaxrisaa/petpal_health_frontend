import { useState, useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import Home from '../pages/Home';

function App() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
    setLoading(false);
  }, []);

  const handleLogin = () => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  };

  if (loading) return <p>Loading...</p>;

  return token ? <Home /> : <LoginForm onLogin={handleLogin} />;
}

export default App;
