import { useState, useEffect, SetStateAction } from "react";
import classes from "../appointments/Appointments.module.css";
import { FirebaseFirestore } from "../../firebase";
import AddStaffModal from "./AddStaffModal";
import PersistentDrawer from "../shared/Drawer";
import { getDocs, collection } from "firebase/firestore";
import StaffTile from "./StaffTile";
import MenuIcon from "@mui/icons-material/Menu";
import EditStaffModal from "./EditStaffModal";

const StaffAccountsPage = () => {
  const [staffList, setStaffList] = useState<any[]>([]);

  const [showAddStaff, setShowAddStaff] = useState(false);
  const [showStaff, setShowStaff] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<any>(null);

  useEffect(() => {
    const fetchStaff = () => {
      getDocs(collection(FirebaseFirestore, "drivers")).then((snapshot) => {
        console.log(snapshot.docs.map((doc) => doc.data()));
        setStaffList(snapshot.docs.map((doc) => {return {...doc.data(), id: doc.id}; }));
      });
    };
    fetchStaff();
  }, []);

  const getTiles = () => {
    const showModal = (app: SetStateAction<null>) => {
      setSelectedStaff(app);
      setShowStaff(true);
    };
    return (
      <div style={{ height: "100%" }}>
        {staffList.map((staff) => (
          <StaffTile staff={staff} onClick={(app) => showModal(app)} />
        ))}
      </div>
    );
  };

  const exitNewStaffModal = (addedStaff: any) => {
    setShowAddStaff(false);

    if (addedStaff) {
      setStaffList((previousStaff) => [...previousStaff, addedStaff]);
    }
  };

  const exitStaffDetails = (staffId: any) => {
    if (staffId != null) {
        if (staffId == "") {
            setStaffList((previousStaff) => previousStaff.filter((staff) => staff.id != selectedStaff.id));
        } else
        if (selectedStaff.vanId != staffId) {
            setStaffList((previousStaff) => previousStaff.map((staff) => staff.id == selectedStaff.id ? {email: selectedStaff.email, id: selectedStaff.id, vanId: staffId} : staff));
        }
    }
    setShowStaff(false);
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
      {showAddStaff && <AddStaffModal exit={exitNewStaffModal} />}
      {showStaff && (
        <EditStaffModal id={selectedStaff!.id} email={selectedStaff!.email} vanId={selectedStaff!.vanId} exit={exitStaffDetails} />
      )}
      <PersistentDrawer open={isDrawerOpen} onClose={closeDrawer} className="bla bla bla">
        <div className={classes.wrapper}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <MenuIcon
              onClick={openDrawer}
              style={{ fill: "black", marginRight: "20px" }}
            />
            <div>

            <div className={classes.header}>Staff Members</div>
            <div className={classes.tableOptions}>
              <div
                className={classes.optionEnabled}
                onClick={() => setShowAddStaff(true)}
              >
                Add Staff Member
              </div>
            </div>
            </div>
            {/* <div className={classes.tableWrapper}> */}
          </div>
          <div className={classes.table}>
            <div className={classes.tableHeader}>
              <div style={{ flex: 1 }}>Email</div>
              <div style={{ flex: 1 }}>Staff ID</div>
            </div>
            {getTiles()}
          </div>
          {/* </div>/ */}
        </div>
      </PersistentDrawer>
    </>
  );
};

export default StaffAccountsPage;
