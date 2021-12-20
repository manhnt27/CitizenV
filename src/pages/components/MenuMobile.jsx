import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from "react-router-dom";
import { Link, MenuItem, Drawer } from '@mui/material';
import { Avatar } from '@mui/material';
import { useState, useEffect } from 'react';
import { deepOrange } from '@mui/material/colors';

const headersData = [

  {
    label: "Trang chính",
    href: "/home",
  },
  {
    label: "Dân cư",
    href: "/viewcitizen",
  },
  {
    label: "Cấp tài khoản",
    href: "/createaccount",
  },
  {
    label: "Mở khai báo",
    href: "/assign",
  },
  
];

const MenuMobile = (props) => {
 
  const [state, setState] = useState({ drawerOpen: false});

  const { drawerOpen } = state;

  const getDrawerChoices = () => {
        return headersData.map(({ label, href }) => {
          return (
            <Link
              {...{
                component: RouterLink,
                to: href,
                color: "inherit",
                style: { textDecoration: "none" },
                key: label,
              }}
            >
              <MenuItem style={{fontFamily: "RobotoMedium"}}>{label}</MenuItem>
            </Link>
          );
        });
      };

  const rightMenu = (role) => {
    return (
      <Avatar sx={{marginLeft: "auto", marginRight: 0, bgcolor: deepOrange[500]}}>{role}</Avatar>
    );
  };
    
  const handleDrawerOpen = () =>
    setState({ drawerOpen: true });
  const handleDrawerClose = () =>
    setState({ drawerOpen: false });
    
  return (
        <Toolbar sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: "#007bff" }}>
          <IconButton
            {...{
              edge: "start",
              "aria-label": "menu",
              "aria-haspopup": "true",
              onClick: handleDrawerOpen,
            }}
            style={{color: "white"}}
          >
            <MenuIcon />
          </IconButton>
  
          <Drawer
            {...{
              anchor: "left",
              open: drawerOpen,
              onClose: handleDrawerClose,
            }}
          >
            <div>{getDrawerChoices()}</div>
          </Drawer>
          {rightMenu(props.role)}
        </Toolbar>
      );
}
export default MenuMobile;
