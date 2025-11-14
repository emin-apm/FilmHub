import { useEffect, useState } from "react";
import styles from "./Snowfall.module.css";

const Snowfall = () => {
  const [snowFlakes, setSnowFlakes] = useState([]);

  const calculateFlakes = () => {
    const width = window.innerWidth;
    if (width < 768) return 20;
    if (width < 1200) return 40;
    return 50;
  };

  useEffect(() => {
    const updateFlakes = () => {
      const numFlakes = calculateFlakes();
      setSnowFlakes(Array.from({ length: numFlakes }));
    };

    // Initial set
    updateFlakes();

    // Listen for resize
    window.addEventListener("resize", updateFlakes);

    // Cleanup
    return () => window.removeEventListener("resize", updateFlakes);
  }, []);

  return (
    <div className={styles.snowContainer}>
      {snowFlakes.map((_, i) => {
        const left = Math.random() * 100;
        const size = 0.6 + Math.random() * 1.2;
        const duration = 10 + Math.random() * 10;
        const delay = Math.random() * 10;
        const opacity = 0.5 + Math.random() * 0.5;

        return (
          <>
            <div
              key={i}
              className={styles.snowflake}
              style={{
                "--left": `${left}%`,
                "--size": `${size}em`,
                "--duration": `${duration}s`,
                "--delay": `${delay}s`,
                "--opacity": opacity,
              }}
            >
              ❄
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Snowfall;
