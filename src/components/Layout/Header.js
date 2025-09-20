import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        <Link to="/" style={logoStyle}>
          Expense Tracker
        </Link>
        <nav style={navStyle}>
          {user ? (
            <>
              <Link to="/expenses" style={linkStyle}>
                Expenses
              </Link>
              <Link to="/stats" style={linkStyle}>
                Statistics
              </Link>
              {user.role === 'admin' && (
                <Link to="/admin" style={linkStyle}>
                  Admin
                </Link>
              )}
              <span style={userStyle}>Hello, {user.name}</span>
              <button onClick={handleLogout} style={buttonStyle}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={linkStyle}>
                Login
              </Link>
              <Link to="/register" style={linkStyle}>
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

const headerStyle = {
  backgroundColor: '#333',
  color: 'white',
  padding: '1rem 0',
  marginBottom: '2rem'
};

const containerStyle = {
  width: '90%',
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const logoStyle = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '1.5rem',
  fontWeight: 'bold'
};

const navStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem'
};

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  padding: '0.5rem'
};

const userStyle = {
  margin: '0 1rem'
};

const buttonStyle = {
  background: '#dc3545',
  color: 'white',
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default Header;