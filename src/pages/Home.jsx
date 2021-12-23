import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { Avatar, Link} from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useState, useEffect } from 'react';
import PopulationSection from 'components/PopulationSection';
import SpanningTable from 'components/SpanningTable';
import Chart from 'components/Chart';
import TopMenu from 'components/TopMenu';

const Home = () => {
  const cardView = () => {
  return (
    <Card sx={{width: "50%", marginTop: 5}}>
      <CardContent>
        <Chart></Chart>
      </CardContent>
    </Card>
  );
  }

  return (
    <div>
     <TopMenu target="Trang chính" role="A1" ></TopMenu>
    <div>
        <div style={{marginTop: 20, marginLeft: 18}}>
          <span style={{width: 10, height: 25, backgroundColor: "red", position: "absolute", marginTop: 4, marginLeft: 10}}></span>
          <Typography variant='h5' sx={{ fontFamily: "RobotoMedium", paddingLeft: 3}}>Dữ liệu dân số</Typography>
          </div>
        <div style={{marginTop: 10, marginLeft: 37}}>
          {PopulationSection()}
        </div>
        
        <div style={{marginTop: 70 }}>
          <Typography variant='h5' sx={{marginTop: 2, marginLeft: 5, fontFamily: "RobotoMedium"}}>Phân tích dân số</Typography>
          {cardView()}
        </div>

        <div style={{marginTop: 40 }}>
          <Typography variant='h5' sx={{marginTop: 2, marginLeft: 5, fontFamily: "RobotoMedium"}}>Tiến độ nhập liệu</Typography>
          <SpanningTable></SpanningTable>
        </div>

       
        
      </div>
    </div>
);
}

export default Home;
