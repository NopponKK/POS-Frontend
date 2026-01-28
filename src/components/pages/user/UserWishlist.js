import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Divider, TablePagination } from '@mui/material';
import { getWishList, deleteWishList } from '../../../functions/user';
import { HeartFilled, CloseCircleFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import ButtonBase from '@mui/material/ButtonBase';
import Paper from '@mui/material/Paper';

const UserWishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        getWishList(user.user.token).then((res) => {
            setWishlist(res.data.wishlist);
        });
    };

    const handleRemove = (productId) => {
        deleteWishList(user.user.token, productId).then((res) => {
            console.log(res.data);
            loadData();
        });
    };

    
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const rowsPerPageOptions = [5, 10, 25, 50,100];

    return (
        <>
            <Typography variant="h5">
                <label>
                    <HeartFilled className="text-danger" /> {`  `} สินค้าที่สนใจ{' '}
                </label>
                <span style={{ flex: 1 }}></span>
                <Divider />
            </Typography>

            {wishlist ? (
                wishlist.map((item, index) => (
                    <Link to={'/product/' + item._id} style={{ textDecoration: 'none' }} key={index}>
                        <Typography variant="h6" gutterBottom style={{ padding: '5%', paddingTop: '0' }}>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <ButtonBase sx={{ width: 128, height: 128 }}>
                                        <img src={'http://localhost:5000/uploads/' + item.file} style={{ width: '100%', height: '100%' }} />
                                    </ButtonBase>
                                </Grid>
                                <Grid item xs={12} sm container>
                                    <Grid item xs container direction="column" spacing={2}>
                                        <Grid item xs>
                                            <Typography gutterBottom variant="subtitle1" component="div">
                                                {item.name}
                                            </Typography>
                                            <Typography variant="body2" gutterBottom>
                                                จำนวนสินค้าทั้งหมด:{item.quantity}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                ID:{item._id}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="subtitle1" component="div">
                                            <CloseCircleFilled
                                                onClick={() => handleRemove(item._id)}
                                                style={{ fontSize: '24px' }}
                                                className="text-danger"
                                            />
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <hr />
                        </Typography>
                    </Link>
                ))
            ) : (
                <div>noProduct</div>
            )}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <TablePagination
                    component="div"
                    count={wishlist.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    style={{ marginBottom: '35px' }}
                    labelRowsPerPage=""
                    rowsPerPageOptions={rowsPerPageOptions}
                />
            </div>
        </>
    );
};

export default UserWishlist;
