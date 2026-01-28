import React from 'react'
import { useDispatch } from 'react-redux'
import {  toast } from 'react-toastify'
import { CloseCircleFilled } from '@ant-design/icons'
const ProductTable = ({ item }) => {
    const dispatch = useDispatch()

    const handleChangeCount =(e) =>{
        const count = e.target.value <1  ?1  : e.target.value

        if (count> item.quantity){
            toast.error('เหลือ'+item.name +"ในสต๊อกแค่  "+ item.quantity +' ชิ้น')
            return;
        }

        let cart = []
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'))
        }
      console.log(count);
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
    const handleRemove = () =>{
       
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
        <>
        
    
        <tbody>
            <td> <img
                alt={item.name}
                src={"https://pos-backend-f8yf.onrender.com/uploads/" + item.file} width={100} height={100} /></td>
            <td>{item.name} <br/> จำนวนคงเหลือ:{item.quantity}
            </td>
            <td>{item.price}</td>
            <td style={{width:"5%"}}>
                <input type='number' value={item.count} className='form-control' onChange={handleChangeCount}/></td>
            <td><CloseCircleFilled className='text-danger ' onClick={handleRemove} /></td>
        </tbody>
        </>
    )
}

export default ProductTable