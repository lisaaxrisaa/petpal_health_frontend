import { useState } from 'react';
import { useCreatePetMutation } from '../src/features/pets/petsSlice';

export default function PetForm({ onPetCreated }) {
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    weight: '',
    notes: '',
  });

  const [createPet, { isLoading, error }] = useCreatePetMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      species: formData.species,
      breed: formData.breed || null,
      age: formData.age ? parseInt(formData.age) : null,
      weight: formData.weight ? parseFloat(formData.weight) : null,
      notes: formData.notes || null,
    };

    try {
      await createPet(payload).unwrap();
      setFormData({
        name: '',
        species: '',
        breed: '',
        age: '',
        weight: '',
        notes: '',
      });
      alert('Pet created successfully!');
      onPetCreated?.(); // 👈 Tell Home.jsx to switch tabs
    } catch (err) {
      console.error('Error creating pet:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a New Pet</h2>

      <label>
        Name:
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <label>
        Species:
        <input
          name="species"
          value={formData.species}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <label>
        Breed:
        <input name="breed" value={formData.breed} onChange={handleChange} />
      </label>
      <br />

      <label>
        Age:
        <input
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Weight (lbs):
        <input
          name="weight"
          type="number"
          value={formData.weight}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Notes:
        <textarea name="notes" value={formData.notes} onChange={handleChange} />
      </label>
      <br />

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Add Pet'}
      </button>

      {error && (
        <p style={{ color: 'red' }}>
          Error: {error.data?.error || 'Unknown error'}
        </p>
      )}
    </form>
  );
}
