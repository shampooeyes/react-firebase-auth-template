import { useState, useEffect } from "react";
import classes from "./Appointments.module.css";
import PersistentDrawer from "../shared/Drawer";
import { collection, doc, updateDoc, getDocs } from "firebase/firestore";
import { FirebaseFirestore } from "../../firebase/index";
import AppointmentTile from "./AppointmentTile.tsx";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Select from "react-select";
import MenuIcon from '@mui/icons-material/Menu';
import AppointmentDetails from "./AppointmentDetails.tsx";

const AppointmentsPage = () => {
  // filter by city, staff, date
  const [filterIndex, setFilterIndex] = useState(0);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showCitiesMenu, setShowCitiesMenu] = useState(false);
  const [showStaffMenu, setShowStaffMenu] = useState(false);
  const [pickedDate, setPickedDate] = useState(null);
  const [pickedStaff, setPickedStaff] = useState("Staff");
  const [pickedCity, setPickedCity] = useState("City");

  const [appointments, setAppointments] = useState<any[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<any[]>([]);
  const cities = ["All", "Nicosia", "Larnaca", "Limassol"];
  const staff = ["All", "STAFF1", "STAFF2"];

  const [showAppointment, setShowAppointment] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(false);

  useEffect(() => {
    const fetchAppointments = () => {
      getDocs(collection(FirebaseFirestore, "orders")).then((snapshot) => {
        setAppointments(
          snapshot.docs
            .sort(
              (a, b) => b.data().startTime.seconds - a.data().startTime.seconds
            )
            .map((doc) => {
              let data = doc.data();
              data["startTime"] = new Date(doc.data().startTime.seconds * 1000);
              data["endTime"] = new Date(doc.data().endTime.seconds * 1000);
              data["id"] = doc.id;
              return data;
            })
        );
        setFilteredAppointments((_) => {
          return snapshot.docs
            .sort(
              (a, b) => b.data().startTime.seconds - a.data().startTime.seconds
            )
            .map((doc) => {
              let data = doc.data();
              data["startTime"] = new Date(doc.data().startTime.seconds * 1000);
              data["endTime"] = new Date(doc.data().endTime.seconds * 1000);
              data["id"] = doc.id;
              return data;
            });
        });
      });
    };
    fetchAppointments();
  }, []);

  useEffect(() => {
    let newAppointments = [...appointments];
    if (pickedDate != null) {
      newAppointments = newAppointments.filter((appointment) => {
        return formatDate(appointment.startTime) == formatDate(pickedDate);
      });
    }
    if (pickedCity != "City") {
      newAppointments = newAppointments.filter(
        (appointment) =>
          appointment.location.city.toLowerCase() === pickedCity.toLowerCase()
      );
    }
    if (pickedStaff != "Staff") {
      newAppointments = newAppointments.filter(
        (appointment) => appointment.vanId === pickedStaff
      );
    }

    setFilteredAppointments(newAppointments);
  }, [pickedDate, pickedCity, pickedStaff]);

  const getTiles = () => {
    const showModal = (app: any) => {
      setSelectedAppointment(app);
      setShowAppointment(true);
    };
    return (
      <div style={{ height: "100%" }}>
        {filteredAppointments.map((order, index) => (
          <AppointmentTile
            order={order}
            style={
              index % 2 == 0 ? {} : { backgroundColor: "rgb(255 242 221)" }
            }
            onClick={(app: any) => showModal(app)}
          />
        ))}
      </div>
    );
  };

  const handleFilterChange = (index: any) => {
    setFilterIndex(index);
    if (index == 0) {
      setFilteredAppointments(appointments);
      setPickedCity("City");
      setPickedStaff("Staff");
      setPickedDate(null);
    }
    if (index == 1) {
      setShowCitiesMenu((val) => !val);
    } else {
      setShowCitiesMenu(false);
    }
    if (index == 2) {
      setShowCalendar((val) => !val);
    } else {
      setShowCalendar(false);
    }
    if (index == 3) {
      setShowStaffMenu((val) => !val);
    } else {
      setShowStaffMenu(false);
    }
  };

  const handlePickDate = (value: any) => {
    setShowCalendar(false);
    setPickedDate(value);
  };

  const handlePickCity = (option: any) => {
    if (option["label"] === "All") {
      setPickedCity("City");
    } else {
      setPickedCity(option["label"]);
    }
  };

  const handlePickStaff = (option: any) => {
    if (option["label"] === "All") {
      setPickedStaff("Staff");
    } else {
      setPickedStaff(option["label"]);
    }
  };

  const exitAppointmentModal = async (staff: any) => {
    setShowAppointment(false);
    if (!staff) {
      return;
    }
    if (staff.vanId != selectedAppointment.vanId) {
      // update in firebase appointed staff
      try {
        const orderRef = doc(
          FirebaseFirestore,
          "orders",
          selectedAppointment.id
        ); // Assuming `selectedAppointment` has an `id` field
        await updateDoc(orderRef, {
          vanId: staff,
        });
        console.log("Order updated successfully");
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment.id === selectedAppointment.id
              ? { ...appointment, vanId: staff }
              : appointment
          )
        );

        setFilteredAppointments((prevFilteredAppointments) =>
          prevFilteredAppointments.map((appointment) =>
            appointment.id === selectedAppointment.id
              ? { ...appointment, vanId: staff }
              : appointment
          )
        );
      } catch (error) {
        console.error("Error updating order: ", error);
      }
    }
  };

  const [isDrawerOpen, setOpenDrawer] = useState(false);
  const openDrawer = () => {
    setOpenDrawer(true);
  }

  const closeDrawer = () => {
    setOpenDrawer(false);
  }
  return (
    <div style={{ backgroundColor: "white" }}>
      {showAppointment && (
        <AppointmentDetails
          data={selectedAppointment}
          exit={exitAppointmentModal}
        />
      )}
      <PersistentDrawer open={isDrawerOpen} onClose={closeDrawer} className='bla bla bla'>
      <div className={classes.wrapper}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          
            <MenuIcon onClick={openDrawer} style={{fill: "black", marginRight: "20px"}}/>
          <div>
            <div className={classes.header}>Appointments</div>
            {/* <div className={classes.tableWrapper}> */}
            <div className={classes.tableOptions}>
              <div
                className={
                  filterIndex == 0 ? classes.optionEnabled : classes.option
                }
                onClick={() => handleFilterChange(0)}
              >
                All Appointments
              </div>
              <div
                className={`${
                  filterIndex == 1 ? classes.optionEnabled : classes.option
                } position-relative`}
                onClick={() => handleFilterChange(1)}
              >
                {pickedCity}
                <Select
                  options={cities.map((city) => {
                    return { label: city };
                  })}
                  styles={customStyles}
                  menuIsOpen={showCitiesMenu}
                  onChange={(option) => handlePickCity(option)}
                />
              </div>
              <div
                className={`${
                  filterIndex == 3 ? classes.optionEnabled : classes.option
                } position-relative`}
                onClick={() => handleFilterChange(3)}
              >
                {pickedStaff}
                <Select
                  options={staff.map((id) => {
                    return { label: id };
                  })}
                  styles={customStyles}
                  menuIsOpen={showStaffMenu}
                  onChange={(option) => handlePickStaff(option)}
                />
              </div>
              <div
                className={`${
                  filterIndex == 2 ? classes.optionEnabled : classes.option
                } position-relative`}
              >
                <div onClick={() => handleFilterChange(2)}>
                  {pickedDate == null ? "Date" : formatDate(pickedDate)}
                </div>
                {showCalendar && (
                  <div className={classes.calendarContainer}>
                    <Calendar
                      className={classes.calendar}
                      value={pickedDate}
                      onChange={(value) => handlePickDate(value)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={classes.table}>
          <div className={classes.tableHeader}>
            <div style={{ flex: 2 }}>Username</div>
            <div style={{ flex: 2 }}>Date</div>
            <div style={{ flex: 2 }}>City</div>
            <div style={{ flex: 2 }}>Staff</div>
            <div style={{ flex: 1 }}>Total</div>
          </div>
          {getTiles()}
        </div>
        {/* </div> */}
      </div>
      </PersistentDrawer>
    </div>
  );
};

export default AppointmentsPage;

const formatDate = (date: any) => {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date);
  return formattedDate;
};

const customStyles = {
  control: () => ({
    display: "none",
  }),
  menu: (provided: any) => ({
    ...provided,
    position: "absolute",
    borderRadius: "20px",
    minWidth: "120px",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    borderRadius: "14px",
    fontSize: "14px",
    fontWeight: state.isFocused ? "500" : "400",
    color: state.isFocused ? "black" : "#666666",
    textAlign: "left",
    backgroundColor: "transparent",
  }),
  menuList: (base: any) => ({
    ...base,
    maxHeight: "180px",
    "::-webkit-scrollbar": {
      width: "3px",
      height: "0px",
    },
    "::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "::-webkit-scrollbar-thumb": {
      background: "#888",
      borderRadius: "3px",
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: "#555",
    },
  }),
};
