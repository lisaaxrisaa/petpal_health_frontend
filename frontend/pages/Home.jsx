import { useState } from 'react';
import '../css/Home.css';
import HealthLogForm from '../components/HealthLogForm';
import HealthLogList from '../components/HealthLogList';
import PetForm from '../components/PetForm';
import LogoutButton from '../components/Logout';
import PetList from '../components/PetList';

export default function Home({ onLogout }) {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedPet, setSelectedPet] = useState(null);

  const handleSelectPet = (pet) => {
    setSelectedPet(pet);
    setActiveTab('logs');
  };

  const handleBackToPets = () => {
    setSelectedPet(null);
    setActiveTab('home');
  };

  return (
    <>
      <div className="home-page-root">
        <div className="home-content-container">
          <h1 className="home-main-title">Welcome to PetPal Health 🐾</h1>

          <div className="home-nav-container">
            <button
              onClick={() => setActiveTab('home')}
              className="home-nav-btn home-nav-btn-primary"
            >
              My Pets
            </button>
            <button
              onClick={() => setActiveTab('addPet')}
              className="home-nav-btn home-nav-btn-primary"
            >
              Add Pet
            </button>
            <button
              onClick={onLogout}
              className="home-nav-btn home-nav-btn-logout"
            >
              Logout
            </button>
          </div>

          {activeTab === 'home' && !selectedPet && (
            <div className="home-pets-list-container">
              <PetList onSelectPet={handleSelectPet} />
            </div>
          )}

          {activeTab === 'addPet' && (
            <PetForm onPetCreated={() => setActiveTab('home')} />
          )}

          {activeTab === 'logs' && selectedPet && (
            <>
              <h2>Health Logs for {selectedPet.name}</h2>
              <button onClick={handleBackToPets}>← Back to Pets</button>
              <HealthLogForm pet={selectedPet} />
              <HealthLogList petId={selectedPet.id} />
            </>
          )}
        </div>
      </div>
    </>
  );
}
