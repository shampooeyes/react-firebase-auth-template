import { useState, useEffect } from "react";
import classes from "../appointments/Appointments.module.css";
import { FirebaseFirestore } from "../../firebase";
import PersistentDrawer from "../shared/Drawer";
import { getDocs, collection } from "firebase/firestore";
import MembershipTile from "./MembershipTile";
import MenuIcon from "@mui/icons-material/Menu";

const ActiveMembershipsPage = () => {
  const [membershipsList, setMembershipsList] = useState<any[]>([]);


  useEffect(() => {
    const fetchMemberships = () => {
      getDocs(collection(FirebaseFirestore, "membershipOrders")).then((snapshot) => {
        setMembershipsList(snapshot.docs.map((doc) => {return {...doc.data(), id: doc.id}; }));
      });
    };
    fetchMemberships();
  }, []);

  const getTiles = () => {
    return (
      <div style={{ height: "100%" }}>
        {membershipsList.map((membership) => (
          <MembershipTile membership={membership} />
        ))}
      </div>
    );
  };

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

            <div className={classes.header}>Membership Orders</div>
            {/* <div className={classes.tableOptions}>
              <div
                className={classes.optionEnabled}
                onClick={() => setShowAddStaff(true)}
              >
                Add Staff Member
              </div>
            </div> */}
            </div>
            {/* <div className={classes.tableWrapper}> */}
          </div>
          <div className={classes.table}>
            <div className={classes.tableHeader}>
              <div style={{ flex: 1 }}>Name</div>
              <div style={{ flex: 1 }}>Email</div>
              <div style={{ flex: 1 }}>Vehicle</div>
              <div style={{ flex: 1 }}>Type</div>
              <div style={{ flex: 1 }}>Price</div>
              <div style={{ flex: 1 }}>Subscribed On</div>
            </div>
            {getTiles()}
          </div>
          {/* </div>/ */}
        </div>
      </PersistentDrawer>
    </>
  );
};

export default ActiveMembershipsPage;
