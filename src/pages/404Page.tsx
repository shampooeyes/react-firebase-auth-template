import { Link } from "react-router-dom";
import styles from "../index.module.css";

const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.main}>
      <section className={styles.mainContainer}>
        <h1 className={styles.headerText}>404 Page Not Found</h1>
        <Link to="/">Go back to home</Link>
      </section>
    </div>
  );
};

export default NotFoundPage;
