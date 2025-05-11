import Pagination from "@mui/material/Pagination";
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

export default function CustomPagination({
  totalItems,
  itemsPerPage,
  onPageChange,
  currentPage = 1,
}) {
  const count = Math.ceil(totalItems / itemsPerPage);

  const handleChange = (event, value) => {
    onPageChange(value);
  };

  return (
    <div className="flex justify-center mt-14">
      <StyledPagination
        count={count}
        page={currentPage}
        onChange={handleChange}
      />
    </div>
  );
}
