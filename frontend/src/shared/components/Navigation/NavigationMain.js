import React, { useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import NavLinks from "./NavLinks";
import Header from "./Header";
import "./NavigationMain.css";

const NavigationMain = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(!drawerIsOpen);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  return (
    <React.Fragment>
      <SideBar show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideBar>
      <Header>
        <div></div>
        <h1 className="main-navigation__title">
          <Link to="/">Designers</Link>
        </h1>
        <button
          className="main-navigation__menu-btn"
          onClick={openDrawerHandler}
        >
          <i className="fas fa-bars head-icon"></i>
        </button>
      </Header>
    </React.Fragment>
  );
};

export default NavigationMain;
