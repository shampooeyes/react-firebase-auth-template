import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { FirebaseAuth } from "../../firebase";
import { FirebaseError } from "firebase/app";
import { useUser } from "../../context/AuthContext";
import styles from "../../index.module.css";

const SignUpPage = () => {
  // ==============================
  // If user is already logged in, redirect to home
  // This logic is being repeated in SignIn and SignUp..
  const { user } = useUser();
  if (user) return <Navigate to="/" />;
  // maybe we can create a wrapper component for these pages
  // just like the ./router/AuthProtectedRoute.tsx? up to you.
  // ==============================
  const [status, setStatus] = useState("");
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("");
    setStatus("Creating account...");
    try {
      await createUserWithEmailAndPassword(
        FirebaseAuth,
        formValues.email,
        formValues.password
      );
    } catch (e) {
      const error = e as FirebaseError;
      alert(error.message);
    }
    setStatus("");
  };

  return (
    <div className={styles.main}>
      <Link className={styles.homeLink} to="/">
        ◄ Home
      </Link>
      <form className={styles.mainContainer} onSubmit={handleSubmit}>
        <h1 className={styles.headerText}>Sign Up</h1>
        <p
          style={{
            textAlign: "center",
            fontSize: "0.8rem",
            color: "#777",
          }}
        >
        </p>
        <input
          name="email"
          onChange={handleInputChange}
          type="email"
          placeholder="Email"
        />
        <input
          name="password"
          onChange={handleInputChange}
          type="password"
          placeholder="Password"
        />
        <button type="submit">Create Account</button>
        <Link className={styles.authLink} to="/auth/sign-in">
          Already have an account? Sign In
        </Link>
        {status && <p>{status}</p>}
      </form>
    </div>
  );
};

export default SignUpPage;
