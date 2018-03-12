 
import { Link } from "react-router-dom";

import React, { Component }  from "react";
import './Nav.css';


const Nav = () => (

       
          <ul className='nav'>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
          
  )

export default Nav;
