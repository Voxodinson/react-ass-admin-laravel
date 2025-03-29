import * as React from 'react';
import Alert from '@mui/material/Alert';
import { useState, useEffect } from 'react';

const alertStyle = {
    position: 'fixed',
    bottom: 4,
    right: 12,
    width: '400px',
    zIndex: 9999,
    marginBottom: '10px',
};

const AlertWithAutoClose = ({ message, severity }) => {
    const [open, setOpen] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(false);
        }, 3000);

        return () => clearTimeout(timer);
    });

    return open ? (
        <Alert 
            severity={severity} 
            sx={alertStyle}>
            {message}
        </Alert>
    ) : null;
};

const Success = (message) => (
    <AlertWithAutoClose 
        message={message} 
        severity="success"/>
);

const AlertMessage = (message) => (
    <AlertWithAutoClose 
        message={message} 
        severity="info"/>
);

const Warning = (message) => (
    <AlertWithAutoClose 
        message={message} 
        severity="warning"/>
);

const Error = (message) => (
    <AlertWithAutoClose 
        message={message} 
        severity="error"/>
);

export {
    Success,
    Error,
    AlertMessage,
    Warning
};
