import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const TopDays = () => {
  const [topDays, setTopDays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTopDays();
  }, []);

  const fetchTopDays = async () => {
    try {
      const response = await api.get('/stats/top-days');
      setTopDays(response.data);
    } catch (error) {
      setError('Error fetching top days data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading top days...</div>;
  if (error) return <div style={errorStyle}>{error}</div>;

  return (
    <div style={containerStyle}>
      <h3>Top 3 Spending Days</h3>
      {topDays.length === 0 ? (
        <p>No data available</p>
      ) : (
        <div style={listStyle}>
          {topDays.map((day, index) => (
            <div key={index} style={itemStyle}>
              <div style={dateStyle}>{day._id}</div>
              <div style={amountStyle}>${day.totalAmount.toFixed(2)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const containerStyle = {
  padding: '1rem',
  border: '1px solid #ddd',
  borderRadius: '4px',
  marginBottom: '1rem'
};

const listStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem'
};

const itemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0.5rem',
  backgroundColor: '#f8f9fa',
  borderRadius: '4px'
};

const dateStyle = {
  fontWeight: 'bold'
};

const amountStyle = {
  color: '#28a745'
};

const errorStyle = {
  color: '#dc3545'
};

export default TopDays;