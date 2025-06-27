import { useState } from 'react';
import HealthLogForm from '../components/HealthLogForm';
import HealthLogList from '../components/HealthLogList';
import PetForm from '../components/PetForm';

export default function Home() {
  const [activeTab, setActiveTab] = useState('healthLogs');

  return (
    <div>
      <h1>Welcome to PetPal Health 🐾</h1>

      <nav>
        <button onClick={() => setActiveTab('healthLogs')}>Health Logs</button>
        <button onClick={() => setActiveTab('addPet')}>Add Pet</button>
      </nav>

      <hr />

      {activeTab === 'healthLogs' && (
        <>
          <HealthLogForm />
          <HealthLogList />
        </>
      )}

      {activeTab === 'addPet' && <PetForm />}
    </div>
  );
}
