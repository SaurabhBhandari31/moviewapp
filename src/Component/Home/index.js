import React, { useEffect, useState } from 'react'
import Header from '../Header'
import axios from 'axios'
import Cart from '../Cart'
// import '.home.css'

const Home = () => {
  const [loader, setLoader] = useState(false)
  const [value, setValue] = useState('react')
  const [fetchListData, setFetchListData] = useState([])
  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://www.omdbapi.com/?s=${value}&apikey=a993a59a`);
      const data = response.data;
      if (data.Response == "True") {
        setLoader(true)
        setFetchListData(data.Search)
        setValue('')
      } else {
        setLoader(false)
        
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = () => {
    setValue('')
    fetchData();
  }
  return (
    <>
      <div className='container-fluid'>
        <Header />

        {/* Clothing Section here men and women */}
        <div className='mt-4 text-center'>
          <div className='d-flex'>
            <input type='text' value= {value} class="form-control form-control-lg" onChange={(e) => setValue(e.target.value)} placeholder="search here movie" />
            <button className='btn btn-danger' onClick={handleSubmit}>Search</button>
          </div>
          <h3 className='text-center mb-5 mt-5 '>Welcome to <span className='text text-danger'>MovieHUB</span></h3>
          <Cart
            data={fetchListData}
            loader={loader}
            type={"add"}
          />
        </div>

      </div>
    </>
  )
}

export default Home