// rafce
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import {
    Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Typography, Popover
} from '@mui/material'
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import {
    TablePagination,
    tablePaginationClasses as classes,
} from '@mui/base/TablePagination';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { styled } from '@mui/system';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import {
    remove,
    create,
    getdata

} from '../../../functions/product'


const FormProduct = () => {

    //pagination
    const [page, setPage] = useState(0); // index of currently displayed page
    const [rowsPerPage, setRowsPerPage] = useState(10); // number of rows per page

    //confirm
    const [open, setOpen] = React.useState(false);

    // javascript
    const [data, setData] = useState([])
    const [form, setForm] = useState({})


    useEffect(() => {

        // code
        loadData()

    }, [])

    const onChangePage = (event, newPage) => {
        setPage(newPage);
    };


    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const loadData = async () => {
        getdata()
            .then((res) => setData(res.data))
            .catch((err) => console.log(err))
    }
    const handleChange = (e) => {


        if (e.target.name === 'file') {
            
            setForm({
                
                ...form,
                [e.target.name]: e.target.files[0]
            })
        }
        else {
            setForm({
                ...form,
                [e.target.name]: e.target.value
            })
        }


    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        const FormWithImageData = new FormData()
        for (const key in form) {
            FormWithImageData.append(key, form[key])
        }


        create(FormWithImageData)
            .then(res => {

                toast.success(res.data, {
                    position: toast.POSITION.TOP_LEFT,
                    autoClose: 1000 // Close the notification after  seconds
                })
                loadData()


            })
            .catch((err) => {
                console.log(err)
                toast.error('เซิฟเวอร์ ERROR!!', {
                    position: toast.POSITION.TOP_LEFT,
                    autoClose: 1000
                })
            })
    }
    const handleRemove = async (id) => {
        remove(id)
            .then((res) => {

                loadData()
                toast.success(res.data, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000 // Close the notification after  seconds
                });

            })
            .catch((err) => {

                toast.error('เซิฟเวอร์ ERROR!!', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000
                });
            })
    }
 
    return (
        <div style={{ textAlign: 'right', marginBot: '20px' }}>


            <PopupState variant="popover" popupId="demo-popup-popover" >
                {(popupState) => (
                    <div>
                        <Button variant="contained" {...bindTrigger(popupState)} startIcon={<AddCircleIcon />} >
                            เพิ่มสินค้า
                        </Button>
                        <Popover
                            anchorReference="anchorPosition"
                            anchorPosition={{ top: 300, left: 450 }}
                            {...bindPopover(popupState)}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            <Typography sx={{ p: 2, height: 550, width: 900, opacity: 0.9 }}>  <form onSubmit={handleSubmit} encType='multipart/form-data'>
                                <label>เพิ่มสินค้า</label><hr></hr>
                                <br></br>
                                <section sx={{ marginBottom: '10' }}><TextField
                                    id="outlined-basic" label="กรุกรอกชื่อสินค้า" variant="outlined" name='name' required
                                    onChange={e => handleChange(e)} fullWidth /></section>
                                <br></br>
                                <section> <TextField
                                    id="outlined-basic" label="ข้อมูลสินค้า" variant="outlined" name='detail'
                                    onChange={e => handleChange(e)} fullWidth /></section>
                                <br></br>
                                <section> <TextField
                                    type='number' id="outlined-basic" label="กรุณากรอกราคาสินค้า" variant="outlined" name='price'
                                    onChange={e => handleChange(e)} fullWidth required /></section>
                                <br></br>
                                <section> <TextField
                                    type='number' id="outlined-basic" label="จำนวนของสินค้า" variant="outlined" name='quantity'
                                    onChange={e => handleChange(e)} fullWidth /></section>
                                <br></br>

                                <div> <TextField
                                    type='file' id="outlined-basic" label="file" variant="outlined" name='file'
                                    onChange={e => handleChange(e)} focused /></div>
                                <br></br>

                                <Button variant="contained" type='submit' sx={{ width: 400 }}>Submit</Button>
                            </form>
                            </Typography>
                        </Popover>
                    </div>
                )}
            </PopupState>
            <ToastContainer />


            <div style={{ marginTop: '15px' }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 200 }} >
                        <TableHead >
                            <TableRow sx={{ textAlign: "center" }} >
                                <TableCell sx={{ textAlign: "center", width:"5%"}}>ลำดับ</TableCell>
                                <TableCell align="center">รูป</TableCell>
                                <TableCell>ชื่อ</TableCell>
                                <TableCell padding='none'>รายละเอียด</TableCell>
                                <TableCell padding='none'>ราคา</TableCell>
                                <TableCell width={10}>จำนวน</TableCell>
                                <TableCell align='center'>แก้ไข</TableCell>
                                <TableCell align='center'>ลบ</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {data && data.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((item, index) => (
                                <TableRow key={index} >
                                    <TableCell sx={{ textAlign: 'center' }}>{index + 1}</TableCell>
                                    <TableCell width={300} height={150}>

                                        <img src={"http://localhost:5000/uploads/" + item.file}
                                            style={{ maxWidth: '100%', maxHeight: '100%', width: '100%', height: '100%' }}
                                            alt="Product" />
                                    </TableCell>
                                    <TableCell>{item.name}</TableCell>


                                    <TableCell align="left" padding="none">{item.detail}</TableCell>
                                    <TableCell>{item.price}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell  align='center'>   <Link to={'/edit/' + item._id} style={{margin:"0 auto"}}><EditIcon />
                                    </Link> 
                              
                                        
                                    </TableCell>
                                    <TableCell align='center'>
                                    <Button onClick={() => handleRemove(item._id)} style={{margin:"0 auto"}}>
                                     <DeleteIcon color='error' />   </Button>
                                    </TableCell>
                                   
                                  
                                </TableRow>
                            ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <Root style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <CustomTablePagination
                        component={Paper}
                        count={data.length}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        onPageChange={onChangePage} // Corrected event handler for page change
                        onRowsPerPageChange={handleChangeRowsPerPage} // Corrected event handler for rows per page change
                        classes={classes}
                        labelRowsPerPage=""
                        labelDisplayedRows={({ from, to, count }) => `${from} จาก ${count !== -1 ? to : count}`}


                    />
                </Root>
                
            </div>




        </div>
    )
}

const blue = {
    50: '#F0F7FF',
    200: '#A5D8FF',
    400: '#3399FF',
    900: '#003A75',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const Root = styled('div')(
    ({ theme }) => `
    table {
      font-family: 'IBM Plex Sans', sans-serif;
      font-size: 0.875rem;
      border-collapse: collapse;
      width: 100%;
    }
  
    td,
    th {
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
      text-align: left;
      padding: 6px;
    }
  
    th {
      background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[50]};
    }
    `,
);

const CustomTablePagination = styled(TablePagination)(
    ({ theme }) => `
    & .${classes.spacer} {
      display: none;
    }
  
    & .${classes.toolbar}  {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
  
      @media (min-width: 768px) {
        flex-direction: row;
        align-items: center;
      }
    }
  
    & .${classes.selectLabel} {
      margin: 0;
    }
  
    & .${classes.select}{
      padding: 2px;
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
      border-radius: 50px;
      background-color: transparent;
  
      &:hover {
        background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
      }
  
      &:focus {
        outline: 1px solid ${theme.palette.mode === 'dark' ? blue[400] : blue[200]};
      }
    }
  
    & .${classes.displayedRows} {
      margin: 0;
  
      @media (min-width: 768px) {
        margin-left: auto;
      }
    }
  
    & .${classes.actions} {
      padding: 2px;
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
      border-radius: 50px;
      text-align: center;
    }
  
    & .${classes.actions} > button {
      margin: 0 8px;
      border: transparent;
      border-radius: 2px;
      background-color: transparent;
  
      &:hover {
        background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
      }
  
      &:focus {
        outline: 1px solid ${theme.palette.mode === 'dark' ? blue[400] : blue[200]};
      }
    }
    
    `,
    
);
export default FormProduct