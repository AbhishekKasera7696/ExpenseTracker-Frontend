import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const MonthlyChange = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMonthlyChange();
  }, []);

  const fetchMonthlyChange = async () => {
    try {
      const response = await api.get('/stats/monthly-change');
      setData(response.data);
    } catch (error) {
      setError('Error fetching monthly change data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading monthly change...</div>;
  if (error) return <div style={errorStyle}>{error}</div>;
  if (!data) return <div>No data available</div>;

  const isIncrease = data.percentageChange >= 0;
  const changeText = isIncrease ? 'increase' : 'decrease';

  return (
    <div style={containerStyle}>
      <h3>Monthly Change</h3>
      <div style={statsStyle}>
        <div style={statItemStyle}>
          <div style={labelStyle}>Current Month</div>
          <div style={valueStyle}>${data.currentMonth.total.toFixed(2)}</div>
        </div>
        <div style={statItemStyle}>
          <div style={labelStyle}>Previous Month</div>
          <div style={valueStyle}>${data.previousMonth.total.toFixed(2)}</div>
        </div>
        <div style={statItemStyle}>
          <div style={labelStyle}>Change</div>
          <div style={{ ...valueStyle, color: isIncrease ? '#dc3545' : '#28a745' }}>
            {Math.abs(data.percentageChange)}% {changeText}
          </div>
        </div>
      </div>
    </div>
  );
};

const containerStyle = {
  padding: '1rem',
  border: '1px solid #ddd',
  borderRadius: '4px',
  marginBottom: '1rem'
};

const statsStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  flexWrap: 'wrap',
  gap: '1rem'
};

const statItemStyle = {
  textAlign: 'center'
};

const labelStyle = {
  fontSize: '0.9rem',
  color: '#6c757d',
  marginBottom: '0.5rem'
};

const valueStyle = {
  fontSize: '1.2rem',
  fontWeight: 'bold'
};

const errorStyle = {
  color: '#dc3545'
};

export default MonthlyChange;