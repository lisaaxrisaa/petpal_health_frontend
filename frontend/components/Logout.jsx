export default function LogoutButton({ onLogout }) {
  const handleLogout = () => {
    localStorage.clear();
    onLogout();
  };

  return <button onClick={handleLogout}>Logout</button>;
}
