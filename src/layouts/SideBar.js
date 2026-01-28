import React, { useState } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  
} from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme, Badge, Avatar } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";

import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import TableViewIcon from '@mui/icons-material/TableView';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import InventoryIcon from '@mui/icons-material/Inventory';
import { DashboardFilled } from "@ant-design/icons";
//
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/user-slide';
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
  const dispatch = useDispatch();
  const goto = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const [isCollapsed, setisCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);

  
  const handleLogout = () => {
    dispatch(logout())
     handleClose()
    goto('/')
  }
  const handleClose = () => {
    setAnchorEl(null);
  }
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        overflow:"hidden",
        
      }}
    >
 
      <Sidebar
        collapsed={isCollapsed}
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        onBreakPoint={setBroken}
        
        breakPoint="md"

        color="white"
        style={{
         backgroundColor:"#333333",
          height: "100%",
          backgroundSize: 'cover',
          
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <div style={{ flex: 1, marginBottom: "32px" }}>
            <Menu iconShape="square">
              {/* LOGO */}
              <MenuItem
                onClick={() => setisCollapsed(!isCollapsed)}
                icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                style={{
                  margin: "10px 0 40px 0",
                }}
              >
                {!isCollapsed && (
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    ml="15px"
                  >
                    <Typography>ลายปักษ์</Typography>
                    <IconButton onClick={() => setisCollapsed(!isCollapsed)}>
                      <MenuOutlinedIcon />
                    </IconButton>
                  </Box>
                )}
              </MenuItem>
              {!isCollapsed && (
                <Box mb="25px">
              
                
                </Box>
              )}

              <Link to="/" className="menu-bars">
                <MenuItem icon={<HomeOutlinedIcon />}>หน้าหลัก</MenuItem>
              </Link>
              <Link to={"/admin"} className="menu-bars">
                <MenuItem icon={<DashboardFilled />}>
                  {" "}
                  Dashboard
                </MenuItem>
                </Link>
              <SubMenu icon={<InventoryIcon />} label="ระบบจัดการสินค้า">
                <Link to={"/admin/viewdata"} className="menu-bars">
                  <MenuItem icon={<TableViewIcon />}>
                    {" "}
                    จัดการสินค้า 
                  </MenuItem>
                </Link>
           
                <Link to={"/admin/orders"} className="menu-bars">
                <MenuItem icon={<BarChartOutlinedIcon />}>
                  {" "}
                  ติมตามออเดอร์
                </MenuItem>
                </Link>
              </SubMenu>
              <Link to={"/admin/manage"} className="menu-bars">
                 
              <MenuItem label="จัดการ" icon={<PeopleOutlinedIcon />}>จัดการตำแหน่ง</MenuItem>
              </Link>
            </Menu>

            <div
              style={{
                padding: "0 24px",
                marginBottom: "8px",
                marginTop: "32px",
              }}
            >
              <Typography
                variant="body2"
                fontWeight={600}
                style={{
                  opacity: isCollapsed ? 0 : 0.5,
                  letterSpacing: "0.5px",
                }}
              >
              <hr></hr>
              </Typography>
            </div>

            <Menu>
            <SubMenu icon={<PersonIcon   />} label="บัญชี">
                  <Link to={"/user/account/g"} className="menu-bars" >

                 
              <MenuItem icon={<CalendarTodayOutlinedIcon />}>จัดการบัญชี</MenuItem>
              </Link>
               <MenuItem onClick={handleLogout}
               icon={<LogoutIcon></LogoutIcon>}>ออกจากระบบ</MenuItem>
              </SubMenu>
            </Menu>
          </div>
        </div>
      </Sidebar>
      <main>
        <div style={{ padding: "16px 2px ", color: "#4888ed" }}>
          <div style={{ marginBottom: "16px" }}>
            {broken && (
              <IconButton onClick={() => setToggled(!toggled)}>
                <MenuOutlinedIcon />
              </IconButton>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
export default SideBar;