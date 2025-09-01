import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateMedicationMutation } from '../src/features/medications/medicationsSlice';
import { useGetUserPetsQuery } from '../src/features/pets/petsSlice';
import '../css/MedicationForm.css';

export default function MedicationForm({
  defaultPetId = null,
  defaultPetName = '',
}) {
  const navigate = useNavigate();
  const { petId } = useParams();
  const { data: pets = [] } = useGetUserPetsQuery();
  const [createMedication, { isLoading }] = useCreateMedicationMutation();
  
  // Get pet details from URL params if available
  const urlPetId = petId ? Number(petId) : null;
  const pet = pets.find(p => p.id === urlPetId);
  const finalPetId = defaultPetId || urlPetId;
  const finalPetName = defaultPetName || pet?.name || '';

  const [formData, setFormData] = useState({
    petId: finalPetId || '',
    petName: finalPetName || '',
    drugName: '',
    dosage: '',
    instructions: '',
    date: '',
    time: '',
    vetName: '',
    duration: '',
    purpose: '',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'petId' ? Number(value) : value
    }));

    if (name === 'petId') {
      const selectedPet = pets.find((p) => p.id === Number(value));
      if (selectedPet) {
        setFormData((prev) => ({
          ...prev,
          petName: selectedPet.name,
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createMedication(formData).unwrap();
      alert('Medication added successfully!');
      
      // Navigate back to pet details page
      if (finalPetId) {
        navigate(`/pets/${finalPetId}?tab=medications`);
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error('Error creating medication:', err);
      alert('Failed to add medication. Please try again.');
    }
  };

  return (
    <>
      <div className="medication-form-page">
        <div className="medication-form-container">
          <form onSubmit={handleSubmit} className="medication-form">
            <h2 className="medication-form-title">Add Medication</h2>

            <div className="medication-form-grid">
              {!finalPetId ? (
                <div className="medication-form-field">
                  <label className="medication-form-label">
                    Pet *
                    <select
                      className="medication-form-select"
                      name="petId"
                      value={formData.petId}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>
                        Select a pet
                      </option>
                      {pets.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              ) : (
                <div className="medication-form-field">
                  <div className="medication-selected-pet">
                    <span className="medication-selected-pet-label">Pet</span>
                    <span className="medication-selected-pet-name">
                      {formData.petName}
                    </span>
                  </div>
                </div>
              )}

              <div className="medication-form-field">
                <label className="medication-form-label">
                  Medication Name *
                  <input
                    className="medication-form-input"
                    type="text"
                    name="drugName"
                    value={formData.drugName}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Simparica Trio, Antibiotics"
                  />
                </label>
              </div>

              <div className="medication-form-field">
                <label className="medication-form-label">
                  Date Prescribed *
                  <input
                    className="medication-form-input"
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>

              <div className="medication-form-field">
                <label className="medication-form-label">
                  Time
                  <input
                    className="medication-form-input"
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    placeholder="e.g., 9:00 AM"
                  />
                </label>
              </div>

              <div className="medication-form-field">
                <label className="medication-form-label">
                  Dosage
                  <input
                    className="medication-form-input"
                    name="dosage"
                    value={formData.dosage}
                    onChange={handleChange}
                    placeholder="e.g., 25mg, 1 tablet daily"
                  />
                </label>
              </div>

              <div className="medication-form-field">
                <label className="medication-form-label">
                  Duration
                  <input
                    className="medication-form-input"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="e.g., 7 days, Monthly"
                  />
                </label>
              </div>

              <div className="medication-form-field">
                <label className="medication-form-label">
                  Veterinarian
                  <input
                    className="medication-form-input"
                    name="vetName"
                    value={formData.vetName}
                    onChange={handleChange}
                    placeholder="e.g., Dr. Smith"
                  />
                </label>
              </div>

              <div className="medication-form-field">
                <label className="medication-form-label">
                  Purpose
                  <input
                    className="medication-form-input"
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    placeholder="e.g., Flea prevention, Infection treatment"
                  />
                </label>
              </div>

              <div className="medication-form-field medication-form-field-full">
                <label className="medication-form-label">
                  Instructions
                  <textarea
                    className="medication-form-textarea"
                    name="instructions"
                    value={formData.instructions}
                    onChange={handleChange}
                    placeholder="Administration instructions, frequency, special notes..."
                    rows="3"
                  />
                </label>
              </div>

              <div className="medication-form-field medication-form-field-full">
                <label className="medication-form-label">
                  Notes
                  <textarea
                    className="medication-form-textarea"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Additional notes, side effects observed, etc..."
                    rows="3"
                  />
                </label>
              </div>
            </div>

            <div className="medication-form-actions">
              <button
                type="button"
                onClick={() => finalPetId ? navigate(`/pets/${finalPetId}?tab=medications`) : navigate('/')}
                className="medication-cancel-btn"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`medication-submit-btn ${
                  isLoading ? 'medication-submit-btn-loading' : ''
                }`}
              >
                {isLoading ? 'Adding...' : 'Add Medication'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}