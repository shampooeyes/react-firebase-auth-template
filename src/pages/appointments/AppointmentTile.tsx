import classes from "./Appointments.module.css"

const AppointmentTile = (props: any) => {
    const order = props.order
    


    return <div className={classes.tableRow} style={props.style} onClick={() => props.onClick(order)}>
        <div style={{ flex: 2 }}>{order.username}</div>
        <div style={{ flex: 2 }}>{formatDateTime(order.startTime)}</div>
        <div style={{ flex: 2 }}>{capitalize(order.location.city)}</div>
        <div style={{ flex: 2 }}>{order.vanId}</div>
        <div style={{ flex: 1 }}>{order.price.totalPrice} €</div>
        </div>
}
export default AppointmentTile;

const formatTime = (date: any) => {
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        minute: "numeric",
        hour: "2-digit",
    }).format(date);
    return formattedDate;
}

const formatDateTime = (date: any) => {
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        minute: "numeric",
        hour: "2-digit",
        month: 'short',
        day: 'numeric',
        // year: 'numeric',
    }).format(date);
    return formattedDate;
  }

const capitalize = (string: any) => {
    return string[0].toUpperCase() + string.substring(1);
}