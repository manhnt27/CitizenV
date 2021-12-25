import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Grid } from '@mui/material';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
const columns = [
  { id: 'Tên', label: 'Tên', minWidth: 170 },
  { id: 'Tuổi', label: 'Tuổi', minWidth: 100 },
  { id: 'Nghề nghiệp', label: 'Nghề nghiệp', minWidth: 170}
];

function createData(name, age, job) {
  return { name, age, job };
}



export default function PaginationTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState([]);
  useEffect(() => {
    
    const current_token = localStorage.getItem('access_token')
    let header = {"Authorization": 'Bearer ' + current_token}
    axios.get('http://127.0.0.1:8000/api/home', {headers: header})
        .then(res => {
            var citizenList = res.data.data;
            for(var i = 0; i < citizenList.length; i++)
              rows[i] = createData(citizenList[i].firstname + " " + citizenList[i].midname + " " + citizenList[i].lastname
              , citizenList[i].age, citizenList[i].job);
            setRows([...rows]);
            console.log(rows);
        })
      },[])
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
     
    <Paper sx={{ width: '80%', overflow: 'hidden', margin: "0 auto", marginTop: "40px" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                
                  <TableRow>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.age}</TableCell>  
                    <TableCell>{row.job}</TableCell>
                  </TableRow>
                
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    
  );
}
