import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { readUser } from '../functions/user';
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Box, Container, Divider, Grid, List, Typography, Paper,useMediaQuery,Fab  } from '@mui/material';
import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import FavoriteIcon from '@mui/icons-material/Favorite';
const AccountSideBar = ({ children }) => {


     const goto = useNavigate()
     const { user } = useSelector((state) => ({ ...state }))

     const [data, setData] = useState({})
     const params = useParams()
     const isPhone = useMediaQuery('(max-width:1000px)'); // Check if the device is a phone


     const loadData = async (id) => {
        
     readUser(user.user.token, id)
             .then((res) => {
                 setData(res.data)
                 

             }).catch((err) => {
                console.log(err)
                toast.error('เซิฟเวอร์ ERROR!!', {
                    position: toast.POSITION.TOP_LEFT,
                    autoClose: 1000
                })
            })
     }

     useEffect(() => {
            loadData(user.user.id) 

     }, [])
     const pathCheck = ()=>{
        if(user.user.id!== params.id){
            goto('/user/account/'+user.user.id)
            if(window.location.pathname="/user/wishlist"){
                goto('/user/wishlist')
            }
        } 
      
     }
  
    return (

        <Container>
            {pathCheck}
            <Paper style={{ boxSizing: "border-box", paddingTop: "2%",overflow:"visable" }}>
                <Grid Grid container
                    direction="row"
                    justifyContent="space-around"
                    alignItems="flex-start"
                    
                   >
                    
                   {!isPhone ? <Grid item xs={3} >
                        <Typography variant='h5'><label>โปรไฟล์</label> </Typography>
                      
                       
                        <List>

                            <Link to={'/user/account/' + data._id}>
                                <ListItemButton>
                                    <ListItemIcon><UserOutlined className='text-success'/></ListItemIcon>
                                    <ListItemText>
                                        <label>
                                        จัดการบัญชี
                                        </label>
                                        </ListItemText>
                                </ListItemButton>
                            </Link>
                            <Link to={'/user/history'}>

                                <ListItemButton>
                                    <ListItemIcon><HistoryEduIcon className='text-primary'/></ListItemIcon>
                                    <ListItemText>
                                        <label>
                                        ประวัติการสั่งซื้อ
                                        </label>
                                      </ListItemText>
                                </ListItemButton>
                            </Link>

                            <Link to={"/user/wishlist"}>

                                <ListItemButton>
                                    <ListItemIcon><FavoriteIcon className='text-danger'/></ListItemIcon>
                                    <ListItemText>
                                        <label>
                                        สินค้าที่สนใจ
                                        </label>
                                       </ListItemText>
                                </ListItemButton>
                            </Link>


                        </List>
                    </Grid>
                        
                        
                        :
                        
                        <div style={{bottom:"0",position:"fixed", width:"100%",backgroundColor:"#333533 ",
                        boxShadow: '1px -4px 38px -14px rgba(0,0,0,0.84)',
                        WebkitBoxShadow: '1px -4px 38px -14px rgba(0,0,0,0.84)',
                        MozBoxShadow: '1px -4px 38px -14px rgba(0,0,0,0.84)',
                        display:"flex",justifyContent:"space-evenly",
                        zIndex:'3'}}> 
                        <Link to={'/user/account/' + data._id}>
                     
                        <Fab size="small" color="" aria-label="add">
                       <UserOutlined/>
                      </Fab>
                      </Link>
                      <Link to={'/user/history'}>
                     
                     <Fab size="small" color="" aria-label="add">
                    <HistoryEduIcon className='text-primary'/>
                   </Fab>
                   </Link>
                   <Link to={'/user/wishlist'}>
                     
                     <Fab size="small" color="" aria-label="add">
                    <FavoriteIcon className='text-danger'/>
                   </Fab>
                   </Link>
                      </div>
                   } 
                    <Grid itme xs={isPhone? 13 : 9}  borderLeft={!isPhone? 1: 0} padding={!isPhone ? 2 : 0} >
                        {children}

                    </Grid>
                </Grid>
            </Paper>
        </Container>

    )
}

export default AccountSideBar;