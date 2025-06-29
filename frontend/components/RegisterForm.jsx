import '../css/RegisterForm.css';
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
      <div className="register-form-root">
        <div className="register-form-card">
          <form onSubmit={handleSubmit}>
            <h2 className="register-form-title">Register</h2>

            <label className="register-form-group">
              First Name:
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="register-form-input"
              />
            </label>

            <label className="register-form-group">
              Last Name:
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="register-form-input"
              />
            </label>

            <label className="register-form-group">
              Email:
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="register-form-input"
              />
            </label>

            <label className="register-form-group">
              Password:
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="register-form-input"
              />
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="register-form-button"
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>

            {!success && (
              <p className="register-form-footer">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={onRegister}
                  className="register-form-footer-link"
                >
                  Log in here
                </button>
              </p>
            )}

            {error && (
              <p className="register-form-error">
                Registration failed. Please try again.
              </p>
            )}

            {success && (
              <p className="register-form-success">
                Registration successful!{' '}
                <button
                  type="button"
                  onClick={onRegister}
                  className="register-form-link"
                >
                  Log in here
                </button>
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
