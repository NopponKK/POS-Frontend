import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

//function
import { register } from '../../../functions/auth';
import { useState,useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
  
  return (
    
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        ลายปักษ์
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Register() {
  const goto=useNavigate();
  const [password, setPassword] = React.useState('');
const [confirmPassword, setConfirmPassword] = React.useState('');
const [passwordError, setPasswordError] = React.useState(false);


  const handleSubmit = (event) => {

    event.preventDefault();
    if (password === confirmPassword) {
      
    const data = new FormData(event.currentTarget);
    
    const tam = {
        name:data.get("name"),
        password:data.get('password')
    }

    register(tam).then(res=>{
        console.log(res.data)
        if(res.data=='สมัครสมาชิกเรียบร้อย'){
        toast.success(res.data, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000
      });
    }else {
      toast.error(res.data, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000
    });
    }
       
        
    }).catch(err=>console.log(err))
   
  }
    
    else {
      // Show an error or handle the mismatching passwords
      toast.error('รหัสผ่านไม่ตรงกัน', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 500
    });
    }

  
  };

  const handleChange = (e) => {
   
    const { name, value } = e.target;

    if (name === 'password') {
      setPassword(value);
    } else if (name === 'confirmpassword') {
      setConfirmPassword(value);
    }
   
  }
  React.useEffect(() => {
    setPasswordError(password !== confirmPassword);
  }, [password, confirmPassword]);

  return (
    
    <ThemeProvider theme={defaultTheme}>
       <ToastContainer />
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              ระบบสมัครสมาชิก
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Username"
                name="name"
                autoFocus
                onChange={e => handleChange(e)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
               onChange={e => handleChange(e)}
              />
               <TextField
                margin="normal"
                required
                fullWidth
                name="confirmpassword"
                label="Confirm Password"
                type="password"
                id="confirmpassword"
                onChange={e => handleChange(e)}
             
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                สมัครสมาชิก
              </Button>
              <Grid >
                
                <Grid item align="center">
                  <Link href="/login" variant="body2">
                    {"มีบัญชีแล้ว? เข้าสู่ระบบ"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}