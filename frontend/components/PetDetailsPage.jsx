import { useParams } from 'react-router-dom';
import { useGetUserPetsQuery } from '../src/features/pets/petsSlice';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import HealthLogForm from './HealthLogForm';
import HealthLogList from './HealthLogList';
import PetProfileCard from './PetProfileCard';
import '../css/PetDetailsPage.css';

export default function PetDetailsPage() {
  const { petId } = useParams();
  const { data: pets = [] } = useGetUserPetsQuery();
  const pet = pets.find((p) => p.id === Number(petId));
  const [showForm, setShowForm] = useState(false);

  if (!pet) return <p>Pet not found</p>;

  return (
    <>
      <div className="petdetails-page-root">
        <div className="petdetails-content-container">
          <div className="petdetails-profile-section">
            <PetProfileCard pet={pet} />
          </div>

          <div className="petdetails-actions-section">
            <button
              onClick={() => setShowForm(!showForm)}
              className="petdetails-toggle-btn"
            >
              {showForm ? 'Hide' : 'Add'} Health Log
            </button>

            <Link to={`/pets/${pet.id}/logs`} className="petdetails-link">
              <button className="petdetails-view-logs-btn">
                View Health Logs
              </button>
            </Link>
          </div>

          {showForm && (
            <div className="petdetails-form-section">
              <HealthLogForm defaultPetId={pet.id} defaultPetName={pet.name} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
