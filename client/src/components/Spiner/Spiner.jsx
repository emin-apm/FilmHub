import styles from "./SpinerStyles.module.css";

export default function Spiner() {
  return (
    <div className={styles.spinerContainer}>
      <span className={styles.loader}></span>
    </div>
  );
}
