
import classes from "../appointments/Appointments.module.css"

const MembershipTile = (props: { membership: any; }) => {
    const membership = props.membership
    
    return <div className={classes.tableRow} >
        <div style={{ flex: 1 }}>{membership.name}</div>
        <div style={{ flex: 1 }}>{membership.email}</div>
        <div style={{ flex: 1 }}>{capitalize(membership.vehicleType)}</div>
        <div style={{ flex: 1 }}>{capitalize(membership.type)}</div>
        <div style={{ flex: 1 }}>{membership.paymentMethod}: {membership.price}€</div>
        <div style={{ flex: 1 }}>{formatDateTime(membership.subscribedOn)}</div>
        {/* <div style={{ flex: 1 }}>{membership.collected}</div> */}
        </div>
}
export default MembershipTile;

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
  