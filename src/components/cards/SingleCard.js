import React,{useState,useEffect} from 'react';
import { HeartOutlined, ShoppingCartOutlined,HeartFilled } from '@ant-design/icons';
import { Button, Card ,Tabs} from 'antd';
import { Link } from 'react-router-dom';
import { Box, Divider, Grid, Typography } from '@mui/material';
import './SingleCard.css'; // Create a CSS file for styling
import { useSelector,useDispatch } from 'react-redux';
import _ from 'lodash'
import Floatingaction from './Floatingaction';
import { addToWishList,getWishList,deleteWishList } from '../../functions/user';
const {Tabpane} = Tabs;


const SingleCard = ({ product }) => {

  const dispatch = useDispatch()
  const {user} = useSelector((state)=>({...state})) 
  const [wishlist,setWishlist] = useState([])

  useEffect(()=>{
    if(user&&user.user.token){
      loadData()
    }

},[])
const loadData =()=>{
  
    getWishList(user.user.token).then((res)=>{
        setWishlist(res.data.wishlist)
    })


  }
  console.log(wishlist);
  const handleAddToCart = () =>{
      let cart = []
      if(localStorage.getItem('cart')){
          cart = JSON.parse(localStorage.getItem('cart')) 
      }
      cart.push({
          ...product,
          count:1
      })
      let unique = _.uniqWith(cart,_.isEqual)
      localStorage.setItem('cart',JSON.stringify(unique))

      dispatch({
          type:"ADD_TO_CART",
          payload:unique,
      })
    
  }
  if (!product || Object.keys(product).length === 0) {
    return <div>ไม่มีสินค้า</div>;
  }

    const handleAddToWishList = (e) =>{
      if(user){
      
        addToWishList(user.user.token,_id).then(res=>{
            console.log(res.data);
            loadData()
        }).catch((err)=>console.log(err))
        
      }
     
    }

    const handleRemoveWishlist = ()=>{
      if(user){
          deleteWishList(user.user.token,_id).then(res=>{
              console.log(res.data);
              loadData();
          }).catch((err)=>console.log(err))
          

      }
  }


  const { _id, name, price, quantity, sold, updatedAt, file,detail } = product;

  return (
   <Box paddingX={10} >

  
     <Floatingaction />
      <Grid container spacing={2}  style={{width:"100%", boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",height:"650px"}} bgcolor={'white'}>
        <Grid item xs={12} md={8}>
        <img src={"http://localhost:5000/uploads/" + file} height={550} alt={name} style={{width:'80%'}} />
        </Grid>
        <Grid item xs={12} md={4}   >
        <Grid container alignItems="center">
  <Grid item xs={10}>
    <h2>
      {name} <span className='text-primary'>&#3647;</span> {price}
    </h2>
  </Grid>
  <Grid item xs={2} style={{ display: 'flex', alignItems: 'center', marginBottom:'10px'}}>
    {
  wishlist ? (
                              wishlist.some(item => item._id === _id) ? (
                              <Link>
                               <HeartFilled className='text-danger' style={{fontSize:"20px"}} onClick={handleRemoveWishlist}/>
                               </Link>
                                ) : (
                                <Link>
                                <HeartOutlined className='text-danger' style={{fontSize:"20px"}} onClick={handleAddToWishList}/>
                                </Link> )
                            ) : null
                                }
  </Grid>
</Grid>
      <Divider/>
      <Grid item style={{paddingLeft:"50px"}}>
      
       <Typography variant='h5' mb={3} mt={3}>
       จำนวนคงเหลือ  
       {"  "+quantity}  ชิ้น  
       </Typography>
       <Typography variant='h5'>
       ขายไปแล้ว  
       {"  "+sold}  ชิ้น
       </Typography>

      </Grid>
      <Divider/>
      <Grid mt={5} mb={5}>
        <Button style={{width:"100%"}} onClick={handleAddToCart}>
        <ShoppingCartOutlined />  ใส่ตะกร้า
        </Button>
      </Grid>
      <Grid>

      <Tabs>
        <Tabpane tab="รายละเอียดสินค้า" key="1">
            {detail}
        </Tabpane>
       
      </Tabs>

      </Grid>
      

      </Grid>
      </Grid>
    
      </Box>
      
     
      
  )
}

export default SingleCard;