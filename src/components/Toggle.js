import * as React from 'react';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';

const CustomSwitch = styled(Switch)(({ theme }) => ({

  '& .MuiSwitch-switchBase.Mui-checked': {

    color: '#7BC74D',
    '& + .MuiSwitch-track': {
      backgroundColor: '#7BC74D',
    },
  },
  '& .MuiSwitch-switchBase': {
    color: 'white',
  },
  '& .MuiSwitch-track': {
    backgroundColor: '#222831',
  },
}));

export default function Toggle() {
  return (
    <div>
      <CustomSwitch defaultChecked size="medium"/>
    </div>
  );
}
