import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { useState } from "react";

export default function FormAccordion({ summary, children }) {
  return (
    <Accordion sx={{ backgroundColor: "#222831", boxShadow: "none" }}>
      <AccordionSummary
        sx={{
          padding: 0,
          "& .MuiAccordionSummary-content": {
            margin: 0,
          },
        }}
      >
        {summary}
      </AccordionSummary>

      {children && (
        <AccordionDetails
          sx={{ backgroundColor: "#222831", padding: "20px", color: "#EEEEEE" }}
        >
          {children}
        </AccordionDetails>
      )}
    </Accordion>
  );
}
