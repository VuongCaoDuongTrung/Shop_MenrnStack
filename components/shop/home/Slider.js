import React, { Fragment, useEffect, useContext, useState } from "react";
import OrderSuccessMessage from "./OrderSuccessMessage";
import { HomeContext } from "./";
import { sliderImages } from "../../admin/dashboardAdmin/Action";
import { prevSlide, nextSlide } from "./Mixins";

const apiURL = process.env.REACT_APP_API_URL;

const Slider = (props) => {
  const { data, dispatch } = useContext(HomeContext);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    // Fetch slider images once component is mounted
    sliderImages(dispatch);

    // Set up the interval for auto-sliding
    const slideInterval = setInterval(() => {
      setSlide((currentSlide) => (currentSlide + 1) % data.sliderImages.length);
    }, 5000); // Change slide every 5000ms (5 seconds)

    // Clean up the interval on component unmount
    return () => clearInterval(slideInterval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.sliderImages.length]); // Ensure effect is run whenever the number of slider images changes

  return (
    <Fragment>
      <div className="slider-container">
        {data.sliderImages.length > 0 && (
          <img
            className="slider-image"
            src={`${apiURL}/uploads/customize/${data.sliderImages[slide].slideImage}`}
            alt="sliderImage"
          />
        )}

        <div
          className="navigation-button left"
          onClick={(e) => prevSlide(data.sliderImages.length, slide, setSlide)}
        >
          {/* Icon cho nút điều hướng */}
          <svg viewBox="0 0 24 24">
            {" "}
            {/* Thêm biểu tượng mũi tên trái ở đây */}
          </svg>
        </div>
        <div
          className="navigation-button right"
          onClick={(e) => nextSlide(data.sliderImages.length, slide, setSlide)}
        >
          {/* Icon cho nút điều hướng */}
          <svg viewBox="0 0 24 24">
            {" "}
            {/* Thêm biểu tượng mũi tên phải ở đây */}
          </svg>
        </div>

        <div className="slider-overlay">
          <div className="overlay-content">Buy Now</div>
        </div>
      </div>
      <OrderSuccessMessage />
    </Fragment>
  );
};

export default Slider;
