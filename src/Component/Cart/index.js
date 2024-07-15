import React, { useEffect, useState } from 'react';
import watchListData from '../../assets/helper/index'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Box, Typography } from '@mui/material';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Cart = (props) => {
  const { data, loader, type } = props;
  const [addedMovies, setAddedMovies] = useState([]);
  const [listData, setListData] = useState([])
  const [open, setOpen] = useState(false);
  const [currentMovieDetails, setCurrentMovieDetails] = useState({})


  useEffect(() => {
    setListData(data)
  }, [data])

  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + '...';
    }
    return description;
  };

  const addList = (name) => {
    const getMovie = listData.find((ele) => ele.Title == name)
    watchListData.push(getMovie)
    setAddedMovies([...addedMovies, name]);
  }

  const remove = (name) => {
    const getMovie = listData.filter((ele) => ele.Title != name)
    setListData(getMovie)
  }

  const handleOpen = (name) => {
    const getMovie = listData.find((ele) => ele.Title == name)
    setCurrentMovieDetails(getMovie)
    setOpen(true)

  };
  const handleClose = () => setOpen(false);
  return (
    <div className='container'>
      <div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <span className='text-danger'>Movie Details</span>
            </Typography>
            <div className='d-flex mt-5' style={{ justifyContent: 'space-around' }}>
              {/* left sectoion */}
              <div>
                <img src={currentMovieDetails.Poster} alt="movie Poster" />
              </div>
              {/* Right Section */}
              <div style={{ position: 'relative', left: '30px' }}>
                <h1><span className='text-danger'>{currentMovieDetails.Title} :</span> &nbsp;{currentMovieDetails.Type}</h1>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                  </p>

                  <button className='btn btn-danger' onClick={handleClose}>
                    Watch Free
                  </button>
              </div>

            </div>
          </Box>
        </Modal>
      </div>
      <div className='row'>
        {
          listData && listData.length > 0 && loader ? (
            listData.map((ele) => {
              return (
                <div key={ele.Title} className='col-md-3 mb-4' >
                  <div className='card h-100'>
                    <img src={ele.Poster} className='card-img-top' alt='Product' style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover'
                    }} />
                    <div className='card-body text-start'>
                      <h5 className='card-title'>{truncateDescription(ele.Title, 20)}</h5>
                      <p className='card-text'>{ele.Year} &nbsp; &nbsp;&nbsp;&nbsp;{ele.Type}</p>
                      {type == "add" ?
                        <>
                          {addedMovies.includes(ele.Title) ? (
                            <button className='btn btn-secondary' disabled>Added</button>
                          ) : (
                            <button className='btn btn-danger' onClick={() => addList(ele.Title)}>Add to watch List</button>
                          )}
                          <button className='btn btn-primary' onClick={() => handleOpen(ele.Title)}>View</button>
                        </> :
                        <button className='btn btn-danger' onClick={() => remove(ele.Title)}>Remove</button>

                      }
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className='col-12'>
              <p>No data Found...</p>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Cart;
