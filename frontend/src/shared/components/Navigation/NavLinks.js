import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

import "./NavLinks.css";

const NavLinks = () => {
  const auth = useContext(AuthContext);
  return (
    <div>
      <ul className="nav-links">
        <li>
          <NavLink to="/" exact>
            <i className="fas fa-tshirt link"></i>
            All Products
          </NavLink>
        </li>
        
        <li>
          <NavLink to="/orders/current">
            <i className="fas fa-shopping-cart link"></i>
            My Cart
          </NavLink>
        </li>
        {auth.isLoggedIn && (
          <li>
            <NavLink to="/products/add">
              <i className="fas fa-plus link"></i>
              Add New Product
            </NavLink>
          </li>
        )}
        {auth.isLoggedIn && (
          <li>
            <NavLink to="/user/myProfile">
              <i className="fas fa-user-circle link"></i>
              My Profile
            </NavLink>
          </li>
        )}
        {!auth.isLoggedIn && (
          <li>
            <NavLink to="/signup">
              <i className="fas fa-sign-in-alt link"></i>
              Sign Up / Log In
            </NavLink>
          </li>
        )}
        {auth.isLoggedIn && (
          <li>
          <NavLink to="/signup"
            onClick={auth.logout}
          >
            <i className="fas fa-sign-out-alt link"></i>
            Disconnect
          </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};

export default NavLinks;
