import React, { useEffect,useState } from 'react'
import { getdata, list, listby } from '../../functions/product'
import {Button} from 'antd'
import ProductCard from '../cards/ProductCard';
import Loadingcard from '../cards/Loadingcard';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
const Promotion = () => {
    const [product,setProduct] = useState();
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
        loadData()

    },[])

    const loadData = async() =>{
        
        await listby(9,"sold","desc")
        .then((res)=>{
       
            if (res && res.data) {
                setProduct(res.data); // Assuming res.data is an array
                setLoading(false);
            } else {
                setProduct([]); // Set an empty array if data is not available
            }
       
        })
        .catch(err=>{
            console.log(err)
            setLoading(false);
        }) 
    }

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
  return (
    <div className='container' style={{width:"100%",height:"100%"}}>
        <div className='row' >
            { loading 
            ?
            <Loadingcard count={3}/>
            
            
            : product && product.length > 0 ? (
                <Carousel showArrows={true} infinite={true} autoPlay='true'  responsive={responsive}>
               {product.map((item, index) => (

                    <div className='col-md-4'>
                   
                    <ProductCard key={index} {...item} data={item} />
                    </div>
                ))}
                </Carousel>
            ) : (
                <p>ยังไม่มีสินค้าใหม่ตอนนี้</p>
            )

            }
 
    </div>
  
</div>
  )
}

export default Promotion