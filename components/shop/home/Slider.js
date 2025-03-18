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
          {<i class="bi bi-arrow-left"></i>}
          {
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-arrow-left"
              viewBox="0 0 16 16"
            >
              {/* Thêm biểu tượng mũi tên trái ở đây */}
              <path
                fill-rule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
              />{" "}
            </svg>
          }
        </div>
        <div
          className="navigation-button right"
          onClick={(e) => nextSlide(data.sliderImages.length, slide, setSlide)}
        >
          {<i class="bi bi-arrow-right"></i>}
          {
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-arrow-right"
              viewBox="0 0 16 16"
            >
              {/* Thêm biểu tượng mũi tên phải ở đây */}
              <path
                fill-rule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
              />{" "}
            </svg>
          }
        </div>
      </div>
      <OrderSuccessMessage />
    </Fragment>
  );
};

export default Slider;
