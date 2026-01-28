import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
const Search = () => {
  const dispatch = useDispatch();
  const goto = useNavigate();

  const {search} = useSelector((state)=>({...state}))
  const {text} = search
  console.log(text);

  const handleChange = (e) =>{
    // console.log(e.target.value);
    dispatch({
      type:"SEARCH_QUERY",
      payload:{text:e.target.value},
    })
  }
  const handleSubmit = (e) =>{
    e.preventDefault();
    goto('/shop?' +text);
  }
  return (
 
 <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400,marginRight:'10px' }}
      onSubmit={handleSubmit}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="ค้าหาสินค้า"
        inputProps={{ 'aria-label': 'ค้าหาสินค้า' }}
        onChange={handleChange}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSubmit}>
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
   
    </Paper>
    
  )
}

export default Search