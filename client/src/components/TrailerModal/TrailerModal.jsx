import { useEffect, useState } from "react";
import styles from "./TrailerModalStyles.module.css";
import { lockScroll, unlockScroll } from "../../utils/scrollLock.js";
import { useParams } from "react-router-dom";
import { streamServers } from "../../data/streamServer.js";

export default function TrailerModal({ isOpen, onClose, seasons }) {
  const { id, media_type } = useParams();
  const [selectedServer, setSelectedServer] = useState(
    media_type === "movie" ? "cinezo" : "_111movies"
  );
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);

  // Get episodes for the selected season
  const episodeCount =
    seasons?.find((s) => s.season_number === selectedSeason)?.episode_count ||
    1;

  const realUrl =
    media_type === "movie"
      ? streamServers[selectedServer].movie(id)
      : streamServers[selectedServer].tv(id, selectedSeason, selectedEpisode);

  // Handle scroll lock
  useEffect(() => {
    if (isOpen) lockScroll();
    else unlockScroll();

    return () => unlockScroll();
  }, [isOpen]);

  // Escape to close
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }

    if (isOpen) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const names = Object.keys(streamServers);

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Streaming server selection */}
        <div className={styles.serverContainer}>
          {names.map((name) => (
            <button
              key={name}
              className={`${styles.serverButton} ${
                selectedServer === name ? styles.active : ""
              }`}
              onClick={() => setSelectedServer(name)}
            >
              {name}
            </button>
          ))}
        </div>

        <button className={styles.closeButton} onClick={onClose}>
          ✖
        </button>

        {/* Video player */}
        <div className={styles.videoWrapper}>
          <iframe
            key={`${selectedServer}-${selectedSeason}-${selectedEpisode}`}
            src={realUrl}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Stream"
          />
        </div>

        {/* TV only: Seasons & Episodes */}
        {media_type === "tv" && seasons && (
          <div>
            {/* Season buttons */}
            <div className={styles.seasonContainer}>
              {seasons
                .filter((s) => s.season_number > 0) // skip specials (season 0)
                .map((season) => (
                  <button
                    key={season.season_number}
                    className={`${styles.serverButton} ${
                      selectedSeason === season.season_number
                        ? styles.active
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedSeason(season.season_number);
                      setSelectedEpisode(1);
                    }}
                  >
                    Season {season.season_number}
                  </button>
                ))}
            </div>

            {/* Episode buttons */}
            <div className={styles.episodeContainer}>
              {Array.from({ length: episodeCount }, (_, i) => i + 1).map(
                (ep) => (
                  <button
                    key={ep}
                    className={`${styles.serverButton} ${
                      selectedEpisode === ep ? styles.active : ""
                    }`}
                    onClick={() => setSelectedEpisode(ep)}
                  >
                    Ep {ep}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
