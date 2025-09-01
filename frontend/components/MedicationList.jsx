import { useNavigate } from 'react-router-dom';
import { useGetMedicationsByPetIdQuery } from '../src/features/medications/medicationsSlice';
import '../css/MedicationList.css';

export default function MedicationList({ petId }) {
  const navigate = useNavigate();
  const { data: medications = [], isLoading, error } = useGetMedicationsByPetIdQuery(petId);

  if (isLoading) return <p>Loading medications...</p>;
  if (error) return <p>Error loading medications: {error.message}</p>;

  return (
    <>
      {medications.length === 0 ? (
        <div className="medication-empty">
          No medications found for this pet.
        </div>
      ) : (
        <div className="medication-list">
          {medications.map((medication) => (
            <div
              key={medication.id}
              className="medication-card"
              onClick={() => navigate(`/medications/${medication.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <div className="medication-header">
                <div className="medication-name-section">
                  <span className="medication-name">{medication.drugName}</span>
                </div>
                <span className="medication-date">
                  {new Date(medication.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })}
                </span>
              </div>
              
              <div className="medication-details">
                {medication.dosage && (
                  <div className="medication-detail-item">
                    <strong>Dosage:</strong> {medication.dosage}
                  </div>
                )}
                {medication.purpose && (
                  <div className="medication-detail-item">
                    <strong>Purpose:</strong> {medication.purpose}
                  </div>
                )}
                {medication.vetName && (
                  <div className="medication-detail-item">
                    <strong>Prescribed by:</strong> {medication.vetName}
                  </div>
                )}
              </div>

              {medication.duration && (
                <div className="medication-status">
                  <span className="medication-duration">Duration: {medication.duration}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}