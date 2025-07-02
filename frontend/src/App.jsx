import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import Home from '../pages/Home';
import RegisterForm from '../components/RegisterForm';
import PetDetailsPage from '../components/PetDetailsPage';
import PetHealthLogsPage from '../components/PetHealthLogsPage';
import HealthLogDetails from '../components/HealthLogDetails';
import EditHealthLogForm from '../components/EditHealthLogForm';

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

  if (token) {
    return (
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                onLogout={() => {
                  localStorage.clear();
                  setToken(null);
                }}
              />
            }
          />
          <Route path="/pets/:petId" element={<PetDetailsPage />} />
          <Route path="/pets/:petId/logs" element={<PetHealthLogsPage />} />
          <Route path="/logs/:logId" element={<HealthLogDetails />} />
          <Route path="/logs/:logId/edit" element={<EditHealthLogForm />} />
        </Routes>
      </Router>
    );
  }

  return hasAccount ? (
    <LoginForm
      onLogin={handleAuthSuccess}
      onToggle={() => setHasAccount(false)}
    />
  ) : (
    <RegisterForm onRegister={() => setHasAccount(true)} />
  );
}

export default App;
