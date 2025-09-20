import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const ExpenseForm = ({ expense, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (expense) {
      setFormData({
        category: expense.category,
        amount: expense.amount,
        date: new Date(expense.date).toISOString().split('T')[0],
        description: expense.description || ''
      });
    }
    
    setCategories(['Food', 'Transport', 'Entertainment', 'Utilities', 'Rent', 'Other']);
  }, [expense]);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (expense) {
        await api.put(`/expenses/${expense._id}`, formData);
      } else {
        await api.post('/expenses', formData);
      }
      
      onSave();
    } catch (error) {
      setError(error.response?.data?.message || 'Error saving expense');
    }
    
    setLoading(false);
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>{expense ? 'Edit Expense' : 'Add Expense'}</h2>
      {error && <div style={errorStyle}>{error}</div>}
      <form onSubmit={onSubmit} style={formStyle}>
        <div style={inputGroupStyle}>
          <label htmlFor="category" style={labelStyle}>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={onChange}
            required
            style={selectStyle}
          >
            <option value="">Select a category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div style={inputGroupStyle}>
          <label htmlFor="amount" style={labelStyle}>Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={onChange}
            required
            min="0"
            step="0.01"
            style={inputStyle}
          />
        </div>
        <div style={inputGroupStyle}>
          <label htmlFor="date" style={labelStyle}>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={onChange}
            required
            style={inputStyle}
          />
        </div>
        <div style={inputGroupStyle}>
          <label htmlFor="description" style={labelStyle}>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={onChange}
            style={textareaStyle}
            rows="3"
          />
        </div>
        <div style={buttonGroupStyle}>
          <button 
            type="submit" 
            disabled={loading}
            style={submitButtonStyle}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
          <button 
            type="button" 
            onClick={onCancel}
            style={cancelButtonStyle}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

const containerStyle = {
  maxWidth: '500px',
  margin: '0 auto',
  padding: '1rem'
};

const headingStyle = {
  marginBottom: '1.5rem',
  textAlign: 'center'
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

const selectStyle = {
  ...inputStyle,
  height: '2.5rem'
};

const textareaStyle = {
  ...inputStyle,
  resize: 'vertical'
};

const buttonGroupStyle = {
  display: 'flex',
  gap: '1rem'
};

const submitButtonStyle = {
  padding: '0.75rem',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  fontSize: '1rem',
  cursor: 'pointer',
  flex: 1
};

const cancelButtonStyle = {
  padding: '0.75rem',
  backgroundColor: '#6c757d',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  fontSize: '1rem',
  cursor: 'pointer',
  flex: 1
};

const errorStyle = {
  color: '#dc3545',
  padding: '0.5rem',
  marginBottom: '1rem',
  border: '1px solid #dc3545',
  borderRadius: '4px',
  backgroundColor: '#f8d7da'
};

export default ExpenseForm;