import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import { AlertProvider } from "./context/AlertProvider"; // Import AlertProvider
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Router>
        <AuthProvider>
            <AlertProvider> {/* Wrap inside AuthProvider */}
                <App />
            </AlertProvider>
        </AuthProvider>
    </Router>
);
