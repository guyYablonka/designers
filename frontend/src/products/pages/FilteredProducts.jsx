import React, { useState, useEffect } from "react";

import Categories from "../components/filterProducts/Categories";
import CarouselAds from "../components/advertisements/CarouselAds";
import FilterInput from "../components/filterProducts/FilterInput";
import ProductList from "../components/ProductsList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

const FilteredProducts = () => {
  const [productName, changeProductName] = useState("");
  const [productCategory, changeProductCategory] = useState("");
  const [allProducts, setAllProducts] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/products"
        );

        setAllProducts(
          responseData.filter(
            (product) =>
              product.name.toUpperCase().includes(productName.toUpperCase()) &&
              product.productType.includes(productCategory)
          )
        );
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, [sendRequest]);

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
      <ErrorModal error={error} onClear={clearError} />
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
