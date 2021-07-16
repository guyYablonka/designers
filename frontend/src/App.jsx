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
  const [cart, setCart] = useState([]);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  const reachableRouteByLoginState = () => {
    if (isLoggedIn) {
      return (
        <>
          <Route path="/user/myProfile" exact>
            <MyProfile />
          </Route>
          <Route path="/products/add" exact>
            <NewProduct />
          </Route>
        </>
      );
    }

    return (
      <Route path="/signup" exact>
        <Authenticate />
      </Route>
    );
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <div className="main">
        <Router>
          <NavigationMain />
          <Switch>
            <Route path="/" exact>
              <FilteredProducts />
            </Route>
            <Route path="/products/:productId">
              <ProductInfo cart={cart} addItem={setCart} />
            </Route>
            <Route path="/orders/current" exact>
              <MyCart cart={cart} changeAmountOfItem={setCart} />
            </Route>
            <Route path="/payment" exact>
              <Payment cart={cart} changeAmountOfItem={setCart} />
            </Route>
            {reachableRouteByLoginState()}
            <Redirect to="/" />
          </Switch>
        </Router>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
