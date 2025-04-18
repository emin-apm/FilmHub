import styles from "./TrailerModalStyles.module.css";

export default function TrailerModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ✖
        </button>
        <div className={styles.videoWrapper}>
          <iframe
            src="https://www.youtube.com/embed/EXeTwQWrcwY"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Trailer"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
