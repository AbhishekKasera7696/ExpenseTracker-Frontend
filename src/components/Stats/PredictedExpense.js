import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const PredictedExpense = () => {
  const [predictedExpense, setPredictedExpense] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPredictedExpense();
  }, []);

  const fetchPredictedExpense = async () => {
    try {
      const response = await api.get('/stats/predicted-expense');
      setPredictedExpense(response.data.predictedExpense);
    } catch (error) {
      setError('Error fetching predicted expense');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading prediction...</div>;
  if (error) return <div style={errorStyle}>{error}</div>;

  return (
    <div style={containerStyle}>
      <h3>Next Month Prediction</h3>
      <div style={predictionStyle}>
        <div style={labelStyle}>Predicted Expense</div>
        <div style={amountStyle}>${predictedExpense}</div>
        <div style={noteStyle}>
          Based on average spending of last 3 months
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

const predictionStyle = {
  textAlign: 'center'
};

const labelStyle = {
  fontSize: '1rem',
  color: '#6c757d',
  marginBottom: '0.5rem'
};

const amountStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#007bff',
  marginBottom: '0.5rem'
};

const noteStyle = {
  fontSize: '0.8rem',
  color: '#6c757d',
  fontStyle: 'italic'
};

const errorStyle = {
  color: '#dc3545'
};

export default PredictedExpense;