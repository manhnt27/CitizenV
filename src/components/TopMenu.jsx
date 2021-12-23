import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from "react-router-dom";
import { Link, MenuItem, Drawer } from '@mui/material';
import { Avatar } from '@mui/material';
import { useState, useEffect } from 'react';
import MenuDesktop from './MenuDesktop';
import MenuMobile from './MenuMobile';
import { PinDropSharp } from '@mui/icons-material';

const TopMenu = (props) => {
    
    const [state, setState] = useState({
        mobileView: false
      });
    
      const { mobileView } = state;
    
      useEffect(() => {
        const setResponsiveness = () => {
          return window.innerWidth < 900
            ? setState({ mobileView: true })
            : setState({ mobileView: false });
        };
    
      setResponsiveness();
    
      window.addEventListener("resize", () => setResponsiveness());
    
    }, []);
    const displayDesktop = () => {
        return (
            <MenuDesktop target={props.target} role={props.role}></MenuDesktop>
          );
    };
    
    const displayMobile = () => {
        return (
            <MenuMobile role={props.role}></MenuMobile>
        );
    };

    return (
        <div>
            {mobileView ? displayMobile() : displayDesktop()}
        </div>
    );
}
export default TopMenu;
