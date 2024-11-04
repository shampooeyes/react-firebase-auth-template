import classes from "../appointments/Appointments.module.css";

const UserOrderTile = (props: any) => {
  const order = props.order;

  return (
    <div
      className={classes.tableRow}
      style={props.style}
      onClick={() => {}}
    >
      <div style={{ flex: 2 }}>{formatDateTime(order.startTime)}</div>
      <div style={{ flex: 2 }}>{capitalize(order.location.city)}</div>
      <div style={{ flex: 2 }}>{order.vanId}</div>
      <div style={{ flex: 1 }}>{order.price.totalPrice} €</div>
    </div>
  );
};
export default UserOrderTile;

const formatDateTime = (date: any) => {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    minute: "numeric",
    hour: "2-digit",
    month: "short",
    day: "numeric",
    // year: 'numeric',
  }).format(date.seconds * 1000);
  return formattedDate;
};

const capitalize = (string: any) => {
  if (!string) return "";
  return string[0].toUpperCase() + string.substring(1);
};
