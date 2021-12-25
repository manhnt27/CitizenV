import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {autocompleteClasses, Avatar, FormControlLabel} from '@mui/material';
import {Checkbox, Switch, TextField} from '@mui/material';
import {useState, useEffect} from 'react';
import TopMenu from 'components/TopMenu';
import axios from 'axios';
import {Button} from '@mui/material';
import {deepOrange} from '@mui/material/colors';

const Assign = () => {
    function createData(code, district, assign, startdate, enddate) {
        return {code, district, assign, startdate, enddate};
    }

    function createResult(code, right_of_declaration, startdate, enddate) {
        return {code, right_of_declaration, startdate, enddate};
    }

    const [isChecked, setIsChecked] = useState([]);
    const [start, setStart] = useState([]);
    const [end, setEnd] = useState([]);
    const [topstart,setTopStart] = useState();
    const [topend,setTopEnd] = useState()
    const [checkAll, setCheckAll] = useState(false);
    const [isDisabled, setIsDisabled] = useState([]);

    const label = {inputProps: {'aria-label': 'Checkbox demo'}};

    const [numUnits, setNumUnits] = useState(0);
    const [rows, setRows] = useState([]);
    const [result, setResult] = useState([]);
    useEffect(() => {
        const current_access_token = localStorage.getItem('access_token')
        var header = {"Authorization": 'Bearer ' + current_access_token}
        axios.get('http://127.0.0.1:8000/api/declarepage/', {headers: header})
            .then(res => {
                var units = res.data;

                setNumUnits(units.length);
                for (var i = 0; i < numUnits; i++) {
                    rows[i] = createData(units[i].code, units[i].name);
                    result[i] = createResult(units[i].code, false, "", "");
                }

                setIsChecked(new Array(numUnits).fill(false));
                setStart(new Array(numUnits + 1).fill(""));
                setEnd(new Array(numUnits + 1).fill(""));
                setIsDisabled(new Array(numUnits + 1).fill(true));
                //console.log(rows);
                setRows([...rows]);
            })


    }, [numUnits]);

    //Assignment table
    const assignTable = () => {
        return (
            <TableContainer component={Paper} sx={{width: "80%", margin: "0 auto", marginTop: "40px", maxHeight: 400}}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Mã</TableCell>
                            <TableCell align="center">Tỉnh</TableCell>
                            <TableCell align="right">{topAssign()}</TableCell>
                            <TableCell align="left">{topStartDate(0)}</TableCell>
                            <TableCell align="left">{topEndDate(0)}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow
                                key={row.code}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row" align="center">
                                    {row.code}
                                </TableCell>

                                <TableCell align="center">{row.district}</TableCell>
                                <TableCell align="center">{belowAssign(index)}</TableCell>
                                <TableCell align="center">{belowStartDate(index + 1)}</TableCell>
                                <TableCell align="center">{belowEndDate(index + 1)}</TableCell>
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
            <FormControlLabel control={<Checkbox onChange={(event) => {
                setIsChecked(new Array(numUnits).fill(event.currentTarget.checked))
                setIsDisabled(new Array(numUnits + 1).fill(!event.target.checked))
                if (!event.target.checked) {
                    setStart(new Array(numUnits + 1).fill(""))
                    setEnd(new Array(numUnits + 1).fill(""))
                }
            }
            }/>}
                              label={<span style={{fontSize: '0.89rem'}}>
        Cấp phép</span>}/>
        )
    }

//chẹckbox table body
    const belowAssign = (index) => {
        return (
            <Checkbox {...label} checked={isChecked[index]} onChange={(event) => {
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
    <label htmlFor="name">Từ: </label>
    <input type="date" style={{minWidth: 2, border: "none"}} disabled={isDisabled[index]}
           value={start[index]}
           onChange={(event) => {
               for (var i = 0; i <= numUnits + 1; i++)
                   start[i] = (isDisabled[i] ? "" : event.target.value);
               setStart([...start]);
           }}
    />
    </span>
        );
    }

    const belowStartDate = (index) => {
        return (
            <input type="date" style={{border: "none"}} value={start[index]}
                   disabled={isDisabled[index]}
                   onChange={(event) => {
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
      <label htmlFor="name">Đến: </label>
      <input type="date" style={{border: "none"}} disabled={isDisabled[index]}
             value={end[index]}
             onChange={(event) => {
                 for (var i = 0; i <= numUnits + 1; i++)
                     end[i] = (isDisabled[i] ? "" : event.target.value);
                 setEnd([...end]);
             }}
      />
    </span>

        )
    }


    const belowEndDate = (index) => {
        return (
            <input type="date" style={{border: "none"}} value={end[index]}
                   disabled={isDisabled[index]}
                   onChange={(event) => {
                       console.log(event.target.value);
                       setEnd([
                           ...end.slice(0, index),
                           event.target.value,
                           ...end.slice(index + 1)
                       ])
                   }}
            />
        );
    }

    function handleClick() {
        var formData = new FormData();
        const current_access_token = localStorage.getItem('access_token')
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + current_access_token
        };
        for (var i = 0; i < rows.length; i++) {
            result[i].code = rows[i].code;
            result[i].right_of_declaration = isChecked[i];
            result[i].startdate = start[i+1];
            result[i].enddate = end[i+1];
        }

        var body = {'list_of_objects': result}
        console.log(result)
        formData.append("List_of_objects", JSON.stringify(result));
        axios.put('http://127.0.0.1:8000/api/declarepage/openpermission/', body, {headers: headers})
            .then(function (res) {
                console.log(res);
                alert(res.data)
            })
            .catch(function (error) {
                console.log(error.data)
            })
    }

    return (
        <div>
            <TopMenu target="Mở khai báo" role="A1"></TopMenu>
            <div id="content">
                {assignTable()}
                <Button
                    sx={{bgcolor: deepOrange[500], marginTop: 5, marginLeft: 100, color: "black", fontWeight: "bold"}}
                    onClick={handleClick}>Lưu</Button>
            </div>
        </div>
    );
}
export default Assign;
