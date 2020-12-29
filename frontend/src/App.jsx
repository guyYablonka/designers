import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import NavigationMain from "./shared/components/Navigation/NavigationMain";
import FilteredProducts from "./products/pages/FilteredProducts";
import ProductInfo from "./products/pages/ProductInfo";
import NewProduct from "./products/pages/NewProduct";
import Authenticate from "./users/pages/Authenticate";
import MyProfile from "./users/pages/MyProfile";
import MyCart from "./orders/pages/MyCart";
import Payment from "./orders/pages/Payment";
import { AuthContext } from "./shared/context/auth-context";
import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <FilteredProducts />
        </Route>
        <Route path="/products/add" exact>
          <NewProduct />
        </Route>
        <Route path="/products/:productId">
          <ProductInfo />
        </Route>
        <Route path="/user/myProfile" exact>
          <MyProfile />
        </Route>
        <Route path="/orders/current" exact>
          <MyCart />
        </Route>
        <Route path="/payment" exact>
          <Payment />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <FilteredProducts />
        </Route>
        <Route path="/products/:productId" exact>
          <ProductInfo />
        </Route>
        <Route path="/orders/current" exact>
          <MyCart />
        </Route>
        <Route path="/payment" exact>
          <Payment />
        </Route>
        <Route path="/signup" exact>
          <Authenticate />
        </Route>
        <Redirect to="/signup" />
      </Switch>
    );
  }
  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>
        <NavigationMain />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
