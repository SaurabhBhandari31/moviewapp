import React from 'react'
import { Link } from 'react-router-dom'


const Header = () => {
    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-light bg-light ">
                <Link to='/home'><a class="navbar-brand"><span className=''>Movie</span><span className='text-danger'>WatchLists</span></a>                </Link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                    <Link to='/home'>  
                           <a class="nav-link" >Home</a>
                           </Link> 
                        <li class="nav-item active">
                            <a class="nav-link" href="#">About</a>
                        </li>
                        <li class="nav-item active">
                           <Link to='/mylist'>  
                           <a class="nav-link" >My WatchList</a>
                           </Link> 
                        </li>

                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Header