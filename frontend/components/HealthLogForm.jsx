import { useState } from 'react';
import { useCreateHealthLogMutation } from '../src/features/healthLogs/healthLogsSlice';
import { useGetUserPetsQuery } from '../src/features/pets/petsSlice';
import '../css/HealthLogForm.css';

export default function HealthLogForm({
  defaultPetId = null,
  defaultPetName = '',
}) {
  const { data: pets = [] } = useGetUserPetsQuery();
  const [createHealthLog, { isLoading }] = useCreateHealthLogMutation();

  const [formData, setFormData] = useState({
    petId: defaultPetId || '',
    petName: defaultPetName || '',
    date: '',
    notes: '',
    condition: '',
    medicationsGiven: '',
    vetVisit: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'petId' ? Number(newValue) : newValue,
    }));

    if (name === 'petId') {
      const selectedPet = pets.find((p) => p.id === Number(newValue));
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
      await createHealthLog(formData).unwrap();
      alert('Health log created!');

      setFormData({
        petId: defaultPetId || '',
        petName: defaultPetName || '',
        date: '',
        notes: '',
        condition: '',
        medicationsGiven: '',
        vetVisit: false,
      });
    } catch (err) {
      console.error('Error creating health log:', err);
    }
  };

  return (
    <>
      <div className="health-log-form-container">
        <form onSubmit={handleSubmit} className="health-log-form">
          <h2 className="health-log-form-title">Add Health Log</h2>

          <div className="health-log-form-grid">
            {!defaultPetId ? (
              <div className="health-log-form-field">
                <label className="health-log-form-label">
                  Pet *
                  <select
                    className="health-log-form-select"
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
              <div className="health-log-form-field">
                <div className="health-log-selected-pet">
                  <span className="health-log-selected-pet-label">Pet</span>
                  <span className="health-log-selected-pet-name">
                    {formData.petName}
                  </span>
                </div>
              </div>
            )}

            <div className="health-log-form-field">
              <label className="health-log-form-label">
                Date *
                <input
                  className="health-log-form-input"
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <div className="health-log-form-field">
              <label className="health-log-form-label">
                Condition
                <input
                  className="health-log-form-input"
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  placeholder="e.g., Routine checkup, Ear infection"
                />
              </label>
            </div>

            <div className="health-log-form-field">
              <label className="health-log-form-label">
                Medications Given
                <input
                  className="health-log-form-input"
                  name="medicationsGiven"
                  value={formData.medicationsGiven}
                  onChange={handleChange}
                  placeholder="e.g., Antibiotics, Pain medication"
                />
              </label>
            </div>

            <div className="health-log-form-field health-log-form-field-full">
              <label className="health-log-form-label">
                Notes *
                <textarea
                  className="health-log-form-textarea"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  required
                  placeholder="Describe symptoms, behavior changes, treatments, or any other relevant health information..."
                  rows="4"
                />
              </label>
            </div>

            <div className="health-log-form-field health-log-checkbox-field">
              <label className="health-log-checkbox-label">
                <input
                  className="health-log-checkbox"
                  name="vetVisit"
                  type="checkbox"
                  checked={formData.vetVisit}
                  onChange={handleChange}
                />
                <span className="health-log-checkbox-text">
                  <span className="health-log-checkbox-title">Vet Visit</span>
                  <span className="health-log-checkbox-subtitle">
                    Check if this involved a veterinary appointment
                  </span>
                </span>
              </label>
            </div>
          </div>

          <div className="health-log-form-actions">
            <button
              type="submit"
              disabled={isLoading}
              className={`health-log-submit-btn ${
                isLoading ? 'health-log-submit-btn-loading' : ''
              }`}
            >
              {isLoading ? 'Saving...' : 'Add Health Log'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
