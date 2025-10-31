import { useState } from "react";
import Pagination from "@/components/Pagination/Pagination";
import MoviesCategories from "@/components/MoviesCategories/MoviesCategories";

function MoviesCategoriesPage() {
  const [page, setPage] = useState(1);
  const limit = 12;

  return (
    <>
      <MoviesCategories limit={limit} page={page} />
      <Pagination page={page} totalPages={10} setPage={setPage} />
    </>
  );
}

export default MoviesCategoriesPage;
