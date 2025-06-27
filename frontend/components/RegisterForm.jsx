import { useState } from 'react';
import { useRegisterUserMutation } from '../src/features/auth/authSlice';

export default function RegisterForm({ onRegister }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [registerUser, { isLoading, error }] = useRegisterUserMutation();
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData).unwrap();
      setSuccess(true);
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>

        <label>
          First Name:
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Last Name:
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Email:
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Password:
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register'}
        </button>

        {error && <p style={{ color: 'red' }}>Registration failed.</p>}

        {success && (
          <p style={{ color: 'green' }}>
            Registration successful!{' '}
            <button
              type="button"
              onClick={onRegister}
              style={{
                background: 'none',
                border: 'none',
                color: 'blue',
                textDecoration: 'underline',
                cursor: 'pointer',
                padding: 0,
                font: 'inherit',
              }}
            >
              Log in here
            </button>
          </p>
        )}
      </form>
    </>
  );
}
