import styles from "./Pagination.styles.module.css";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const maxPage = Math.min(totalPages, 500); // TMDB max

  return (
    <div className={styles.pagesContainer}>
      {/* First Page */}
      <button onClick={() => onPageChange(1)} disabled={currentPage === 1}>
        {"<<"}
      </button>

      {/* Previous Pages and Current */}
      {currentPage === 1 ? (
        <>
          <h2 className={styles.mainPage}>{currentPage}</h2>
          {currentPage + 1 <= maxPage && (
            <h2
              className={styles.pages}
              onClick={() => onPageChange(currentPage + 1)}
            >
              {currentPage + 1}
            </h2>
          )}
          {currentPage + 2 <= maxPage && (
            <h2
              className={styles.pages}
              onClick={() => onPageChange(currentPage + 2)}
            >
              {currentPage + 2}
            </h2>
          )}
        </>
      ) : (
        <>
          {currentPage - 1 > 0 && (
            <h2
              className={styles.pages}
              onClick={() => onPageChange(currentPage - 1)}
            >
              {currentPage - 1}
            </h2>
          )}
          <h2 className={styles.mainPage}>{currentPage}</h2>
          {currentPage + 1 <= maxPage && (
            <h2
              className={styles.pages}
              onClick={() => onPageChange(currentPage + 1)}
            >
              {currentPage + 1}
            </h2>
          )}
        </>
      )}

      {/* Last Page */}
      <button
        onClick={() => onPageChange(maxPage)}
        disabled={currentPage >= maxPage}
      >
        {">>"}
      </button>
    </div>
  );
}
