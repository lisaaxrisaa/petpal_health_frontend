import { useParams, useNavigate } from 'react-router-dom';
import { useGetSingleHealthLogQuery } from '../src/features/healthLogs/healthLogsSlice';

export default function HealthLogDetails() {
  const { logId } = useParams();
  const navigate = useNavigate();

  const { data: log, isLoading, error } = useGetSingleHealthLogQuery(logId);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading log.</p>;

  return (
    <div className="health-log-details-root">
      <button onClick={() => navigate(-1)} className="health-log-back-btn">
        ← Back
      </button>

      <h2 className="health-log-details-title">Health Log Details</h2>

      <div className="health-log-details-card">
        <p>
          <strong>Pet:</strong> {log.petName}
        </p>
        <p>
          <strong>Date:</strong> {new Date(log.date).toLocaleDateString()}
        </p>
        <p>
          <strong>Condition:</strong> {log.condition || 'N/A'}
        </p>
        <p>
          <strong>Medications:</strong> {log.medicationsGiven || 'None'}
        </p>
        <p>
          <strong>Notes:</strong> {log.notes}
        </p>
        <p>
          <strong>Vet Visit:</strong> {log.vetVisit ? 'Yes' : 'No'}
        </p>
      </div>
    </div>
  );
}
