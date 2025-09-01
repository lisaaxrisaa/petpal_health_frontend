import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateVaccineMutation, useUpdateVaccineMutation, useGetVaccineByIdQuery } from '../src/features/vaccines/vaccinesSlice';
import '../css/VaccineForm.css';

const VaccineForm = ({ isEdit = false }) => {
  const navigate = useNavigate();
  const { petId, vaccineId } = useParams();
  
  const [createVaccine, { isLoading: isCreating }] = useCreateVaccineMutation();
  const [updateVaccine, { isLoading: isUpdating }] = useUpdateVaccineMutation();
  const { data: existingVaccine, isLoading: isLoadingVaccine } = useGetVaccineByIdQuery(vaccineId, {
    skip: !isEdit
  });

  const [formData, setFormData] = useState({
    vaccineName: '',
    brandName: '',
    dateAdministered: '',
    expirationDate: '',
    nextDueDate: '',
    vetClinic: '',
    veterinarian: '',
    batchLotNumber: '',
    doseNumber: '',
    totalDoses: '',
    vaccineType: '',
    sideEffects: '',
    cost: '',
    notes: ''
  });

  useEffect(() => {
    if (isEdit && existingVaccine) {
      setFormData({
        vaccineName: existingVaccine.vaccineName || '',
        brandName: existingVaccine.brandName || '',
        dateAdministered: existingVaccine.dateAdministered ? existingVaccine.dateAdministered.split('T')[0] : '',
        expirationDate: existingVaccine.expirationDate ? existingVaccine.expirationDate.split('T')[0] : '',
        nextDueDate: existingVaccine.nextDueDate ? existingVaccine.nextDueDate.split('T')[0] : '',
        vetClinic: existingVaccine.vetClinic || '',
        veterinarian: existingVaccine.veterinarian || '',
        batchLotNumber: existingVaccine.batchLotNumber || '',
        doseNumber: existingVaccine.doseNumber || '',
        totalDoses: existingVaccine.totalDoses || '',
        vaccineType: existingVaccine.vaccineType || '',
        sideEffects: existingVaccine.sideEffects || '',
        cost: existingVaccine.cost || '',
        notes: existingVaccine.notes || ''
      });
    }
  }, [isEdit, existingVaccine]);

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
      const vaccineData = {
        ...formData,
        petId: parseInt(petId)
      };

      if (isEdit) {
        await updateVaccine({ id: vaccineId, ...vaccineData }).unwrap();
      } else {
        await createVaccine(vaccineData).unwrap();
      }
      
      navigate(`/pets/${petId}?tab=vaccines`);
    } catch (error) {
      console.error('Error saving vaccine:', error);
      alert(`Failed to save vaccine record: ${error.data?.error || error.message || 'Unknown error'}`);
    }
  };

  if (isEdit && isLoadingVaccine) {
    return <div>Loading vaccine data...</div>;
  }

  return (
    <div className="vaccine-form-page">
      <div className="vaccine-form-container">
        <form onSubmit={handleSubmit} className="vaccine-form">
          <h2 className="vaccine-form-title">{isEdit ? 'Edit Vaccine Record' : 'Add Vaccine Record'}</h2>

          <div className="vaccine-form-section">
            <h3>Vaccine Information</h3>
            <div className="vaccine-form-grid">
              <div className="vaccine-form-field">
                <label htmlFor="vaccineName" className="vaccine-form-label">Vaccine Name *</label>
                <select
                  id="vaccineName"
                  name="vaccineName"
                  value={formData.vaccineName}
                  onChange={handleChange}
                  required
                  className="vaccine-form-select"
                >
                  <option value="">Select vaccine</option>
                  <optgroup label="Core Vaccines (Dogs)">
                    <option value="DHPP">DHPP (Distemper, Hepatitis, Parvovirus, Parainfluenza)</option>
                    <option value="Rabies">Rabies</option>
                  </optgroup>
                  <optgroup label="Non-Core Vaccines (Dogs)">
                    <option value="Bordetella">Bordetella (Kennel Cough)</option>
                    <option value="Lyme Disease">Lyme Disease</option>
                    <option value="Canine Influenza">Canine Influenza</option>
                    <option value="Leptospirosis">Leptospirosis</option>
                  </optgroup>
                  <optgroup label="Core Vaccines (Cats)">
                    <option value="FVRCP">FVRCP (Feline Viral Rhinotracheitis, Calicivirus, Panleukopenia)</option>
                    <option value="Rabies">Rabies</option>
                  </optgroup>
                  <optgroup label="Non-Core Vaccines (Cats)">
                    <option value="FeLV">FeLV (Feline Leukemia)</option>
                    <option value="FIV">FIV (Feline Immunodeficiency Virus)</option>
                  </optgroup>
                  <optgroup label="Other">
                    <option value="Other">Other (specify in notes)</option>
                  </optgroup>
                </select>
              </div>

              <div className="vaccine-form-field">
                <label htmlFor="brandName" className="vaccine-form-label">Brand Name</label>
                <input
                  type="text"
                  id="brandName"
                  name="brandName"
                  value={formData.brandName}
                  onChange={handleChange}
                  placeholder="e.g., Nobivac, Vanguard, Purevax"
                  className="vaccine-form-input"
                />
              </div>

              <div className="vaccine-form-field">
                <label htmlFor="vaccineType" className="vaccine-form-label">Vaccine Type</label>
                <select
                  id="vaccineType"
                  name="vaccineType"
                  value={formData.vaccineType}
                  onChange={handleChange}
                  className="vaccine-form-select"
                >
                  <option value="">Select type</option>
                  <option value="Core">Core</option>
                  <option value="Non-core">Non-core</option>
                  <option value="Required by law">Required by law</option>
                </select>
              </div>
            </div>
          </div>

          <div className="vaccine-form-section">
            <h3>Dates</h3>
            <div className="vaccine-form-grid">
              <div className="vaccine-form-field">
                <label htmlFor="dateAdministered" className="vaccine-form-label">Date Administered *</label>
                <input
                  type="date"
                  id="dateAdministered"
                  name="dateAdministered"
                  value={formData.dateAdministered}
                  onChange={handleChange}
                  required
                  className="vaccine-form-input"
                />
              </div>

              <div className="vaccine-form-field">
                <label htmlFor="expirationDate" className="vaccine-form-label">Expiration Date</label>
                <input
                  type="date"
                  id="expirationDate"
                  name="expirationDate"
                  value={formData.expirationDate}
                  onChange={handleChange}
                  className="vaccine-form-input"
                />
              </div>

              <div className="vaccine-form-field">
                <label htmlFor="nextDueDate" className="vaccine-form-label">Next Due Date</label>
                <input
                  type="date"
                  id="nextDueDate"
                  name="nextDueDate"
                  value={formData.nextDueDate}
                  onChange={handleChange}
                  className="vaccine-form-input"
                />
              </div>
            </div>
          </div>

          <div className="vaccine-form-section">
            <h3>Veterinary Information</h3>
            <div className="vaccine-form-grid">
              <div className="vaccine-form-field">
                <label htmlFor="vetClinic" className="vaccine-form-label">Veterinary Clinic</label>
                <input
                  type="text"
                  id="vetClinic"
                  name="vetClinic"
                  value={formData.vetClinic}
                  onChange={handleChange}
                  placeholder="e.g., ABC Animal Hospital"
                  className="vaccine-form-input"
                />
              </div>

              <div className="vaccine-form-field">
                <label htmlFor="veterinarian" className="vaccine-form-label">Veterinarian</label>
                <input
                  type="text"
                  id="veterinarian"
                  name="veterinarian"
                  value={formData.veterinarian}
                  onChange={handleChange}
                  placeholder="e.g., Dr. Smith"
                  className="vaccine-form-input"
                />
              </div>

              <div className="vaccine-form-field">
                <label htmlFor="cost" className="vaccine-form-label">Cost ($)</label>
                <input
                  type="number"
                  id="cost"
                  name="cost"
                  value={formData.cost}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  placeholder="e.g., 45.00"
                  className="vaccine-form-input"
                />
              </div>
            </div>
          </div>

          <div className="vaccine-form-section">
            <h3>Vaccine Details</h3>
            <div className="vaccine-form-grid">
              <div className="vaccine-form-field">
                <label htmlFor="batchLotNumber" className="vaccine-form-label">Batch/Lot Number</label>
                <input
                  type="text"
                  id="batchLotNumber"
                  name="batchLotNumber"
                  value={formData.batchLotNumber}
                  onChange={handleChange}
                  placeholder="For tracking and recalls"
                  className="vaccine-form-input"
                />
              </div>

              <div className="vaccine-form-field">
                <label htmlFor="doseNumber" className="vaccine-form-label">Dose Number</label>
                <input
                  type="number"
                  id="doseNumber"
                  name="doseNumber"
                  value={formData.doseNumber}
                  onChange={handleChange}
                  min="1"
                  placeholder="e.g., 1, 2, 3"
                  className="vaccine-form-input"
                />
              </div>

              <div className="vaccine-form-field">
                <label htmlFor="totalDoses" className="vaccine-form-label">Total Doses Required</label>
                <input
                  type="number"
                  id="totalDoses"
                  name="totalDoses"
                  value={formData.totalDoses}
                  onChange={handleChange}
                  min="1"
                  placeholder="e.g., 2, 3"
                  className="vaccine-form-input"
                />
              </div>
            </div>
          </div>

          <div className="vaccine-form-section">
            <h3>Health Information</h3>
            <div className="vaccine-form-field vaccine-form-field-full">
              <label htmlFor="sideEffects" className="vaccine-form-label">Side Effects</label>
              <textarea
                id="sideEffects"
                name="sideEffects"
                value={formData.sideEffects}
                onChange={handleChange}
                rows="3"
                placeholder="Any observed side effects or reactions..."
                className="vaccine-form-textarea"
              />
            </div>
          </div>

          <div className="vaccine-form-section">
            <h3>Additional Notes</h3>
            <div className="vaccine-form-field vaccine-form-field-full">
              <label htmlFor="notes" className="vaccine-form-label">Notes</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="4"
                placeholder="Any additional information about this vaccine..."
                className="vaccine-form-textarea"
              />
            </div>
          </div>

          <div className="vaccine-form-actions">
            <button 
              type="button" 
              className="btn secondary"
              onClick={() => navigate(`/pets/${petId}?tab=vaccines`)}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn primary"
              disabled={isCreating || isUpdating}
            >
              {isCreating || isUpdating ? 'Saving...' : (isEdit ? 'Update Record' : 'Add Record')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VaccineForm;