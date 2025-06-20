import { useGetHealthLogsQuery } from '../src/features/healthLogs/healthLogsSlice';

export default function HealthLogList() {
  const user = JSON.parse(localStorage.getItem('user'));
  const petId = user?.defaultPetId || 1;
  const { data: logs = [], isLoading, error } = useGetHealthLogsQuery(petId);

  if (isLoading) return <p>Loading health logs...</p>;
  if (error) return <p>Error loading logs: {error.message}</p>;

  return (
    <ul>
      {logs.map((log) => (
        <li key={log.id}>
          <strong>{log.petName}</strong> – {log.date}
          <br />
          {log.notes}
        </li>
      ))}
    </ul>
  );
}
