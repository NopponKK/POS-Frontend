import React from 'react'
import { Skeleton, Card, Col, Row } from 'antd';


const AllLoadingCard = ({count}) => {

    const loopCard =() =>{
        let cards = []
        for (let i=0 ; i<count ; i++){
            cards.push(
            <Card className='col-md-4'>
                <Skeleton active/>
            </Card>)
        }
        return cards
    }

  return (
    <div className='row pb-5'>{loopCard()}</div>
  )
}

export default AllLoadingCard