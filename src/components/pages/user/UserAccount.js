import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { readUser,updateUser } from '../../../functions/user';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormOutlined,SaveFilled,UserOutlined } from '@ant-design/icons';

import {  TextField, Typography } from '@mui/material';
import { Button } from 'antd';
const UserAccount = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const [data, setData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [newData,setNewData]=useState({
    
  })


  useEffect(() => {
    
      loadData(user.user.id)
  

  }, []);

  const loadData = async (id) => {
    readUser(user.user.token, id)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error('Error loading data:', error);
        // toast.error('Error loading data');
      });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    updateUser(user.user.token, params.id, newData).then((res)=>{
      loadData(params.id)
    }).catch((err)=>{
      console.log(err)
    })
    
  };

  const handleChange=(e)=>{
    setNewData({
      ...newData,
      [e.target.name]: e.target.value
  })

  }

  return (
    <>
      <Typography variant='h5' gutterBottom style={{ display: 'flex', alignItems: 'center' }}>
        <label> <UserOutlined /> {`   `}บัญชี </label>
        <span style={{ flex: 1 }}></span>
          
      {!isEditing ? (
        <Button onClick={handleEdit} type='primary' size='large' icon={<FormOutlined/>} >แก้ไข</Button>
        
      ) : (
        <Button onClick={handleSave} type='primary' size='large' icon={<SaveFilled/>}>บันทึก</Button>
      )}
       
      </Typography>
      <hr />
      <Typography variant='h6' gutterBottom style={{ display: 'flex', flexDirection: 'column',  paddingLeft:'5%'}}>
  
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <label style={{ marginRight: '8px',width:'10%'  }}>ชื่อผู้ใช้ </label>

            <TextField label={data.name} sx={{ width: '80%' }}
             variant='filled' disabled="true" name="name"/>
          </div>

          
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <label style={{ marginRight: '8px',width:'10%'  }}>ชื่อ-นามสกุล </label>

            <TextField label={data.name_surname} sx={{ width: '80%' }}
             variant={isEditing?'outlined':'filled'} disabled={!isEditing} name="name_surname"  onChange={(e)=>handleChange(e)}/>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <label style={{ marginRight: '8px',width:'10%'  }}>ที่อยู่ </label>

            <TextField label={data.address} sx={{ width: '80%' }}
             variant={isEditing?'outlined':'filled'} disabled={!isEditing} name="address"  onChange={(e)=>handleChange(e)}/>
          </div>
        
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <label style={{ marginRight: '8px', width:'10%' }}>อีเมล </label>
            <TextField label={data.email} sx={{ width: '80%' }}
             variant={isEditing?'outlined':'filled'} disabled={!isEditing} onChange={(e)=>handleChange(e)} name="email"/>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <label style={{ marginRight: '8px', width:'10%' }}>เบอร์ </label>
            <TextField label={data.tel} sx={{ width: '80%' }}
             variant={isEditing?'outlined':'filled'} disabled={!isEditing} onChange={(e)=>handleChange(e)} name="tel"/>
          </div>


        
        
        

      </Typography>
      <hr />
  
    </>
  );
};

export default UserAccount;