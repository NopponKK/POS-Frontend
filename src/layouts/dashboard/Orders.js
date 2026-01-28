import React, { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { getAllOrder } from '../../functions/admin';
import { useSelector } from 'react-redux';

export default function Orders() {
  const { user } = useSelector((state) => ({ ...state }));
  const [orders, setOrders] = useState([]);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const thaiYear = date.toLocaleString('th-TH', { year: 'numeric' }).slice(-2); // Extract last two digits of Thai year
    const formattedDate = date.toLocaleString('en-US', { day: 'numeric', month: 'numeric' });
    let hour = date.getHours();
    let minute = date.getMinutes();
  
    // Pad single-digit hour and minute with leading zero
    hour = hour < 10 ? '0' + hour : hour;
    minute = minute < 10 ? '0' + minute : minute;
  
    return `${formattedDate}/${thaiYear} ${hour}.${minute} นาฬิกา`;
  };
  

  const loadData = () => {
    getAllOrder(user.user.token)
      .then((res) => {
        const latestOrders = res.data.slice(0, 5);
        setOrders(latestOrders);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>วันที่</TableCell>
            <TableCell>รหัสสินค้า</TableCell>
            <TableCell align="right">ราคาสินค้า</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{formatDate(order.createdAt)}</TableCell>
              <TableCell>{order.orderNumber}</TableCell>
              <TableCell align="right">{`${order.cartTotal} บาท`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="/admin/orders" sx={{ mt: 3 }}>
        ดูสินค้าทั้งหมด
      </Link>
    </React.Fragment>
  );
}
