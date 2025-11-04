import { useEffect } from "react";
import styles from "./TrailerModalStyles.module.css";
import { lockScroll, unlockScroll } from "../../utils/scrollLock.js";

export default function TrailerModal({ isOpen, onClose, trailerUrl }) {
  // Handle scroll lock when open changes
  useEffect(() => {
    if (isOpen) {
      lockScroll();
    } else {
      unlockScroll();
    }

    // Ensure cleanup on unmount too
    return () => unlockScroll();
  }, [isOpen]);

  // Escape key close
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ✖
        </button>
        <div className={styles.videoWrapper}>
          <iframe
            key={isOpen ? "open" : "closed"}
            src={trailerUrl}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Trailer"
          />
        </div>
      </div>
    </div>
  );
}
