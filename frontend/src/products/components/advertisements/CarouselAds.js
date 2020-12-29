import React from "react";
import Carousel from "react-bootstrap/esm/Carousel";

import "./CarouselAds.css";

const CarouselAds = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100 fit-size"
          src="https://img.huffingtonpost.com/asset/5c94befb230000c800e9f38b.jpeg?ops=scalefit_720_noupscale&format=webp"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3 className="title-details">First slide label</h3>
          <p className="details">
            Nulla vitae elit libero, a pharetra augue mollis interdum.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 fit-size"
          src="https://thetempest.co/wp-content/uploads/2018/04/Untitled-design-1-1.png"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3 className="title-details">Second slide label</h3>
          <p className="details">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 fit-size"
          src="https://static1.fashionbeans.com/wp-content/uploads/2020/02/reinhart-julian-VleZz-ItaRI-unsplash.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3 className="title-details">Third slide label</h3>
          <p className="details">
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselAds;
