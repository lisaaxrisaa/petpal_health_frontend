import { useParams, useNavigate } from 'react-router-dom';
import { useGetUserPetsQuery } from '../src/features/pets/petsSlice';
import { useState } from 'react';
import HealthLogList from './HealthLogList';
import PetProfileCard from './PetProfileCard';
import '../css/PetDetailsPage.css';

export default function PetDetailsPage() {
  const { petId } = useParams();
  const navigate = useNavigate();
  const { data: pets = [] } = useGetUserPetsQuery();
  const pet = pets.find((p) => p.id === Number(petId));
  const [activeTab, setActiveTab] = useState('healthLogs');

  if (!pet) return <p>Pet not found</p>;

  const tabs = [
    { id: 'healthLogs', label: 'Health Logs' },
    { id: 'medications', label: 'Medications' },
    { id: 'insurance', label: 'Insurance' },
    { id: 'general', label: 'General Info' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'healthLogs':
        return (
          <div className="petdetails-tab-content">
            <div className="petdetails-tab-header">
              <h2>Health Logs</h2>
              <button
                onClick={() => navigate(`/pets/${petId}/logs/new`)}
                className="petdetails-add-btn"
              >
                + Add Health Log
              </button>
            </div>
            
            <div className="petdetails-list-section">
              <HealthLogList petId={pet.id} />
            </div>
          </div>
        );
      case 'medications':
        return (
          <div className="petdetails-tab-content">
            <div className="petdetails-tab-header">
              <h2>Medications</h2>
              <button className="petdetails-add-btn">
                + Add Medication
              </button>
            </div>
            <p>Medications feature coming soon...</p>
          </div>
        );
      case 'insurance':
        return (
          <div className="petdetails-tab-content">
            <div className="petdetails-tab-header">
              <h2>Insurance</h2>
              <button className="petdetails-add-btn">
                + Add Insurance
              </button>
            </div>
            <p>Insurance feature coming soon...</p>
          </div>
        );
      case 'general':
        return (
          <div className="petdetails-tab-content">
            <div className="petdetails-tab-header">
              <h2>General Information</h2>
            </div>
            <PetProfileCard pet={pet} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="petdetails-page-root">
        <div className="petdetails-layout-container">
          <div className="petdetails-header">
            <button 
              onClick={() => navigate('/')} 
              className="petdetails-back-home-btn"
            >
              ← Back to Home
            </button>
          </div>

          <div className="petdetails-main-layout">
            <div className="petdetails-sidebar">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`petdetails-tab ${activeTab === tab.id ? 'active' : ''}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="petdetails-content">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
