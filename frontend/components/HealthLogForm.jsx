import { useState } from 'react';
import { useCreateHealthLogMutation } from '../src/features/healthLogs/healthLogsSlice';
import { useGetUserPetsQuery } from '../src/features/pets/petsSlice';

export default function HealthLogForm() {
  const { data: pets = [] } = useGetUserPetsQuery();
  const [createHealthLog] = useCreateHealthLogMutation();

  const [formData, setFormData] = useState({
    petId: '',
    date: '',
    notes: '',
    condition: '',
    medicationsGiven: '',
    vetVisit: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'petId') {
      const selectedPet = pets.find((p) => p.id === Number(value));
      setFormData((prev) => ({
        ...prev,
        petId: Number(value),
        petName: selectedPet?.name || '',
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createHealthLog({
        ...formData,
        petId: Number(formData.petId),
      }).unwrap();
      setFormData({
        petId: '',
        date: '',
        notes: '',
        condition: '',
        medicationsGiven: '',
        vetVisit: false,
      });
      alert('Health log created!');
    } catch (err) {
      console.error('Error creating health log:', err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Add Health Log</h2>

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
            type="checkbox"
            name="vetVisit"
            checked={formData.vetVisit}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Notes:
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </label>
        <br />

        <button type="submit">Add Log</button>
      </form>
    </>
  );
}
