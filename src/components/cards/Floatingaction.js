import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useSelector,useDispatch } from 'react-redux';
import { Badge } from 'antd'
import { Link } from 'react-router-dom';
export default function Floatingaction() {
    const dispatch=useDispatch()
    const {cart} = useSelector((state=>({...state})))
    if (cart.length >0){
     const handleDrawer = ()=>{
           
     dispatch({
        type:"SET_VISABLE",
        payload:true,
 })
     }
  return (
    
    <Box
      sx={{
        position: 'fixed',
        right: '20px', 
        bottom: ' 20px',
        zIndex: 1000, // Ensure it's above other elements if needed
      }}
      
    >
      <Fab variant="extended" onClick={handleDrawer}>
      <Badge count={cart.length}   style={{
          backgroundColor: '#52c41a',
        }} offset={[6,-5]}>
            
        <ShoppingCartOutlined style={{ marginRight: '10px' }} />
        ตะกร้าสินค้า
        </Badge>
      </Fab>
      
    
    </Box>
  );
    }
}

