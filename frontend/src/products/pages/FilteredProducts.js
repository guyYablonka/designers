import React, { useState } from "react";

import Categories from "../components/filterProducts/Categories";
import CarouselAds from "../components/advertisements/CarouselAds";
import FilterInput from "../components/filterProducts/FilterInput";
import ProductList from "../components/ProductsList";

export const PRODUCTS = [
  {
    id: 1,
    name: "blue nice shirt",
    availableGender: {
      Men: true,
      Women: false,
    },
    availableSizes: ["XS", "S", "L"],
    availableColors: ["red", "blue", "black"],
    price: 10.99,
    designer: "proDes!123",
    rank: 4.5,
    image: `https://m.media-amazon.com/images/I/A1vJUKBjc2L._AC_CLa%7C2140%2C2000%7C413ulahCjeL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_SX425._SX._UX._SY._UY_.png`,
    description: `The word Nice t-shirt | A Shirt that says Nice`,
    productType: "shirts",
    addedDate: "1.10.2020",
  },
  {
    id: 2,
    name: "black nice shirt",
    availableGender: {
      Men: true,
      Women: false,
    },
    availableSizes: ["XS", "S", "L"],
    availableColors: ["red", "blue", "black"],
    price: 10.99,
    designer: "proDes!123",
    image: `https://m.media-amazon.com/images/I/A13usaonutL._AC_CLa%7C2140%2C2000%7C413ulahCjeL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_UX425_.png`,
    rank: 4.5,
    description: `The word Nice t-shirt | A Shirt that says Nice`,
    productType: "shirts",
    addedDate: "1.10.2020",
  },
  {
    id: 3,
    name: "Fila Shoes!",
    availableGender: {
      Men: true,
      Women: true,
    },
    availableSizes: ["38", "39", "40", "41", "42", "43"],
    availableColors: ["white", "blue", "black"],
    price: 39.99,
    designer: "proDes!123",
    image: `https://d3hb4faco7nbjh.cloudfront.net/media/catalog/product/cache/1/image/300x/9df78eab33525d08d6e5fb8d27136e95/0/5/1578963064-059910005.jpg`,
    rank: 4.7,
    description: `Fila Disruptor 2 FW02945-111`,
    productType: "shoes",
    addedDate: "1.10.2020",
  },
  {
    id: 4,
    name: "designers shirts - multiple colors",
    availableGender: {
      Men: true,
      Women: false,
    },
    availableSizes: ["XS", "S", "L"],
    availableColors: ["red", "blue", "black"],
    price: 55.99,
    designer: "proDes!123",
    image: `https://thetempest.co/wp-content/uploads/2018/04/Untitled-design-1-1.png`,
    rank: 3.2,
    description: `The word Nice t-shirt | A Shirt that says Nice`,
    productType: "suits",
    addedDate: "1.10.2020",
  },
];

const FilteredProducts = () => {
  const [productName, changeProductName] = useState("");
  const [productCategory, changeProductCategory] = useState("");

  const filterProduct = (productName, productCategory) => {
    return PRODUCTS.filter(
      (product) =>
        product.name.toUpperCase().includes(productName.toUpperCase()) &&
        product.productType.includes(productCategory)
    );
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
      <ProductList items={filterProduct(productName, productCategory)} />
    </React.Fragment>
  );
};

export default FilteredProducts;
