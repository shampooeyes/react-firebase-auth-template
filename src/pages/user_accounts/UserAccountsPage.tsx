import { useState, useEffect } from "react";
import classes from "../appointments/Appointments.module.css";
import { FirebaseFirestore } from "../../firebase";
import PersistentDrawer from "../shared/Drawer";
import { getDocs, collection } from "firebase/firestore";
import UserTile from "./UserTile";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

const UserAccountsPage = () => {
const navigate = useNavigate();
  const [userList, setUserList] = useState<any[]>([]);

  // const [showUser, setShowUser] = useState(false);
  // const [selectedUser, setSelectedUser] = useState<any>(null);

  useEffect(() => {
    const fetchUsers = () => {
      getDocs(collection(FirebaseFirestore, "users")).then((snapshot) => {
        setUserList(snapshot.docs.map((doc) => {return {...doc.data(), id: doc.id}; }));
      });
    };
    fetchUsers();
  }, []);

  const getTiles = () => {
    const onClick = (user: any) => {
        navigate(`/userdetails?id=${user.id}`)
    }
    return (
      <div style={{ height: "100%" }}>
        {userList.map((user) => (
          <UserTile user={user} onClick={(user) => onClick(user)} />
        ))}
      </div>
    );
  };


  // const exitStaffDetails = (userId: any) => {
  //   if (userId != null) {
  //       if (userId == "") {
  //           setUserList((previousUser) => previousUser.filter((user) => user.id != selectedUser.id));
  //       } else
  //       if (selectedUser.vanId != userId) {
  //           setUserList((previousStaff) => previousStaff.map((user) => user.id == selectedUser.id ? {email: selectedUser.email, id: selectedUser.id, vanId: userId} : user));
  //       }
  //   }
  //   setShowUser(false);
  // };

  const [isDrawerOpen, setOpenDrawer] = useState(false);
  const openDrawer = () => {
    setOpenDrawer(true);
  };

  const closeDrawer = () => {
    setOpenDrawer(false);
  };

  return (
    <>
      
      <PersistentDrawer open={isDrawerOpen} onClose={closeDrawer} className="bla bla bla">
        <div className={classes.wrapper}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <MenuIcon
              onClick={openDrawer}
              style={{ fill: "black", marginRight: "20px" }}
            />
            <div>

            <div className={classes.header}>User Accounts</div>
            <div className={classes.tableOptions}>
              
            </div>
            </div>
            {/* <div className={classes.tableWrapper}> */}
          </div>
          <div className={classes.table}>
            <div className={classes.tableHeader}>
              <div style={{ flex: 1 }}>Name</div>
              <div style={{ flex: 1 }}>Email</div>
              <div style={{ flex: 1 }}>Phone Number</div>
            </div>
            {getTiles()}
          </div>
          {/* </div>/ */}
        </div>
      </PersistentDrawer>
    </>
  );
};

export default UserAccountsPage;
