import React from 'react'
import Slider from "react-slick";
import {bannerImgOne,bannerImgTwo,bannerImgThree,bannerImgFour,bannerImgFive} from "../../assets/index"
function Banner() {
    var settings = {
        infinite: true,
        autoplay:true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        autoplaySpeed:3000,
      };
  return (
    <div>
        <Slider {...settings}>
      <div>
        <img src={bannerImgOne} alt="bannerImgOne" />
      </div>
      <div>
        <img src={bannerImgTwo} alt="bannerImgTwo" />
      </div>
      <div>
        <img src={bannerImgThree} alt="bannerImgThree" />
      </div>
      <div>
        <img src={bannerImgFour} alt="bannerImgFour" />
      </div>
      <div>
        <img src={bannerImgFive} alt="bannerImgFive" />
      </div>
     
    </Slider>
    </div>
    
  )
}

export default Banner