import { useNavigate } from 'react-router-dom';
import { useGetHealthLogsQuery } from '../src/features/healthLogs/healthLogsSlice';

export default function HealthLogList({ petId }) {
  const navigate = useNavigate();
  const { data: logs = [], isLoading, error } = useGetHealthLogsQuery(petId);

  if (isLoading) return <p>Loading health logs...</p>;
  if (error) return <p>Error loading logs: {error.message}</p>;

  return (
    <div>
      <button onClick={() => navigate(-1)}>← Back to Pet</button>

      <h2>Health Logs</h2>
      <ul>
        {logs.map((log) => (
          <li key={log.id}>
            <strong>{log.petName}</strong> –{' '}
            {new Date(log.date).toLocaleDateString()}
            <br />
            {log.notes}
          </li>
        ))}
      </ul>
    </div>
  );
}
