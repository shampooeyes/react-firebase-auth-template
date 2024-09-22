import { useState, useEffect, SetStateAction } from "react";
import classes from "../appointments/Appointments.module.css";
import { FirebaseFirestore } from "../../firebase";
import AddStaffModal from "./AddStaffModal";
import PersistentDrawer from "../shared/Drawer";
import StaffDetails from "./StaffDetails";
import { getDocs, collection } from "firebase/firestore";
import StaffTile from "./StaffTile";

const StaffAccountsPage = () => {
    const [staffList, setStaffList] = useState<any[]>([]);
    
    const [showAddStaff, setShowAddStaff] = useState(false);
    const [showStaff, setShowStaff] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState(null);

    useEffect(() => {
        const fetchStaff = () => {
          getDocs(collection(FirebaseFirestore, "drivers")).then((snapshot) => {
            console.log(snapshot.docs.map((doc) => doc.data()));
            setStaffList(snapshot.docs.map((doc) => doc.data()));
          });
        };
        fetchStaff();
    }, []);

    const getTiles = () => {
        const showModal = (app: SetStateAction<null>) => {
          setSelectedStaff(app);
          setShowStaff(true);
        }
        return <div style={{height: "100%"}}>
            {staffList.map((staff =>
                <StaffTile staff={staff}  onClick={(app) => showModal(app)} />
            ))}
        </div>
      }

    const exitNewStaffModal = (addedStaff: any) => {
        setShowAddStaff(false);

        if (addedStaff) {
            setStaffList(previousStaff => [...previousStaff, addedStaff]);
        }
    }

    const exitStaffDetails = () => {
        setShowStaff(false);
    }

    return <>
    {showAddStaff && <AddStaffModal exit={exitNewStaffModal} />}
    {showStaff && <StaffDetails data={selectedStaff} exit={exitStaffDetails} />}
  <PersistentDrawer open={!showAddStaff} className='bla bla bla'>
  <div className={classes.wrapper}>
            <div className={classes.header}>Staff Members</div>
            <div className={classes.tableWrapper}>
                <div className={classes.tableOptions}>
                    <div className={classes.optionEnabled} onClick={() => setShowAddStaff(true)}>Add Staff Member</div>
                </div>
                <div className={classes.table}>
                    <div className={classes.tableHeader}>
                        <div style={{ flex: 1 }}>Email</div>
                        <div style={{ flex: 1 }}>Staff ID</div>
                    </div>
                    {getTiles()}
                </div>
            </div>


        </div>
            </PersistentDrawer>
    </>
}

export default StaffAccountsPage;