import React from 'react';
import TopDays from './TopDays';
import MonthlyChange from './MonthlyChange';
import PredictedExpense from './PredictedExpense';

const StatsDashboard = () => {
  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Expense Statistics</h2>
      <div style={gridStyle}>
        <div style={cardStyle}>
          <TopDays />
        </div>
        <div style={cardStyle}>
          <MonthlyChange />
        </div>
        <div style={cardStyle}>
          <PredictedExpense />
        </div>
      </div>
    </div>
  );
};

const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '1rem'
};

const headingStyle = {
  textAlign: 'center',
  marginBottom: '2rem'
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '1rem'
};

const cardStyle = {
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

export default StatsDashboard;