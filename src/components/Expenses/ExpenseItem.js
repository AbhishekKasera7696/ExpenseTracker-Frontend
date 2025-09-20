import React from 'react';

const ExpenseItem = ({ expense, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatAmount = (amount) => {
    return `$${parseFloat(amount).toFixed(2)}`;
  };

  return (
    <div style={itemStyle}>
      <div style={infoStyle}>
        <div style={categoryStyle}>{expense.category}</div>
        <div style={amountStyle}>{formatAmount(expense.amount)}</div>
        <div style={dateStyle}>{formatDate(expense.date)}</div>
        {expense.description && (
          <div style={descriptionStyle}>{expense.description}</div>
        )}
        {expense.user_id && expense.user_id.name && (
          <div style={userStyle}>Added by: {expense.user_id.name}</div>
        )}
      </div>
      <div style={actionsStyle}>
        <button 
          onClick={() => onEdit(expense)}
          style={editButtonStyle}
        >
          Edit
        </button>
        <button 
          onClick={() => onDelete(expense._id)}
          style={deleteButtonStyle}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

const itemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem',
  border: '1px solid #ddd',
  borderRadius: '4px',
  backgroundColor: '#fff'
};

const infoStyle = {
  flex: 1
};

const categoryStyle = {
  fontWeight: 'bold',
  fontSize: '1.1rem',
  marginBottom: '0.5rem'
};

const amountStyle = {
  fontSize: '1.2rem',
  color: '#28a745',
  marginBottom: '0.5rem'
};

const dateStyle = {
  color: '#6c757d',
  marginBottom: '0.5rem'
};

const descriptionStyle = {
  color: '#6c757d',
  fontStyle: 'italic',
  marginBottom: '0.5rem'
};

const userStyle = {
  fontSize: '0.9rem',
  color: '#6c757d'
};

const actionsStyle = {
  display: 'flex',
  gap: '0.5rem'
};

const editButtonStyle = {
  padding: '0.5rem',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

const deleteButtonStyle = {
  padding: '0.5rem',
  backgroundColor: '#dc3545',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default ExpenseItem;