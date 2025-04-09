import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectAutoWidth({ label = 'Select', value, onChange, items = [] }) {
  return (
    <div style={{ padding: '0px' }}>
      <FormControl
        sx={{
          m: 1,
          minWidth: 120,
          '& .MuiInputLabel-root': { color: 'white' },
          '& .MuiInputLabel-root.Mui-focused': { color: 'white' },
          '& .MuiOutlinedInput-root': {
            color: 'white',
            '& fieldset': { borderColor: 'white' },
            '&:hover fieldset': { borderColor: 'white' },
            '&.Mui-focused fieldset': { borderColor: 'white' }
          },
          '& .MuiSelect-icon': { color: 'white' }
        }}
      >
        <InputLabel id="custom-select-label">{label}</InputLabel>
        <Select
          labelId="custom-select-label"
          id="custom-select"
          value={value}
          onChange={onChange}
          autoWidth
          label={label}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: '#333',
                color: 'white'
              }
            }
          }}
        >
          {items.map((item, index) => (
            <MenuItem key={index} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
