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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, FormControlLabel } from '@mui/material';
import { Checkbox, Switch, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { deepOrange } from '@mui/material/colors';
import TopMenu from './components/TopMenu';


const headersData = [
 
  {
    label: "Trang chính",
    href: "/home",
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

const CreateAccount = () => {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  function createData(id, district) {
    return { id, district };
  }

  var accountList = new Array(4);

  
  //Account table
  const accountTable = ()  => {
    return (
      <TableContainer component={Paper} sx={{width: "60%", margin: "0 auto", marginTop: "40px"}}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell align="center">Quận/Huyện</TableCell>
              <TableCell align="center">Mã tài khoản</TableCell>
              <TableCell align="center">Mật khẩu</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="center" >{row.district}</TableCell>
                <TableCell align="center">{account(row.id - 1)}</TableCell>
                <TableCell align="center">{password(row.id - 1)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  
  //Acount textfill
  const account = (index) => {
    return (
      <input type="text" style={{  border: "none", height: 22, textAlign: "center" }}  placeholder="Chưa có mã tải khoản"
        onChange={(event)  => {
        accountList[index] = event.target.value;
        console.log(accountList[index])
        }}
      />
    )
  }

  const password = (index) => {
    return (
      <input type="text" style={{  border: "none", height: 22, textAlign: "center" }}  placeholder="Chưa có mật khẩu"
        onChange={(event)  => {
        accountList[index] = event.target.value;
        console.log(accountList[index])
        }}
      />
    )
  }
  
  const rows = [
    createData(1, "Ba Đình"),
    createData(2, "Ba Đình"),
    createData(3, "Ba Đình"),
    createData(4, "Ba Đình"),
  ];

  function handleClick() {
    for(var i = 0; i < 4; i++)
      console.log(accountList[i])
  }
  
  
  
  return (
    <div>
      <TopMenu target="Cấp tài khoản" role="A1"></TopMenu>
      <div id="content">
        {accountTable()}
        <Button  sx={{bgcolor: deepOrange[500], marginLeft: 90, marginTop: 5, color: "black", fontWeight: "bold"}} onClick={handleClick}>Lưu</Button>
      </div>
    </div>
  );
}

export default CreateAccount;
