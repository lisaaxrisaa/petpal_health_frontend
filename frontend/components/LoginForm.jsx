import { useState } from 'react';
import { useLoginUserMutation } from '../src/features/users/usersSlice';

export default function LoginForm({ onLogin, onToggle }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loginUser, { isLoading, error }] = useLoginUserMutation();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(formData).unwrap();
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      if (onLogin) onLogin(); // Callback to App.jsx
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
      <p>
        Don’t have an account?{' '}
        <button
          type="button"
          onClick={onToggle}
          style={{
            color: 'blue',
            textDecoration: 'underline',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Register here
        </button>
      </p>

      {error && (
        <p style={{ color: 'red' }}>
          Login failed. Please check your email and password.
        </p>
      )}
    </form>
  );
}
