import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { X } from 'lucide-react';
export default function SelectMenu({
  label,
  data,
  value,
  onChange,
}) {
    const handleChange = (event) => {
        onChange(event.target.value);
    };
return (
    <FormControl className='w-full h-fit relative' size='small'>
        <InputLabel 
            id={`${label}-select-label`}>
            {label}
        </InputLabel>
        <Select
            labelId={`${label}-select-label`}
            id={`${label}-select`}
            value={value}
            label={label}
            onChange={handleChange}>
            {data.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                {item.label}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
);
}
