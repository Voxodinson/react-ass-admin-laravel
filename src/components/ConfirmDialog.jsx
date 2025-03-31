import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

import {
    CircleAlert
} from 'lucide-react';
export default function ConfirmDialog({ 
    open, 
    onClose, 
    title,
    onConfirm 
})  {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle 
                id="alert-dialog-title"
                className="text-yellow-500 flex gap-4 items-center font-thin">
                    <CircleAlert 
                        strokeWidth={0.5}
                        size={50} />
                    {title}
            </DialogTitle>
            <DialogActions>
                <Button 
                    onClick={onClose}>
                    Disagree
                </Button>
                <Button 
                    onClick={onConfirm} 
                    autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    );
}
