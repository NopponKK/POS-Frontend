import axios from 'axios'


export const list = async (authtoken) =>await axios.get(process.env.REACT_APP_API + '/user',{
    headers:{authtoken}
})

export const changeRole = async (authtoken,data) =>
await axios.post(process.env.REACT_APP_API + '/change-role',{data},{
    headers:{authtoken}
})

export const userCart = async (authtoken,cart) =>
await axios.post(process.env.REACT_APP_API + '/user/cart',{cart},{
    headers:{authtoken}
})

export const getUserCart = async (authtoken) =>
await axios.get(process.env.REACT_APP_API + '/user/cart',{
    headers:{authtoken}
})

export const saveOrder = async (authtoken,orderData) =>
await axios.post(process.env.REACT_APP_API + '/user/order',{orderData},{
    headers:{authtoken}
})

export const emptyCart = async (authtoken) =>
await axios.delete(process.env.REACT_APP_API + '/user/cart',{
    headers:{authtoken}
})

export const getWishList = async (authtoken) =>
await axios.get(process.env.REACT_APP_API + '/user/wishlist',{
    headers:{authtoken}
})

export const addToWishList = async (authtoken,productId) =>
await axios.post(process.env.REACT_APP_API + '/user/wishlist',{productId},{
    headers:{authtoken}
})

export const deleteWishList = async (authtoken,productId) =>
await axios.put(process.env.REACT_APP_API + '/user/wishlist/'+productId,{},{
    headers:{authtoken}
})

export const getOrders = async (authtoken) =>
await axios.get(process.env.REACT_APP_API + '/user/orders',{
    headers:{authtoken}
})


export const readUser = async (authtoken,id) => {
    return await axios.get(process.env.REACT_APP_API + '/user/account/' + id,{
        headers:{authtoken}
    })
}

export const updateUser = async(authtoken,id,data)=>{
    return await axios.put(process.env.REACT_APP_API+ '/user/account/edit/'+id,{data},{
        headers:{authtoken}
    })

}

export const genQR = async(authtoken,amount)=>{
    return await axios.post(process.env.REACT_APP_API+ '/user/genqr',{amount},{
        headers:{authtoken}
    })

}

export const verifyImage = async (authtoken, file) => {
    return await axios.post(process.env.REACT_APP_API + '/user/upload', {file }, {
        headers: { authtoken }
    });
}