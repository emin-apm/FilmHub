import { useEffect, useState } from "react";
import styles from "./TrailerModalStyles.module.css";
import { lockScroll, unlockScroll } from "../../utils/scrollLock.js";
import { useParams } from "react-router-dom";
import { streamServers } from "../../data/streamServer.js";

export default function TrailerModal({ isOpen, onClose, trailerUrl }) {
  const [selectedServer, setSelectedServer] = useState("cinezo");

  const { id, media_type } = useParams();

  const realUrl =
    media_type === "movie"
      ? streamServers[selectedServer].movie(id)
      : streamServers[selectedServer].tv(id);

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

  const names = Object.keys(streamServers);
  console.log(names);

  function handleServerChange(serverName) {
    setSelectedServer(serverName);
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.serverContainer}>
          {names.map((name) => (
            <button
              key={name}
              className={`${styles.serverButton} ${
                selectedServer === name ? styles.active : ""
              }`}
              onClick={() => handleServerChange(name)}
            >
              {name}
            </button>
          ))}
        </div>
        <button className={styles.closeButton} onClick={onClose}>
          ✖
        </button>

        <div className={styles.videoWrapper}>
          <iframe
            key={isOpen ? "open" : "closed"}
            src={realUrl}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Trailer"
          />
        </div>
      </div>
    </div>
  );
}
