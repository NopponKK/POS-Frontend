import React, { useEffect, useState } from 'react'
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
import { currentAdmin } from '../functions/auth';
//layout
import '../index.css'
import HeaderBar from '../layouts/HeaderBar'
import Sidebar from '../layouts/SideBar';
import { Box } from "@mui/material";
import Notfound404 from '../components/pages/Notfound404';

const AdminRoute = ({ children }) => {
  
  const {user} = useSelector((state)=>({...state}))
  const [ok,setOk] = useState(false)

  useEffect(()=>{
    if(user && user.user.token){
      currentAdmin(user.user.token)
      .then(r=>{
        // console.log(r)
        setOk(true)
      })
      .catch((err)=>{
        console.log(err);
        setOk(false)
      })
    }
   
  },[user])

  console.log('adminroute',user.user.role)
  const text="แอดมินเท่านั้น! "
  return ok ? (

    <div className='app'>
    <Sidebar />
    <main className="content">
      {/* <HeaderBar /> */}

      <div className="content_body">
        <Box m="20px">

          {children}

        </Box>
      </div>
    </main>

  </div>
    
  ):<Notfound404 text={text}/>
}

export default AdminRoute