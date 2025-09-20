import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersResponse, expensesResponse] = await Promise.all([
        api.get('/admin/users'),
        api.get('/expenses')
      ]);
      
      setUsers(usersResponse.data);
      setExpenses(expensesResponse.data);
    } catch (error) {
      setError('Error fetching admin data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading admin data...</div>;
  if (error) return <div style={errorStyle}>{error}</div>;

  return (
    <div style={containerStyle}>
      <h2>Admin Dashboard</h2>
      
      <div style={sectionStyle}>
        <h3>Users</h3>
        <div style={tableContainerStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Role</th>
                <th>Expense Count</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.status}</td>
                  <td>{user.role}</td>
                  <td>{expenses.filter(e => e.user_id._id === user._id).length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={sectionStyle}>
        <h3>All Expenses</h3>
        <div style={tableContainerStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th>User</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map(expense => (
                <tr key={expense._id}>
                  <td>{expense.user_id.name}</td>
                  <td>{expense.category}</td>
                  <td>${expense.amount.toFixed(2)}</td>
                  <td>{new Date(expense.date).toLocaleDateString()}</td>
                  <td>{expense.description || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
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

const sectionStyle = {
  marginBottom: '2rem'
};

const tableContainerStyle = {
  overflowX: 'auto'
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  backgroundColor: '#fff',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const thStyle = {
  padding: '0.75rem',
  textAlign: 'left',
  backgroundColor: '#f8f9fa',
  borderBottom: '1px solid #dee2e6',
  fontWeight: 'bold'
};

const tdStyle = {
  padding: '0.75rem',
  borderBottom: '1px solid #dee2e6'
};

// Apply styles to table elements
for (let style of [thStyle, tdStyle]) {
  Object.assign(style, {
    padding: '0.75rem',
    borderBottom: '1px solid #dee2e6'
  });
}

const errorStyle = {
  color: '#dc3545',
  padding: '1rem',
  textAlign: 'center'
};

export default AdminDashboard;