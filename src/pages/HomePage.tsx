import { Link } from "react-router-dom";
import { useUser } from "../context/AuthContext";
import { FirebaseAuth } from "../firebase";
import styles from "../index.module.css";

const HomePage = () => {
  const { user } = useUser();
  return (
    <div className={styles.main}>
      <section className={styles.mainContainer}>
        <h1 className={styles.headerText}>SteamIt Admin</h1>
        {user ? (
          <button onClick={() => FirebaseAuth.signOut()}>Sign Out</button>
        ) : (
          <Link to="/auth/sign-in">Sign In</Link>
        )}
        <Link to="/appointments">Protected Page 🛡️</Link>
        <div className={styles.divider}></div>
      </section>
    </div>
  );
};

export default HomePage;
