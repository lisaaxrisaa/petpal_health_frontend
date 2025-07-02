import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  useGetSingleHealthLogQuery,
  useUpdateHealthLogMutation,
} from '../src/features/healthLogs/healthLogsSlice';
import { useGetUserPetsQuery } from '../src/features/pets/petsSlice';
import '../css/HealthLogForm.css';

export default function EditHealthLogForm() {
  const { logId } = useParams();
  const navigate = useNavigate();

  const { data: log, isLoading, error } = useGetSingleHealthLogQuery(logId);
  const { data: pets = [] } = useGetUserPetsQuery();
  const [updateHealthLog, { isLoading: isUpdating }] =
    useUpdateHealthLogMutation();

  const [formData, setFormData] = useState({
    petId: '',
    petName: '',
    date: '',
    notes: '',
    condition: '',
    medicationsGiven: '',
    vetVisit: false,
  });

  useEffect(() => {
    if (log) {
      setFormData({
        petId: log.petId,
        petName: log.petName,
        date: log.date?.slice(0, 10) || '',
        notes: log.notes || '',
        condition: log.condition || '',
        medicationsGiven: log.medicationsGiven || '',
        vetVisit: log.vetVisit || false,
      });
    }
  }, [log]);

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
      await updateHealthLog({ id: logId, ...formData }).unwrap();
      alert('Health log updated!');
      navigate(`/logs/${logId}`);
    } catch (err) {
      console.error('Failed to update log:', err);
      alert('Failed to update log. Please try again.');
    }
  };

  if (isLoading) return <p>Loading log data...</p>;
  if (error) return <p>Error loading log data.</p>;

  return (
    <>
      <div className="health-log-form-page">
        <div className="health-log-form-container">
          <form onSubmit={handleSubmit} className="health-log-form">
            <h2 className="health-log-form-title">Edit Health Log</h2>

            <div className="health-log-form-grid">
              <div className="health-log-form-field">
                <label className="health-log-form-label">
                  Pet
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

              <div className="health-log-form-field">
                <label className="health-log-form-label">
                  Date
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
                  />
                </label>
              </div>

              <div className="health-log-form-field health-log-form-field-full">
                <label className="health-log-form-label">
                  Notes
                  <textarea
                    className="health-log-form-textarea"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
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
                disabled={isUpdating}
                className={`health-log-submit-btn ${
                  isUpdating ? 'health-log-submit-btn-loading' : ''
                }`}
              >
                {isUpdating ? 'Saving...' : 'Update Health Log'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
