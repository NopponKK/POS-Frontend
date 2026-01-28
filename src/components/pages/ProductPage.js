
import { read } from '../../functions/product'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import SingleCard from '../cards/SingleCard'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const ProductPage = () => {
    const param = useParams()
    const [product, setProduct] = useState();
    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        read(param.id).then(res => {
            setProduct(res.data)
        }).catch((err) => {
            console.log(err.response.data)
        })
    }

    return (
        <div className='container-fluid'>
            <div className='row pt-3'>
                <SingleCard product={product}/>
            </div>
            <div className='row'>

            </div>

        </div>
    )
}

export default ProductPage