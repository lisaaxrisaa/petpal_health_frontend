import { useState } from 'react';
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
    <div>
      <h1>Welcome to PetPal Health 🐾</h1>

      <nav>
        <button onClick={() => setActiveTab('home')}>My Pets</button>
        <button onClick={() => setActiveTab('addPet')}>Add Pet</button>
        <button onClick={onLogout}>Logout</button>
      </nav>

      <hr />

      {activeTab === 'home' && !selectedPet && (
        <PetList onSelectPet={handleSelectPet} />
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
  );
}
