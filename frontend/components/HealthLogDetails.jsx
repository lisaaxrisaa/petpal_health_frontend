import { useParams, useNavigate } from 'react-router-dom';
import { useGetSingleHealthLogQuery } from '../src/features/healthLogs/healthLogsSlice';
import { useDeleteHealthLogMutation } from '../src/features/healthLogs/healthLogsSlice';
import '../css/HealthLogDetails.css';

export default function HealthLogDetails() {
  const [deleteHealthLog] = useDeleteHealthLogMutation();

  const { logId } = useParams();
  const navigate = useNavigate();

  const { data: log, isLoading, error } = useGetSingleHealthLogQuery(logId);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading log.</p>;

  return (
    <>
      <div className="health-log-details-root">
        <button
          onClick={() => navigate(`/pets/${log.petId}`)}
          className="health-log-back-btn"
        >
          ← Back to Pet Details
        </button>

        <h2 className="health-log-details-title">Health Log Details</h2>

        <div className="health-log-details-card">
          <p>
            <strong>Pet:</strong>
            <span>{log.petName}</span>
          </p>
          <p>
            <strong>Date:</strong>
            <span>
              {new Date(log.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              })}
            </span>
          </p>
          <p>
            <strong>Condition:</strong>
            <span>{log.condition || 'N/A'}</span>
          </p>
          <p>
            <strong>Medications:</strong>
            <span>{log.medicationsGiven || 'None'}</span>
          </p>
          <p>
            <strong>Notes:</strong>
            <span>{log.notes}</span>
          </p>
          <p>
            <strong>Vet Visit:</strong>
            <span>{log.vetVisit ? 'Yes' : 'No'}</span>
          </p>
          <div className="health-log-details-actions">
            <button
              className="health-log-edit-btn"
              onClick={() => navigate(`/logs/${logId}/edit`)}
            >
              Edit Log
            </button>

            <button
              className="health-log-delete-btn"
              onClick={async () => {
                const confirmDelete = window.confirm(
                  'Are you sure you want to delete this health log?'
                );
                if (confirmDelete) {
                  try {
                    await deleteHealthLog(logId).unwrap();
                    alert('Health log deleted!');
                    navigate(`/pets/${log.petId}`);
                  } catch (err) {
                    console.error('Failed to delete log:', err);
                    alert('Failed to delete log. Please try again.');
                  }
                }
              }}
            >
              Delete Log
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
