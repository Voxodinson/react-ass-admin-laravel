import React, { createContext, useContext, useState } from "react";
import Alert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";

const AlertContext = createContext();

let showGlobalAlert = () => {};

export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState({ message: "", severity: "info", open: false });

    const showAlert = (message, severity = "info") => {
        setAlert({ message, severity, open: true });

        setTimeout(() => {
            setAlert(prev => ({ ...prev, open: false }));
        }, 3000);
    };

    showGlobalAlert = showAlert;

    return (
        <AlertContext.Provider value={showAlert}>
            {children}
            <Snackbar 
                open={alert.open} 
                autoHideDuration={3000}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert severity={alert.severity}>{alert.message}</Alert>
            </Snackbar>
        </AlertContext.Provider>
    );
};

export const useAlert = () => useContext(AlertContext);

export const Message = (message, severity = "info") => {
    if (showGlobalAlert) {
        showGlobalAlert(message, severity);
    } else {
        console.warn("Alert system is not initialized yet.");
    }
};
