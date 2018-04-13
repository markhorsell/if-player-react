 
import { NavLink } from "react-router-dom";

import React  from "react";



const Nav = () => (

       <div className="nav">
          <ul>
            <li>
              <NavLink to="/home" activeStyle={{ color: 'white' }}>HOME</NavLink>
            </li>
            <li>
              <NavLink to="/about" activeStyle={{ color: 'white' }}>ABOUT</NavLink>
            </li>
          </ul>
        </div>
  )

export default Nav;
