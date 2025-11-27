import { useEffect, useMemo, useState } from "react";
import styles from "./TrailerModalStyles.module.css";
import { lockScroll, unlockScroll } from "../../utils/scrollLock.js";
import { useParams } from "react-router-dom";
import { streamServers } from "../../data/streamServer.js";

export default function TrailerModal({ isOpen, onClose, seasons }) {
  const { id, media_type } = useParams();

  const [selectedServer, setSelectedServer] = useState("flixer");
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const [iframeSrc, setIframeSrc] = useState("");
  const [showIframe, setShowIframe] = useState(false);

  // Compute once per render—must stay before any conditional return
  const names = useMemo(() => Object.keys(streamServers), []);

  // Memoize episode count
  const episodeCount = useMemo(() => {
    return (
      seasons?.find((s) => s.season_number === selectedSeason)?.episode_count ||
      1
    );
  }, [seasons, selectedSeason]);

  // Memoize real streaming URL
  const realUrl = useMemo(() => {
    if (media_type === "movie") {
      return streamServers[selectedServer].movie(id);
    }
    return streamServers[selectedServer].tv(
      id,
      selectedSeason,
      selectedEpisode
    );
  }, [media_type, selectedServer, selectedSeason, selectedEpisode, id]);

  // Reload iframe safely
  useEffect(() => {
    if (!isOpen || !realUrl) return;

    setIframeSrc("");
    setShowIframe(false);

    const timeout = setTimeout(() => {
      setIframeSrc(realUrl);
      setShowIframe(true);
    }, 120);

    return () => clearTimeout(timeout);
  }, [realUrl, isOpen]);

  // On modal close → clear iframe
  useEffect(() => {
    if (!isOpen) {
      setIframeSrc("");
      setShowIframe(false);
    }
  }, [isOpen]);

  // Scroll lock
  useEffect(() => {
    if (isOpen) lockScroll();
    else unlockScroll();
    return () => unlockScroll();
  }, [isOpen]);

  // ESC key closes modal
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Conditional return must be AFTER ALL HOOKS
  if (!isOpen) return null;

  return (
    <div
      className={styles.modalOverlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Streaming server selection */}
        <div className={styles.serverContainer}>
          {names.map((name) => (
            <button
              key={name}
              className={`${styles.serverButton} ${
                selectedServer === name ? styles.active : ""
              }`}
              onClick={() => {
                setSelectedServer(name);
                setSelectedSeason(1);
                setSelectedEpisode(1);
              }}
            >
              {name}
            </button>
          ))}
        </div>

        <button className={styles.closeButton} onClick={onClose}>
          ✖
        </button>

        {/* Video Player */}
        <div className={styles.videoWrapper}>
          {showIframe && iframeSrc && (
            <iframe
              key={`${selectedServer}-${selectedSeason}-${selectedEpisode}`}
              src={iframeSrc}
              allow="autoplay; fullscreen"
              // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Stream"
            />
          )}
        </div>

        {/* TV Only: Seasons & Episodes */}
        {media_type === "tv" && seasons && (
          <div>
            {/* Season Buttons */}
            <div className={styles.seasonContainer}>
              {seasons
                .filter((s) => s.season_number > 0)
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

            {/* Episode Buttons */}
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
