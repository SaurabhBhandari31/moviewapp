import React, { useEffect, useState } from 'react'
import watchListData from '../../assets/helper';
import Header from '../Header';
import Cart from '../Cart';

const Mywatchlist = () => {

    const [uniqueArrayData, setUniqueArrayData] = useState([])

    useEffect(()=>{
        const uniqueArray = watchListData.filter((obj, index, self) =>
            index === self.findIndex((t) => (
              t.imdbID === obj.imdbID
            ))
          );

          setUniqueArrayData(uniqueArray)
    },[])
    return (
        <>
            <div className='container-fluid'>
                <div className='mt-4 text-center'>
                    <Header />
                    <h3 className='text-center mb-5 mt-5 '>Welcome to <span className='text text-danger'>MovieHUB watchList</span></h3>
                    <Cart
                        data={uniqueArrayData || []}
                        loader={true}
                        type={"remove"}
                    />
                </div>
            </div>
        </>
    )
}

export default Mywatchlist;