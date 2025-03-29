// components/LoginLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';

const LoginLayout = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>
          <Outlet/>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  card: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '300px',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
  },
};

export default LoginLayout;
