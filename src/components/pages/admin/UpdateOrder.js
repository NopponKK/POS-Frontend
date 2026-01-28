import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';
import { getAllOrder, updateStatusOrders } from '../../../functions/admin';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import Paper from '@mui/material/Paper';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { CSVLink } from 'react-csv';

const UpdateOrder = () => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "d MMM yyyy ", { locale: th });
  };

  const { user } = useSelector((state) => ({ ...state }));

  const [data, setData] = useState([]);
  const [selectData, setSelectData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await getAllOrder(user.user.token);
      setData(res.data);
      setSelectData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeStatus = (orderId, orderStatus) => {
    updateStatusOrders(user.user.token, orderId, orderStatus).then((res) => {
      console.log(res.data);
      loadData();
    });
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ textAlign: "center" }}>
              <TableCell sx={{ textAlign: "center" }} width={100}>ออเดอร์ #</TableCell>
              <TableCell>อัพเดทเมื่อ</TableCell>
              <TableCell>ราคารวม</TableCell>
              <TableCell>สถานะของสินค้า</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectData &&
              selectData.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((item, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ textAlign: 'center' }}>{item.orderNumber}</TableCell>
                  <TableCell width={200}>{formatDate(item.createdAt)}</TableCell>
                  <TableCell>{item.cartTotal}</TableCell>
                  <TableCell>
                    <section>
                      <select onChange={(e) => handleChangeStatus(item._id, e.target.value)} value={item.orderStatus}>
                        <option value="paymenyRequire" className='text-warning'>ต้องชำระเงิน</option>
                        <option value="Processing" className='text-primary'>กำลังปัก</option>
                        <option value="Confirm" className='text-success'>สำเร็จแล้ว</option>
                        <option value="Canclelled" className='text-danger'>ยกเลิก</option>
                      </select>
                    </section>
                  </TableCell>
                  <TableCell>
                    <Link to={"/admin/orders/view/" + item._id}>
                      <Button>รายละเอียดสินค้า</Button>
                    </Link>
                    <CSVLink data={item.products.map(p => Object.values(p))} filename="รายการสินค้า">
                      <FileDownloadIcon className="text-primary" />
                    </CSVLink>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
  rowsPerPageOptions={[5, 10, 25]}
  component="div"
  count={selectData.length}
  rowsPerPage={rowsPerPage}
  page={page}
  onPageChange={handleChangePage}
  onRowsPerPageChange={handleChangeRowsPerPage}
  labelRowsPerPage="Rows Per Page:"
  nextIconButtonProps={{
    sx: { ml: 'auto' } // Move the next icon button to the right
  }}
  sx={{ justifyContent: 'center' }} // Center align the pagination controls
/>
      </TableContainer>
    </div>
  );
};

export default UpdateOrder;
