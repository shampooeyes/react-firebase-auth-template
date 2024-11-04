import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import { FirebaseAuth } from "../../firebase";
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';

export default function PersistentDrawer(props: any) {
  const navigate = useNavigate();

  const items = [
    {
      text: "Appointments",
      path: "/appointments",
    },
    {
      text: "User Accounts",
      path: "/users",
    },
    {
      text: "Staff Accounts",
      path: "/staff",
    },
    {
      text: "Membership Orders",
      path: "/membershipOrders",
    },
    // {
    //     text: "Schedule",
    //     path: "/schedule"
    // },
    {
      text: "Sign Out",
      path: "/",
    },
  ];

  const drawerWidth = 150;

  const goTo = (path: any) => {
    props.onClose();
    if (path === "/") {
      FirebaseAuth.signOut();
    }
    navigate(path);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        anchor="left"
        open={props.open}
        onClose={props.onClose}
      >
        <Divider />
        <List>
          {items.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                onClick={() => {
                  goTo(item.path);
                }}
              >
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      {props.children}
    </Box>
  );
}
