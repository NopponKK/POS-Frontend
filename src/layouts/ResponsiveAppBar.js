import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { useState } from "react";

import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import { Grid } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { HeartFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import LoginIcon from "@mui/icons-material/Login";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/user-slide";
import { useNavigate } from "react-router-dom";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Search from "../components/cards/Search";
import { Badge, Space, Drawer } from "antd";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HistoryEdu from "@mui/icons-material/HistoryEdu";
const pages = [
  
 
];

export default function ResponsiveAppBar() {
  
  const [open, setOpen] = useState(false);
  const id = localStorage.getItem('id')
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
const goto = useNavigate();
 console.log(user);
  const handleLogout = () => {
    dispatch(logout());

    goto("/");
  };

  const permissionAdmin = () => {
    if (user.user.role === "admin") {
      return (
        <>
      
            <Link
              to="/admin/"
              style={{ textDecoration: "none", color: "black" }}
            >
          <ListItemButton>
            <ListItemIcon>
              <AdminPanelSettingsIcon />
            </ListItemIcon>
          แอดมิน
          </ListItemButton>
          </Link>
         

     
        </>
      );
    }
  };
  const showLogin = () => {
    if (user.user.length === 0) {
      return (
        <>
          <ListItemText disablePadding>
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <LoginIcon className="text-primary" />
                </ListItemIcon>
                เข้าสู่ระบบ
              </ListItemButton>
            </Link>
          </ListItemText>
        </>
      );
    } else {
      return null;
    }
  };
  const showRegister = () => {
    if (user.user.length === 0) {
      return (
        <>
          <ListItemText disablePadding>
            <Link
              to="/register"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <PeopleAltOutlinedIcon className="text-success" />
                </ListItemIcon>
                สมัครสมาชิก
              </ListItemButton>
            </Link>
          </ListItemText>
        </>
      );
    } else {
      return null;
    }
  };
  const showLogout = () => {
    if (user.user.length !== 0) {
      return (
        <>
          <ListItemText disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon className="text-danger" />
              </ListItemIcon>
              ออกจากระบบ
            </ListItemButton>
          </ListItemText>
        </>
      );
    } else {
      return null;
    }
  };

  
  const showAccount = () => {
    if (user.user.length !== 0) {
      return (
        <>
          <ListItemText disablePadding>
            <ListItemButton onClick={handleAccount}>
              <ListItemIcon>
                <AccountCircleIcon className="text-success" />
              </ListItemIcon>
              บัญชี
            </ListItemButton>
          </ListItemText>
        </>
      );
    } else {
      return null;
    }
  };
  
  const showWishlist = () =>{
    if (user.user.length !== 0) {
      return (
        <>
          <ListItemText disablePadding>
          <Link
              to="/user/wishlist"
              style={{ textDecoration: "none", color: "black" }}
            >
            <ListItemButton >
              <ListItemIcon>
                <HeartFilled className="text-primary" />
              </ListItemIcon>
              สินค้าที่สนใจ
            </ListItemButton>
            </Link>
          </ListItemText>
        </>
      );
    } else {
      return null;
    }

  }
  const showHistory = () =>{
    if (user.user.length !== 0) {
      return (
        <>
          <ListItemText disablePadding>
          <Link
              to="/user/history"
              style={{ textDecoration: "none", color: "black" }}
            >
            <ListItemButton >
              <ListItemIcon>
                <HistoryEdu className="text-primary" />
              </ListItemIcon>
              ประวัติการสั่งซื้อ
            </ListItemButton>
            </Link>
          </ListItemText>
        </>
      );
    } else {
      return null;
    }

  }
  const handleAccount =()=>{
      goto('/user/account/'+id)
  }
  return (
    <Grid backgroundColor="#ffd100">
      <CssBaseline />

      <Toolbar>
        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              {/* LOGO */}
              {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "Kanit",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                <Link to={"/"}>
                  <IconButton>
                    <Avatar
                        src={`/assets/iconRaipukk`}
                        alt="Laiipuk"
                        style={{backgroundColor:"pink"}}
                    />
                  </IconButton>
                </Link>
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page, index) => (
                  <label>

                 
                  <Link to={page.to}>
                    <Button key={index} sx={{ my: 2, color: "black", mr: 5 }}>
                      {page.title}
                    </Button>
                  </Link>
                  </label>
                ))}
              </Box>
              {/* /LOGO */}

              {/* /Minimize Menu */}

              {/* LOGO Minimize */}
              {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
              <Link to={"/"} style={{ textDecoration: "none" }}>
            
                <Typography
                  variant="h4"
                  noWrap
                  component="a"
                  href=""
                  sx={{
                    display: { xs: "flex", md: "none" },
                    flexGrow: 1,

                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  <IconButton>
                  <Avatar
                        src={`/assets/iconRaipukk`}
                        alt="Laiipuk"
                        style={{backgroundColor:"pink"}}
                    />
                  </IconButton>
                </Typography>
              </Link>

              {/* /LOGO Minimize */}

              {/* Menu Left Full */}
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page, index) => (
                  <Link to={page.to}>
                    <Button key={index} sx={{ my: 2, color: "white", mr: 5 }}>
                      {page.title}
                    </Button>
                  </Link>
                ))}
              </Box>
              {/* /Menu Left Full */}
              <Search />
            </Toolbar>
          </Container>
        </Typography>

        <IconButton  edge="end" onClick={showDrawer}>
          <MenuIcon className="text-light"/>
        </IconButton>
      </Toolbar>

      <Drawer xs={6} lg={12} onClose={onClose} open={open}  >
        
        <List>
          
          {pages.map((page, index) => (
            <ListItem key={index} disablePadding>
              <Link
                to={page.to}
                style={{
                  width: "100%",
                  textDecoration: "none",
                  color: "black",
                }}
              >
                <ListItemButton style={{ width: "100%" }}>
                  <ListItemIcon>{page.icon}</ListItemIcon>
                  <ListItemText primary={page.title} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
             <ListItem disablePadding sx={{ margin: "0", padding: "0" }}>
              <Link to={'/shop'}
               style={{ width: "100%", textDecoration: "none", color: "black" }}>
             
              <ListItemButton>
                
             <ListItemIcon>
                  <ShoppingBagIcon className="text-primary" />
                </ListItemIcon>
            <ListItemText
              primary="สินค้าทั้งหมด"
              sx={{ paddingLeft: "5 px", textDecoration: "none" }}
            />
            
            </ListItemButton>
            </Link>

          </ListItem>
             <ListItem disablePadding sx={{ margin: "0", padding: "0" }}>
            <ListItemText
              primary={showHistory()}
              sx={{ paddingLeft: "5 px", textDecoration: "none" }}
            />
          </ListItem>
          
             <ListItem disablePadding sx={{ margin: "0", padding: "0" }}>
            <ListItemText
              primary={showWishlist()}
              sx={{ paddingLeft: "5 px", textDecoration: "none" }}
            />
          </ListItem>
          <ListItem disablePadding>
            <Link
              to={"/cart"}
              style={{ width: "100%", textDecoration: "none", color: "black" }}
            >
              <ListItemButton style={{ width: "100%" }}>
                <ListItemIcon>
                  <ShoppingCartIcon className="text-primary" />
                </ListItemIcon>
                <Badge
                  count={cart.length}
                  offset={[5, 3]}
                  style={{
                    backgroundColor: "#52c41a",
                  }}
                >
                  <ListItemText primary="ตะกร้าสินค้า" />
                </Badge>
              </ListItemButton>
            </Link>
          </ListItem>
        </List>

        <Divider />
        <List>
        
            <ListItem disablePadding sx={{ margin: "0", padding: "0" }}>
              <ListItemText
                primary={permissionAdmin()}
                sx={{ paddingLeft: "5 px", textDecoration: "none" }}
              />
            </ListItem>
       
          <ListItem disablePadding sx={{ margin: "0", padding: "0" }}>
            <ListItemText
              primary={showLogin()}
              sx={{ paddingLeft: "5 px", textDecoration: "none" }}
            />
          </ListItem>
          <ListItem disablePadding sx={{ margin: "0", padding: "0" }}>
            <ListItemText
              primary={showRegister()}
              sx={{ paddingLeft: "5 px", textDecoration: "none" }}
            />
          </ListItem>
          <ListItem disablePadding sx={{ margin: "0", padding: "0" }}>
            <ListItemText
              primary={showAccount()}
              sx={{ paddingLeft: "5 px", textDecoration: "none" }}
            />
          </ListItem>
          <ListItem disablePadding sx={{ margin: "0", padding: "0" }}>
            <ListItemText
              primary={showLogout()}
              sx={{ paddingLeft: "5 px", textDecoration: "none" }}
            />
          </ListItem>
        </List>
      </Drawer>
    </Grid>
  );
}
