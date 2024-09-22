import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';

export default function PersistentDrawer(props: any) {
    const navigate = useNavigate();

    const items = [
        {
            text: "Appointments",
            path: "/appointments"
        },
        {
            text: "Staff Accounts",
            path: "/staff"
        },
        {
            text: "Schedule",
            path: "/schedule"
        },
    ];

    const drawerWidth = 200;
  
  
    return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={props.open}
        >
          <Divider />
          <List>
            {items.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton onClick={() => {navigate(item.path);}}>
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