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
import { autocompleteClasses, Avatar, FormControlLabel } from '@mui/material';
import { Checkbox, Switch, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import TopMenu from './components/TopMenu';

const Assign = () => {
  function createData(id, district, account, assign, startdate, enddate) {
    return { id, district, account, assign, startdate, enddate };
  }

  

  const rows = [
    createData(1, "Ba Đình", "0405"),
    createData(2, "Ba Đình", "0405"),
    createData(3, "Ba Đình", "0405"),
    createData(4, "Ba Đình", "0405"),
    createData(5, "Ba Đình", "0405"),
    createData(6, "Ba Đình", "0405"),
    
  ];

  const [isChecked, setIsChecked] = useState(
    new Array(4).fill(false)
  );

  const [start, setStart] = useState(
    new Array(4).fill("")
  );    
  const [end, setEnd] = useState(
    new Array(4).fill("")
  );  
  const [checkAll, setCheckAll] = useState(false);
  const [isDisabled, setIsDisabled] = useState(
    new Array(5).fill(true)
  );
  
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  
  

  //Assignment table
  const assignTable = () => {
      return (
        <TableContainer component={Paper} sx={{ width: "80%", margin: "0 auto", marginTop: "40px", maxHeight: 400 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">STT</TableCell>
                <TableCell align="center">Quận/Huyện</TableCell>
                <TableCell align="right">Mã tài khoản</TableCell>
                <TableCell align="right" >{topAssign()}</TableCell>
                <TableCell align="left">{topStartDate(0)}</TableCell>
                <TableCell align="left">{topEndDate(0)}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {row.id}
                  </TableCell>

                  <TableCell align="center">{row.district}</TableCell>
                  <TableCell align="center">{row.account}</TableCell>
                  <TableCell align="center" >{belowAssign(row.id - 1)}</TableCell>
                  <TableCell align="center" >{belowStartDate(row.id)}</TableCell>
                  <TableCell align="center">{belowEndDate(row.id)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }

//Assign cell of table
const topAssign = () => {
    return (
      <FormControlLabel control={<Checkbox onChange={(event)=> {
        setIsChecked(new Array(4).fill(event.currentTarget.checked))
        setIsDisabled(new Array(5).fill(!event.target.checked))
        if (!event.target.checked) {
          setStart(new Array(5).fill(""))
          setEnd(new Array(5).fill(""))
        }
      }
        }/>} 
      label={<span style={{ fontSize: '0.89rem' }}>
        Cấp phép</span>} />
    )
}

//chẹckbox table body
const belowAssign = (index) => {
    return (
      <Checkbox {...label} checked={isChecked[index]} onChange={(event)=> {
        setIsChecked([
          ...isChecked.slice(0, index),
          event.target.checked,
          ...isChecked.slice(index + 1)
        ])

        setIsDisabled([
          ...isDisabled.slice(0, index + 1),
          !event.target.checked,
          ...isDisabled.slice(index + 2)
        ])
       
        setStart([
          ...start.slice(0, index + 1),
          "",
          ...start.slice(index + 2)
        ])

        setEnd([
          ...end.slice(0, index + 1),
          "",
          ...end.slice(index + 2)
        ])
      }}/>
    )
  }

// start date header
const topStartDate = (index) => {
  return (
   <span>
    <label for="name">Từ: </label>
    <input type="date" style={{ minWidth: 2, border: "none" }}  disabled={isDisabled[index]}
      value={start[index]}
      onChange={(event)=> {
        for (var i = 0; i <= 5; i++)
          start[i] = (isDisabled[i] ? "" : event.target.value);
        setStart([...start]);
      }}
    />
    </span>
  );
}

const belowStartDate = (index) => {
  return (
  <input type="date" style={{ border: "none" }} value={start[index]}
    disabled={isDisabled[index]}
    onChange={(event)=> {
      setStart([
        ...start.slice(0, index),
        event.target.value,
        ...start.slice(index + 1)
      ])
    }}
  />
  );
}

//end date header
const topEndDate = (index) => {
  return (
    <span>
      <label for="name">Đến: </label>
      <input type="date" style={{ border: "none" }} disabled={isDisabled[index]}
        value={end[index]}
        onChange={(event)=> {
          for (var i = 0; i <= 5; i++)
            end[i] = (isDisabled[i] ? "" : event.target.value);
          setEnd([...end]);
        }}
      />
    </span>
  )
}



const belowEndDate = (index) => {
  return (
  <input type="date" style={{ border: "none" }} value={end[index]}
    disabled={isDisabled[index]}
    onChange={(event) => {
      setEnd([
        ...end.slice(0, index),
        event.target.value,
        ...end.slice(index + 1)
      ])
    }}
  />
  );
}

  

  return (
    <div>
      <TopMenu target="Mở khai báo" role="A1"></TopMenu>
      <div id="content">
        {assignTable()}
      </div>
    </div>
  );
}
export default Assign;
