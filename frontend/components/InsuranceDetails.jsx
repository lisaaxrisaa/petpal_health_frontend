import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetInsuranceByIdQuery, useDeleteInsuranceMutation } from '../src/features/insurance/insuranceSlice';
import '../css/InsuranceDetails.css';

const InsuranceDetails = () => {
  const navigate = useNavigate();
  const { petId, insuranceId } = useParams();
  
  const { data: insurance, error, isLoading } = useGetInsuranceByIdQuery(insuranceId);
  const [deleteInsurance, { isLoading: isDeleting }] = useDeleteInsuranceMutation();

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (amount) => {
    return amount ? `$${amount.toFixed(2)}` : 'N/A';
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this insurance policy?')) {
      try {
        await deleteInsurance(insuranceId).unwrap();
        navigate(`/pets/${petId}?tab=insurance`);
      } catch (error) {
        console.error('Error deleting insurance:', error);
        alert('Failed to delete insurance policy');
      }
    }
  };

  if (isLoading) return <div>Loading insurance details...</div>;
  if (error) return <div>Error loading insurance details</div>;
  if (!insurance) return <div>Insurance policy not found</div>;

  return (
    <div className="page-wrapper">
      <div className="insurance-details-container">
        <div className="details-header">
          <button 
            className="btn secondary"
            onClick={() => navigate(`/pets/${petId}?tab=insurance`)}
          >
            ← Back to Insurance
          </button>
          <div className="header-actions">
            <button 
              className="btn secondary"
              onClick={() => navigate(`/pets/${petId}/insurance/${insuranceId}/edit`)}
            >
              Edit Policy
            </button>
            <button 
              className="btn danger"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete Policy'}
            </button>
          </div>
        </div>

        <div className="insurance-details">
          <div className="details-card">
            <div className="card-header">
              <h2>{insurance.provider}</h2>
              <span className={`status ${insurance.status.toLowerCase()}`}>
                {insurance.status}
              </span>
            </div>

            <div className="details-grid">
              <div className="detail-section">
                <h3>Policy Information</h3>
                <div className="detail-items">
                  <div className="detail-item">
                    <label>Policy Number:</label>
                    <span>{insurance.policyNumber}</span>
                  </div>
                  <div className="detail-item">
                    <label>Pet Name:</label>
                    <span>{insurance.petName || 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <label>Policy Start Date:</label>
                    <span>{formatDate(insurance.policyStartDate)}</span>
                  </div>
                  <div className="detail-item">
                    <label>Policy End Date:</label>
                    <span>{formatDate(insurance.policyEndDate)}</span>
                  </div>
                  <div className="detail-item">
                    <label>Next Billing Date:</label>
                    <span>{formatDate(insurance.nextBillingDate)}</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Financial Details</h3>
                <div className="detail-items">
                  <div className="detail-item">
                    <label>Monthly Premium:</label>
                    <span className="highlight-amount">{formatCurrency(insurance.monthlyPremium)}</span>
                  </div>
                  <div className="detail-item">
                    <label>Annual Coverage Limit:</label>
                    <span>{formatCurrency(insurance.annualCoverageLimit)}</span>
                  </div>
                  <div className="detail-item">
                    <label>Reimbursement Percentage:</label>
                    <span>{insurance.reimbursementPercent ? `${insurance.reimbursementPercent}%` : 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <label>Deductible Amount:</label>
                    <span>{formatCurrency(insurance.deductibleAmount)}</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Coverage Features</h3>
                <div className="coverage-features">
                  <div className={`feature-item ${insurance.vetExamFees ? 'included' : 'not-included'}`}>
                    <span className="feature-icon">{insurance.vetExamFees ? '✓' : '✗'}</span>
                    <span>Vet Exam Fees</span>
                  </div>
                  <div className={`feature-item ${insurance.wellnessCoverage ? 'included' : 'not-included'}`}>
                    <span className="feature-icon">{insurance.wellnessCoverage ? '✓' : '✗'}</span>
                    <span>Wellness Coverage</span>
                  </div>
                  <div className={`feature-item ${insurance.rehabCoverage ? 'included' : 'not-included'}`}>
                    <span className="feature-icon">{insurance.rehabCoverage ? '✓' : '✗'}</span>
                    <span>Rehab, Acupuncture, Chiropractic</span>
                  </div>
                  <div className={`feature-item ${insurance.extraCarePack ? 'included' : 'not-included'}`}>
                    <span className="feature-icon">{insurance.extraCarePack ? '✓' : '✗'}</span>
                    <span>Extra Care Pack</span>
                  </div>
                </div>
              </div>

              {insurance.notes && (
                <div className="detail-section full-width">
                  <h3>Notes</h3>
                  <div className="notes-content">
                    <p>{insurance.notes}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsuranceDetails;