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
import { Avatar} from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import ChipSelect from './elements/ChipSelect';

import { Link as RouterLink } from "react-router-dom";


const headersData = [
 
  {
    label: "Trang chủ",
    href: "/home",
  },
  {
    label: "Cấp tài khoản",
    href: "/createaccount",
  },
  {
    label: "Mở khai báo",
    href: "/assign",
  }
];

const Home = () => {

  //Menu
  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Button
          {...{
            key: label,
            color: "inherit",
            to: href,
            
            component: RouterLink,
          }}
        >
          {label}
        </Button>
      );
    });
  };

  const rightMenu = () => {
    return (
      <Avatar sx={{marginLeft: "auto", marginRight: 0, bgcolor: deepOrange[500]}}>A1</Avatar>
      );
  };

 

  const provinces = [
    'Hà Nội',
    'Hải Phòng',
    'Thanh Hóa',
  ];

  const districts = [
    'Đống Đa',
    'Thanh Xuân',
    'Hoàng Mai',
  ];

  const wards = [
    'Phương Mai',
    'Khương Thượng',
  ];

//population table
const [level,setLevel] = useState(1);
const handleLevelChange = (event) => {
  setLevel(event.target.value);
};
const selectLevel = () => {
  return (
    <select name="levels" style={{marginLeft: 10, height: 25}} onChange={handleLevelChange}>
      <option value="1">Tỉnh</option>
      <option value="2">Quận/Huyện</option>
      <option value="3">Xã/Phường</option>
      
  </select>
  );
};

const populationTable = (level) => {
  if(level == 1)
  return (
    <TableContainer component={Paper} sx={{ width: "50%", margin: "0 auto", marginTop: "40px" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">STT</TableCell>
            <TableCell align="center">Cấp</TableCell>
            <TableCell align="center"> 
              <ChipSelect values={provinces} level="Tỉnh"></ChipSelect>
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  ); else if(level == 2)
  return (
    <TableContainer component={Paper} sx={{ width: "70%", margin: "0 auto", marginTop: "40px" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">STT</TableCell>
            <TableCell align="center">Cấp</TableCell>
            <TableCell align="center"> 
              <ChipSelect values={provinces} level="Tỉnh"></ChipSelect>
            </TableCell>
            <TableCell align="center"> 
              <ChipSelect values={districts} level="Quận/Huyện"></ChipSelect>
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  ); else {
    return (
      <TableContainer component={Paper} sx={{ width: "90%", margin: "0 auto", marginTop: "40px" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">STT</TableCell>
              <TableCell align="center">Cấp</TableCell>
              <TableCell align="center"> 
                <ChipSelect values={provinces} level="Tỉnh"></ChipSelect>
              </TableCell>
              <TableCell align="center"> 
                <ChipSelect values={districts} level="Quận/Huyện"></ChipSelect>
              </TableCell>
              <TableCell align="center"> 
                <ChipSelect values={wards} level="Xã\Phường"></ChipSelect>
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    );
  }
};

return (
    <div>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        {getMenuButtons()}
        {rightMenu()}
      </Toolbar>
      <div>
        <Typography variant='h5' sx={{marginTop: 2, marginLeft: 5}}>Dữ liệu dân số</Typography>
        <div style={{marginTop: 10, marginLeft: 37}}>
          <span style={{paddingTop: 10}}>Chọn xem dân số theo cấp </span>
          {selectLevel()}
          {populationTable(level)}
        </div>
        
      </div>
    </div>
);
}

export default Home;
