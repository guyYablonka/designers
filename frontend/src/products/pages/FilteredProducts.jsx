import React, { useState, useEffect } from "react";

import Categories from "../components/filterProducts/Categories";
import CarouselAds from "../components/advertisements/CarouselAds";
import FilterInput from "../components/filterProducts/FilterInput";
import ProductList from "../components/ProductsList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const FilteredProducts = () => {
  const [productName, changeProductName] = useState("");
  const [productCategory, changeProductCategory] = useState("");
  const [allProducts, setAllProducts] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/products");
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setAllProducts(
          responseData.filter(
            (product) =>
              product.name.toUpperCase().includes(productName.toUpperCase()) &&
              product.productType.includes(productCategory)
          )
        );
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    };
    sendRequest();
  }, []);

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      <CarouselAds />
      <Categories
        categoryHandler={changeProductCategory}
        productCategory={productCategory}
      />
      <FilterInput
        onChange={(event) => changeProductName(event.target.value)}
      />
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && allProducts && <ProductList items={allProducts} />}
    </React.Fragment>
  );
};

export default FilteredProducts;
