import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart, saveOrder, emptyCart } from "../../../functions/user";
import ShirtSize from "../../cards/ShirtSize";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  ButtonBase,
  TextField,
  Checkbox,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  Tooltip,
} from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Checkout = () => {
  const goto= useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  const [products, setProduct] = useState([]);
  const [total, setTotal] = useState([]);
  const [productData, setProductData] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");

  const [checkedValues, setCheckedValues] = useState(
    products.map((_) => false)
  );

  // Inside useEffect, after setting products:
  useEffect(() => {
    getUserCart(user.user.token).then((res) => {
      
      setProduct(res.data.products);
      setTotal(res.data.cartTotal);
      // Initialize product data with empty values for each product
      const initialProductData = res.data.products.map(() => ({
        name: "",
        department: "",
        detail: "",
        size: "",
      }));
      
      setProductData(initialProductData);
    });
  }, []);

  const handleCreateOrder = () => {
    // Handle order creation for each product

    const allOrdersData = productData.map((data) => ({
      name: data.name,
      department: data.department,
      detail: data.detail,
      size: data.size,
    }));
    saveOrder(user.user.token, allOrdersData).then((res) => {
      emptyCart(user.user.token);
      toast.success("ซื้อสินค้าเรียบร้อย");
      goto("/user/history")
      dispatch({
        type: "ADD_TO_CART",
        payload: [],
      });

      if (typeof window !== "undefined") {
        localStorage.removeItem("cart");
      }
    });
  };
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    
    
    setProductData((prevProductData) => {
      const updatedProductData = [...prevProductData];
      updatedProductData[index] = {
        ...updatedProductData[index],
        [name]: value,
      };
      return updatedProductData;
    });
  };

 
  return (
    <Box>
      <Grid >
        <Typography variant="h4" style={{backgroundColor:"#001d3d", height:"59px", marginBottom:"10px"}}>
          <Grid container spacing={1} noWrap paddingLeft={3} >
            <Grid item lg={11} md={11} sm={10} xs={9} color={"white"}>
              รายการสินค้าทั้งหมด
            </Grid>
            <Grid item lg={1} md={1} sm={2} xs={3} color={"white"}>
              <span>
                {" "}
                {total}
                <span className="text-primary">&#3647;</span>{" "}
              </span>
            </Grid>
          </Grid>
        </Typography>
       
        <Container>
          {products.map((item, i) => (
            <Paper
              key={i}
              sx={{
                p: 3,
                marginBottom: 1,
                flexGrow: 1,
                backgroundColor: "white",
                border: 0.5,
              }}
            >
              <Grid container spacing={2} noWrap>
                <Grid item marginRight={4}>
                  <ButtonBase sx={{ width: 200, height: 200 }}>
                    { !checkedValues[i]?
                      <img
                      alt="กรุณารีเฟรช "
                      src={
                        "https://pos-backend-f8yf.onrender.com/uploads/" + item.file}
                      style={{ width: 200, height: 200 }}
                    />
                    : <ShirtSize/>
                    }
                  
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.product.name}
                        <br />
                      </Typography>
                      <Checkbox
                        name="checkBox"
                        value="1"
                        onChange={(e) =>
                          setCheckedValues((prevCheckedValues) => ({
                            ...prevCheckedValues,
                            [i]: e.target.checked,
                          }))
                        }
                        key={i}
                      />{" "}
                      ปักเสื้อเลยไหม?
                      <Grid Item>
                        <Grid
                          container
                          direction="row"
                          justifyContent="flex-start"
                          alignItems="center"
                          noWrap
                        >
                        
                          <TextField
                            id="outlined-multiline-flexible"
                            label="ชื่อ-นามสกุล"
                            required
                            style={{
                              display: checkedValues[i]
                                ? "inline-block"
                                : "none",
                                width:"93%"
                            }}
                            onChange={(e) => handleChange(e, i)}
                            name="name"
                            fullWidth
                          />
                          <FormControl
                            style={{
                              display: checkedValues[i]
                                ? "inline-block"
                                : "none",
                                width:"7%"
                            }}
                          >
                            <InputLabel id="demo-simple-select-label">
                              ขนาด
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              label="ขนาดเสื้อ"
                              onChange={(e) => handleChange(e, i)}
                             
                              required
                              name="size"
                            >
                          
                              <MenuItem value="S">S</MenuItem>
                              <MenuItem value="M">M</MenuItem>
                              <MenuItem value="L">L</MenuItem>
                              <MenuItem value="XL">XL</MenuItem>
                              <MenuItem value="XXL">XXL</MenuItem>
                              <MenuItem value="XXXL">XXXL</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                      
                        <TextField
                          id="outlined-multiline-flexible"
                          label="แผนก"
                          multiline
                          maxRows={3}
                          required
                          fullWidth
                          style={{
                            display: checkedValues[i] ? "inline-block" : "none",
                          }}
                          onChange={(e) => handleChange(e, i)}
                          name="department"
                        />
                        <br />
                        <TextField
                          id="outlined-multiline-flexible"
                          label="รายละเอียดเพิ่มเติม"
                          multiline
                          maxRows={3}
                          required
                          fullWidth
                          style={{
                            display: checkedValues[i] ? "inline-block" : "none",
                          }}
                          onChange={(e) => handleChange(e, i)}
                          name="detail"
                       
                        />
                        <br />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" component="div">
                      {item.price * item.count}{" "}
                      <span className="text-primary">&#3647;</span>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          ))}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <button
                className="btn btn-primary mt-3 "
                disabled={!products.length}
                onClick={handleCreateOrder}
              >
                ยืนยันการสั่งซื้อ
              </button>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Box>
  );
};

export default Checkout;
