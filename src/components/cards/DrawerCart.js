import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {Drawer,Button} from 'antd'
import { Grid ,TextField,Typography,Paper,Divider} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ButtonBase from '@mui/material/ButtonBase';
import { toast } from 'react-toastify'
const DrawerCart = () => {
    const dispatch=useDispatch()
    const {cart,drawer} = useSelector((state)=>({...state}))
    const oldcard =cart
    const onCloseDrawer =()=>{
        dispatch({
            type:"SET_VISABLE",
            payload:false,
        })
    }


    const handleChangeCount =(e,item) =>{

     
        const count = e.target.value 
        if(e.target.value <1){
          e.target.value = 1
        }
       if (count> item.quantity){
           toast.error('เหลือ'+item.name +"ในสต๊อกแค่  "+ item.quantity +' ชิ้น')
           e.target.value = item.quantity
           return;
       }

       let cart = []
       if(localStorage.getItem('cart')){
           cart = JSON.parse(localStorage.getItem('cart'))
       }
     
     cart.map((product,i)=>{
       if(product._id== item._id){
           cart[i].count = count
    }
     })
     localStorage.setItem('cart',JSON.stringify(cart))
     dispatch({
       type:"ADD_TO_CART",
       payload:cart
    })
  }

    const handleRemove = (item) =>{

      let cart = []
      if(localStorage.getItem('cart')){
          cart = JSON.parse(localStorage.getItem('cart'))
      }

    cart.map((product,i)=>{
      if(product._id== item._id){
          cart.splice(i,1)
      }
    })
    localStorage.setItem('cart',JSON.stringify(cart))
    dispatch({
      type:"ADD_TO_CART",
      payload:cart
    })
  }
  return (
    <Drawer
    onClose={onCloseDrawer}
    title={"สินค้าทั้งหมด: "+cart.length + " ชิ้น"} placement="right" visible={drawer} >

    {cart.map((item,index)=>
    <>
    <Divider/>
    
      <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 600,
        minWidth:300,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase>

            <img alt="complex" src={"https://pos-backend-f8yf.onrender.com/" + item.file} width={150} height={150}/>

          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
               {item.name}

              </Typography>
              <Divider/>
              <Typography gutterBottom variant="subtitle1" component="div" noWrap> 
              
              <TextField onChange={(e)=>handleChangeCount(e,item)} placeholder={"เหลือ: "+item.quantity +"ชิ้น"}  type='number'  variant="standard" width={200} /> 
              </Typography>
             
              <br/>
              <Typography variant="body1" gutterBottom onClick={()=>handleRemove(item)} className='text-danger'>
               ลบ
              </Typography>

            </Grid>

          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              {item.price * item.count} <span className='text-primary'>&#3647;</span>
            </Typography>
          </Grid>
        </Grid>
      </Grid>

     </Paper>
     </>
    )}
   
    <Link to={'/cart'}>

    <Button style={{ position: 'absolute', bottom: '20px', right: '5px' ,width:"40%",height:"5%"}} onClick={onCloseDrawer}>
    <CheckCircleIcon style={{marginRight:"10px"}} className='text-success'/>
      ตะกร้าสินค้า
    </Button>
    </Link>
  </Drawer>
  
  )
}

export default DrawerCart