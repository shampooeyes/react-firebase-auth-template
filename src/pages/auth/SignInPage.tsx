import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { FirebaseAuth } from "../../firebase";
import { useUser } from "../../context/AuthContext";
import { FirebaseError } from "firebase/app";
import { getFunctions, httpsCallable } from "firebase/functions";

const SignInPage = () => {
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
    setStatus("Logging in...");
    try {
      let isAdmin = false;
      const functions = getFunctions();
      const addMessage = httpsCallable(functions, 'authorizeAdmin');
      await addMessage({ email: formValues.email })
        .then((result) => {
          // Read result of the Cloud Function.
          /** @type {any} */
          // const data = result.data ;
          // const sanitizedMessage = data.text;
          if ((result.data as any).status == "success") {
            isAdmin = true;
          } 
        });
        if (!isAdmin) {
          setStatus("Invalid Login");
          return;
        }
      await signInWithEmailAndPassword(
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
    <main>
      <Link className="home-link" to="/">
        ◄ Home
      </Link>
      <form className="main-container" onSubmit={handleSubmit}>
        <h1 className="header-text">Sign In</h1>
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
        <button type="submit">Login</button>
        <Link className="auth-link" to="/auth/sign-up">
          Don't have an account? Sign Up
        </Link>
        {status && <p>{status}</p>}
      </form>
    </main>
  );
};

export default SignInPage;
