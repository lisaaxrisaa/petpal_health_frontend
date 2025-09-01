import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetFoodEntriesByPetIdQuery } from '../src/features/food/foodSlice';
import '../css/FoodList.css';

const FoodList = ({ petId }) => {
  const navigate = useNavigate();
  const { data: foodEntries = [], error, isLoading } = useGetFoodEntriesByPetIdQuery(petId);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatDateTime = (dateString, timeString) => {
    const date = new Date(dateString).toLocaleDateString();
    return timeString ? `${date} at ${timeString}` : date;
  };

  if (isLoading) return <div>Loading food entries...</div>;
  if (error) return <div>Error loading food entries</div>;

  return (
    <div className="food-list">
      {foodEntries.length === 0 ? (
        <div className="no-food-entries">
          <p>No food entries found.</p>
          <button 
            className="petdetails-add-btn"
            onClick={() => navigate(`/pets/${petId}/food/new`)}
          >
            + Add First Food Entry
          </button>
        </div>
      ) : (
        <>
          <div className="food-header">
            <h2>Food Diary</h2>
            <button 
              className="petdetails-add-btn"
              onClick={() => navigate(`/pets/${petId}/food/new`)}
            >
              + Add Food Entry
            </button>
          </div>
          
          <div className="food-entries">
            {foodEntries.map((entry) => (
              <div key={entry.id} className="food-entry-card">
                <div className="food-entry-header">
                  <div className="food-entry-main">
                    <h3>{entry.foodBrand}</h3>
                    <div className="food-entry-meta">
                      <span className="food-date">{formatDateTime(entry.date, entry.time)}</span>
                      {entry.mealType && <span className="meal-type">{entry.mealType}</span>}
                    </div>
                  </div>
                  
                  {entry.allergicReaction && (
                    <div className="allergy-alert">
                      ⚠️ Allergic Reaction
                    </div>
                  )}
                </div>

                <div className="food-entry-body">
                  <div className="food-details">
                    {entry.foodType && (
                      <div className="food-detail">
                        <label>Type:</label>
                        <span>{entry.foodType}</span>
                      </div>
                    )}
                    {entry.amount && (
                      <div className="food-detail">
                        <label>Amount:</label>
                        <span>{entry.amount}</span>
                      </div>
                    )}
                    {entry.calories && (
                      <div className="food-detail">
                        <label>Calories:</label>
                        <span>{entry.calories}</span>
                      </div>
                    )}
                    {entry.appetite && (
                      <div className="food-detail">
                        <label>Appetite:</label>
                        <span className={`appetite ${entry.appetite.toLowerCase().replace(/\s+/g, '-')}`}>
                          {entry.appetite}
                        </span>
                      </div>
                    )}
                  </div>

                  {entry.allergicReaction && (
                    <div className="allergy-info">
                      <h4>Allergy Information</h4>
                      {entry.allergySymptoms && (
                        <div className="allergy-detail">
                          <label>Symptoms:</label>
                          <span>{entry.allergySymptoms}</span>
                        </div>
                      )}
                      {entry.allergyNotes && (
                        <div className="allergy-detail">
                          <label>Allergy Notes:</label>
                          <span>{entry.allergyNotes}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {entry.notes && (
                    <div className="food-notes">
                      <label>Notes:</label>
                      <p>{entry.notes}</p>
                    </div>
                  )}
                </div>

                <div className="food-entry-actions">
                  <button 
                    className="btn secondary"
                    onClick={() => navigate(`/pets/${petId}/food/${entry.id}`)}
                  >
                    View Details
                  </button>
                  <button 
                    className="btn primary"
                    onClick={() => navigate(`/pets/${petId}/food/${entry.id}/edit`)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FoodList;