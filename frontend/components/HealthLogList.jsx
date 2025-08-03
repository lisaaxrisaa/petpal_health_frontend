import { useNavigate } from 'react-router-dom';
import { useGetHealthLogsQuery } from '../src/features/healthLogs/healthLogsSlice';
import '../css/HealthLogList.css';

export default function HealthLogList({ petId }) {
  const navigate = useNavigate();
  const { data: logs = [], isLoading, error } = useGetHealthLogsQuery(petId);

  if (isLoading) return <p>Loading health logs...</p>;
  if (error) return <p>Error loading logs: {error.message}</p>;

  return (
    <>
      {logs.length === 0 ? (
        <div className="health-log-empty">
          No health logs found for this pet.
        </div>
      ) : (
        <div className="health-log-list">
          {logs.map((log) => (
            <div
              key={log.id}
              className="health-log-card"
              onClick={() => navigate(`/logs/${log.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <div className="health-log-header">
                <span className="health-log-pet-name">{log.petName}</span>
                <span className="health-log-date">
                  {new Date(log.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })}
                </span>
              </div>
              <div className="health-log-notes">{log.notes}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
