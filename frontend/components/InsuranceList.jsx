import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetInsuranceByPetIdQuery } from '../src/features/insurance/insuranceSlice';
import '../css/InsuranceList.css';

const InsuranceList = ({ petId }) => {
  const navigate = useNavigate();
  const { data: insurance = [], error, isLoading } = useGetInsuranceByPetIdQuery(petId);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (amount) => {
    return amount ? `$${amount.toFixed(2)}` : 'N/A';
  };

  if (isLoading) return <div>Loading insurance...</div>;
  if (error) return <div>Error loading insurance</div>;

  return (
    <div className="insurance-list">
      {insurance.length === 0 ? (
        <div className="no-insurance">
          <p>No insurance policies found.</p>
          <button 
            className="petdetails-add-btn"
            onClick={() => navigate(`/pets/${petId}/insurance/new`)}
          >
            + Add First Insurance Policy
          </button>
        </div>
      ) : (
        <>
          <div className="insurance-header">
            <h2>Insurance Policies</h2>
            <button 
              className="petdetails-add-btn"
              onClick={() => navigate(`/pets/${petId}/insurance/new`)}
            >
              + Add Insurance
            </button>
          </div>
          <div className="insurance-cards">
            {insurance.map((policy) => (
            <div key={policy.id} className="insurance-card">
              <div className="insurance-card-header">
                <h3>{policy.provider}</h3>
                <span className={`status ${policy.status.toLowerCase()}`}>
                  {policy.status}
                </span>
              </div>

              <div className="insurance-card-body">
                <div className="policy-info">
                  <div className="policy-detail">
                    <label>Policy Number:</label>
                    <span>{policy.policyNumber}</span>
                  </div>
                  <div className="policy-detail">
                    <label>Monthly Premium:</label>
                    <span>{formatCurrency(policy.monthlyPremium)}</span>
                  </div>
                  <div className="policy-detail">
                    <label>Policy Period:</label>
                    <span>{formatDate(policy.policyStartDate)} - {formatDate(policy.policyEndDate)}</span>
                  </div>
                  <div className="policy-detail">
                    <label>Annual Limit:</label>
                    <span>{formatCurrency(policy.annualCoverageLimit)}</span>
                  </div>
                  <div className="policy-detail">
                    <label>Reimbursement:</label>
                    <span>{policy.reimbursementPercent}%</span>
                  </div>
                  <div className="policy-detail">
                    <label>Deductible:</label>
                    <span>{formatCurrency(policy.deductibleAmount)}</span>
                  </div>
                </div>

                <div className="coverage-features">
                  {policy.vetExamFees && <span className="feature">Vet Exam Fees</span>}
                  {policy.wellnessCoverage && <span className="feature">Wellness</span>}
                  {policy.rehabCoverage && <span className="feature">Rehab/Acupuncture</span>}
                  {policy.extraCarePack && <span className="feature">Extra Care Pack</span>}
                </div>
              </div>

              <div className="insurance-card-actions">
                <button 
                  className="btn secondary"
                  onClick={() => navigate(`/pets/${petId}/insurance/${policy.id}`)}
                >
                  View Details
                </button>
                <button 
                  className="btn primary"
                  onClick={() => navigate(`/pets/${petId}/insurance/${policy.id}/edit`)}
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

export default InsuranceList;