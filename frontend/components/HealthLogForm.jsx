import { useState } from 'react';
import { useCreateHealthLogMutation } from '../src/features/healthLogs/healthLogsSlice';
import { useGetUserPetsQuery } from '../src/features/pets/petsSlice';

export default function HealthLogForm({
  defaultPetId = null,
  defaultPetName = '',
}) {
  const { data: pets = [] } = useGetUserPetsQuery();
  const [createHealthLog] = useCreateHealthLogMutation();

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
    <form onSubmit={handleSubmit}>
      <h2>Add Health Log</h2>

      {!defaultPetId ? (
        <label>
          Pet:
          <select
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
      ) : (
        <p>
          <strong>Pet:</strong> {formData.petName}
        </p>
      )}
      <br />

      <label>
        Date:
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <label>
        Notes:
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <label>
        Condition:
        <input
          name="condition"
          value={formData.condition}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Medications Given:
        <input
          name="medicationsGiven"
          value={formData.medicationsGiven}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Vet Visit:
        <input
          name="vetVisit"
          type="checkbox"
          checked={formData.vetVisit}
          onChange={handleChange}
        />
      </label>
      <br />

      <button type="submit">Add Log</button>
    </form>
  );
}
