import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import LoginForm from '../components/LoginForm';
import Home from '../pages/Home';
import RegisterForm from '../components/RegisterForm';

function App() {
  const [token, setToken] = useState(null);
  const [hasAccount, setHasAccount] = useState(true);
  useEffect(() => {
    const stored = localStorage.getItem('token');
    if (stored) {
      try {
        const { exp } = jwtDecode(stored);
        if (exp * 1000 > Date.now()) setToken(stored);
        else localStorage.removeItem('token');
      } catch {
        localStorage.removeItem('token');
      }
    }
  }, []);

  const handleAuthSuccess = () => {
    setToken(localStorage.getItem('token'));
  };

  if (token)
    return (
      <Home
        onLogout={() => {
          localStorage.clear();
          setToken(null);
        }}
      />
    );

  return hasAccount ? (
    <>
      <LoginForm
        onLogin={handleAuthSuccess}
        onToggle={() => setHasAccount(false)}
      />
    </>
  ) : (
    <>
      <RegisterForm onRegister={() => setHasAccount(true)} />
    </>
  );
}

export default App;
