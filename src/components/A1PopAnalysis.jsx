import * as React from 'react';
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
import TopMenu from  'components/TopMenu';
import axios from 'axios';
import { Button } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Chart from 'components/Chart';
const A1PopAnaysis = () => {
    
    return(
        <Card sx={{width: "50%", marginTop: 5}}>
            <CardContent>
                <Chart></Chart>
            </CardContent>
    </Card>
    );
}
export default A1PopAnaysis;
