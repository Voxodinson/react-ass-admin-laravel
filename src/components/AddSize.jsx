import React, { useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText } from '@mui/material';

const AddSize = ({ sizes, addSize }) => {
    const [size, setSize] = useState('');

    const handleAddSize = () => {
        if (size.trim() && !sizes.includes(size.trim())) {
            addSize(size.trim());
            setSize(''); // Clear the input field
        }
    };

    const handleChange = (e) => {
        setSize(e.target.value);
    };

    return (
        <div>
            <TextField
                label="Size"
                id="outlined-size-small"
                value={size}
                onChange={handleChange}
                size="small"
                className="w-[calc(98%/2)]"
            />
            <Button onClick={handleAddSize} variant="contained" color="primary" style={{ marginTop: '10px' }}>
                Add Size
            </Button>

            <List>
                {sizes.map((size, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={size} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};
