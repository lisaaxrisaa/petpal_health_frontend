import '../css/PetProfileCard.css';

export default function PetProfileCard({ pet }) {
  if (!pet) return null;

  return (
    <>
      <div className="pet-profile-card">
        <div className="pet-profile-header">
          <h2 className="pet-profile-name">{pet.name}</h2>
          <div className="pet-profile-species-badge">{pet.species}</div>
        </div>

        <div className="pet-profile-details">
          {pet.breed && (
            <div className="pet-profile-detail-item">
              <span className="pet-profile-detail-label">Breed</span>
              <span className="pet-profile-detail-value">{pet.breed}</span>
            </div>
          )}

          {pet.age !== null && (
            <div className="pet-profile-detail-item">
              <span className="pet-profile-detail-label">Age</span>
              <span className="pet-profile-detail-value">
                {pet.age} {pet.age === 1 ? 'year' : 'years'} old
              </span>
            </div>
          )}

          {pet.weight !== null && (
            <div className="pet-profile-detail-item">
              <span className="pet-profile-detail-label">Weight</span>
              <span className="pet-profile-detail-value">{pet.weight} lbs</span>
            </div>
          )}

          {pet.notes && (
            <div className="pet-profile-detail-item pet-profile-notes">
              <span className="pet-profile-detail-label">Notes</span>
              <span className="pet-profile-detail-value pet-profile-notes-text">
                {pet.notes}
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
