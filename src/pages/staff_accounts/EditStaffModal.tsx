import React, { useState } from "react";
import ReactDOM from "react-dom";
import Modal from "../shared/Modal";
import styles from "./AddStaffModal.module.css";
import { deleteUser } from "firebase/auth";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { FirebaseAuth, FirebaseFirestore } from "../../firebase";

const AddStaffModal = (props: {
  email: any;
  vanId: any;
  id: any;
  exit: (staffId:any) => void;
}) => {
  const [staffId, setStaffId] = useState(props.vanId);
  const [isLoading, setIsLoading] = useState(false);
  console.log(props.id);

  const onStaffIdChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setStaffId(event.target.value);
  };

  const onAdd = async () => {
    if (!staffId) {
      alert("Please fill in all the fields.");
      return;
    }
    if (isLoading) return;
    setIsLoading(true);
    const staffRef = doc(FirebaseFirestore, "drivers", props.id);
    await updateDoc(staffRef, {vanId: staffId});
    setIsLoading(false);
    props.exit(staffId);
  };

  const onDelete = () => {
    if (isLoading) return;
    setIsLoading(true);
    const staffRef = doc(FirebaseFirestore, "drivers", props.id);
    deleteDoc(staffRef);
    setIsLoading(false);
    props.exit("");
  };

  const getBody = () => {
    return (
      <div className={`${styles.addForm}`}>
        <div className={styles.topBorder} />
        <div className={styles.title}>Edit Staff Member</div>
        <div onSubmit={onAdd} className={styles.form}>
          <div className={styles.fieldGroup}>
            <div className={styles.field}>
              <span className={styles.smallText}>Email</span>
              <div
                className={styles.smallText}
                style={{ fontSize: "11px", }}
              >
                {props.email}
              </div>
            </div>
            <div className={styles.field}>
              <span className={styles.smallText}>Staff ID</span>
              <input
                type="text"
                className={styles.formControl}
                required
                value={staffId}
                style={{color:"black"}}
                onChange={onStaffIdChange}
              />
            </div>
          </div>

          <button className={styles.deleteButton} onClick={onDelete}>
            Delete
          </button>
          <button className={styles.addButton} onClick={onAdd}>
            Save
          </button>
        </div>
      </div>
    );
  };

  return ReactDOM.createPortal(
    <Modal exit={() => props.exit(null)}>{getBody()}</Modal>,
    document.getElementById("backdrop-root")!
  );
};

export default AddStaffModal;
