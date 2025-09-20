import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/Layout/PrivateRoute';
import Header from './components/Layout/Header';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ExpenseList from './components/Expenses/ExpenseList';
import StatsDashboard from './components/Stats/StatsDashboard';
import AdminDashboard from './components/Admin/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <main style={mainStyle}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={
                <PrivateRoute>
                  <ExpenseList />
                </PrivateRoute>
              } />
              <Route path="/expenses" element={
                <PrivateRoute>
                  <ExpenseList />
                </PrivateRoute>
              } />
              <Route path="/stats" element={
                <PrivateRoute>
                  <StatsDashboard />
                </PrivateRoute>
              } />
              <Route path="/admin" element={
                <PrivateRoute adminOnly={true}>
                  <AdminDashboard />
                </PrivateRoute>
              } />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

const mainStyle = {
  minHeight: 'calc(100vh - 80px)',
  backgroundColor: '#f8f9fa'
};

export default App;