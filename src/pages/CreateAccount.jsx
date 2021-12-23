import * as React from 'react';
import Button from '@mui/material/Button';
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
import TopMenu from 'components/TopMenu';
import axios from 'axios';
import { Container } from '@mui/material';

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
  function createData(code, name, password) {
    return { code, name, password };
  }
  function createDat(code, password) {
    return { code,  password };
  }
  const [numUnits, setNumUnits] = useState(0);
  const [rows, setRows] = useState([]);
  const [pwd, setPwd] = useState([]);
  const [result, setResult] = useState([]);
  const initial_data = [
    {
      id: 1,
      name: "john",
      gender: "m",
    },
    {
      id: 2,
      name: "mary",
      gender: "f",
    },
  ];

  useEffect(() => {
    
    axios.get('https://run.mocky.io/v3/ed434bbf-b5a4-4435-abfe-330ba7210e12')
      .then(res => {
        var units= res.data;
        //console.log(units);
        const len = units.length;
        setNumUnits(len);
        setPwd(new Array(len));
        
        //console.log("?" + numUnits);
        for(var i = 0; i < numUnits; i++) {
          rows[i] = createData(units[i].code, units[i].name, "");
          result[i] = createDat(units[i].code, "");
        }
       
        //console.log(rows);
        setRows([...rows]);
        setResult([...result]);
      })
      
    
    
  }, [numUnits]);
  //Account table
  const accountTable = ()  => {
    return (
      <Container>
      <TableContainer component={Paper} sx={{width: "60%", margin: "0 auto", marginTop: "40px", maxHeight: 400}}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Mã</TableCell>
              <TableCell align="center">Tỉnh</TableCell>
              <TableCell align="center">Mã tài khoản</TableCell>
              <TableCell align="center">Mật khẩu</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={row.code}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{row.code}</TableCell>
                <TableCell align="center" >{row.name}</TableCell>
                <TableCell align="center">{row.code}</TableCell>
                <TableCell align="center">{password(index)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Container>
    );
  }
  
  

  const password = (index) => {
    return (
      <input type="text" style={{  border: "none", height: 22, textAlign: "center" }}  placeholder="Chưa có mật khẩu"
        onChange={(event)  => {
          rows[index].password = event.target.value;
          result[index].password = event.target.value;
          setRows([...rows]);
          setResult([...result]);
        }}
      />
    )
  }
  
  

  function handleClick() {
    var formData = new FormData();
    formData.append("List_of_objects", JSON.stringify(result));
    const headers = {
      'Content-Type' : 'application/json',
      'Accept' : 'application/json',
    };
    
    axios.post('url', formData, {headers: headers})
      .then(function (res) {
        console.log(res);
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  
  
  
  
  return (
    <div>
      <TopMenu target="Cấp tài khoản" role="A1"></TopMenu>
      <Container>
        {accountTable()}
        <Button  sx={{bgcolor: deepOrange[500],  marginTop: 5, marginLeft: 100, color: "black", fontWeight: "bold"}} onClick={handleClick}>Lưu</Button>
      </Container>
    </div>
  );
}

export default CreateAccount;
