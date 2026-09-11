import React from 'react'
import { Link } from 'react-router-dom'


function Header() {
  return (
    <>
    <header>
      <div>
        <h2 className='header-title'>MOVIE EXPLORER</h2>
      </div>
      <nav>
        <Link to={"/"}>Popular</Link>
        <Link to={"/"}>Trending</Link>
      </nav>
    </header>

    </>
  )
}

export default Header