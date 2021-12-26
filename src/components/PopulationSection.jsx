import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { Button } from '@mui/material';
import { blue, red } from '@mui/material/colors';
import { useEffect } from 'react';
import Grid from '@mui/material/Grid'


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function PopulationSection(props) {
  const theme = useTheme();


  const [wards, setWards] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  
  
  const [valueProvince, setValueProvince] = React.useState([]);
  const [valueDistrict, setValueDistrict] = React.useState([]);
  const [valueWard, setValueWard] = React.useState([]);
  const [level, setLevel] = useState(1);
  const [colorButton, setColorButton] = useState(blue[50]);
  

  const handleProvinceChange = (event) => {
    var tmp = event.target.value;
    setValueProvince(
      typeof tmp === 'string' ? tmp.split(',') : tmp,
    );
  };

  const handleDistrictChange = (event) => {
    var tmp = event.target.value;
    setValueDistrict(
      typeof tmp === 'string' ? tmp.split(',') : tmp,
    );
  };

  const handleWardChange = (event) => {
    var tmp = event.target.value;
    setValueWard(
      typeof tmp === 'string' ? tmp.split(',') : tmp,
    );
  };

  
  const handleProvinceClose = (event) => {
    setLevel(2);
    
  };

  const handleDistrictClose = (event) => {
    setLevel(3);
  };

  const handleWardClose = (event) => {
    setLevel(4);
   
  };

  const handleProvinceOpen = (event) => {
    setColorButton(red);
  };
  

  const MulSelChipProvince  = () => {
    const values = provinces;
    return (
      <FormControl sx={{ minWidth: 100}} size='small'>
          <InputLabel id="demo-multiple-chip-province">Tỉnh</InputLabel>
          <Select
            labelId="demo-multiple-chip-label-province"
            id="demo-multiple-chip-province-id"
            multiple
            value={valueProvince}
            onChange={handleProvinceChange}
            onClose={handleProvinceClose}
            onOpen={handleProvinceOpen}
            input={<OutlinedInput id="select-multiple-chip-province" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {values.map((_val) => (
              <MenuItem
                key={_val}
                value={_val}
                
              >
                {_val}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      
    );
  }

  const MulSelChipDistrict  = () => {
    const values = districts;
    return (
      <FormControl sx={{ minWidth: 100}} size='small'>
          <InputLabel id="demo-multiple-chip-district">Quận/Huyện</InputLabel>
          <Select
            labelId="demo-multiple-chip-label-district"
            id="demo-multiple-chip-district-id"
            multiple
            value={valueDistrict}
            onChange={handleDistrictChange}
            onClose={handleDistrictClose}
            input={<OutlinedInput id="select-multiple-chip-district" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {values.map((_val) => (
              <MenuItem
                key={_val}
                value={_val}>
                {_val}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
  }

  const MulSelChipWard  = () => {
    const values = wards;
    return (
      <FormControl sx={{ minWidth: 100}} size='small'>
          <InputLabel id="demo-multiple-chip-ward">Xã\Phường</InputLabel>
          <Select
            labelId="demo-multiple-chip-label-ward"
            id="demo-multiple-chip-ward-id"
            multiple
            value={valueWard}
            onChange={handleWardChange}
            onClose={handleWardClose}
            input={<OutlinedInput id="select-multiple-chip-ward" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {values.map((_val) => (
              <MenuItem
                key={_val}
                value={_val}>
                {_val}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
  }

  const populationTable = (level) => {
    return (
        <TableContainer component={Paper} sx={{ width: "70%", margin: "0 auto", marginTop: "40px" }}>
          <Table aria-label="simple table">
            <TableHead>
              {(level == 1) ?
              <TableRow>
                <TableCell align="center">STT</TableCell>
                <TableCell align="center">Cấp</TableCell>
                <TableCell align="center">Dân số</TableCell>
              </TableRow> : (
                (level == 2) ?
                <TableRow>
                  <TableCell align="center">STT</TableCell>
                  <TableCell align="center">Cấp</TableCell>
                  <TableCell align="center">Tỉnh</TableCell>
                  <TableCell align="center">Dân số</TableCell>
                </TableRow> : (
                  (level == 3) ?
                    <TableRow>
                      <TableCell align="center">STT</TableCell>
                      <TableCell align="center">Cấp</TableCell>
                      <TableCell align="center">Tỉnh</TableCell>
                      <TableCell align="center">Quận/Huyện</TableCell>
                      <TableCell align="center">Dân số</TableCell>
                    </TableRow> : (
                      <TableRow>
                        <TableCell align="center">STT</TableCell>
                        <TableCell align="center">Cấp</TableCell>
                        <TableCell align="center">Tỉnh</TableCell>
                        <TableCell align="center">Quận/Huyện</TableCell>
                        <TableCell align="center">Xã/Phường</TableCell>
                        <TableCell align="center">Dân số</TableCell>
                    </TableRow>
                )
               )
               )
              }
            </TableHead>
          </Table>
        </TableContainer>
      ); 
  };

  const handleClick = (event) => {
    
    setColorButton(blue[50]);
    setLevel(1);
    setValueProvince([...[]]);
    setValueDistrict([...[]]);
    setValueWard([...[]]);
  }

  const fetchFromAPI = () => {
    fetch('dvhcvn.json', {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
    .then(response => response.json())
    .then(data => {
      var provinceArr = (data.data);
      var provinceLen = provinceArr.length;
      for(var i = 0; i < provinceLen; i++) {
        provinces[i] = provinceArr[i].name;
        
      }

      setProvinces([...provinces]);
      
    });
  }

  
  


  return (
    <div>
      <Grid lg={12} item container spacing={2}>
        <Grid item lg={3}>
        <Button sx={{color: 'black', bgcolor: colorButton}} style={{border: "0.05em solid black"}} onClick={handleClick} >Toàn quốc</Button>
        </Grid>

        <Grid item lg={3}>
        {MulSelChipProvince()}
        </Grid>

        <Grid item lg={3}>
        {MulSelChipDistrict()}
        </Grid>

        <Grid item lg={3}>
        {MulSelChipWard()}
        </Grid>
      </Grid>
      {populationTable(level)}
    </div>
  );
}
