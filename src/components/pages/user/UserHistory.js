import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Typography, Divider, TablePagination, TextField } from "@mui/material";
import { getOrders } from "../../../functions/user";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import { Button, Modal } from "antd";
import { genQR, verifyImage } from "../../../functions/user";

const UserHistory = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [orders, setOrders] = useState([]);
  const [image, setImage] = useState(null);

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ file: null });



  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    getOrders(user.user.token)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => console.log(err));
  };

  const genqr = (amount) => {
    genQR(user.user.token, amount)
      .then((res) => {
        setImage(res.data);
      })
      .catch((err) => console.log(err));
    setOpen(true);
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const rowsPerPageOptions = [5, 10, 25, 50, 100];

 
  

  return (
    <div>
      <Typography variant="h5">
        <label>
          {" "}
          <HistoryEduIcon className="text-primary" /> {`   `}ประวัติการสั่งซื้อ{" "}
        </label>
        <span style={{ flex: 1 }}></span>
        <span style={{ flex: 1 }}></span>

        <Divider />
      </Typography>

      {orders
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((item, index) => {
          return (
            <Typography variant="h6" gutterBottom key={index}>
              <div className="card m-3" key={item.orderNumber}>
                <b
                  style={{
                    paddingBottom: "0",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    justifyContent: "space-between",
                    paddingInline: "2%",
                  }}
                >
                  {" "}
                  <section>ID:{item.orderNumber} </section>
                  <section>
                    {" "}
                    <select
                      value={item.orderStatus}
                      style={{
                        border: "none",
                        appearance: "none",
                        background: "transparent",
                        padding: "0",
                      }}
                    >
                      <option value="paymenyRequire" className="text-warning">
                        ต้องชำระเงิน
                      </option>
                      <option value="Processing" className="text-primary">
                        กำลังปัก
                      </option>
                      <option value="Confirm" className="text-success">
                        สำเร็จแล้ว
                      </option>
                      <option value="Canclelled" className="text-danger">
                        ยกเลิก
                      </option>
                    </select>
                  </section>{" "}
                </b>
                <table
                  className="table table-bordered "
                  style={{ padding: "0 10px" }}
                >
                  <thead>
                    <tr>
                      <td>ชื่อสินค้า</td>
                      <td>ราคา</td>
                      <td>จำนวน</td>
                    </tr>
                  </thead>
                  {item.products.map((p, i) => (
                    <tr key={i}>
                      <td style={{ paddingLeft: "2%" }}>
                        {p.product ? p.product.name : "N/A"}
                      </td>
                      <td key={i}>{p.price}</td>
                      <td key={i}>{p.count}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={2}>ราคาสุทธิ:{item.cartTotal}</td>

                    {item.orderStatus === "paymenyRequire" ? (
                      <td
                        colSpan={1}
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <button
                          className="btn btn-primary"
                          onClick={() => genqr(item.cartTotal)}
                          style={{
                            backgroundColor: "blue",
                            color: "white",
                            transition: "background-color 0.3s ease",
                            borderRadius: "4px",
                            border: "none",
                            padding: "8px 16px",
                          }}
                          onMouseEnter={(e) =>
                            (e.target.style.backgroundColor = "darkblue")
                          }
                          onMouseLeave={(e) =>
                            (e.target.style.backgroundColor = "blue")
                          }
                          onFocus={(e) =>
                            (e.target.style.backgroundColor = "darkblue")
                          }
                          onBlur={(e) =>
                            (e.target.style.backgroundColor = "blue")
                          }
                        >
                          ชำระเงิน
                        </button>
                      </td>
                    ) : (
                      <td></td>
                    )}
                  </tr>
                </table>
              </div>
            </Typography>
          );
        })}

      <Modal
        open={open}
        footer={null}

        onCancel={handleCancel}
      >
        <div>
        <img
        src={image}
        style={{
          display: "block",
          margin: "auto",
          maxWidth: "100%",
          maxHeight: "100vh",
          width: "80%", // เพิ่มความกว้างของภาพเป็น 80% ของพื้นที่ตรงกลาง
          height: "auto", // ความสูงจะปรับตามอัตราส่วนของความกว้าง
        }}
        alt="QR Code"
      />
      <h3 style={{color:"red"}}> หมายเหตุ: <label style={{color:"black"}}>กรุณาพิมพ์ ID สินค้าก่อนโอน</label></h3>
      
        </div>
      </Modal>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <TablePagination
          component="div"
          count={orders.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          style={{marginBottom:"35px"}}
          labelRowsPerPage="" 
          rowsPerPageOptions={rowsPerPageOptions}
        />
      </div>
    </div>
  );
};

export default UserHistory;
