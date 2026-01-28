import react, { useState } from "react";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/user-slide';
import { useNavigate } from 'react-router-dom';

const HeaderBar = () => {
  
  const dispatch = useDispatch();
  const goto = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    dispatch(logout())
     handleClose()
    goto('/')

}
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);


  };
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* search  */}
      <Box display="flex" borderRadius="7px" backgroundColor="#F9F9E0" marginLeft={'40px'}>
        <InputBase sx={{
          ml: 10, flex: 1, width: {
            xs: '100%', // Width for extra small screens
            sm: '200px', // Width for small screens and above
            md: '700px', // Width for medium screens and above
          },
        }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* icons */}
      <Box display="flex">
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <AccountBoxIcon onClick={handleMenu} />
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <Link to="#" className="menu-bars">
              <MenuItem onClick={handleClose}>Profile</MenuItem>
            </Link>
           
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
           
          </Menu>
        </IconButton>
      </Box>
    </Box>
  );
};

export default HeaderBar;