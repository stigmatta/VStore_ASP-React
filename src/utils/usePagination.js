import { useState } from "react";

export default function usePagination(
  defaultPage = 1,
  defaultItemsPerPage = 6,
) {
  const [page, setPage] = useState(defaultPage);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);

  return {
    page,
    setPage,
    totalItems,
    setTotalItems,
    itemsPerPage,
    setItemsPerPage,
  };
}
