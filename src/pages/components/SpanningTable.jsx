import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Done, DoneOutlined } from '@mui/icons-material';
import { ClearOutlined } from '@mui/icons-material';

const TAX_RATE = 0.07;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(id, district) {
 
  return { id, district };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow(1, "Hà Nội"),
  createRow(2, "Hà Nội"),
  createRow(3, "Hà Nội"),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

export default function SpanningTable() {
  return (
    <TableContainer component={Paper} sx={{width: '50%', margin: "0 auto", marginTop: "40px" }}>
      <Table  aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center">
              STT
            </TableCell>
            <TableCell align="center">Tỉnh</TableCell>
            <TableCell align="center">Trạng thái</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="center">{row.id}</TableCell>
              <TableCell align="center">{row.district}</TableCell>
              <TableCell align="center">
                  {(row.id % 2 == 0) ?
                  <DoneOutlined sx={{color: "green"}}></DoneOutlined> 
                  : 
                  <ClearOutlined sx={{color: "red"}}></ClearOutlined>
                  }
              </TableCell>
            </TableRow>
          ))}
            <TableRow>
                <TableCell rowSpan={0} />
                <TableCell colSpan={0} align="right">Hoàn thành</TableCell>
                <TableCell align="center">11</TableCell>
            </TableRow>
            <TableRow>
                <TableCell  align="right"> Chưa hoàn thành</TableCell>
                <TableCell align="center">11</TableCell>
            </TableRow>
            <TableRow>
                <TableCell  align="right">Tỉ lệ</TableCell>
                <TableCell align="center">11%</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
