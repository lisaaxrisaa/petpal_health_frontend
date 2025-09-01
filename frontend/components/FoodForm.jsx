import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateFoodEntryMutation, useUpdateFoodEntryMutation, useGetFoodEntryByIdQuery } from '../src/features/food/foodSlice';
import '../css/FoodForm.css';

const FoodForm = ({ isEdit = false }) => {
  const navigate = useNavigate();
  const { petId, foodEntryId } = useParams();
  
  const [createFoodEntry, { isLoading: isCreating }] = useCreateFoodEntryMutation();
  const [updateFoodEntry, { isLoading: isUpdating }] = useUpdateFoodEntryMutation();
  const { data: existingFoodEntry, isLoading: isLoadingFoodEntry } = useGetFoodEntryByIdQuery(foodEntryId, {
    skip: !isEdit
  });

  const [formData, setFormData] = useState({
    date: '',
    time: '',
    mealType: '',
    foodBrand: '',
    foodType: '',
    amount: '',
    calories: '',
    appetite: '',
    allergicReaction: false,
    allergySymptoms: '',
    allergyNotes: '',
    notes: ''
  });

  useEffect(() => {
    if (isEdit && existingFoodEntry) {
      setFormData({
        date: existingFoodEntry.date ? existingFoodEntry.date.split('T')[0] : '',
        time: existingFoodEntry.time || '',
        mealType: existingFoodEntry.mealType || '',
        foodBrand: existingFoodEntry.foodBrand || '',
        foodType: existingFoodEntry.foodType || '',
        amount: existingFoodEntry.amount || '',
        calories: existingFoodEntry.calories || '',
        appetite: existingFoodEntry.appetite || '',
        allergicReaction: existingFoodEntry.allergicReaction || false,
        allergySymptoms: existingFoodEntry.allergySymptoms || '',
        allergyNotes: existingFoodEntry.allergyNotes || '',
        notes: existingFoodEntry.notes || ''
      });
    }
  }, [isEdit, existingFoodEntry]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const foodEntryData = {
        ...formData,
        petId: parseInt(petId)
      };

      if (isEdit) {
        await updateFoodEntry({ id: foodEntryId, ...foodEntryData }).unwrap();
      } else {
        await createFoodEntry(foodEntryData).unwrap();
      }
      
      navigate(`/pets/${petId}?tab=food`);
    } catch (error) {
      console.error('Error saving food entry:', error);
      alert(`Failed to save food entry: ${error.data?.error || error.message || 'Unknown error'}`);
    }
  };

  if (isEdit && isLoadingFoodEntry) {
    return <div>Loading food entry data...</div>;
  }

  return (
    <div className="food-form-page">
      <div className="food-form-container">
        <form onSubmit={handleSubmit} className="food-form">
          <h2 className="food-form-title">{isEdit ? 'Edit Food Entry' : 'Add Food Entry'}</h2>

          <div className="food-form-section">
            <h3>Basic Information</h3>
            <div className="food-form-grid">
              <div className="food-form-field">
                <label htmlFor="date" className="food-form-label">Date *</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="food-form-input"
                />
              </div>

              <div className="food-form-field">
                <label htmlFor="time" className="food-form-label">Time</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="food-form-input"
                />
              </div>

              <div className="food-form-field">
                <label htmlFor="mealType" className="food-form-label">Meal Type</label>
                <select
                  id="mealType"
                  name="mealType"
                  value={formData.mealType}
                  onChange={handleChange}
                  className="food-form-select"
                >
                  <option value="">Select meal type</option>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Treat">Treat</option>
                  <option value="Snack">Snack</option>
                </select>
              </div>
            </div>
          </div>

          <div className="food-form-section">
            <h3>Food Details</h3>
            <div className="food-form-grid">
              <div className="food-form-field">
                <label htmlFor="foodBrand" className="food-form-label">Food Brand *</label>
                <input
                  type="text"
                  id="foodBrand"
                  name="foodBrand"
                  value={formData.foodBrand}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Royal Canin, Hill's Science Diet"
                  className="food-form-input"
                />
              </div>

              <div className="food-form-field">
                <label htmlFor="foodType" className="food-form-label">Food Type</label>
                <select
                  id="foodType"
                  name="foodType"
                  value={formData.foodType}
                  onChange={handleChange}
                  className="food-form-select"
                >
                  <option value="">Select food type</option>
                  <option value="Dry kibble">Dry kibble</option>
                  <option value="Wet food">Wet food</option>
                  <option value="Raw food">Raw food</option>
                  <option value="Treats">Treats</option>
                  <option value="Homemade">Homemade</option>
                  <option value="Prescription diet">Prescription diet</option>
                </select>
              </div>

              <div className="food-form-field">
                <label htmlFor="amount" className="food-form-label">Amount</label>
                <input
                  type="text"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="e.g., 1 cup, 2 oz, 1/2 can"
                  className="food-form-input"
                />
              </div>

              <div className="food-form-field">
                <label htmlFor="calories" className="food-form-label">Calories (estimated)</label>
                <input
                  type="number"
                  id="calories"
                  name="calories"
                  value={formData.calories}
                  onChange={handleChange}
                  min="0"
                  placeholder="e.g., 350"
                  className="food-form-input"
                />
              </div>

              <div className="food-form-field">
                <label htmlFor="appetite" className="food-form-label">Pet's Response</label>
                <select
                  id="appetite"
                  name="appetite"
                  value={formData.appetite}
                  onChange={handleChange}
                  className="food-form-select"
                >
                  <option value="">Select response</option>
                  <option value="Ate all">Ate all</option>
                  <option value="Ate some">Ate some</option>
                  <option value="Left half">Left half</option>
                  <option value="Refused">Refused</option>
                  <option value="Very eager">Very eager</option>
                  <option value="Hesitant">Hesitant</option>
                </select>
              </div>
            </div>
          </div>

          <div className="food-form-section">
            <h3>Allergy Information</h3>
            <div className="food-form-checkbox-group">
              <input
                type="checkbox"
                id="allergicReaction"
                name="allergicReaction"
                checked={formData.allergicReaction}
                onChange={handleChange}
              />
              <label htmlFor="allergicReaction">Allergic reaction occurred</label>
            </div>

            {formData.allergicReaction && (
              <div className="allergy-details">
                <div className="food-form-grid">
                  <div className="food-form-field">
                    <label htmlFor="allergySymptoms" className="food-form-label">Allergy Symptoms</label>
                    <input
                      type="text"
                      id="allergySymptoms"
                      name="allergySymptoms"
                      value={formData.allergySymptoms}
                      onChange={handleChange}
                      placeholder="e.g., Itching, Vomiting, Diarrhea, Skin rash"
                      className="food-form-input"
                    />
                  </div>

                  <div className="food-form-field food-form-field-full">
                    <label htmlFor="allergyNotes" className="food-form-label">Allergy Notes</label>
                    <textarea
                      id="allergyNotes"
                      name="allergyNotes"
                      value={formData.allergyNotes}
                      onChange={handleChange}
                      rows="3"
                      placeholder="Additional details about the allergic reaction..."
                      className="food-form-textarea"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="food-form-section">
            <h3>Additional Notes</h3>
            <div className="food-form-field food-form-field-full">
              <label htmlFor="notes" className="food-form-label">General Notes</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="4"
                placeholder="Any additional observations about this feeding..."
                className="food-form-textarea"
              />
            </div>
          </div>

          <div className="food-form-actions">
            <button 
              type="button" 
              className="btn secondary"
              onClick={() => navigate(`/pets/${petId}?tab=food`)}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn primary"
              disabled={isCreating || isUpdating}
            >
              {isCreating || isUpdating ? 'Saving...' : (isEdit ? 'Update Entry' : 'Add Entry')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FoodForm;