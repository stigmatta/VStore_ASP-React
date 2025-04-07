import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function MyAccordion({ title, children }) {
  return (
    <Accordion sx={{
        backgroundColor: '#393E46',
        width: '100%',
        borderRadius: 2,
        mt: 2
      }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color:'#EEEEEE', fontSize: 50}} />}>
        <Typography sx={{ fontSize: 20, fontWeight: 500, color: '#EEEEEE', my: 2}}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography sx={{ fontSize: 20, fontWeight: 400, color: 'lightgray', opacity: 70, mt: -2}}>{children}</Typography>
      </AccordionDetails>
    </Accordion>
  );
}
