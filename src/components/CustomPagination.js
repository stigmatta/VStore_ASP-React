import Pagination from "@mui/material/Pagination";
import { useState } from "react";
import { styled } from "@mui/material/styles";

const StyledPagination = styled(Pagination)(({ theme }) => ({
  "& .MuiPagination-root": {
    maxWidth: "100%",
  },
  "& .MuiPaginationItem-root": {
    color: "#EEEEEE",
    fontSize: theme.typography.pxToRem(18),
    "&.Mui-selected": {
      backgroundColor: "transparent",
      color: "#7BC74D",
    },
  },
}));

export default function CustomPagination({ totalItems, onPageChange }) {
  const [page, setPage] = useState(1);
  const pageItems = 20;
  const count = Math.ceil(totalItems / pageItems);

  const handleChange = (event, value) => {
    setPage(value);
    onPageChange(value);
  };

  return (
    <div className="flex justify-center mt-14">
      <StyledPagination count={count} page={page} onChange={handleChange} />
    </div>
  );
}
