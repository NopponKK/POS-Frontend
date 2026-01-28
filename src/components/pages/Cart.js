import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import ProductTable from '../cards/ProductTable'
import { userCart } from '../../functions/user'
import { useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill';
import {  toast } from 'react-toastify'

const Cart = () => {
    const dispatch = useDispatch()
    const goto = useNavigate()
    const { cart, user } = useSelector((state) => ({ ...state }))
    
    const getTotal = () =>{
        return cart.reduce((currentValue,nextValue)=>{
            return currentValue + nextValue.count * nextValue.price
        },0)
    }

    const handleSaveOrder = () =>{
        let hasZeroQuantity = false;
        cart.forEach((item) => {
            if (item.quantity <= 0) {
                toast.error(item.name+"หมด")
                hasZeroQuantity = true;
            }
        });
        if(!hasZeroQuantity){
            userCart(user.user.token,cart).then(res=>{
            
                goto('/checkout',{state:{image:cart}})
            }).catch(err=>console.log(err))
         
        }
    
    }

   const showCartItem = () =>{
    
       return <table className='table table-bordered'>
            <thead className='thead-light'>
                <tr>
                    <td style={{width:"10%"}}>รูปภาพ</td>
                    <td>ชื่อสินค้า</td>
                    <td>ราคาสินค้า</td>
                    <td>จำนวน</td>
                    
                    <td style={{width:"2%"}}>ลบ</td>
                    
                </tr>
            </thead>
            {cart.map((item) => (
    <ProductTable key={item._id} item={item} />
))}
        </table>
   }
    return (
        <div className='container-fluid ' style={{overflowY:'auto',   backgroundColor:"white",height:"100%"}} >
            
            <div className='row' >
                <div className='col-md-8'>
                <h4 >      สินค้าทั้งหมด : {cart.length} ชิ้น  </h4>
                    {!cart.length
                     ?<p>ไม่มีสินค้าในตะกร้า</p> 
                     : showCartItem()  }
              
                </div>
                <div className='col-md-4'>
                    <h4>  ผลรวม </h4>

                    <hr />
                    {cart.map((item, index) => (
                        <p key={index}>
                            {item.name} x {item.count} = {item.price*item.count}
                        </p>
                    ))}
                    <hr/>
                    <h4>Total:{getTotal()} </h4>
                        {user.value =='logined' ?
                        <button className='btn btn-success' disabled={!cart.length} onClick={handleSaveOrder}>Checkout</button>
                    : <Link to={'/login'} state='cart' style={{textDecoration:'none', color:'white'}}>
                     <button className='btn btn-danger'>
                        Login to Checkout
                        </button>
                        </Link>}
                </div>

            </div>
        </div>
    )
}

export default Cart