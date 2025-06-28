export default function PetProfileCard({ pet }) {
  if (!pet) return null;

  return (
    <div className="pet-profile-card">
      <h2>{pet.name}</h2>
      <ul>
        <li>
          <strong>Species:</strong> {pet.species}
        </li>
        {pet.breed && (
          <li>
            <strong>Breed:</strong> {pet.breed}
          </li>
        )}
        {pet.age !== null && (
          <li>
            <strong>Age:</strong> {pet.age}
          </li>
        )}
        {pet.weight !== null && (
          <li>
            <strong>Weight:</strong> {pet.weight} lbs
          </li>
        )}
        {pet.notes && (
          <li>
            <strong>Notes:</strong> {pet.notes}
          </li>
        )}
      </ul>
    </div>
  );
}
