import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import ExpenseItem from './ExpenseItem';
import ExpenseForm from './ExpenseForm';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await api.get('/expenses');
      setExpenses(response.data);
    } catch (error) {
      setError('Error fetching expenses');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await api.delete(`/expenses/${id}`);
        setExpenses(expenses.filter(expense => expense._id !== id));
      } catch (error) {
        setError('Error deleting expense');
      }
    }
  };

  const handleSave = () => {
    setShowForm(false);
    setEditingExpense(null);
    fetchExpenses();
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingExpense(null);
  };

  if (loading) return <div style={loadingStyle}>Loading expenses...</div>;
  if (error) return <div style={errorStyle}>{error}</div>;

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2>Expenses</h2>
        <button 
          onClick={() => setShowForm(true)}
          style={addButtonStyle}
        >
          Add Expense
        </button>
      </div>

      {showForm && (
        <ExpenseForm
          expense={editingExpense}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}

      {expenses.length === 0 ? (
        <div style={emptyStyle}>No expenses found. Add your first expense!</div>
      ) : (
        <div style={listStyle}>
          {expenses.map(expense => (
            <ExpenseItem
              key={expense._id}
              expense={expense}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const containerStyle = {
  maxWidth: '800px',
  margin: '0 auto',
  padding: '1rem'
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '2rem'
};

const addButtonStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

const listStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
};

const loadingStyle = {
  textAlign: 'center',
  padding: '2rem',
  fontSize: '1.2rem'
};

const errorStyle = {
  color: '#dc3545',
  padding: '1rem',
  textAlign: 'center',
  backgroundColor: '#f8d7da',
  border: '1px solid #dc3545',
  borderRadius: '4px',
  margin: '1rem 0'
};

const emptyStyle = {
  textAlign: 'center',
  padding: '2rem',
  fontSize: '1.2rem',
  color: '#6c757d'
};

export default ExpenseList;