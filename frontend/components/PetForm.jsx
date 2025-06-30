import { useState } from 'react';
import { useCreatePetMutation } from '../src/features/pets/petsSlice';
import '../css/PetForm.css';

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
    <>
      <div className="pet-form-container">
        <form onSubmit={handleSubmit} className="pet-form">
          <h2 className="pet-form-title">Add a New Pet</h2>

          <div className="pet-form-grid">
            <div className="pet-form-field">
              <label className="pet-form-label">
                Name *
                <input
                  className="pet-form-input"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter pet's name"
                />
              </label>
            </div>

            <div className="pet-form-field">
              <label className="pet-form-label">
                Species *
                <input
                  className="pet-form-input"
                  name="species"
                  value={formData.species}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Dog, Cat, Bird"
                />
              </label>
            </div>

            <div className="pet-form-field">
              <label className="pet-form-label">
                Breed
                <input
                  className="pet-form-input"
                  name="breed"
                  value={formData.breed}
                  onChange={handleChange}
                  placeholder="Enter breed (optional)"
                />
              </label>
            </div>

            <div className="pet-form-field">
              <label className="pet-form-label">
                Age
                <input
                  className="pet-form-input"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Age in years"
                  min="0"
                />
              </label>
            </div>

            <div className="pet-form-field">
              <label className="pet-form-label">
                Weight (lbs)
                <input
                  className="pet-form-input"
                  name="weight"
                  type="number"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="Weight in pounds"
                  min="0"
                  step="0.1"
                />
              </label>
            </div>

            <div className="pet-form-field pet-form-field-full">
              <label className="pet-form-label">
                Notes
                <textarea
                  className="pet-form-textarea"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Any additional information about your pet..."
                  rows="4"
                />
              </label>
            </div>
          </div>

          <div className="pet-form-actions">
            <button
              type="submit"
              disabled={isLoading}
              className={`pet-form-submit-btn ${
                isLoading ? 'pet-form-submit-btn-loading' : ''
              }`}
            >
              {isLoading ? 'Saving...' : 'Add Pet'}
            </button>
          </div>

          {error && (
            <div className="pet-form-error">
              Error: {error.data?.error || 'Unknown error'}
            </div>
          )}
        </form>
      </div>
    </>
  );
}
