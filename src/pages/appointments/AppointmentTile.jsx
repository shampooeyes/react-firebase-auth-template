import { useEffect, useState } from "react";
import classes from "./Appointments.module.css"
import { Checkbox } from "@mui/material";

const AppointmentTile = (props) => {
    const order = props.order
    const [checked, setChecked] = useState(false);
    


    return <div className={classes.tableRow} onClick={() => props.onClick(order)}>
        <div style={{ flex: 3 }}>{order.userId}</div>
        <div style={{ flex: 2 }}>{formatDateTime(order.startTime)}</div>
        <div style={{ flex: 2 }}>{formatTime(order.endTime)}</div>
        <div style={{ flex: 1 }}>{capitalize(order.location.city)}</div>
        <div style={{ flex: 3 }}>{order.vanId}</div>
        <div style={{ flex: 1 }}>{order.paymentMethod}</div>
        <div style={{ flex: 1 }}>{order.price.totalPrice} €</div>
        </div>
}
export default AppointmentTile;

const formatTime = (date) => {
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        minute: "numeric",
        hour: "2-digit",
    }).format(date);
    return formattedDate;
}

const formatDateTime = (date) => {
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        minute: "numeric",
        hour: "2-digit",
        month: 'short',
        day: 'numeric',
        // year: 'numeric',
    }).format(date);
    return formattedDate;
  }

const capitalize = (string) => {
    return string[0].toUpperCase() + string.substring(1);
}