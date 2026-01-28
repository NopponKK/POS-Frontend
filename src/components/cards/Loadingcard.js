import React from 'react'
import { Skeleton,Card } from 'antd';



const Loadingcard = ({count}) => {

    const loopCard =() =>{
        let cards = []
        for (let i=0 ; i<count ; i++){
            cards.push(
            <Card className='col-md-4 mr-3' >
                <Skeleton active/>
            </Card>)
        }
        return cards
    }

  return (
    <div className='row pb-5'>{loopCard()}</div>
  )
}

export default Loadingcard