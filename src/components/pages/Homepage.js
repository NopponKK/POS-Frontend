import React from "react";
import ProductNew from "../home/ProductNew";
import Promotion from "../home/Promotion";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Floatingaction from "../cards/Floatingaction";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Button } from "antd";
import { Footer } from "antd/es/layout/layout";
import { FacebookFilled, InstagramFilled, PhoneFilled } from "@ant-design/icons";

import FiberSmartRecord from "@mui/icons-material/FiberSmartRecord";
const Homepage = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height:"300px" }}>
      <Floatingaction />
      <div
        style={{
          height: "200px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop:"20px",
          marginBottom:"20px"
        }}
      >
        <h1>ลายปักษ์</h1>
        <h3>งานปักคุณภาพ ประณีต สวยงาม คงทน ด้วยเครื่องปักอัตโนมัติ</h3>
        <Link to={'/shop'}>
        <button className="btn btn-dark" >เลือกซื้อสินค้าทั้งหมด <ArrowForwardIosIcon className="text-primary"/></button>
        </Link>
   
      </div>
      <container className=''>
        <div>
          <h2 className="container">สินค้าใหม่</h2>
          <ProductNew  />
        </div>
        <center>

       
        <hr style={{ width: "90%", borderTop: "1px solid #000"}} />
        </center>

        <div style={{height:"600px"}}>
        <h2 className="container">สินค้าขายดี</h2>
          
          <Promotion/>
        </div>
      </container>
      <Footer style={{background:"#333333", color:"white"}}>
  <div style={{maxWidth:"1000px", margin:"0 auto", padding:"20px"}}>
    <div style={{float:"left"}}>
      <p>**เกี่ยวกับเรา**</p>
      <p>
      ร้านลายปักษ์ เป็นร้านปักเสื้อที่ตั้งอยู่ในวิทยาลัยเทคนิคระยอง ให้บริการทั้ง การขายเสื้อ และ บริการปัก
      </p>
      <p style={{display:"flex", flexDirection:"column",textDecoration:"none", color:"white"}}>
  <Link to={"/shop"} style={{marginBottom: "5px" , textDecoration:"none", color:"white"}}>
        <FiberSmartRecord style={{ borderRadius: "50%", color: "#fff"}} /> สินค้าทั้งหมด
    </Link>
    <Link to={"/user/history"} style={{marginBottom: "5px" ,textDecoration:"none", color:"white"}}>
        <FiberSmartRecord style={{ borderRadius: "50%", color: "#fff"}} /> ประวัติการสั่งซื้อ
    </Link>
    <Link to={"/user/account/user"} style={{textDecoration:"none", color:"white"}}>
    <FiberSmartRecord style={{ borderRadius: "50%", color: "#fff"}}/> จัดการบัญชี</Link>
    
  </p>
    </div>
    <div style={{float:"right"}}>
  <p>**ติดต่อเรา**</p>
  <p style={{display:"flex", flexDirection:"column",textDecoration:"none", color:"white"}}>
  <a href="#" style={{marginBottom: "5px" , textDecoration:"none", color:"white"}}>
        <FacebookFilled style={{width: "40px", height: "40px", borderRadius: "50%", color: "#3b5998"}} /> Facebook
    </a>
    <a href="#" style={{marginBottom: "5px" ,textDecoration:"none", color:"white"}}>
        <InstagramFilled style={{width: "40px", height: "40px", borderRadius: "50%", color: "#bc2a8d"}} /> Instragram
    </a>
    <a href="tel:0659621668" style={{textDecoration:"none", color:"white"}}>
    <PhoneFilled style={{width: "40px", height: "40px", borderRadius: "50%", color: "white"}}/> 065-962-1668</a>
    
  </p>
</div>
  </div>
</Footer>
    </div>
    
  );
};

export default Homepage;
