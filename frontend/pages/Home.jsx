import HealthLogForm from '../components/HealthLogForm';
import HealthLogList from '../components/HealthLogList';

export default function Home() {
  return (
    <div>
      <h1>PetPal Health Log</h1>
      <HealthLogForm />
      <HealthLogList />
    </div>
  );
}
