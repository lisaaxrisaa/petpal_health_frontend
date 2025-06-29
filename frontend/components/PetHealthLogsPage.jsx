import { useParams } from 'react-router-dom';
import { useGetUserPetsQuery } from '../src/features/pets/petsSlice';
import HealthLogList from './HealthLogList';

export default function PetHealthLogsPage() {
  const { petId } = useParams();
  const petIdNum = Number(petId);
  const { data: pets = [] } = useGetUserPetsQuery();
  const pet = pets.find((p) => p.id === petIdNum);

  if (!pet) return <p>Pet not found</p>;

  return (
    <div>
      <h2>Health Logs for {pet.name}</h2>
      <HealthLogList petId={pet.id} />
    </div>
  );
}
