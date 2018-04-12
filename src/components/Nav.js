 
import { Link } from "react-router-dom";

import React  from "react";



const Nav = () => (

       <div className="nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </div>
  )

export default Nav;
