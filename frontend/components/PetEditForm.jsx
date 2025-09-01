import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetUserPetsQuery, useUpdatePetMutation } from '../src/features/pets/petsSlice';
import '../css/PetEditForm.css';

export default function PetEditForm() {
  const navigate = useNavigate();
  const { petId } = useParams();
  const { data: pets = [] } = useGetUserPetsQuery();
  const [updatePet, { isLoading }] = useUpdatePetMutation();
  
  const pet = pets.find(p => p.id === Number(petId));
  
  const [formData, setFormData] = useState({
    name: pet?.name || '',
    species: pet?.species || '',
    breed: pet?.breed || '',
    age: pet?.age || '',
    weight: pet?.weight || '',
    notes: pet?.notes || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updatePet({
        id: Number(petId),
        ...formData
      }).unwrap();
      
      alert('Pet updated successfully!');
      navigate(`/pets/${petId}?tab=general`);
    } catch (err) {
      console.error('Error updating pet:', err);
      alert('Failed to update pet. Please try again.');
    }
  };

  if (!pet) return <p>Pet not found</p>;

  return (
    <>
      <div className="pet-edit-form-page">
        <div className="pet-edit-form-container">
          <form onSubmit={handleSubmit} className="pet-edit-form">
            <h2 className="pet-edit-form-title">Edit {pet.name}</h2>

            <div className="pet-edit-form-grid">
              <div className="pet-edit-form-field">
                <label className="pet-edit-form-label">
                  Pet Name *
                  <input
                    className="pet-edit-form-input"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter pet's name"
                  />
                </label>
              </div>

              <div className="pet-edit-form-field">
                <label className="pet-edit-form-label">
                  Species *
                  <input
                    className="pet-edit-form-input"
                    type="text"
                    name="species"
                    value={formData.species}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Dog, Cat, Bird"
                  />
                </label>
              </div>

              <div className="pet-edit-form-field">
                <label className="pet-edit-form-label">
                  Breed
                  <input
                    className="pet-edit-form-input"
                    type="text"
                    name="breed"
                    value={formData.breed}
                    onChange={handleChange}
                    placeholder="e.g., Golden Retriever, Persian"
                  />
                </label>
              </div>

              <div className="pet-edit-form-field">
                <label className="pet-edit-form-label">
                  Age (years)
                  <input
                    className="pet-edit-form-input"
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    min="0"
                    max="50"
                    placeholder="Age in years"
                  />
                </label>
              </div>

              <div className="pet-edit-form-field">
                <label className="pet-edit-form-label">
                  Weight (lbs)
                  <input
                    className="pet-edit-form-input"
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    min="0"
                    step="0.1"
                    placeholder="Weight in pounds"
                  />
                </label>
              </div>

              <div className="pet-edit-form-field pet-edit-form-field-full">
                <label className="pet-edit-form-label">
                  Notes
                  <textarea
                    className="pet-edit-form-textarea"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Any additional information about your pet..."
                    rows="4"
                  />
                </label>
              </div>
            </div>

            <div className="pet-edit-form-actions">
              <button
                type="button"
                onClick={() => navigate(`/pets/${petId}?tab=general`)}
                className="pet-edit-cancel-btn"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`pet-edit-submit-btn ${
                  isLoading ? 'pet-edit-submit-btn-loading' : ''
                }`}
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}