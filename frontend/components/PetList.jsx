import { useGetUserPetsQuery } from '../src/features/pets/petsSlice';
import { Link } from 'react-router-dom';
import '../css/PetList.css';

export default function PetList({ onSelectPet }) {
  const { data: pets = [], isLoading, error } = useGetUserPetsQuery();

  if (isLoading) return <p>Loading pets...</p>;
  if (error) return <p>Error fetching pets</p>;

  return (
    <div className="petlist-container">
      <h2 className="petlist-title">Your Pets</h2>
      <div className="petlist-grid">
        {pets.map((pet) => (
          <div key={pet.id} className="petlist-card">
            <div className="petlist-info">
              <h3 className="petlist-pet-name">{pet.name}</h3>
              <p className="petlist-pet-species">{pet.species}</p>
            </div>
            <Link to={`/pets/${pet.id}`} className="petlist-link">
              <button className="petlist-details-btn">
                View {pet.name}'s Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
