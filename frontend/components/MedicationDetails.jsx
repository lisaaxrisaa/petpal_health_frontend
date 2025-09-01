import { useParams, useNavigate } from 'react-router-dom';
import { useGetMedicationByIdQuery, useDeleteMedicationMutation } from '../src/features/medications/medicationsSlice';
import '../css/MedicationDetails.css';

export default function MedicationDetails() {
  const { medicationId } = useParams();
  const navigate = useNavigate();
  const [deleteMedication] = useDeleteMedicationMutation();

  const { data: medication, isLoading, error } = useGetMedicationByIdQuery(medicationId);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading medication.</p>;

  return (
    <>
      <div className="medication-details-root">
        <button
          onClick={() => navigate(`/pets/${medication.petId}?tab=medications`)}
          className="medication-back-btn"
        >
          ← Back to Medications
        </button>

        <h2 className="medication-details-title">Medication Details</h2>

        <div className="medication-details-card">
          <div className="medication-details-header">
            <div className="medication-name-section">
              <h3>{medication.drugName}</h3>
            </div>
            <span className="medication-date">
              {new Date(medication.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>

          <div className="medication-details-grid">
            <div className="medication-detail-item">
              <strong>Pet:</strong>
              <span>{medication.petName}</span>
            </div>

            {medication.dosage && (
              <div className="medication-detail-item">
                <strong>Dosage:</strong>
                <span>{medication.dosage}</span>
              </div>
            )}

            {medication.time && (
              <div className="medication-detail-item">
                <strong>Time:</strong>
                <span>{medication.time}</span>
              </div>
            )}

            {medication.duration && (
              <div className="medication-detail-item">
                <strong>Duration:</strong>
                <span>{medication.duration}</span>
              </div>
            )}

            {medication.vetName && (
              <div className="medication-detail-item">
                <strong>Prescribed by:</strong>
                <span>{medication.vetName}</span>
              </div>
            )}

            {medication.purpose && (
              <div className="medication-detail-item">
                <strong>Purpose:</strong>
                <span>{medication.purpose}</span>
              </div>
            )}

            {medication.instructions && (
              <div className="medication-detail-item medication-detail-full">
                <strong>Instructions:</strong>
                <span>{medication.instructions}</span>
              </div>
            )}

            {medication.notes && (
              <div className="medication-detail-item medication-detail-full">
                <strong>Notes:</strong>
                <span>{medication.notes}</span>
              </div>
            )}
          </div>

          <div className="medication-details-actions">
            <button
              className="medication-edit-btn"
              onClick={() => navigate(`/medications/${medicationId}/edit`)}
            >
              Edit Medication
            </button>

            <button
              className="medication-delete-btn"
              onClick={async () => {
                const confirmDelete = window.confirm(
                  'Are you sure you want to delete this medication record?'
                );
                if (confirmDelete) {
                  try {
                    await deleteMedication(medicationId).unwrap();
                    alert('Medication deleted!');
                    navigate(`/pets/${medication.petId}?tab=medications`);
                  } catch (err) {
                    console.error('Failed to delete medication:', err);
                    alert('Failed to delete medication. Please try again.');
                  }
                }
              }}
            >
              Delete Medication
            </button>
          </div>
        </div>
      </div>
    </>
  );
}