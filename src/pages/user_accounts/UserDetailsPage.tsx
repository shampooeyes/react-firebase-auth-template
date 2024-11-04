import { useState, useEffect, useMemo } from "react";
import classes from "../appointments/Appointments.module.css";
import styles from "./UserDetails.module.css";
import { FirebaseFirestore } from "../../firebase";
import PersistentDrawer from "../shared/Drawer";
import { getDocs, collection, getDoc, doc } from "firebase/firestore";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocation } from "react-router-dom";
import UserOrderTile from "./UserOrderTile";

const UserDetailsPage = () => {
  const [ordersList, setOrdersList] = useState<any[]>([]);
  const [memberships, setMemberships] = useState<string[]>([]);
  const [user, setUser] = useState<any>({});

  // const [showUser, setShowUser] = useState(false);

  const useQuery = () => {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
  };

  const query = useQuery();
  const userId = query.get("id");
  //   const user = props.user;

  useEffect(() => {
    const fetchOrders = () => {
      getDoc(doc(FirebaseFirestore, `users/${userId}`)).then((snapshot) => {
        const resultUser = snapshot.data();
        setUser(snapshot.data());
        const membershipsResult = [];
        if (resultUser) {
          for (const membership in resultUser.memberships) {
            membershipsResult.push(membership);
          }
        }
        setMemberships(membershipsResult)
      });
      getDocs(collection(FirebaseFirestore, `users/${userId}/orders`)).then(
        (snapshot) => {
          setOrdersList(
            snapshot.docs.map((doc) => {
              return { ...doc.data(), id: doc.id };
            })
          );
        }
      );
    };
    fetchOrders();
  }, []);

  const getTiles = () => {
    // const showModal = (app: SetStateAction<null>) => {
    //   setSelectedUser(app);
    //   setShowUser(true);
    // };
    return (
      <div style={{ height: "100%" }}>
        {ordersList.map((order) => {
          return <UserOrderTile order={order} />;
        })}
      </div>
    );
  };

  // const exitStaffDetails = (userId: any) => {
  //   if (userId != null) {
  //     if (userId == "") {
  //       setOrdersList((previousUser) =>
  //         previousUser.filter((user) => user.id != selectedUser.id)
  //       );
  //     } else if (selectedUser.vanId != userId) {
  //       setOrdersList((previousStaff) =>
  //         previousStaff.map((user) =>
  //           user.id == selectedUser.id
  //             ? {
  //                 email: selectedUser.email,
  //                 id: selectedUser.id,
  //                 vanId: userId,
  //               }
  //             : user
  //         )
  //       );
  //     }
  //   }
  //   // setShowUser(false);
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
      <PersistentDrawer
        open={isDrawerOpen}
        onClose={closeDrawer}
        className="bl"
      >
        <div className={classes.wrapper}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <MenuIcon
              onClick={openDrawer}
              style={{ fill: "black", marginRight: "20px" }}
            />
            <div>
              <div className={classes.header}>{user.name}</div>

              <div className={classes.tableOptions}></div>
            </div>
            {/* <div className={classes.tableWrapper}> */}
          </div>
          <div className={styles.memberships}>
            <h3>Active Memberships</h3>
            <div className={styles.membershipCardWrapper}>
            {memberships && memberships.length > 0 
            ? (
              memberships.map((membership: string) => {
                const membershipMap = user.memberships[membership];
                return (
                <div key={membership} className={styles.membershipCard}>
                  <div className={styles.membershipName}>{capitalize(membershipMap.type)}</div>
                  <div className={styles.membershipDetails}>
                    <div>Vehicle: {capitalize(membership)} </div>
                    <div>Start Date: {formatDateTime(membershipMap.subscribedOn)}</div>
                    <div>Unbooked Washes: {membershipMap.remainingWashes}/{membershipMap.washes} </div>
                    <div> </div>
                    <div>Price: {membershipMap.price}€</div>
                    <div>Auto Renewal: {membershipMap.autoRenewal == true ? "On" : "Off"}</div>
                    {/* <div>End Date: {user.memberships[membership].endDate}</div> */}
                  </div>
                </div>
              )})
            ) : (
              <div>No active memberships</div>
            )}
          </div>
          </div>
          <div className={styles.memberships}>

          
          <h3>Appointments</h3>
          <div className={classes.table}>
            <div className={classes.tableHeader}>
              <div style={{ flex: 2 }}>Date</div>
              <div style={{ flex: 2 }}>City</div>
              <div style={{ flex: 2 }}>Staff</div>
              <div style={{ flex: 1 }}>Total</div>
            </div>
            {getTiles()}
          </div>
          </div>
          {/* </div> */}
        </div>
      </PersistentDrawer>
    </>
  );
};

const formatDateTime = (date: any) => {
  console.log(date)
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date.seconds * 1000);
  return formattedDate;
};

const capitalize = (string: any) => {
  if (!string) return "";
  return string[0].toUpperCase() + string.substring(1);
};
export default UserDetailsPage;
