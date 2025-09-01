import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateInsuranceMutation, useUpdateInsuranceMutation, useGetInsuranceByIdQuery } from '../src/features/insurance/insuranceSlice';
import '../css/InsuranceForm.css';

const InsuranceForm = ({ isEdit = false }) => {
  const navigate = useNavigate();
  const { petId, insuranceId } = useParams();
  
  const [createInsurance, { isLoading: isCreating }] = useCreateInsuranceMutation();
  const [updateInsurance, { isLoading: isUpdating }] = useUpdateInsuranceMutation();
  const { data: existingInsurance, isLoading: isLoadingInsurance } = useGetInsuranceByIdQuery(insuranceId, {
    skip: !isEdit
  });

  const [formData, setFormData] = useState({
    provider: '',
    policyNumber: '',
    status: 'Active',
    policyStartDate: '',
    policyEndDate: '',
    annualCoverageLimit: '',
    reimbursementPercent: '',
    deductibleAmount: '',
    monthlyPremium: '',
    vetExamFees: false,
    wellnessCoverage: false,
    rehabCoverage: false,
    extraCarePack: false,
    nextBillingDate: '',
    notes: ''
  });

  useEffect(() => {
    if (isEdit && existingInsurance) {
      setFormData({
        provider: existingInsurance.provider || '',
        policyNumber: existingInsurance.policyNumber || '',
        status: existingInsurance.status || 'Active',
        policyStartDate: existingInsurance.policyStartDate ? existingInsurance.policyStartDate.split('T')[0] : '',
        policyEndDate: existingInsurance.policyEndDate ? existingInsurance.policyEndDate.split('T')[0] : '',
        annualCoverageLimit: existingInsurance.annualCoverageLimit || '',
        reimbursementPercent: existingInsurance.reimbursementPercent || '',
        deductibleAmount: existingInsurance.deductibleAmount || '',
        monthlyPremium: existingInsurance.monthlyPremium || '',
        vetExamFees: existingInsurance.vetExamFees || false,
        wellnessCoverage: existingInsurance.wellnessCoverage || false,
        rehabCoverage: existingInsurance.rehabCoverage || false,
        extraCarePack: existingInsurance.extraCarePack || false,
        nextBillingDate: existingInsurance.nextBillingDate ? existingInsurance.nextBillingDate.split('T')[0] : '',
        notes: existingInsurance.notes || ''
      });
    }
  }, [isEdit, existingInsurance]);

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
      const insuranceData = {
        ...formData,
        petId: parseInt(petId)
      };

      if (isEdit) {
        await updateInsurance({ id: insuranceId, ...insuranceData }).unwrap();
      } else {
        await createInsurance(insuranceData).unwrap();
      }
      
      navigate(`/pets/${petId}?tab=insurance`);
    } catch (error) {
      console.error('Error saving insurance:', error);
      alert(`Failed to save insurance policy: ${error.data?.error || error.message || 'Unknown error'}`);
    }
  };

  if (isEdit && isLoadingInsurance) {
    return <div>Loading insurance data...</div>;
  }

  return (
    <div className="insurance-form-page">
      <div className="insurance-form-container">
        <form onSubmit={handleSubmit} className="insurance-form">
          <h2 className="insurance-form-title">{isEdit ? 'Edit Insurance Policy' : 'Add Insurance Policy'}</h2>
          <div className="insurance-form-section">
            <h3>Policy Information</h3>
            <div className="insurance-form-grid">
              <div className="insurance-form-field">
                <label htmlFor="provider" className="insurance-form-label">Insurance Provider *</label>
                <input
                  type="text"
                  id="provider"
                  name="provider"
                  value={formData.provider}
                  onChange={handleChange}
                  required
                  placeholder="e.g., FIGO, Petplan"
                  className="insurance-form-input"
                />
              </div>

              <div className="insurance-form-field">
                <label htmlFor="policyNumber" className="insurance-form-label">Policy Number *</label>
                <input
                  type="text"
                  id="policyNumber"
                  name="policyNumber"
                  value={formData.policyNumber}
                  onChange={handleChange}
                  required
                  className="insurance-form-input"
                />
              </div>

              <div className="insurance-form-field">
                <label htmlFor="status" className="insurance-form-label">Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="insurance-form-select"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Expired">Expired</option>
                </select>
              </div>
            </div>
          </div>

          <div className="insurance-form-section">
            <h3>Policy Dates</h3>
            <div className="insurance-form-grid">
              <div className="insurance-form-field">
                <label htmlFor="policyStartDate" className="insurance-form-label">Policy Start Date *</label>
                <input
                  type="date"
                  id="policyStartDate"
                  name="policyStartDate"
                  value={formData.policyStartDate}
                  onChange={handleChange}
                  required
                  className="insurance-form-input"
                />
              </div>

              <div className="insurance-form-field">
                <label htmlFor="policyEndDate" className="insurance-form-label">Policy End Date *</label>
                <input
                  type="date"
                  id="policyEndDate"
                  name="policyEndDate"
                  value={formData.policyEndDate}
                  onChange={handleChange}
                  required
                  className="insurance-form-input"
                />
              </div>

              <div className="insurance-form-field">
                <label htmlFor="nextBillingDate" className="insurance-form-label">Next Billing Date</label>
                <input
                  type="date"
                  id="nextBillingDate"
                  name="nextBillingDate"
                  value={formData.nextBillingDate}
                  onChange={handleChange}
                  className="insurance-form-input"
                />
              </div>
            </div>
          </div>

          <div className="insurance-form-section">
            <h3>Coverage Details</h3>
            <div className="insurance-form-grid">
              <div className="insurance-form-field">
                <label htmlFor="annualCoverageLimit" className="insurance-form-label">Annual Coverage Limit ($)</label>
                <input
                  type="number"
                  id="annualCoverageLimit"
                  name="annualCoverageLimit"
                  value={formData.annualCoverageLimit}
                  onChange={handleChange}
                  step="0.01"
                  placeholder="e.g., 10000.00"
                  className="insurance-form-input"
                />
              </div>

              <div className="insurance-form-field">
                <label htmlFor="reimbursementPercent" className="insurance-form-label">Reimbursement Percentage</label>
                <input
                  type="number"
                  id="reimbursementPercent"
                  name="reimbursementPercent"
                  value={formData.reimbursementPercent}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  placeholder="e.g., 70"
                  className="insurance-form-input"
                />
              </div>

              <div className="insurance-form-field">
                <label htmlFor="deductibleAmount" className="insurance-form-label">Deductible Amount ($)</label>
                <input
                  type="number"
                  id="deductibleAmount"
                  name="deductibleAmount"
                  value={formData.deductibleAmount}
                  onChange={handleChange}
                  step="0.01"
                  placeholder="e.g., 700.00"
                  className="insurance-form-input"
                />
              </div>

              <div className="insurance-form-field">
                <label htmlFor="monthlyPremium" className="insurance-form-label">Monthly Premium ($)</label>
                <input
                  type="number"
                  id="monthlyPremium"
                  name="monthlyPremium"
                  value={formData.monthlyPremium}
                  onChange={handleChange}
                  step="0.01"
                  placeholder="e.g., 44.39"
                  className="insurance-form-input"
                />
              </div>
            </div>
          </div>

          <div className="insurance-form-section">
            <h3>Coverage Features</h3>
            <div className="insurance-form-checkbox-grid">
              <div className="insurance-form-checkbox-group">
                <input
                  type="checkbox"
                  id="vetExamFees"
                  name="vetExamFees"
                  checked={formData.vetExamFees}
                  onChange={handleChange}
                />
                <label htmlFor="vetExamFees">Vet Exam Fees</label>
              </div>

              <div className="insurance-form-checkbox-group">
                <input
                  type="checkbox"
                  id="wellnessCoverage"
                  name="wellnessCoverage"
                  checked={formData.wellnessCoverage}
                  onChange={handleChange}
                />
                <label htmlFor="wellnessCoverage">Wellness Coverage</label>
              </div>

              <div className="insurance-form-checkbox-group">
                <input
                  type="checkbox"
                  id="rehabCoverage"
                  name="rehabCoverage"
                  checked={formData.rehabCoverage}
                  onChange={handleChange}
                />
                <label htmlFor="rehabCoverage">Rehab, Acupuncture, Chiropractic</label>
              </div>

              <div className="insurance-form-checkbox-group">
                <input
                  type="checkbox"
                  id="extraCarePack"
                  name="extraCarePack"
                  checked={formData.extraCarePack}
                  onChange={handleChange}
                />
                <label htmlFor="extraCarePack">Extra Care Pack</label>
              </div>
            </div>
          </div>

          <div className="insurance-form-section">
            <h3>Notes</h3>
            <div className="insurance-form-field insurance-form-field-full">
              <label htmlFor="notes" className="insurance-form-label">Additional Notes</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="4"
                placeholder="Any additional notes about this insurance policy..."
                className="insurance-form-textarea"
              />
            </div>
          </div>

          <div className="insurance-form-actions">
            <button 
              type="button" 
              className="btn secondary"
              onClick={() => navigate(`/pets/${petId}?tab=insurance`)}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn primary"
              disabled={isCreating || isUpdating}
            >
              {isCreating || isUpdating ? 'Saving...' : (isEdit ? 'Update Policy' : 'Add Policy')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InsuranceForm;