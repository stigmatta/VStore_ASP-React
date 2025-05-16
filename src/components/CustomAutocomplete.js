import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import useRedirectToGame from "../hooks/useRedirectToGame";
import { useState } from "react";

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    padding: "0 !important",
    borderRadius: "9999px",
    color: "#EEEEEE",
    backgroundColor: "#393E46",
    "&:hover": {
      backgroundColor: "#4E5258",
    },
    "&.Mui-focused": {
      backgroundColor: "#4E5258",
      boxShadow: "none",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .MuiAutocomplete-input": {
      padding: "12px 4px !important",
      opacity: "100% !important",
    },
  },
  "& .MuiAutocomplete-inputRoot": {
    padding: "0px 20px !important",
  },
}));

export default function CustomAutocomplete({
  placeholder = "Search store",
  width = "lg:max-w-[18.0625rem]",
  border = "border-none",
  setValue,
  options = [],
  handleSearch,
  value,
  getOptionLabel = (option) => option?.title || "",
}) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div
      className={`relative bg-gray-light rounded-full mt-[2.375rem] lg:w-full ${width} lg:mt-0 ${border}`}
    >
      <StyledAutocomplete
        freeSolo
        disablePortal
        options={options}
        getOptionLabel={getOptionLabel}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        clearOnEscape
        clearOnBlur
        open={open && value.length >= 2}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={handleClose}
        sx={{ width: 300 }}
        renderOption={(props, option) => (
          <li
            {...props}
            key={option.id}
            onClick={() => {
              handleSearch(option.id);
              handleClose();
            }}
            style={{ cursor: "pointer" }}
          >
            {option.title}
          </li>
        )}
        renderInput={(params) => (
          <TextField
            onChange={(e) => setValue(e.target.value)}
            {...params}
            placeholder={placeholder}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke="#EEEEEE"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </div>
  );
}
