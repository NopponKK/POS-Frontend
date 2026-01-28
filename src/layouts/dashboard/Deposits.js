import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { getAllOrder } from '../../functions/admin';
import { useSelector } from 'react-redux';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  
  const { user } = useSelector((state) => ({ ...state }));
  const [orders, setOrders] = React.useState([]);
  const [totalCartTotal, setTotalCartTotal] = React.useState(0);
  const [todayCartTotal, setTodayCartTotal] = React.useState(0);

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
        setOrders(res.data);
        console.log(res.data);
        
        // Calculate total cartTotal for all orders
        const total = res.data.reduce((acc, curr) => acc + curr.cartTotal, 0);
        setTotalCartTotal(total);

        // Filter orders for today
        const today = new Date();
        const filteredOrders = res.data.filter(order => {
          // Convert createdAt to local timezone
          const orderDate = new Date(order.createdAt);
          // Convert today to local timezone
          const today = new Date();
          return orderDate.toISOString().slice(0, 10) === today.toISOString().slice(0, 10);
        });
        // Calculate total cartTotal for today
        const todayCart = filteredOrders.reduce((acc, curr) => acc + curr.cartTotal, 0);
        setTodayCartTotal(todayCart);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    loadData();
  }, []);
  return (
    <React.Fragment>
        <Title>รายรับวันนี้</Title>
      <Typography component="p" variant="h4">
  {todayCartTotal.toLocaleString('en-US')} <span className='text-primary'>&#3647;</span>
</Typography>

      <Title>รายรับทั้งหมด</Title>
      <Typography component="p" variant="h4">
  {totalCartTotal.toLocaleString('en-US')} <span className='text-primary'>&#3647;</span>
</Typography>

   
      <div>
       
      </div>
    </React.Fragment>
  );
}
