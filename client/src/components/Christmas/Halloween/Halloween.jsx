import styles from "./Halloween.module.css";

const Halloween = () => {
  const symbols = ["🎃", "🦇", "💀", "🕷️", "🕯️", "🐈‍⬛"];
  const items = Array.from({ length: 10 });

  return (
    <div className={styles.halloweenContainer}>
      {items.map((_, i) => {
        const left = 10 + Math.random() * 100;
        const size = 0.8 + Math.random() * 1.5;
        const duration = 8 + Math.random() * 6;
        const delay = Math.random() * 6;
        const opacity = 0.6 + Math.random() * 0.4;
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];

        return (
          <div
            key={i}
            className={styles.halloweenItems}
            style={{
              "--left": `${left}%`,
              "--size": `${size}em`,
              "--duration": `${duration}s`,
              "--delay": `${delay}s`,
              "--opacity": opacity,
            }}
          >
            {symbol}
          </div>
        );
      })}
    </div>
  );
};

export default Halloween;
