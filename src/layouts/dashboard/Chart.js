import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, axisClasses } from '@mui/x-charts';
import { getAllOrder } from '../../functions/admin';
import { useSelector } from 'react-redux';
import Title from './Title';

function createData(time, amount) {
  return { time, amount: amount ?? null };
}

export default function Chart() {
  const theme = useTheme();
  const { user } = useSelector((state) => ({ ...state }));
  const [orders, setOrders] = React.useState([]);

  const loadData = () => {
    getAllOrder(user.user.token)
      .then((res) => {
        // Filter orders for today
        const today = new Date().toISOString().slice(0, 10); // Get today's date
        const todayOrders = res.data.filter(order => order.createdAt.slice(0, 10) === today);
        setOrders(todayOrders);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    loadData(); // Load all orders and filter for today
  }, []);

  // Map filtered orders to chart data format
  const chartData = orders.map(order => {
    const orderDate = new Date(order.createdAt);
    const time = orderDate.toLocaleTimeString('th-TH', { hour12: false }); // Format time string in Thai format
    return createData(time, order.cartTotal);
  });
  

  return (
    <React.Fragment>
      <Title>วันนี้</Title>
      <div style={{ width: '100%', flexGrow: 1, overflow: 'hidden' }}>
        <LineChart
          dataset={chartData}
          margin={{
            top: 16,
            right: 20,
            left: 70,
            bottom: 30,
          }}
          xAxis={[
            {
              scaleType: 'point',
              dataKey: 'time',
              tickNumber: 2,
              tickLabelStyle: theme.typography.body2,
            },
          ]}
          yAxis={[
            {
              label: 'ยอดขาย (B)',
              labelStyle: {
                ...theme.typography.body1,
                fill: theme.palette.text.primary,
              },
              tickLabelStyle: theme.typography.body2,
              max: 2500,
              tickNumber: 3,
            },
          ]}
          series={[
            {
              dataKey: 'amount',
              showMark: false,
              color: theme.palette.primary.light,
            },
          ]}
          sx={{
            [`.${axisClasses.root} line`]: { stroke: theme.palette.text.secondary },
            [`.${axisClasses.root} text`]: { fill: theme.palette.text.secondary },
            [`& .${axisClasses.left} .${axisClasses.label}`]: {
              transform: 'translateX(-25px)',
            },
          }}
        />
      </div>
    </React.Fragment>
  );
}
