
import classes from "../appointments/Appointments.module.css"

const UserTile = (props: { user: any; onClick: (arg0: any) => void; }) => {
    const user = props.user
    
    return <div className={classes.tableRow} onClick={() => props.onClick(user)}>
        <div style={{ flex: 1 }}>{user.name}</div>
        <div style={{ flex: 1 }}>{user.email}</div>
        <div style={{ flex: 1 }}>{user.phoneNumber}</div>
        </div>
}
export default UserTile;
