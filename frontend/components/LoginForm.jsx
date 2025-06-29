import { useState } from 'react';
import { useLoginUserMutation } from '../src/features/users/usersSlice';
import '../css/LoginForm.css';

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
      if (onLogin) onLogin();
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <>
      <div className="login-form-root">
        <div className="login-form-card">
          <form onSubmit={handleSubmit}>
            <h2 className="login-form-title">Login</h2>

            <label className="login-form-group">
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="login-form-input"
              />
            </label>

            <label className="login-form-group">
              Password:
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="login-form-input"
              />
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="login-form-button"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>

            <p className="login-form-footer">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={onToggle}
                className="login-form-link"
              >
                Register here
              </button>
            </p>

            {error && (
              <p className="login-form-error">
                Login failed. Please check your email and password.
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
