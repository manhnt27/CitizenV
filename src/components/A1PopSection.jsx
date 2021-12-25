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
import axios from 'axios';

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

export default function A1PopSection(props) {
  const theme = useTheme();


  const [wards, setWards] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  
  
  const [valueProvince, setValueProvince] = React.useState([]);
  const [valueDistrict, setValueDistrict] = React.useState([]);
  const [valueWard, setValueWard] = React.useState([]);

  const [level, setLevel] = useState(1);
  const [colorButton, setColorButton] = useState(blue[50]);
  const [bias, setBias] = useState(0);
  const levelName = ["Toàn Quốc", "Tỉnh", "Quận/Huyện", "Xã/Phường"];
  const [provinceIndex, setProvinceIndex] = useState([]);

  const [popProvince, setPopProvince] = useState([]);
  const [popDistrict, setPopDistrict] = useState([]);
  const [popCommune, setPopCommune] = useState([]);

  const [data, setData] = useState([]);
  const [mark, setMark] = useState(false);
    useEffect(() => {
        const current_token = localStorage.getItem('access_token')
        let header = {"Authorization": 'Bearer ' + current_token}
        axios.get('http://127.0.0.1:8000/api/home', {headers: header})
            .then(res => {
                console.log(res.data)
                let provinceList = res.data.provinces;
                setData(res.data);
                setProvinces(new Array(provinceList.length));
                for(let i = 0; i < provinceList.length; i++) 
                  provinces[i] = provinceList[i].name;
                
                setProvinces([...['Tất cả'],...provinces]);
                
            })
    }, []);

  const handleFirstChange = (event) => {
    let tmp = event.target.value;
    setValueProvince(
      typeof tmp === 'string' ? tmp.split(',') : tmp,
    );
  };
 
  
  

  const handleSecondChange = (event) => {
    let tmp = event.target.value;
    setValueDistrict(
      typeof tmp === 'string' ? tmp.split(',') : tmp,
    );
  };

  const handleThirdChange = (event) => {
    let tmp = event.target.value;
    setValueWard(
      typeof tmp === 'string' ? tmp.split(',') : tmp,
    );
  };

  function getSelectedProvince(name, pop) {return {name, pop}}
  
  const handleFirstClose = (event) => {
    setPopProvince([...[]]);
    setLevel(2);
    const provinceList = data.provinces;
    const districtList = data.districts;
    let selectedIndex = 0;
    let mapProvince = new Map();
    for(let i = 0; i < provinceList.length; i++) {
      mapProvince.set(provinceList[i].name, provinceList[i].id);
      if(provinceList[i].name === valueProvince[0]) {
        selectedIndex = provinceList[i].id
      }
    }
    
    for(let i = 0; i < districtList.length; i++)
      if(districtList[i].province === selectedIndex) {
        districts[i] = districtList[i].name;
      }
    setDistricts([...[]]);
    setDistricts([...['Tất cả'], ...districts]);
    
    let popArr = new Array(provinceList.length).fill(0);
    
    const citizenList = data.data;
    let len = citizenList.length;
    
    for(let i = 0; i < len; i++) 
      popArr[citizenList[i].province - 1]++;
    
    let all = false;
    for(let i = 0; i < valueProvince.length; i++)
      if(valueProvince[i] === 'Tất cả')
        all = true;
    if(all) {
      for(let i = 0; i < provinceList.length; i++) {
        let tmp = mapProvince.get(provinceList[i].name);
        popProvince[i] = getSelectedProvince(provinceList[i].name, popArr[tmp - 1]);
      }
    } else {
      for(let i = 0; i < valueProvince.length; i++)
      //if(valueProvince[i] !== 'Tất cả')
      {
        
        let tmp = mapProvince.get(valueProvince[i]);
        console.log(mapProvince);
        popProvince[i] = getSelectedProvince(valueProvince[i], popArr[tmp - 1]);
      }
    }
    setPopProvince([...popProvince]);
    for(let i = 0; i < popProvince.length; i++)
      console.log(popProvince[i].name + " " +popProvince[i].pop);
    
  };

  const handleSecondClose = (event) => {
    setPopDistrict([...[]]);
    setLevel(3);
    const provinceList = data.provinces;
    const communeList = data.communes;
    const districtList = data.districts;
    let selectedIndex = 0;
    for(let i = 0; i < districtList.length; i++)
      if(districtList[i].name === valueDistrict[0]) {
        selectedIndex = districtList[i].id
      }
    //console.log(valueProvince[0]);
    for(let i = 0; i < communeList.length; i++)
      if(communeList[i].district === selectedIndex) {
        wards[i] = communeList[i].name;
      }
    setWards([...[]]);
    setWards([...['Tất cả'], ...wards]);

    let popArr = new Array(districtList.length).fill(0);
    
    const citizenList = data.data;
    let mapProvince = new Map();
    let mapDistrict = new Map();
    for(let i = 0; i< provinceList.length; i++)
      mapProvince.set(provinceList[i].name, provinceList[i].id)
    for(let i = 0; i< districtList.length; i++)
      mapDistrict.set(districtList[i].name, districtList[i].id)
    let len = citizenList.length;
    for(let i = 0; i < len; i++)
    if(citizenList[i].province === mapProvince.get(valueProvince[0]))
      popArr[citizenList[i].district - 1]++;
    
    let all = false;
    for(let i = 0; i < valueDistrict.length; i++)
      if(valueDistrict[i] === 'Tất cả')
        all = true;
    if(all) {
      for(let i = 0; i < districtList.length; i++) 
      if(districtList[i].province === mapProvince.get(valueProvince[0]))
      {
        let tmp = mapDistrict.get(districtList[i].name);
        popDistrict[i] = getSelectedProvince(districtList[i].name, popArr[tmp - 1]);
      }
    } else {
      for(let i = 0; i < valueDistrict.length; i++) 
      if(valueDistrict[i] !== 'Tất cả')
      {
        let tmp = mapDistrict.get(valueDistrict[i]);
        console.log(tmp);
        popDistrict[i] = getSelectedProvince(valueDistrict[i], popArr[tmp - 1]);
      }
    }
    setPopDistrict([...popDistrict]);
    for(let i = 0; i < popDistrict.length; i++)
      console.log(popDistrict[i].name + " " +popDistrict[i].pop);
  };

  const handleThirdClose = (event) => {
    setLevel(4);
    setPopDistrict([...[]]);
    const provinceList = data.provinces;
    const communeList = data.communes;
    const districtList = data.districts;
    

    let popArr = new Array(districtList.length).fill(0);
    
    const citizenList = data.data;
    let mapProvince = new Map();
    let mapDistrict = new Map();
    let mapCommune = new Map();
    for(let i = 0; i< provinceList.length; i++)
      mapProvince.set(provinceList[i].name, provinceList[i].id)
    for(let i = 0; i< districtList.length; i++)
      mapDistrict.set(districtList[i].name, districtList[i].id)
    for(let i = 0; i< communeList.length; i++)
      mapCommune.set(communeList[i].name, communeList[i].id)
    let len = citizenList.length;
    for(let i = 0; i < len; i++)
    if(citizenList[i].province === mapProvince.get(valueProvince[0])
      && citizenList[i].district === mapDistrict.get(valueDistrict[0]))
      popArr[citizenList[i].commune - 1]++;
    
    let all = false;
    for(let i = 0; i < valueWard.length; i++)
      if(valueWard[i] === 'Tất cả')
        all = true;
    if(all) {
      for(let i = 0; i < communeList.length; i++) 
      if(communeList[i].province === mapProvince.get(valueProvince[0])
        && communeList[i].district === mapDistrict.get(valueDistrict[0]))
      {
        let tmp = mapCommune.get(communeList[i].name);
        popDistrict[i] = getSelectedProvince(communeList[i].name, popArr[tmp - 1]);
      }
    } else {
      for(let i = 0; i < valueWard.length; i++) 
      if(valueDistrict[i] !== 'Tất cả')
      {
        let tmp = mapCommune.get(valueWard[i]);
        console.log(tmp);
        popCommune[i] = getSelectedProvince(valueWard[i], popArr[tmp - 1]);
      }
    }
    setPopCommune([...popCommune]);
    for(let i = 0; i < popCommune.length; i++)
      console.log(popCommune[i].name + " " +popCommune[i].pop);
  };

  const handleFirstOpen = (event) => {
    setColorButton(red);
  };
  

  
  const MulSelChipFirst  = (levelName) => {
    
    // for(let i = 0; i < props.data.provinces.length; i++) {
    //   console.log(props.data.provinces[i])
    // }
    
    
    const values = provinces;
    return (
      <FormControl sx={{ minWidth: 100}} size='small'>
          <InputLabel id="demo-multiple-chip-province">{levelName}</InputLabel>
          <Select
            labelId="demo-multiple-chip-label-province"
            id="demo-multiple-chip-province-id"
            multiple
            value={valueProvince}
            onChange={handleFirstChange}
            onClose={handleFirstClose}
            onOpen={handleFirstOpen}
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

  const MulSelChipSecond  = (levelName) => {
    const values = districts;
    return (
      <FormControl sx={{ minWidth: 100}} size='small'>
          <InputLabel id="demo-multiple-chip-district">{levelName}</InputLabel>
          <Select
            labelId="demo-multiple-chip-label-district"
            id="demo-multiple-chip-district-id"
            multiple
            value={valueDistrict}
            onChange={handleSecondChange}
            onClose={handleSecondClose}
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

  const MulSelChipThird  = (levelName) => {
    const values = wards;
    return (
      <FormControl sx={{ minWidth: 100}} size='small'>
          <InputLabel id="demo-multiple-chip-ward">{levelName}</InputLabel>
          <Select
            labelId="demo-multiple-chip-label-ward"
            id="demo-multiple-chip-ward-id"
            multiple
            value={valueWard}
            onChange={handleThirdChange}
            onClose={handleThirdClose}
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
              {(level == 1 && bias == 0) ?
              <TableRow>
                <TableCell align="center">STT</TableCell>
                <TableCell align="center">Cấp</TableCell>
                <TableCell align="center">Dân số</TableCell>
              </TableRow> : (
                <TableRow>
                  <TableCell align="center">STT</TableCell>
                  <TableCell align="center">Cấp</TableCell>
                  {(level + bias >= 2 && bias <= 1) ? <TableCell align="center">Tỉnh</TableCell> : <></>}
                  {(level + bias >= 3 && bias <= 2) ? <TableCell align="center">Quận/Huyện</TableCell> : <></>}
                  {(level + bias >= 4 && bias <= 3) ? <TableCell align="center">Xã/Phường</TableCell> : <></>}
                  <TableCell align="center">Dân số</TableCell>
                </TableRow>
               )
              }
            </TableHead>
            <TableBody>
              {(level == 1) ?
              <TableRow >
                <TableCell align="center">1</TableCell>
                <TableCell align="center">Toàn Quốc</TableCell>
                <TableCell align="center">{data.population}</TableCell>
              </TableRow> : (
                (level == 2) ? (popProvince.map((row, index) => ( 
                  <TableRow key={index + 1}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">Tinh</TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.pop}</TableCell>
                  </TableRow>))) : (
                  (level == 3) ? (popDistrict.map((row, index) => ( 
                    <TableRow>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">Quận/Huyện</TableCell>
                      <TableCell align="center">{valueProvince[0]}</TableCell>
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center">{row.pop}</TableCell>
                    </TableRow>))) : 
                    (popCommune.map((row, index) => ( 
                      <TableRow>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">Xã/Phường</TableCell>
                        <TableCell align="center">{valueProvince[0]}</TableCell>
                        <TableCell align="center">{valueDistrict[0]}</TableCell>
                        <TableCell align="center">{row.name}</TableCell>
                        <TableCell align="center">{row.pop}</TableCell>
                      </TableRow>))
                )
               )
               )
              }
            </TableBody>
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

  // const fetchFromAPI = () => {
  //   fetch('dvhcvn.json', {
  //     headers : { 
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //      }
  //   })
  //   .then(response => response.json())
  //   .then(data => {
  //     let provinceArr = (data.data);
  //     let provinceLen = provinceArr.length;
  //     for(let i = 0; i < provinceLen; i++) {
  //       provinces[i] = provinceArr[i].name;
        
  //     }

  //     setProvinces([...provinces]);
      
  //   });
  // }

  
  


  return (
    <div>
      <Grid lg={12} item container spacing={2}>
        <Grid item lg={3}>
        <Button sx={{color: 'black', bgcolor: colorButton}} style={{border: "0.05em solid black"}} onClick={handleClick} >
          {levelName[bias]}
        </Button>
        </Grid>

        {  (bias + 1) < 4 ?
        <Grid item lg={3}>
        {MulSelChipFirst(levelName[bias + 1])}
        </Grid> : <></> }
        
        { (bias + 2) < 4 ?
        <Grid item lg={3}>
        {MulSelChipSecond(levelName[bias + 2])}
        </Grid> : <></> }

        { (bias + 3) < 4 ?
        <Grid item lg={3}>
        {MulSelChipThird(levelName[bias + 3])}
        </Grid> : <></> }
      </Grid>
      {populationTable(level)}
    </div>
  );
}
