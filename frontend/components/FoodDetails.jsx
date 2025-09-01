import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetFoodEntryByIdQuery, useDeleteFoodEntryMutation } from '../src/features/food/foodSlice';

const FoodDetails = () => {
  const navigate = useNavigate();
  const { petId, foodEntryId } = useParams();
  
  const { data: foodEntry, error, isLoading } = useGetFoodEntryByIdQuery(foodEntryId);
  const [deleteFoodEntry, { isLoading: isDeleting }] = useDeleteFoodEntryMutation();

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this food entry?')) {
      try {
        await deleteFoodEntry(foodEntryId).unwrap();
        navigate(`/pets/${petId}?tab=food`);
      } catch (error) {
        console.error('Error deleting food entry:', error);
        alert('Failed to delete food entry');
      }
    }
  };

  if (isLoading) return <div>Loading food entry details...</div>;
  if (error) return <div>Error loading food entry details</div>;
  if (!foodEntry) return <div>Food entry not found</div>;

  return (
    <div className="page-wrapper">
      <div className="food-details-container">
        <div className="details-header">
          <button 
            className="btn secondary"
            onClick={() => navigate(`/pets/${petId}?tab=food`)}
          >
            ← Back to Food Diary
          </button>
          <div className="header-actions">
            <button 
              className="btn secondary"
              onClick={() => navigate(`/pets/${petId}/food/${foodEntryId}/edit`)}
            >
              Edit Entry
            </button>
            <button 
              className="btn danger"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete Entry'}
            </button>
          </div>
        </div>

        <div className="food-details">
          <h2>{foodEntry.foodBrand}</h2>
          <p><strong>Date:</strong> {formatDate(foodEntry.date)}</p>
          {foodEntry.time && <p><strong>Time:</strong> {foodEntry.time}</p>}
          {foodEntry.mealType && <p><strong>Meal Type:</strong> {foodEntry.mealType}</p>}
          {foodEntry.foodType && <p><strong>Food Type:</strong> {foodEntry.foodType}</p>}
          {foodEntry.amount && <p><strong>Amount:</strong> {foodEntry.amount}</p>}
          {foodEntry.calories && <p><strong>Calories:</strong> {foodEntry.calories}</p>}
          {foodEntry.appetite && <p><strong>Pet's Response:</strong> {foodEntry.appetite}</p>}
          
          {foodEntry.allergicReaction && (
            <div className="allergy-section">
              <h3>⚠️ Allergic Reaction Reported</h3>
              {foodEntry.allergySymptoms && <p><strong>Symptoms:</strong> {foodEntry.allergySymptoms}</p>}
              {foodEntry.allergyNotes && <p><strong>Allergy Notes:</strong> {foodEntry.allergyNotes}</p>}
            </div>
          )}
          
          {foodEntry.notes && (
            <div className="notes-section">
              <h3>Notes</h3>
              <p>{foodEntry.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;