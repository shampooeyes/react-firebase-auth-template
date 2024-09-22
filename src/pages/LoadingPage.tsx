import styles from "../index.module.css";

const LoadingPage = () => {
  return (
    <div className={styles.main}>
      <section className={styles.mainContainer}>
        <h1 className={styles.headerText} style={{color: "black"}}>Loading...</h1>
      </section>
    </div>
  );
};

export default LoadingPage;
