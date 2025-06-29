import { useParams } from 'react-router-dom';
import { useGetUserPetsQuery } from '../src/features/pets/petsSlice';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import HealthLogForm from './HealthLogForm';
import HealthLogList from './HealthLogList';
import PetProfileCard from './PetProfileCard';

export default function PetDetailsPage() {
  const { petId } = useParams();
  const { data: pets = [] } = useGetUserPetsQuery();
  const pet = pets.find((p) => p.id === Number(petId));
  const [showForm, setShowForm] = useState(false);

  if (!pet) return <p>Pet not found</p>;

  return (
    <div>
      <PetProfileCard pet={pet} />

      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Hide' : 'Add'} Health Log
      </button>

      {showForm && (
        <HealthLogForm defaultPetId={pet.id} defaultPetName={pet.name} />
      )}

      <Link to={`/pets/${pet.id}/logs`}>
        <button>View Health Logs</button>
      </Link>
    </div>
  );
}
