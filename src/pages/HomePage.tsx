import { Link } from "react-router-dom";
import { useUser } from "../context/AuthContext";
import { FirebaseAuth } from "../firebase";

const HomePage = () => {
  const { user } = useUser();
  return (
    <main>
      <section className="main-container">
        <h1 className="header-text">SteamIt Admin</h1>
        {user ? (
          <button onClick={() => FirebaseAuth.signOut()}>Sign Out</button>
        ) : (
          <Link to="/auth/sign-in">Sign In</Link>
        )}
        <Link to="/appointments">Protected Page 🛡️</Link>
        <div id="divider"></div>
      </section>
    </main>
  );
};

export default HomePage;
