import React from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import ResponsiveAppBar from '../layouts/ResponsiveAppBar';
import Notfound404 from '../components/pages/Notfound404';

const UserRoute = ({children}) => {
  const {user} = useSelector((state)=>({...state}))
   console.log("UserRoute",user);
  return user && user.user.token ?
   <>
    <ResponsiveAppBar/>
    {children}
   

 
    
  
  </> 
  : <Notfound404 text="กรุณาเข้าสู่ระบบ"/>
}


export default UserRoute