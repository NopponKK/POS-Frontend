import React, { useState, useEffect } from 'react';
import { listby} from '../../functions/product';
import { searchFilters } from '../../functions/product';
import Loadingcard from '../cards/Loadingcard';
import Search from '../cards/Search';
import { Grid, Container } from '@mui/material';
import ProductCard from '../cards/ProductCard';
import { useSelector,useDispatch } from 'react-redux';
import AllLoadingCard from '../cards/AllLoadingCard';
import Floatingaction from '../cards/Floatingaction';

const AllProduct = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const {search} = useSelector((state)=>({...state}))
  const {text} = search
  useEffect(() => {
    loadData();
  }, [text]);

  useEffect(() => {
    let delay = setTimeout(() => {
      fetchData({ query: text });
    }, 700);
    return () => clearTimeout(delay);
  }, [text, product]); // Add product as a dependency
  const loadData = async () => {
    setLoading(true);
    try {
      const res = await listby();
      setProduct(res.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

    const fetchData = (arg)=>{
      searchFilters(arg).then(res=>{
        setProduct(res.data)  
      }).catch((err)=>{console.log(err)})
    }

  return (
    
    <div style={{  maxHeight: "80vh",marginTop:'20px',overflowX:"hidden"  }}>
      <Floatingaction />
    

     
        <Grid sx={{marginLeft:"10px"}} >
         
            {loading ? (
                  <div>
                <AllLoadingCard count={product.length} />
              </div>
            ) : product.length <1 ? (
              <p>ไม่มีสินค้า</p>
            ) : (
              <Grid container spacing={1}>
                {product.map((item, index) => (
                  <Grid item xs={12} sm={6} lg={4} xl={3} key={index} >
                    <ProductCard data={item} />
                  </Grid>
                ))}
              </Grid>
            )}
        
        </Grid>
     
    
    </div>
  );
};

export default AllProduct;
