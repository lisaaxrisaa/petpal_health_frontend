import { useState } from 'react';
import { useCreateHealthLogMutation } from '../src/features/healthLogs/healthLogsSlice';

export default function HealthLogForm() {
  const [formData, setFormData] = useState({
    petName: '',
    date: '',
    notes: '',
  });
  const [createHealthLog] = useCreateHealthLogMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createHealthLog(formData).unwrap();
      setFormData({ petName: '', date: '', notes: '' });
    } catch (err) {
      console.error('Error creating health log:', err.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Add Health Log</h2>

        <label>
          Pet Name:
          <input
            type="text"
            name="petName"
            value={formData.petName}
            onChange={handleChange}
            required
          />
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
          Notes:
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <button type="submit">Add Log</button>
      </form>
    </>
  );
}
