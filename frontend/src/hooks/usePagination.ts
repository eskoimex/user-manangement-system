import { useState } from "react";

export function usePagination(totalItems: number, itemsPerPage: number = 10) {
  const [page, setPage] = useState(1);

  const pageCount = Math.ceil(totalItems / itemsPerPage);

  const next = () => page < pageCount && setPage(page + 1);
  const prev = () => page > 1 && setPage(page - 1);

  return { page, setPage, pageCount, next, prev };
}
