import styles from "./styles.module.css";

function Pagination({
  page,
  totalPages,
  handlePrevClick,
  handleNextClick,
  handlePageClick,
  getVisiblePages,
}) {
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
