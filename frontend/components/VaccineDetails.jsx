import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetVaccineByIdQuery, useDeleteVaccineMutation } from '../src/features/vaccines/vaccinesSlice';
import '../css/VaccineDetails.css';

const VaccineDetails = () => {
  const navigate = useNavigate();
  const { petId, vaccineId } = useParams();
  
  const { data: vaccine, error, isLoading } = useGetVaccineByIdQuery(vaccineId);
  const [deleteVaccine, { isLoading: isDeleting }] = useDeleteVaccineMutation();

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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

  const getVaccineStatus = () => {
    if (!vaccine.nextDueDate) {
      return { status: 'complete', text: 'Complete', class: 'complete' };
    }
    if (isOverdue(vaccine.nextDueDate)) {
      return { status: 'overdue', text: 'Overdue', class: 'overdue' };
    } else if (isDueSoon(vaccine.nextDueDate)) {
      return { status: 'due-soon', text: 'Due Soon', class: 'due-soon' };
    }
    return { status: 'current', text: 'Current', class: 'current' };
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this vaccine record? This action cannot be undone.')) {
      try {
        await deleteVaccine(vaccineId).unwrap();
        navigate(`/pets/${petId}?tab=vaccines`);
      } catch (error) {
        console.error('Error deleting vaccine:', error);
        alert('Failed to delete vaccine record');
      }
    }
  };

  if (isLoading) return <div>Loading vaccine details...</div>;
  if (error) return <div>Error loading vaccine details</div>;
  if (!vaccine) return <div>Vaccine record not found</div>;

  const statusInfo = getVaccineStatus();

  return (
    <div className="vaccine-details-page">
      <div className="vaccine-details-container">
        <div className="details-header">
          <button 
            className="btn secondary back-btn"
            onClick={() => navigate(`/pets/${petId}?tab=vaccines`)}
          >
            ← Back to Vaccines
          </button>
          <div className="header-actions">
            <button 
              className="btn secondary"
              onClick={() => navigate(`/pets/${petId}/vaccines/${vaccineId}/edit`)}
            >
              Edit Record
            </button>
            <button 
              className="btn danger"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete Record'}
            </button>
          </div>
        </div>

        <div className="vaccine-details-card">
          <div className="vaccine-header">
            <div className="vaccine-title-section">
              <h1 className="vaccine-title">💉 {vaccine.vaccineName}</h1>
              {vaccine.brandName && <p className="brand-name">{vaccine.brandName}</p>}
            </div>
            
            <div className="vaccine-status-section">
              <span className={`status-badge ${statusInfo.class}`}>
                {statusInfo.text}
              </span>
            </div>
          </div>

          <div className="vaccine-details-grid">
            <div className="detail-section">
              <h3>📅 Important Dates</h3>
              <div className="detail-items">
                <div className="detail-item">
                  <label>Date Administered:</label>
                  <span className="highlight-date">{formatDate(vaccine.dateAdministered)}</span>
                </div>
                {vaccine.expirationDate && (
                  <div className="detail-item">
                    <label>Expiration Date:</label>
                    <span>{formatDate(vaccine.expirationDate)}</span>
                  </div>
                )}
                {vaccine.nextDueDate && (
                  <div className="detail-item">
                    <label>Next Due Date:</label>
                    <span className={isOverdue(vaccine.nextDueDate) ? 'overdue-text' : isDueSoon(vaccine.nextDueDate) ? 'due-soon-text' : ''}>
                      {formatDate(vaccine.nextDueDate)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="detail-section">
              <h3>🏥 Veterinary Information</h3>
              <div className="detail-items">
                {vaccine.vetClinic && (
                  <div className="detail-item">
                    <label>Veterinary Clinic:</label>
                    <span>{vaccine.vetClinic}</span>
                  </div>
                )}
                {vaccine.veterinarian && (
                  <div className="detail-item">
                    <label>Veterinarian:</label>
                    <span>{vaccine.veterinarian}</span>
                  </div>
                )}
                {vaccine.cost && (
                  <div className="detail-item">
                    <label>Cost:</label>
                    <span className="cost-amount">${vaccine.cost.toFixed(2)}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="detail-section">
              <h3>🔬 Vaccine Details</h3>
              <div className="detail-items">
                {vaccine.vaccineType && (
                  <div className="detail-item">
                    <label>Vaccine Type:</label>
                    <span className={`vaccine-type ${vaccine.vaccineType.toLowerCase().replace(/\s+/g, '-')}`}>
                      {vaccine.vaccineType}
                    </span>
                  </div>
                )}
                {vaccine.batchLotNumber && (
                  <div className="detail-item">
                    <label>Batch/Lot Number:</label>
                    <span className="batch-number">{vaccine.batchLotNumber}</span>
                  </div>
                )}
                {vaccine.doseNumber && vaccine.totalDoses && (
                  <div className="detail-item">
                    <label>Dose Information:</label>
                    <span>Dose {vaccine.doseNumber} of {vaccine.totalDoses}</span>
                  </div>
                )}
                {vaccine.doseNumber && !vaccine.totalDoses && (
                  <div className="detail-item">
                    <label>Dose Number:</label>
                    <span>{vaccine.doseNumber}</span>
                  </div>
                )}
              </div>
            </div>

            {vaccine.sideEffects && (
              <div className="detail-section side-effects-section">
                <h3>⚠️ Side Effects</h3>
                <div className="side-effects-content">
                  <p>{vaccine.sideEffects}</p>
                </div>
              </div>
            )}

            {vaccine.notes && (
              <div className="detail-section notes-section">
                <h3>📝 Notes</h3>
                <div className="notes-content">
                  <p>{vaccine.notes}</p>
                </div>
              </div>
            )}
          </div>

          {vaccine.nextDueDate && isDueSoon(vaccine.nextDueDate) && (
            <div className="reminder-section">
              <div className="reminder-alert">
                <h4>🔔 Vaccination Reminder</h4>
                <p>This vaccine is due soon! Consider scheduling an appointment with your veterinarian.</p>
                {vaccine.vetClinic && (
                  <p><strong>Last clinic:</strong> {vaccine.vetClinic}</p>
                )}
              </div>
            </div>
          )}

          {vaccine.nextDueDate && isOverdue(vaccine.nextDueDate) && (
            <div className="reminder-section">
              <div className="overdue-alert">
                <h4>🚨 Overdue Vaccination</h4>
                <p>This vaccine is overdue! Please contact your veterinarian immediately to schedule a new vaccination.</p>
                {vaccine.vetClinic && (
                  <p><strong>Last clinic:</strong> {vaccine.vetClinic}</p>
                )}
              </div>
            </div>
          )}

          <div className="record-info">
            <p>Record created: {formatDate(vaccine.createdAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaccineDetails;