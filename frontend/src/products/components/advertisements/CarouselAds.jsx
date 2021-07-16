import React from "react";
import Carousel from "react-bootstrap/esm/Carousel";

import "./CarouselAds.css";

const CarouselAds = () => {
  const fetchCaruselItems = () => {
    return [
      {
        image:
          "https://img.huffingtonpost.com/asset/5c94befb230000c800e9f38b.jpeg?ops=scalefit_720_noupscale&format=webp",
        title: "First slide label",
        details: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
      },
      {
        image:
          "https://thetempest.co/wp-content/uploads/2018/04/Untitled-design-1-1.png",
        title: "Second slide label",
        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
      {
        image:
          "https://static1.fashionbeans.com/wp-content/uploads/2020/02/reinhart-julian-VleZz-ItaRI-unsplash.jpg",
        title: "Third slide label",
        details:
          "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
      },
    ];
  };

  return (
    <Carousel>
      {fetchCaruselItems().map((caruselItem) => {
        return (
          <Carousel.Item>
            <img className="d-block w-100 fit-size" src={caruselItem.image} />
            <Carousel.Caption>
              <h3 className="title-details">{caruselItem.title}</h3>
              <p className="details">{caruselItem.details}</p>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default CarouselAds;
