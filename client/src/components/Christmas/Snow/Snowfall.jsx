import styles from "./Snowfall.module.css";

const Snowfall = () => {
  const snowflakes = Array.from({ length: 50 });

  return (
    <div className={styles.snowContainer}>
      {snowflakes.map((_, i) => {
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
