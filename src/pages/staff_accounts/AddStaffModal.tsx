import React, { useState } from "react";
import ReactDOM from "react-dom";
import Modal from "../shared/Modal";
import styles from "./AddStaffModal.module.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { FirebaseAuth, FirebaseFirestore } from "../../firebase";

const AddStaffModal = (props: { exit: (arg0: { email: string; vanId: string; id: string; }) => void; }) => {
  const [staffId, setStaffId] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onStaffIdChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setStaffId(event.target.value);
  };

  const onPasswordChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setPassword(event.target.value);
  };
  const onEmailChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setEmail(event.target.value);
  };

  const onAdd = () => {
    if (!staffId || !password || !email) {
      alert("Please fill in all the fields.");
      return;
    }
    if (isLoading) return;
    setIsLoading(true);

    createUserWithEmailAndPassword(FirebaseAuth, email, password)
      .then(async (userCredential) => {
        // User created successfully
        const user = userCredential.user;
        
        await setDoc(doc(FirebaseFirestore, "drivers", user.uid), {
            email: email,
            vanId: staffId,
        });
        props.exit({email, vanId: staffId, id: user.uid});
        
        setStaffId("");
        setPassword("");
        setEmail("");
        alert("Staff member added successfully.");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error creating user:", errorCode, errorMessage);
        alert(`Error: ${errorMessage}`);
      });
    setIsLoading(false);
  };

  const getBody = () => {
    return (
      <div className={`${styles.addForm}`}>
        <div className={styles.topBorder} />
        <div className={styles.title}>Add Staff Member</div>
        <div onSubmit={onAdd} className={styles.form}>
          <div className={styles.fieldGroup}>
            <div className={styles.field}>
              <span className={styles.smallText}>Email</span>
              <input
                type="text"
                className={styles.formControl}
                required
                value={email}
                onChange={onEmailChange}
              />
            </div>
            <div className={styles.field}>
              <span className={styles.smallText}>Password</span>
              <input
                key={"name"}
                type="text"
                className={styles.formControl}
                value={password}
                onChange={onPasswordChange}
                required
              />
            </div>
            <div className={styles.field}>
              <span className={styles.smallText}>Staff ID</span>
              <input
                type="text"
                className={styles.formControl}
                required
                value={staffId}
                onChange={onStaffIdChange}
              />
            </div>
          </div>

          <button className={styles.addButton} onClick={onAdd}>
            Add Member
          </button>
        </div>
      </div>
    );
  };

  return ReactDOM.createPortal(
    <Modal exit={props.exit}>{getBody()}</Modal>,
    document.getElementById("backdrop-root")!
  );
};

export default AddStaffModal;
