import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(email, password);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <h2 style={headingStyle}>Login</h2>
        {error && <div style={errorStyle}>{error}</div>}
        <form onSubmit={onSubmit} style={formStyle}>
          <div style={inputGroupStyle}>
            <label htmlFor="email" style={labelStyle}>Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              required
              style={inputStyle}
            />
          </div>
          <div style={inputGroupStyle}>
            <label htmlFor="password" style={labelStyle}>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
              style={inputStyle}
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            style={buttonStyle}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p style={textStyle}>
          Don't have an account? <Link to="/register" style={linkStyle}>Register</Link>
        </p>
      </div>
    </div>
  );
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '60vh'
};

const formContainerStyle = {
  width: '100%',
  maxWidth: '400px',
  padding: '2rem',
  border: '1px solid #ddd',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const headingStyle = {
  textAlign: 'center',
  marginBottom: '1.5rem',
  color: '#333'
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column'
};

const inputGroupStyle = {
  marginBottom: '1rem'
};

const labelStyle = {
  display: 'block',
  marginBottom: '0.5rem',
  fontWeight: 'bold'
};

const inputStyle = {
  width: '100%',
  padding: '0.5rem',
  border: '1px solid #ddd',
  borderRadius: '4px',
  fontSize: '1rem'
};

const buttonStyle = {
  padding: '0.75rem',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  fontSize: '1rem',
  cursor: 'pointer',
  marginBottom: '1rem'
};

const textStyle = {
  textAlign: 'center'
};

const linkStyle = {
  color: '#007bff',
  textDecoration: 'none'
};

const errorStyle = {
  color: '#dc3545',
  padding: '0.5rem',
  marginBottom: '1rem',
  border: '1px solid #dc3545',
  borderRadius: '4px',
  backgroundColor: '#f8d7da'
};

export default Login;