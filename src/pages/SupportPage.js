import CustomAutocomplete from "../components/CustomAutocomplete";
import GreenButton from "../components/GreenButton";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import React from "react";

export default function SupportPage() {
  const text =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at " +
    "metus quis ex tincidunt pretium. Quisque dictum urna id nunc volutpat, " +
    "a dapibus nunc gravida. Nullam vulputate, nulla vitae fermentum sagittis, " +
    "arcu nisi feugiat eros, vel posuere velit mi ac quam. Donec viverra, arcu " +
    "nec porttitor tempus, velit risus.";

  return (
    <div>
      <h1 className="text-[48px] font-black imd:block sm:hidden mb-4">
        Support
      </h1>
      <CustomAutocomplete
        placeholder="Find help"
        width="lg:max-w-[40rem]"
        border="border-[2px] border-solid border-white"
      />
      <div className="grid gap-[15px] mt-9">
        <SupportAccordion title={"Game Problems"}>{text}</SupportAccordion>
        <SupportAccordion title={"Refund"}>{text}</SupportAccordion>
        <SupportAccordion title={"My account"}>{text}</SupportAccordion>
        <SupportAccordion title={"Client"}>{text}</SupportAccordion>
        <SupportAccordion title={"Community problems"}>{text}</SupportAccordion>
        <SupportAccordion title={"Device problems"}>{text}</SupportAccordion>
        <SupportAccordion title={"Gifts"}>{text}</SupportAccordion>
        <SupportAccordion title={"FAQ"}>{text}</SupportAccordion>
      </div>
      <div className="flex flex-col items-center text-center mt-12">
        <h1 className="text-[40px] font-black mb-6">
          Have any other questions?
        </h1>
        <GreenButton
          text="Contact us on our email!"
          height="5rem"
          fontSize="25px"
          weight="700"
          className="w-full sm:w-full md:w-full lg:w-[30%]"
        />
      </div>
    </div>
  );
}

function SupportAccordion({ title, children }) {
  return (
    <Accordion
      sx={{
        backgroundColor: "#393E46",
        width: "100%",
        borderRadius: 2,
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: "#EEEEEE", fontSize: 50 }} />}
      >
        <Typography
          sx={{ fontSize: 20, fontWeight: 500, color: "#EEEEEE", my: 2 }}
        >
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography
          sx={{
            fontSize: 20,
            fontWeight: 400,
            color: "lightgray",
            opacity: 70,
            mt: -2,
          }}
        >
          {children}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}
