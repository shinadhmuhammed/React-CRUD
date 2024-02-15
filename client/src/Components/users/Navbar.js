import React from 'react'
import { Link } from 'react-router-dom'
import './../styles/navbar.css'

function Navbar() {
    return (
      <div>
        <nav className="navbar-container">
          <ul className="navbar-list">
            <li className="navbar-item">
              <Link to="/profile" className="navbar-link">Profile</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }

export default Navbar
