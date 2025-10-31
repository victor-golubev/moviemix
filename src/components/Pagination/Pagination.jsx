import styles from "./styles.module.css";

function Pagination({ page, totalPages, setPage }) {
  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  const handlePrevClick = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextClick = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const getVisiblePages = () => {
    const visiblePages = 10;
    const startPage = Math.max(1, page - Math.floor(visiblePages / 2));
    const endPage = Math.min(totalPages, startPage + visiblePages - 1);

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  return (
    <>
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button onClick={handlePrevClick} disabled={page === 1}>
            {"<"}
          </button>

          {getVisiblePages().map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageClick(pageNumber)}
              className={page === pageNumber ? styles.activePage : ""}
            >
              {pageNumber}
            </button>
          ))}

          <button onClick={handleNextClick} disabled={page === totalPages}>
            {">"}
          </button>
        </div>
      )}
    </>
  );
}

export default Pagination;
