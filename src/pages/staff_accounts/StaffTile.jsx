
import classes from "../appointments/Appointments.module.css"

const StaffTile = (props) => {
    const staff = props.staff
    
    return <div className={classes.tableRow} onClick={() => props.onClick(staff)}>
        <div style={{ flex: 1 }}>{staff.email}</div>
        <div style={{ flex: 1 }}>{staff.vanId}</div>
        </div>
}
export default StaffTile;
