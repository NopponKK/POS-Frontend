import axios from 'axios'

export const updateStatusOrders = async(authtoken,orderId,orderStatus)=>{
    return await axios.put(process.env.REACT_APP_API+ '/admin/order-status',{orderId,orderStatus},{
        headers:{authtoken}
    })

}

export const getAllOrder = async(authtoken)=>{
    return await axios.get(process.env.REACT_APP_API+ '/admin/orders',{
        headers:{authtoken}
    })

}
export const getSelectedOrder = async(id,authtoken)=>{
    return await axios.get(process.env.REACT_APP_API+ '/admin/orders/'+id,{
        headers:{authtoken}
    })

}
export const getUserByOrder = async(id,authtoken)=>{
    return await axios.get(process.env.REACT_APP_API+ '/admin/userorder/'+id,{
        headers:{authtoken}
    })

}