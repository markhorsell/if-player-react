 
import { NavLink } from "react-router-dom";

import React  from "react";



const Nav = () => (

       <div className="nav">
          <ul>
            <li>
              <NavLink to="/shivers-react/game" activeStyle={{ color: 'white' }}>Game</NavLink>
            </li>
            <li>
              <NavLink to="/shivers-react/about" activeStyle={{ color: 'white' }}>About</NavLink>
            </li>
            <li>
              <NavLink to="/shivers-react/todo" activeStyle={{ color: 'white' }}>Todo</NavLink>
            </li>
          </ul>
        </div>
  )

export default Nav;
