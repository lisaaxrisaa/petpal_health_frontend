import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import Home from '../pages/Home';
import RegisterForm from '../components/RegisterForm';
import PetDetailsPage from '../components/PetDetailsPage';
import HealthLogDetails from '../components/HealthLogDetails';
import EditHealthLogForm from '../components/EditHealthLogForm';
import HealthLogForm from '../components/HealthLogForm';
import PetEditForm from '../components/PetEditForm';
import MedicationForm from '../components/MedicationForm';
import MedicationDetails from '../components/MedicationDetails';
import InsuranceForm from '../components/InsuranceForm';
import InsuranceDetails from '../components/InsuranceDetails';
import FoodForm from '../components/FoodForm';
import FoodDetails from '../components/FoodDetails';
import VaccineForm from '../components/VaccineForm';
import VaccineDetails from '../components/VaccineDetails';

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
          <Route path="/pets/:petId/edit" element={<PetEditForm />} />
          <Route path="/pets/:petId/logs/new" element={<HealthLogForm />} />
          <Route path="/pets/:petId/medications/new" element={<MedicationForm />} />
          <Route path="/pets/:petId/insurance/new" element={<InsuranceForm />} />
          <Route path="/pets/:petId/insurance/:insuranceId/edit" element={<InsuranceForm isEdit={true} />} />
          <Route path="/pets/:petId/food/new" element={<FoodForm />} />
          <Route path="/pets/:petId/food/:foodEntryId/edit" element={<FoodForm isEdit={true} />} />
          <Route path="/pets/:petId/vaccines/new" element={<VaccineForm />} />
          <Route path="/pets/:petId/vaccines/:vaccineId/edit" element={<VaccineForm isEdit={true} />} />
          <Route path="/logs/:logId" element={<HealthLogDetails />} />
          <Route path="/logs/:logId/edit" element={<EditHealthLogForm />} />
          <Route path="/medications/:medicationId" element={<MedicationDetails />} />
          <Route path="/pets/:petId/insurance/:insuranceId" element={<InsuranceDetails />} />
          <Route path="/pets/:petId/food/:foodEntryId" element={<FoodDetails />} />
          <Route path="/pets/:petId/vaccines/:vaccineId" element={<VaccineDetails />} />
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
