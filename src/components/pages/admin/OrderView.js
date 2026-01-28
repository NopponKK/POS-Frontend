import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Typography, Divider, Radio, Checkbox, Paper } from "@mui/material";
import { getOrders } from "../../../functions/user";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import { getSelectedOrder, updateStatusOrders,getUserByOrder } from "../../../functions/admin";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { DownloadOutlined, HomeFilled, MailFilled, PhoneFilled } from "@ant-design/icons";
import Person from "@mui/icons-material/Person";
import { CSVLink } from "react-csv";

const OrderView = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [orders, setOrders] = useState([]);
  const [userSelect,setUser] = useState([])
  const params = useParams();
  const [checkedValues, setCheckedValues] = useState({});


  useEffect(() => {
    loadData(params.id);
  }, []);

  const loadData = (id) => {
    // Fetch order data
    getSelectedOrder(id, user.user.token)
      .then((res) => {
        setOrders(res.data);
     
       
      })
      .catch((err) => console.error("Error fetching order:", err));

    // Fetch user data
    getUserByOrder(id, user.user.token)
      .then((res) => {
        setUser(res.data);
        console.log("User data:", res.data);
      })
      .catch((err) => console.error("Error fetching user:", err));
};


  const handleChangeStatus = (orderId, orderStatus) => {
    updateStatusOrders(user.user.token, orderId, orderStatus).then((res) => {
      loadData(params.id);
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "d/MMM/y เวลา HH:mm น.", { locale: th });
  };
  const handleCheckboxChange = (orderId, i) => {
    setCheckedValues((prevCheckedValues) => ({
      ...prevCheckedValues,
      [orderId]: {
        ...prevCheckedValues[orderId],
        [i]: !prevCheckedValues[orderId]?.[i],
      },
    }));
  };
  return (
    <div>
      <Typography variant="h5" style={{display:"flex"}}>
        <label>
          {" "}
          <HistoryEduIcon className="text-primary" /> {`   `}รายการสินค้า{" "}
        </label>
       <CSVLink data={orders} filename="รายการสินค้า">
        
         <label className="text-primary" >
          Download <DownloadOutlined/>
        </label>
       
        </CSVLink>
        <span style={{ flex: 1 }}></span>
        <span style={{ flex: 1 }}></span>

        <Divider />
      </Typography>

      {orders &&
        orders.map((item, index) => {
          console.log("item:", item);
          const totalQuantity = item.products.reduce(
            (acc, p) => acc + p.count,
            0
          );

          return (
            <Typography variant="h6" gutterBottom key={index}>
              <div className="card m-3">
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
                  <section>ID สินค้า {item.orderNumber} </section>
                  <section>
                    {" "}
                    <select
                      onChange={(e) =>
                        handleChangeStatus(item._id, e.target.value)
                      }
                      value={item.orderStatus}
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
                      <td width={700}>ชื่อสินค้า</td>
                      <td>ราคา</td>
                      <td>จำนวน</td>
                      <td></td>
                    </tr>
                  </thead>
                  {item.products.map((p, i) => (
                    <React.Fragment key={i}>
                      <tr style={{ marginBottom: "10px" }}>
                        <td
                          style={{ paddingLeft: "2%", paddingBottom: "15px" }}
                        >
                          {p.product ? p.product.name : "N/A"}
                        </td>
                        <td style={{ paddingBottom: "15px" }}>{p.price}</td>
                        <td style={{ paddingBottom: "15px" }}>{p.count} </td>
                        <td>
                          <ButtonGroup
                            variant="contained"
                            aria-label="outlined primary button group"
                            style={{ display: 'flex', justifyContent: 'center',    }}
                          >     <Button
                          onClick={() => handleCheckboxChange(item._id, i)}
                        >
                          รายละเอียดสินค้า
                        </Button>
                        <Button style={{ backgroundColor: "##28a745" }}   onClick={() => handleCheckboxChange(item._id, i)}>
                          <Checkbox
                           style={{ color: 'white'}}
                            value="1"
                            onChange={() => handleCheckboxChange(item._id, i)}
                            checked={checkedValues[item._id]?.[i] || false}
                          />  
                        </Button>
                          </ButtonGroup>
                        </td>
                      </tr>
                      <tr>
                        <td
                          colSpan={3}
                          style={{
                            paddingLeft: "2%",
                            paddingBottom: "15px",
                            display: checkedValues[item._id]?.[i]
                              ? "inline-block"
                              : "none",
                          }}
                        >
                          {p.data.name!="" ? (
                            <div  style={{paddingLeft:"20px"}}>
                              <span>ชื่อ: {p.data.name}</span>
                              <br />
                              <span>แผนก: {p.data.department}</span>
                              <br />
                              <span>รายละเอียดเพิ่มเติม: {p.data.detail}</span>
                              <br />
                              <span>ไซส์: {p.data.size}</span>
                            </div>
                          ) : (
                            <div >
                            <span>ไม่ปัก</span>
                           
                          </div>
                          )}
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}

                  <tr>
                    <td>รวม</td>
                    <td>{item.cartTotal}</td>
                    <td>{totalQuantity}</td>
                  </tr>

                  <tr style={{ padding: "0 3rem" }}>
                    <td colSpan={2} style={{ whiteSpace: "nowrap" }}>
                      <label style={{ fontSize: "1rem" }}>
                        สั่งซื้อเมื่อ: {formatDate(item.createdAt)}
                      </label>
                    </td>
                    <td colSpan={2} style={{ whiteSpace: "nowrap" }}>
                      <label style={{ fontSize: "1rem" }}>
                        อัพเดทเมื่อ: {formatDate(item.updatedAt)}
                      </label>
                    </td>
                  </tr>
                </table>
              </div>
              
              
                
              <div className="card m-3 " elevation={3} >
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
                ข้อมูลผู้ซื้อ
               </b>
                 <div style={{padding:"40px"}}>
                 <p>
    <Person style={{ marginRight: '5px', color: 'green' }} />
    ชื่อ:<label>{userSelect.name_surname}</label>
</p>
<p>
    <HomeFilled style={{ marginRight: '5px',  color: '#ffc107' }} />
    ที่อยู่:<label>{userSelect.address}</label>
</p>
<p>
    <PhoneFilled style={{ marginRight: '5px', color: 'black' }} />
    เบอร์โทรศัพท์:<label>{userSelect.tel}</label>
</p>
<p>
    <MailFilled style={{ marginRight: '5px', color: 'blue' }} />
    Email:<label>{userSelect.email}</label>
</p>

                 </div>

               </div>
              

           
            </Typography>
            
          );
        })}
    </div>
  );
};

export default OrderView;

