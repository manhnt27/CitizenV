import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from '@mui/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { DataGrid } from '@mui/x-data-grid';
import { Link as RouterLink } from "react-router-dom";

import { autocompleteClasses, Avatar, FormControlLabel } from '@mui/material';
import { Checkbox, Switch, TextField } from '@mui/material';
import { useState } from 'react';
import { shape } from '@mui/system';
import { deepOrange, red } from '@mui/material/colors';

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

const MenuDesktop = (props) => {
    const leftMenu = () => {
      return headersData.map(({ label, href }) => {
        const col = (label === props.target) ? "yellow" : "white";
        return (
          <Button
            style={{textTransform: 'none', fontFamily: "RobotoBold", color: col}}
            size='large'
            {...{
              key: label,
              color: "inherit",
              to: href,
              component: RouterLink,
            }}>
            {label}
          </Button>
        );
      });
    };
  const rightMenu = (role) => {
    return (
      <Button sx={{marginLeft: "auto", marginRight: 0, bgcolor: deepOrange[500]}} style={{color: "black"}} onClick={handleLogout}>Đăng xuất</Button>
      );
  };

  //Call Logout function
  function handleLogout() {}

  return (
    <Toolbar sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: "#007bff" }}>
        {leftMenu(props.target)}
        {rightMenu(props.role)}
    </Toolbar>
  );
    
}
export default MenuDesktop;
