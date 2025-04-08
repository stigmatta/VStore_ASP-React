import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectAutoWidth() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div style={{ padding: '0px' }}>
      <FormControl
        sx={{
          m: 1,
          minWidth: 120,
          '& .MuiInputLabel-root': {
            color: 'white',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: 'white',
          },
          '& .MuiOutlinedInput-root': {
            color: 'white',
            '& fieldset': {
              borderColor: 'white',
            },
            '&:hover fieldset': {
              borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white',
            },
          },
          '& .MuiSelect-icon': {
            color: 'white',
          },
          '& .MuiMenu-paper': {
            backgroundColor: '#333',
            color: 'white',
          },
        }}
      >
        <InputLabel id="demo-simple-select-autowidth-label">Sort</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={age}
          onChange={handleChange}
          autoWidth
          label="Age"
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: '#333',
                color: 'white',
              },
            },
          }}
        >
          <MenuItem value="">
            <em style={{ color: 'white' }}>None</em>
          </MenuItem>
          <MenuItem value={20}>On Sale</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
