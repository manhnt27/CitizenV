import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/material';
import { Avatar, Link} from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useState, useEffect } from 'react';
import PopulationSection from 'components/PopulationSection';
import SpanningTable from 'components/SpanningTable';
import TowerChart from 'components/TowerChart';
import TopMenu from 'components/TopMenu';
import axios from 'axios';
import PieChart from 'components/PieChart';
import Grid from '@mui/material/Grid'; 
import { red } from '@mui/material/colors';
const Home = () => {
  const[data, setData] = useState([]);
  const [rows, setRows] = useState([]);
  const [colorButton1, setColorButton1] = useState(red[500]);
  const [colorButton2, setColorButton2] = useState();
  const [colorButton3, setColorButton3] = useState();
  
  const cardView = () => {
    return (
      <Grid lg={12} item container spacing={2} >
        <Grid item lg={6}>
          <Card sx={{ marginTop: 5}}>
            <CardContent>
              <Typography variant="h5" sx={{fontFamily: "RobotoBold", margin: "0 auto"}}>Tháp dân số</Typography>
              <TowerChart></TowerChart>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={6}>
          <Card sx={{marginTop: 5}}>
            <CardContent>
              <Typography variant="h5" sx={{fontFamily: "RobotoBold", margin: "0 auto"}}>Tỉ lệ dân số</Typography>
              <PieChart></PieChart>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      );
  }

  useEffect(() => {
    const current_token = localStorage.getItem('access_token')
    let header = {"Authorization": 'Bearer ' + current_token}
    axios.get('http://127.0.0.1:8000/api/home', {headers: header})
        .then(res => {
            console.log(res.data)
            setData(res.data)
            setRows([...res.data.population_per_province]);
        })
  }, []);
  function handleClick1(event) {
    setRows([...data.population_per_province]);
    setColorButton1(red[500]);
    setColorButton2();
    setColorButton3();
  }
  function handleClick2() {
    setRows([...data.population_per_district]);
    setColorButton1();
    setColorButton2(red[500]);
    setColorButton3();
  }
  function handleClick3() {
    setRows([...data.population_per_commune]);
    setColorButton1();
    setColorButton2();
    setColorButton3(red[500]);
  }
  const table = () => {
    return (
        <Container>
            <TableContainer component={Paper}
                            sx={{width: "60%", margin: "0 auto", marginTop: "40px", maxHeight: 300}}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                            <Button onClick={handleClick1} sx={{bgcolor: colorButton1}} style={{color: "black"}}>Tỉnh</Button>
                            </TableCell>
                            <TableCell align="center">
                              <Button onClick={handleClick2} sx={{bgcolor: colorButton2}} style={{color: "black"}}>Quận/Huyện</Button>
                            </TableCell>
                            <TableCell align="center">
                            <Button onClick={handleClick3} sx={{bgcolor: colorButton3}} style={{color: "black"}}>Xã/Phường</Button>
                            </TableCell>
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                              {rows.map((row, index) => (
                                  <TableRow
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                  >
                                      <TableCell align="right">{row.name}</TableCell>
                                      <TableCell align="right"></TableCell>
                                      <TableCell align="left">{row.population}</TableCell>
                                  </TableRow>
                              ))}
                          </TableBody>
                    
                </Table>
            </TableContainer>
        </Container>
    );
  }

  return (
    <div>
     <TopMenu target="Trang chính" role="A1" ></TopMenu>
    <div>
        <div style={{marginTop: 20, marginLeft: 18}}>
          <span style={{width: 10, height: 25, backgroundColor: "red", position: "absolute", marginTop: 4, marginLeft: 10}}></span>
          <Typography variant='h5' sx={{ fontFamily: "RobotoMedium", paddingLeft: 4}}>Dữ liệu dân số</Typography>
          </div>
        <div style={{marginTop: 10, marginLeft: 37}}>
          {table()}
        </div>

        <div style={{marginTop: 70, marginLeft: 18 }}>
          <span style={{width: 10, height: 25, backgroundColor: "red", position: "absolute", marginTop: 4, marginLeft: 10}}></span>
          <Typography variant='h5' sx={{marginTop: 2, paddingLeft: 4, fontFamily: "RobotoMedium"}}>Phân tích dân số</Typography>
          {cardView()}
        </div>

        <div style={{marginTop: 40, marginLeft: 18 }}>
        <span style={{width: 10, height: 25, backgroundColor: "red", position: "absolute", marginTop: 4, marginLeft: 10}}></span>
          <Typography variant='h5' sx={{marginTop: 2, marginLeft: 5, fontFamily: "RobotoMedium"}}>Tiến độ nhập liệu</Typography>
          <SpanningTable></SpanningTable>
        </div>
      </div>
    </div>
);
}

export default Home;
