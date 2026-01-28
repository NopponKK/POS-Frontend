import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';
//function
import { list } from '../../../functions/user';

//mui
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, 
   Select,MenuItem
} from '@mui/material'
import Paper from '@mui/material/Paper';

import {
  TablePagination,
  tablePaginationClasses as classes,
} from '@mui/base/TablePagination';
import { styled } from '@mui/system';


const UserSelect = () => {

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "d MMMM yyyy HH:mm:ss 'น.'", { locale: th });
  
  };
  
  

//pagination
const [page, setPage] = useState(0); // index of currently displayed page
const [rowsPerPage, setRowsPerPage] = useState(10); // number of rows per page



  const { user } = useSelector((state) => ({ ...state }))

  const [data, setData] = useState([])
  const [selectData,setSelectData] = useState([])

  const [drop,setDrop] = useState([])
  
  useEffect(() => {
    loadData(user.user.token)
  }, [])

  const loadData = async (authtoken) => {
    await list(authtoken).then((res) => {
      setData(res.data)
      setSelectData(res.data)
      // [...new Set(array)]
      const dataDrop = [...new Set( res.data.map(item=>item.role))] 
      setDrop(dataDrop)
    }).catch(err => console.log(err))
  }



  

const onChangePage = (event, newPage) => {
  setPage(newPage);
};
const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
};
  return (
    <div>
       
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ textAlign: "center" }} >
              <TableCell sx={{ textAlign: "center" }}>ลำดับที่</TableCell>
              <TableCell>ชื่อ</TableCell>
              <TableCell>ตำแหน่ง</TableCell>
              <TableCell>อัพเดทเมื่อ</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>

            {
              selectData && selectData.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((item, index) => (
                <TableRow key={index} >
                  <TableCell sx={{ textAlign: 'center' }}>{index + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                  </TableCell>
                 <TableCell>{formatDate(item.updatedAt)}</TableCell>

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
export default UserSelect