import { useGetUserPetsQuery } from '../src/features/pets/petsSlice';
import { Link } from 'react-router-dom';

export default function PetList({ onSelectPet }) {
  const { data: pets = [], isLoading, error } = useGetUserPetsQuery();

  if (isLoading) return <p>Loading pets...</p>;
  if (error) return <p>Error fetching pets</p>;

  return (
    <div>
      <h2>Your Pets</h2>
      <ul>
        {pets.map((pet) => (
          <li key={pet.id}>
            <strong>{pet.name}</strong> ({pet.species})<br />
            <Link to={`/pets/${pet.id}`}>
              <button>View {pet.name}'s Details</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
