import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetVaccinesByPetIdQuery, useGetUpcomingVaccinesQuery } from '../src/features/vaccines/vaccinesSlice';
import '../css/VaccineList.css';

const VaccineList = ({ petId }) => {
  const navigate = useNavigate();
  const { data: vaccines = [], error, isLoading } = useGetVaccinesByPetIdQuery(petId);
  const { data: upcomingVaccines = [] } = useGetUpcomingVaccinesQuery(petId);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const isOverdue = (dateString) => {
    if (!dateString) return false;
    return new Date(dateString) < new Date();
  };

  const isDueSoon = (dateString) => {
    if (!dateString) return false;
    const dueDate = new Date(dateString);
    const today = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);
    return dueDate >= today && dueDate <= thirtyDaysFromNow;
  };

  const getVaccineStatus = (vaccine) => {
    if (vaccine.nextDueDate) {
      if (isOverdue(vaccine.nextDueDate)) {
        return { status: 'overdue', text: 'Overdue', class: 'overdue' };
      } else if (isDueSoon(vaccine.nextDueDate)) {
        return { status: 'due-soon', text: 'Due Soon', class: 'due-soon' };
      } else {
        return { status: 'current', text: 'Current', class: 'current' };
      }
    }
    return { status: 'complete', text: 'Complete', class: 'complete' };
  };

  if (isLoading) return <div>Loading vaccines...</div>;
  if (error) return <div>Error loading vaccines</div>;

  return (
    <div className="vaccine-list">
      {upcomingVaccines.length > 0 && (
        <div className="upcoming-vaccines-alert">
          <h3>⚠️ Upcoming Vaccines</h3>
          <p>{upcomingVaccines.length} vaccine{upcomingVaccines.length > 1 ? 's' : ''} due within 30 days</p>
          <div className="upcoming-vaccines">
            {upcomingVaccines.map((vaccine) => (
              <div key={vaccine.id} className="upcoming-vaccine-item">
                <span className="vaccine-name">{vaccine.vaccineName}</span>
                <span className="due-date">Due: {formatDate(vaccine.nextDueDate)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {vaccines.length === 0 ? (
        <div className="no-vaccines">
          <p>No vaccine records found.</p>
          <button 
            className="petdetails-add-btn"
            onClick={() => navigate(`/pets/${petId}/vaccines/new`)}
          >
            + Add First Vaccine Record
          </button>
        </div>
      ) : (
        <>
          <div className="vaccine-header">
            <h2>Vaccine Records</h2>
            <button 
              className="petdetails-add-btn"
              onClick={() => navigate(`/pets/${petId}/vaccines/new`)}
            >
              + Add Vaccine Record
            </button>
          </div>
          
          <div className="vaccines">
            {vaccines.map((vaccine) => {
              const statusInfo = getVaccineStatus(vaccine);
              return (
                <div key={vaccine.id} className="vaccine-card">
                  <div className="vaccine-card-header">
                    <div className="vaccine-main">
                      <h3>{vaccine.vaccineName}</h3>
                      {vaccine.brandName && <span className="brand-name">{vaccine.brandName}</span>}
                    </div>
                    
                    <div className="vaccine-status">
                      <span className={`status-badge ${statusInfo.class}`}>
                        {statusInfo.text}
                      </span>
                    </div>
                  </div>

                  <div className="vaccine-card-body">
                    <div className="vaccine-details">
                      <div className="vaccine-detail">
                        <label>Date Administered:</label>
                        <span>{formatDate(vaccine.dateAdministered)}</span>
                      </div>
                      
                      {vaccine.nextDueDate && (
                        <div className="vaccine-detail">
                          <label>Next Due:</label>
                          <span className={isOverdue(vaccine.nextDueDate) ? 'overdue-text' : ''}>
                            {formatDate(vaccine.nextDueDate)}
                          </span>
                        </div>
                      )}
                      
                      {vaccine.expirationDate && (
                        <div className="vaccine-detail">
                          <label>Expires:</label>
                          <span>{formatDate(vaccine.expirationDate)}</span>
                        </div>
                      )}
                      
                      {vaccine.vetClinic && (
                        <div className="vaccine-detail">
                          <label>Clinic:</label>
                          <span>{vaccine.vetClinic}</span>
                        </div>
                      )}
                      
                      {vaccine.veterinarian && (
                        <div className="vaccine-detail">
                          <label>Veterinarian:</label>
                          <span>{vaccine.veterinarian}</span>
                        </div>
                      )}
                      
                      {vaccine.doseNumber && vaccine.totalDoses && (
                        <div className="vaccine-detail">
                          <label>Dose:</label>
                          <span>{vaccine.doseNumber} of {vaccine.totalDoses}</span>
                        </div>
                      )}
                      
                      {vaccine.vaccineType && (
                        <div className="vaccine-detail">
                          <label>Type:</label>
                          <span className={`vaccine-type ${vaccine.vaccineType.toLowerCase().replace(/\s+/g, '-')}`}>
                            {vaccine.vaccineType}
                          </span>
                        </div>
                      )}
                      
                      {vaccine.cost && (
                        <div className="vaccine-detail">
                          <label>Cost:</label>
                          <span>${vaccine.cost.toFixed(2)}</span>
                        </div>
                      )}
                    </div>

                    {vaccine.sideEffects && (
                      <div className="side-effects-alert">
                        <h4>⚠️ Side Effects Reported</h4>
                        <p>{vaccine.sideEffects}</p>
                      </div>
                    )}

                    {vaccine.notes && (
                      <div className="vaccine-notes">
                        <label>Notes:</label>
                        <p>{vaccine.notes}</p>
                      </div>
                    )}
                  </div>

                  <div className="vaccine-card-actions">
                    <button 
                      className="btn secondary"
                      onClick={() => navigate(`/pets/${petId}/vaccines/${vaccine.id}`)}
                    >
                      View Details
                    </button>
                    <button 
                      className="btn primary"
                      onClick={() => navigate(`/pets/${petId}/vaccines/${vaccine.id}/edit`)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default VaccineList;