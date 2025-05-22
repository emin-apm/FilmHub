import styles from "./Pagination.styles.module.css";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <section>
      <div className={styles.pagesContainer}>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <h1 className={styles.pages}>{currentPage}</h1>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </section>
  );
}
