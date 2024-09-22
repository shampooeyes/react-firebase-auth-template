import React, { useState } from "react";
import ReactDOM from "react-dom";
import Modal from "../shared/Modal";
import styles from "./AppointmentDetails.module.css";
import Select from "react-select";

const AppointmentDetails = (props: any) => {
  const order = props.data;
  console.log(props);
  const [showStaffMenu, setShowStaffMenu] = useState(false);
  const [pickedStaff, setPickedStaff] = useState(order.vanId);

  const staffOptions = ["STAFF1", "STAFF2"];

  const handlePickStaff = (option: any) => {
    if (option["label"] === "All") {
      setPickedStaff("Staff");
    } else {
      setPickedStaff(option["label"]);
    }
    setShowStaffMenu(false);
  };

  const getBody = () => {
    return (
      <React.Fragment>
        <div className={styles.topBorderUser}></div>
        <div className={styles.userTitle}>Appointment Info</div>
        <div className={styles.content}>
        <div className={styles.personal}>
          <div className={styles.fieldGroup}>
            <div className={styles.nameField}>
              <span className={styles.smallText}>Name</span>
              <div className={styles.formControl}>{order.name}</div>
            </div>
            <div className={styles.nameField}>
              <span className={styles.smallText}>Email</span>
              <div className={styles.formControl}>{order.email}</div>
            </div>
          </div>
          <div className={styles.fieldGroup}>
            <div className={styles.nameField}>
              <span className={styles.smallText}>Date Created</span>
              <div className={styles.formControl}>
                {formatDateTime(new Date(order.creationDate.seconds * 1000))}
              </div>
            </div>
            <div className={styles.nameField}>
              <span className={styles.smallText}>Appointed Staff</span>
              <div
                className={styles.formControl}
                onClick={() => setShowStaffMenu(true)}
              >
                {pickedStaff}
              </div>
              <Select
                options={staffOptions.map((staff) => {
                  return { label: staff };
                })}
                styles={customStyles}
                menuIsOpen={showStaffMenu}
                onChange={(option) => handlePickStaff(option)}
              />
            </div>
          </div>
        </div>
        {/* Professional Information */}
        <div className={styles.professional}>
          <div className={styles.headers}>Date and Location</div>
          <div className={styles.fieldGroup}>
            <div>
              <span className={styles.smallText}>Date and Time</span>
              <div className={styles.formControl}>
                {formartStartEndTime(order.startTime, order.endTime)}
              </div>
            </div>
            <div>
              <span className={styles.smallText}>Address</span>
              <div className="formControl">
                City: {capitalize(order.location.city)}
              </div>
              <div className="formControl">
                Address: {order.location.formattedAddress}
              </div>
              <div className="formControl">
                Instructions: {order.additionalAddressInstructions}
              </div>
            </div>
          </div>
          <div className={styles.headers}>Wash Details</div>
          <div className={styles.fieldGroup}>
            {order.vehicleDetails.map((vehicle: any, index: any) => (
              <div key={index}>
                <span className={styles.smallText}>Vehicle {index + 1}</span>
                <div>
                  <span className={styles.smallText}>Vehicle Type</span>
                  <div className={styles.formControl}>
                    {vehicle.vehicleType}
                  </div>
                </div>
                <div>
                  <span className={styles.smallText}>Wash Type</span>
                  <div className={styles.formControl}>{vehicle.washType}</div>
                </div>
                {vehicle.washCost > 0 && (
                  <div>
                    <span className={styles.smallText}>Wash Cost</span>
                    <div className={styles.formControl}>{vehicle.washCost}</div>
                  </div>
                )}
                {vehicle.extraService.length > 0 && (
                  <div>
                    <span className={styles.smallText}>Extra Services</span>
                    <div className={styles.formControl}>
                      {vehicle.extraService.join(", ")}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className={styles.headers}>Payment Details</div>
          <div className={styles.fieldGroup}>
            <div>
              <span className={styles.smallText}>Payment Method</span>
              <div className={styles.formControl}>{order.paymentMethod}</div>
            </div>
            {order.price.subtotal > 0 && (
              <div>
                <span className={styles.smallText}>Subtotal</span>
                <div className={styles.formControl}>{order.price.subtotal}</div>
              </div>
            )}
            <div>
              <span className={styles.smallText}>Total Price</span>
              <div className={styles.formControl}>{order.price.totalPrice}</div>
            </div>
            {order.price.promotionDiscount > 0 && (
              <div>
                <span className={styles.smallText}>Promotion Discount</span>
                <div className={styles.formControl}>
                  {order.price.promotionDiscount}
                </div>
              </div>
            )}
            {order.price.membershipDiscount > 0 && (
              <div>
                <span className={styles.smallText}>Membership Discount</span>
                <div className={styles.formControl}>
                  {order.price.membershipDiscount}
                </div>
              </div>
            )}
          </div>
        </div>
        </div>
      </React.Fragment>
    );
  };

  return ReactDOM.createPortal(
    <Modal exit={() => props.exit(pickedStaff)}>{getBody()}</Modal>,
    document.getElementById("backdrop-root")!
  );
};

export default AppointmentDetails;

const capitalize = (string: string) => {
  return string[0].toUpperCase() + string.substring(1);
};

const formatDateTime = (date: number | Date | undefined) => {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    minute: "numeric",
    hour: "2-digit",
    month: "short",
    day: "numeric",
    // year: 'numeric',
  }).format(date);
  return formattedDate;
};

const formartStartEndTime = (startDate: number | Date | undefined, endDate: number | Date | undefined) => {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    minute: "numeric",
    hour: "2-digit",
    month: "short",
    day: "numeric",
    // year: 'numeric',
  }).format(startDate);

  const formattedEndTime = new Intl.DateTimeFormat("en-US", {
    minute: "numeric",
    hour: "2-digit",
  }).format(endDate);

  return formattedDate + " - " + formattedEndTime;
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
